import PageView from '@/components/PageView'
import { ThemeText } from '@/components/Theme'
import { useUserStore } from '@/stores/userStore'

export default function Web3Page() {
  const { wallet } = useUserStore()
  return (
    <PageView title={'Web3'}>
      <ThemeText type="subtitle">Web3</ThemeText>
      <ThemeText>
        旨在重塑互联网生态，将用户的控制权和数据所有权还给个人，推动更加公平和透明的人类社会发展。
      </ThemeText>
      <ThemeText type="subtitle">ETH Address</ThemeText>
      <ThemeText>{wallet?.address}</ThemeText>
      <ThemeText type="subtitle">X25519 Public Key</ThemeText>
      <ThemeText>{wallet?.public_key}</ThemeText>
      <ThemeText type="subtitle">X25519 Private Key</ThemeText>
      <ThemeText>{wallet?.private_key}</ThemeText>
    </PageView>
  )
}
