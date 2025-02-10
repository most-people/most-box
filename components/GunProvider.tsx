import { View, StyleSheet } from 'react-native'
import { useEffect, useRef } from 'react'
import { WebView } from 'react-native-webview'
import { useUserStore } from '@/stores/userStore'
import GunPeers from '@/public/gun/peers.js'

import 'gun/lib/mobile'
import Gun, { type IGunUserInstance, type IGunInstance, type IGunInstanceRoot } from 'gun'
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
    user: IGunUserInstance<any, any, any, IGunInstanceRoot<any, IGunInstance<any>>>
    most: {
      login: (username: string, password: string) => Promise<GunRes>
      leave: () => void
      put: (table: string, key: string, data: any) => Promise<GunRes>
      del: (table: string, key: string) => Promise<GunRes>
      get: (table: string) => Promise<GunRes>
    }
  }
}

const injectScript = (func: string) =>
  `(async()=>{try{const r=await ${func};window.ReactNativeWebView.postMessage(JSON.stringify(r))}catch(e){window.ReactNativeWebView.postMessage(JSON.stringify({ok:false,message:e.message}))}})();true`
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
    window.most = {
      login(address: string, password: string) {
        return new Promise((resolve, reject) => {
          promiseRef.current = { resolve, reject }
          webviewRef.current?.injectJavaScript(
            injectScript(`window.most.login('${address.toLowerCase()}','${password}')`),
          )
        })
      },
      leave() {
        return new Promise((resolve, reject) => {
          promiseRef.current = { resolve, reject }
          webviewRef.current?.injectJavaScript(injectScript('window.most.leave()'))
        })
      },
      get(table: string) {
        return new Promise((resolve, reject) => {
          promiseRef.current = { resolve, reject }
          webviewRef.current?.injectJavaScript(injectScript(`window.most.get('${table}')`))
        })
      },
      put(table: string, key: string, data: object) {
        return new Promise((resolve, reject) => {
          promiseRef.current = { resolve, reject }
          webviewRef.current?.injectJavaScript(
            injectScript(`window.most.put('${table}','${key}', '${JSON.stringify(data)}')`),
          )
        })
      },
      del(table: string, key: string) {
        return new Promise((resolve, reject) => {
          promiseRef.current = { resolve, reject }
          webviewRef.current?.injectJavaScript(injectScript(`window.most.del('${table}','${key}')`))
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
