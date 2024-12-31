// import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import api from '@/constants/Api'
import asyncStorage from '@/stores/asyncStorage'
import { Note, useNoteStore } from '@/stores/noteStore'
import 'react-native-reanimated'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

// const initKnowledge = async () => {
//   const list: Note[] | null = await asyncStorage.getItem('KnowledgeCache')
//   if (list && list[0].id) {
//     useNoteStore.getState().setItem('notes', list)
//     useNoteStore.getState().setItem('inited', true)

//     const KnowledgeHash = await asyncStorage.getItem('KnowledgeHash')

//     // 检查 KnowledgeHash
//     const res = await api({
//       url: '/db/check/hash/Notes',
//       params: { hash: KnowledgeHash },
//     })
//     if (res.ok) {
//       if (res.data === true) {
//         console.log('知识库 数据一致')
//       } else {
//         console.log('知识库 数据不一致，正在更新')
//         fetchKnowledge()
//       }
//     }
//   } else {
//     fetchKnowledge()
//   }
// }
// const fetchKnowledge = async () => {
//   api({ method: 'post', url: '/db/get/Notes' })
//     .then((res) => {
//       if (res.ok) {
//         const list = res.data as Note[]

//         useNoteStore.getState().setItem('notes', list)
//         useNoteStore.getState().setItem('inited', true)

//         // save
//         const KnowledgeCache = JSON.stringify(list)
//         const KnowledgeHash = asyncStorage.getHash(KnowledgeCache)
//         asyncStorage.setItem('KnowledgeCache', KnowledgeCache)
//         asyncStorage.setItem('KnowledgeHash', KnowledgeHash)
//       }
//     })
//     .catch(() => {})
// }

export default function RootLayout() {
  useEffect(() => {
    // initKnowledge()
  }, [])

  // Load the fonts
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // })

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   return null
  // }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
