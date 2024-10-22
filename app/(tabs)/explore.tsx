import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Image, Platform } from 'react-native'

import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { MPText } from '@/components/MPText'
import { MPView } from '@/components/MPView'

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      <MPView style={styles.titleContainer}>
        <MPText type="title">Explore</MPText>
      </MPView>
      <MPText>This app includes example code to help you get started.</MPText>
      <Collapsible title="File-based routing">
        <MPText>
          This app has two screens: <MPText type="defaultSemiBold">app/(tabs)/index.tsx</MPText> and{' '}
          <MPText type="defaultSemiBold">app/(tabs)/explore.tsx</MPText>
        </MPText>
        <MPText>
          The layout file in <MPText type="defaultSemiBold">app/(tabs)/_layout.tsx</MPText> sets up
          the tab navigator.
        </MPText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <MPText type="link">Learn more</MPText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <MPText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <MPText type="defaultSemiBold">w</MPText> in the terminal running this project.
        </MPText>
      </Collapsible>
      <Collapsible title="Images">
        <MPText>
          For static images, you can use the <MPText type="defaultSemiBold">@2x</MPText> and{' '}
          <MPText type="defaultSemiBold">@3x</MPText> suffixes to provide files for different screen
          densities
        </MPText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <MPText type="link">Learn more</MPText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <MPText>
          Open <MPText type="defaultSemiBold">app/_layout.tsx</MPText> to see how to load{' '}
          <MPText style={{ fontFamily: 'SpaceMono' }}>custom fonts such as this one.</MPText>
        </MPText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <MPText type="link">Learn more</MPText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <MPText>
          This template has light and dark mode support. The{' '}
          <MPText type="defaultSemiBold">useColorScheme()</MPText> hook lets you inspect what the
          user's current color scheme is, and so you can adjust UI colors accordingly.
        </MPText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <MPText type="link">Learn more</MPText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <MPText>
          This template includes an example of an animated component. The{' '}
          <MPText type="defaultSemiBold">components/HelloWave.tsx</MPText> component uses the
          powerful <MPText type="defaultSemiBold">react-native-reanimated</MPText> library to create
          a waving hand animation.
        </MPText>
        {Platform.select({
          ios: (
            <MPText>
              The <MPText type="defaultSemiBold">components/ParallaxScrollView.tsx</MPText>{' '}
              component provides a parallax effect for the header image.
            </MPText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
