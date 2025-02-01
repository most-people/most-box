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

interface GunRes {
  ok: boolean
  message: string
  data: any
}

declare global {
  interface Window {
    user: {
      login: (username: string, password: string) => Promise<GunRes>
    }
  }
}

export const GunProvider = () => {
  const webviewRef = useRef<WebView>(null)
  const promiseRef = useRef<{
    resolve: (value: GunRes) => void
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
    window.user = {
      login(username: string, password: string) {
        const injectScript = `
          (async function() {
            try {
              const res = await window.user.login('${username}','${password}');
              window.ReactNativeWebView.postMessage(JSON.stringify(res));
            } catch (error) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'error',
                message: error.message
              }));
            }
          })();
          true;
        `
        return new Promise((resolve, reject) => {
          promiseRef.current = { resolve, reject }
          webviewRef.current?.injectJavaScript(injectScript)
        })
      },
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
      source={{ uri: 'https://most-people.github.io/expo-webview-crypto/gun.html' }}
    />
  )
}
