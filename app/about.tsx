//

import PageView from '@/components/PageView'
import { ThemeText } from '@/components/Theme'

const AboutPage = () => {
  return (
    <PageView title={'关于'}>
      <ThemeText>
        通俗地讲，就是每个人都是中心，每个人都可以连接并影响其他节点，这种扁平化、开源化、平等化的现象或结构，称之为“去中心化”。
      </ThemeText>
    </PageView>
  )
}
export default AboutPage
