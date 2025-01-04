import { ViewProps, View } from 'react-native'

type ThemeViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

const ThemeView = ({ style, lightColor, darkColor, ...otherProps }: ThemeViewProps) => {
  return <View style={style} {...otherProps} />
}

export default ThemeView
