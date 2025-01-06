import Gun from 'gun'

// 初始化 Gun.js
const gun = new Gun({
  peers: [
    'https://gun-manhattan.herokuapp.com/gun',
    // 本地
    'http://192.168.31.169:1976/gun',
  ],
})
export default gun
