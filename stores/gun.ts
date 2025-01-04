import Gun from 'gun'

// 替换存储适配器
export const gun = Gun({
  // localStorage: false, // 禁用默认的 localStorage
  // store: GunAsyncStorageAdapter, // 使用自定义的 AsyncStorage 适配器
  peers: [
    'https://gun-manhattan.herokuapp.com/gun',
    // 本地
    // 'http://localhost:1976/gun',
  ],
})
