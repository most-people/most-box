import PageView from '@/components/PageView'
import { ThemeText } from '@/components/Theme'
import { Link } from 'expo-router'

export default function AboutPage() {
  return (
    <PageView title={'关于'}>
      <ThemeText type="subtitle">去中心化</ThemeText>
      <ThemeText>
        通俗地讲，就是每个人都是中心，每个人都可以连接并影响其他节点，这种扁平化、开源化、平等化的现象或结构。
      </ThemeText>
      <ThemeText type="subtitle">密码朋克</ThemeText>
      <ThemeText>
        热衷于使用加密技术保护隐私的人们，他们相信通过技术而不是法律，才能真正保障个人信息的安全和自由。
      </ThemeText>

      <ThemeText type="subtitle">论文</ThemeText>

      <Link href="/about/paper">
        <ThemeText type="link">
          《论如何利用 IPFS+Filiecoin+Gun.js+以太坊智能合约构建完全不需要后端的去中心化应用》
        </ThemeText>
      </Link>
    </PageView>
  )
}
