import type { PropsWithChildren, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedRef } from 'react-native-reanimated'

import { ThemeHeader, ThemeView } from '@/components/Theme'
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground'

// 定义 PageView 的 props 类型
interface PageViewProps {
  title: string
  rightContent?: ReactNode // 插槽，传入右侧自定义内容
}

export default function PageView({
  children,
  title,
  rightContent,
}: PropsWithChildren<PageViewProps>) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const bottom = useBottomTabOverflow()

  return (
    <ThemeView style={styles.container}>
      <ThemeHeader title={title} rightContent={rightContent} />

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
