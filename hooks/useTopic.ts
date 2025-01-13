import { useEffect, useMemo, useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import gun from '@/stores/gun'
import { router } from 'expo-router'

export interface Topic {
  name: string
  timestamp: number
}

export const useTopic = () => {
  const { wallet } = useUserStore()
  const user = useMemo(() => {
    if (wallet?.address) {
      return gun.get('most.box?' + wallet?.address)
    }
  }, [wallet?.address])

  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    // 监听所有子节点的变化
    if (user) {
      setTopics([])
      user
        .get('topics')
        .map()
        .on((data, key) => {
          if (data && key) {
            setTopics((list) => {
              // 检查是否已经存在，避免重复添加
              if (list.some((e) => e.timestamp === data.timestamp)) {
                return list
              }
              return [...list, data]
            })
          }
        })

      // 清理监听器，防止内存泄漏
      return () => {
        user.off()
      }
    }
  }, [user])

  const join = (name: string) => {
    if (user) {
      if (!topics.some((e) => e.name === name)) {
        const timestamp = Date.now()
        const data: Topic = { name, timestamp }
        // 更新本地状态
        setTopics((list) => [data, ...list])
        // 使用唯一键存储消息
        user.get('topics').get(timestamp.toString()).put(data)
      }
    }
    router.push({
      pathname: '/chat',
      params: { name },
    })
  }

  const quit = (name: string) => {
    if (user) {
      const topic = topics.find((e) => e.name === name)
      if (topic) {
        // 更新本地状态
        setTopics((list) => list.filter((e) => e.name !== name))
        // 使用唯一键删除消息
        user.get('topics').get(topic.timestamp.toString()).put(null)
      }
    }
  }
  return { topics, join, quit }
}
