import { MostWallet } from '@/constants/MostWallet'
import { create, StoreApi } from 'zustand'
import asyncStorage from '@/stores/asyncStorage'
import mp from '@/constants/mp'
import { router } from 'expo-router'

interface UserStore {
  wallet?: MostWallet
  initWallet: () => Promise<void>
}

interface State extends UserStore {
  setItem: <K extends keyof State>(key: K, value: State[K]) => void
}

export const useUserStore = create<State>((set: StoreApi<State>['setState']) => ({
  wallet: undefined,
  setItem: (key, value) => set((state) => ({ ...state, [key]: value })),
  async initWallet() {
    const token = await asyncStorage.getItem('token')
    const tokenSecret = await asyncStorage.getItem('tokenSecret')
    if (token && tokenSecret) {
      try {
        const { data } = mp.verifyJWT(token, tokenSecret) as { data: MostWallet }
        set({ wallet: data })
      } catch (error: any) {
        console.error(error.message)
        router.push('/login')
      }
    }
  },
}))
