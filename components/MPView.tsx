import { View, type ViewProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

export type MPViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

export function MPView({ style, lightColor, darkColor, ...otherProps }: MPViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}
