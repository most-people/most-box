import { FlatList, View, Text } from 'react-native'
import { useNoteStore } from '@/stores/noteStore'
import { MPText } from '@/components/MPText'
export default function NoteScreen() {
  const notes = useNoteStore((state) => state.notes)
  return (
    <View>
      <Text>笔记</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MPText>
            {item.title} {item.id}
          </MPText>
        )}
      />
    </View>
  )
}
