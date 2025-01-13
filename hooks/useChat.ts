import { useEffect, useState, useMemo } from 'react'
import { useUserStore } from '@/stores/userStore'
import gun from '@/stores/gun'

export interface Message {
  text: string
  address: string
  timestamp: number
}

export const useChat = (topic: string) => {
  // 使用 useMemo 确保 chat 只初始化一次
  const chat = useMemo(() => gun.get('most.box.' + topic), [topic])
  const { wallet } = useUserStore()
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // 监听所有子节点的变化
    chat.map().on((data, key) => {
      if (data && key) {
        setMessages((list) => {
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
      chat.off()
    }
  }, [chat]) // chat 依赖不会变，因为 useMemo 已经保证只执行一次

  const send = (text: string) => {
    if (wallet) {
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
  return { messages, send }
}
