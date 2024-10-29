import AsyncStorage from '@react-native-async-storage/async-storage'
import { sha256, toUtf8Bytes } from 'ethers'

const asyncStorage = {
  // 存储数据
  async setItem(key: string, value: string | object) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    await AsyncStorage.setItem(key, value)
  },
  // 获取数据
  async getItem(key: string) {
    const value = await AsyncStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    }
    return null
  },
  // 删除数据
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key)
  },
  // 检查键是否存在
  async hasItem(key: string) {
    const value = await AsyncStorage.getItem(key)
    return value !== null
  },
  // 获取 hash 值
  getHash(message: string) {
    return sha256(toUtf8Bytes(message))
  },
}

export default asyncStorage
