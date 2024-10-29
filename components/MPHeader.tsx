import React from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { MPView } from '@/components/MPView'
import { MPText } from '@/components/MPText'
import { Colors } from '@/constants/Colors'
export const MPHeader = (props: { title: string }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <MPView style={styles.header}>
        <MPText style={styles.title}>{props.title}</MPText>
      </MPView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.background,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
})
