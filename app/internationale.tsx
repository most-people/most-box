import PageView from '@/components/PageView'
import { ThemeText } from '@/components/Theme'

export default function InternationalPage() {
  const Chorus = () => (
    <ThemeText type="hide">
      这是最后的斗争，团结起来到明天，
      {'\n'}
      英特纳雄耐尔，就一定要实现！
      {'\n'}
      这是最后的斗争，团结起来到明天，
      {'\n'}
      英特纳雄耐尔，就一定要实现！
    </ThemeText>
  )
  return (
    <PageView title={'Internationale'}>
      <ThemeText type="subtitle">文明演化与宇宙尺度的社会发展</ThemeText>
      <ThemeText>
        探讨文明如何跨越行星界限发展为「戴森球文明」或「卡尔达肖夫等级」中的高等级文明。
      </ThemeText>

      <ThemeText type="hide">国际歌</ThemeText>
      <ThemeText type="hide">
        起来，饥寒交迫的奴隶！ {'\n'}
        起来，全世界受苦的人！
        {'\n'}
        满腔的热血已经沸腾，要为真理而斗争！
        {'\n'}
        旧世界打个落花流水，奴隶们起来，起来！
        {'\n'}
        不要说我们一无所有，我们要做天下的主人！
      </ThemeText>
      <ThemeText type="hide">
        从来就没有什么救世主，
        {'\n'}
        也不靠神仙皇帝！
        {'\n'}
        要创造人类的幸福，全靠我们自己！ {'\n'}
        我们要夺回劳动果实，让思想冲破牢笼！
        {'\n'}
        快把那炉火烧得通红，趁热打铁才能成功！
      </ThemeText>
      <ThemeText type="hide">
        是谁创造了人类世界？
        {'\n'}
        是我们劳动群众！
        {'\n'}
        一切归劳动者所有，哪能容得寄生虫？！
        {'\n'}
        最可恨那些毒蛇猛兽，吃尽了我们的血肉！
        {'\n'}
        一旦把它们消灭干净，鲜红的太阳照遍全球！
      </ThemeText>
      <Chorus />
    </PageView>
  )
}
