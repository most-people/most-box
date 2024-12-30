import { FlatList } from 'react-native'
import { useNoteStore } from '@/stores/noteStore'
import { MPText } from '@/components/MPText'
// import { Colors } from '@/constants/Colors'
export default function NoteScreen() {
  const notes = useNoteStore((state) => state.notes)
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <MPText>
          {item.title} {item.id}
        </MPText>
      )}
    />
  )
}
