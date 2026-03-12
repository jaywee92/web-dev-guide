# Homepage TechSection Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage CategoryGrid to show tech sections (CSS groups its 3 sub-categories under one header) with an Aurora WebGL background and hover-tooltip topic previews on category cards.

**Architecture:** Replace the flat CategoryRow list with TechSection blocks — each block has a colored header + row of category cards. CSS groups `css-grundlagen`, `css-layout`, `css-modern` under one "CSS" section. All other categories each have their own section with one card. A WebGL2 Aurora canvas sits behind the whole grid. Hovering a category card shows a fixed-position portal tooltip with the topic list.

**Tech Stack:** React 19, TypeScript, Framer Motion, Lucide React, raw WebGL2 (no new deps), `ReactDOM.createPortal` for tooltip

**Spec:** `docs/superpowers/specs/2026-03-11-knowledge-base-redesign.md`
**Mockup:** `.superpowers/brainstorm/2923767-1773235534/homepage-rows.html`

---

## Scope

The spec is already largely implemented:
- ✅ CSS split into 3 categories (`css-grundlagen`, `css-layout`, `css-modern`) — done in `categories.ts`
- ✅ `CATEGORY_GROUPS` with group labels — already exported from `categories.ts` with `key`, `label`, `categoryIds` shape
- ✅ Numbered reference cards on CategoryPage — done in `CategoryPage/index.tsx`
- ✅ Breadcrumbs, section IDs, sidebar on-page nav — done

**What this plan implements:**
1. TechSection visual grouping on the homepage (CSS sub-categories grouped under one CSS header)
2. Aurora WebGL background behind the grid
3. Hover tooltip on category cards showing topic list

**Deliberate spec deviations (approved via mockup):**
- The spec's `CategoryRow` compact-mode rule (≤4 topics → title+count only, >4 → topic chips) is superseded by the `CategoryCard` design from the approved mockup. All category cards use the same layout regardless of topic count.
- The `TopicChip` chip-list inside rows is replaced by the hover tooltip.

---

## File Map

| File | Action |
|---|---|
| `src/types/index.ts` | MODIFY — add `cardLabel` and `cardEmoji` to `Category` interface |
| `src/data/categories.ts` | MODIFY — add `cardLabel`/`cardEmoji` values, add `TECH_SECTION_META` + `getTechKey` |
| `src/pages/Home/AuroraBackground.tsx` | CREATE — WebGL2 aurora canvas component |
| `src/pages/Home/CategoryCard.tsx` | CREATE — subcategory card with emoji icon + topic-count subtitle |
| `src/pages/Home/CategoryTooltip.tsx` | CREATE — fixed-position portal tooltip with topic list |
| `src/pages/Home/CategoryGrid.tsx` | MODIFY — full rewrite to TechSection layout |
| `src/pages/Home/index.tsx` | MODIFY — add AuroraBackground behind the grid |

---

## Chunk 1: Data layer

### Task 1: Extend Category type and data

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/data/categories.ts`

**Context:** The `Category` interface in `types/index.ts` needs two new optional fields. The `categories.ts` needs values for every category plus a `TECH_SECTION_META` lookup and `getTechKey` helper used by CategoryGrid.

- [ ] **Step 1: Add fields to Category interface**

In `src/types/index.ts`, add `cardLabel` and `cardEmoji` to the `Category` interface:

```typescript
export interface Category {
  id: CategoryId
  title: string
  description: string
  color: string
  icon: string
  topicIds: string[]
  cardLabel?: string   // short label shown on the homepage card, e.g. "Grundlagen" (falls back to title)
  cardEmoji?: string   // emoji shown next to cardLabel, e.g. "📖" (falls back to '📖')
}
```

- [ ] **Step 2: Add `cardLabel` + `cardEmoji` to every Category in `src/data/categories.ts`**

Add the two fields to each object in the `CATEGORIES` array:

```typescript
// html
{ ..., cardLabel: 'Struktur & Semantik', cardEmoji: '🏗' }

// css-grundlagen
{ ..., cardLabel: 'Grundlagen', cardEmoji: '📖' }

// css-layout
{ ..., cardLabel: 'Layout', cardEmoji: '🧩' }

// css-modern
{ ..., cardLabel: 'Modern', cardEmoji: '✨' }

// javascript
{ ..., cardLabel: 'Grundlagen', cardEmoji: '📖' }

// typescript
{ ..., cardLabel: 'Grundlagen', cardEmoji: '📖' }

// react
{ ..., cardLabel: 'Grundlagen', cardEmoji: '📖' }

// webapis
{ ..., cardLabel: 'Browser APIs', cardEmoji: '🌐' }

// http
{ ..., cardLabel: 'Grundlagen', cardEmoji: '📖' }

// postgresql
{ ..., cardLabel: 'SQL Grundlagen', cardEmoji: '📖' }
```

- [ ] **Step 3: Add `TECH_SECTION_META` and `getTechKey` to `src/data/categories.ts`**

Add at the bottom of the file (before the `getCategoryById` helper):

```typescript
export interface TechSectionMeta {
  title: string
  subtitle: string
  color: string
}

export const TECH_SECTION_META: Record<string, TechSectionMeta> = {
  html:        { title: 'HTML',       subtitle: 'Hypertext Markup Language',   color: '#4ade80' },
  css:         { title: 'CSS',        subtitle: 'Cascading Style Sheets',      color: '#5b9cf5' },
  javascript:  { title: 'JavaScript', subtitle: 'Programmiersprache des Webs', color: '#fbbf24' },
  typescript:  { title: 'TypeScript', subtitle: 'Typisiertes JavaScript',      color: '#818cf8' },
  react:       { title: 'React',      subtitle: 'UI Component Framework',      color: '#f472b6' },
  webapis:     { title: 'Web APIs',   subtitle: 'Browser-Schnittstellen',      color: '#34d399' },
  http:        { title: 'HTTP',       subtitle: 'Hypertext Transfer Protocol', color: '#fb923c' },
  postgresql:  { title: 'PostgreSQL', subtitle: 'Relationale Datenbank',       color: '#60a5fa' },
}

/** Returns the tech grouping key for a category.
 *  All css-* categories belong to the 'css' tech section.
 *  All others map 1:1 to their categoryId. */
export function getTechKey(categoryId: CategoryId): string {
  return categoryId.startsWith('css-') ? 'css' : categoryId
}
```

- [ ] **Step 4: Type-check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors (or only pre-existing unrelated errors). If there are new errors about missing `cardLabel`/`cardEmoji`, add them to any Category objects that were missed.

- [ ] **Step 5: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/types/index.ts src/data/categories.ts
git commit -m "feat: add cardLabel/cardEmoji to Category, add TECH_SECTION_META + getTechKey"
```

---

## Chunk 2: Aurora background component

### Task 2: Create `AuroraBackground.tsx`

**Files:**
- Create: `src/pages/Home/AuroraBackground.tsx`

**Context:** Port the Aurora WebGL2 implementation from the mockup (`homepage-rows.html` second `<script>` block) to a React component. Uses raw WebGL2 — no new npm packages needed. The component renders a `<canvas>` that fills its parent container.

The GLSL fragment shader uses simplex noise to create flowing aurora bands. The vertex shader is a passthrough. A fullscreen triangle (`[-1,-1, 3,-1, -1,3]`) is used instead of a quad (standard WebGL trick).

- [ ] **Step 1: Create the file**

Create `src/pages/Home/AuroraBackground.tsx`:

```typescript
import { useEffect, useRef } from 'react'

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x,289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i  = floor(v + dot(v,C.yy));
  vec2 x0 = v - i + dot(i,C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i,289.0);
  vec3 p = permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m = max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0*fract(p*C.www)-1.0;
  vec3 h = abs(x)-0.5;
  vec3 ox = floor(x+0.5);
  vec3 a0 = x-ox;
  m *= 1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x  = a0.x *x0.x  +h.x *x0.y;
  g.yz = a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 c0 = uColorStops[0], c1 = uColorStops[1], c2 = uColorStops[2];
  vec3 ramp = uv.x < 0.5 ? mix(c0, c1, uv.x*2.0) : mix(c1, c2, (uv.x-0.5)*2.0);
  float height = snoise(vec2(uv.x*2.0 + uTime*0.1, uTime*0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y*2.0 - height + 0.2);
  float intensity = 0.6 * height;
  float auroraAlpha = smoothstep(0.20 - uBlend*0.5, 0.20 + uBlend*0.5, intensity);
  vec3 auroraColor = intensity * ramp;
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}`

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16)
  return [(v >> 16 & 255) / 255, (v >> 8 & 255) / 255, (v & 255) / 255]
}

interface Props {
  colorStops?: [string, string, string]
  amplitude?: number
  blend?: number
  speed?: number
  opacity?: number
  style?: React.CSSProperties
}

export default function AuroraBackground({
  colorStops = ['#1a4080', '#6d28d9', '#0e7490'],
  amplitude = 1.2,
  blend = 0.55,
  speed = 0.08,
  opacity = 0.6,
  style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false })
    if (!gl) return // WebGL2 not available — canvas stays transparent

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    const uTime      = gl.getUniformLocation(prog, 'uTime')
    const uAmplitude = gl.getUniformLocation(prog, 'uAmplitude')
    const uColorStops = gl.getUniformLocation(prog, 'uColorStops')
    const uResolution = gl.getUniformLocation(prog, 'uResolution')
    const uBlend     = gl.getUniformLocation(prog, 'uBlend')

    gl.uniform3fv(uColorStops, colorStops.flatMap(hexToRgb))
    gl.uniform1f(uAmplitude, amplitude)
    gl.uniform1f(uBlend, blend)

    function resize() {
      const p = canvas!.parentElement
      if (!p) return
      canvas!.width  = p.offsetWidth
      canvas!.height = p.offsetHeight
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      gl!.uniform2f(uResolution, canvas!.width, canvas!.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const t0 = performance.now()
    let rafId = 0
    function frame() {
      const t = (performance.now() - t0) / 1000
      gl!.uniform1f(uTime, t * speed)
      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
      rafId = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, []) // intentionally empty — props are stable at mount time

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        borderRadius: 'inherit',
        opacity,
        ...style,
      }}
    />
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/Home/AuroraBackground.tsx
git commit -m "feat: AuroraBackground — WebGL2 simplex noise aurora canvas"
```

---

## Chunk 3: Category card + tooltip

### Task 3: Create `CategoryCard.tsx` and `CategoryTooltip.tsx`

**Files:**
- Create: `src/pages/Home/CategoryCard.tsx`
- Create: `src/pages/Home/CategoryTooltip.tsx`

**Context:** Each subcategory card shows an emoji, a short label, and a topic-count subtitle. On hover, a `CategoryTooltip` appears at a fixed position (below the card) listing each topic in that category. The tooltip stays open if the user moves their mouse onto it (120ms hide delay). The tooltip uses `ReactDOM.createPortal` to render into `document.body`, escaping all `overflow:hidden` clipping contexts.

**Note on state management:** The tooltip state (`hoveredCard` position + category id) is managed in the parent (`CategoryGrid`), not in each card. A single tooltip portal is rendered once at the top level. Each `CategoryCard` calls `onHoverStart(cardEl, category)` and `onHoverEnd()` on the parent.

#### Sub-task 3a: Create `CategoryTooltip.tsx`

- [ ] **Step 1: Create `src/pages/Home/CategoryTooltip.tsx`**

```typescript
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { TOPICS } from '@/data/topics'
import type { Category } from '@/types'

interface Props {
  category: Category
  anchorRect: DOMRect
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function CategoryTooltip({ category, anchorRect, onMouseEnter, onMouseLeave }: Props) {
  const navigate = useNavigate()
  const topics = TOPICS.filter(t => t.category === category.id)
  const ref = useRef<HTMLDivElement>(null)

  // Position: below the anchor card, aligned to its left edge.
  // Run on every render (anchorRect may change on scroll/resize).
  // visibility:hidden on the element prevents the flash at 0,0 before the first effect fires.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const W = window.innerWidth
    const left = Math.min(anchorRect.left, W - el.offsetWidth - 12)
    el.style.left = `${Math.max(8, left)}px`
    el.style.top  = `${anchorRect.bottom + 6}px`
    el.style.visibility = 'visible'
  })

  const c = category.color

  return createPortal(
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        zIndex: 9999,
        minWidth: 210,
        background: '#0f172a',
        border: `1px solid ${c}50`,
        borderRadius: 10,
        boxShadow: '0 12px 40px #00000090',
        padding: 0,
        visibility: 'hidden', // set to visible by useEffect after positioning
      }}
    >
      {/* Header */}
      <div style={{
        padding: '9px 12px 6px',
        fontSize: 9,
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        color: c,
        borderBottom: '1px solid #1e293b',
      }}>
        {category.title}
      </div>

      {/* Topic rows */}
      <div style={{ padding: '4px 6px 8px' }}>
        {topics.map(topic => (
          <div
            key={topic.id}
            onClick={() => navigate(`/topic/${topic.id}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '7px 8px',
              borderRadius: 6,
              cursor: 'pointer',
              color: 'var(--text-muted)',
              fontSize: 11,
              transition: 'background 0.12s, color 0.12s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.background = '#1e293b'
              el.style.color = 'var(--text)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.background = 'transparent'
              el.style.color = 'var(--text-muted)'
            }}
          >
            {/* Color dot */}
            <div style={{
              width: 24,
              height: 24,
              borderRadius: 5,
              flexShrink: 0,
              background: `${c}18`,
              border: `1px solid ${c}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
            }}>
              {/* We use a simple colored dot since topics don't have individual emojis */}
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
            </div>

            <span style={{ flex: 1 }}>{topic.title}</span>

            <span
              style={{
                opacity: 0,
                fontSize: 10,
                color: c,
                transition: 'opacity 0.1s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.opacity = '1' }}
            >→</span>
          </div>
        ))}
      </div>
    </div>,
    document.body
  )
}
```

#### Sub-task 3b: Create `CategoryCard.tsx`

- [ ] **Step 2: Create `src/pages/Home/CategoryCard.tsx`**

```typescript
import { useRef } from 'react'
import { TOPICS } from '@/data/topics'
import type { Category } from '@/types'

interface Props {
  category: Category
  onHoverStart: (rect: DOMRect) => void
  onHoverEnd: () => void
  onClick: () => void
}

export default function CategoryCard({ category, onHoverStart, onHoverEnd, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const topicCount = TOPICS.filter(t => t.category === category.id).length
  const c = category.color
  const emoji = category.cardEmoji ?? '📖'
  const label = category.cardLabel ?? category.title

  // Build topic keywords for subtitle (first 3 topic titles, truncated)
  const topics = TOPICS.filter(t => t.category === category.id)
  const keywords = topics.slice(0, 3).map(t => t.title.split(' ').slice(-1)[0]).join(' · ')
  const subtitle = `${keywords} · ${topicCount} Topics`

  function handleMouseEnter() {
    if (ref.current) onHoverStart(ref.current.getBoundingClientRect())
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      style={{
        background: 'var(--surface)',
        border: `1px solid var(--border)`,
        borderRadius: 9,
        padding: '12px 15px',
        cursor: 'pointer',
        minWidth: 155,
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        position: 'relative',
      }}
      onMouseOver={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = `${c}70`
        el.style.background = 'var(--surface-bright)'
        el.style.boxShadow = `0 0 16px ${c}25`
      }}
      onFocus={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = `${c}70`
        el.style.background = 'var(--surface-bright)'
        el.style.boxShadow = `0 0 16px ${c}25`
      }}
      onMouseOut={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--border)'
        el.style.background = 'var(--surface)'
        el.style.boxShadow = 'none'
      }}
      onBlur={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--border)'
        el.style.background = 'var(--surface)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Emoji + label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
        <span style={{ fontSize: 13, lineHeight: 1 }}>{emoji}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
          {label}
        </span>
      </div>
      {/* Subtitle */}
      <div style={{ fontSize: 10, color: 'var(--text-faint)', lineHeight: 1.4 }}>
        {subtitle}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/Home/CategoryTooltip.tsx src/pages/Home/CategoryCard.tsx
git commit -m "feat: CategoryCard with emoji+label, CategoryTooltip portal with topic list"
```

---

## Chunk 4: CategoryGrid redesign

### Task 4: Rewrite `CategoryGrid.tsx`

**Files:**
- Modify: `src/pages/Home/CategoryGrid.tsx`

**Context:** Full rewrite. The new layout renders:
1. A `GroupLabel` (MARKUP & STIL, PROGRAMMIERUNG, FRAMEWORKS & WEB) from `CATEGORY_GROUPS`
2. Within each group, derive "tech sections" by grouping consecutive categories by `getTechKey()`. For the `markup-style` group, this produces: `html` (1 category) and `css` (3 categories). All other groups produce 1:1 sections.
3. Each tech section has: a colored-top-border wrapper + SpotlightCard + header row (icon + title + subtitle) + card row (one `CategoryCard` per category in the section).
4. A single `CategoryTooltip` portal is rendered when a card is hovered — managed by state at the grid level.

The `CATEGORY_GROUPS` from `categories.ts` is defined with flat `categoryIds`. We derive tech sections from it at render time.

**Icon mapping:** A lookup table maps each `techKey` to a Lucide icon component, using the first category in the tech section's `icon` field.

**Tooltip state:** `useState<{ category: Category; rect: DOMRect } | null>(null)` at the grid level. A `hideTimer` ref (120ms delay on leave) keeps the tooltip open when the mouse moves from card to tooltip.

- [ ] **Step 1: Rewrite `src/pages/Home/CategoryGrid.tsx`**

```typescript
import { type ComponentType, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
} from 'lucide-react'
import { CATEGORIES, CATEGORY_GROUPS, getTechKey, TECH_SECTION_META } from '@/data/categories'
import type { Category, CategoryId } from '@/types'
import SpotlightCard from './SpotlightCard'
import CategoryCard from './CategoryCard'
import CategoryTooltip from './CategoryTooltip'

// Lucide icon lookup — keyed by the `icon` field on Category
const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
}

// Derive ordered tech sections from a flat list of category IDs.
// Consecutive categories sharing the same getTechKey() are grouped together.
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

interface TooltipState {
  category: Category
  rect: DOMRect
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      letterSpacing: '0.1em',
      color: 'var(--text-faint)',
      padding: '12px 4px 6px',
    }}>
      {label}
    </div>
  )
}

interface TechSectionProps {
  techKey: string
  categories: Category[]
  sectionIndex: number
  onCardHover: (cat: Category, rect: DOMRect) => void
  onCardLeave: () => void
}

function TechSection({ techKey, categories, sectionIndex, onCardHover, onCardLeave }: TechSectionProps) {
  const navigate = useNavigate()
  const meta = TECH_SECTION_META[techKey]
  const primaryCategory = categories[0]
  const Icon = ICONS[primaryCategory.icon] ?? FileCode2
  const color = meta?.color ?? primaryCategory.color

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: sectionIndex * 0.05 }}
    >
      <SpotlightCard
        color={color}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderTop: `3px solid ${color}`,
          borderRadius: 12,
          overflow: 'visible',
        }}
      >
        {/* Section header */}
        <div style={{
          padding: '13px 17px 11px',
          background: 'var(--surface)',
          borderRadius: '10px 10px 0 0',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 11,
        }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            flexShrink: 0,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon size={16} color={color} />
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color, letterSpacing: '-0.02em' }}>
              {meta?.title ?? primaryCategory.title}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 1 }}>
              {meta?.subtitle ?? primaryCategory.description}
            </div>
          </div>
        </div>

        {/* Card row */}
        <div style={{
          padding: '12px 13px 14px',
          background: 'var(--bg)',
          borderRadius: '0 0 10px 10px',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
        }}>
          {categories.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onHoverStart={rect => onCardHover(cat, rect)}
              onHoverEnd={onCardLeave}
              onClick={() => navigate(`/${cat.id}`)}
            />
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function CategoryGrid() {
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

  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {CATEGORY_GROUPS.map(group => {
          const techSections = deriveTechSections(group.categoryIds)
          return (
            <div key={group.key}>
              <GroupLabel label={group.label} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 4 }}>
                {techSections.map((ts, i) => (
                  <TechSection
                    key={ts.techKey}
                    techKey={ts.techKey}
                    categories={ts.categories}
                    sectionIndex={i}
                    onCardHover={showTooltip}
                    onCardLeave={scheduleHide}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Single shared tooltip portal */}
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

- [ ] **Step 2: Type-check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors. Common issues to fix:
- If TypeScript reports unknown category IDs in `CATEGORY_GROUPS.categoryIds`, update the `CategoryId` union type in `src/types/index.ts` to include the missing IDs
- `cardLabel`/`cardEmoji` are optional so no break from new fields

- [ ] **Step 3: Build to catch any remaining issues**

```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -20
```

Expected: build succeeds or shows only pre-existing warnings.

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/Home/CategoryGrid.tsx
git commit -m "feat: CategoryGrid — TechSection layout with grouped CSS sub-categories + tooltip"
```

---

## Chunk 5: Aurora in Home page

### Task 5: Add Aurora to Home page

**Files:**
- Modify: `src/pages/Home/index.tsx`

**Context:** The Aurora canvas needs to sit behind the category grid content. The `Home` component renders `HeroSection` + `CategoryGrid` inside a `PageWrapper`. Add a wrapper `div` with `position:relative` that contains the `AuroraBackground` canvas (absolute, `pointer-events:none`) and the content above it.

- [ ] **Step 1: Update `src/pages/Home/index.tsx`**

```typescript
import PageWrapper from '@/components/layout/PageWrapper'
import HeroSection from './HeroSection'
import CategoryGrid from './CategoryGrid'
import AuroraBackground from './AuroraBackground'

export default function Home() {
  return (
    <PageWrapper>
      <div style={{ position: 'relative', overflow: 'visible' }}>
        <AuroraBackground
          colorStops={['#1a4080', '#6d28d9', '#0e7490']}
          amplitude={1.2}
          blend={0.55}
          speed={0.08}
          opacity={0.5}
        />
        <HeroSection />
        <CategoryGrid />
      </div>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Verify the canvas covers the full section**

The `AuroraBackground` canvas has `position:absolute; inset:0` and inherits the parent's height via `height:100%`. The parent div needs explicit height from its children — this works because `HeroSection + CategoryGrid` give it natural height, and the canvas matches via `inset:0`.

If the canvas appears cut off, add `minHeight` to the wrapper:
```typescript
style={{ position: 'relative', overflow: 'visible', minHeight: '100vh' }}
```

- [ ] **Step 3: Type-check + build**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Build verification**

```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -10
```

Expected: build exits with code 0.

> **MANUAL STEP (skip in automated runs):** Start `npm run dev`, open `http://localhost:5173`, and visually confirm: (1) Aurora visible behind grid, (2) CSS section shows 3 cards (Grundlagen/Layout/Modern), (3) hovering a card shows topic tooltip, (4) clicking a card navigates to the category page.

- [ ] **Step 5: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/Home/index.tsx
git commit -m "feat: Home page — Aurora WebGL background behind CategoryGrid"
```

---

## Final verification

After all tasks complete:

- [ ] Run `npm run build` — must succeed with no TypeScript errors
- [ ] Open the app, check all 8 tech sections render
- [ ] CSS section shows 3 cards (Grundlagen, Layout, Modern) with correct emoji
- [ ] All other sections show 1 card
- [ ] Hover on any card shows topic tooltip
- [ ] Aurora visible in hero and grid area
- [ ] Navigate to CSS Grundlagen, CSS Layout, CSS Modern via card click — each opens correct category page
- [ ] Navigate via topic tooltip — opens correct topic page
