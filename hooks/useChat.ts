import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import gun from '@/stores/gun'

interface Message {
  text: string
  address: string
  timestamp: number
}
export const useChat = (topic: string) => {
  const chat = gun.get(topic)
  const wallet = useUserStore((state) => state.wallet)

  const [messages, setMessages] = useState<Message[]>([
    // { address: '', text: `大家好，今天闲聊的话题是：#${name}`, timestamp: 0 },
    // { address: wallet?.address || '', text: '可以开始了', timestamp: 0 },
  ])

  useEffect(() => {
    // 模拟一个消息监听器
    chat.on((data, key) => {
      // 忽略内部标记
      console.log('GUN:', key)
      console.log('GUN:', data)
    })
  }, [chat])

  // chat.put({ address: 'xx00', text: 'TEST', timestamp: Date.now() })

  const addMessage = (text: string) => {
    if (wallet) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, address: '', timestamp: dayjs().unix() },
      ])
      chat.put({ address: wallet.address, text, timestamp: Date.now() })
    }
  }

  return { messages, addMessage }
}
