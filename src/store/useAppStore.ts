import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeMode } from '@/types'

interface AppStore {
  theme: ThemeMode
  searchOpen: boolean
  toggleTheme: () => void
  setSearchOpen: (open: boolean) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      searchOpen: false,
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', next)
        set({ theme: next })
      },
      setSearchOpen: (open) => set({ searchOpen: open }),
    }),
    { name: 'wdvg-settings', partialize: (s) => ({ theme: s.theme }) }
  )
)
