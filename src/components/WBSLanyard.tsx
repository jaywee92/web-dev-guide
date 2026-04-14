import { useEffect, useRef, useState, useCallback } from 'react'

const ROPE_LEN  = 170   // px from anchor to badge top
const GRAVITY   = 2000  // px/s²
const DAMPING   = 0.988 // per physics step at 60fps
const BADGE_W   = 82
const BADGE_H   = 106


export default function WBSLanyard() {
  const [gone, setGone] = useState(false)

  const badgeEl = useRef<HTMLDivElement>(null)
  const pathEl  = useRef<SVGPathElement>(null)
  const rafId   = useRef(0)
  const didDrag = useRef(false)

  // All physics in a plain ref — no re-renders during animation
  const sim = useRef({
    theta:     -0.38,  // start slightly left → swings in naturally
    omega:      0.6,   // initial angular velocity
    prevTheta:  0,
    prevT:      0,
    dragging:   false,
    escaped:    false,
  })

  const anchorX = () => Math.min(210, window.innerWidth * 0.19)
  const anchorY = 0

  // Badge top-center position given angle
  const bpos = (theta: number) => ({
    x: anchorX() + ROPE_LEN * Math.sin(theta),
    y: anchorY  + ROPE_LEN * Math.cos(theta),
  })

  // Write positions straight to DOM — no React state
  const commit = useCallback((theta: number) => {
    const { x, y } = bpos(theta)
    const tiltDeg = (theta * 0.35 * 180 / Math.PI).toFixed(2)

    if (badgeEl.current) {
      badgeEl.current.style.transform =
        `translate(${(x - BADGE_W / 2).toFixed(1)}px,${y.toFixed(1)}px) rotate(${tiltDeg}deg)`
    }

    if (pathEl.current) {
      const ax = anchorX()
      const slack = Math.abs(x - ax) * 0.18 + 16
      const mx = (ax + x) / 2
      const my = (anchorY + y) / 2 + slack
      pathEl.current.setAttribute('d', `M ${ax} ${anchorY} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${(y + 5).toFixed(1)}`)
    }
  }, [])

  // Physics loop
  useEffect(() => {
    if (gone) return
    const s = sim.current
    let last = performance.now()

    function tick(t: number) {
      const dt = Math.min((t - last) / 1000, 0.033)
      last = t

      if (!s.dragging && !s.escaped) {
        const alpha = -(GRAVITY / ROPE_LEN) * Math.sin(s.theta)
        s.omega = (s.omega + alpha * dt) * Math.pow(DAMPING, dt * 60)
        s.theta += s.omega * dt
      }

      commit(s.theta)
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [gone, commit])

  // Window resize: just re-commit current angle so rope stays anchored
  useEffect(() => {
    const onResize = () => commit(sim.current.theta)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [commit])

  // ── Pointer handlers ──────────────────────────────────────────────────────

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    didDrag.current = false
    const s = sim.current
    s.dragging  = true
    s.prevTheta = s.theta
    s.prevT     = performance.now()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const s = sim.current
    if (!s.dragging) return
    didDrag.current = true

    const dx = e.clientX - anchorX()
    const dy = Math.max(e.clientY - anchorY, 10)
    const next = Math.atan2(dx, dy)

    s.prevTheta = s.theta
    s.prevT     = performance.now()
    s.theta     = Math.max(-Math.PI * 0.8, Math.min(Math.PI * 0.8, next))
  }, [])

  const onPointerUp = useCallback(() => {
    const s = sim.current
    if (!s.dragging) return
    s.dragging = false

    // Compute angular velocity from last two samples for natural swing-back
    const dt = (performance.now() - s.prevT) / 1000
    if (dt > 0 && dt < 0.12) {
      s.omega = (s.theta - s.prevTheta) / dt
    }

  }, [])

  function triggerEscape(theta: number) {
    const s = sim.current
    s.escaped = true
    cancelAnimationFrame(rafId.current)

    const { x, y } = bpos(theta)
    const spinDeg = (theta * 28 * 180 / Math.PI).toFixed(1)

    if (badgeEl.current) {
      badgeEl.current.style.transition =
        'transform 0.55s cubic-bezier(0.3,0.6,0.4,1), opacity 0.38s 0.1s ease-out'
      badgeEl.current.style.transform =
        `translate(${(x - BADGE_W / 2).toFixed(1)}px,${(y + 340).toFixed(1)}px) rotate(${spinDeg}deg)`
      badgeEl.current.style.opacity = '0'
    }
    if (pathEl.current) {
      pathEl.current.style.transition = 'opacity 0.3s'
      pathEl.current.style.opacity = '0'
    }

    setTimeout(() => setGone(true), 620)
  }

  const onClick = useCallback(() => {
    if (!didDrag.current) {
      window.open('https://www.wbscodingschool.com', '_blank', 'noopener,noreferrer')
    }
  }, [])

  if (gone) return null

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}>

      {/* Rope SVG */}
      <svg
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          overflow: 'visible', pointerEvents: 'none',
        }}
      >
        {/* Rope shadow */}
        <path
          d="" fill="none"
          stroke="rgba(0,0,0,0.35)" strokeWidth="4" strokeLinecap="round"
          style={{ transform: 'translateY(1px)' }}
          ref={el => {
            // Mirror path to shadow — update via MutationObserver on pathEl
            if (!el || !pathEl.current) return
            const obs = new MutationObserver(() => {
              el.setAttribute('d', pathEl.current?.getAttribute('d') ?? '')
            })
            obs.observe(pathEl.current, { attributes: true, attributeFilter: ['d'] })
          }}
        />
        {/* Main rope */}
        <path
          ref={pathEl}
          fill="none"
          stroke="#3d4166"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Anchor clip — positioned dynamically to match anchorX */}
      <div style={{
        position: 'absolute', top: 0, left: anchorX(),
        transform: 'translateX(-50%)',
        width: 14, height: 16,
        background: 'linear-gradient(180deg, #4a4e6a, #2e3154)',
        borderRadius: '0 0 5px 5px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
      }} />

      {/* Badge */}
      <div
        ref={badgeEl}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onClick}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: BADGE_W,
          pointerEvents: 'all',
          userSelect: 'none',
          willChange: 'transform',
          cursor: 'grab',
        }}
      >
        {/* Lanyard hole */}
        <div style={{
          position: 'absolute', top: -6, left: '50%',
          transform: 'translateX(-50%)',
          width: 11, height: 11, borderRadius: '50%',
          background: '#0f1117',
          border: '2px solid #4a4e6a',
          zIndex: 2,
        }} />

        {/* Close button */}
        <div
          onClick={e => { e.stopPropagation(); triggerEscape(sim.current.theta) }}
          style={{
            position: 'absolute', top: 5, right: 5,
            width: 16, height: 16, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 3,
            fontSize: 9, color: '#ffffff', fontWeight: 700,
            lineHeight: 1,
            transition: 'background 0.15s, border-color 0.15s',
          }}
          onPointerDown={e => e.stopPropagation()}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLDivElement
            el.style.background = 'rgba(255,255,255,0.25)'
            el.style.borderColor = 'rgba(255,255,255,0.7)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLDivElement
            el.style.background = 'rgba(255,255,255,0.12)'
            el.style.borderColor = 'rgba(255,255,255,0.35)'
          }}
        >✕</div>

        {/* Card body */}
        <div style={{
          width: BADGE_W, height: BADGE_H,
          background: 'linear-gradient(155deg, #21243a 0%, #171a28 100%)',
          border: '1px solid rgba(240,79,106,0.25)',
          borderRadius: 10,
          boxShadow: [
            '0 0 0 1px rgba(240,79,106,0.08)',
            '0 16px 48px rgba(0,0,0,0.7)',
            '0 4px 16px rgba(240,79,106,0.18)',
            'inset 0 1px 0 rgba(255,255,255,0.07)',
          ].join(', '),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Red top-glow */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 48,
            background: 'linear-gradient(180deg, rgba(240,79,106,0.18) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          {/* WBS Logo */}
          <svg
            width="50" height="65"
            viewBox="0 0 40 52"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 3px 14px rgba(240,79,106,0.65)) drop-shadow(0 0 6px rgba(240,79,106,0.3))' }}
          >
            <rect width="40" height="52" rx="3" fill="#f04f6a" />
            <text x="5" y="18" fill="white" fontFamily="Arial Black,Arial,sans-serif"
              fontWeight="900" fontSize="13" letterSpacing="0.5">CO</text>
            <text x="5" y="34" fill="white" fontFamily="Arial Black,Arial,sans-serif"
              fontWeight="900" fontSize="13">D/</text>
            <text x="5" y="49" fill="white" fontFamily="Arial Black,Arial,sans-serif"
              fontWeight="900" fontSize="13" letterSpacing="0.5">NG</text>
          </svg>

          {/* Label */}
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 8,
            fontWeight: 700,
            color: '#c8cde0',
            letterSpacing: '0.06em',
            textAlign: 'center',
            lineHeight: 1.5,
            textShadow: '0 0 10px rgba(240,79,106,0.4)',
          }}>
            WBS CODING<br />SCHOOL
          </div>
        </div>
      </div>
    </div>
  )
}
