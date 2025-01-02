import { useNoteStore } from '@/stores/noteStore'
import { ThemeText } from '@/components/Theme'
import PageView from '@/components/PageView'

import { Icon } from '@/assets/icon'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间插件
import 'dayjs/locale/zh-cn'
// 初始化相对时间插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
export default function NoteScreen() {
  const notes = useNoteStore((state) => state.notes)
  return (
    <PageView>
      <ThemeText>今天</ThemeText>

      <Icon.Camera />
      {notes
        .sort((a, b) => Number(b.updated_time) - Number(a.updated_time))
        .map((item) => (
          <ThemeText key={item.id}>{dayjs(Number(item.updated_time)).fromNow()}</ThemeText>
        ))}
    </PageView>
  )
}
