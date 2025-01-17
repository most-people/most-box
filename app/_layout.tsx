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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const systemTheme = useColorScheme() ?? 'dark'
  const { theme, setTheme, initWallet } = useUserStore()

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

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
    <ThemeProvider value={theme === 'light' ? light : dark}>
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
