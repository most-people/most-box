import PageView from '@/components/PageView'
import { ThemeText } from '@/components/Theme'

export default function Web3Page() {
  return (
    <PageView title={'设置'}>
      <ThemeText type="subtitle">令牌过期时间</ThemeText>
      <ThemeText>1天</ThemeText>
    </PageView>
  )
}
