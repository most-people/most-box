import { ViewProps, View } from 'react-native'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from 'react-native'

type ThemeViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

const ThemeView = ({ style, lightColor, darkColor, ...otherProps }: ThemeViewProps) => {
  const theme = useColorScheme() ?? 'light'

  return <View style={[{ backgroundColor: Colors[theme].background }, style]} {...otherProps} />
}

export default ThemeView
