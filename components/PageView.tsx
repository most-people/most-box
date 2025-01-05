import type { PropsWithChildren, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeView } from '@/components/Theme'
import { AppHeader } from '@/components/AppHeader'

// 定义 PageTabView 的 props 类型
interface PageTabViewProps {
  title: string | string[]
  rightContent?: ReactNode // 插槽，传入右侧自定义内容
}

export default function PageView({
  children,
  title,
  rightContent,
}: PropsWithChildren<PageTabViewProps>) {
  return (
    <ThemeView style={styles.container}>
      <AppHeader title={title} rightContent={rightContent} />

      <ThemeView style={styles.content}>{children}</ThemeView>
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
