import { Link, router, useRootNavigationState } from 'expo-router'
import PageTabView from '@/components/PageTabView'
import { Platform, TouchableOpacity, useColorScheme, View } from 'react-native'
import { Icon } from '@/assets/icon'
import { Colors } from '@/constants/Colors'
import { ThemeText } from '@/components/Theme'
import { useEffect, useMemo, useRef } from 'react'
import { DialogPrompt } from '@/components/Dialog'
import { Topic, useTopic } from '@/hooks/useTopic'
import React from 'react'

export default function IndexScreen() {
  const theme = useColorScheme() ?? 'dark'
  const rootNavigationState = useRootNavigationState()
  const topic = useTopic()
  const createTopicRef = useRef<any>()
  const topicsDefault = [
    {
      name: '什么是去中心化',
      timestamp: 0,
    },
    {
      name: '❄️',
      timestamp: 0,
    },
  ]
  const topics = useMemo(() => {
    return topic.topics.sort((a, b) => b.timestamp - a.timestamp)
  }, [topic.topics])

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

  const TopicItem = (item: Topic) => (
    <View style={{ flexDirection: 'row', gap: '10%', justifyContent: 'space-between' }}>
      <Link
        style={{ flex: 1 }}
        href={{
          pathname: '/chat',
          params: {
            name: item.name,
          },
        }}
      >
        <TouchableOpacity>
          <ThemeText type="link">#{item.name}</ThemeText>
        </TouchableOpacity>
      </Link>
      {item.timestamp !== 0 && (
        <TouchableOpacity onPress={() => topic.quit(item.name)}>
          <Icon.Exit width={20} fill={Colors[theme].disabled} />
        </TouchableOpacity>
      )}
    </View>
  )
  return (
    <PageTabView
      title="聊天"
      rightContent={
        <TouchableOpacity onPress={open}>
          <Icon.Add width={20} height={20} fill={Colors[theme].text} />
        </TouchableOpacity>
      }
    >
      <ThemeText>话题</ThemeText>
      {topics.map((item) => (
        <TopicItem key={String(item.timestamp)} {...item} />
      ))}
      {topics.length === 0 &&
        topicsDefault.map((item) => <TopicItem key={String(item.name)} {...item} />)}
      {/* 引入全局弹窗组件 */}
      <DialogPrompt ref={createTopicRef} title="加入话题" onConfirm={join} />
    </PageTabView>
  )
}
