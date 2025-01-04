import { StyleSheet, useColorScheme } from 'react-native'
import { useNoteStore } from '@/stores/noteStore'
import { ThemeText, ThemeView } from '@/components/Theme'
import PageView from '@/components/PageView'

import { Icon } from '@/assets/icon'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间插件
import 'dayjs/locale/zh-cn'
import React from 'react'

// 初始化相对时间插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
export default function NoteScreen() {
  const notes = useNoteStore((state) => state.notes)
  const theme = useColorScheme() ?? 'light'
  return (
    <PageView title="笔记">
      <ThemeText>今天</ThemeText>
      <ThemeView
        style={{
          ...styles.camera,
          backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.14)',
        }}
      >
        <Icon.Camera
          style={styles.cameraIcon}
          fill={theme === 'light' ? 'rgba(0, 0, 0, 0.14)' : 'rgba(255, 255, 255, 0.14)'}
        />
      </ThemeView>
      {notes
        .sort((a, b) => Number(b.updated_time) - Number(a.updated_time))
        .map((item) => (
          <ThemeView key={item.id}>
            <ThemeText>{dayjs(Number(item.updated_time)).fromNow()}</ThemeText>
            <ThemeText>{item.title}</ThemeText>
          </ThemeView>
        ))}
    </PageView>
  )
}

const styles = StyleSheet.create({
  camera: {
    cursor: 'pointer',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: { width: 40, height: 40 },
})
