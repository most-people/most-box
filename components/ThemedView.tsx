import { useColorScheme, View, type ViewProps } from 'react-native'

import { Colors } from '@/constants/Colors'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const theme = useColorScheme() ?? 'light'

  return <View style={[{ backgroundColor: Colors[theme].background }, style]} {...otherProps} />
}
