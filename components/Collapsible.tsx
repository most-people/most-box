import { PropsWithChildren, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { MPText } from '@/components/MPText'
import { MPView } from '@/components/MPView'
import { Colors } from '@/constants/Colors'
import IconAngle from '@/assets/icon/angle.svg'

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MPView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconAngle
          style={{
            transform: isOpen ? 'rotate(90deg)' : '',
          }}
          width={18}
          height={18}
          color={Colors.icon}
        />
        <MPText type="defaultSemiBold">{title}</MPText>
      </TouchableOpacity>
      {isOpen && <MPView style={styles.content}>{children}</MPView>}
    </MPView>
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
