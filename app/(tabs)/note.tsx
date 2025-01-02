import { useNoteStore } from '@/stores/noteStore'
import { ThemedText } from '@/components/ThemedText'
import PageView from '@/components/PageView'
export default function NoteScreen() {
  const notes = useNoteStore((state) => state.notes)
  return (
    <PageView>
      <ThemedText>笔记</ThemedText>
      {notes.map((item) => (
        <ThemedText key={item.id}>{item.updated_time}</ThemedText>
      ))}
    </PageView>
  )
}
