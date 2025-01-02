import { create, StoreApi } from 'zustand'
import api from '@/constants/Api'
import asyncStorage from '@/stores/asyncStorage'

export interface NoteAuthor {
  user_id: number
  password_hash: string
}
export interface Note {
  id: number
  title: string
  content: string
  updated_time: string
  user_id: number
  authors?: NoteAuthor[]
  address?: string
  openly?: boolean
  isEncrypt?: boolean
}

interface NoteStore {
  notes: Note[]
  authorsNotes: Note[]
  inited: boolean
  authorsInited: boolean
}

interface State extends NoteStore {
  setItem: <K extends keyof State>(key: K, value: State[K]) => void
}

const fetchKnowledge = async () => {
  api({ method: 'post', url: '/db/get/Notes' })
    .then((res) => {
      if (res.ok) {
        const list = res.data as Note[]

        useNoteStore.getState().setItem('notes', list)
        useNoteStore.getState().setItem('inited', true)

        // save
        const KnowledgeCache = JSON.stringify(list)
        const KnowledgeHash = asyncStorage.getHash(KnowledgeCache)
        asyncStorage.setItem('KnowledgeCache', KnowledgeCache)
        asyncStorage.setItem('KnowledgeHash', KnowledgeHash)
      }
    })
    .catch(() => {})
}

export const useNoteStore = create<State>((set: StoreApi<State>['setState']) => ({
  notes: [],
  authorsNotes: [],
  inited: false,
  authorsInited: false,
  setItem: (key, value) => set((state) => ({ ...state, [key]: value })),
}))

export const initKnowledge = async () => {
  const list: Note[] | null = await asyncStorage.getItem('KnowledgeCache')
  if (list && list[0].id) {
    useNoteStore.getState().setItem('notes', list)
    useNoteStore.getState().setItem('inited', true)

    const KnowledgeHash = await asyncStorage.getItem('KnowledgeHash')

    // 检查 KnowledgeHash
    const res = await api({
      url: '/db/check/hash/Notes',
      params: { hash: KnowledgeHash },
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
