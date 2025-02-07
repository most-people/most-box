import { View, StyleSheet } from 'react-native'
import { useEffect, useRef } from 'react'
import { WebView } from 'react-native-webview'
import { useUserStore } from '@/stores/userStore'
import GunPeers from '@/public/gun/peers.js'

import 'gun/lib/mobile'
import Gun, { type IGunInstance } from 'gun'
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
    GunPeers: string[]
    gun: IGunInstance<any>
    user: {
      is?: {
        pub: string
        epub: string
        alias: string
      }
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
      login(address: string, password: string) {
        const injectScript = `
          (async function() {
            try {
              const res = await window.user.login('${address.toLowerCase()}','${password}');
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
    <View style={styles.hide}>
      <WebView
        ref={webviewRef}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data)
          if (promiseRef.current) {
            promiseRef.current.resolve(data)
            promiseRef.current = null
          }
        }}
        source={{ uri: 'https://most.box/gun/' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  hide: {
    display: 'none',
    position: 'absolute',

    width: 0,
    height: 0,

    flexGrow: 0,
    flexShrink: 1,
  },
})
