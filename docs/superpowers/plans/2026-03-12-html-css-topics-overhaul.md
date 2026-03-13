# HTML & CSS Topics Overhaul Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve all HTML/CSS topics with before/after patterns, content depth, next-topic navigation, and add 4 new topics (css-shadows, css-overflow, html-accessibility, css-variables-theming).

**Architecture:** Three layers of change — (1) shared UI infrastructure (NextTopicCard, type extension), (2) enhanced content/animations for existing topics, (3) four new topics with full data + Viz components. All new Viz components follow the existing `{ step, compact }` interface and are lazy-loaded via the registry.

**Tech Stack:** React 19, TypeScript, Framer Motion, Vite, existing `src/topics/registry.ts` lazy-loader pattern.

---

## File Structure

**Modified:**
- `src/types/index.ts` — add `nextTopicId?: string` to Topic
- `src/topics/registry.ts` — register 6 new Viz components
- `src/data/topics.ts` — update 5 existing topics + add 4 new topics
- `src/data/categories.ts` — extend category `topicIds` arrays
- `src/pages/TopicPage/index.tsx` — add NextTopicCard at bottom

**Created:**
- `src/components/ui/NextTopicCard.tsx` — end-of-topic CTA to next topic
- `src/topics/css/ShadowsViz.tsx`
- `src/topics/css/OverflowViz.tsx`
- `src/topics/css/ThemingViz.tsx`
- `src/topics/html/AccessibilityViz.tsx`
- `src/topics/css/FlexboxUseCasesViz.tsx`
- `src/topics/css/GridAreasViz.tsx`

---

## Chunk 1: Infrastructure — NextTopicCard + Type Extension

### Task 1: Add `nextTopicId` to Topic type and create NextTopicCard

**Files:**
- Modify: `src/types/index.ts`
- Create: `src/components/ui/NextTopicCard.tsx`
- Modify: `src/pages/TopicPage/index.tsx`

- [ ] **Step 1: Extend Topic type**

In `src/types/index.ts`, add `nextTopicId?: string` to the Topic interface:

```typescript
export interface Topic {
  id: string
  title: string
  description: string
  level: Level
  category: CategoryId
  color: string
  estimatedMinutes: number
  animationComponent: string
  playgroundType: PlaygroundType
  defaultCSS?: string
  previewHTML?: string
  nextTopicId?: string          // ← ADD THIS
  sections: Section[]
  cheatSheet?: CheatSheet
}
```

- [ ] **Step 2: Create NextTopicCard component**

Create `src/components/ui/NextTopicCard.tsx`:

```tsx
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Topic } from '@/types'

interface Props { topic: Topic }

export default function NextTopicCard({ topic }: Props) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      style={{
        marginTop: 64,
        padding: '28px 32px',
        borderRadius: 'var(--radius)',
        border: `1px solid ${topic.color}33`,
        background: `linear-gradient(135deg, ${topic.color}08 0%, transparent 60%)`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}
      whileHover={{ borderColor: topic.color + '66', scale: 1.01 }}
      onClick={() => navigate(`/topic/${topic.id}`)}
    >
      <div>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginBottom: 6 }}>
          Up next
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          {topic.title}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock size={12} /> {topic.estimatedMinutes} min
        </div>
      </div>
      <motion.div
        whileHover={{ x: 4 }}
        style={{ color: topic.color, flexShrink: 0 }}
      >
        <ArrowRight size={24} />
      </motion.div>
    </motion.div>
  )
}
```

- [ ] **Step 3: Wire NextTopicCard into TopicPage**

In `src/pages/TopicPage/index.tsx`, add after the playground section:

```tsx
// At top, add imports:
import NextTopicCard from '@/components/ui/NextTopicCard'
import { getTopicById } from '@/data/topics'

// Inside TopicPage component, after `const hasPlayground`:
const nextTopic = topic.nextTopicId ? getTopicById(topic.nextTopicId) : undefined

// After the playground div (before closing </div>):
{nextTopic && <NextTopicCard topic={nextTopic} />}
```

- [ ] **Step 4: Type check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/components/ui/NextTopicCard.tsx src/pages/TopicPage/index.tsx
git commit -m "feat: add NextTopicCard and nextTopicId to topic navigation"
```

---

## Chunk 2: New Animation Components (Viz files)

### Task 2: FlexboxUseCasesViz — real-world flex patterns

**Files:**
- Create: `src/topics/css/FlexboxUseCasesViz.tsx`

- [ ] **Step 1: Create FlexboxUseCasesViz**

Create `src/topics/css/FlexboxUseCasesViz.tsx`:

```tsx
import { motion } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const items = ['Home', 'About', 'Blog', 'Contact']
const cards = ['Card A', 'Card B', 'Card C']

export default function FlexboxUseCasesViz({ step, compact = false }: Props) {
  const size = compact ? 0.75 : 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>

      {/* Use case labels */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { label: 'Navbar', s: 0 },
          { label: 'Card Row', s: 1 },
          { label: 'Center', s: 2 },
        ].map(({ label, s }) => (
          <motion.span
            key={label}
            animate={{ opacity: step === s ? 1 : 0.35, scale: step === s ? 1 : 0.95 }}
            style={{
              fontSize: 11, fontFamily: 'var(--font-mono)', padding: '3px 8px',
              borderRadius: 4, background: step === s ? 'var(--blue)' : 'var(--surface-bright)',
              color: step === s ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            {label}
          </motion.span>
        ))}
      </div>

      {/* Use case 0: Navbar */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            width: compact ? 240 : 360, borderRadius: 8,
            border: '1px solid var(--border)', overflow: 'hidden',
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: compact ? '8px 12px' : '12px 16px',
            background: 'var(--surface-bright)',
            gap: 8,
          }}>
            <span style={{ fontWeight: 700, color: '#5b9cf5', fontSize: compact ? 12 : 14 }}>Logo</span>
            <div style={{ display: 'flex', gap: compact ? 8 : 12 }}>
              {items.map(item => (
                <span key={item} style={{ fontSize: compact ? 10 : 12, color: 'var(--text-muted)' }}>{item}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: 6, textAlign: 'center' }}>
            <code style={{ fontSize: 10, color: 'var(--text-faint)' }}>justify-content: space-between</code>
          </div>
        </motion.div>
      )}

      {/* Use case 1: Card row */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', gap: compact ? 8 : 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {cards.map((card, i) => (
              <motion.div
                key={card}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  width: compact ? 72 : 100, height: compact ? 52 : 72,
                  border: '1px solid #5b9cf555', borderRadius: 8,
                  background: 'var(--surface-bright)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: compact ? 10 : 12, color: '#5b9cf5',
                }}
              >
                {card}
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <code style={{ fontSize: 10, color: 'var(--text-faint)' }}>flex-wrap: wrap · gap: 12px</code>
          </div>
        </motion.div>
      )}

      {/* Use case 2: Centered modal */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            width: compact ? 200 : 300, height: compact ? 100 : 140,
            border: '1px dashed var(--border)', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--surface)',
            position: 'relative',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              padding: compact ? '8px 14px' : '12px 20px',
              background: 'var(--surface-bright)',
              border: '1px solid #4ade8055',
              borderRadius: 8, textAlign: 'center',
            }}
          >
            <div style={{ fontSize: compact ? 11 : 13, fontWeight: 600, color: 'var(--text)' }}>Modal</div>
            <div style={{ fontSize: 9, color: 'var(--text-faint)', marginTop: 3 }}>perfectly centered</div>
          </motion.div>
          <div style={{ position: 'absolute', bottom: 6, fontSize: 9, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
            align-items: center · justify-content: center
          </div>
        </motion.div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Register in registry**

In `src/topics/registry.ts`, add:
```typescript
FlexboxUseCasesViz: () => import('./css/FlexboxUseCasesViz'),
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/topics/css/FlexboxUseCasesViz.tsx src/topics/registry.ts
git commit -m "feat: add FlexboxUseCasesViz — navbar, card row, centered modal"
```

---

### Task 3: GridAreasViz — grid-template-areas visualization

**Files:**
- Create: `src/topics/css/GridAreasViz.tsx`

- [ ] **Step 1: Create GridAreasViz**

Create `src/topics/css/GridAreasViz.tsx`:

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const areas = [
  { name: 'header', color: '#5b9cf5', row: '1 / 2', col: '1 / 3' },
  { name: 'sidebar', color: '#4ade80', row: '2 / 3', col: '1 / 2' },
  { name: 'main', color: '#f472b6', row: '2 / 3', col: '2 / 3' },
  { name: 'footer', color: '#fbbf24', row: '3 / 4', col: '1 / 3' },
]

export default function GridAreasViz({ step, compact = false }: Props) {
  const cellH = compact ? 36 : 52

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Grid visualization */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? '80px 120px' : '120px 180px',
        gridTemplateRows: `${cellH}px ${cellH * 1.5}px ${cellH}px`,
        gap: 4,
      }}>
        {areas.map((area, i) => (
          <motion.div
            key={area.name}
            animate={{
              opacity: step >= i ? 1 : 0.15,
              scale: step === i ? 1.03 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              gridRow: area.row,
              gridColumn: area.col,
              background: step >= i ? area.color + '22' : 'var(--surface)',
              border: `2px solid ${step >= i ? area.color : 'var(--border)'}`,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: compact ? 10 : 12,
              fontFamily: 'var(--font-mono)',
              color: step >= i ? area.color : 'var(--text-faint)',
              fontWeight: 600,
            }}
          >
            {area.name}
          </motion.div>
        ))}
      </div>

      {/* Code label */}
      <AnimatePresence mode="wait">
        <motion.code
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {step === 0 && 'grid-template-areas: "header header"'}
          {step === 1 && '"sidebar main"'}
          {step === 2 && '"footer footer"'}
          {step === 3 && 'grid-area: header / sidebar / main / footer'}
        </motion.code>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Register in registry**

In `src/topics/registry.ts`, add:
```typescript
GridAreasViz: () => import('./css/GridAreasViz'),
```

- [ ] **Step 3: Commit**

```bash
git add src/topics/css/GridAreasViz.tsx src/topics/registry.ts
git commit -m "feat: add GridAreasViz — grid-template-areas step-by-step"
```

---

### Task 4: ShadowsViz, OverflowViz, ThemingViz, AccessibilityViz

**Files:**
- Create: `src/topics/css/ShadowsViz.tsx`
- Create: `src/topics/css/OverflowViz.tsx`
- Create: `src/topics/css/ThemingViz.tsx`
- Create: `src/topics/html/AccessibilityViz.tsx`

- [ ] **Step 1: Create ShadowsViz**

Create `src/topics/css/ShadowsViz.tsx`:

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const shadowSteps = [
  { label: 'no shadow', shadow: 'none', text: 'Plain box — no depth' },
  { label: 'simple shadow', shadow: '0 4px 16px rgba(0,0,0,0.4)', text: 'box-shadow: 0 4px 16px rgba(0,0,0,0.4)' },
  { label: 'layered shadow', shadow: '0 1px 2px rgba(0,0,0,0.4), 0 8px 32px rgba(91,156,245,0.25)', text: 'Two layers — near + far' },
  { label: 'inset shadow', shadow: 'inset 0 2px 8px rgba(0,0,0,0.5)', text: 'inset — shadow inside the box' },
  { label: 'colored glow', shadow: '0 0 24px #5b9cf588, 0 0 48px #5b9cf533', text: 'Glow effect with color' },
]

export default function ShadowsViz({ step, compact = false }: Props) {
  const s = shadowSteps[Math.min(step, shadowSteps.length - 1)]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <motion.div
        animate={{ boxShadow: s.shadow }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          width: compact ? 100 : 140, height: compact ? 70 : 100,
          borderRadius: 12,
          background: 'var(--surface-bright)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: compact ? 11 : 13, fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
        }}
      >
        .box
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: 10, color: '#5b9cf5', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
            {s.label}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{s.text}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Create OverflowViz**

Create `src/topics/css/OverflowViz.tsx`:

```tsx
import { motion } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const longText = 'The quick brown fox jumps over the lazy dog. This text is intentionally very long to demonstrate overflow behavior in CSS containers.'

export default function OverflowViz({ step, compact = false }: Props) {
  const w = compact ? 160 : 240
  const h = compact ? 60 : 80

  const overflowValue = (['visible', 'hidden', 'auto', 'hidden'] as const)[step] ?? 'visible'
  const showEllipsis = step === 3

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{
        width: w, height: h,
        border: '2px solid #5b9cf5',
        borderRadius: 8,
        position: 'relative',
        overflow: showEllipsis ? 'hidden' : overflowValue,
        background: 'var(--surface-bright)',
        padding: 10,
      }}>
        <motion.p
          animate={{ opacity: 1 }}
          style={{
            fontSize: compact ? 10 : 11,
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            margin: 0,
            whiteSpace: showEllipsis ? 'nowrap' : 'normal',
            overflow: showEllipsis ? 'hidden' : undefined,
            textOverflow: showEllipsis ? 'ellipsis' : undefined,
          }}
        >
          {longText}
        </motion.p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <code style={{ fontSize: 11, color: '#5b9cf5', fontFamily: 'var(--font-mono)' }}>
          {step === 0 && 'overflow: visible'}
          {step === 1 && 'overflow: hidden'}
          {step === 2 && 'overflow: auto'}
          {step === 3 && 'white-space: nowrap; text-overflow: ellipsis'}
        </code>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create ThemingViz**

Create `src/topics/css/ThemingViz.tsx`:

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

export default function ThemingViz({ step, compact = false }: Props) {
  const isDark = step >= 2
  const useVar = step >= 1

  const bg = isDark ? '#0f172a' : '#ffffff'
  const text = isDark ? '#e2e8f0' : '#1e293b'
  const primary = isDark ? '#818cf8' : '#3b82f6'
  const surface = isDark ? '#1e293b' : '#f1f5f9'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <motion.div
        animate={{ background: bg }}
        transition={{ duration: 0.5 }}
        style={{
          width: compact ? 180 : 260, borderRadius: 12,
          border: '1px solid var(--border)', overflow: 'hidden',
          padding: compact ? 12 : 16,
        }}
      >
        <motion.div animate={{ color: primary }} transition={{ duration: 0.5 }}
          style={{ fontWeight: 700, fontSize: compact ? 13 : 15, marginBottom: 8 }}>
          My App
        </motion.div>
        <motion.div animate={{ background: surface, color: text }} transition={{ duration: 0.5 }}
          style={{ borderRadius: 8, padding: compact ? '8px 10px' : '10px 14px', fontSize: compact ? 10 : 12 }}>
          Some content here
        </motion.div>
        <motion.div animate={{ background: primary }} transition={{ duration: 0.5 }}
          style={{
            marginTop: 8, borderRadius: 6, padding: compact ? '4px 10px' : '6px 14px',
            color: '#fff', fontSize: compact ? 10 : 12, fontWeight: 600,
            display: 'inline-block',
          }}>
          Button
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ textAlign: 'center', fontSize: compact ? 10 : 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
          {step === 0 && 'Hardcoded colors — changing requires find/replace'}
          {step === 1 && ':root { --color-primary: #3b82f6; }'}
          {step === 2 && '.dark { --color-primary: #818cf8; }'}
          {step === 3 && '@media (prefers-color-scheme: dark) { ... }'}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 4: Create AccessibilityViz**

Create `src/topics/html/AccessibilityViz.tsx`:

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

export default function AccessibilityViz({ step, compact = false }: Props) {
  const showAria = step >= 1
  const showFocus = step >= 2
  const showTabindex = step >= 3

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      {/* Simulated UI */}
      <div style={{
        width: compact ? 200 : 280, borderRadius: 10,
        border: '1px solid var(--border)', padding: compact ? 12 : 16,
        background: 'var(--surface-bright)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {/* Button with/without aria */}
        <motion.button
          animate={{
            borderColor: showAria ? '#4ade80' : 'var(--border)',
            boxShadow: showFocus ? '0 0 0 3px #4ade8044' : 'none',
          }}
          style={{
            padding: compact ? '6px 12px' : '8px 16px',
            borderRadius: 6, border: '2px solid var(--border)',
            background: 'var(--surface)', cursor: 'pointer',
            color: 'var(--text)', fontSize: compact ? 11 : 13,
            fontWeight: 600, outline: 'none',
          }}
        >
          {showAria ? '🔍 Search' : '🔍'}
        </motion.button>

        {/* ARIA label hint */}
        <AnimatePresence>
          {showAria && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <code style={{ fontSize: 9, color: '#4ade80', fontFamily: 'var(--font-mono)' }}>
                aria-label="Search articles"
              </code>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab order indicator */}
        <AnimatePresence>
          {showTabindex && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'flex', gap: 6, alignItems: 'center',
                fontSize: compact ? 9 : 10, color: 'var(--text-faint)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {['tab:1', 'tab:2', 'tab:3'].map((t, i) => (
                <motion.span
                  key={t}
                  animate={{ background: '#5b9cf522', color: '#5b9cf5' }}
                  style={{ padding: '2px 6px', borderRadius: 4, border: '1px solid #5b9cf533' }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ textAlign: 'center', fontSize: compact ? 10 : 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
        {step === 0 && 'No accessibility — icon-only button'}
        {step === 1 && 'aria-label describes the button\'s purpose'}
        {step === 2 && 'Focus ring visible — keyboard users can see it'}
        {step === 3 && 'tabindex="0" — logical focus order'}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Register all 4 new Viz components**

In `src/topics/registry.ts`, add:
```typescript
ShadowsViz:       () => import('./css/ShadowsViz'),
OverflowViz:      () => import('./css/OverflowViz'),
ThemingViz:       () => import('./css/ThemingViz'),
AccessibilityViz: () => import('./html/AccessibilityViz'),
```

- [ ] **Step 6: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 7: Commit**

```bash
git add src/topics/css/ShadowsViz.tsx src/topics/css/OverflowViz.tsx \
        src/topics/css/ThemingViz.tsx src/topics/html/AccessibilityViz.tsx \
        src/topics/registry.ts
git commit -m "feat: add ShadowsViz, OverflowViz, ThemingViz, AccessibilityViz"
```

---

## Chunk 3: Update Existing Topic Content

### Task 5: Update css-flexbox and css-grid topic data

**Files:**
- Modify: `src/data/topics.ts` (css-flexbox and css-grid sections)

- [ ] **Step 1: Update css-flexbox — add use-case steps and switch to FlexboxUseCasesViz**

In `src/data/topics.ts`, find the `css-flexbox` topic and update:

```typescript
// Change animationComponent:
animationComponent: 'FlexboxUseCasesViz',

// Replace the explanation steps with:
steps: [
  {
    animationStep: 0,
    heading: 'The classic navbar',
    text: 'Flexbox solves the navbar in 2 lines: display: flex on the container, then justify-content: space-between pushes the logo left and links right. The browser handles everything in between.',
    codeExample: `.nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}`,
    language: 'css',
  },
  {
    animationStep: 1,
    heading: 'Responsive card rows',
    text: 'Add flex-wrap: wrap so cards automatically drop to the next row when there\'s no space. gap replaces margin hacks. Each card gets flex: 1 1 250px — grow, shrink, minimum 250px wide.',
    codeExample: `.grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.card { flex: 1 1 250px; }`,
    language: 'css',
  },
  {
    animationStep: 2,
    heading: 'Perfect centering',
    text: 'The most searched CSS question: how do I center this? With flexbox it\'s two properties on the parent. justify-content centers on the main axis, align-items on the cross axis.',
    codeExample: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}`,
    language: 'css',
  },
  {
    animationStep: 3,
    heading: 'Core properties recap',
    text: 'These three flex properties cover 90% of real layouts. Start with these, add flex-direction: column for vertical stacks.',
    codeExample: `/* Container */\ndisplay: flex;\njustify-content: space-between; /* main axis */\nalign-items: center;            /* cross axis */\ngap: 16px;                      /* spacing */\n\n/* Child */\nflex: 1;         /* grow to fill */\nflex: 0 0 200px; /* fixed 200px */`,
    language: 'css',
  },
],
```

- [ ] **Step 2: Update css-grid — add grid-template-areas steps and switch to GridAreasViz**

In `src/data/topics.ts`, find the `css-grid` topic and append these steps + switch animationComponent:

```typescript
// Change animationComponent:
animationComponent: 'GridAreasViz',

// Replace steps with:
steps: [
  {
    animationStep: 0,
    heading: 'Name your areas',
    text: 'grid-template-areas lets you draw your layout as ASCII art. Each string is a row. Repeated names span multiple columns. A dot (.) is an empty cell.',
    codeExample: `.layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n}`,
    language: 'css',
  },
  {
    animationStep: 1,
    heading: 'Assign children',
    text: 'Each child gets a grid-area name matching the template. The browser places it exactly — no tracking column/row numbers.',
    codeExample: `header  { grid-area: header; }\n.sidebar { grid-area: sidebar; }\nmain    { grid-area: main; }\nfooter  { grid-area: footer; }`,
    language: 'css',
  },
  {
    animationStep: 2,
    heading: 'Responsive with areas',
    text: 'Redefine the template in a media query. The browser re-flows all named areas instantly — no changing individual grid-column/row values.',
    codeExample: `@media (max-width: 768px) {\n  .layout {\n    grid-template-areas:\n      "header"\n      "main"\n      "sidebar"\n      "footer";\n    grid-template-columns: 1fr;\n  }\n}`,
    language: 'css',
  },
  {
    animationStep: 3,
    heading: 'fr unit and auto-fit',
    text: 'fr (fractional unit) fills remaining space proportionally. Combine with repeat(auto-fill, minmax()) for grids that automatically adapt their column count.',
    codeExample: `/* 3 equal columns */\ngrid-template-columns: 1fr 1fr 1fr;\n\n/* Auto-responsive cards */\ngrid-template-columns:\n  repeat(auto-fill, minmax(250px, 1fr));`,
    language: 'css',
  },
],
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: enrich css-flexbox and css-grid topics with real-world use-cases"
```

---

### Task 6: Update html-forms with HTML5 validation content

**Files:**
- Modify: `src/data/topics.ts` (html-forms)

- [ ] **Step 1: Add validation steps to html-forms**

Find `html-forms` in `src/data/topics.ts` and add these steps to the explanation section:

```typescript
{
  animationStep: 5,
  heading: 'HTML5 built-in validation',
  text: 'Add required, minlength, maxlength, pattern, min, max directly in HTML — the browser validates before submit, no JavaScript needed. required alone blocks empty submission.',
  codeExample: `<input\n  type="email"\n  required\n  placeholder="you@example.com"\n>\n<input\n  type="password"\n  required\n  minlength="8"\n  pattern="(?=.*\\d)(?=.*[a-z]).{8,}"\n>`,
  language: 'html',
},
{
  animationStep: 6,
  heading: 'Constraint validation API',
  text: 'For custom error messages or real-time feedback, use the Constraint Validation API. setCustomValidity() overrides the browser message. checkValidity() returns true/false without submitting.',
  codeExample: `const input = document.querySelector('#email')\n\n// Custom message\ninput.setCustomValidity('Must be a company email')\n\n// Real-time check\ninput.addEventListener('input', () => {\n  if (input.validity.valid) {\n    input.setCustomValidity('')\n  }\n})`,
  language: 'javascript',
},
```

Also update `cheatSheet.syntax` — append:
```typescript
{ label: 'required', code: '<input type="text" required>', note: 'Blocks form submit if empty' },
{ label: 'pattern', code: '<input pattern="[A-Za-z]{3,}">', note: 'Regex — browser validates on submit' },
{ label: 'minlength / maxlength', code: '<input minlength="8" maxlength="32">', note: 'Character count limits' },
```

And `cheatSheet.commonMistakes` — append:
```typescript
'Relying only on client-side validation — always re-validate on the server',
'Using pattern without title= — browser shows generic "Please match format" without a hint',
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add HTML5 validation steps to html-forms topic"
```

---

### Task 7: Update css-animations with fill-mode and css-transitions with GPU note

**Files:**
- Modify: `src/data/topics.ts` (css-animations, css-transitions)

- [ ] **Step 1: Add fill-mode step to css-animations**

Find `css-animations` and append:
```typescript
{
  animationStep: 4,
  heading: 'animation-fill-mode',
  text: 'Without fill-mode, an element snaps back to its original state when the animation ends. forwards keeps the final keyframe applied. backwards applies the first keyframe immediately (before delay). both does both.',
  codeExample: `/* Without: element resets after animation */\nanimation: slideIn 0.5s ease;\n\n/* With: stays at final position */\nanimation: slideIn 0.5s ease forwards;\n\n/* With delay: starts from keyframe 0 immediately */\nanimation: slideIn 0.5s ease 1s both;`,
  language: 'css',
},
```

- [ ] **Step 2: Add GPU acceleration note to css-transitions**

Find `css-transitions` and append:
```typescript
{
  animationStep: 4,
  heading: 'Animate the right properties',
  text: 'Not all CSS properties are equal. transform and opacity run on the GPU compositor thread — they never trigger layout recalculation. width, height, top, left force reflow on every frame, causing jank. Prefer translate() over left/top for movement.',
  codeExample: `/* Slow — triggers layout */\n.bad  { transition: width 0.3s, margin 0.3s; }\n\n/* Fast — GPU composited */\n.good { transition: transform 0.3s, opacity 0.3s; }\n\n/* Move with transform, not left */\n.box:hover { transform: translateX(20px); }`,
  language: 'css',
},
```

- [ ] **Step 3: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add fill-mode to css-animations, GPU note to css-transitions"
```

---

## Chunk 4: New Topics

### Task 8: Add css-shadows topic

**Files:**
- Modify: `src/data/topics.ts`
- Modify: `src/data/categories.ts`

- [ ] **Step 1: Add css-shadows topic data**

In `src/data/topics.ts`, add after `css-backgrounds-gradients`:

```typescript
{
  id: 'css-shadows',
  title: 'Shadows',
  description: 'box-shadow and text-shadow — depth, glow effects, and layered shadows for visual hierarchy',
  level: 1,
  category: 'css-basics',
  color: '#a78bfa',
  estimatedMinutes: 8,
  animationComponent: 'ShadowsViz',
  playgroundType: 'css-live',
  defaultCSS: `.box {\n  width: 120px;\n  height: 80px;\n  background: #1e293b;\n  border-radius: 12px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);\n}`,
  previewHTML: `<div class="box"></div>`,
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        {
          animationStep: 0,
          heading: 'box-shadow anatomy',
          text: 'box-shadow takes: x-offset, y-offset, blur-radius, spread-radius, color. Only the first two are required. Positive x = right, positive y = down.',
          codeExample: `.card {\n  /* x  y  blur  spread  color */\n  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.4);\n}`,
          language: 'css',
        },
        {
          animationStep: 1,
          heading: 'Simple drop shadow',
          text: 'A single shadow with slight y-offset and blur creates depth. Keep the shadow subtle — too strong looks dated. rgba gives transparency control.',
          codeExample: `.card {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);\n}`,
          language: 'css',
        },
        {
          animationStep: 2,
          heading: 'Layered shadows',
          text: 'Stack multiple shadows with commas for realism. A tight near-shadow + a diffuse far-shadow mimics how light actually behaves. This is the secret behind polished UI design systems.',
          codeExample: `.card {\n  box-shadow:\n    0 1px 2px  rgba(0,0,0,0.4),\n    0 8px 32px rgba(91,156,245,0.25);\n}`,
          language: 'css',
        },
        {
          animationStep: 3,
          heading: 'Inset shadow',
          text: 'Adding inset flips the shadow to the inside of the box. Used for pressed button states, inner depth on inputs, or sunken effects.',
          codeExample: `.input:focus {\n  box-shadow: inset 0 2px 8px rgba(0,0,0,0.5);\n}\n\n.btn:active {\n  box-shadow: inset 0 3px 6px rgba(0,0,0,0.3);\n}`,
          language: 'css',
        },
        {
          animationStep: 4,
          heading: 'Glow and text-shadow',
          text: 'Zero offset + large blur = glow. Works on box-shadow for halos, text-shadow for glowing text effects. text-shadow syntax is identical but has no spread.',
          codeExample: `/* Glow */\n.glow {\n  box-shadow:\n    0 0 24px #5b9cf588,\n    0 0 48px #5b9cf533;\n}\n\n/* Text shadow */\nh1 {\n  text-shadow: 0 0 20px #a78bfa;\n}`,
          language: 'css',
        },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'box-shadow', code: 'box-shadow: x y blur spread color;', note: 'spread optional; positive = outward' },
      { label: 'multiple shadows', code: 'box-shadow: 0 1px 2px black, 0 8px 24px blue;', note: 'Comma-separated, first renders on top' },
      { label: 'inset', code: 'box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);', note: 'Shadow inside the box' },
      { label: 'text-shadow', code: 'text-shadow: 0 2px 4px rgba(0,0,0,0.5);', note: 'Same syntax, no spread' },
      { label: 'glow', code: 'box-shadow: 0 0 20px #3b82f688;', note: 'Zero offset + large blur = glow' },
    ],
    patterns: [
      { title: 'Layered card shadow', code: `.card {\n  box-shadow:\n    0 1px 2px rgba(0,0,0,0.3),\n    0 4px 12px rgba(0,0,0,0.2);\n}`, language: 'css' },
      { title: 'Focus ring (accessibility)', code: `.btn:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px #3b82f666;\n}`, language: 'css' },
    ],
    whenToUse: 'Use box-shadow for depth, hover states, and focus rings. Prefer it over border for focus indicators (doesn\'t affect layout). Use text-shadow sparingly — only for hero headings or glow effects.',
    commonMistakes: [
      'Animating box-shadow on hover — it\'s not GPU-composited. Use opacity + a pseudo-element for performance',
      'No color on glow shadow — defaults to currentColor which may not be what you want',
      'Forgetting that spread-radius 0 is still required when using rgba colors',
    ],
  },
  // nextTopicId set in Task 12 chain table
},
```

- [ ] **Step 2: Add css-shadows to css-basics category topicIds**

In `src/data/categories.ts`, find `css-basics` and add `'css-shadows'` to `topicIds`.

- [ ] **Step 3: Add css-shadows to TOPIC_LABELS**

In `src/data/categories.ts`, find the `TOPIC_LABELS` record (near the bottom) and add:
```typescript
'css-shadows': 'Shadows',
```

- [ ] **Step 4: Commit**

```bash
git add src/data/topics.ts src/data/categories.ts
git commit -m "feat: add css-shadows topic with ShadowsViz"
```

---

### Task 9: Add css-overflow topic

**Files:**
- Modify: `src/data/topics.ts`
- Modify: `src/data/categories.ts`

- [ ] **Step 1: Add css-overflow topic data**

In `src/data/topics.ts`, add after `css-shadows`:

```typescript
{
  id: 'css-overflow',
  title: 'Overflow & Scrolling',
  description: 'Control what happens when content is larger than its container — hide, scroll, or clip with precision',
  level: 1,
  category: 'css-layout',
  color: '#34d399',
  estimatedMinutes: 8,
  animationComponent: 'OverflowViz',
  playgroundType: 'css-live',
  defaultCSS: `.box {\n  width: 200px;\n  height: 80px;\n  border: 2px solid #34d399;\n  border-radius: 8px;\n  padding: 10px;\n  overflow: hidden;\n}`,
  previewHTML: `<div class="box">The quick brown fox jumps over the lazy dog. This text is intentionally long to show overflow behavior.</div>`,
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        {
          animationStep: 0,
          heading: 'The overflow problem',
          text: 'By default, overflow: visible means content spills out of its container. This breaks layouts — a text block or image can overlap sibling elements.',
          codeExample: `.box {\n  width: 200px;\n  height: 80px;\n  /* overflow: visible is the default */\n}`,
          language: 'css',
        },
        {
          animationStep: 1,
          heading: 'overflow: hidden',
          text: 'Clips content at the container boundary. Nothing is scrollable — the overflow just disappears. Use it to contain floated children, clip images, or create masked effects.',
          codeExample: `.box {\n  overflow: hidden;\n}\n\n/* Also clips child border-radius */\n.avatar-container {\n  border-radius: 50%;\n  overflow: hidden;\n}`,
          language: 'css',
        },
        {
          animationStep: 2,
          heading: 'overflow: auto and scroll',
          text: 'auto adds a scrollbar only when content overflows. scroll always shows the scrollbar. Prefer auto — it avoids layout shift on content size changes. Control axes separately with overflow-x / overflow-y.',
          codeExample: `.sidebar {\n  height: 400px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.code-block {\n  overflow-x: auto; /* horizontal scroll for long lines */\n}`,
          language: 'css',
        },
        {
          animationStep: 3,
          heading: 'text-overflow: ellipsis',
          text: 'Truncates text with "..." at the container edge. Requires three properties working together: white-space: nowrap (prevent wrapping), overflow: hidden (hide overflow), text-overflow: ellipsis (show dots).',
          codeExample: `.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n\n  /* Optional: set a max-width */\n  max-width: 200px;\n}`,
          language: 'css',
        },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'overflow', code: 'overflow: visible | hidden | auto | scroll', note: 'Sets both x and y' },
      { label: 'overflow-x / overflow-y', code: 'overflow-x: auto;\noverflow-y: hidden;', note: 'Control axes independently' },
      { label: 'text-overflow', code: 'white-space: nowrap;\noverflow: hidden;\ntext-overflow: ellipsis;', note: 'All three required for "..."' },
      { label: 'scroll-behavior', code: 'scroll-behavior: smooth;', note: 'Smooth scrolling for anchor links' },
    ],
    patterns: [
      { title: 'Single-line truncate', code: `.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n}`, language: 'css' },
      { title: 'Multi-line truncate (WebKit)', code: `.clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}`, language: 'css' },
    ],
    whenToUse: 'Use overflow: hidden to contain absolutely positioned children or clip images. Use auto for scrollable containers. Use ellipsis for card titles that might be too long.',
    commonMistakes: [
      'Missing white-space: nowrap when using text-overflow: ellipsis — the text wraps instead of truncating',
      'overflow: hidden on body/html breaking position: fixed elements',
      'Forgetting overflow: hidden clips the child box-shadow and border-radius effects',
    ],
  },
  nextTopicId: 'css-display-positioning',
},
```

- [ ] **Step 2: Add css-overflow to css-layout topicIds and update description**

In `src/data/categories.ts`:
1. Find `css-layout` category and add `'css-overflow'` to `topicIds`
2. Update the `css-layout` category `description` to include Overflow, e.g. `'Flex · Grid · Overflow · Responsive'`

- [ ] **Step 3: Add css-overflow to TOPIC_LABELS**

In `src/data/categories.ts`, find the `TOPIC_LABELS` record and add:
```typescript
'css-overflow': 'Overflow',
```

- [ ] **Step 4: Commit**

```bash
git add src/data/topics.ts src/data/categories.ts
git commit -m "feat: add css-overflow topic with OverflowViz"
```

---

### Task 10: Add html-accessibility topic

**Files:**
- Modify: `src/data/topics.ts`
- Modify: `src/data/categories.ts`

- [ ] **Step 1: Add html-accessibility topic data**

In `src/data/topics.ts`, add after `html-forms`:

```typescript
{
  id: 'html-accessibility',
  title: 'Accessibility (a11y)',
  description: 'ARIA roles, keyboard navigation, focus management — build for all users from the start',
  level: 1,
  category: 'html-structure',
  color: '#fb923c',
  estimatedMinutes: 12,
  animationComponent: 'AccessibilityViz',
  playgroundType: 'none',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        {
          animationStep: 0,
          heading: 'Who needs accessibility?',
          text: 'About 15% of people have a disability. Screen reader users navigate by headings and landmarks. Keyboard users can\'t use a mouse. Color-blind users need contrast. Semantic HTML gives you most of this for free — ARIA fills the gaps.',
          codeExample: `<!-- Screen readers announce this correctly -->\n<button type="button">Delete item</button>\n\n<!-- This has no semantics — avoid it -->\n<div onclick="deleteItem()">Delete item</div>`,
          language: 'html',
        },
        {
          animationStep: 1,
          heading: 'aria-label and aria-labelledby',
          text: 'When visible text isn\'t enough, aria-label provides an accessible name. Icons-only buttons, close buttons, and form inputs all need descriptive labels.',
          codeExample: `<!-- Icon-only button needs aria-label -->\n<button aria-label="Close dialog">\n  <svg><!-- X icon --></svg>\n</button>\n\n<!-- Connect to visible label text -->\n<div id="section-heading">Search results</div>\n<ul aria-labelledby="section-heading">...</ul>`,
          language: 'html',
        },
        {
          animationStep: 2,
          heading: 'Focus management',
          text: 'Keyboard users Tab through interactive elements. Focus must be visible — never remove :focus styles without replacing them. Use :focus-visible to show rings only for keyboard navigation, not clicks.',
          codeExample: `/* Never do this */\n* { outline: none; }\n\n/* Instead: custom focus ring */\n.btn:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 3px #3b82f666;\n}`,
          language: 'css',
        },
        {
          animationStep: 3,
          heading: 'tabindex',
          text: 'tabindex="0" makes any element keyboard-focusable in natural DOM order. tabindex="-1" allows programmatic focus (el.focus()) but removes from tab sequence. Never use tabindex > 0 — it breaks natural order.',
          codeExample: `<!-- Keyboard focusable custom element -->\n<div\n  role="button"\n  tabindex="0"\n  aria-label="Like post"\n  onclick="like()"\n  onkeydown="e.key==='Enter' && like()"\n>❤️</div>`,
          language: 'html',
        },
        {
          animationStep: 4,
          heading: 'ARIA roles and live regions',
          text: 'role= overrides the element\'s implicit role. ARIA live regions announce dynamic content changes to screen readers. aria-live="polite" waits for silence, "assertive" interrupts immediately.',
          codeExample: `<!-- Status message announced without focus -->\n<div\n  role="status"\n  aria-live="polite"\n  aria-atomic="true"\n>\n  3 results found\n</div>\n\n<!-- Alert: urgent message -->\n<div role="alert">\n  Form submission failed\n</div>`,
          language: 'html',
        },
      ],
    },
  ],
  cheatSheet: {
    syntax: [
      { label: 'aria-label', code: '<button aria-label="Close">✕</button>', note: 'Overrides button text for screen readers' },
      { label: 'aria-labelledby', code: '<input aria-labelledby="hint-id">', note: 'References another element\'s text' },
      { label: 'aria-describedby', code: '<input aria-describedby="error-msg">', note: 'Links to helper/error text' },
      { label: 'role', code: '<div role="button" tabindex="0">', note: 'Override implicit semantic role' },
      { label: 'tabindex', code: '<div tabindex="0">  <!-- focusable -->\n<div tabindex="-1"> <!-- programmatic only -->', note: 'Never use tabindex > 0' },
      { label: 'aria-hidden', code: '<span aria-hidden="true">🎉</span>', note: 'Hides from screen readers (decorative)' },
    ],
    patterns: [
      { title: 'Skip link', code: `<a href="#main" class="skip-link">Skip to content</a>\n\n.skip-link {\n  position: absolute;\n  transform: translateY(-100%);\n}\n.skip-link:focus {\n  transform: none;\n}`, language: 'html' },
      { title: 'Accessible icon button', code: `<button type="button" aria-label="Delete item">\n  <svg aria-hidden="true" focusable="false">...</svg>\n</button>`, language: 'html' },
    ],
    whenToUse: 'Use semantic HTML first — <button>, <a>, <input>, headings, landmarks. Add ARIA only when HTML semantics aren\'t enough. "No ARIA is better than bad ARIA."',
    commonMistakes: [
      'Removing :focus outline without replacement — keyboard users lose all navigation feedback',
      'Using aria-label on non-interactive elements — doesn\'t help unless paired with role=',
      'role="button" without onkeydown handler — click works with mouse but not Enter/Space',
      'aria-hidden="true" on focusable elements — screen reader skips it but keyboard still reaches it',
    ],
  },
  nextTopicId: 'html-semantic',
},
```

- [ ] **Step 2: Add html-accessibility to html-structure topicIds**

In `src/data/categories.ts`, find `html-structure` and add `'html-accessibility'` to `topicIds`.

- [ ] **Step 3: Add html-accessibility to TOPIC_LABELS**

In `src/data/categories.ts`, find the `TOPIC_LABELS` record and add:
```typescript
'html-accessibility': 'Accessibility',
```

- [ ] **Step 4: Commit**

```bash
git add src/data/topics.ts src/data/categories.ts
git commit -m "feat: add html-accessibility topic with AccessibilityViz"
```

---

### Task 11: Add css-variables-theming topic

**Files:**
- Modify: `src/data/topics.ts`
- Modify: `src/data/categories.ts`

- [ ] **Step 1: Add css-variables-theming topic data**

In `src/data/topics.ts`, add after `css-custom-properties`:

```typescript
{
  id: 'css-variables-theming',
  title: 'Theming & Dark Mode',
  description: 'Light/dark themes with CSS custom properties — one stylesheet, two color schemes',
  level: 2,
  category: 'css-modern',
  color: '#818cf8',
  estimatedMinutes: 10,
  animationComponent: 'ThemingViz',
  playgroundType: 'css-live',
  defaultCSS: `:root {\n  --bg: #ffffff;\n  --text: #1e293b;\n  --primary: #3b82f6;\n  --surface: #f1f5f9;\n}\n\n.dark {\n  --bg: #0f172a;\n  --text: #e2e8f0;\n  --primary: #818cf8;\n  --surface: #1e293b;\n}\n\nbody {\n  background: var(--bg);\n  color: var(--text);\n}\n\n.card {\n  background: var(--surface);\n  padding: 16px;\n  border-radius: 8px;\n}\n\n.btn {\n  background: var(--primary);\n  color: white;\n  padding: 8px 16px;\n  border-radius: 6px;\n  border: none;\n}`,
  previewHTML: `<div class="card">\n  <h3>Hello World</h3>\n  <p>Themed with CSS variables</p>\n  <button class="btn">Click me</button>\n</div>`,
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        {
          animationStep: 0,
          heading: 'The problem with hardcoded colors',
          text: 'When colors are scattered across 50 CSS files, changing your brand color means grep-and-replace across the entire codebase. One missed instance and your UI is inconsistent.',
          codeExample: `/* Hardcoded — a maintenance nightmare */\n.btn    { background: #3b82f6; }\n.link   { color: #3b82f6; }\n.border { border-color: #3b82f6; }`,
          language: 'css',
        },
        {
          animationStep: 1,
          heading: 'Design tokens with :root',
          text: ':root variables are globally available. Define your entire design token system here — colors, spacing, radius, shadows. Components reference tokens, never raw values.',
          codeExample: `:root {\n  --color-primary:   #3b82f6;\n  --color-bg:        #ffffff;\n  --color-text:      #1e293b;\n  --color-surface:   #f1f5f9;\n  --radius:          8px;\n  --shadow:          0 4px 12px rgba(0,0,0,0.1);\n}\n\n.btn { background: var(--color-primary); }`,
          language: 'css',
        },
        {
          animationStep: 2,
          heading: 'Dark mode with class override',
          text: 'Override the same variable names in a .dark class. Add/remove this class from <html> or <body> in JavaScript. No component code changes — they all read the same variable names.',
          codeExample: `.dark {\n  --color-primary:  #818cf8;\n  --color-bg:       #0f172a;\n  --color-text:     #e2e8f0;\n  --color-surface:  #1e293b;\n}\n\n// Toggle in JavaScript\ndocument.documentElement.classList.toggle('dark')`,
          language: 'css',
        },
        {
          animationStep: 3,
          heading: 'prefers-color-scheme',
          text: 'Respect the user\'s OS preference automatically. Media query reads the system setting and activates the dark token overrides — no JavaScript needed for the initial state.',
          codeExample: `@media (prefers-color-scheme: dark) {\n  :root {\n    --color-primary:  #818cf8;\n    --color-bg:       #0f172a;\n    --color-text:     #e2e8f0;\n    --color-surface:  #1e293b;\n  }\n}`,
          language: 'css',
        },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'Define variable', code: ':root { --color-primary: #3b82f6; }', note: ':root = highest scope (html element)' },
      { label: 'Use variable', code: 'background: var(--color-primary);', note: '' },
      { label: 'Fallback', code: 'color: var(--color-text, #1e293b);', note: 'Second arg used if var is undefined' },
      { label: 'Dark override', code: '.dark { --color-primary: #818cf8; }', note: 'Redefine in scope, all consumers update' },
      { label: 'System preference', code: '@media (prefers-color-scheme: dark) { :root { ... } }', note: 'Auto-detect OS dark mode' },
    ],
    patterns: [
      { title: 'Token system', code: `:root {\n  /* Colors */\n  --primary: #3b82f6;\n  --bg: #fff;\n  --surface: #f1f5f9;\n  --text: #1e293b;\n  --text-muted: #64748b;\n  --border: #e2e8f0;\n\n  /* Dimensions */\n  --radius: 8px;\n  --shadow: 0 4px 12px rgba(0,0,0,0.1);\n}`, language: 'css' },
    ],
    whenToUse: 'Always define colors as CSS variables, not raw values. Pair with prefers-color-scheme for automatic dark mode. Use class-based toggling when you need a user-controlled switch.',
    commonMistakes: [
      'Using var() inside calc() — works fine: calc(var(--spacing) * 2)',
      'Defining variables inside a component selector instead of :root — they won\'t be available globally',
      'Not providing a fallback value for variables that might not be defined',
    ],
  },
  nextTopicId: 'css-transforms',
},
```

- [ ] **Step 2: Add css-variables-theming to css-modern topicIds**

In `src/data/categories.ts`, find `css-modern` and add `'css-variables-theming'` to `topicIds`.

- [ ] **Step 3: Add css-variables-theming to TOPIC_LABELS**

In `src/data/categories.ts`, find the `TOPIC_LABELS` record and add:
```typescript
'css-variables-theming': 'Theming',
```

- [ ] **Step 4: Commit**

```bash
git add src/data/topics.ts src/data/categories.ts
git commit -m "feat: add css-variables-theming topic with ThemingViz"
```

---

### Task 12: Wire nextTopicId chains for all HTML/CSS topics

**Files:**
- Modify: `src/data/topics.ts`

- [ ] **Step 1: Add nextTopicId to HTML topics**

Add `nextTopicId` fields to create logical learning chains:

| Topic | nextTopicId |
|---|---|
| `html-basics` | `html-text` |
| `html-text` | `html-links-images` |
| `html-links-images` | `html-lists` |
| `html-lists` | `html-dom` |
| `html-dom` | `html-semantic` |
| `html-semantic` | `html-forms` |
| `html-forms` | `html-accessibility` |
| `html-accessibility` | `html-media` |

- [ ] **Step 2: Add nextTopicId to CSS topics**

| Topic | nextTopicId |
|---|---|
| `css-basics` | `css-box-model` |
| `css-box-model` | `css-selectors` |
| `css-selectors` | `css-colors-units` |
| `css-colors-units` | `css-typography` |
| `css-typography` | `css-backgrounds-gradients` |
| `css-backgrounds-gradients` | `css-shadows` |
| `css-shadows` | `css-flexbox` |
| `css-flexbox` | `css-grid` |
| `css-grid` | `css-display-positioning` |
| `css-display-positioning` | `css-overflow` |
| `css-overflow` | `css-responsive` |
| `css-responsive` | `css-images` |
| `css-images` | `css-custom-properties` |
| `css-custom-properties` | `css-variables-theming` |
| `css-variables-theming` | `css-transforms` |
| `css-transforms` | `css-transitions` |
| `css-transitions` | `css-animations` |

- [ ] **Step 3: Full type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Final commit**

```bash
git add src/data/topics.ts
git commit -m "feat: wire nextTopicId chains for all HTML and CSS topics"
```

---

## Final Verification

- [ ] **Run dev server**

```bash
npm exec vite -- --port 5173 --host 127.0.0.1 &
```

- [ ] **Manual checks**

1. Open any HTML topic (e.g. `/topic/html-basics`) — NextTopicCard visible at bottom → click navigates to `html-text`
2. Open `/topic/css-flexbox` — FlexboxUseCasesViz shows navbar / card row / centering use-cases
3. Open `/topic/css-grid` — GridAreasViz shows template-areas step by step
4. Open `/topic/css-shadows` — topic loads, ShadowsViz animates shadows, playground pre-filled
5. Open `/topic/css-overflow` — OverflowViz shows overflow states
6. Open `/topic/html-accessibility` — AccessibilityViz shows aria-label, focus ring, tabindex
7. Open `/topic/css-variables-theming` — ThemingViz shows light→dark transition
8. Check html-forms has 2 new validation steps visible in step nav
9. Check css-animations has fill-mode step
10. Check css-transitions has GPU properties step

- [ ] **Final commit if any last adjustments needed**

```bash
git add -p
git commit -m "fix: post-integration adjustments"
```
