import React, { useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'
export const GunProvider = () => {
  const { setItem } = useUserStore()
  useEffect(() => {
    setItem('gun', window.gun)
  }, [setItem])
  return <></>
}
