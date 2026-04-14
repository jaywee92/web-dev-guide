# Viz Upgrade — 10 Weak AnimComp Components

> ✅ **COMPLETED** — implemented and deployed to main

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite 10 underperforming animation components so each step produces a meaningful visual change that teaches the concept through layout, motion, and structure — not just text fades or opacity toggles.

**Architecture:** Each file is a self-contained React component receiving `{ step: number; compact?: boolean }`. All styles are inline. Framer Motion (`motion`, `AnimatePresence`) handles transitions. No shared state, no hooks beyond the component itself. Follow the BoxModelViz / EventLoopViz reference pattern exactly.

**Tech Stack:** React 18, TypeScript, Framer Motion (`motion.div`, `AnimatePresence`, spring transitions), inline styles only, CSS custom properties via `var(--font-mono)` etc.

**Reference pattern (copy this structure):**
```tsx
import { motion, AnimatePresence } from 'framer-motion'
interface Props { step: number; compact?: boolean }
const COLOR = '#...'
const STEPS = [{ ... }] // data indexed by step
export default function XxxViz({ step, compact = false }: Props) {
  const s = Math.min(step, STEPS.length - 1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* visual — changes meaningfully per step */}
      {/* step label badge — AnimatePresence mode="wait" key={s} */}
    </div>
  )
}
```

**Spring transition to use:** `{ type: 'spring', stiffness: 300, damping: 24 }`
**Glow pattern:** `boxShadow: active ? \`0 0 20px ${COLOR}55\` : 'none'`
**Step label badge:** `AnimatePresence mode="wait"` with `key={s}`, fade in/out y±8

---

## Chunk 1: HTML Components (Tasks 1–2)

### Task 1: AccessibilityViz

**File:** `src/topics/html/AccessibilityViz.tsx` (overwrite)

**Concept to teach:** Accessibility layers — semantic element → ARIA role → aria-label → keyboard focus → screen reader output. Each step adds one layer to the same element.

**Visual design:**
- Central area: a single "button" element rendered as a visible rectangle
- Step 0: Plain `<div>` — no accessibility. Red warning badge "Not accessible"
- Step 1: `role="button"` badge appears on the element in amber. Role chip slides in.
- Step 2: `aria-label="Submit form"` badge appears in blue. Second chip slides in below role.
- Step 3: Keyboard focus ring animates around element (animated dashed border). Tab key icon appears. "Focus visible" label.
- Step 4: Screen reader speech bubble appears next to element: `"Submit form, button"` — animated typewriter reveal. Green "✓ Accessible" badge.

**Colors:** AMBER `#f59e0b`, BLUE `#60a5fa`, GREEN `#4ade80`, RED `#f87171`

**Step labels:**
```
0: 'A plain <div> — invisible to assistive tech'
1: 'role="button" — announces element type to screen readers'
2: 'aria-label — gives the element a readable name'
3: 'Keyboard focus — navigable with Tab key'
4: 'Screen reader reads: "Submit form, button"'
```

- [x] **Step 1: Rewrite AccessibilityViz**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const AMBER = '#f59e0b'
const BLUE  = '#60a5fa'
const GREEN = '#4ade80'
const RED   = '#f87171'

const stepLabels = [
  'A plain <div> — invisible to assistive tech',
  'role="button" — announces element type to screen readers',
  'aria-label — gives the element a readable name',
  'Keyboard focus — navigable with Tab key',
  'Screen reader reads: "Submit form, button"',
]

const srText = 'Submit form, button'

export default function AccessibilityViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const fs = compact ? 10 : 12
  const gap = compact ? 10 : 16

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap }}>
      {/* Element box */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>

        {/* The "element" */}
        <motion.div
          animate={{
            boxShadow: s === 3 ? `0 0 0 3px ${BLUE}, 0 0 0 6px ${BLUE}44` : 'none',
            borderColor: s >= 1 ? AMBER + 'cc' : RED + '88',
          }}
          transition={{ duration: 0.4 }}
          style={{
            width: compact ? 120 : 160,
            padding: compact ? '10px 16px' : '14px 28px',
            border: '2px solid',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 12 : 14,
            color: 'var(--text)',
            fontWeight: 600,
            position: 'relative',
          }}
        >
          Submit

          {/* Not accessible warning */}
          <AnimatePresence>
            {s === 0 && (
              <motion.div
                key="warn"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                  fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: RED, background: `${RED}18`, border: `1px solid ${RED}55`,
                  borderRadius: 4, padding: '2px 7px', whiteSpace: 'nowrap',
                }}
              >
                ⚠ Not accessible
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ARIA attribute chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-start' }}>
          <AnimatePresence>
            {s >= 1 && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                style={{
                  fontSize: fs, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: AMBER, background: `${AMBER}18`, border: `1px solid ${AMBER}55`,
                  borderRadius: 5, padding: compact ? '2px 8px' : '3px 10px',
                }}
              >
                role=<span style={{ color: '#fff' }}>"button"</span>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {s >= 2 && (
              <motion.div
                key="label"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.1 }}
                style={{
                  fontSize: fs, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: BLUE, background: `${BLUE}18`, border: `1px solid ${BLUE}55`,
                  borderRadius: 5, padding: compact ? '2px 8px' : '3px 10px',
                }}
              >
                aria-label=<span style={{ color: '#fff' }}>"Submit form"</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Keyboard indicator */}
        <AnimatePresence>
          {s === 3 && (
            <motion.div
              key="kbd"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)',
                color: BLUE, background: `${BLUE}18`, border: `1px solid ${BLUE}44`,
                borderRadius: 6, padding: compact ? '4px 8px' : '5px 12px',
              }}
            >
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >⇥ Tab</motion.span>
              <span style={{ color: 'var(--text-muted)' }}>→ focus visible</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen reader bubble */}
        <AnimatePresence>
          {s === 4 && (
            <motion.div
              key="sr"
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                background: '#1a2a1a', border: `1.5px solid ${GREEN}88`,
                borderRadius: 8, padding: compact ? '8px 12px' : '10px 16px',
                maxWidth: compact ? 180 : 240,
                boxShadow: `0 0 20px ${GREEN}22`,
              }}
            >
              <div style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: GREEN, marginBottom: 4, fontWeight: 700 }}>
                🔊 SCREEN READER
              </div>
              <div style={{ fontSize: compact ? 10 : 12, fontFamily: 'var(--font-mono)', color: '#d1fae5' }}>
                "{srText}"
              </div>
              <div style={{ marginTop: 6 }}>
                <span style={{
                  fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', fontWeight: 800,
                  color: GREEN, background: `${GREEN}22`, border: `1px solid ${GREEN}55`,
                  borderRadius: 3, padding: '1px 6px',
                }}>✓ Accessible</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            color: [RED, AMBER, BLUE, BLUE, GREEN][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [x] **Step 2: Build check**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep AccessibilityViz
```
Expected: no errors

- [x] **Step 3: Commit**
```bash
git add src/topics/html/AccessibilityViz.tsx
git commit -m "feat: AccessibilityViz — layered a11y: role → aria-label → focus → screen reader"
```

---

### Task 2: TextHeadingsViz

**File:** `src/topics/html/TextHeadingsViz.tsx` (overwrite)

**Concept to teach:** Heading hierarchy as document structure — each heading level creates a visible nesting/size relationship. Show semantic vs decorative distinction.

**Visual design:**
- A document outline that builds up level by level
- Step 0: h1 — large, single, "Page Title" with badge "1× per page"
- Step 1: h2 sections appear below h1, indented, smaller
- Step 2: h3 sub-sections appear under h2, further indented
- Step 3: Strong/em inline elements — a paragraph with highlighted words (bold/italic badges)
- Step 4: Bad vs Good split — left: div soup with same visual but no semantics (greyed out); right: proper h1/h2/h3 tree (colored, glowing)

**Colors:** BLUE `#60a5fa`, PURPLE `#a78bfa`, CYAN `#22d3ee`, GREEN `#4ade80`, RED `#f87171`

**Step labels:**
```
0: '<h1> — one per page, the main document title'
1: '<h2> — major sections, multiple per page'
2: '<h3> — sub-sections within an h2'
3: '<strong> and <em> — inline emphasis within text'
4: 'Semantic structure vs visual-only markup'
```

- [x] **Step 1: Rewrite TextHeadingsViz**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE   = '#60a5fa'
const PURPLE = '#a78bfa'
const CYAN   = '#22d3ee'
const GREEN  = '#4ade80'
const RED    = '#f87171'

const stepLabels = [
  '<h1> — one per page, the main document title',
  '<h2> — major sections, multiple per page',
  '<h3> — sub-sections within an h2',
  '<strong> and <em> — inline emphasis within text',
  'Semantic structure vs visual-only markup',
]

function HeadingRow({ tag, text, color, indent = 0, size = 16, compact = false }: {
  tag: string; text: string; color: string; indent?: number; size?: number; compact?: boolean
}) {
  const fs = compact ? size * 0.75 : size
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: indent }}
    >
      <span style={{
        fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', fontWeight: 700,
        color, background: `${color}18`, border: `1px solid ${color}44`,
        borderRadius: 3, padding: '1px 5px', flexShrink: 0,
      }}>{tag}</span>
      <span style={{ fontSize: fs, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{text}</span>
    </motion.div>
  )
}

export default function TextHeadingsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const gap = compact ? 6 : 10

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>

      {s < 4 ? (
        /* Steps 0-3: Building heading hierarchy */
        <div style={{
          width: '100%', maxWidth: compact ? 280 : 360,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: compact ? 14 : 20,
          display: 'flex', flexDirection: 'column', gap,
        }}>
          <AnimatePresence>
            {s >= 0 && (
              <motion.div key="h1" style={{ paddingBottom: s >= 1 ? gap : 0 }}>
                <HeadingRow tag="h1" text="Getting Started with Git" color={BLUE} size={18} compact={compact} />
                <AnimatePresence>
                  {s === 0 && (
                    <motion.span
                      key="badge"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        marginLeft: compact ? 44 : 56, fontSize: compact ? 7 : 8,
                        fontFamily: 'var(--font-mono)', color: BLUE,
                        background: `${BLUE}18`, border: `1px solid ${BLUE}44`,
                        borderRadius: 3, padding: '1px 6px',
                      }}
                    >1× per page</motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {s >= 1 && (
              <motion.div key="h2s" style={{ display: 'flex', flexDirection: 'column', gap }}>
                <HeadingRow tag="h2" text="Installation" color={PURPLE} indent={compact ? 10 : 16} size={15} compact={compact} />
                <HeadingRow tag="h2" text="Basic Commands" color={PURPLE} indent={compact ? 10 : 16} size={15} compact={compact} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {s >= 2 && (
              <motion.div key="h3s" style={{ display: 'flex', flexDirection: 'column', gap }}>
                <HeadingRow tag="h3" text="git init" color={CYAN} indent={compact ? 24 : 36} size={13} compact={compact} />
                <HeadingRow tag="h3" text="git add" color={CYAN} indent={compact ? 24 : 36} size={13} compact={compact} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {s === 3 && (
              <motion.div
                key="inline"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  fontSize: compact ? 10 : 12, color: 'var(--text-muted)',
                  lineHeight: 1.7, paddingLeft: compact ? 10 : 16,
                  borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: gap,
                }}
              >
                Use{' '}
                <span style={{ fontWeight: 700, color: 'var(--text)', background: `${GREEN}18`, borderRadius: 3, padding: '0 3px' }}>
                  &lt;strong&gt;
                </span>
                {' '}for important text and{' '}
                <span style={{ fontStyle: 'italic', color: PURPLE, background: `${PURPLE}18`, borderRadius: 3, padding: '0 3px' }}>
                  &lt;em&gt;
                </span>
                {' '}for emphasis.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Step 4: Semantic vs div-soup comparison */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', gap: compact ? 10 : 16, width: '100%', maxWidth: compact ? 300 : 400 }}
        >
          {/* Bad: div soup */}
          <div style={{
            flex: 1, background: `${RED}0a`, border: `1px solid ${RED}33`,
            borderRadius: 8, padding: compact ? 10 : 14,
            display: 'flex', flexDirection: 'column', gap: 5, opacity: 0.7,
          }}>
            <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: RED, fontWeight: 700, marginBottom: 4 }}>✗ DIV SOUP</div>
            {['div.big', 'div.medium', 'div.medium', 'div.small'].map((t, i) => (
              <div key={i} style={{
                fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)',
                color: `${RED}bb`, paddingLeft: i > 0 ? (compact ? 8 : 12) : 0,
              }}>{t}</div>
            ))}
          </div>
          {/* Good: semantic */}
          <div style={{
            flex: 1, background: `${GREEN}0a`, border: `1px solid ${GREEN}44`,
            borderRadius: 8, padding: compact ? 10 : 14,
            display: 'flex', flexDirection: 'column', gap: 5,
            boxShadow: `0 0 18px ${GREEN}18`,
          }}>
            <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: GREEN, fontWeight: 700, marginBottom: 4 }}>✓ SEMANTIC</div>
            {['h1', 'h2', 'h2', 'h3'].map((t, i) => (
              <div key={i} style={{
                fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)',
                color: [BLUE, PURPLE, PURPLE, CYAN][i],
                paddingLeft: [0, compact ? 8 : 12, compact ? 8 : 12, compact ? 16 : 24][i],
                fontWeight: 700,
              }}>{`<${t}>`}</div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: [BLUE, PURPLE, CYAN, GREEN, GREEN][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [x] **Step 2: Build check**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep TextHeadingsViz
```

- [x] **Step 3: Commit**
```bash
git add src/topics/html/TextHeadingsViz.tsx
git commit -m "feat: TextHeadingsViz — heading hierarchy tree + semantic vs div-soup comparison"
```

---

## Chunk 2: CSS Token & Variable Components (Tasks 3–4)

### Task 3: ThemingViz

**File:** `src/topics/css/ThemingViz.tsx` (overwrite)

**Concept to teach:** CSS custom properties cascade from `:root` → component. Changing one variable updates everything. Dark mode flips the token values.

**Visual design:**
- Step 0: `:root {}` block shows `--bg`, `--text`, `--accent` declared (3 lines appear)
- Step 1: Arrows flow downward from `:root` into a `.card` component that uses `var(--bg)` etc — lines connect declaration to usage
- Step 2: Light theme rendered — card uses the values, colors are warm/light
- Step 3: `.dark` class applied to root — arrows update, card morphs to dark theme
- Step 4: Side-by-side light/dark card with same code, different token values

**Colors:** YELLOW `#f5c542`, BLUE `#60a5fa`, PURPLE `#a78bfa`

**Step labels:**
```
0: 'Declare tokens in :root — available everywhere'
1: 'Components consume tokens via var()'
2: 'Light theme — token values applied'
3: 'Add .dark class — tokens override, everything updates'
4: 'One variable change propagates to every usage'
```

- [x] **Step 1: Rewrite ThemingViz**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const YELLOW = '#f5c542'
const BLUE   = '#60a5fa'
const PURPLE = '#a78bfa'
const GREEN  = '#4ade80'

const stepLabels = [
  'Declare tokens in :root — available everywhere',
  'Components consume tokens via var()',
  'Light theme — token values applied',
  'Add .dark class — tokens override, everything updates',
  'One variable change propagates to every usage',
]

const lightTokens = { bg: '#f8fafc', text: '#0f172a', accent: '#6366f1' }
const darkTokens  = { bg: '#0f172a', text: '#f8fafc', accent: '#818cf8' }

function MiniCard({ bg, text, accent, label, compact }: {
  bg: string; text: string; accent: string; label: string; compact: boolean
}) {
  return (
    <motion.div
      layout
      animate={{ backgroundColor: bg, borderColor: accent + '88' }}
      transition={{ duration: 0.5 }}
      style={{
        border: '1.5px solid',
        borderRadius: 8, padding: compact ? '8px 10px' : '12px 16px',
        minWidth: compact ? 100 : 130,
      }}
    >
      <motion.div animate={{ color: accent }} transition={{ duration: 0.5 }}
        style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', fontWeight: 800, marginBottom: 4 }}>
        {label}
      </motion.div>
      <motion.div animate={{ color: text }} transition={{ duration: 0.5 }}
        style={{ fontSize: compact ? 10 : 13, fontWeight: 700, marginBottom: 3 }}>Heading</motion.div>
      <motion.div animate={{ color: text + 'aa' }} transition={{ duration: 0.5 }}
        style={{ fontSize: compact ? 8 : 10 }}>Body text</motion.div>
      <motion.div
        animate={{ backgroundColor: accent, color: bg }}
        transition={{ duration: 0.5 }}
        style={{ marginTop: 6, borderRadius: 4, padding: compact ? '2px 6px' : '3px 8px',
          fontSize: compact ? 8 : 10, fontWeight: 700, textAlign: 'center' as const }}>
        Button
      </motion.div>
    </motion.div>
  )
}

export default function ThemingViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const fs = compact ? 9 : 10
  const tokens = [lightTokens, lightTokens, lightTokens, darkTokens, darkTokens][s]
  const isDark = s >= 3

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>

      {/* :root block */}
      <AnimatePresence>
        {s <= 2 && (
          <motion.div
            key="root"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              background: `${YELLOW}0d`, border: `1px solid ${YELLOW}44`,
              borderRadius: 8, padding: compact ? '8px 12px' : '12px 16px',
              fontFamily: 'var(--font-mono)', fontSize: fs,
            }}
          >
            <div style={{ color: YELLOW, fontWeight: 700, marginBottom: 5 }}>:root {'{'}</div>
            {['--bg: #f8fafc', '--text: #0f172a', '--accent: #6366f1'].map((line, i) => (
              <AnimatePresence key={line}>
                {s >= 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    style={{ color: [BLUE, 'var(--text)', PURPLE][i], paddingLeft: 12, marginBottom: 2 }}
                  >
                    {line};
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
            <div style={{ color: YELLOW }}>{'}'}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark class override */}
      <AnimatePresence>
        {s >= 3 && (
          <motion.div
            key="dark-rule"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: `${PURPLE}0d`, border: `1px solid ${PURPLE}55`,
              borderRadius: 8, padding: compact ? '8px 12px' : '12px 16px',
              fontFamily: 'var(--font-mono)', fontSize: fs,
              boxShadow: `0 0 16px ${PURPLE}22`,
            }}
          >
            <div style={{ color: PURPLE, fontWeight: 700, marginBottom: 4 }}>.dark {'{'}</div>
            <div style={{ color: BLUE, paddingLeft: 12, marginBottom: 2 }}>--bg: #0f172a;</div>
            <div style={{ color: 'var(--text)', paddingLeft: 12, marginBottom: 2 }}>--text: #f8fafc;</div>
            <div style={{ color: PURPLE, paddingLeft: 12, marginBottom: 2 }}>--accent: #818cf8;</div>
            <div style={{ color: PURPLE }}>{'}'}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow down */}
      <AnimatePresence>
        {s >= 1 && s <= 3 && (
          <motion.div
            key="arrow"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontSize: 20, color: YELLOW + '88', transformOrigin: 'top' }}
          >↓</motion.div>
        )}
      </AnimatePresence>

      {/* Card or side-by-side */}
      {s < 4 ? (
        <AnimatePresence>
          {s >= 1 && (
            <motion.div key="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <MiniCard
                bg={isDark ? darkTokens.bg : lightTokens.bg}
                text={isDark ? darkTokens.text : lightTokens.text}
                accent={isDark ? darkTokens.accent : lightTokens.accent}
                label={isDark ? '.dark applied' : 'Light theme'}
                compact={compact}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', gap: compact ? 10 : 16 }}
        >
          <MiniCard {...lightTokens} label="☀ Light" compact={compact} />
          <MiniCard {...darkTokens}  label="🌙 Dark"  compact={compact} />
        </motion.div>
      )}

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: [YELLOW, BLUE, BLUE, PURPLE, GREEN][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [x] **Step 2: Build check**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep ThemingViz
```

- [x] **Step 3: Commit**
```bash
git add src/topics/css/ThemingViz.tsx
git commit -m "feat: ThemingViz — CSS token cascade + animated light/dark theme switch"
```

---

### Task 4: CustomPropertiesViz

**File:** `src/topics/css/CustomPropertiesViz.tsx` (overwrite)

**Concept to teach:** CSS variables declared once, used everywhere. Change one value → all usages update. Override in local scope.

**Visual design:**
- Step 0: `:root` block with `--primary: #6366f1` and `--spacing: 16px`
- Step 1: Three usage sites appear (`.btn`, `.link`, `.badge`) each with `var(--primary)` — animated arrows fan out from declaration to each usage
- Step 2: Show all three elements rendered in the primary color — all matching
- Step 3: Change `--primary` value in root → animated wave ripples through all three elements updating their color
- Step 4: Local scope override — `.card { --primary: #f59e0b }` — only the card's button overrides, other buttons stay original

**Colors:** PURPLE `#a78bfa`, BLUE `#60a5fa`, AMBER `#f59e0b`, GREEN `#4ade80`

**Step labels:**
```
0: 'Declare a variable once in :root'
1: 'Reference it with var() in multiple places'
2: 'Every usage reflects the same value'
3: 'Change the variable — all usages update instantly'
4: 'Override in a local scope — only that subtree changes'
```

- [x] **Step 1: Rewrite CustomPropertiesViz**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PURPLE = '#a78bfa'
const BLUE   = '#60a5fa'
const AMBER  = '#f59e0b'
const GREEN  = '#4ade80'

const stepLabels = [
  'Declare a variable once in :root',
  'Reference it with var() in multiple places',
  'Every usage reflects the same value',
  'Change the variable — all usages update instantly',
  'Override in a local scope — only that subtree changes',
]

const usages = [
  { selector: '.btn',   prop: 'background', el: 'Button' },
  { selector: '.link',  prop: 'color',      el: 'Link'   },
  { selector: '.badge', prop: 'border',     el: 'Badge'  },
]

export default function CustomPropertiesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const activeColor = s === 3 ? AMBER : s === 4 ? PURPLE : BLUE
  const rootColor = s >= 3 ? AMBER : BLUE
  const fs = compact ? 9 : 10

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>

      {/* :root declaration */}
      <motion.div
        animate={{ borderColor: `${rootColor}66`, boxShadow: `0 0 16px ${rootColor}22` }}
        transition={{ duration: 0.5 }}
        style={{
          background: `${PURPLE}0d`, border: '1.5px solid',
          borderRadius: 8, padding: compact ? '8px 12px' : '12px 18px',
          fontFamily: 'var(--font-mono)', fontSize: fs,
        }}
      >
        <div style={{ color: PURPLE, fontWeight: 700, marginBottom: 4 }}>:root {'{'}</div>
        <motion.div
          animate={{ color: rootColor }}
          transition={{ duration: 0.5 }}
          style={{ paddingLeft: 12, marginBottom: 2 }}
        >
          --primary: <motion.span
            animate={{ color: rootColor, textShadow: s === 3 ? `0 0 8px ${rootColor}` : 'none' }}
            transition={{ duration: 0.5 }}
          >{s >= 3 ? '#f59e0b' : '#6366f1'}</motion.span>;
        </motion.div>
        <div style={{ color: GREEN + 'aa', paddingLeft: 12 }}>--spacing: 16px;</div>
        <div style={{ color: PURPLE, marginTop: 2 }}>{'}'}</div>
      </motion.div>

      {/* Usage sites */}
      <AnimatePresence>
        {s >= 1 && (
          <motion.div
            key="usages"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: compact ? 8 : 12 }}
          >
            {usages.map((u, i) => (
              <motion.div
                key={u.selector}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid rgba(255,255,255,0.1)`,
                  borderRadius: 8, padding: compact ? '6px 10px' : '10px 14px',
                  fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9,
                  textAlign: 'center' as const,
                }}
              >
                <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{u.selector}</div>
                <div style={{ color: 'var(--text-muted)', marginBottom: 6, fontSize: compact ? 7 : 8 }}>
                  {u.prop}: <span style={{ color: activeColor }}>var(--primary)</span>
                </div>
                {/* Rendered element preview */}
                <AnimatePresence>
                  {s >= 2 && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        background: i === 0 ? activeColor : 'transparent',
                        color: i === 0 ? '#fff' : i === 4 ? s >= 4 && i === 0 ? AMBER : activeColor : activeColor,
                        border: i === 2 ? `2px solid ${activeColor}` : 'none',
                        borderRadius: 4,
                        padding: compact ? '2px 6px' : '3px 8px',
                        fontSize: compact ? 8 : 10,
                        fontWeight: 600,
                        transition: 'all 0.5s',
                      }}
                    >
                      {u.el}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local scope override (step 4) */}
      <AnimatePresence>
        {s === 4 && (
          <motion.div
            key="override"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: `${AMBER}0d`, border: `1px solid ${AMBER}44`,
              borderRadius: 8, padding: compact ? '6px 10px' : '10px 14px',
              fontFamily: 'var(--font-mono)', fontSize: fs,
              boxShadow: `0 0 14px ${AMBER}18`,
            }}
          >
            <div style={{ color: AMBER, fontWeight: 700, marginBottom: 3 }}>.card {'{'}</div>
            <div style={{ paddingLeft: 12, color: AMBER, marginBottom: 2 }}>--primary: #f59e0b; <span style={{ color: 'var(--text-muted)', fontSize: compact ? 7 : 8 }}>/* local override */</span></div>
            <div style={{ color: AMBER }}>{'}'}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: [PURPLE, BLUE, BLUE, AMBER, AMBER][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [x] **Step 2: Build check + commit**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep CustomPropertiesViz
git add src/topics/css/CustomPropertiesViz.tsx
git commit -m "feat: CustomPropertiesViz — token declaration → fan-out usage → live override"
```

---

## Chunk 3: JavaScript & CSS Visual Components (Tasks 5–7)

### Task 5: VariablesViz

**File:** `src/topics/javascript/VariablesViz.tsx` (overwrite)

**Concept to teach:** var/let/const differ in scope, reassignability, and hoisting. Show this spatially — scope as a box, reassignment as mutation, hoisting as invisible lift.

**Visual design:**
- Step 0: `var` — big function-scope box. Variable hoisted to top (ghost line shows it at top of function before declaration)
- Step 1: `let` — smaller block-scope box `{ }`. Variable only visible inside the braces.
- Step 2: `const` — same block scope but with a 🔒 lock icon. Attempt to reassign shows ❌ error.
- Step 3: Primitive types as colored pills: string (green), number (blue), boolean (purple), null/undefined (grey)
- Step 4: Two separate `let count = 0` scopes side by side — changing one doesn't affect the other (scope isolation)

**Colors:** ORANGE `#fb923c`, BLUE `#60a5fa`, PURPLE `#a78bfa`, GREEN `#4ade80`, RED `#f87171`

**Step labels:**
```
0: 'var — function-scoped, hoisted to top of function'
1: 'let — block-scoped, lives only inside { }'
2: 'const — block-scoped, cannot be reassigned'
3: 'Values have types: string, number, boolean, null, undefined'
4: 'Each scope has its own copy — changes don\'t leak out'
```

- [x] **Step 1: Rewrite VariablesViz**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const ORANGE = '#fb923c'
const BLUE   = '#60a5fa'
const PURPLE = '#a78bfa'
const GREEN  = '#4ade80'
const RED    = '#f87171'
const GREY   = '#6b7280'

const stepLabels = [
  'var — function-scoped, hoisted to top of function',
  'let — block-scoped, lives only inside { }',
  'const — block-scoped, cannot be reassigned',
  'Values have types: string, number, boolean, null, undefined',
  "Each scope has its own copy — changes don't leak out",
]

const types = [
  { type: 'string',    ex: '"hello"',    color: GREEN  },
  { type: 'number',    ex: '42',         color: BLUE   },
  { type: 'boolean',   ex: 'true',       color: PURPLE },
  { type: 'null',      ex: 'null',       color: GREY   },
  { type: 'undefined', ex: 'undefined',  color: GREY   },
]

function ScopeBox({ color, label, width, children, compact }: {
  color: string; label: string; width?: number; children: React.ReactNode; compact: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{
        border: `2px solid ${color}66`,
        borderRadius: 10, padding: compact ? 10 : 16,
        background: `${color}08`,
        width: width ?? 'auto',
        boxShadow: `0 0 18px ${color}18`,
      }}
    >
      <div style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color, marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
        {label}
      </div>
      {children}
    </motion.div>
  )
}

function VarLine({ keyword, name, value, color, compact }: {
  keyword: string; name: string; value: string; color: string; compact: boolean
}) {
  const fs = compact ? 9 : 11
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: fs }}>
      <span style={{ color }}>{keyword}</span>{' '}
      <span style={{ color: 'var(--text)' }}>{name}</span>{' '}
      <span style={{ color: 'var(--text-muted)' }}>= </span>
      <span style={{ color: GREEN }}>'{value}'</span>
    </div>
  )
}

export default function VariablesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      <AnimatePresence mode="wait">

        {/* Step 0: var + hoisting */}
        {s === 0 && (
          <motion.div key="var" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}>
            <ScopeBox color={ORANGE} label="function scope" compact={compact}>
              {/* hoisted ghost */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9,
                  color: ORANGE + '66', marginBottom: 6,
                  borderLeft: `2px dashed ${ORANGE}44`, paddingLeft: 6,
                }}
              >
                {/* hoisted */} var name = undefined
              </motion.div>
              <div style={{ fontSize: compact ? 7 : 8, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
                // ... code above ...
              </div>
              <VarLine keyword="var" name="name" value="Alice" color={ORANGE} compact={compact} />
            </ScopeBox>
          </motion.div>
        )}

        {/* Step 1: let + block scope */}
        {s === 1 && (
          <motion.div key="let" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}>
            <ScopeBox color={BLUE} label="block scope { }" compact={compact}>
              <VarLine keyword="let" name="count" value="0" color={BLUE} compact={compact} />
              <div style={{ marginTop: 8, fontSize: compact ? 8 : 10, color: BLUE + 'aa', fontFamily: 'var(--font-mono)' }}>
                count = 1  <span style={{ color: GREEN }}>// ✓ ok</span>
              </div>
            </ScopeBox>
            <div style={{ marginTop: 8, fontSize: compact ? 8 : 10, color: RED + 'aa', fontFamily: 'var(--font-mono)', textAlign: 'center' as const }}>
              outside {'{ }'}: count → ReferenceError ❌
            </div>
          </motion.div>
        )}

        {/* Step 2: const */}
        {s === 2 && (
          <motion.div key="const" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: compact ? 260 : 320 }}>
            <ScopeBox color={PURPLE} label="const — immutable binding 🔒" compact={compact}>
              <VarLine keyword="const" name="PI" value="3.14" color={PURPLE} compact={compact} />
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 10,
                  color: RED, background: `${RED}12`, border: `1px solid ${RED}44`,
                  borderRadius: 5, padding: compact ? '4px 8px' : '5px 10px',
                }}
              >
                PI = 3  ❌ TypeError: Assignment to constant
              </motion.div>
            </ScopeBox>
          </motion.div>
        )}

        {/* Step 3: Types */}
        {s === 3 && (
          <motion.div key="types" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexWrap: 'wrap' as const, gap: compact ? 6 : 8, justifyContent: 'center', maxWidth: compact ? 260 : 340 }}>
            {types.map((t, i) => (
              <motion.div
                key={t.type}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  background: `${t.color}18`, border: `1.5px solid ${t.color}55`,
                  borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px',
                  textAlign: 'center' as const,
                }}
              >
                <div style={{ fontSize: compact ? 8 : 9, fontFamily: 'var(--font-mono)', color: t.color, fontWeight: 700, textTransform: 'uppercase' as const }}>{t.type}</div>
                <div style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: 'var(--text)', marginTop: 2 }}>{t.ex}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: Scope isolation */}
        {s === 4 && (
          <motion.div key="isolation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: compact ? 8 : 14 }}>
            {['counter A', 'counter B'].map((label, i) => (
              <ScopeBox key={label} color={BLUE} label={label} compact={compact}>
                <VarLine keyword="let" name="count" value={i === 0 ? '5' : '0'} color={BLUE} compact={compact} />
              </ScopeBox>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: [ORANGE, BLUE, PURPLE, GREEN, BLUE][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [x] **Step 2: Build check + commit**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep VariablesViz
git add src/topics/javascript/VariablesViz.tsx
git commit -m "feat: VariablesViz — scope boxes for var/let/const + types pills + isolation demo"
```

---

### Task 6: TypographyViz

**File:** `src/topics/css/TypographyViz.tsx` (overwrite)

**Concept to teach:** Typography properties affect readability. Show before/after readable vs hard-to-read text, then each property improving it.

**Visual design:**
- Step 0: Two text blocks side by side — left: unreadable (tiny, tight, Comic Sans), right: readable (16px, 1.6 line-height, sans-serif). Clear contrast.
- Step 1: `font-family` — monospace vs sans-serif comparison with type labels
- Step 2: `font-size` scale bar — 12px to 24px with readability annotation
- Step 3: `line-height` ruler — 1.0 (cramped) vs 1.6 (comfortable) with visual line spacing
- Step 4: `font-weight` scale 300→900, `letter-spacing` demo

**Colors:** CYAN `#22d3ee`, GREEN `#4ade80`, PURPLE `#a78bfa`, YELLOW `#f5c542`

**Step labels:**
```
0: 'Typography directly impacts readability and comprehension'
1: 'font-family — personality and legibility of your text'
2: 'font-size — hierarchical contrast guides the eye'
3: 'line-height — breathing room between lines'
4: 'font-weight and letter-spacing — emphasis and rhythm'
```

- [x] **Step 1: Rewrite TypographyViz**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const CYAN   = '#22d3ee'
const GREEN  = '#4ade80'
const PURPLE = '#a78bfa'
const YELLOW = '#f5c542'
const RED    = '#f87171'

const stepLabels = [
  'Typography directly impacts readability and comprehension',
  'font-family — personality and legibility of your text',
  'font-size — hierarchical contrast guides the eye',
  'line-height — breathing room between lines',
  'font-weight and letter-spacing — emphasis and rhythm',
]

const SAMPLE = 'The quick brown fox jumps over the lazy dog.'

export default function TypographyViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const gap = compact ? 10 : 16

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap }}>
      <AnimatePresence mode="wait">

        {/* Step 0: Readable vs unreadable */}
        {s === 0 && (
          <motion.div key="contrast" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: compact ? 8 : 14, width: '100%', maxWidth: compact ? 300 : 400 }}>
            <div style={{ flex: 1, background: `${RED}0d`, border: `1px solid ${RED}33`, borderRadius: 8, padding: compact ? 8 : 12 }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: RED, fontWeight: 700, marginBottom: 6 }}>✗ Hard to read</div>
              <div style={{ fontSize: compact ? 8 : 9, lineHeight: 1.1, fontFamily: 'cursive', color: 'var(--text-muted)', letterSpacing: '-0.5px' }}>{SAMPLE}</div>
            </div>
            <div style={{ flex: 1, background: `${GREEN}0d`, border: `1px solid ${GREEN}33`, borderRadius: 8, padding: compact ? 8 : 12, boxShadow: `0 0 14px ${GREEN}14` }}>
              <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: GREEN, fontWeight: 700, marginBottom: 6 }}>✓ Readable</div>
              <div style={{ fontSize: compact ? 10 : 13, lineHeight: 1.65, color: 'var(--text)' }}>{SAMPLE}</div>
            </div>
          </motion.div>
        )}

        {/* Step 1: font-family */}
        {s === 1 && (
          <motion.div key="family" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, width: '100%', maxWidth: compact ? 280 : 360 }}>
            {[
              { family: 'system-ui, sans-serif', label: 'sans-serif', color: GREEN },
              { family: 'Georgia, serif',         label: 'serif',      color: PURPLE },
              { family: 'var(--font-mono)',       label: 'monospace',  color: CYAN },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: `${f.color}0a`, border: `1px solid ${f.color}33`,
                  borderRadius: 7, padding: compact ? '6px 10px' : '8px 14px',
                }}
              >
                <span style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: f.color, fontWeight: 700, width: compact ? 56 : 72, flexShrink: 0 }}>{f.label}</span>
                <span style={{ fontFamily: f.family, fontSize: compact ? 11 : 14, color: 'var(--text)' }}>Aa Bb Cc 123</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2: font-size scale */}
        {s === 2 && (
          <motion.div key="size" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, width: '100%', maxWidth: compact ? 280 : 360 }}>
            {[
              { size: compact ? 9  : 12,  label: '12px', color: RED + 'aa',   note: 'too small' },
              { size: compact ? 11 : 14,  label: '14px', color: YELLOW,       note: 'acceptable' },
              { size: compact ? 13 : 16,  label: '16px', color: GREEN,        note: '← browser default' },
              { size: compact ? 15 : 20,  label: '20px', color: CYAN,         note: 'heading' },
              { size: compact ? 18 : 28,  label: '28px', color: PURPLE,       note: 'display' },
            ].map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <span style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: r.color, width: compact ? 28 : 36, flexShrink: 0 }}>{r.label}</span>
                <span style={{ fontSize: r.size, color: 'var(--text)', lineHeight: 1.2 }}>Aa</span>
                <span style={{ fontSize: compact ? 7 : 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{r.note}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 3: line-height */}
        {s === 3 && (
          <motion.div key="lh" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: compact ? 10 : 16, width: '100%', maxWidth: compact ? 300 : 400 }}>
            {[
              { lh: 1.0, label: 'line-height: 1.0', color: RED,   note: 'cramped' },
              { lh: 1.6, label: 'line-height: 1.6', color: GREEN, note: 'comfortable' },
            ].map(({ lh, label, color, note }) => (
              <div key={lh} style={{ flex: 1, background: `${color}0a`, border: `1px solid ${color}33`, borderRadius: 8, padding: compact ? 8 : 12 }}>
                <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color, fontWeight: 700, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: compact ? 7 : 8, color: color + '88', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>{note}</div>
                <div style={{ fontSize: compact ? 9 : 12, lineHeight: lh, color: 'var(--text)' }}>
                  Typography sets the tone. Good line-height makes text easy to follow.
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Step 4: weight + spacing */}
        {s === 4 && (
          <motion.div key="weight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, width: '100%', maxWidth: compact ? 280 : 360 }}>
            {[300, 400, 600, 700, 900].map((w, i) => (
              <motion.div
                key={w}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <span style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', width: compact ? 28 : 36, flexShrink: 0 }}>{w}</span>
                <span style={{ fontSize: compact ? 12 : 15, fontWeight: w, color: 'var(--text)' }}>Font Weight</span>
              </motion.div>
            ))}
            <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['-0.05em', '0em', '0.1em', '0.25em'].map((ls, i) => (
                <div key={ls} style={{ fontSize: compact ? 9 : 11, letterSpacing: ls, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  letter-spacing: {ls}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: [GREEN, GREEN, CYAN, GREEN, PURPLE][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [x] **Step 2: Build check + commit**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep TypographyViz
git add src/topics/css/TypographyViz.tsx
git commit -m "feat: TypographyViz — readable vs unreadable contrast + family/size/line-height/weight"
```

---

### Task 7: OverflowViz

**File:** `src/topics/css/OverflowViz.tsx` (overwrite)

**Concept to teach:** Overflow controls what happens when content exceeds its container. Show actual clipping, scrolling, and ellipsis behavior visually.

**Visual design:**
- Container: fixed-size box (e.g. 180×100). Content: long text that overflows.
- Step 0: `overflow: visible` — text bleeds outside box borders visibly
- Step 1: `overflow: hidden` — text cut off at border edge, hard clip
- Step 2: `overflow: scroll` — scrollbar appears inside box (simulated with gradient + arrows)
- Step 3: `overflow: auto` — scrollbar appears only when needed (same visual but badge changes)
- Step 4: `text-overflow: ellipsis` — single line ends with `...` at box edge

**Colors:** ORANGE `#fb923c`, BLUE `#60a5fa`, GREEN `#4ade80`, PURPLE `#a78bfa`

**Step labels:**
```
0: 'overflow: visible — content bleeds outside the box'
1: 'overflow: hidden — content clipped at the boundary'
2: 'overflow: scroll — scrollbar always shown'
3: 'overflow: auto — scrollbar only when content overflows'
4: 'text-overflow: ellipsis — truncate with ...'
```

- [x] **Step 1: Rewrite OverflowViz**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const ORANGE = '#fb923c'
const BLUE   = '#60a5fa'
const GREEN  = '#4ade80'
const PURPLE = '#a78bfa'
const RED    = '#f87171'

const stepLabels = [
  'overflow: visible — content bleeds outside the box',
  'overflow: hidden — content clipped at the boundary',
  'overflow: scroll — scrollbar always shown',
  'overflow: auto — scrollbar only when content overflows',
  'text-overflow: ellipsis — truncate with ...',
]

const LONG_TEXT = 'This is a long piece of text that definitely exceeds the container width and height when rendered at this font size.'

const colors   = [RED, ORANGE, BLUE, GREEN, PURPLE]
const cssRules = [
  'overflow: visible',
  'overflow: hidden',
  'overflow: scroll',
  'overflow: auto',
  'overflow: hidden\nwhite-space: nowrap\ntext-overflow: ellipsis',
]

export default function OverflowViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const color = colors[s]
  const w = compact ? 160 : 200
  const h = compact ? 70  : 90

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>

      {/* CSS rule badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 10,
            color, background: `${color}18`, border: `1px solid ${color}44`,
            borderRadius: 6, padding: compact ? '4px 10px' : '5px 14px',
            whiteSpace: 'pre' as const, textAlign: 'center' as const,
          }}
        >
          {cssRules[s]}
        </motion.div>
      </AnimatePresence>

      {/* Container demo */}
      <div style={{ position: 'relative' }}>
        <motion.div
          animate={{ borderColor: color + 'cc', boxShadow: `0 0 18px ${color}22` }}
          transition={{ duration: 0.4 }}
          style={{
            width: w, height: h,
            border: `2px solid`,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.03)',
            position: 'relative',
            overflow: s === 0 ? 'visible' : s === 1 ? 'hidden' : s === 2 ? 'scroll' : s === 3 ? 'auto' : 'hidden',
            whiteSpace: s === 4 ? 'nowrap' as const : 'normal' as const,
          }}
        >
          {/* Overflow indicator for step 0 */}
          {s === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute', top: -18, right: -2,
                fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)',
                color: RED, background: `${RED}18`, border: `1px solid ${RED}44`,
                borderRadius: 3, padding: '1px 5px', whiteSpace: 'nowrap',
              }}
            >⚠ bleed</motion.div>
          )}

          <div style={{
            padding: compact ? '6px 8px' : '8px 10px',
            fontSize: compact ? 9 : 11,
            color: 'var(--text)',
            lineHeight: 1.5,
            overflow: s === 4 ? 'hidden' : undefined,
            textOverflow: s === 4 ? 'ellipsis' : undefined,
          }}>
            {LONG_TEXT}
          </div>

          {/* Simulated scrollbar for step 2 */}
          {s === 2 && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              style={{
                position: 'absolute', right: 2, top: 4, bottom: 4,
                width: compact ? 4 : 5, borderRadius: 3,
                background: BLUE + '44',
                transformOrigin: 'top',
              }}
            >
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                  width: '100%', height: compact ? 14 : 18,
                  borderRadius: 3, background: BLUE,
                }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Clip indicator for step 1 */}
        {s === 1 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{
              position: 'absolute', bottom: -6, left: 0, right: 0,
              height: 2, background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)`,
              transformOrigin: 'left',
            }}
          />
        )}
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
            color,
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 320,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [x] **Step 2: Build check + commit**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep OverflowViz
git add src/topics/css/OverflowViz.tsx
git commit -m "feat: OverflowViz — visible bleed, hidden clip, scroll indicator, ellipsis demo"
```

---

## Chunk 4: CSS Visual Properties (Tasks 8–10)

### Task 8: ImagesViz

**File:** `src/topics/css/ImagesViz.tsx` (overwrite)

**Concept to teach:** `object-fit` controls how image content fills its container. Show crop vs letterbox vs stretch visually.

**Visual design:**
- Use a colored gradient rectangle as "image" (portrait: tall and narrow) inside a landscape container
- Step 0: No CSS — image stretched to fill, distorted (landscape container, portrait gradient stretches)
- Step 1: `object-fit: contain` — image shrinks to fit with letterbox bars on sides
- Step 2: `object-fit: cover` — image zooms to fill, portrait content cropped on top/bottom
- Step 3: `object-fit: fill` (default) vs `cover` comparison side by side
- Step 4: `aspect-ratio: 16/9` — container locks its ratio regardless of width

**Colors:** PINK `#ec4899`, CYAN `#22d3ee`, GREEN `#4ade80`, YELLOW `#f5c542`

**Step labels:**
```
0: 'No object-fit — image stretches to fill, aspect ratio lost'
1: 'object-fit: contain — whole image visible, letterboxed'
2: 'object-fit: cover — fills container, image may crop'
3: 'fill vs cover — distorted vs cropped'
4: 'aspect-ratio — container maintains its shape at any width'
```

- [x] **Step 1: Rewrite ImagesViz**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PINK   = '#ec4899'
const CYAN   = '#22d3ee'
const GREEN  = '#4ade80'
const YELLOW = '#f5c542'
const RED    = '#f87171'

const stepLabels = [
  'No object-fit — image stretches to fill, aspect ratio lost',
  'object-fit: contain — whole image visible, letterboxed',
  'object-fit: cover — fills container, image may crop',
  'fill vs cover — distorted vs cropped',
  'aspect-ratio — container maintains its shape at any width',
]

// Simulated "portrait image" as a gradient rectangle
function ImageContent({ scaleX = 1, scaleY = 1, offsetY = 0, compact = false }: {
  scaleX?: number; scaleY?: number; offsetY?: number; compact?: boolean
}) {
  const w = compact ? 60 : 80
  const h = compact ? 90 : 120
  return (
    <motion.div
      animate={{ scaleX, scaleY, y: offsetY }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 24 }}
      style={{
        width: w, height: h, borderRadius: 4,
        background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transformOrigin: 'center',
      }}
    >
      <span style={{ fontSize: compact ? 14 : 18 }}>🌄</span>
    </motion.div>
  )
}

function Container({ label, color, w, h, overflow = 'hidden', children, compact }: {
  label: string; color: string; w: number; h: number;
  overflow?: string; children: React.ReactNode; compact: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color, fontWeight: 700 }}>{label}</div>
      <motion.div
        animate={{ borderColor: color + 'cc' }}
        style={{
          width: w, height: h, border: `2px solid`,
          borderRadius: 8, overflow,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function ImagesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cw = compact ? 120 : 160  // container width (landscape)
  const ch = compact ? 70  : 90   // container height

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>
      <AnimatePresence mode="wait">

        {/* Step 0: stretched */}
        {s === 0 && (
          <motion.div key="stretch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container label="no object-fit — stretched ⚠" color={RED} w={cw} h={ch} compact={compact}>
              <motion.div
                animate={{ scaleX: cw / (compact ? 60 : 80), scaleY: ch / (compact ? 90 : 120) }}
                transition={{ duration: 0.5 }}
                style={{
                  width: compact ? 60 : 80, height: compact ? 90 : 120,
                  background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
                  borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transformOrigin: 'center',
                }}
              >
                <span style={{ fontSize: compact ? 14 : 18, transform: `scale(${1 / ((cw / (compact ? 60 : 80)))})` }}>🌄</span>
              </motion.div>
            </Container>
          </motion.div>
        )}

        {/* Step 1: contain */}
        {s === 1 && (
          <motion.div key="contain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container label="object-fit: contain" color={YELLOW} w={cw} h={ch} compact={compact}>
              {/* Letterbox bars */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: compact ? 18 : 24, background: 'rgba(0,0,0,0.5)' }} />
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: compact ? 18 : 24, background: 'rgba(0,0,0,0.5)' }} />
              <div style={{
                width: compact ? 50 : 68, height: compact ? 70 : 90,
                background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
                borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: compact ? 14 : 18 }}>🌄</span>
              </div>
            </Container>
          </motion.div>
        )}

        {/* Step 2: cover */}
        {s === 2 && (
          <motion.div key="cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container label="object-fit: cover" color={GREEN} w={cw} h={ch} compact={compact}>
              <div style={{
                width: cw + 4, height: cw * 1.3,  // taller than container — crops top/bottom
                background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: compact ? 18 : 24 }}>🌄</span>
              </div>
              {/* Crop indicator lines */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: 2, background: `${GREEN}cc`,
                }}
              />
              <motion.div
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: 2, background: `${GREEN}cc`,
                }}
              />
            </Container>
          </motion.div>
        )}

        {/* Step 3: fill vs cover */}
        {s === 3 && (
          <motion.div key="compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: compact ? 10 : 16 }}>
            <Container label="fill — distorted" color={RED} w={compact ? 100 : 130} h={ch} compact={compact}>
              <div style={{
                width: compact ? 100 : 130, height: ch,
                background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: compact ? 16 : 22 }}>🌄</span>
              </div>
            </Container>
            <Container label="cover — crisp" color={GREEN} w={compact ? 100 : 130} h={ch} compact={compact}>
              <div style={{
                width: compact ? 100 : 130, height: compact ? 100 : 140,
                background: `linear-gradient(160deg, ${PINK}, ${CYAN})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: compact ? 16 : 22 }}>🌄</span>
              </div>
            </Container>
          </motion.div>
        )}

        {/* Step 4: aspect-ratio */}
        {s === 4 && (
          <motion.div key="ratio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'center' }}>
            {[compact ? 200 : 260, compact ? 140 : 180, compact ? 100 : 130].map((w, i) => (
              <motion.div
                key={w}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  width: w, aspectRatio: '16/9',
                  background: `linear-gradient(135deg, ${CYAN}44, ${PINK}44)`,
                  border: `1.5px solid ${CYAN}55`, borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: compact ? 7 : 8, fontFamily: 'var(--font-mono)', color: CYAN }}>16:9</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color: [RED, YELLOW, GREEN, GREEN, CYAN][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 340,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [x] **Step 2: Build check + commit**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep ImagesViz
git add src/topics/css/ImagesViz.tsx
git commit -m "feat: ImagesViz — object-fit stretch/contain/cover/fill visual comparison + aspect-ratio"
```

---

### Task 9: ShadowsViz

**File:** `src/topics/css/ShadowsViz.tsx` (overwrite)

**Concept to teach:** Box shadows build in layers — offset, blur, spread, color. Multiple shadows stack. Inset reverses direction.

**Visual design:**
- A single card/box that grows in shadow depth each step
- Step 0: No shadow — flat card
- Step 1: Simple small shadow `2px 4px 8px rgba(0,0,0,0.3)` — appears with spring animation
- Step 2: Large blurred shadow `0 16px 48px rgba(0,0,0,0.5)` — card lifts visually
- Step 3: Colored glow `0 0 32px #7c3aed80` — dramatic purple glow
- Step 4: Layered multi-shadow + inset — show code of stacked shadows

Show the shadow property code beneath the card updating each step.

**Colors:** BLUE `#60a5fa`, PURPLE `#a78bfa`, ORANGE `#fb923c`, GREEN `#4ade80`

**Step labels:**
```
0: 'No shadow — flat element on the surface'
1: 'Simple shadow — offset x/y + blur radius'
2: 'Large blur — soft elevation effect'
3: 'Colored glow — any color, opacity via rgba'
4: 'Multiple shadows — stack them with commas'
```

- [x] **Step 1: Rewrite ShadowsViz**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE   = '#60a5fa'
const PURPLE = '#a78bfa'
const ORANGE = '#fb923c'
const GREEN  = '#4ade80'

const stepLabels = [
  'No shadow — flat element on the surface',
  'Simple shadow — offset x/y + blur radius',
  'Large blur — soft elevation effect',
  'Colored glow — any color, opacity via rgba',
  'Multiple shadows — stack them with commas',
]

const shadows = [
  'none',
  '2px 4px 8px rgba(0,0,0,0.35)',
  '0px 16px 48px rgba(0,0,0,0.55)',
  '0 0 32px rgba(124,58,237,0.65)',
  '0 2px 4px rgba(0,0,0,0.3), 0 8px 24px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
]

const codeLines = [
  'box-shadow: none;',
  'box-shadow:\n  2px 4px 8px rgba(0,0,0,.35);',
  'box-shadow:\n  0 16px 48px rgba(0,0,0,.55);',
  'box-shadow:\n  0 0 32px rgba(124,58,237,.65);',
  'box-shadow:\n  0 2px 4px rgba(0,0,0,.3),\n  0 8px 24px rgba(124,58,237,.4),\n  inset 0 1px 0 rgba(255,255,255,.1);',
]

const colors = ['var(--text-muted)', BLUE, BLUE, PURPLE, GREEN]

export default function ShadowsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const color = colors[s]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 16 : 24 }}>

      {/* The card */}
      <motion.div
        animate={{ boxShadow: shadows[s] }}
        transition={{ duration: 0.55, type: 'spring', stiffness: 200, damping: 22 }}
        style={{
          width: compact ? 120 : 160,
          height: compact ? 70  : 90,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: compact ? 10 : 13,
          color: 'var(--text)',
          fontWeight: 600,
        }}
      >
        .card
      </motion.div>

      {/* Code display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `${color}0d`,
            border: `1px solid ${color}33`,
            borderRadius: 8,
            padding: compact ? '6px 10px' : '8px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 8 : 10,
            color,
            whiteSpace: 'pre' as const,
            textAlign: 'left' as const,
          }}
        >
          {codeLines[s]}
        </motion.div>
      </AnimatePresence>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            color,
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 320,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [x] **Step 2: Build check + commit**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep ShadowsViz
git add src/topics/css/ShadowsViz.tsx
git commit -m "feat: ShadowsViz — animated shadow depth progression + layered multi-shadow demo"
```

---

### Task 10: FormsViz

**File:** `src/topics/html/FormsViz.tsx` (overwrite)

**Concept to teach:** Form inputs have states — empty, focused, invalid, valid — and submission has a lifecycle (loading → success).

**Visual design:**
- A single email input + submit button that goes through states
- Step 0: Empty state — neutral border, placeholder text
- Step 1: Focused — blue glow ring, label floats up (floating label pattern)
- Step 2: Invalid — typed bad email, red border, error message slides in below
- Step 3: Valid — green border, checkmark icon, error gone
- Step 4: Submit — button shows loading spinner → success checkmark + "Sent!" message

**Colors:** BLUE `#60a5fa`, RED `#f87171`, GREEN `#4ade80`, PURPLE `#a78bfa`

**Step labels:**
```
0: 'Empty state — placeholder guides the user'
1: 'Focus state — input highlighted, label floats'
2: 'Invalid — validation error shown inline'
3: 'Valid — constraint satisfied, ready to submit'
4: 'Submit lifecycle — loading → success'
```

- [x] **Step 1: Rewrite FormsViz**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE   = '#60a5fa'
const RED    = '#f87171'
const GREEN  = '#4ade80'
const PURPLE = '#a78bfa'

const stepLabels = [
  'Empty state — placeholder guides the user',
  'Focus state — input highlighted, label floats',
  'Invalid — validation error shown inline',
  'Valid — constraint satisfied, ready to submit',
  'Submit lifecycle — loading → success',
]

const inputValues: Record<number, string> = {
  0: '',
  1: 'alice@',
  2: 'alice@',
  3: 'alice@example.com',
  4: 'alice@example.com',
}

const borderColors: Record<number, string> = {
  0: 'rgba(255,255,255,0.15)',
  1: BLUE,
  2: RED,
  3: GREEN,
  4: GREEN,
}

export default function FormsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const fs = compact ? 10 : 13
  const gap = compact ? 8 : 12

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>

      <div style={{
        width: '100%', maxWidth: compact ? 240 : 300,
        display: 'flex', flexDirection: 'column', gap,
      }}>
        {/* Email input */}
        <div style={{ position: 'relative' }}>
          {/* Floating label */}
          <AnimatePresence>
            {s >= 1 && (
              <motion.label
                key="label"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -compact ? 14 : 18, opacity: 1, fontSize: compact ? 8 : 10 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                style={{
                  position: 'absolute', left: compact ? 8 : 10, top: compact ? 9 : 12,
                  fontFamily: 'var(--font-mono)',
                  color: borderColors[s],
                  pointerEvents: 'none',
                  transformOrigin: 'left',
                  zIndex: 1,
                  background: 'var(--surface, #0f1322)',
                  padding: '0 3px',
                }}
              >
                email
              </motion.label>
            )}
          </AnimatePresence>

          {/* Input box */}
          <motion.div
            animate={{
              borderColor: borderColors[s],
              boxShadow: s === 1 ? `0 0 0 3px ${BLUE}33` : s === 2 ? `0 0 0 3px ${RED}22` : s >= 3 ? `0 0 0 2px ${GREEN}22` : 'none',
            }}
            transition={{ duration: 0.35 }}
            style={{
              border: '1.5px solid',
              borderRadius: 8,
              padding: compact ? '8px 10px' : '11px 14px',
              background: 'rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              minHeight: compact ? 34 : 44,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: fs,
              color: s === 0 ? 'var(--text-muted)' : 'var(--text)',
            }}>
              {s === 0 ? 'you@example.com' : inputValues[s]}
              {s >= 1 && s <= 2 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                  style={{ borderLeft: `2px solid ${BLUE}`, marginLeft: 1 }}
                >
                  &nbsp;
                </motion.span>
              )}
            </span>

            {/* Validation icon */}
            <AnimatePresence>
              {s === 2 && (
                <motion.span
                  key="err-icon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ fontSize: compact ? 12 : 16 }}
                >❌</motion.span>
              )}
              {s >= 3 && (
                <motion.span
                  key="ok-icon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{ fontSize: compact ? 12 : 16 }}
                >✅</motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Error message */}
          <AnimatePresence>
            {s === 2 && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  overflow: 'hidden',
                  fontSize: compact ? 8 : 10,
                  fontFamily: 'var(--font-mono)',
                  color: RED,
                  paddingTop: 4,
                  paddingLeft: 4,
                }}
              >
                ⚠ Please enter a valid email address
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit button */}
        <motion.div
          animate={{
            background: s === 4 ? GREEN : s >= 3 ? PURPLE : 'rgba(255,255,255,0.07)',
            borderColor: s >= 3 ? (s === 4 ? GREEN : PURPLE) : 'rgba(255,255,255,0.12)',
          }}
          transition={{ duration: 0.4 }}
          style={{
            border: '1.5px solid',
            borderRadius: 8,
            padding: compact ? '8px 0' : '11px 0',
            textAlign: 'center' as const,
            cursor: 'default',
          }}
        >
          <AnimatePresence mode="wait">
            {s < 3 && (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: fs, color: 'var(--text-muted)' }}>
                Submit
              </motion.span>
            )}
            {s === 3 && (
              <motion.span key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: fs, color: '#fff', fontWeight: 700 }}>
                Submit →
              </motion.span>
            )}
            {s === 4 && (
              <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: fs, color: '#fff', fontWeight: 700 }}>
                ✓ Sent!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
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
            color: [BLUE, BLUE, RED, GREEN, GREEN][s],
            fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11,
            textAlign: 'center', margin: 0, maxWidth: 320,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [x] **Step 2: Build check + commit**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep FormsViz
git add src/topics/html/FormsViz.tsx
git commit -m "feat: FormsViz — input states empty/focus/invalid/valid/submit with floating label"
```

---

## Final Step: Full build verification + push

- [x] **Run full TypeScript build**
```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: 0 errors

- [x] **Run dev build**
```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -20
```
Expected: build succeeds

- [x] **Push**
```bash
git push origin main
```
