// atoms.js
import { atom, useAtom } from 'jotai'

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

const noteAtom = atom<NoteStore>({
  notes: [],
  authorsNotes: [],
  authorsInited: false,
  inited: false,
})

export const useNoteStore = () => {
  const [noteStore, setNoteStore] = useAtom(noteAtom)
  return {
    noteStore,
  }
}
