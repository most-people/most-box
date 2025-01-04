import React, { ReactNode } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from '@/assets/icon'

interface ThemeHeaderProps {
  title: string | string[]
  rightContent?: ReactNode // 插槽，传入右侧自定义内容
}
const ThemeHeader = ({ title, rightContent }: ThemeHeaderProps) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

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
    <View style={[styles.header, { height: headerHeight, paddingTop: insets.top }]}>
      <TouchableOpacity onPress={back}>
        <Icon.Back width={24} height={24} fill="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>{rightContent}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1E88E5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default ThemeHeader
