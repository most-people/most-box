import { useEffect, useRef } from 'react'
import { WebView } from 'react-native-webview'
import { GunPeers } from '@/constants/Peers'
import { useUserStore } from '@/stores/userStore'

import 'gun/lib/mobile'
import Gun from 'gun'
import 'gun/lib/radix.js'
import 'gun/lib/radisk.js'
import 'gun/lib/store.js'

import AsyncStorage from '@react-native-async-storage/async-storage'
import asyncStore from 'gun/lib/ras.js'

declare global {
  interface Window {
    login: () => Promise<CryptoKeyPair>
  }
}

export const GunProvider = () => {
  const webviewRef = useRef<WebView>(null)
  const promiseRef = useRef<{
    resolve: (value: CryptoKeyPair) => void
    reject: (reason: any) => void
  } | null>(null)

  const { setItem } = useUserStore()

  useEffect(() => {
    const gun = Gun({
      peers: GunPeers,
      store: asyncStore({ AsyncStorage }),
    })

    setItem('gun', gun)
  }, [setItem])

  useEffect(() => {
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
    window.login = () => {
      return new Promise((resolve, reject) => {
        promiseRef.current = { resolve, reject }
        webviewRef.current?.injectJavaScript(injectScript)
      })
    }
  }, [])

  return (
    <WebView
      ref={webviewRef}
      onMessage={(event) => {
        const data = JSON.parse(event.nativeEvent.data)
        if (promiseRef.current) {
          promiseRef.current.resolve(data)
          promiseRef.current = null
        }
      }}
      source={{ uri: 'https://most-people.github.io/expo-webview-crypto/gun/' }}
    />
  )
}
