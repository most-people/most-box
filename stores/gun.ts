import Gun from 'gun'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 替换存储适配器
Gun.on('create', (context: any) => {
  context.to.next(context)

  const asyncStorage = {
    setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
    getItem: (key: string) => AsyncStorage.getItem(key),
    removeItem: (key: string) => AsyncStorage.removeItem(key),
  }

  context.opt.store = asyncStorage // 替换 Gun 的默认存储选项
})

export const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']) // 替换为你的 Gun.js 服务地址
