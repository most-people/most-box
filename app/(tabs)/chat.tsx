import { router, useRootNavigationState } from 'expo-router'
import PageTabView from '@/components/PageTabView'
import { Platform, TouchableOpacity, View } from 'react-native'
import { Icon } from '@/assets/icon'
import { Colors } from '@/constants/Colors'
import { ThemeText } from '@/components/Theme'
import { useEffect, useMemo, useRef } from 'react'
import { DialogPrompt } from '@/components/Dialog'
import { Topic, useTopic } from '@/hooks/useTopic'
import React from 'react'
import { useUserStore } from '@/stores/userStore'

export default function ChatScreen() {
  const { theme } = useUserStore()
  const rootNavigationState = useRootNavigationState()
  const topic = useTopic()
  const createTopicRef = useRef<any>()

  const topics = useMemo(() => {
    return topic.topics.sort((a, b) => b.timestamp - a.timestamp)
  }, [topic.topics])

  const open = () => {
    createTopicRef.current.openModal()
  }

  useEffect(() => {
    // 确保 Root Layout 已挂载
    if (Platform.OS === 'web' && rootNavigationState?.key) {
      const hash = window.location.hash
      if (hash) {
        router.replace({ pathname: '/topic/[topic]', params: { topic: hash.slice(1) } })
      }
    }
  }, [rootNavigationState?.key])

  const TopicItem = (item: Topic) => (
    <View style={{ flexDirection: 'row', gap: '10%', justifyContent: 'space-between' }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => router.push({ pathname: '/topic/[topic]', params: { topic: item.name } })}
      >
        <ThemeText type="link">#{item.name}</ThemeText>
      </TouchableOpacity>
      {item.timestamp !== 0 && (
        <TouchableOpacity onPress={() => topic.quit(item.name)}>
          <Icon.Exit style={{ width: 20, height: 20 }} fill={Colors[theme].border} />
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
      {topics.length === 0 ? (
        <>
          <ThemeText>没有关注的话题？</ThemeText>
          <TouchableOpacity onPress={() => router.push('/')}>
            <ThemeText type="link">去探索</ThemeText>
          </TouchableOpacity>
        </>
      ) : (
        <ThemeText>话题</ThemeText>
      )}
      {topics.map((item) => (
        <TopicItem key={String(item.timestamp)} {...item} />
      ))}
      <DialogPrompt ref={createTopicRef} title="加入话题" onConfirm={topic.join} />
    </PageTabView>
  )
}
