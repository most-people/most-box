import { Link, router, useRootNavigationState } from 'expo-router'
import PageTabView from '@/components/PageTabView'
import { Platform, TouchableOpacity, useColorScheme } from 'react-native'
import { Icon } from '@/assets/icon'
import { Colors } from '@/constants/Colors'
import { ThemeText } from '@/components/Theme'
import { useEffect, useRef } from 'react'
import { DialogPrompt } from '@/components/Dialog'

export default function IndexScreen() {
  const theme = useColorScheme() ?? 'dark'

  const topics = [{ name: '什么是去中心化' }, { name: '❄️' }]

  const rootNavigationState = useRootNavigationState()

  const createTopicRef = useRef<any>() // 获取子组件引用

  const open = () => {
    createTopicRef.current.openModal() // 打开弹窗
  }

  const confirm = (name: string) => {
    router.push({
      pathname: '/chat',
      params: { name },
    })
  }

  useEffect(() => {
    // 确保 Root Layout 已挂载
    if (Platform.OS === 'web' && rootNavigationState?.key) {
      const hash = window.location.hash
      if (hash) {
        router.replace({
          pathname: '/chat',
          params: { name: hash.slice(1) },
        })
      }
    }
  }, [rootNavigationState?.key])
  return (
    <PageTabView
      title="聊天"
      rightContent={
        <TouchableOpacity onPress={open}>
          <Icon.Add width={20} height={20} fill={Colors[theme].text} />
        </TouchableOpacity>
      }
    >
      <ThemeText type="subtitle">Topic</ThemeText>
      {topics.map((topic) => (
        <Link
          key={topic.name}
          href={{
            pathname: '/chat',
            params: {
              name: topic.name,
            },
          }}
        >
          <ThemeText type="link">#{topic.name}</ThemeText>
        </Link>
      ))}
      {/* 引入全局弹窗组件 */}
      <DialogPrompt ref={createTopicRef} title="加入话题" onConfirm={confirm} />
    </PageTabView>
  )
}
