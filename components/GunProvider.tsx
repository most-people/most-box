import { useEffect } from 'react'
import PolyfillCrypto from 'react-native-webview-crypto'
import { useUserStore } from '@/stores/userStore'
import * as Crypto from 'expo-crypto'

// @ts-ignore
window.crypto.getRandomBytes = Crypto.getRandomBytes
// @ts-ignore
window.crypto.getRandomBytesAsync = Crypto.getRandomBytesAsync
// @ts-ignore
window.crypto.getRandomValues = Crypto.getRandomValues

/* eslint-disable import/first */
import 'gun/lib/mobile'
import Gun from 'gun'
import 'gun/sea'
import 'gun/lib/radix.js'
import 'gun/lib/radisk.js'
import 'gun/lib/store.js'

import AsyncStorage from '@react-native-async-storage/async-storage'
import asyncStore from 'gun/lib/ras.js'
/* eslint-enable import/first */

export const GunProvider = () => {
  const { setGun } = useUserStore()
  useEffect(() => {
    const gun = Gun({
      peers: [
        'https://gun-manhattan.herokuapp.com/gun',
        // fly.io
        'https://api.most.box/gun',
      ],
      store: asyncStore({ AsyncStorage }),
    })
    setGun(gun)
  }, [setGun])
  return <PolyfillCrypto />
}
