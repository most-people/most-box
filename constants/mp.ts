import CryptoJS from 'crypto-js'
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
  computeHmac,
  randomBytes,
  Wallet,
} from 'ethers'
import dayjs from 'dayjs'
import asyncStorage from '@/stores/asyncStorage'
import { createAvatar } from '@dicebear/core'
import { botttsNeutral } from '@dicebear/collection'
import { mostWallet } from '@/constants/MostWallet'

const avatar = (username?: string, password?: string) => {
  const avatar = createAvatar(botttsNeutral, {
    seed: 'most-people:' + (username || 'most.box') + (password || ''),
    flip: true,
  })
  return avatar.toString()
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

// Base64 编码
const enBase64 = (str: string) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

// Base64 解码
const deBase64 = (str: string) => {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) {
    str += '='
  }
  return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(str))
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
  const signature = CryptoJS.HmacSHA256(
    `${encodedHeader}.${encodedPayload}`,
    CryptoJS.enc.Base64.parse(secret),
  )
  const encodedSignature = enBase64(signature.toString(CryptoJS.enc.Base64))

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
  const signature = CryptoJS.HmacSHA256(data, CryptoJS.enc.Base64.parse(secret))
  const validSignature = enBase64(signature.toString(CryptoJS.enc.Base64))

  if (validSignature !== encodedSignature) {
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

const login = (username: string, password: string) => {
  // 生成一个安全的 32 字节密钥
  const secretKey = randomBytes(32)
  const secret = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create(secretKey))
  const wallet = mostWallet(username, password)
  const token = createJWT(wallet, secret, 60)
  try {
    const { data } = verifyJWT(token, secret)
    if (data.address === wallet.address) {
      asyncStorage.setItem('token', token)
      asyncStorage.setItem('tokenSecret', secret)
      return true
    }
  } catch (error: any) {
    console.error(error.message)
  }
  return false
}

export default {
  // 本地私钥
  wallet: mostWallet,
  avatar,
  getHash,
  formatTime,
  enBase64,
  deBase64,
  createJWT,
  verifyJWT,
  login,
}
