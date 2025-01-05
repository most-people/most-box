import React, { ReactNode } from 'react'
import { TouchableOpacity, StyleSheet, Platform, StatusBar, useColorScheme } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from '@/assets/icon'
import { ThemeText, ThemeView } from '@/components/Theme'
import { Colors } from '@/constants/Colors'

interface AppHeaderProps {
  title: string | string[]
  rightContent?: ReactNode // 插槽，传入右侧自定义内容
}
export const AppHeader = ({ title, rightContent }: AppHeaderProps) => {
  const theme = useColorScheme() ?? 'dark'
  const navigation = useNavigation()
  const route = useRoute()
  const insets = useSafeAreaInsets()

  const tabs = ['index', 'note', 'explore', 'mine']

  // 动态计算头部高度
  const headerHeight =
    Platform.OS === 'ios'
      ? 44 + insets.top // iOS：默认导航栏高度 + 顶部安全区域高度
      : 56 + (StatusBar.currentHeight || 0) // Android：默认导航栏高度 + 状态栏高度

  const back = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: '(tabs)' as never }], // 将首页设置为目标页面，替换 'Home' 为你的首页路由名称
      })
    }
  }

  return (
    <ThemeView
      style={[
        styles.header,
        {
          height: headerHeight,
          paddingTop: insets.top,
        },
      ]}
    >
      <ThemeView style={styles.leftContainer}>
        {!tabs.includes(route.name) && (
          <TouchableOpacity onPress={back}>
            <Icon.Back width={24} height={24} fill={Colors[theme].text} />
          </TouchableOpacity>
        )}
      </ThemeView>
      <ThemeText style={styles.title}>{title}</ThemeText>
      <ThemeView style={styles.rightContainer}>{rightContent}</ThemeView>
    </ThemeView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgb(39, 39, 41)',
  },
  title: {
    fontSize: 18,
  },
  leftContainer: {
    minWidth: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    minWidth: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})
