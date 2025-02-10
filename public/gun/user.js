window.gun = window.Gun({
  peers: window.GunPeers,
})
window.user = window.gun.user()
// 登录
window.most = {
  login(username, password) {
    window.user.leave()
    return new Promise((resolve) => {
      window.user.auth(username, password, (ack) => {
        if (ack.err) {
          window.user.create(username, password, (ack) => {
            if (ack.err) {
              return resolve({ ok: false, message: '注册失败', data: ack.err })
            } else {
              return resolve({ ok: true, message: '注册成功', data: ack.pub })
            }
          })
        } else {
          return resolve({ ok: true, message: '登录成功', data: ack.sea.pub })
        }
      })
    })
  },
  leave() {
    window.user.leave()
    return new Promise((resolve) => {
      if (window.user._.sea) {
        return resolve({ ok: false, message: '注销失败', data: window.user._.sea })
      } else {
        return resolve({ ok: true, message: '注销成功' })
      }
    })
  },
  get(table) {
    return new Promise((resolve) => {
      const user = window.user
      if (!user.is) return resolve({ ok: false, message: '请先登录' })

      user.get(table).once((data) => {
        if (!data) {
          return resolve({ ok: false, message: '数据不存在' })
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
              return resolve({ ok: true, message: '获取成功', data: list })
            }
          })
      })
    })
  },
  put(table, key, json) {
    return new Promise((resolve) => {
      const user = window.user
      if (!user.is) return resolve({ ok: false, message: '请先登录' })
      try {
        const data = JSON.parse(json)
        user
          .get(table)
          .get(key)
          .put(data, (ack) => {
            if (ack.err) {
              return resolve({ ok: false, message: '写入失败', data: ack.err })
            } else {
              return resolve({ ok: true, message: '写入成功' })
            }
          })
      } catch (error) {
        return resolve({ ok: false, message: '写入失败', data: error })
      }
    })
  },
  del(table, key) {
    return new Promise((resolve) => {
      const user = window.user
      if (!user.is) return resolve({ ok: false, message: '请先登录' })
      user
        .get(table)
        .get(key)
        .put(null, (ack) => {
          if (ack.err) {
            return resolve({ ok: false, message: '删除失败', data: ack.err })
          } else {
            return resolve({ ok: true, message: '删除成功' })
          }
        })
    })
  },
}
