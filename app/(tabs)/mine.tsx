import { Image, StyleSheet, Platform } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { MPText } from '@/components/MPText'
import { MPView } from '@/components/MPView'

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <MPView style={styles.titleContainer}>
        <MPText type="title">Welcome!</MPText>
        <HelloWave />
      </MPView>
      <MPView style={styles.stepContainer}>
        <MPText type="subtitle">Step 1: Try it</MPText>
        <MPText>
          Edit <MPText type="defaultSemiBold">app/(tabs)/index.tsx</MPText> to see changes. Press{' '}
          <MPText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </MPText>{' '}
          to open developer tools.
        </MPText>
      </MPView>
      <MPView style={styles.stepContainer}>
        <MPText type="subtitle">Step 2: Explore</MPText>
        <MPText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </MPText>
      </MPView>
      <MPView style={styles.stepContainer}>
        <MPText type="subtitle">Step 3: Get a fresh start</MPText>
        <MPText>
          When you're ready, run <MPText type="defaultSemiBold">npm run reset-project</MPText> to
          get a fresh <MPText type="defaultSemiBold">app</MPText> directory. This will move the
          current <MPText type="defaultSemiBold">app</MPText> to{' '}
          <MPText type="defaultSemiBold">app-example</MPText>.
        </MPText>
      </MPView>
    </ParallaxScrollView>
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
