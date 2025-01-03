import { StyleSheet, Platform } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import PageView from '@/components/PageView'
import { ThemeText, ThemeView } from '@/components/Theme'

export default function MineScreen() {
  return (
    <PageView>
      <ThemeView style={styles.titleContainer}>
        <ThemeText type="title">Welcome!</ThemeText>
        <HelloWave />
      </ThemeView>
      <ThemeView style={styles.stepContainer}>
        <ThemeText type="subtitle">Step 1: Try it</ThemeText>
        <ThemeText>
          Edit <ThemeText type="defaultSemiBold">app/(tabs)/index.tsx</ThemeText> to see changes.
          Press{' '}
          <ThemeText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemeText>{' '}
          to open developer tools.
        </ThemeText>
      </ThemeView>
      <ThemeView style={styles.stepContainer}>
        <ThemeText type="subtitle">Step 2: Explore</ThemeText>
        <ThemeText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemeText>
      </ThemeView>
      <ThemeView style={styles.stepContainer}>
        <ThemeText type="subtitle">Step 3: Get a fresh start</ThemeText>
        <ThemeText>
          When you're ready, run <ThemeText type="defaultSemiBold">npm run reset-project</ThemeText>{' '}
          to get a fresh <ThemeText type="defaultSemiBold">app</ThemeText> directory. This will move
          the current <ThemeText type="defaultSemiBold">app</ThemeText> to{' '}
          <ThemeText type="defaultSemiBold">app-example</ThemeText>.
        </ThemeText>
      </ThemeView>
    </PageView>
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
