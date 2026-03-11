// src/pages/Home/CursorTrail.tsx
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

export interface TrailHandle {
  setColor(hex: string | null): void
  pushPoint(x: number, y: number): void
}

const TRAIL_LEN = 18
const DEFAULT_COLOR: [number, number, number] = [58, 96, 144] // #3a6090

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}

interface TrailPoint { x: number; y: number }

const CursorTrail = forwardRef<TrailHandle>(function CursorTrail(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<{
    points: TrailPoint[]
    currentRgb: [number, number, number]
    targetRgb: [number, number, number]
  }>({
    points: [],
    currentRgb: [...DEFAULT_COLOR] as [number, number, number],
    targetRgb: [...DEFAULT_COLOR] as [number, number, number],
  })

  useImperativeHandle(ref, () => ({
    setColor(hex) {
      stateRef.current.targetRgb = hex ? hexToRgb(hex) : [...DEFAULT_COLOR] as [number, number, number]
    },
    pushPoint(x, y) {
      const pts = stateRef.current.points
      pts.push({ x, y })
      if (pts.length > TRAIL_LEN) pts.shift()
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
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let rafId = 0
    function frame() {
      const w = canvas!.width / dpr
      const h = canvas!.height / dpr
      ctx!.clearRect(0, 0, w, h)

      // Lerp current color toward target ~8% per frame
      const cur = state.currentRgb
      const tgt = state.targetRgb
      cur[0] += (tgt[0] - cur[0]) * 0.08
      cur[1] += (tgt[1] - cur[1]) * 0.08
      cur[2] += (tgt[2] - cur[2]) * 0.08

      const pts = state.points
      for (let i = 0; i < pts.length; i++) {
        const alpha = (i / pts.length) * 0.7
        const r = Math.round(cur[0])
        const g = Math.round(cur[1])
        const b = Math.round(cur[2])

        // Glow dot — coordinates are logical CSS pixels (ctx.setTransform handles DPR)
        ctx!.save()
        ctx!.shadowBlur = 8
        ctx!.shadowColor = `rgba(${r},${g},${b},${alpha})`
        ctx!.beginPath()
        ctx!.arc(pts[i].x, pts[i].y, 4 * (i / pts.length), 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${r},${g},${b},${alpha * 0.8})`
        ctx!.fill()
        ctx!.restore()

        // Ring on newest point
        if (i === pts.length - 1) {
          ctx!.beginPath()
          ctx!.arc(pts[i].x, pts[i].y, 8, 0, Math.PI * 2)
          ctx!.strokeStyle = `rgba(${r},${g},${b},0.3)`
          ctx!.lineWidth = 1.5
          ctx!.stroke()
        }
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
        zIndex: 2,
      }}
    />
  )
})

export default CursorTrail
