import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, router } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'
import 'react-native-reanimated'

import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const theme = useColorScheme() ?? 'dark'
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  const initWallet = useUserStore((state) => state.initWallet)

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
      <Stack screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: '聊天' }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="chat" options={{ title: '' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
