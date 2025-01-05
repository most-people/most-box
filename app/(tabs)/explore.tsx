import { StyleSheet } from 'react-native'

import PageTabView from '@/components/PageTabView'
import { ThemeText, ThemeView } from '@/components/Theme'

export default function TabTwoScreen() {
  return (
    <PageTabView title="探索">
      <ThemeView style={styles.titleContainer}>
        <ThemeText type="title">Explore</ThemeText>
      </ThemeView>
      <ThemeText>This app includes example code to help you get started.</ThemeText>
    </PageTabView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
