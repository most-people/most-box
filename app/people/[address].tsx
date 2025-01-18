import { router, useLocalSearchParams } from 'expo-router'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PageView from '@/components/PageView'
import { useUserStore } from '@/stores/userStore'
import mp from '@/constants/mp'
import { SvgXml } from 'react-native-svg'
import { ThemeText } from '@/components/Theme'
import { useCopy } from '@/hooks/useCopy'

export default function TopicPage() {
  const params = useLocalSearchParams()
  const copy = useCopy()
  const address = params.address as string
  const { theme } = useUserStore()
  const styles = createStyles(theme)
  return (
    <PageView title={mp.formatAddress(address)}>
      <SvgXml xml={mp.avatar(address)} style={styles.avatar} />
      <TouchableOpacity onPress={() => copy(address)}>
        <ThemeText style={styles.account}>地址：{address}</ThemeText>
      </TouchableOpacity>
      <ThemeText>
        people 页面正在开发，欢迎来
        <TouchableOpacity onPress={() => router.push('/topic/用户反馈')}>
          <ThemeText type="link">#用户反馈</ThemeText>
        </TouchableOpacity>
        话题联系我们
      </ThemeText>
    </PageView>
  )
}

const createStyles = (theme: 'light' | 'dark') => {
  return StyleSheet.create({
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 10,
    },
    account: {
      color: '#888',
    },
  })
}
