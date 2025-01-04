import { ViewProps, View } from 'react-native'

const ThemeView = ({ style, ...otherProps }: ViewProps) => {
  return <View style={style} {...otherProps} />
}

export default ThemeView
