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
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<{
    points: TrailPoint[]
    currentRgb: [number, number, number]
    targetRgb: [number, number, number]
    cx: number; cy: number
    tx: number; ty: number
  }>({
    points: [],
    currentRgb: [...DEFAULT_COLOR] as [number, number, number],
    targetRgb: [...DEFAULT_COLOR] as [number, number, number],
    cx: -100, cy: -100,
    tx: -100, ty: -100,
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
    const dot = dotRef.current
    const ring = ringRef.current
    if (!canvas || !dot || !ring) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const state = stateRef.current

    function onMouseMove(e: MouseEvent) {
      state.tx = e.clientX
      state.ty = e.clientY
    }
    document.addEventListener('mousemove', onMouseMove)

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

      // Lerp cursor dot position (snappy) and ring (laggy)
      state.cx += (state.tx - state.cx) * 0.45
      state.cy += (state.ty - state.cy) * 0.45

      const r = Math.round(cur[0])
      const g = Math.round(cur[1])
      const b = Math.round(cur[2])

      dot!.style.transform = `translate(${state.tx - 4}px, ${state.ty - 4}px)`
      dot!.style.background = `rgb(${r},${g},${b})`
      dot!.style.boxShadow = `0 0 8px 2px rgba(${r},${g},${b},0.55)`

      ring!.style.transform = `translate(${state.cx - 14}px, ${state.cy - 14}px)`
      ring!.style.borderColor = `rgba(${r},${g},${b},0.4)`

      const pts = state.points
      for (let i = 0; i < pts.length; i++) {
        const alpha = (i / pts.length) * 0.7

        ctx!.save()
        ctx!.shadowBlur = 8
        ctx!.shadowColor = `rgba(${r},${g},${b},${alpha})`
        ctx!.beginPath()
        ctx!.arc(pts[i].x, pts[i].y, 4 * (i / pts.length), 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${r},${g},${b},${alpha * 0.8})`
        ctx!.fill()
        ctx!.restore()
      }

      rafId = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      {/* Trail canvas — relative to container */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />
      {/* Custom cursor dot — fixed to viewport */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'background 0.15s, box-shadow 0.15s',
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 28, height: 28,
          borderRadius: '50%',
          border: '1.5px solid',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'border-color 0.15s',
        }}
      />
    </>
  )
})

export default CursorTrail
