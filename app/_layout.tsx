import React from 'react'
import 'react-native-reanimated'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { ToastProvider } from 'expo-toast'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors'

import PolyfillCrypto from 'react-native-webview-crypto'
import * as Crypto from 'expo-crypto'

window.crypto.getRandomBytes = Crypto.getRandomBytes
window.crypto.getRandomBytesAsync = Crypto.getRandomBytesAsync
window.crypto.getRandomValues = Crypto.getRandomValues

import 'gun/lib/mobile'
import Gun from 'gun'
import 'gun/sea'
import 'gun/lib/radix.js'
import 'gun/lib/radisk.js'
import 'gun/lib/store.js'

import AsyncStorage from '@react-native-async-storage/async-storage'
import asyncStore from 'gun/lib/ras.js'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const systemTheme = useColorScheme() ?? 'dark'
  const { theme, setTheme, setGun, initWallet } = useUserStore()

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    const gun = Gun({
      peers: [
        'https://gun-manhattan.herokuapp.com/gun',
        // fly.io
        'https://api.most.box/gun',
      ],
      store: asyncStore({ AsyncStorage }),
    })
    setGun(gun)
  }, [setGun])

  useEffect(() => {
    // 跟随系统主题
    setTheme(systemTheme)
  }, [systemTheme, setTheme])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
      initWallet()
    }
  }, [initWallet, loaded])

  if (!loaded) {
    return null
  }

  const light = { ...DefaultTheme, colors: Colors.light }
  const dark = { ...DarkTheme, colors: Colors.dark }

  return (
    <>
      <PolyfillCrypto />
      <ThemeProvider value={theme === 'light' ? light : dark}>
        <ToastProvider>
          <Stack screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ToastProvider>
      </ThemeProvider>
    </>
  )
}
