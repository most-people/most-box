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
import sodium from 'react-native-libsodium'
import asyncStorage from '@/stores/asyncStorage'
import { createAvatar } from '@dicebear/core'
import { botttsNeutral } from '@dicebear/collection'

// const mp = {
//   getAddress(authorization: string) {
//     // 验签
//     if (authorization) {
//       const [message, sig] = authorization.slice(7).split(',')

//       if (message && sig) {
//         const address = recoverAddress(hashMessage(message), sig)
//         return address
//       }
//     }
//     return ''
//   },
//   formatAddress(address: string) {
//     if (address) {
//       return address.slice(0, 6) + '...' + address.slice(-4)
//     } else {
//       return ''
//     }
//   },
//   // 聊天加密 共享秘钥，对称加密
//   chatEncode(text: string, otherPublicKey: string, myPrivateKey: string) {
//     try {
//       const sharedKey = sodium.crypto_scalarmult(
//         sodium.from_hex(myPrivateKey),
//         sodium.from_hex(otherPublicKey),
//       )
//       const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES)
//       const encrypted = sodium.crypto_secretbox_easy(text, nonce, sharedKey)
//       return [sodium.to_base64(nonce), sodium.to_base64(encrypted)].join('.')
//     } catch (error) {
//       console.error(error)
//     }
//     return ''
//   },
//   // 聊天解密 共享秘钥，对称加密
//   chatDecode(encoded: string, otherPublicKey: string, myPrivateKey: string) {
//     try {
//       const [nonce, encrypted] = encoded.split('.')
//       const sharedKey = sodium.crypto_scalarmult(
//         sodium.from_hex(myPrivateKey),
//         sodium.from_hex(otherPublicKey),
//       )
//       const decrypted = sodium.crypto_secretbox_open_easy(
//         sodium.from_base64(encrypted),
//         sodium.from_base64(nonce),
//         sharedKey,
//       )
//       return sodium.to_string(decrypted)
//     } catch (error) {
//       console.error(error)
//     }
//     return ''
//   },
//   // 加密
//   async encrypt(text: string, key?: CryptoKey) {
//     if (!key) {
//       key = await indexDB.getKey()
//     }
//     if (!key) {
//       return ''
//     }

//     const version = 'mp://1'
//     const iv = String(Date.now())
//     const encryptedBytes = await window.crypto.subtle.encrypt(
//       {
//         name: 'AES-GCM',
//         iv: toUtf8Bytes(iv),
//         tagLength: 32,
//       },
//       key,
//       toUtf8Bytes(text),
//     )
//     const data = hexlify(new Uint8Array(encryptedBytes)).slice(2)
//     const encrypted = [version, iv, data]
//     return encrypted.join('.')
//   },
//   // 解密
//   async decrypt(encrypted: string, key?: CryptoKey) {
//     if (!key) {
//       key = await indexDB.getKey()
//     }
//     if (!key) {
//       return ''
//     }
//     const [version, iv, data] = encrypted.split('.')
//     if (version !== 'mp://1') {
//       console.error('version error')
//       return ''
//     }
//     try {
//       const decryptedBytes = await window.crypto.subtle.decrypt(
//         {
//           name: 'AES-GCM',
//           iv: toUtf8Bytes(iv),
//           tagLength: 32,
//         },
//         key,
//         getBytes('0x' + data),
//       )
//       const decrypted = toUtf8String(new Uint8Array(decryptedBytes))
//       return decrypted
//     } catch (error) {
//       console.error('decrypt error', error)
//       return ''
//     }
//   },
//   // // 错误提示
//   // error(message: string) {
//   //   ElMessage({
//   //     message: message,
//   //     type: 'error',
//   //     // duration: 0,
//   //     customClass: 'mp-message-error',
//   //     grouping: true,
//   //   })
//   // },
//   // // 成功提示
//   // success(message: string) {
//   //   ElMessage({
//   //     message,
//   //     type: 'success',
//   //     // duration: 0,
//   //     customClass: 'mp-message-success',
//   //     grouping: true,
//   //   })
//   // },
//   // // 消息提示
//   // info(message: string) {
//   //   ElMessage({
//   //     message,
//   //     type: 'info',
//   //     // duration: 0,
//   //     customClass: 'mp-message-info',
//   //     grouping: true,
//   //   })
//   // },

// }

interface MostWallet {
  username: string
  address: string
  mnemonic: string
  public_key: string
  private_key: string
}

const MostKey = (username: string, password: string) => {
  const p = toUtf8Bytes(password)
  const salt = toUtf8Bytes('/most.box/' + username)
  const kdf = pbkdf2(p, salt, 10001, 32, 'sha512')
  const privateKey = sha256(kdf)

  // x25519 key
  const seed = sodium.from_string(privateKey)
  const keyData = sodium.crypto_generichash(32, seed)
  const keyPair = sodium.crypto_box_seed_keypair(keyData)

  const public_key = sodium.to_hex(keyPair.publicKey)
  const private_key = sodium.to_hex(keyPair.privateKey)

  // wallet all in one
  const mnemonic = Mnemonic.entropyToPhrase(toUtf8Bytes(privateKey).slice(-16))
  const wallet = HDNodeWallet.fromPhrase(mnemonic)
  const address = wallet.address
  const userKey: MostWallet = {
    username,
    address,
    mnemonic,
    public_key,
    private_key,
  }
  return userKey
}

const avatar = (username?: string, password?: string) => {
  const avatar = createAvatar(botttsNeutral, {
    seed: 'most-people:' + (username || 'most.box') + (password || ''),
    flip: true,
  })
  return avatar.toString()
}
const deBase64 = (s: string) => {
  return decodeURIComponent(atob(s))
}
const enBase64 = (s: string) => {
  return btoa(encodeURIComponent(s))
}
// 格式化时间
const formatTime = (time: string) => {
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
}

const getHash = (message: string) => {
  return sha256(toUtf8Bytes(message))
}

// 生成 JWT
const createJWT = (data: any, secret: string, exp = 60) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const payload = { exp: dayjs().unix() + exp, data }

  const encodedHeader = enBase64(JSON.stringify(header))
  const encodedPayload = enBase64(JSON.stringify(payload))

  // 使用 HMAC-SHA256 签名
  const signature = sodium.crypto_auth(
    `${encodedHeader}.${encodedPayload}`,
    sodium.from_base64(secret, sodium.base64_variants.URLSAFE_NO_PADDING),
  )
  const encodedSignature = sodium.to_base64(signature, sodium.base64_variants.URLSAFE_NO_PADDING)

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`
}

// 验证 JWT
const verifyJWT = (token: string, secret: string) => {
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format')
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts
  const data = `${encodedHeader}.${encodedPayload}`

  // 验证签名
  const signature = sodium.from_base64(encodedSignature, sodium.base64_variants.URLSAFE_NO_PADDING)
  const key = sodium.from_base64(secret, sodium.base64_variants.URLSAFE_NO_PADDING)
  const valid = sodium.crypto_auth_verify(signature, data, key)

  if (!valid) {
    throw new Error('Invalid signature')
  }

  // 检查是否过期
  const payload = JSON.parse(deBase64(encodedPayload))
  const now = Math.floor(Date.now() / 1000)
  if (payload.exp && now > payload.exp) {
    throw new Error('Token has expired')
  }

  return payload
}

const login = async (username: string, password: string) => {
  await sodium.ready
  // 生成一个安全的 32 字节密钥
  const secretKey = sodium.randombytes_buf(32)
  const secret = sodium.to_base64(secretKey, sodium.base64_variants.URLSAFE_NO_PADDING)
  const mostKey = MostKey(username, password)
  const token = createJWT(mostKey, secret, 60)
  asyncStorage.setItem('token', token)
  asyncStorage.setItem('tokenSecret', secret)
  return mostKey
}

export default {
  // 本地私钥
  key: MostKey,
  avatar,
  getHash,
  formatTime,
  enBase64,
  deBase64,
  createJWT,
  verifyJWT,
  login,
}
