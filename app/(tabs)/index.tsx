import { Link, router, useRootNavigationState } from 'expo-router'
import PageTabView from '@/components/PageTabView'
import { Platform, TouchableOpacity, useColorScheme } from 'react-native'
import { Icon } from '@/assets/icon'
import { Colors } from '@/constants/Colors'
import { ThemeText, ThemeView } from '@/components/Theme'
import { useEffect, useRef } from 'react'
import { DialogPrompt } from '@/components/Dialog'
import { useTopic } from '@/hooks/useTopic'

export default function IndexScreen() {
  const theme = useColorScheme() ?? 'dark'
  const rootNavigationState = useRootNavigationState()
  const topic = useTopic()
  const createTopicRef = useRef<any>()

  const open = () => {
    createTopicRef.current.openModal()
  }

  const join = (name: string) => {
    router.push({
      pathname: '/chat',
      params: { name },
    })
    topic.join(name)
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
      {topic.topics.map((item) => (
        <TouchableOpacity
          style={{ flexDirection: 'row', gap: '10%', justifyContent: 'space-between' }}
          key={String(item.timestamp)}
        >
          <Link
            style={{ flex: 1 }}
            href={{
              pathname: '/chat',
              params: {
                name: item.name,
              },
            }}
          >
            <ThemeText type="link">#{item.name}</ThemeText>
          </Link>
          <Icon.Exit
            onPress={() => topic.quit(item.name)}
            width={20}
            fill={Colors[theme].disabled}
          />
        </TouchableOpacity>
      ))}
      {/* 引入全局弹窗组件 */}
      <DialogPrompt ref={createTopicRef} title="加入话题" onConfirm={join} />
    </PageTabView>
  )
}
