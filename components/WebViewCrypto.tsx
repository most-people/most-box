import { useRef } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'

export const WebViewCrypto = () => {
  const webviewRef = useRef<WebView>(null)
  const promiseRef = useRef<{
    resolve: (value: CryptoKeyPair) => void
    reject: (reason: any) => void
  } | null>(null)

  // 定义要注入的 JavaScript 代码
  const injectScript = `
    (async function() {
      try {
        // 生成密钥对
        const keyPair = await window.crypto.subtle.generateKey(
          { name: 'ECDSA', namedCurve: 'P-256' }, 
          true, // 可导出
          ['sign', 'verify']
        );

        // 导出公钥和私钥为 JWK 格式
        const publicKey = await window.crypto.subtle.exportKey('jwk', keyPair.publicKey);
        const privateKey = await window.crypto.subtle.exportKey('jwk', keyPair.privateKey);
        
        // 发送回 React Native
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'keys',
          data: {
            publicKey,
            privateKey
          }
        }));
      } catch (error) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'error',
          message: error.message
        }));
      }
    })();
    true;
  `

  window.crypto = {
    subtle: {
      // @ts-ignore
      generateKey(...args): Promise<CryptoKeyPair> {
        return new Promise((resolve, reject) => {
          promiseRef.current = { resolve, reject }
          webviewRef.current?.injectJavaScript(injectScript)
        })
      },
    },
  }

  return (
    <View
      style={{
        // display: 'none',
        position: 'absolute',

        width: 0,
        height: 0,

        flexGrow: 0,
        flexShrink: 1,
      }}
    >
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://most.box/crypto.html' }}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data)
          if (promiseRef.current) {
            promiseRef.current.resolve(data)
            promiseRef.current = null
          }
        }}
      />
    </View>
  )
}
