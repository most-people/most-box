import { WebView } from 'react-native-webview'

export const GunProvider = () => {
  return (
    <WebView
      source={{ uri: 'https://most-people.github.io/expo-webview-crypto/' }}
      onMessage={(event) => {
        console.log(event.nativeEvent.data)
      }}
    />
  )
}
