import type { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedRef } from 'react-native-reanimated'

import { ThemeView } from '@/components/Theme'
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground'

export default function PageView({ children }: PropsWithChildren) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const bottom = useBottomTabOverflow()

  return (
    <ThemeView style={styles.container}>
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
