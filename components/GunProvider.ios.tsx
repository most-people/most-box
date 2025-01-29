import { WebView } from 'react-native-webview'

export const GunProvider = () => {
  return (
    <WebView
      source={{ uri: 'https://file.most.box/download/test.html' }}
      onMessage={(event) => {
        alert(event.nativeEvent.data)
      }}
    />
  )
}
