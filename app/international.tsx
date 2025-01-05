import PageView from '@/components/PageView'
import { ThemeText } from '@/components/Theme'

export default function InternationalPage() {
  const Chorus = () => (
    <ThemeText>
      这是最后的斗争，团结起来到明天，
      <br />
      英特纳雄耐尔，就一定要实现！
      <br />
      这是最后的斗争，团结起来到明天，
      <br />
      英特纳雄耐尔，就一定要实现！
    </ThemeText>
  )
  return (
    <PageView title={'international'}>
      <ThemeText type="subtitle">国际歌</ThemeText>
      <ThemeText>
        起来，饥寒交迫的奴隶！ <br />
        起来，全世界受苦的人！
        <br />
        满腔的热血已经沸腾，要为真理而斗争！
        <br />
        旧世界打个落花流水，奴隶们起来，起来！
        <br />
        不要说我们一无所有，我们要做天下的主人！
      </ThemeText>
      <ThemeText>
        从来就没有什么救世主，
        <br />
        也不靠神仙皇帝！
        <br />
        要创造人类的幸福，全靠我们自己！ <br />
        我们要夺回劳动果实，让思想冲破牢笼！
        <br />
        快把那炉火烧得通红，趁热打铁才能成功！
      </ThemeText>
      <ThemeText>
        是谁创造了人类世界？
        <br />
        是我们劳动群众！
        <br />
        一切归劳动者所有，哪能容得寄生虫？！
        <br />
        最可恨那些毒蛇猛兽，吃尽了我们的血肉！
        <br />
        一旦把它们消灭干净，鲜红的太阳照遍全球！
      </ThemeText>
      <Chorus />
    </PageView>
  )
}
