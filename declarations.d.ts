// src/declarations.d.ts
declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare module 'gun/lib/ras.js' {
  import { AsyncStorage } from '@react-native-async-storage/async-storage'
  const asyncStore: (options: { AsyncStorage: typeof AsyncStorage }) => any
  export default asyncStore
}
