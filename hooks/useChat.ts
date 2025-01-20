import { useEffect, useState, useMemo } from 'react'
import { useUserStore } from '@/stores/userStore'

export interface Message {
  text: string
  address: string
  timestamp: number
}

export const useChat = (topic: string) => {
  const { wallet, gun } = useUserStore()
  // 使用 useMemo 确保 chat 只初始化一次
  const chat = useMemo(() => {
    if (gun) {
      return gun.get('most.box.' + topic)
    }
  }, [topic, gun])
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!chat) return
    // 监听所有子节点的变化
    chat.map().on((data, key) => {
      if (data && key) {
        setMessages((list) => {
          // 如果消息已存在，不重复添加
          if (list.some((e) => e.timestamp === data.timestamp)) {
            return list
          }
          // 如果是已删除的消息（内容被覆盖为空），则不显示
          if (data.text === '' || data.address === '') {
            return list
          }
          return [...list, data]
        })
      }
    })

    // 清理监听器，防止内存泄漏
    return () => {
      chat.off()
    }
  }, [chat])

  const send = (text: string) => {
    if (wallet && chat) {
      const timestamp = Date.now()
      const newMessage = {
        text,
        address: wallet.address,
        timestamp,
      }
      // 更新本地状态
      setMessages((prevMessages) => [newMessage, ...prevMessages])
      // 使用唯一键存储消息
      chat.get(timestamp.toString()).put(newMessage)
    }
  }

  const del = (timestamp: number) => {
    if (!chat) return
    // 用无意义数据覆盖原始消息内容
    const empty = {
      text: '',
      address: '',
      timestamp: timestamp, // 保留原始时间戳以便定位
    }

    // 更新 Gun 数据库
    chat.get(timestamp.toString()).put(empty)

    // 更新本地状态
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.timestamp !== timestamp))
  }
  return { messages, send, del }
}
