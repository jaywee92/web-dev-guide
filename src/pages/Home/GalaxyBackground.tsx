// src/pages/Home/GalaxyBackground.tsx
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

export interface GalaxyHandle {
  setHover(color: string | null, rect: DOMRect | null): void
}

interface Star {
  x: number
  y: number
  r: number
  speed: number
  phase: number   // twinkle phase offset
  alpha: number
}

function initStars(w: number, h: number): Star[] {
  return Array.from({ length: 440 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.4 + Math.random() * 1.2,
    speed: 0.08 + Math.random() * 0.14,
    phase: Math.random() * Math.PI * 2,
    alpha: 0.4 + Math.random() * 0.5,
  }))
}

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}

// Returns 0..1 soft-box fade given star canvas coords and canvas-local rect
function inZone(sx: number, sy: number, rect: { left: number; top: number; width: number; height: number }): number {
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const hw = rect.width / 2
  const hh = rect.height / 2
  const M = 38
  const dx = Math.max(0, Math.abs(sx - cx) - hw)
  const dy = Math.max(0, Math.abs(sy - cy) - hh)
  if (dx > M || dy > M) return 0
  return (1 - dx / M) * (1 - dy / M)
}

const GalaxyBackground = forwardRef<GalaxyHandle>(function GalaxyBackground(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Mutable state stored in refs — no React state, no re-renders
  const stateRef = useRef<{
    stars: Star[]
    hoverColor: string | null
    hoverRect: DOMRect | null
    illumination: number   // 0..1, lerped per frame
    canvasRect: DOMRect | null  // cached, updated in resize() only
  }>({ stars: [], hoverColor: null, hoverRect: null, illumination: 0, canvasRect: null })

  useImperativeHandle(ref, () => ({
    setHover(color, rect) {
      stateRef.current.hoverColor = color
      stateRef.current.hoverRect = rect
    },
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const state = stateRef.current

    function resize() {
      const p = canvas!.parentElement
      if (!p) return
      canvas!.width = p.offsetWidth * dpr
      canvas!.height = p.offsetHeight * dpr
      ctx!.scale(dpr, dpr)
      state.stars = initStars(p.offsetWidth, p.offsetHeight)
      state.canvasRect = canvas!.getBoundingClientRect()  // cache — updated on resize only
    }
    resize()
    window.addEventListener('resize', resize)

    const t0 = performance.now()
    let rafId = 0

    function frame() {
      const t = (performance.now() - t0) / 1000
      const w = canvas!.width / dpr
      const h = canvas!.height / dpr

      ctx!.clearRect(0, 0, w, h)

      // Lerp illumination toward 1 if hovered, 0 if not
      const target = state.hoverColor ? 1 : 0
      state.illumination += (target - state.illumination) * 0.06

      // Compute canvas-local rect from hoverRect (viewport) minus cached canvas offset
      let localRect: { left: number; top: number; width: number; height: number } | null = null
      if (state.hoverRect && state.canvasRect) {
        localRect = {
          left: state.hoverRect.left - state.canvasRect.left,
          top: state.hoverRect.top - state.canvasRect.top,
          width: state.hoverRect.width,
          height: state.hoverRect.height,
        }
      }

      const accentRgb = state.hoverColor ? hexToRgb(state.hoverColor) : [180, 200, 240] as [number, number, number]
      const baseRgb: [number, number, number] = [180, 200, 240]

      for (const star of state.stars) {
        // Drift upward, wrap
        star.y -= star.speed
        if (star.y < -2) star.y = h + 2

        // Twinkle
        const twinkle = 0.75 + 0.25 * Math.sin(t * 1.4 + star.phase)
        const a = star.alpha * twinkle

        // Zone illumination
        const zone = localRect ? inZone(star.x, star.y, localRect) : 0
        const blend = zone * state.illumination

        const r = Math.round(baseRgb[0] + (accentRgb[0] - baseRgb[0]) * blend)
        const g = Math.round(baseRgb[1] + (accentRgb[1] - baseRgb[1]) * blend)
        const b = Math.round(baseRgb[2] + (accentRgb[2] - baseRgb[2]) * blend)

        ctx!.save()
        if (blend > 0.05) {
          ctx!.shadowBlur = blend * 6
          ctx!.shadowColor = `rgba(${r},${g},${b},${a})`
        }
        ctx!.beginPath()
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx!.fill()
        ctx!.restore()
      }

      rafId = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
      }}
    />
  )
})

export default GalaxyBackground
