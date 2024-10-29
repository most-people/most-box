import { create, StoreApi } from 'zustand'

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

export const useNoteStore = create<State>((set: StoreApi<State>['setState']) => ({
  notes: [],
  authorsNotes: [],
  inited: false,
  authorsInited: false,
  setItem: (key, value) => set((state) => ({ ...state, [key]: value })),
}))

// setItem("notes", newNotes)
