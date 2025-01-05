import { Text, type TextProps, StyleSheet } from 'react-native'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from 'react-native'

// Text
type ThemeProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'link'
}

const ThemeText = ({ style, type = 'default', ...rest }: ThemeProps) => {
  const theme = useColorScheme() ?? 'dark'

  return (
    <Text
      style={[
        { color: Colors[theme].text },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
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
    cursor: 'pointer',
    lineHeight: 30,
    fontSize: 16,
    color: Colors.link,
  },
})
export default ThemeText
