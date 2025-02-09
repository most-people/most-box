import { router } from 'expo-router'
import PageTabView from '@/components/PageTabView'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from '@/assets/icon'
import { Colors } from '@/constants/Colors'
import { ThemeText } from '@/components/Theme'
import { useMemo, useRef } from 'react'
import { DialogPrompt } from '@/components/Dialog'
import { Topic, useTopic } from '@/hooks/useTopic'
import React from 'react'
import { useUserStore } from '@/stores/userStore'

export default function ChatScreen() {
  const { theme } = useUserStore()
  const topic = useTopic()
  const createTopicRef = useRef<any>()
  const open = () => {
    createTopicRef.current.openModal()
  }

  const topics = useMemo(() => {
    // 排序
    const list = topic.topics.sort((a, b) => b.timestamp - a.timestamp)
    // 去重
    const map = new Map<string, Topic>(list.map((e) => [e.name, e]))
    return map
  }, [topic.topics])

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
      {topics.size === 0 ? (
        <>
          <ThemeText>没有关注的话题？</ThemeText>
          <TouchableOpacity onPress={() => router.push('/')}>
            <ThemeText type="link">去探索</ThemeText>
          </TouchableOpacity>
        </>
      ) : (
        <ThemeText>话题</ThemeText>
      )}
      {Array.from(topics).map(([key, item]) => (
        <TopicItem key={key} {...item} />
      ))}
      <DialogPrompt ref={createTopicRef} title="加入话题" onConfirm={topic.join} />
    </PageTabView>
  )
}
