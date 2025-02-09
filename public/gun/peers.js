;(function () {
  const peers = [
    'https://api.edgerunner.club/gun',
    'https://api.most.box/gun',
    'https://gun.most.red/gun',
  ]

  // Node.js 环境
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = peers
  }

  // 浏览器环境
  if (typeof window !== 'undefined') {
    window.GunPeers = peers
  }
})()
