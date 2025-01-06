import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/userStore'
// import gun from '@/stores/gun'

interface Message {
  text: string
  address: string
  timestamp: number
}

export const useChat = (topic: string) => {
  // const chat = gun.get('most.box:' + topic)
  // const wallet = useUserStore((state) => state.wallet)
  const [messages, setMessages] = useState<Message[]>([])
  // useEffect(() => {
  //   // 监听所有子节点的变化
  //   chat.map().on((data, key) => {
  //     if (data && key) {
  //       setMessages((prevMessages) => {
  //         // 检查是否已经存在，避免重复添加
  //         if (prevMessages.some((msg) => msg.timestamp === data.timestamp)) {
  //           return prevMessages
  //         }
  //         return [...prevMessages, data]
  //       })
  //     }
  //   })
  // }, [chat])
  const send = (text: string) => {
    // if (wallet) {
    //   const newMessage = {
    //     text,
    //     address: wallet.address,
    //     timestamp: Date.now(),
    //   }
    //   // 更新本地状态
    //   setMessages((prevMessages) => [...prevMessages, newMessage])
    //   // 使用唯一键存储消息
    //   chat.get(newMessage.timestamp.toString()).put(newMessage)
    // }
  }
  return { messages, send }
}
