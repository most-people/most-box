import { Icon } from '@/assets/icon'
import { ThemeText, ThemeView } from '@/components/Theme'
import { Colors } from '@/constants/Colors'
import mp from '@/constants/mp'
import { useUserStore } from '@/stores/userStore'
import { router } from 'expo-router'
import { ReactNode } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'

interface Tab {
  name: string
  pathname: Parameters<typeof router.push>[0]
  icon: ReactNode
}
export default function ProfileScreen() {
  const theme = useColorScheme() ?? 'dark'
  const styles = createStyles(theme)

  const wallet = useUserStore((state) => state.wallet)
  const exit = useUserStore((state) => state.exit)
  const insets = useSafeAreaInsets()
  // 动态计算头部高度
  const headerTop = Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0

  const tabs: Tab[] = [
    {
      name: '关于',
      pathname: '/about',
      icon: <Icon.About style={styles.icon} fill={Colors[theme].color} />,
    },
    {
      name: '设置',
      pathname: '/setting',
      icon: <Icon.Setting style={styles.icon} fill={Colors[theme].color} />,
    },
    {
      name: '志同道合',
      pathname: '/internationale',
      icon: <Icon.Join style={styles.icon} fill={Colors[theme].color} />,
    },
  ]

  return (
    <ScrollView style={[styles.container, { paddingTop: headerTop }]}>
      {/* 头像和名称区域 */}
      <View style={styles.profileHeader}>
        <TouchableOpacity>
          <SvgXml xml={mp.avatar(wallet?.address)} style={styles.avatar} />
        </TouchableOpacity>
        <ThemeView style={styles.infoContainer}>
          <ThemeText style={styles.name}>{wallet?.username}</ThemeText>
          <Text style={styles.account}>地址：{mp.formatAddress(wallet?.address)}</Text>
        </ThemeView>

        <TouchableOpacity>
          <Icon.QRCode color={Colors[theme].text} />
        </TouchableOpacity>
      </View>

      {/* 服务 */}
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/web3')}>
        <Icon.Web3 style={styles.icon} fill={Colors[theme].color} />
        <Text style={styles.menuText}>Web3</Text>
        <Icon.Arrow color={Colors[theme].primary} />
      </TouchableOpacity>

      {/* 菜单分组 */}
      <View style={styles.menuGroup}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(tab.pathname)}
          >
            {tab.icon}
            <Text style={styles.menuText}>{tab.name}</Text>
            <Icon.Arrow color={Colors[theme].primary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* 设置 */}

      <TouchableOpacity style={styles.menuItem} onPress={exit}>
        <Icon.Exit style={styles.icon} fill={Colors[theme].color} />
        <Text style={styles.menuText}>退出账户</Text>
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
      gap: 15,
      padding: 20,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 10,
    },
    infoContainer: {
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
      paddingInline: 20,
      height: 62,
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
      width: 32,
      height: 32,
    },
  })
}
