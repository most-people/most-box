import { create, StoreApi } from 'zustand'

interface UserStore {
  fullLoading: boolean
}

interface State extends UserStore {
  setItem: <K extends keyof State>(key: K, value: State[K]) => void
}

export const useUserStore = create<State>((set: StoreApi<State>['setState']) => ({
  fullLoading: true,
  setItem: (key, value) => set((state) => ({ ...state, [key]: value })),
}))
