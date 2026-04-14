# Analogy Animation Implementation Plan

> ✅ **COMPLETED** — implemented and deployed to main

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static text-only `AnalogyPanel` with animated hybrid visualizations for the `js-variables` topic, building an extensible registry system for future topics.

**Architecture:** A new `VariablesAnalogyViz` component holds 8 step-driven Framer Motion animations. `AnalogyPanel` gains optional `AnalogyComp` + `step` props and renders animation + caption when provided, falling back to existing text-only behavior. `SyncExplanation` self-loads the analogy component from a new analogy registry (deliberately separate from the main viz registry).

**Tech Stack:** React 18, TypeScript, Framer Motion (`motion`, `AnimatePresence`), Vite build. Check types with `pnpm tsgo`, build with `pnpm build`.

**Spec:** `docs/superpowers/specs/2026-03-23-analogy-animation-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/types/index.ts:38-56` | Add `analogyComponent?: string` to `Topic` interface |
| Modify | `src/data/topics.ts` | Add `analogyComponent: 'VariablesAnalogyViz'` to `js-variables` topic |
| Modify | `src/topics/registry.ts` | Add analogy lazy registry + cache + getter/preloader functions |
| Modify | `src/pages/TopicPage/AnalogyPanel.tsx` | Accept `AnalogyComp` + `step`; render animation+caption or text fallback |
| Modify | `src/pages/TopicPage/SyncExplanation.tsx` | Self-load `AnalogyComp` via `useState`+`useEffect`; pass to `AnalogyPanel` |
| Create | `src/topics/javascript/VariablesAnalogyViz.tsx` | 8-step hybrid animated analogy component |

---

## Task 1: Extend Topic type + wire topic data

**Files:**
- Modify: `src/types/index.ts:38-56`
- Modify: `src/data/topics.ts` (js-variables entry, around line 2804)

- [x] **Step 1: Add `analogyComponent` to Topic interface**

In `src/types/index.ts`, find the `Topic` interface (line 38). Add after `bannerComponent`:

```ts
export interface Topic {
  id: string
  title: string
  description: string
  category: CategoryId
  color: string
  estimatedMinutes: number
  animationComponent?: string
  bannerComponent?: string
  analogyComponent?: string   // ← add this line
  playgroundType: PlaygroundType
  // ... rest unchanged
}
```

- [x] **Step 2: Add `analogyComponent` to js-variables topic**

In `src/data/topics.ts`, find the `js-variables` entry (id: `'js-variables'`, around line 2804). Add `analogyComponent` after `bannerComponent`:

```ts
{
  id: 'js-variables',
  nextTopicId: 'js-control-flow',
  title: 'Variables & Data Types',
  // ...
  animationComponent: 'VariablesViz',
  bannerComponent: 'VariablesBanner',
  analogyComponent: 'VariablesAnalogyViz',   // ← add this line
  playgroundType: 'monaco',
  // ...
}
```

- [x] **Step 3: Type-check**

```bash
cd /home/jaywee92/web-dev-guide && pnpm tsgo
```

Expected: no errors. (A "cannot find module" for `VariablesAnalogyViz` is acceptable at this stage.)

- [x] **Step 4: Commit**

```bash
git add src/types/index.ts src/data/topics.ts
git commit -m "feat: add analogyComponent field to Topic type and js-variables data"
```

---

## Task 2: Add analogy registry

**Files:**
- Modify: `src/topics/registry.ts` (append after line 87, before the banner registry section)

- [x] **Step 1: Add the analogy registry block**

In `src/topics/registry.ts`, find the comment `// ─── Banner registry` (around line 88). Insert the following block **before** it:

```ts
// ─── Analogy registry ─────────────────────────────────────────────────────

type AnalogyComp = ComponentType<{ step: number }>

const analogyLazyRegistry: Record<string, () => Promise<{ default: AnalogyComp }>> = {
  VariablesAnalogyViz: () => import('./javascript/VariablesAnalogyViz'),
}

const loadedAnalogyRegistry: Record<string, AnalogyComp> = {}

export function getAnalogyComponent(name: string | undefined): AnalogyComp | null {
  if (!name) return null
  return loadedAnalogyRegistry[name] ?? null
}

export async function preloadAnalogyAnimation(name: string | undefined): Promise<void> {
  if (!name || loadedAnalogyRegistry[name] || !analogyLazyRegistry[name]) return
  const mod = await analogyLazyRegistry[name]()
  loadedAnalogyRegistry[name] = mod.default
}
```

Note: `ComponentType` is already imported at the top of `registry.ts` (line 1).

- [x] **Step 2: Type-check**

```bash
pnpm tsgo
```

Expected: no new errors (module missing for `VariablesAnalogyViz` is OK — file doesn't exist yet).

- [x] **Step 3: Commit**

```bash
git add src/topics/registry.ts
git commit -m "feat: add analogy component registry with lazy load + cache"
```

---

## Task 3: Extend AnalogyPanel

**Files:**
- Modify: `src/pages/TopicPage/AnalogyPanel.tsx`

- [x] **Step 1: Rewrite AnalogyPanel with new props**

Replace the entire file with:

```tsx
import type { ComponentType } from 'react'
import type { ExplanationStep } from '@/types'

interface Props {
  analogy: ExplanationStep['analogy'] | undefined
  color: string
  AnalogyComp?: ComponentType<{ step: number }> | null
  step?: number
}

export default function AnalogyPanel({ analogy, color: _color, AnalogyComp, step = 0 }: Props) {
  if (!analogy && !AnalogyComp) return null

  const caption = analogy?.text[analogy.text.length - 1]

  return (
    <div style={{
      marginTop: 12,
      flexShrink: 0,
      background: 'var(--surface)',
      border: '1px solid rgba(251,191,36,0.22)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Left amber accent */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 3, background: '#fbbf24',
      }} />

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px 8px 17px',
        background: 'linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(251,191,36,0.03) 100%)',
        borderBottom: '1px solid rgba(251,191,36,0.12)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 800,
          letterSpacing: '0.1em', padding: '2px 7px', borderRadius: 20,
          background: 'rgba(251,191,36,0.18)', border: '1px solid rgba(251,191,36,0.4)',
          color: '#fbbf24', textTransform: 'uppercase', flexShrink: 0,
        }}>
          Analogie
        </span>
        {analogy && (
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
            {analogy.title}
          </span>
        )}
      </div>

      {/* Body */}
      {AnalogyComp ? (
        <div style={{ padding: '12px 14px 12px 17px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <AnalogyComp step={step} />
          {caption && (
            <p style={{
              fontSize: 11, color: 'rgba(139,144,168,0.7)',
              lineHeight: 1.6, margin: 0, fontStyle: 'italic',
            }}>
              {caption}
            </p>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 14, padding: '14px 14px 14px 17px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>
            {analogy!.icon}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {analogy!.text.map((paragraph, i) => (
              <p key={i} style={{
                fontSize: 12.5, color: i === analogy!.text.length - 1
                  ? 'rgba(139,144,168,0.55)'
                  : 'var(--text-muted)',
                lineHeight: 1.65, margin: 0,
              }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

- [x] **Step 2: Type-check**

```bash
pnpm tsgo
```

Expected: no errors.

- [x] **Step 3: Commit**

```bash
git add src/pages/TopicPage/AnalogyPanel.tsx
git commit -m "feat: extend AnalogyPanel to render animated component with caption fallback"
```

---

## Task 4: Wire AnalogyComp loading in SyncExplanation

**Files:**
- Modify: `src/pages/TopicPage/SyncExplanation.tsx`

- [x] **Step 1: Add imports**

At the top of `SyncExplanation.tsx`, the existing import is:
```ts
import { useRef, useEffect, type ComponentType } from 'react'
```

Change to:
```ts
import { useState, useRef, useEffect, type ComponentType } from 'react'
```

Also add imports for the new registry functions. Find the existing registry import line:
```ts
import { preloadAnimation, getAnimationComponent, preloadBanner, getBannerComponent } from '@/topics/registry'
```

Replace with:
```ts
import {
  preloadAnimation, getAnimationComponent,
  preloadBanner, getBannerComponent,
  getAnalogyComponent, preloadAnalogyAnimation,
} from '@/topics/registry'
```

- [x] **Step 2: Add AnalogyComp state + loading effect**

In `SyncExplanation`, after the existing `ctrl` line, add:

```ts
const [AnalogyComp, setAnalogyComp] = useState<ComponentType<{ step: number }> | null>(
  () => topic ? getAnalogyComponent(topic.analogyComponent) : null
)

useEffect(() => {
  if (!topic?.analogyComponent) return
  preloadAnalogyAnimation(topic.analogyComponent).then(() => {
    setAnalogyComp(() => getAnalogyComponent(topic.analogyComponent))
  })
}, [topic?.analogyComponent])
```

- [x] **Step 3: Pass AnalogyComp and step to AnalogyPanel**

Find the existing `<AnalogyPanel>` call (around line 102):
```tsx
<AnalogyPanel analogy={steps[ctrl.step]?.analogy} color={topic.color} />
```

Replace with:
```tsx
<AnalogyPanel
  analogy={steps[ctrl.step]?.analogy}
  color={topic.color}
  AnalogyComp={AnalogyComp}
  step={ctrl.step}
/>
```

- [x] **Step 4: Type-check**

```bash
pnpm tsgo
```

Expected: no errors. (Module `VariablesAnalogyViz` still missing — OK.)

- [x] **Step 5: Commit**

```bash
git add src/pages/TopicPage/SyncExplanation.tsx
git commit -m "feat: load and pass AnalogyComp in SyncExplanation"
```

---

## Task 5: Create VariablesAnalogyViz

**Files:**
- Create: `src/topics/javascript/VariablesAnalogyViz.tsx`

This component renders 8 distinct animated panels, one per `js-variables` explanation step. All use Framer Motion `AnimatePresence mode="wait"` for transitions. Style conventions match the existing viz components: `var(--font-mono)`, dark translucent backgrounds, colored borders.

Color palette (matches js-variables: amber + supporting):
- `AMBER = '#fbbf24'` — var, default
- `BLUE = '#63b3ed'` — let
- `PURPLE = '#a78bfa'` — const
- `GREEN = '#4ade80'` — success/ok
- `RED = '#f87171'` — error/forbidden
- `MUTED = '#64748b'`

- [x] **Step 1: Create the file**

Create `src/topics/javascript/VariablesAnalogyViz.tsx` with the full component:

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number }

const AMBER  = '#fbbf24'
const BLUE   = '#63b3ed'
const PURPLE = '#a78bfa'
const GREEN  = '#4ade80'
const RED    = '#f87171'
const ORANGE = '#fb923c'
const MUTED  = '#64748b'

// Reusable scope box
function ScopeBox({ label, color, children, dashed = false }: {
  label: string; color: string; children: React.ReactNode; dashed?: boolean
}) {
  return (
    <div style={{
      border: `${dashed ? '1.5px dashed' : '1px solid'} ${color}44`,
      borderRadius: 6, padding: '6px 8px',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: MUTED, marginBottom: 4 }}>
        {label}
      </div>
      {children}
    </div>
  )
}

// Reusable code chip
function Chip({ code, color }: { code: string; color: string }) {
  return (
    <div style={{
      background: `${color}1a`, border: `1px solid ${color}55`,
      borderRadius: 4, padding: '2px 7px',
      fontFamily: 'var(--font-mono)', fontSize: 9, color,
      display: 'inline-block',
    }}>
      {code}
    </div>
  )
}

const steps: React.ReactNode[] = [
  // Step 0 — var: leaky bucket
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    <ScopeBox label="function scope" color={AMBER}>
      <Chip code="var x ← hoisted here" color={AMBER} />
      <div style={{ marginTop: 5 }}>
        <ScopeBox label="if (true) {" color={MUTED} dashed>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Chip code="var x = 2" color={AMBER} />
            <motion.span
              animate={{ y: [-2, -7, -2] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              style={{ color: AMBER, fontSize: 14 }}
            >↑</motion.span>
          </div>
        </ScopeBox>
      </div>
    </ScopeBox>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: RED }}>
      // same variable — x is 2 outside the block too
    </div>
  </div>,

  // Step 1 — let: sealed room
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    <ScopeBox label="function scope" color={BLUE}>
      <Chip code='let outer = "apple"' color={BLUE} />
      <div style={{ marginTop: 5, position: 'relative' }}>
        <ScopeBox label="if (true) {" color={BLUE}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip code='let inner = "banana"' color={BLUE} />
            <span style={{ fontSize: 13 }}>🔒</span>
          </div>
        </ScopeBox>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: RED, marginTop: 4 }}
      >
        inner → ReferenceError ✗
      </motion.div>
    </ScopeBox>
  </div>,

  // Step 2 — const: name tag
  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
    <div style={{
      border: `2px solid ${PURPLE}55`, borderRadius: 6,
      padding: '10px 10px 8px', background: `${PURPLE}08`,
      flex: 1, position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: -9, left: 8,
        background: PURPLE, borderRadius: 3,
        padding: '1px 6px', fontSize: 8, color: '#0f172a', fontWeight: 800,
        fontFamily: 'var(--font-mono)',
      }}>
        user 📌
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: PURPLE, marginTop: 2 }}>
        name: "Alice"
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: PURPLE, marginTop: 2 }}>
        age: 25
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 6, flexShrink: 0 }}>
      <motion.div
        initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: RED }}
      >
        user = &#123;&#125; ✗
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: GREEN }}
      >
        user.name = "Bob" ✓
      </motion.div>
    </div>
  </div>,

  // Step 3 — Primitives: 6 chips
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    {[
      { type: 'string',    example: '"Alice"',   color: GREEN  },
      { type: 'number',    example: '42',         color: AMBER  },
      { type: 'boolean',   example: 'true',       color: BLUE   },
      { type: 'null',      example: 'null',       color: RED    },
      { type: 'undefined', example: 'undefined',  color: MUTED  },
      { type: 'symbol',    example: 'Symbol()',   color: PURPLE },
    ].map(({ type, example, color }, i) => (
      <motion.div
        key={type}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.07 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 8, color,
          background: `${color}14`, border: `1px solid ${color}33`,
          borderRadius: 3, padding: '1px 6px', minWidth: 62, textAlign: 'center',
        }}>
          {type}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#e2e8f0' }}>
          {example}
        </div>
      </motion.div>
    ))}
  </div>,

  // Step 4 — typeof: shipping label
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {[
      { val: '"hello"',   result: '"string"',  color: GREEN  },
      { val: '42',         result: '"number"',  color: AMBER  },
      { val: 'true',       result: '"boolean"', color: BLUE   },
      { val: 'null',       result: '"object" ⚠️', color: RED, note: 'quirk!' },
      { val: 'undefined',  result: '"undefined"', color: MUTED },
    ].map(({ val, result, color, note }, i) => (
      <motion.div
        key={val}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.08 }}
        style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 9 }}
      >
        <span style={{ color: '#94a3b8', minWidth: 72 }}>typeof {val}</span>
        <span style={{ color: MUTED }}>→</span>
        <span style={{ color, fontWeight: note ? 700 : 400 }}>{result}</span>
      </motion.div>
    ))}
  </div>,

  // Step 5 — Arithmetic: calculator
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {[
      { expr: '10 + 3',  result: '13',   color: GREEN  },
      { expr: '10 - 3',  result: '7',    color: BLUE   },
      { expr: '10 * 3',  result: '30',   color: AMBER  },
      { expr: '10 / 3',  result: '3.33…', color: PURPLE },
      { expr: '10 % 3',  result: '1',    color: ORANGE },
      { expr: '10 ** 3', result: '1000', color: RED    },
    ].map(({ expr, result, color }, i) => (
      <motion.div
        key={expr}
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.07 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 9 }}
      >
        <span style={{ color: '#94a3b8', minWidth: 56 }}>{expr}</span>
        <span style={{ color: MUTED }}>→</span>
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07 + 0.2 }}
          style={{ color, fontWeight: 700 }}
        >
          {result}
        </motion.span>
      </motion.div>
    ))}
  </div>,

  // Step 6 — Comparison: strict vs lenient
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{
        flex: 1, border: `1px solid ${GREEN}44`, borderRadius: 5,
        padding: '6px 8px', background: `${GREEN}08`,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: GREEN, marginBottom: 4, fontWeight: 700 }}>
          === strict
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#94a3b8' }}>5 === "5"</div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: RED, marginTop: 2 }}
        >
          false ✓ (type differs)
        </motion.div>
      </div>
      <div style={{
        flex: 1, border: `1px solid ${RED}44`, borderRadius: 5,
        padding: '6px 8px', background: `${RED}08`,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: RED, marginBottom: 4, fontWeight: 700 }}>
          == loose ⚠️
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#94a3b8' }}>5 == "5"</div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: AMBER, marginTop: 2 }}
        >
          true ⚠️ (coerced)
        </motion.div>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {[
        { op: '&&', label: 'both true', color: GREEN },
        { op: '||', label: 'one true',  color: BLUE  },
        { op: '!',  label: 'flip',      color: AMBER },
      ].map(({ op, label, color }) => (
        <div key={op} style={{
          fontFamily: 'var(--font-mono)', fontSize: 9, color,
          background: `${color}14`, border: `1px solid ${color}33`,
          borderRadius: 4, padding: '2px 8px', textAlign: 'center',
        }}>
          {op} <span style={{ color: MUTED, fontSize: 8 }}>{label}</span>
        </div>
      ))}
    </div>
  </div>,

  // Step 7 — try/catch: flow redirect
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    {[
      { label: 'try { ... }',           color: BLUE,  note: 'risky code runs here'         },
      { label: '  ↓ error thrown',      color: RED,   note: 'execution diverts',  arrow: true },
      { label: 'catch (e) { ... }',     color: AMBER, note: 'handle it gracefully' },
      { label: 'finally { ... }',       color: GREEN, note: 'always runs (cleanup)' },
    ].map(({ label, color, note, arrow }, i) => (
      <motion.div
        key={label}
        initial={{ opacity: 0, x: arrow ? 8 : -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color, minWidth: arrow ? 'auto' : 110,
          fontStyle: arrow ? 'italic' : 'normal',
        }}>
          {label}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: MUTED }}>
          {note}
        </div>
      </motion.div>
    ))}
  </div>,
]

export default function VariablesAnalogyViz({ step }: Props) {
  const s = Math.min(step, steps.length - 1)
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={s}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25 }}
      >
        {steps[s]}
      </motion.div>
    </AnimatePresence>
  )
}
```

- [x] **Step 2: Type-check**

```bash
pnpm tsgo
```

Expected: no errors.

- [x] **Step 3: Build check**

```bash
pnpm build
```

Expected: clean build, no TypeScript or Vite errors.

- [x] **Step 4: Visual verification**

Run the dev server:
```bash
pnpm dev
```

Open `http://localhost:5173/#/topic/js-variables`. Scroll through the 8 explanation steps and confirm:
- AnalogyPanel shows the animated component (not static text) for each step
- `AnimatePresence` transition plays when switching steps
- Step 0: var scope box with bouncing ↑ arrow
- Step 1: let block with 🔒 and red ReferenceError fade-in
- Step 2: const box with pinned label + green/red annotations
- Step 3: 6 primitive type chips staggering in
- Step 4: typeof rows appearing
- Step 5: arithmetic expressions with animated results
- Step 6: strict/loose comparison cards
- Step 7: try/catch/finally flow
- Other topics (e.g. js-control-flow) still show text-only analogy (fallback working)

- [x] **Step 5: Commit**

```bash
git add src/topics/javascript/VariablesAnalogyViz.tsx
git commit -m "feat: add VariablesAnalogyViz — 8-step animated analogy for js-variables"
```
