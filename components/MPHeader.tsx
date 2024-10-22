import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
const MPHeader = (props: { title: string }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: '#f8f8f8',
  },
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
})

export default MPHeader
