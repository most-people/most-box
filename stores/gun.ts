import Gun from 'gun'
import asyncStore from 'gun/lib/ras.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const gun = new Gun({
  // localStorage: false,
  // 替换存储适配器
  store: asyncStore({ AsyncStorage }),
  peers: [
    'https://gun-manhattan.herokuapp.com/gun',
    // 本地
    'http://localhost:1976/gun',
  ],
})
export default gun
// export const user = gun.user()
