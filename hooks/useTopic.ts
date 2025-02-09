import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { router } from 'expo-router'
import mp from '@/constants/mp'

export interface Topic {
  name: string
  timestamp: number
}

export const useTopic = () => {
  const { gun, pub } = useUserStore()
  const [topics, setTopics] = useState<Topic[]>([])

  const init = async () => {
    const res = await window.most.get('topics')
    if (res.ok) {
      setTopics(res.data as Topic[])
    }
  }

  const join = (name: string) => {
    if (gun && pub) {
      // 检查是否已经存在，避免重复添加
      if (!topics.some((e) => e.name === name)) {
        const timestamp = Date.now()
        const data: Topic = { name, timestamp }
        // 使用唯一键存储消息
        window.most.put('topics', mp.getHash(name), data).then((res) => {
          if (res.ok) {
            setTopics((prev) => [data, ...prev])
          }
        })
      }
    }
    router.push({ pathname: '/topic/[topic]', params: { topic: name } })
  }

  const quit = (name: string) => {
    if (pub && gun) {
      const topic = topics.find((e) => e.name === name)
      if (topic) {
        // 使用唯一键删除消息
        const key = mp.getHash(name)
        window.most.del('topics', key).then((res) => {
          if (res.ok) {
            setTopics((list) => list.filter((e) => mp.getHash(e.name) !== key))
          }
        })
      }
    }
  }

  // https://gun.eco/docs/User#getting-a-user-via-alias
  useEffect(() => {
    if (gun && pub) {
      init()
    } else {
      setTopics([])
    }
  }, [gun, pub])

  return { topics, join, quit }
}
