import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { MPView } from '@/components/MPView'
import { MPText } from '@/components/MPText'
const MPHeader = (props: { title: string }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <MPView style={styles.header}>
        <MPText style={styles.title}>{props.title}</MPText>
      </MPView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    // backgroundColor: '#f8f8f8',
  },
  header: {
    // backgroundColor: '#f8f8f8',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
})

export default MPHeader
