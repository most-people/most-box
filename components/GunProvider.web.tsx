import React, { useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'

export const GunProvider = () => {
  const { setGun } = useUserStore()
  useEffect(() => {
    const gun = Gun({
      peers: [
        'https://gun-manhattan.herokuapp.com/gun',
        // fly.io
        'https://api.most.box/gun',
      ],
    })
    console.log('🌊', Gun.SEA)
    setGun(gun)
  }, [setGun])
  return <></>
}
