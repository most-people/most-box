import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import api from '@/constants/Api'
import mmkv from '@/stores/mmkv'
import { Note, noteAtom } from '@/stores/noteStore'
import { useAtom } from 'jotai'
import 'react-native-reanimated'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const initKnowledge = async () => {
  const list = mmkv.getItem('KnowledgeCache') as Note[] | null
  if (list && list[0].id) {
    // this.notes = list
    // this.inited = true

    // 检查 KnowledgeHash
    const res = await api({
      url: '/db/check/hash/Notes',
      params: { hash: mmkv.getItem('KnowledgeHash') },
    })
    if (res.ok) {
      if (res.data === true) {
        console.log('知识库 数据一致')
      } else {
        console.log('知识库 数据不一致，正在更新')
        fetchKnowledge()
      }
    }
  } else {
    fetchKnowledge()
  }
}
const fetchKnowledge = async () => {
  api({ method: 'post', url: '/db/get/Notes' })
    .then((res) => {
      if (res.ok) {
        const list = res.data as Note[]

        // this.notes = list
        // this.inited = true

        // save
        const KnowledgeCache = JSON.stringify(list)
        const KnowledgeHash = mmkv.getHash(KnowledgeCache)
        mmkv.setItem('KnowledgeCache', KnowledgeCache)
        mmkv.setItem('KnowledgeHash', KnowledgeHash)
      }
    })
    .catch(() => {})
}

export default function RootLayout() {
  // const [] = useAtom(noteStore)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    initKnowledge()
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
