# Homepage Redesign — Galaxy + MagicBento Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the WebGL2 AuroraBackground with an animated Galaxy canvas and add MagicBento-style glassmorphism, 3D tilt, cursor spotlight, and a color-synced cursor trail to the homepage.

**Architecture:** Four independent files are created or rewritten. `GalaxyBackground` and `CursorTrail` are pure canvas components with imperative ref handles. `CategoryGrid` is rewritten to use CSS-driven hover effects (removing `SpotlightCard`) and calls the imperative handles on hover. `Home/index.tsx` owns both refs and wires everything together.

**Tech Stack:** React 19, TypeScript, Canvas 2D API, CSS custom properties, Vite. No new npm packages.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/pages/Home/GalaxyBackground.tsx` | **Create** | 440 drifting stars, star zone illumination, `GalaxyHandle` ref |
| `src/pages/Home/CursorTrail.tsx` | **Create** | 18-point cursor trail canvas, `TrailHandle` ref |
| `src/pages/Home/CategoryGrid.tsx` | **Rewrite** | Glassmorphism TechSection, CSS tilt/spotlight, calls galaxy+trail refs on hover |
| `src/pages/Home/index.tsx` | **Rewrite** | Owns refs, renders galaxy/trail/content, centered layout, film grain |
| `src/pages/Home/AuroraBackground.tsx` | **Delete** | Replaced — remove file and all imports |

---

## Chunk 1: GalaxyBackground Component

### Task 1: Create GalaxyBackground.tsx

**Files:**
- Create: `src/pages/Home/GalaxyBackground.tsx`

- [ ] **Step 1: Create the file with star initialization**

```tsx
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
```

- [ ] **Step 2: Add hex→rgb helper and zone function**

```tsx
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
```

- [ ] **Step 3: Add the forwardRef component with RAF loop**

```tsx
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
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /home/jaywee92/web-dev-guide && pnpm tsgo 2>&1 | grep -E 'error|GalaxyBackground' | head -20
```

Expected: no errors mentioning `GalaxyBackground.tsx`

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home/GalaxyBackground.tsx
git commit -m "feat: GalaxyBackground — 2D canvas galaxy with star zone illumination"
```

---

## Chunk 2: CursorTrail Component

### Task 2: Create CursorTrail.tsx

**Files:**
- Create: `src/pages/Home/CursorTrail.tsx`

- [ ] **Step 1: Create the file**

```tsx
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
      ctx!.scale(dpr, dpr)  // reset by canvas dimension assignment, then re-applied
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

        // Glow dot — coordinates are logical CSS pixels (ctx.scale handles DPR)
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/jaywee92/web-dev-guide && pnpm tsgo 2>&1 | grep -E 'error|CursorTrail' | head -20
```

Expected: no errors mentioning `CursorTrail.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/CursorTrail.tsx
git commit -m "feat: CursorTrail — 18-point canvas cursor trail with color lerp"
```

---

## Chunk 3: Rewrite CategoryGrid

### Task 3: Rewrite CategoryGrid.tsx

Remove `SpotlightCard` and `motion.div`. Replace with a pure CSS `.tsec` div with glassmorphism, `--tc` custom property, spotlight `::after`, border glow `::before`, and 3D tilt via `onMouseMove`. Call `galaxyRef.setHover` and `trailRef.setColor` on section hover. Wire global stagger index.

**Files:**
- Modify: `src/pages/Home/CategoryGrid.tsx`

- [ ] **Step 1: Replace CategoryGrid.tsx**

```tsx
// src/pages/Home/CategoryGrid.tsx
import { type ComponentType, type CSSProperties, type RefObject, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
} from 'lucide-react'
import { CATEGORIES, CATEGORY_GROUPS, getTechKey, TECH_SECTION_META } from '@/data/categories'
import type { Category, CategoryId } from '@/types'
import CategoryTooltip from './CategoryTooltip'
import type { GalaxyHandle } from './GalaxyBackground'
import type { TrailHandle } from './CursorTrail'

const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
}

function deriveTechSections(categoryIds: CategoryId[]): Array<{ techKey: string; categories: Category[] }> {
  const sections: Array<{ techKey: string; categories: Category[] }> = []
  for (const id of categoryIds) {
    const cat = CATEGORIES.find(c => c.id === id)
    if (!cat) continue
    const key = getTechKey(id)
    const last = sections[sections.length - 1]
    if (last && last.techKey === key) {
      last.categories.push(cat)
    } else {
      sections.push({ techKey: key, categories: [cat] })
    }
  }
  return sections
}

interface TooltipState { category: Category; rect: DOMRect }

interface CategoryGridProps {
  galaxyRef: RefObject<GalaxyHandle>
  trailRef: RefObject<TrailHandle>
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div className="group-label">
      <span>{label}</span>
      <span className="group-label-line" />
    </div>
  )
}

interface TechSectionProps {
  techKey: string
  categories: Category[]
  globalIndex: number
  galaxyRef: RefObject<GalaxyHandle>
  trailRef: RefObject<TrailHandle>
  onCardHover: (cat: Category, rect: DOMRect) => void
  onCardLeave: () => void
}

function TechSection({
  techKey, categories, globalIndex,
  galaxyRef, trailRef,
  onCardHover, onCardLeave,
}: TechSectionProps) {
  const navigate = useNavigate()
  const meta = TECH_SECTION_META[techKey]
  const primaryCategory = categories[0]
  const Icon = ICONS[primaryCategory.icon] ?? FileCode2
  const color = meta?.color ?? primaryCategory.color

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    galaxyRef.current?.setHover(color, rect)
    trailRef.current?.setColor(color)
  }

  function handleMouseLeave() {
    galaxyRef.current?.setHover(null, null)
    trailRef.current?.setColor(null)
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const w = rect.width
    const h = rect.height
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    // 3D tilt
    const rx = -((y / h) - 0.5) * 6
    const ry = ((x / w) - 0.5) * 6
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  function handleMouseLeaveCard(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)'
    handleMouseLeave()
  }

  return (
    <div
      className="tsec"
      style={{
        '--tc': color,
        animationDelay: `${globalIndex * 80}ms`,
      } as CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveCard}
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="tsec-head">
        <div className="tsec-icon">
          <Icon size={17} color={color} />
        </div>
        <div className="tsec-head-text">
          <div className="tsec-name">{meta?.title ?? primaryCategory.title}</div>
          <div className="tsec-sub">{meta?.subtitle ?? primaryCategory.description}</div>
        </div>
        <span className="tsec-badge">
          {categories.reduce((s, c) => s + c.topicIds.length, 0)} Topics
        </span>
      </div>

      {/* Subcategory cards */}
      <div className="tsec-body">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="subcat"
            style={{ '--sc': cat.color } as CSSProperties}
            onClick={() => navigate(`/${cat.id}`)}
            onMouseEnter={e => onCardHover(cat, e.currentTarget.getBoundingClientRect())}
            onMouseLeave={onCardLeave}
          >
            <div className="subcat-top">
              <span className="subcat-emoji">{cat.cardEmoji}</span>
              <span className="subcat-label">{cat.cardLabel}</span>
              <span className="subcat-cnt">{cat.topicIds.length}</span>
            </div>
            <div className="subcat-topics">
              {cat.topicIds.slice(0, 3).map((tid, i, arr) => (
                <span key={tid}>
                  {tid.replace(/^[a-z]+-/, '').replace(/-/g, ' ')}
                  {i < arr.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CategoryGrid({ galaxyRef, trailRef }: CategoryGridProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showTooltip(cat: Category, rect: DOMRect) {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setTooltip({ category: cat, rect })
  }

  function scheduleHide() {
    hideTimer.current = setTimeout(() => setTooltip(null), 120)
  }

  function cancelHide() {
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }

  let globalIdx = 0

  return (
    <section style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 80px', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {CATEGORY_GROUPS.map(group => {
          const techSections = deriveTechSections(group.categoryIds)
          return (
            <div key={group.key}>
              <GroupLabel label={group.label} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 4 }}>
                {techSections.map(ts => {
                  const idx = globalIdx++
                  return (
                    <TechSection
                      key={ts.techKey}
                      techKey={ts.techKey}
                      categories={ts.categories}
                      globalIndex={idx}
                      galaxyRef={galaxyRef}
                      trailRef={trailRef}
                      onCardHover={showTooltip}
                      onCardLeave={scheduleHide}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {tooltip && (
        <CategoryTooltip
          category={tooltip.category}
          anchorRect={tooltip.rect}
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
        />
      )}
    </section>
  )
}
```

- [ ] **Step 2: Add CSS for tsec, subcat, group-label to `src/index.css`**

Add at the end of `src/index.css`:

```css
/* ── Galaxy Homepage ──────────────────────────────── */

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.group-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 8.5px;
  font-weight: 800;
  letter-spacing: .13em;
  font-family: var(--font-mono);
  color: var(--text-faint);
  text-transform: uppercase;
  padding: 12px 4px 6px;
}
.group-label-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, var(--border) 0%, transparent 100%);
}

/* TechSection card */
.tsec {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(7, 9, 19, 0.42);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  --mx: 50%; --my: 50%;
  transition: border-color .35s, background .35s, transform .4s ease;
  transform-style: preserve-3d;
  will-change: transform;
  animation: fadeUp 0.45s ease both;
}
.tsec:hover {
  background: rgba(10, 13, 25, 0.52);
  border-color: color-mix(in srgb, var(--tc) 28%, rgba(255,255,255,0.08));
}

/* Spotlight overlay */
.tsec::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle 200px at var(--mx) var(--my),
    color-mix(in srgb, var(--tc) 6%, transparent) 0%,
    transparent 65%);
  opacity: 0;
  transition: opacity .3s;
}
.tsec:hover::after { opacity: 1; }

/* Border glow overlay */
.tsec::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 13px;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(circle 130px at var(--mx) var(--my),
    color-mix(in srgb, var(--tc) 32%, transparent) 0%,
    transparent 62%);
  opacity: 0;
  transition: opacity .35s;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: destination-out;
  padding: 1px;
}
.tsec:hover::before { opacity: 1; }

/* Section header */
.tsec-head {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 13px 17px 11px;
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--tc) 14%, #080d1a),
    #080d1a);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  border-left: 3px solid var(--tc);
}
.tsec-icon {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  flex-shrink: 0;
  background: color-mix(in srgb, var(--tc) 12%, rgba(0,0,0,0.3));
  border: 1px solid color-mix(in srgb, var(--tc) 30%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 18px color-mix(in srgb, var(--tc) 55%, transparent);
}
.tsec-head-text { flex: 1; }
.tsec-name {
  font-size: 18px;
  font-weight: 800;
  color: var(--tc);
  letter-spacing: -.02em;
  text-shadow: 0 0 22px color-mix(in srgb, var(--tc) 60%, transparent);
}
.tsec-sub { font-size: 10px; color: var(--text-faint); margin-top: 1px; }
.tsec-badge {
  font-size: 8px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 20px;
  background: color-mix(in srgb, var(--tc) 14%, rgba(0,0,0,0.4));
  border: 1px solid color-mix(in srgb, var(--tc) 35%, transparent);
  color: color-mix(in srgb, var(--tc) 90%, #94a3b8);
}

/* Subcategory cards container */
.tsec-body {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  padding: 9px 13px 12px;
  background: rgba(0, 0, 0, 0.08);
}

/* Subcategory card */
.subcat {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 8px;
  min-width: 120px;
  flex: 1;
  cursor: pointer;
  background: rgba(14, 22, 45, 0.82);
  transition: border-color .22s, background .22s, box-shadow .22s, transform .18s;
}
.subcat:hover {
  background: rgba(18, 28, 58, 0.92);
  border-color: color-mix(in srgb, var(--sc, var(--tc)) 65%, rgba(255,255,255,0.2));
  box-shadow: 0 0 18px color-mix(in srgb, var(--sc, var(--tc)) 28%, transparent);
  transform: translateY(-1px);
}
.subcat-top {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
.subcat-emoji {
  font-family: "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji", sans-serif;
  font-size: 12px;
  line-height: 1;
}
.subcat-label { font-size: 11px; font-weight: 700; color: #b8d4f0; }
.subcat-cnt {
  margin-left: auto;
  font-size: 8px;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--sc, var(--tc)) 18%, #00000033);
  color: color-mix(in srgb, var(--sc, var(--tc)) 80%, #94a3b8);
}
.subcat-topics {
  padding: 5px 10px 8px;
  font-size: 9.5px;
  color: #7a9fc4;
  line-height: 1.7;
}
```

- [ ] **Step 3: Verify TypeScript compiles and dev server starts**

```bash
cd /home/jaywee92/web-dev-guide && pnpm tsgo 2>&1 | grep error | head -20
```

Expected: no type errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home/CategoryGrid.tsx src/index.css
git commit -m "feat: CategoryGrid — glassmorphism TechSection, 3D tilt, spotlight, galaxy+trail hooks"
```

---

## Chunk 4: Wire Home/index.tsx and Clean Up

### Task 4: Update Home/index.tsx and delete AuroraBackground

**Files:**
- Modify: `src/pages/Home/index.tsx`
- Delete: `src/pages/Home/AuroraBackground.tsx`

- [ ] **Step 1: Rewrite Home/index.tsx**

```tsx
// src/pages/Home/index.tsx
import { useRef } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import HeroSection from './HeroSection'
import CategoryGrid from './CategoryGrid'
import GalaxyBackground, { type GalaxyHandle } from './GalaxyBackground'
import CursorTrail, { type TrailHandle } from './CursorTrail'

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`

export default function Home() {
  const galaxyRef = useRef<GalaxyHandle>(null)
  const trailRef = useRef<TrailHandle>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    trailRef.current?.pushPoint(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <PageWrapper>
      <div
        style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}
        onMouseMove={handleMouseMove}
      >
        {/* Galaxy background — z-index 1 */}
        <GalaxyBackground ref={galaxyRef} />

        {/* Cursor trail — z-index 2, pointer-events: none */}
        <CursorTrail ref={trailRef} />

        {/* Film grain overlay — z-index 99 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99,
          backgroundImage: GRAIN_BG,
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay',
          opacity: 0.055,
        }} />

        {/* Content — z-index 10, centered column */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <HeroSection />
          <CategoryGrid galaxyRef={galaxyRef} trailRef={trailRef} />
        </div>
      </div>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Delete AuroraBackground.tsx**

```bash
git rm src/pages/Home/AuroraBackground.tsx
```

- [ ] **Step 3: Full TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && pnpm tsgo 2>&1 | grep error | head -20
```

Expected: no errors

- [ ] **Step 4: Commit** *(agent: skip to this step after Step 3 passes)*

```bash
git add src/pages/Home/index.tsx
git commit -m "feat: Home — GalaxyBackground + CursorTrail wired, film grain, centered layout; remove AuroraBackground"
```

> **HUMAN VERIFICATION (optional, not for automated execution):** Run `pnpm dev` and open `http://localhost:5173` to confirm:
> - Galaxy stars drifting upward, colorize on section hover
> - Cards have glassmorphism, cursor spotlight, 3D tilt, border glow
> - Cursor trail follows mouse, changes color per section
> - Subcategory cards clearly visible
> - Film grain visible as subtle texture
> - Layout centered at ~680px

- [ ] **Step 5: Final build check**

```bash
cd /home/jaywee92/web-dev-guide && pnpm build 2>&1 | tail -20
```

Expected: build succeeds with no errors

- [ ] **Step 6: Commit build artifacts if any**

```bash
cd /home/jaywee92/web-dev-guide && git status --short
# Commit only if tsconfig.tsbuildinfo or dist/ changed
git diff --name-only HEAD
git commit -m "chore: post-build artifacts" 2>/dev/null || echo "nothing to commit"
```
