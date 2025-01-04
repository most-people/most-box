import { PropsWithChildren, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ThemeText, ThemeView } from '@/components/Theme'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useTheme'
import { Icon } from '@/assets/icon'

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useColorScheme() ?? 'dark'

  return (
    <ThemeView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Icon.Angle
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
          width={18}
          height={18}
          fill={theme === 'light' ? Colors.light.text : Colors.dark.text}
        />

        <ThemeText type="defaultSemiBold">{title}</ThemeText>
      </TouchableOpacity>
      {isOpen && <ThemeView style={styles.content}>{children}</ThemeView>}
    </ThemeView>
  )
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
})
