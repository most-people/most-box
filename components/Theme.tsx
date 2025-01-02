import { Text, type TextProps, StyleSheet, ViewProps, View } from 'react-native'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from 'react-native'

// Text
type ThemeProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
}

const ThemeText = ({ style, lightColor, darkColor, type = 'default', ...rest }: ThemeProps) => {
  const theme = useColorScheme() ?? 'light'

  return (
    <Text
      style={[
        { color: Colors[theme].text },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

// View
type ThemeViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

const ThemeView = ({ style, lightColor, darkColor, ...otherProps }: ThemeViewProps) => {
  const theme = useColorScheme() ?? 'light'

  return <View style={[{ backgroundColor: Colors[theme].background }, style]} {...otherProps} />
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
})

export { ThemeText, ThemeView }
