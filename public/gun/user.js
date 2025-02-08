window.gun = window.Gun({
  peers: window.GunPeers,
})
window.user = window.gun.user()
window.user.login = async (username, password) => {
  window.user.leave()
  return new Promise((resolve) => {
    window.user.auth(username, password, (ack) => {
      if (ack.err) {
        window.user.create(username, password, (ack) => {
          if (ack.err) {
            resolve({ ok: false, message: '注册失败：' + ack.err })
          } else {
            resolve({ ok: true, message: '注册成功', data: ack.pub })
          }
        })
      } else {
        resolve({ ok: true, message: '登录成功', data: ack.sea.pub })
      }
    })
  })
}
