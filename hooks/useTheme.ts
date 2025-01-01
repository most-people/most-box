import { useColorScheme } from 'react-native'

// 自定义钩子
export function useTheme(): 'light' | 'dark' {
  const colorScheme = useColorScheme()
  return colorScheme ?? 'light'
}
