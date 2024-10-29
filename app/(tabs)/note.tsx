import { View, StyleSheet, FlatList } from 'react-native'
import { useNoteStore } from '@/stores/noteStore'
import { MPHeader } from '@/components/MPHeader'
import { MPText } from '@/components/MPText'
// import { Colors } from '@/constants/Colors'
export default function NoteScreen() {
  const notes = useNoteStore((state) => state.notes)
  return (
    <View style={styles.body}>
      <MPHeader title="笔记" />
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

const styles = StyleSheet.create({
  body: {
    paddingBottom: 40,
  },
})
