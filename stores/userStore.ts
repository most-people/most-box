import { MostWallet } from '@/constants/MostWallet'
import { create, StoreApi } from 'zustand'

interface UserStore {
  wallet?: MostWallet
}

interface State extends UserStore {
  setItem: <K extends keyof State>(key: K, value: State[K]) => void
}

export const useUserStore = create<State>((set: StoreApi<State>['setState']) => ({
  wallet: undefined,
  setItem: (key, value) => set((state) => ({ ...state, [key]: value })),
}))
