# HTML & CSS Animations Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade all 5 remaining HTML/CSS topic animations from simple colored boxes to rich pictorial visualizations.

**Architecture:** Each file is a self-contained React component with `{ step: number; compact?: boolean }` props. Steps 0–4. Use `Math.min(step, 4)` guard. Framer Motion for animations. Inline styles only. No new npm packages.

**Tech Stack:** React, TypeScript, Framer Motion (`motion`, `AnimatePresence`, `layout`), inline styles, Lucide icons (already installed).

---

## Task 1: SemanticViz — Browser Wireframe

**Files:**
- Modify: `src/topics/html/SemanticViz.tsx` (full replacement)

**Step 1: Replace the entire file**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const GREEN = '#4ade80'
const PURPLE = '#a78bfa'
const YELLOW = '#f5c542'

const stepLabels = [
  '<div> soup — no semantic meaning',
  '<header> — identifies the page header',
  '<nav> — marks navigation links',
  '<main> + <article> — primary page content',
  'Semantic HTML — meaningful to browsers & screen readers',
]

interface Zone {
  tag: string
  active: boolean
  color: string
  height: number
  divLabel: string
  semanticLabel: string
  content: React.ReactNode
}

export default function SemanticViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const width = compact ? 200 : 280

  const zones: Zone[] = [
    {
      tag: 'header',
      active: s >= 1,
      color: BLUE,
      height: compact ? 28 : 36,
      divLabel: 'div.header',
      semanticLabel: '<header>',
      content: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 8 }}>
          <div style={{ width: compact ? 14 : 18, height: compact ? 6 : 8, borderRadius: 2, background: s >= 1 ? BLUE : '#52525b', opacity: 0.7 }} />
          <div style={{ width: compact ? 36 : 52, height: compact ? 4 : 5, borderRadius: 2, background: s >= 1 ? BLUE : '#52525b', opacity: 0.4 }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: compact ? 28 : 40, height: compact ? 4 : 5, borderRadius: 2, background: s >= 1 ? BLUE : '#52525b', opacity: 0.4, marginRight: 8 }} />
        </div>
      ),
    },
    {
      tag: 'nav',
      active: s >= 2,
      color: GREEN,
      height: compact ? 22 : 28,
      divLabel: 'div.nav',
      semanticLabel: '<nav>',
      content: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 8 }}>
          {[28, 34, 24].map((w, i) => (
            <div key={i} style={{ width: w, height: compact ? 4 : 5, borderRadius: 2, background: s >= 2 ? GREEN : '#52525b', opacity: 0.5 }} />
          ))}
        </div>
      ),
    },
    {
      tag: 'main',
      active: s >= 3,
      color: PURPLE,
      height: compact ? 52 : 72,
      divLabel: 'div.main',
      semanticLabel: '<main> + <article>',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: compact ? '4px 8px 0' : '6px 10px 0' }}>
          <div style={{ width: '65%', height: compact ? 5 : 7, borderRadius: 2, background: s >= 3 ? PURPLE : '#52525b', opacity: 0.7 }} />
          {[100, 85, 90].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: compact ? 3 : 4, borderRadius: 2, background: s >= 3 ? PURPLE : '#52525b', opacity: 0.3 }} />
          ))}
        </div>
      ),
    },
    {
      tag: 'footer',
      active: s >= 4,
      color: YELLOW,
      height: compact ? 22 : 28,
      divLabel: 'div.footer',
      semanticLabel: '<footer>',
      content: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: compact ? 60 : 80, height: compact ? 4 : 5, borderRadius: 2, background: s >= 4 ? YELLOW : '#52525b', opacity: 0.5 }} />
        </div>
      ),
    },
  ]

  const zoneColors = ['', BLUE, GREEN, PURPLE, YELLOW]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {/* Browser chrome */}
      <div style={{
        width,
        border: '2px solid var(--border)',
        borderRadius: compact ? 8 : 10,
        overflow: 'hidden',
        background: 'var(--surface)',
      }}>
        {/* Browser bar */}
        <div style={{
          background: 'var(--surface-bright)',
          borderBottom: '1px solid var(--border)',
          padding: compact ? '4px 8px' : '5px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}>
          {['#ef4444', '#f5c542', '#4ade80'].map(c => (
            <div key={c} style={{ width: compact ? 6 : 8, height: compact ? 6 : 8, borderRadius: '50%', background: c, opacity: 0.75 }} />
          ))}
          <div style={{
            flex: 1, marginLeft: compact ? 5 : 8,
            height: compact ? 10 : 13,
            borderRadius: 3,
            background: 'var(--border)',
            opacity: 0.5,
          }} />
        </div>

        {/* Page zones */}
        {zones.map((zone, i) => (
          <motion.div
            key={zone.tag}
            animate={{
              backgroundColor: zone.active ? `${zone.color}14` : 'rgba(63,63,70,0.06)',
              borderColor: zone.active ? `${zone.color}66` : '#3f3f46',
              boxShadow: zone.active && s === i + 1
                ? `inset 0 0 14px ${zone.color}22`
                : 'none',
            }}
            transition={{ duration: 0.4 }}
            style={{
              height: zone.height,
              borderBottom: '1px solid',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Tag label */}
            <div style={{
              position: 'absolute', top: 2, left: 5,
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 8 : 9,
              fontWeight: 700,
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={zone.active ? zone.semanticLabel : zone.divLabel}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: zone.active ? zone.color : '#52525b' }}
                >
                  {zone.active ? zone.semanticLabel : zone.divLabel}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Zone content */}
            <div style={{ width: '100%', paddingTop: compact ? 10 : 12 }}>
              {zone.content}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textAlign: 'center',
            maxWidth: width,
            color: s === 0 ? '#71717a' : zoneColors[s],
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Build to verify**

```bash
npm run build 2>&1 | tail -3
```

Expected: `✓ built in ...s`

**Step 3: Commit**

```bash
git add src/topics/html/SemanticViz.tsx
git commit -m "feat: SemanticViz — browser wireframe with semantic zone reveal"
```

---

## Task 2: FormsViz — Live Input Preview

**Files:**
- Modify: `src/topics/html/FormsViz.tsx` (full replacement)

**Step 1: Replace the entire file**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const PURPLE = '#a78bfa'
const YELLOW = '#f5c542'
const GREEN = '#4ade80'
const ORANGE = '#fb923c'

const stepLabels = [
  'A <form> collects user input',
  '<label> + <input> — linked pair',
  '<select> — dropdown choice',
  '<input type="checkbox"> vs <input type="radio">',
  '<button type="submit"> — sends data to server',
]

export default function FormsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const fontSize = compact ? 10 : 12
  const fieldPad = compact ? '3px 7px' : '5px 10px'
  const gap = compact ? 6 : 8

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {/* Form container */}
      <motion.div
        animate={{
          borderColor: s === 4 ? GREEN : BLUE,
          boxShadow: s === 4 ? `0 0 20px ${GREEN}44` : '0 0 0px transparent',
        }}
        transition={{ duration: 0.4 }}
        style={{
          border: '2px solid',
          borderRadius: 8,
          padding: compact ? 10 : 14,
          width: compact ? 200 : 260,
          display: 'flex',
          flexDirection: 'column',
          gap,
          fontFamily: 'var(--font-mono)',
          fontSize,
          background: 'var(--surface)',
          minHeight: compact ? 50 : 60,
        }}
      >
        {/* <form> label */}
        <span style={{ fontSize: compact ? 9 : 10, color: BLUE, fontWeight: 700, opacity: 0.7, letterSpacing: '0.5px' }}>
          &lt;form&gt;
        </span>

        {/* Step 1: label + input with blinking cursor */}
        <AnimatePresence>
          {s >= 1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ color: PURPLE, fontSize: compact ? 9 : 11 }}>
                  &lt;label for="email"&gt;Email&lt;/label&gt;
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: `1.5px solid ${PURPLE}`,
                  borderRadius: 4,
                  padding: fieldPad,
                  background: `${PURPLE}08`,
                }}>
                  <span style={{ color: '#c4b5fd', fontSize: compact ? 9 : 11, flex: 1 }}>
                    user@example.com
                  </span>
                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ color: PURPLE, fontSize: compact ? 11 : 13, lineHeight: 1 }}
                  >
                    |
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: select dropdown */}
        <AnimatePresence>
          {s >= 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ color: YELLOW, fontSize: compact ? 9 : 11 }}>
                  &lt;label&gt;Role&lt;/label&gt;
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: `1.5px solid ${YELLOW}`,
                  borderRadius: 4,
                  padding: fieldPad,
                  background: `${YELLOW}08`,
                  justifyContent: 'space-between',
                }}>
                  <span style={{ color: '#fde68a', fontSize: compact ? 9 : 11 }}>Developer</span>
                  <span style={{ color: YELLOW, fontSize: compact ? 9 : 11 }}>▾</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: checkbox + radio */}
        <AnimatePresence>
          {s >= 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 5 }}>
                {/* Checkbox — checked */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      width: compact ? 12 : 15,
                      height: compact ? 12 : 15,
                      border: `1.5px solid ${ORANGE}`,
                      borderRadius: 3,
                      background: `${ORANGE}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: ORANGE, fontSize: compact ? 7 : 9, lineHeight: 1 }}>✓</span>
                  </motion.div>
                  <span style={{ color: ORANGE, fontSize: compact ? 9 : 11 }}>Newsletter (checkbox)</span>
                </div>
                {/* Radio — selected */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      width: compact ? 12 : 15,
                      height: compact ? 12 : 15,
                      border: `1.5px solid ${ORANGE}`,
                      borderRadius: '50%',
                      background: `${ORANGE}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ width: compact ? 5 : 7, height: compact ? 5 : 7, borderRadius: '50%', background: ORANGE }} />
                  </motion.div>
                  <span style={{ color: ORANGE, fontSize: compact ? 9 : 11 }}>Senior (radio)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: submit button with glow pulse */}
        <AnimatePresence>
          {s >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            >
              <motion.div
                animate={{ boxShadow: [`0 0 0px ${GREEN}00`, `0 0 14px ${GREEN}88`, `0 0 0px ${GREEN}00`] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                  background: GREEN,
                  color: '#052e16',
                  borderRadius: 4,
                  padding: compact ? '5px 0' : '7px 0',
                  fontWeight: 700,
                  fontSize: compact ? 10 : 11,
                  textAlign: 'center',
                  cursor: 'default',
                }}
              >
                Submit →
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textAlign: 'center',
            maxWidth: compact ? 200 : 260,
            color: s === 0 ? '#71717a' : s === 1 ? PURPLE : s === 2 ? YELLOW : s === 3 ? ORANGE : GREEN,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Build to verify**

```bash
npm run build 2>&1 | tail -3
```

Expected: `✓ built in ...s`

**Step 3: Commit**

```bash
git add src/topics/html/FormsViz.tsx
git commit -m "feat: FormsViz — blinking cursor, real checkboxes, pulsing submit button"
```

---

## Task 3: BoxModelViz — CSS Value Badges

**Files:**
- Modify: `src/topics/css/BoxModelViz.tsx` (upgrade existing)

**Step 1: Replace the entire file**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PINK = '#ec4899'
const YELLOW = '#f5c542'
const GREEN = '#4ade80'
const CYAN = '#22d3ee'

const layers = [
  { label: 'Margin',  color: PINK,   cssValue: 'margin: 32px',      dimColor: 'rgba(236,72,153,0.08)',  pad: 32, padC: 20 },
  { label: 'Border',  color: YELLOW, cssValue: 'border: 3px solid',  dimColor: 'rgba(245,197,66,0.08)',  pad: 20, padC: 12 },
  { label: 'Padding', color: GREEN,  cssValue: 'padding: 24px',      dimColor: 'rgba(74,222,128,0.08)',  pad: 16, padC: 10 },
  { label: 'Content', color: CYAN,   cssValue: 'width: 120px',       dimColor: 'rgba(34,211,238,0.10)',  pad: 12, padC: 8  },
]

const stepLabels = [
  'Margin — pushes other elements away',
  'Border — frames the element',
  'Padding — inner breathing room',
  'Content — your text, image, or child elements',
]

export default function BoxModelViz({ step, compact = false }: Props) {
  const s = Math.min(step, 3)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {layers.map((layer, i) => {
          const visible = s >= i
          const active = s === i
          const pad = compact ? layer.padC : layer.pad

          return (
            <AnimatePresence key={layer.label}>
              {visible && (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    boxShadow: active ? `0 0 22px ${layer.color}55` : 'none',
                  }}
                  transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                  style={{
                    border: `${i === 1 ? 3 : 2}px solid ${layer.color}`,
                    background: layer.dimColor,
                    borderRadius: 8,
                    padding: pad,
                    position: i === 0 ? 'relative' : 'static',
                  }}
                >
                  {/* Layer label + CSS value badge */}
                  <div style={{
                    position: 'absolute',
                    top: 3,
                    left: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                    <span style={{
                      fontSize: compact ? 8 : 9,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: layer.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      {layer.label}
                    </span>

                    {/* CSS value badge — appears when active */}
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            fontSize: compact ? 7 : 8,
                            fontFamily: 'var(--font-mono)',
                            color: layer.color,
                            background: `${layer.color}18`,
                            border: `1px solid ${layer.color}44`,
                            borderRadius: 3,
                            padding: '1px 5px',
                          }}
                        >
                          {layer.cssValue}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content area */}
                  {i === layers.length - 1 && (
                    <div style={{
                      padding: compact ? '8px 18px' : '14px 32px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 11 : 13,
                      color: CYAN,
                      fontWeight: 600,
                    }}>
                      Hello World
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: layers[s]?.color,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Build to verify**

```bash
npm run build 2>&1 | tail -3
```

Expected: `✓ built in ...s`

**Step 3: Commit**

```bash
git add src/topics/css/BoxModelViz.tsx
git commit -m "feat: BoxModelViz — CSS value badges per active layer"
```

---

## Task 4: GridViz — Named Area Layout

**Files:**
- Modify: `src/topics/css/GridViz.tsx` (full replacement)

**Step 1: Replace the entire file**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#5b9cf5'
const CYAN = '#22d3ee'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'

const stepLabels = [
  'Block flow — elements stack vertically',
  'display: grid — grid context enabled',
  'grid-template-columns: 1fr 3fr — sidebar + main',
  'gap: 12px — breathing room between cells',
  'grid-column: 1 / -1 — header spans full width',
]

const cssRules = [
  '.container { }',
  '.container { display: grid; }',
  '.container { display: grid;\n  grid-template-columns: 1fr 3fr; }',
  '.container { display: grid;\n  grid-template-columns: 1fr 3fr;\n  gap: 12px; }',
  '.header { grid-column: 1 / -1; }',
]

export default function GridViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const hasCols = s >= 2
  const hasGap = s >= 3
  const hasSpan = s >= 4

  const containerWidth = compact ? 200 : 280
  const gap = hasGap ? (compact ? 6 : 10) : 0
  const headerH = compact ? 24 : 32
  const midH = compact ? 50 : 68
  const footerH = compact ? 20 : 26

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {/* CSS rule badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 9 : 11,
            color: CYAN,
            background: 'rgba(34,211,238,0.08)',
            border: '1px solid rgba(34,211,238,0.25)',
            borderRadius: 6,
            padding: compact ? '3px 8px' : '5px 12px',
            whiteSpace: 'pre',
            lineHeight: 1.5,
          }}
        >
          {cssRules[s]}
        </motion.div>
      </AnimatePresence>

      {/* Grid container */}
      <motion.div
        animate={{ gap, padding: compact ? 8 : 12 }}
        transition={{ duration: 0.4 }}
        style={{
          width: containerWidth,
          background: 'var(--surface)',
          border: '2px solid var(--border)',
          borderRadius: 8,
          display: 'grid',
          gridTemplateColumns: hasCols ? '1fr 3fr' : '1fr',
        }}
      >
        {/* Header — always spans full width */}
        <motion.div
          layout
          animate={{
            gridColumn: '1 / -1',
            height: headerH,
            background: hasSpan ? `${BLUE}22` : `${BLUE}14`,
            borderColor: hasSpan ? `${BLUE}99` : `${BLUE}55`,
            boxShadow: hasSpan ? `0 0 14px ${BLUE}44` : 'none',
          }}
          transition={{ duration: 0.4, layout: { duration: 0.4 } }}
          style={{
            border: '1.5px solid',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: compact ? 6 : 8,
            gap: 6,
            overflow: 'hidden',
          }}
        >
          <span style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: BLUE, fontWeight: 700 }}>
            &lt;header&gt;
          </span>
          <div style={{ width: compact ? 28 : 40, height: compact ? 3 : 4, borderRadius: 2, background: BLUE, opacity: 0.4 }} />
        </motion.div>

        {/* Sidebar — only visible when hasCols */}
        <AnimatePresence>
          {hasCols && (
            <motion.div
              layout
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1, height: midH, background: `${PURPLE}14`, borderColor: `${PURPLE}55` }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                border: '1.5px solid',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: compact ? '6px 5px' : '8px 7px',
                overflow: 'hidden',
                transformOrigin: 'left',
              }}
            >
              <span style={{ fontSize: compact ? 7 : 9, fontFamily: 'var(--font-mono)', color: PURPLE, fontWeight: 700 }}>
                &lt;nav&gt;
              </span>
              {[55, 70, 45].map((w, i) => (
                <div key={i} style={{ width: `${w}%`, height: compact ? 3 : 4, borderRadius: 2, background: PURPLE, opacity: 0.4 }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <motion.div
          layout
          animate={{
            height: midH,
            background: `${CYAN}14`,
            borderColor: `${CYAN}55`,
          }}
          transition={{ duration: 0.4, layout: { duration: 0.4 } }}
          style={{
            border: '1.5px solid',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            padding: compact ? '6px 5px' : '8px 7px',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontSize: compact ? 7 : 9, fontFamily: 'var(--font-mono)', color: CYAN, fontWeight: 700 }}>
            &lt;article&gt;
          </span>
          {[80, 60, 90, 70].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: compact ? 3 : 4, borderRadius: 2, background: CYAN, opacity: 0.3 }} />
          ))}
        </motion.div>

        {/* Footer — always spans full width */}
        <motion.div
          layout
          animate={{
            gridColumn: '1 / -1',
            height: footerH,
            background: `${ORANGE}12`,
            borderColor: `${ORANGE}55`,
          }}
          transition={{ duration: 0.4, layout: { duration: 0.4 } }}
          style={{
            border: '1.5px solid',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: ORANGE, fontWeight: 700 }}>
            &lt;footer&gt;
          </span>
        </motion.div>
      </motion.div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textAlign: 'center',
            maxWidth: containerWidth,
            color: s === 0 ? '#71717a' : CYAN,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Build to verify**

```bash
npm run build 2>&1 | tail -3
```

Expected: `✓ built in ...s`

**Step 3: Commit**

```bash
git add src/topics/css/GridViz.tsx
git commit -m "feat: GridViz — named area page layout with sidebar, main, header, footer"
```

---

## Task 5: SelectorsViz — DevTools Inspector

**Files:**
- Modify: `src/topics/css/SelectorsViz.tsx` (full replacement)

**Step 1: Replace the entire file**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN  = '#4ade80'
const BLUE   = '#5b9cf5'
const PURPLE = '#a78bfa'
const YELLOW = '#f5c542'

interface SelectorStep {
  selector: string | null
  rule: string | null
  color: string
  targets: string[]
  specificity: string | null
  specLabel: string | null
}

const STEPS: SelectorStep[] = [
  { selector: null,    rule: null,                    color: '#52525b', targets: [],            specificity: null,    specLabel: null },
  { selector: '*',     rule: '* { color: yellow }',   color: YELLOW,    targets: ['h1','p','div'], specificity: '0,0,0', specLabel: 'universal' },
  { selector: 'h1',    rule: 'h1 { color: green }',   color: GREEN,     targets: ['h1'],         specificity: '0,0,1', specLabel: 'type' },
  { selector: '.title',rule: '.title { color: blue }', color: BLUE,     targets: ['h1'],         specificity: '0,1,0', specLabel: 'class' },
  { selector: '#box',  rule: '#box { color: purple }', color: PURPLE,   targets: ['div'],        specificity: '1,0,0', specLabel: 'ID' },
]

const stepLabels = [
  'CSS selectors target HTML elements',
  '* selects every element on the page',
  'Type selector — matches by tag name',
  'Class selector — reusable, matches many elements',
  'ID selector — unique, highest specificity',
]

const htmlElements = [
  { tag: 'h1',  attrs: 'class="title"' },
  { tag: 'p',   attrs: 'class="lead"' },
  { tag: 'div', attrs: 'id="box"' },
]

export default function SelectorsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEPS[s]
  const mono = 'var(--font-mono)'
  const fontSize = compact ? 9 : 11
  const panelW = compact ? 96 : 130

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ display: 'flex', gap: compact ? 8 : 12, alignItems: 'stretch' }}>

        {/* Left: CSS rule panel */}
        <div style={{
          width: panelW,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: compact ? '6px 8px' : '8px 10px',
          fontFamily: mono,
          fontSize,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}>
          <span style={{ color: '#52525b', fontSize: compact ? 7 : 9 }}>style.css</span>

          <AnimatePresence mode="wait">
            {cfg.rule ? (
              <motion.div
                key={cfg.rule}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ color: cfg.color, fontWeight: 700 }}>{cfg.selector}</span>
                <span style={{ color: '#71717a' }}>{' {'}</span>
                <div style={{ paddingLeft: 8, color: cfg.color, opacity: 0.85 }}>
                  {'color: '}{s === 1 ? 'yellow' : s === 2 ? 'green' : s === 3 ? 'blue' : 'purple'}{';'}
                </div>
                <span style={{ color: '#71717a' }}>{'}'}</span>
              </motion.div>
            ) : (
              <motion.span
                key="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                style={{ color: '#52525b', fontSize: compact ? 8 : 9 }}
              >
                {'/* no rule */'}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Specificity badge */}
          <AnimatePresence>
            {cfg.specificity && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  fontSize: compact ? 7 : 9,
                  color: cfg.color,
                  background: `${cfg.color}18`,
                  border: `1px solid ${cfg.color}44`,
                  borderRadius: 3,
                  padding: '2px 5px',
                  textAlign: 'center',
                }}
              >
                ({cfg.specificity}) {cfg.specLabel}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ color: s > 0 ? cfg.color : '#3f3f46' }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', fontSize: compact ? 16 : 20 }}
        >
          →
        </motion.div>

        {/* Right: HTML elements panel */}
        <div style={{
          width: panelW,
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: compact ? '6px 8px' : '8px 10px',
          fontFamily: mono,
          fontSize,
          display: 'flex',
          flexDirection: 'column',
          gap: compact ? 4 : 6,
        }}>
          <span style={{ color: '#52525b', fontSize: compact ? 7 : 9 }}>index.html</span>

          {htmlElements.map(el => {
            const targeted = cfg.targets.includes(el.tag)
            return (
              <motion.div
                key={el.tag}
                animate={{
                  color: targeted ? cfg.color : '#52525b',
                  background: targeted ? `${cfg.color}14` : 'transparent',
                  boxShadow: targeted ? `0 0 8px ${cfg.color}44` : 'none',
                }}
                transition={{ duration: 0.35 }}
                style={{ borderRadius: 3, padding: '2px 4px', fontSize }}
              >
                <span style={{ opacity: 0.5 }}>&lt;</span>
                <span style={{ fontWeight: 700 }}>{el.tag}</span>
                {!compact && (
                  <span style={{ opacity: 0.6 }}> {el.attrs}</span>
                )}
                <span style={{ opacity: 0.5 }}>&gt;</span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: mono,
            fontSize: 12,
            textAlign: 'center',
            color: s === 0 ? '#71717a' : cfg.color,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Build to verify**

```bash
npm run build 2>&1 | tail -3
```

Expected: `✓ built in ...s`

**Step 3: Commit**

```bash
git add src/topics/css/SelectorsViz.tsx
git commit -m "feat: SelectorsViz — two-panel DevTools inspector with specificity scores"
```

---

## Summary

| Task | File | Metaphor |
|------|------|----------|
| 1 | `html/SemanticViz.tsx` | Browser wireframe — zones light up |
| 2 | `html/FormsViz.tsx` | Live inputs — blinking cursor, real checkboxes |
| 3 | `css/BoxModelViz.tsx` | CSS value badges per active layer |
| 4 | `css/GridViz.tsx` | Named area layout — header/sidebar/main/footer |
| 5 | `css/SelectorsViz.tsx` | DevTools two-panel — CSS targets HTML |
