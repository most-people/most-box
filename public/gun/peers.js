const GunPeers = [
  'https://gun-manhattan.herokuapp.com/gun',
  'https://api.most.box/gun',
  'https://gun.most.red/gun',
]

// Node.js 环境
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GunPeers
}

// 浏览器环境
if (typeof window !== 'undefined') {
  window.GunPeers = GunPeers
}
