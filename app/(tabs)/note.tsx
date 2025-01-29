import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNoteStore } from '@/stores/noteStore'
import { ThemeText, ThemeView } from '@/components/Theme'
import PageTabView from '@/components/PageTabView'
import { Icon } from '@/assets/icon'
import { useToast } from 'expo-toast'
import { useUserStore } from '@/stores/userStore'
import dayjs from 'dayjs'
export default function NoteScreen() {
  const notes = useNoteStore((state) => state.notes)
  const { theme } = useUserStore()
  const toast = useToast()

  const upload = async () => {
    // toast.show('写笔记，开发中...')

    try {
      // 生成 AES 密钥
      const aesKey = await window.crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256,
        },
        true,
        ['encrypt', 'decrypt'],
      )

      // 加密数据
      const data = new TextEncoder().encode('Hello, World!')
      const iv = window.crypto.getRandomValues(new Uint8Array(12))
      const encrypted = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        aesKey,
        data,
      )

      console.log('🌊', encrypted)

      // // 生成 ECDSA 密钥对并签名
      // const keyPair = await window.crypto.subtle.generateKey(
      //   {
      //     name: 'ECDSA',
      //     namedCurve: 'P-256',
      //   },
      //   true,
      //   ['sign', 'verify'],
      // )

      // const signature = await window.crypto.subtle.sign(
      //   {
      //     name: 'ECDSA',
      //     hash: { name: 'SHA-256' },
      //   },
      //   keyPair.privateKey,
      //   data,
      // )

      // console.log('🌊', signature)
    } catch (error) {
      console.log('❌', error)
    }
  }

  return (
    <PageTabView title="笔记">
      <ThemeText>今天</ThemeText>

      <TouchableOpacity
        style={{
          ...styles.camera,
          backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.14)',
        }}
        onPress={upload}
      >
        <Icon.Camera
          style={styles.cameraIcon}
          fill={theme === 'light' ? 'rgba(0, 0, 0, 0.14)' : 'rgba(255, 255, 255, 0.14)'}
        />
      </TouchableOpacity>
      {notes
        .sort((a, b) => Number(b.updated_time) - Number(a.updated_time))
        .map((item) => (
          <ThemeView key={item.id}>
            <ThemeText>{dayjs(Number(item.updated_time)).fromNow()}</ThemeText>
            <ThemeText>{item.title}</ThemeText>
          </ThemeView>
        ))}
    </PageTabView>
  )
}

const styles = StyleSheet.create({
  camera: {
    cursor: 'pointer',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: { width: 40, height: 40 },
})
