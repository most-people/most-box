import { useEffect, useMemo, useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import { router } from 'expo-router'

export interface Topic {
  name: string
  timestamp: number
}

export const useTopic = () => {
  const { wallet, gun } = useUserStore()
  // const user = useMemo(() => {
  //   if (wallet?.address && gun) {
  //     return gun.get('most.box?' + wallet.address)
  //   }
  // }, [wallet?.address, gun])

  // useEffect(() => {
  //   // https://gun.eco/docs/User#getting-a-user-via-alias
  //   if (gun && wallet?.address) {
  //     gun.get('~@' + wallet?.address).once((data) => {
  //       if (data) {
  //         const pub = Object.keys(data._['>'])[0]
  //         console.log('🌊', pub)
  //         // gun
  //         //   .get(pub)
  //         //   .get('test')
  //         //   .map()
  //         //   .once((data, key) => {
  //         //     console.log('Data:', data)
  //         //   })
  //       }
  //     })
  //   }
  // }, [gun, wallet?.address])

  const [topics, setTopics] = useState<Topic[]>([])

  // useEffect(() => {
  //   // 监听所有子节点的变化
  //   if (user) {
  //     setTopics([])
  //     user
  //       .get('topics')
  //       .map()
  //       .on((data, key) => {
  //         if (data && key) {
  //           setTopics((list) => {
  //             // 检查是否已经存在，避免重复添加
  //             if (list.some((e) => e.name === data.name)) {
  //               return list
  //             }
  //             return [...list, data]
  //           })
  //         }
  //       })

  //     // 清理监听器，防止内存泄漏
  //     return () => {
  //       user.off()
  //     }
  //   } else {
  //     setTopics([])
  //   }
  // }, [user])

  const join = (topic: string) => {
    // if (user) {
    //   if (!topics.some((e) => e.name === topic)) {
    //     const timestamp = Date.now()
    //     const data: Topic = { name: topic, timestamp }
    //     // 更新本地状态
    //     setTopics((list) => [data, ...list])
    //     // 使用唯一键存储消息
    //     user.get('topics').get(timestamp.toString()).put(data)
    //   }
    // }
    // if (topic) {
    //   router.push({ pathname: '/topic/[topic]', params: { topic } })
    // }
  }

  const quit = (name: string) => {
    // if (user) {
    //   const topic = topics.find((e) => e.name === name)
    //   if (topic) {
    //     // 更新本地状态
    //     setTopics((list) => list.filter((e) => e.name !== name))
    //     // 使用唯一键删除消息
    //     user.get('topics').get(topic.timestamp.toString()).put(null)
    //   }
    // }
  }

  return { topics, join, quit }
}
