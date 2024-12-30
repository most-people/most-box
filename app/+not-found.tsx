import React from 'react'
import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { MPText } from '@/components/MPText'
import { MPView } from '@/components/MPView'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <MPView style={styles.container}>
        <MPText type="title">This screen doesn't exist.</MPText>
        <Link href="/" style={styles.link}>
          <MPText type="link">Go to home screen!</MPText>
        </Link>
      </MPView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})
