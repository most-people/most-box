import { MMKV } from 'react-native-mmkv'
import { sha256, toUtf8Bytes } from 'ethers'
// 初始化 MMKV 实例
const storage = new MMKV()

const mmkv = {
  // 存储数据
  setItem(key: string, value: string | object) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    storage.set(key, value)
  },
  // 获取数据
  getItem(key: string) {
    const value = storage.getString(key)
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
  removeItem(key: string) {
    storage.delete(key)
  },
  // 检查键是否存在
  hasItem(key: string) {
    return storage.contains(key)
  },
  // 获取 hash 值
  getHash(message: string) {
    return sha256(toUtf8Bytes(message))
  },
}

export default mmkv
