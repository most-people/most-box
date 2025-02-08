import React, { useCallback } from 'react'
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
import { GunProvider } from '@/components/GunProvider'
import { MostWallet } from '@/constants/MostWallet'
import mp from '@/constants/mp'
import asyncStorage from '@/stores/asyncStorage'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const systemTheme = useColorScheme() ?? 'dark'
  const { theme, setItem } = useUserStore()

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    // 跟随系统主题
    setItem('theme', systemTheme)
  }, [systemTheme, setItem])

  const initWallet = useCallback(async () => {
    const token = await asyncStorage.getItem('token')
    const tokenSecret = await asyncStorage.getItem('tokenSecret')
    if (token && tokenSecret) {
      const wallet = mp.verifyJWT(token, tokenSecret) as MostWallet | null
      if (wallet) {
        setItem('wallet', wallet)
        window.user.login(wallet.address, wallet.private_key).then(res => {
          if (res.ok) {
            setItem('pub', res.data)
          }
        })
      }
    }
  }, [setItem])

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
    <ThemeProvider value={theme === 'light' ? light : dark}>
      <GunProvider />
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ToastProvider>
    </ThemeProvider>
  )
}
