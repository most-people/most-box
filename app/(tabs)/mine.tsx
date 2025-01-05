import { Icon } from '@/assets/icon'
import { ThemeText, ThemeView } from '@/components/Theme'
import { Colors } from '@/constants/Colors'
import mp from '@/constants/mp'
import { useUserStore } from '@/stores/userStore'
import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'

export default function ProfileScreen() {
  const theme = useColorScheme() ?? 'dark'
  const styles = createStyles(theme)

  const wallet = useUserStore((state) => state.wallet)
  const insets = useSafeAreaInsets()
  // 动态计算头部高度
  const headerTop = Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0

  const tabs = [{ name: '收藏' }, { name: '收藏' }, { name: '收藏' }, { name: '收藏' }]

  return (
    <ScrollView style={[styles.container, { paddingTop: headerTop }]}>
      {/* 头像和名称区域 */}
      <View style={styles.profileHeader}>
        <SvgXml xml={mp.avatar(wallet?.address)} style={styles.avatar} />
        <ThemeView style={styles.infoContainer}>
          <ThemeText style={styles.name}>{wallet?.username}</ThemeText>
          <Text style={styles.account}>地址：{mp.formatAddress(wallet?.address)}</Text>
        </ThemeView>

        <TouchableOpacity>
          <Icon.QRCode color={Colors[theme].text} />
        </TouchableOpacity>
      </View>

      {/* 服务 */}
      <TouchableOpacity style={styles.menuItem}>
        <Image
          source={{ uri: 'https://via.placeholder.com/20' }} // 替换为实际图标 URL
          style={styles.icon}
        />
        <Text style={styles.menuText}>Web3</Text>
        <Icon.Arrow color={Colors[theme].primary} />
      </TouchableOpacity>

      {/* 菜单分组 */}
      <View style={styles.menuGroup}>
        {tabs.map((tab, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.icon} />
            <Text style={styles.menuText}>{tab.name}</Text>
            <Icon.Arrow color={Colors[theme].primary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* 设置 */}
      <TouchableOpacity style={styles.menuItem}>
        <Image source={{ uri: 'https://via.placeholder.com/20' }} style={styles.icon} />
        <Text style={styles.menuText}>退出登录</Text>
        <Icon.Arrow color={Colors[theme].primary} />
      </TouchableOpacity>
    </ScrollView>
  )
}
const createStyles = (theme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 10,
    },
    infoContainer: {
      marginLeft: 15,
      flex: 1,
    },
    qrIcon: {
      width: 20,
      height: 20,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    account: {
      fontSize: 14,
      color: '#888',
      marginTop: 5,
    },
    menuItem: {
      gap: 14,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
    },
    menuGroup: {
      marginTop: 10,
      marginBottom: 10,
    },
    menuText: {
      fontSize: 16,
      color: Colors[theme].color,
      flex: 1,
    },
    icon: {
      width: 20,
      height: 20,
    },
  })
}
