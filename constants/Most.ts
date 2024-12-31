import {
  toUtf8Bytes,
  hexlify,
  toUtf8String,
  pbkdf2,
  sha256,
  getBytes,
  recoverAddress,
  hashMessage,
  Mnemonic,
  HDNodeWallet,
} from 'ethers'
import dayjs from 'dayjs'
import sodium from 'libsodium-wrappers'

import { createAvatar } from '@dicebear/core'
import { botttsNeutral } from '@dicebear/collection'

import { indexDB } from './IndexDB'

declare global {
  interface Window {
    sogou: {
      sug: (data: string[][]) => void
    }
    // markdown 可视化编辑器
    toastui: any
    // 语音识别
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

const mp = {
  // 本地私钥
  async key(username: string, password: string) {
    const p = toUtf8Bytes(password)
    const salt = toUtf8Bytes('/mp/' + username)
    // iterations: 10000+
    const kdf = pbkdf2(p, salt, 1, 32, 'sha512')
    const privateKey = sha256(kdf)

    // x25519 key
    await sodium.ready
    const seed = sodium.from_string(privateKey)
    const keyData = sodium.crypto_generichash(32, seed)
    const keyPair = sodium.crypto_box_seed_keypair(keyData)

    const public_key = sodium.to_hex(keyPair.publicKey)
    const private_key = sodium.to_hex(keyPair.privateKey)

    // AES-GCM key
    const keydata = toUtf8Bytes(privateKey).slice(-32)
    // https://gist.github.com/pedrouid/b4056fd1f754918ddae86b32cf7d803e#aes-gcm
    const key = await window.crypto.subtle.importKey(
      'raw',
      keydata,
      { name: 'AES-GCM' },
      // not exportable
      false,
      ['encrypt', 'decrypt'],
    )

    // wallet all in one
    const mnemonic = Mnemonic.entropyToPhrase(toUtf8Bytes(privateKey).slice(-16))
    const wallet = HDNodeWallet.fromPhrase(mnemonic)
    const address = wallet.address

    // token
    const message = String(dayjs().unix())
    const sig = await wallet.signMessage(message)
    const token = [message, sig].join()

    return { key, address, token, mnemonic, public_key, private_key }
  },
  getAddress(authorization: string) {
    // 验签
    if (authorization) {
      const [message, sig] = authorization.slice(7).split(',')

      if (message && sig) {
        const address = recoverAddress(hashMessage(message), sig)
        return address
      }
    }
    return ''
  },
  formatAddress(address: string) {
    if (address) {
      return address.slice(0, 6) + '...' + address.slice(-4)
    } else {
      return ''
    }
  },
  getHash(message: string) {
    return sha256(toUtf8Bytes(message))
  },
  // 聊天加密 共享秘钥，对称加密
  chatEncode(text: string, otherPublicKey: string, myPrivateKey: string) {
    try {
      const sharedKey = sodium.crypto_scalarmult(
        sodium.from_hex(myPrivateKey),
        sodium.from_hex(otherPublicKey),
      )
      const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES)
      const encrypted = sodium.crypto_secretbox_easy(text, nonce, sharedKey)
      return [sodium.to_base64(nonce), sodium.to_base64(encrypted)].join('.')
    } catch (error) {
      console.error(error)
    }
    return ''
  },
  // 聊天解密 共享秘钥，对称加密
  chatDecode(encoded: string, otherPublicKey: string, myPrivateKey: string) {
    try {
      const [nonce, encrypted] = encoded.split('.')
      const sharedKey = sodium.crypto_scalarmult(
        sodium.from_hex(myPrivateKey),
        sodium.from_hex(otherPublicKey),
      )
      const decrypted = sodium.crypto_secretbox_open_easy(
        sodium.from_base64(encrypted),
        sodium.from_base64(nonce),
        sharedKey,
      )
      return sodium.to_string(decrypted)
    } catch (error) {
      console.error(error)
    }
    return ''
  },
  // 加密
  async encrypt(text: string, key?: CryptoKey) {
    if (!key) {
      key = await indexDB.getKey()
    }
    if (!key) {
      return ''
    }

    const version = 'mp://1'
    const iv = String(Date.now())
    const encryptedBytes = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: toUtf8Bytes(iv),
        tagLength: 32,
      },
      key,
      toUtf8Bytes(text),
    )
    const data = hexlify(new Uint8Array(encryptedBytes)).slice(2)
    const encrypted = [version, iv, data]
    return encrypted.join('.')
  },
  // 解密
  async decrypt(encrypted: string, key?: CryptoKey) {
    if (!key) {
      key = await indexDB.getKey()
    }
    if (!key) {
      return ''
    }
    const [version, iv, data] = encrypted.split('.')
    if (version !== 'mp://1') {
      console.error('version error')
      return ''
    }
    try {
      const decryptedBytes = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: toUtf8Bytes(iv),
          tagLength: 32,
        },
        key,
        getBytes('0x' + data),
      )
      const decrypted = toUtf8String(new Uint8Array(decryptedBytes))
      return decrypted
    } catch (error) {
      console.error('decrypt error', error)
      return ''
    }
  },
  deBase64(s: string) {
    return decodeURIComponent(atob(s))
  },
  enBase64(s: string) {
    return btoa(encodeURIComponent(s))
  },
  // // 错误提示
  // error(message: string) {
  //   ElMessage({
  //     message: message,
  //     type: 'error',
  //     // duration: 0,
  //     customClass: 'mp-message-error',
  //     grouping: true,
  //   })
  // },
  // // 成功提示
  // success(message: string) {
  //   ElMessage({
  //     message,
  //     type: 'success',
  //     // duration: 0,
  //     customClass: 'mp-message-success',
  //     grouping: true,
  //   })
  // },
  // // 消息提示
  // info(message: string) {
  //   ElMessage({
  //     message,
  //     type: 'info',
  //     // duration: 0,
  //     customClass: 'mp-message-info',
  //     grouping: true,
  //   })
  // },

  // 格式化时间
  formatTime(time: string) {
    if (!time) {
      return ''
    }
    const date = dayjs(Number(time))
    const hour = date.hour()
    // 判断当前时间段
    let timeOfDay
    if (hour >= 0 && hour < 3) {
      timeOfDay = '凌晨'
    } else if (hour >= 3 && hour < 6) {
      timeOfDay = '拂晓'
    } else if (hour >= 6 && hour < 9) {
      timeOfDay = '早晨'
    } else if (hour >= 9 && hour < 12) {
      timeOfDay = '上午'
    } else if (hour >= 12 && hour < 15) {
      timeOfDay = '下午'
    } else if (hour >= 15 && hour < 18) {
      timeOfDay = '傍晚'
    } else if (hour >= 18 && hour < 21) {
      timeOfDay = '薄暮'
    } else {
      timeOfDay = '深夜'
    }
    return date.format(`YYYY年M月D日 ${timeOfDay}h点m分`)
  },

  // setItem(key: string, value: string | object) {
  //   if (typeof value === 'object') {
  //     value = JSON.stringify(value)
  //   }
  //   localStorage.setItem(key, value)
  // },
  // getItem(key: string) {
  //   const value = localStorage.getItem(key)
  //   if (value) {
  //     try {
  //       return JSON.parse(value)
  //     } catch (error) {
  //       return value
  //     }
  //   }
  //   return null
  // },
  avatar(name?: string) {
    return createAvatar(botttsNeutral, {
      seed: 'most-people:' + (name || 'most.box'),
      flip: true,
    }).toDataUri()
  },
}

export default mp
