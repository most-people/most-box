import React from 'react'
import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { ThemeText } from '@/components/Theme'
import { ThemeView } from '@/components/Theme'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemeView style={styles.container}>
        <ThemeText type="title">This screen doesn't exist.</ThemeText>
        <Link href="/" style={styles.link}>
          <ThemeText type="link">Go to home screen!</ThemeText>
        </Link>
      </ThemeView>
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
