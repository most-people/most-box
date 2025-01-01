import { FlatList } from 'react-native'
import { useNoteStore } from '@/stores/noteStore'
import { ThemedText } from '@/components/ThemedText'
import PageView from '@/components/PageView'
export default function NoteScreen() {
  const notes = useNoteStore((state) => state.notes)
  return (
    <PageView>
      <ThemedText>笔记</ThemedText>
      <FlatList
        data={notes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ThemedText>{item.title}</ThemedText>}
      />
    </PageView>
  )
}
