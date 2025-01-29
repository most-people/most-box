import React, { useRef } from 'react'
import { Button } from 'react-native'
import { WebView } from 'react-native-webview'

export const GunProvider = () => {
  const webviewRef = useRef<WebView>(null)

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

  const handleWebViewLoad = () => {
    webviewRef.current?.injectJavaScript(injectScript)
  }

  return (
    <>
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://example.com' }}
        onMessage={(event) => {
          console.log(event.nativeEvent.data)
        }}
      />
      <Button title="Generate Key" onPress={handleWebViewLoad} />
    </>
  )
}
