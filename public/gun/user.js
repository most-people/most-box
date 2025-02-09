window.gun = window.Gun({
  peers: window.GunPeers,
})
window.user = window.gun.user()
// 登录
window.most = {
  login: async (username, password) => {
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
  },
  get(table) {
    return new Promise((resolve) => {
      const user = window.user
      user.get(table).once((data) => {
        if (!data) {
          resolve({ ok: false, message: '数据不存在' })
        }
        const len = Object.keys(data).length
        let i = 1
        const list = []
        user
          .get(table)
          .map()
          .once((data) => {
            i++
            if (data) {
              delete data._
              list.push(data)
            }
            if (i === len) {
              resolve({ ok: true, message: '获取成功', data: list })
            }
          })
      })
    })
  },
}
