import type { PropsWithChildren, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedRef } from 'react-native-reanimated'

import { ThemeView } from '@/components/Theme'
import { AppHeader } from '@/components/AppHeader'
import { useBottomTabOverflow } from '@/components/TabBarBackground'

// 定义 PageTabView 的 props 类型
interface PageTabViewProps {
  title: string | string[]
  rightContent?: ReactNode // 插槽，传入右侧自定义内容
}

export default function PageTabView({
  children,
  title,
  rightContent,
}: PropsWithChildren<PageTabViewProps>) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const bottom = useBottomTabOverflow()

  return (
    <ThemeView style={styles.container}>
      <AppHeader title={title} rightContent={rightContent} leftContent={<ThemeView></ThemeView>} />

      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <ThemeView style={styles.content}>{children}</ThemeView>
      </Animated.ScrollView>
    </ThemeView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
})
