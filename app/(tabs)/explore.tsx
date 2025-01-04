import { StyleSheet, Image, Platform } from 'react-native'

import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import PageView from '@/components/PageView'
import { ThemeText, ThemeView } from '@/components/Theme'

export default function TabTwoScreen() {
  return (
    <PageView title="探索">
      <ThemeView style={styles.titleContainer}>
        <ThemeText type="title">Explore</ThemeText>
      </ThemeView>
      <ThemeText>This app includes example code to help you get started.</ThemeText>
      <Collapsible title="File-based routing">
        <ThemeText>
          This app has two screens:{' '}
          <ThemeText type="defaultSemiBold">app/(tabs)/index.tsx</ThemeText> and{' '}
          <ThemeText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemeText>
        </ThemeText>
        <ThemeText>
          The layout file in <ThemeText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemeText>{' '}
          sets up the tab navigator.
        </ThemeText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemeText type="link">Learn more</ThemeText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemeText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemeText type="defaultSemiBold">w</ThemeText> in the terminal running this project.
        </ThemeText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemeText>
          For static images, you can use the <ThemeText type="defaultSemiBold">@2x</ThemeText> and{' '}
          <ThemeText type="defaultSemiBold">@3x</ThemeText> suffixes to provide files for different
          screen densities
        </ThemeText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemeText type="link">Learn more</ThemeText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemeText>
          Open <ThemeText type="defaultSemiBold">app/_layout.tsx</ThemeText> to see how to load{' '}
          <ThemeText style={{ fontFamily: 'SpaceMono' }}>custom fonts such as this one.</ThemeText>
        </ThemeText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemeText type="link">Learn more</ThemeText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemeText>
          This template has light and dark mode support. The{' '}
          <ThemeText type="defaultSemiBold">useColorScheme()</ThemeText> hook lets you inspect what
          the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemeText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemeText type="link">Learn more</ThemeText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemeText>
          This template includes an example of an animated component. The{' '}
          <ThemeText type="defaultSemiBold">components/HelloWave.tsx</ThemeText> component uses the
          powerful <ThemeText type="defaultSemiBold">react-native-reanimated</ThemeText> library to
          create a waving hand animation.
        </ThemeText>
        {Platform.select({
          ios: (
            <ThemeText>
              The <ThemeText type="defaultSemiBold">components/PageView.tsx</ThemeText> component
              provides a parallax effect for the header image.
            </ThemeText>
          ),
        })}
      </Collapsible>
    </PageView>
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
