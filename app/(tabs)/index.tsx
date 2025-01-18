import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import PageTabView from '@/components/PageTabView'
import { ThemeText, ThemeView } from '@/components/Theme'
import { useTopic } from '@/hooks/useTopic'
import { router, useRootNavigationState } from 'expo-router'
import { useEffect } from 'react'

export default function ExploreScreen() {
  const rootNavigationState = useRootNavigationState()
  useEffect(() => {
    // 确保 Root Layout 已挂载
    if (Platform.OS === 'web' && rootNavigationState?.key) {
      const hash = window.location.hash
      if (hash) {
        router.replace({ pathname: '/topic/[topic]', params: { topic: hash.slice(1) } })
      }
    }
  }, [rootNavigationState?.key])

  const topics = [
    {
      name: '什么是去中心化',
      timestamp: 0,
    },
    {
      name: 'LYX',
      timestamp: 0,
    },
    {
      name: '星际文件系统',
      timestamp: 0,
    },
    {
      name: '用户反馈',
      timestamp: 0,
    },
  ]
  const topic = useTopic()
  return (
    <PageTabView title="探索">
      <ThemeView style={styles.titleContainer}>
        <ThemeText type="title">Explore</ThemeText>
      </ThemeView>
      <ThemeText>——开发中，之后会根据关注人数排序</ThemeText>
      <ThemeText>话题</ThemeText>
      {topics.map((item) => (
        <ThemeView
          key={item.name}
          style={{ flexDirection: 'row', gap: '10%', justifyContent: 'space-between' }}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={() => topic.join(item.name)}>
            <ThemeText type="link">#{item.name}</ThemeText>
          </TouchableOpacity>
        </ThemeView>
      ))}
    </PageTabView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
