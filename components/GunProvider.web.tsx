import React, { useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'
import { GunPeers } from '@/constants/Peers'

export const GunProvider = () => {
  const { setItem } = useUserStore()
  useEffect(() => {
    const gun = Gun({
      peers: GunPeers,
    })

    setItem('gun', gun)
  }, [setItem])
  return <></>
}
