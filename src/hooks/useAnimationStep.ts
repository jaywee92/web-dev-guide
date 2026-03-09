import { useState, useEffect, useCallback, useRef } from 'react'

interface Options {
  totalSteps: number
  autoPlay?: boolean
  stepDuration?: number
}

export function useAnimationStep({ totalSteps, autoPlay = true, stepDuration = 1500 }: Options) {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clear = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const start = useCallback(() => {
    clear()
    intervalRef.current = setInterval(() => {
      setStep(s => {
        if (s >= totalSteps - 1) { setIsPlaying(false); return s }
        return s + 1
      })
    }, stepDuration)
  }, [totalSteps, stepDuration, clear])

  useEffect(() => {
    if (isPlaying) start()
    else clear()
    return clear
  }, [isPlaying, start, clear])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === ' ') { e.preventDefault(); setIsPlaying(p => !p) }
      if (e.key === 'r' || e.key === 'R') { setStep(0); setIsPlaying(true) }
      if (e.key === 'ArrowRight') setStep(s => Math.min(s + 1, totalSteps - 1))
      if (e.key === 'ArrowLeft') setStep(s => Math.max(s - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [totalSteps])

  return {
    step,
    isPlaying,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    restart: () => { setStep(0); setIsPlaying(true) },
    goTo: (n: number) => setStep(Math.max(0, Math.min(n, totalSteps - 1))),
    prev: () => setStep(s => Math.max(s - 1, 0)),
    next: () => setStep(s => Math.min(s + 1, totalSteps - 1)),
  }
}
