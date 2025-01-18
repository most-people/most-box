import Gun from 'gun'

// 初始化 Gun.js
const gun = new Gun({
  peers: [
    'https://gun-manhattan.herokuapp.com/gun',
    // fly.io
    'https://api.most.box/gun',
  ],
})
export default gun
