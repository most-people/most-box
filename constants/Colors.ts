/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tint = '#c93721'

export const Colors = {
  tint,
  link: 'rgb(123,129,151)',
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tint,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tint,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tint,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tint,
  },
}
