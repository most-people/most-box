import Gun from 'gun'

// 初始化 Gun.js
const gun = new Gun({
  peers: [
    'https://gun-manhattan.herokuapp.com/gun',
    //
    'http://119.91.213.99:1976/gun',
  ],
})
export default gun
