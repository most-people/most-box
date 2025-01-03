import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { initKnowledge } from '@/stores/noteStore'
import 'react-native-reanimated'

import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const theme = useColorScheme() ?? 'light'
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
      initKnowledge()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider
      value={
        theme === 'light'
          ? { ...DefaultTheme, colors: Colors.light }
          : { ...DarkTheme, colors: Colors.dark }
      }
    >
      <Stack screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: '首页' }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="chat" options={{ title: '聊天' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
