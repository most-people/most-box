import { MostWallet } from '@/constants/MostWallet'
import { create, StoreApi } from 'zustand'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { type IGunInstanceRoot, type IGunUserInstance, type IGunInstance } from 'gun'

interface UserStore {
  wallet?: MostWallet
  theme: 'light' | 'dark'
  gun?: IGunInstance<any>
  user?: IGunUserInstance<any, any, any, IGunInstanceRoot<any, IGunInstance<any>>>
  exit: () => void
}

interface State extends UserStore {
  setItem: <K extends keyof State>(key: K, value: State[K]) => void
}

export const useUserStore = create<State>(
  (set: StoreApi<State>['setState'], get: StoreApi<State>['getState']) => ({
    wallet: undefined,
    setItem: (key, value) => set((state) => ({ ...state, [key]: value })),
    theme: 'dark', // 默认为深色
    gun: undefined,
    user: undefined,
    exit() {
      AsyncStorage.clear()
      get().gun?.user().leave()
      set({ wallet: undefined, user: undefined })
      router.push('/login')
    },
  }),
)
