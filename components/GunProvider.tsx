import { useEffect } from 'react'
import PolyfillCrypto from 'react-native-webview-crypto'
import { GunPeers } from '@/constants/Peers'
import { useUserStore } from '@/stores/userStore'

import 'gun/lib/mobile'
import Gun from 'gun'
import 'gun/lib/radix.js'
import 'gun/lib/radisk.js'
import 'gun/lib/store.js'

import AsyncStorage from '@react-native-async-storage/async-storage'
import asyncStore from 'gun/lib/ras.js'

export const GunProvider = () => {
  const { setItem } = useUserStore()
  useEffect(() => {
    const gun = Gun({
      peers: GunPeers,
      store: asyncStore({ AsyncStorage }),
    })

    setItem('gun', gun)
  }, [setItem])
  return <PolyfillCrypto />
}
