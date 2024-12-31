// 阮一峰 : 浏览器数据库 IndexedDB 入门教程
// https://www.ruanyifeng.com/blog/2018/07/indexeddb.html

export interface UserDB {
  userID: string
  key: CryptoKey
  token: string
  // 加密聊天 - 单线联系
  mp_private_key: string
}

let db: IDBDatabase | undefined

export const indexDB = {
  init(): Promise<void> {
    return new Promise((resolve) => {
      const request = window.indexedDB.open('most.box', 1)
      request.onsuccess = () => {
        db = request.result
        if (db.objectStoreNames.contains('user')) {
          resolve()
        }
      }
      request.onupgradeneeded = (event: any) => {
        db = event.target.result as IDBDatabase
        // 表格 table
        if (!db.objectStoreNames.contains('user')) {
          // 主键 keyPath
          db.createObjectStore('user', { keyPath: 'userID' })
        }
        if (db.objectStoreNames.contains('user')) {
          resolve()
        }
      }
    })
  },

  // 设置用户
  setUser(userDB: UserDB): Promise<boolean> {
    return new Promise((resolve) => {
      if (!db) {
        resolve(false)
        return
      }
      const store = db.transaction(['user'], 'readwrite').objectStore('user')
      const request = store.put(userDB)
      request.onsuccess = () => {
        window.localStorage.setItem('userID', userDB.userID)
        resolve(true)
      }
      request.onerror = () => {
        resolve(false)
      }
    })
  },

  // 删除用户
  delUser(userID: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!db) {
        resolve(false)
        return
      }
      const store = db.transaction(['user'], 'readwrite').objectStore('user')
      const request = store.delete(userID)
      request.onsuccess = () => {
        resolve(true)
      }
      request.onerror = () => {
        resolve(false)
      }
    })
  },
  // 获取用户
  async getUserDB(userID: string): Promise<UserDB | null> {
    return new Promise((resolve) => {
      if (!db) {
        resolve(null)
        return
      }
      const store = db.transaction(['user']).objectStore('user')
      const request = store.get(userID)
      request.onsuccess = () => {
        if (request.result) {
          const user: UserDB = request.result
          resolve(user)
        } else {
          resolve(null)
        }
      }
      request.onerror = () => {
        resolve(null)
      }
    })
  },
  // 获取用户 key
  async getKey() {
    const userID = window.localStorage.getItem('userID')
    if (userID) {
      const userDB = await this.getUserDB(userID)
      if (userDB) {
        return userDB.key
      }
    }
  },
}
