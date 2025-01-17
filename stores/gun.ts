import Gun from 'gun'

// 初始化 Gun.js
const gun = new Gun({
  peers: [
    'https://gun-manhattan.herokuapp.com/gun',
    // zh-cn gun
    'https://gun.most.red/gun',
    'https://api.most.box/gun',
  ],
})
export default gun
