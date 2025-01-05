import PageView from '@/components/PageView'
import { ThemeText } from '@/components/Theme'

export default function Web3Page() {
  return (
    <PageView title={'Web3'}>
      <ThemeText type="subtitle">Web3</ThemeText>
      <ThemeText>
        旨在重塑互联网生态，将用户的控制权和数据所有权还给个人，推动更加公平和透明的人类社会发展。
      </ThemeText>
    </PageView>
  )
}
