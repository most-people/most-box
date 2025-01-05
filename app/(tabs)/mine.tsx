import { StyleSheet } from 'react-native'

import PageTabView from '@/components/PageTabView'
import { ThemeText, ThemeView } from '@/components/Theme'

export default function MineScreen() {
  return (
    <PageTabView title="我的">
      <ThemeView style={styles.titleContainer}>
        <ThemeText type="title">Welcome!</ThemeText>
      </ThemeView>
    </PageTabView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
