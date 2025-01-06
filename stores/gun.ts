import { MostWallet } from '@/constants/MostWallet'
import Gun from 'gun'
import SEA from 'gun/sea'
import asyncStore from 'gun/lib/ras.js'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Message {
  text: string
  address: string
  timestamp: number
}
const gun = new Gun({
  localStorage: false,
  // 替换存储适配器
  store: asyncStore({ AsyncStorage }),
  peers: [
    'https://gun-manhattan.herokuapp.com/gun',
    // 本地
    'http://localhost:1976/gun',
  ],
})

export const useChat = (topic: string) => {
  // const chat = gun.get(topic)
  const wallet = useUserStore((state) => state.wallet)

  const [messages, setMessages] = useState<Message[]>([
    // { address: '', text: `大家好，今天闲聊的话题是：#${name}`, timestamp: 0 },
    // { address: wallet?.address || '', text: '可以开始了', timestamp: 0 },
  ])
  // 用户登录或创建账户
  const login = async (username: string, password: string) => {
    const user = gun.user
    console.log('🌊', user)
    // user.create(username, password, (ack) => {
    //   // if (ack) {
    //   //   user.auth(username, password) // 如果用户存在，直接登录
    //   // }
    //   console.log('用户登录成功:', username)
    // })
    // return user
  }

  useEffect(() => {
    if (wallet) {
      const user = login(wallet.username, wallet.private_key)
    }
  }, [wallet])

  return { messages }
}
