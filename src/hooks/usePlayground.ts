import { useState, useEffect } from 'react'
import LZString from 'lz-string'

export function usePlayground<T>(defaultState: T, key: string) {
  const [state, setState] = useState<T>(() => {
    const hash = window.location.hash
    const match = hash.match(new RegExp(`[?&]${key}=([^&]*)`))
    if (match) {
      try {
        const decoded = LZString.decompressFromEncodedURIComponent(match[1])
        if (decoded) return JSON.parse(decoded) as T
      } catch { /* ignore */ }
    }
    return defaultState
  })

  useEffect(() => {
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(state))
    const url = new URL(window.location.href)
    const hashPath = url.hash.split('?')[0]
    url.hash = `${hashPath}?${key}=${compressed}`
    window.history.replaceState(null, '', url.toString())
  }, [state, key])

  return [state, setState] as const
}
