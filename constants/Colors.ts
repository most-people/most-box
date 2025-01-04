/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tint = 'rgb(201,55,33)'
const sender = 'rgb(30,136,229)'

export const Colors = {
  tint,
  link: 'rgb(123,129,151)',
  sender: sender,
  light: {
    tabIconDefault: 'rgb(104,112,118)',
    // @react-navigation/native DefaultTheme
    primary: 'rgb(104,112,118)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
  dark: {
    tabIconDefault: 'rgb(155,161,166)',
    // @react-navigation/native DarkTheme
    primary: 'rgb(104,112,118)',
    background: 'rgb(21,23,24)',
    card: 'rgb(0,0,0)',
    text: 'rgb(236,237,238)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
}
