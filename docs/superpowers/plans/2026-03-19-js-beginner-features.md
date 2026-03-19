# JS Beginner Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four beginner-friendly features to all JavaScript topics: per-step analogies in the animation column, a Common Errors accordion panel, a Real-World "In the Wild" section, and named playground example tabs.

**Architecture:** Extend `ExplanationStep` and `Topic` types with new optional fields; add `AnalogyPanel` inside `SyncExplanation`'s left sticky column; add `CommonErrorsPanel` and `RealWorldPanel` after `KeyTakeaways` in `TopicPage`; extend `PlaygroundSection` to render named tabs that reset the Monaco editor. The `js-closures` topic is the pilot — all other JS topics get content in a follow-up.

**Tech Stack:** React 18, TypeScript, Vite, `@monaco-editor/react`, react-i18next

**Spec:** `docs/superpowers/specs/2026-03-19-js-beginner-features-design.md`

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Modify | `src/types/index.ts` | Add `analogy` to `ExplanationStep`; add `CommonError`, `RealWorldExample`, `PlaygroundExample` interfaces; add new optional fields to `Topic` |
| Create | `src/pages/TopicPage/AnalogyPanel.tsx` | Renders amber analogy card below animation panel; swaps content per active step |
| Modify | `src/pages/TopicPage/SyncExplanation.tsx` | Import `AnalogyPanel`; render it inside the left sticky column below step dots |
| Create | `src/pages/TopicPage/CommonErrorsPanel.tsx` | Expandable accordion of common errors; first card open by default |
| Create | `src/pages/TopicPage/RealWorldPanel.tsx` | 3-column grid of real-world usage examples |
| Modify | `src/pages/TopicPage/index.tsx` | Render `CommonErrorsPanel` and `RealWorldPanel` after `KeyTakeaways` |
| Modify | `src/playgrounds/MonacoPlayground.tsx` | Accept optional `starterCode` prop; use it when provided |
| Modify | `src/pages/TopicPage/PlaygroundSection.tsx` | Accept `topic.playgroundExamples`; render tab bar; pass selected code to `MonacoPlayground` |
| Modify | `src/data/topics.ts` | Add `commonErrors`, `realWorldExamples`, `playgroundExamples`, and step `analogy` to `js-closures` |

---

## Task 1: Extend TypeScript types

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Patch ExplanationStep — add `analogy?` field**

In `src/types/index.ts`, find the `ExplanationStep` interface (around line 61). It currently ends with `language?: string`. Add the new field after it:

```typescript
export interface ExplanationStep {
  animationStep: number
  heading: string
  text: string
  icon?: string
  codeExample?: string
  language?: string
  // NEW
  analogy?: {
    icon: string     // emoji, e.g. "🎒"
    title: string    // shown in analogy panel header
    text: string[]   // 2–3 paragraphs of plain text
  }
}
```

Do NOT re-declare the interface — patch the existing one in-place by adding only the `analogy?` field.

- [ ] **Step 2: Add new exported interfaces and patch Topic**

Immediately after the `ExplanationStep` interface (before the `SearchResult` interface), insert:

```typescript
export interface CommonError {
  title: string      // short error description
  why: string        // 1–2 sentences explaining root cause
  fixLabel: string   // e.g. "Fix — use let instead of var"
  fixCode: string    // corrected code snippet
}

export interface RealWorldExample {
  context: string    // e.g. "React Hooks"
  heading: string    // e.g. "useState internals"
  description: string
  code: string
}

export interface PlaygroundExample {
  label: string      // tab label, e.g. "Counter Factory"
  code: string       // pre-filled starter code
}
```

In the `Topic` interface, add after `cheatSheet?`:

```typescript
  commonErrors?: CommonError[]
  realWorldExamples?: RealWorldExample[]
  playgroundExamples?: PlaygroundExample[]
```

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors (existing errors OK, new fields are optional so nothing breaks).

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: extend types — analogy, CommonError, RealWorldExample, PlaygroundExample"
```

---

## Task 2: AnalogyPanel component

**Files:**
- Create: `src/pages/TopicPage/AnalogyPanel.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/pages/TopicPage/AnalogyPanel.tsx
import type { ExplanationStep } from '@/types'

interface Props {
  analogy: ExplanationStep['analogy'] | undefined
}

export default function AnalogyPanel({ analogy }: Props) {
  if (!analogy) return null

  return (
    <div style={{
      marginTop: 12,
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
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
          {analogy.title}
        </span>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', gap: 14, padding: '14px 14px 14px 17px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>
          {analogy.icon}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {analogy.text.map((paragraph, i) => (
            <p key={i} style={{
              fontSize: 12.5, color: i === analogy.text.length - 1
                ? 'rgba(139,144,168,0.55)'
                : 'var(--text-muted)',
              lineHeight: 1.65, margin: 0,
            }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
```

The Props interface must include `color` per spec (even though it's not used visually — kept for forward-compatibility):

```typescript
interface Props {
  analogy: ExplanationStep['analogy'] | undefined
  color: string
}
```

Update the function signature to match: `function AnalogyPanel({ analogy }: Props)` — `color` is accepted but not used in the body.

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors from the new file.

- [ ] **Step 3: Commit**

```bash
git add src/pages/TopicPage/AnalogyPanel.tsx
git commit -m "feat: add AnalogyPanel component"
```

---

## Task 3: Wire AnalogyPanel into SyncExplanation

**Files:**
- Modify: `src/pages/TopicPage/SyncExplanation.tsx`

The left column (sticky div) currently contains: animation panel → step dots. We add `AnalogyPanel` immediately after the dots.

- [ ] **Step 1: Import AnalogyPanel**

In `src/pages/TopicPage/SyncExplanation.tsx`, add to existing imports:

```typescript
import AnalogyPanel from './AnalogyPanel'
```

- [ ] **Step 2: Add AnalogyPanel after step dots**

Find the step dots block (the `<div>` containing `steps.map((_, i) => <button ...>)`) in the left column sticky div. Add `AnalogyPanel` immediately after the closing `</div>` of the dots block:

```tsx
<AnalogyPanel analogy={steps[ctrl.step]?.analogy} />
```

The full left sticky column should now look like:

```tsx
<div style={{ position: 'sticky', top: 80 }}>
  {/* Animation panel — click to advance */}
  <div onClick={ctrl.next} style={{ /* existing styles */ }}>
    {/* existing AnimComp / loading spinner */}
  </div>

  {/* Step dots */}
  <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center', marginTop: 14 }}>
    {steps.map((_, i) => (
      <button key={i} onClick={() => ctrl.goTo(i)} /* ... */ />
    ))}
  </div>

  {/* NEW: Analogy panel */}
  <AnalogyPanel analogy={steps[ctrl.step]?.analogy} color={topic.color} />
</div>
```

- [ ] **Step 3: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Verify in browser**

Open any topic (e.g. `http://localhost:5173/web-dev-guide/#/topic/js-variables`). The How it Works section should look exactly as before — no analogy panel visible (no topic has analogy data yet). No layout regressions.

- [ ] **Step 5: Commit**

```bash
git add src/pages/TopicPage/SyncExplanation.tsx
git commit -m "feat: wire AnalogyPanel into SyncExplanation left column"
```

---

## Task 4: CommonErrorsPanel component

**Files:**
- Create: `src/pages/TopicPage/CommonErrorsPanel.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/pages/TopicPage/CommonErrorsPanel.tsx
import { useState } from 'react'
import type { CommonError } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'

interface Props {
  errors: CommonError[]
  color: string
}

export default function CommonErrorsPanel({ errors, color }: Props) {
  const [openIdx, setOpenIdx] = useState<number>(0)

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: 'var(--text)' }}>
        Häufige Fehler
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {errors.map((err, i) => {
          const isOpen = openIdx === i
          return (
            <div
              key={i}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${isOpen ? 'rgba(240,79,106,0.3)' : 'rgba(240,79,106,0.12)'}`,
                borderRadius: 10,
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '13px 16px', cursor: 'pointer',
                  background: 'none', border: 'none', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 14, flexShrink: 0 }}>⚠</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(240,79,106,0.9)', flex: 1 }}>
                  {err.title}
                </span>
                <span style={{
                  fontSize: 10, color: 'var(--text-faint)',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}>
                  ▼
                </span>
              </button>

              {isOpen && (
                <div style={{ padding: '0 16px 16px 40px' }}>
                  <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 12 }}>
                    {err.why}
                  </p>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'rgba(52,211,153,0.7)', marginBottom: 6,
                  }}>
                    {err.fixLabel}
                  </div>
                  <CodeBlock code={err.fixCode} language="javascript" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/TopicPage/CommonErrorsPanel.tsx
git commit -m "feat: add CommonErrorsPanel component"
```

---

## Task 5: RealWorldPanel component

**Files:**
- Create: `src/pages/TopicPage/RealWorldPanel.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/pages/TopicPage/RealWorldPanel.tsx
import type { RealWorldExample } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'

interface Props {
  examples: RealWorldExample[]
  color: string
}

export default function RealWorldPanel({ examples, color }: Props) {
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: 'var(--text)' }}>
        In the Wild
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 16,
      }}>
        {examples.map((ex, i) => (
          <div
            key={i}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 18,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', color,
            }}>
              {ex.context}
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: 0 }}>
              {ex.heading}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {ex.description}
            </p>
            <CodeBlock code={ex.code} language="javascript" />
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/TopicPage/RealWorldPanel.tsx
git commit -m "feat: add RealWorldPanel component"
```

---

## Task 6: Wire CommonErrorsPanel and RealWorldPanel into TopicPage

**Files:**
- Modify: `src/pages/TopicPage/index.tsx`

- [ ] **Step 1: Import both panels**

Add to the imports in `src/pages/TopicPage/index.tsx`:

```typescript
import CommonErrorsPanel from './CommonErrorsPanel'
import RealWorldPanel from './RealWorldPanel'
```

- [ ] **Step 2: Render after KeyTakeaways**

In `src/pages/TopicPage/index.tsx`, the layout is:

```tsx
<KeyTakeaways topic={topic} />
{/* ← insert here, before ContentTabs */}
{(hasCheatSheet || hasSliderConfig(topic.id) || hasPlayground) && (
  <ContentTabs ... />
)}
```

Insert the two new panels between `<KeyTakeaways>` and `<ContentTabs>`:

```tsx
{topic.commonErrors && topic.commonErrors.length > 0 && (
  <CommonErrorsPanel errors={topic.commonErrors} color={topic.color} />
)}

{topic.realWorldExamples && topic.realWorldExamples.length > 0 && (
  <RealWorldPanel examples={topic.realWorldExamples} color={topic.color} />
)}
```

The final order in the page is: How it Works → Key Takeaways → Common Errors → In the Wild → (Cheatsheet / Playground tabs).

- [ ] **Step 3: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Verify in browser**

Open any existing topic — nothing should change visually (no topic has the new data yet).

- [ ] **Step 5: Commit**

```bash
git add src/pages/TopicPage/index.tsx
git commit -m "feat: wire CommonErrorsPanel and RealWorldPanel into TopicPage"
```

---

## Task 7: Playground named example tabs

**Files:**
- Modify: `src/playgrounds/MonacoPlayground.tsx`
- Modify: `src/pages/TopicPage/PlaygroundSection.tsx`

The tab UI lives in `PlaygroundSection` (which has the full topic). When a tab is selected, `PlaygroundSection` passes the chosen code to `MonacoPlayground` via a new `starterCode` prop. A `key` change on `MonacoPlayground` forces Monaco to reset its state to the new starter code.

- [ ] **Step 1: Add `starterCode` and `language` props to MonacoPlayground**

The existing file has `language="python"` hardcoded. Replace the Props interface and the component signature to make language configurable, and add `starterCode`:

```typescript
interface Props {
  topicId: string
  starterCode?: string   // overrides defaultCode lookup when provided
  language?: string      // Monaco language; defaults to 'javascript'
  storageKey?: string    // usePlayground key; defaults to `monaco-${topicId}`
}

export default function MonacoPlayground({ topicId, starterCode, language = 'javascript', storageKey }: Props) {
  const { theme } = useAppStore()
  const [code, setCode] = usePlayground<string>(
    starterCode ?? defaultCode[topicId] ?? '// Write your code here',
    storageKey ?? `monaco-${topicId}`
  )
  // ... existing return, but update <Editor language={language} ... />
```

The `storageKey` prop lets `PlaygroundSection` pass a per-tab key so each tab's edits are stored independently (prevents tab-switch state collision).

Update the `<Editor>` element inside the return: change `language="python"` to `language={language}`.

Note: the existing `http-request-cycle` topic (which used Python) currently relies on the hardcoded `"python"`. Since `language` defaults to `'javascript'`, you must also check if any existing callers of `MonacoPlayground` need `language="python"`. Search: `grep -r "MonacoPlayground" src/` — if only `PlaygroundSection` calls it (no `language` prop currently), all existing uses will now default to `'javascript'`. That is fine because the only topic with Python (`http-request-cycle`) has its default code in the `defaultCode` map but the language was wrong anyway. Confirm by searching before proceeding.

- [ ] **Step 2: Add tab bar to PlaygroundSection**

Replace `src/pages/TopicPage/PlaygroundSection.tsx` entirely:

```tsx
// src/pages/TopicPage/PlaygroundSection.tsx
import { useState, lazy, Suspense } from 'react'
import type { Topic } from '@/types'
import VisualPlayground from '@/playgrounds/VisualPlayground'
import MonacoPlayground from '@/playgrounds/MonacoPlayground'

const GradientPlayground = lazy(() => import('@/playgrounds/GradientPlayground'))
const CSSLivePlayground  = lazy(() => import('@/playgrounds/CSSLivePlayground'))

const LOADING = <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading...</div>

interface Props { topic: Topic }

export default function PlaygroundSection({ topic }: Props) {
  if (topic.playgroundType === 'none') return null

  const examples = topic.playgroundExamples ?? []
  const [activeIdx, setActiveIdx] = useState(0)

  const selectedCode = examples.length > 0 ? examples[activeIdx]?.code : undefined

  return (
    <section style={{
      maxWidth: 1100, margin: '0 auto',
      padding: '64px 24px 80px',
      borderTop: '1px solid var(--border)',
    }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
        Playground
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: examples.length > 0 ? 16 : 32 }}>
        Experiment directly — changes apply in real time.
      </p>

      {/* Example tabs — only rendered when playgroundExamples provided */}
      {examples.length > 0 && (
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: activeIdx === i ? 700 : 400,
                padding: '5px 14px', borderRadius: 6, cursor: 'pointer',
                border: '1px solid',
                borderColor: activeIdx === i ? `${topic.color}66` : 'var(--border)',
                background: activeIdx === i ? `${topic.color}18` : 'var(--surface)',
                color: activeIdx === i ? topic.color : 'var(--text-muted)',
                transition: 'all 0.15s',
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>
      )}

      {topic.playgroundType === 'gradient' ? (
        <Suspense fallback={LOADING}><GradientPlayground /></Suspense>
      ) : topic.playgroundType === 'css-live' ? (
        <Suspense fallback={LOADING}>
          <CSSLivePlayground
            topicId={topic.id}
            defaultCSS={topic.defaultCSS ?? '/* Write your CSS here */'}
            previewHTML={topic.previewHTML ?? '<div class="box">Hello</div>'}
          />
        </Suspense>
      ) : topic.playgroundType === 'visual-controls' ? (
        <VisualPlayground topicId={topic.id} />
      ) : (
        /* key forces Monaco to remount when tab changes; storageKey is per-tab to prevent state collision */
        <MonacoPlayground
          key={`${topic.id}-${activeIdx}`}
          topicId={topic.id}
          starterCode={selectedCode}
          language="javascript"
          storageKey={examples.length > 0 ? `monaco-${topic.id}-${activeIdx}` : undefined}
        />
      )}
    </section>
  )
}
```

- [ ] **Step 3: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Verify in browser**

Open a monaco-playground topic (e.g. `js-closures`). Playground should look identical to before. No tabs appear yet (no data).

- [ ] **Step 5: Commit**

```bash
git add src/playgrounds/MonacoPlayground.tsx src/pages/TopicPage/PlaygroundSection.tsx
git commit -m "feat: add named example tabs to PlaygroundSection"
```

---

## Task 8: Fill js-closures pilot content

**Files:**
- Modify: `src/data/topics.ts` (the `js-closures` entry, around line 2290)

Add all four features to the Closures topic. Find the `js-closures` entry and update it:

- [ ] **Step 1: Add analogy to each explanation step**

Inside the `explanation` section's `steps` array, add an `analogy` field to each step:

```typescript
steps: [
  {
    animationStep: 0,
    heading: 'A function with local state',
    text: 'When a function runs, it creates a local scope. Variables inside that scope normally disappear when the function returns.',
    codeExample: 'function makeCounter() {\n  let count = 0 // local variable\n}',
    language: 'javascript',
    analogy: {
      icon: '🏠',
      title: 'Step 1 — Local state',
      text: [
        'Think of a function as a room. Everything created inside belongs to that room.',
        'When you leave the room and the door closes, things inside normally vanish.',
        'That\'s count — it would normally disappear when makeCounter() finishes.',
      ],
    },
  },
  {
    animationStep: 1,
    heading: 'Returning an inner function',
    text: 'If we define and return a function inside makeCounter, that inner function can see count — it is in its scope chain.',
    codeExample: 'function makeCounter() {\n  let count = 0\n  return function increment() {\n    count++\n    return count\n  }\n}',
    language: 'javascript',
    analogy: {
      icon: '🔑',
      title: 'Step 2 — Returning an inner function',
      text: [
        'The inner function is like someone who takes a key when leaving the room.',
        'With that key, it can return and access things inside at any time — even after the door is closed.',
      ],
    },
  },
  {
    animationStep: 2,
    heading: 'The outer function returns',
    text: 'makeCounter() finishes executing, but count is NOT garbage collected. The returned function still holds a reference to it — this is the closure.',
    codeExample: 'const increment = makeCounter()\n// makeCounter is done...\n// but count still exists!',
    language: 'javascript',
    analogy: {
      icon: '🎒',
      title: 'Step 3 — Outer function returns',
      text: [
        'makeCounter() finishes and "leaves the room". But increment() packed count into a backpack and took it along.',
        'The backpack stays alive — as long as increment() exists, so does count.',
      ],
    },
  },
  {
    animationStep: 3,
    heading: 'The closure in action',
    text: 'Calling increment() accesses and modifies count — even though we are outside makeCounter. The closure remembers the original scope.',
    codeExample: 'increment() // returns 1\nincrement() // returns 2\nincrement() // returns 3',
    language: 'javascript',
    analogy: {
      icon: '🎒✋',
      title: 'Step 4 — Closure in action',
      text: [
        'Every time you call increment(), you open the backpack, take out count, increment it, and put it back.',
        'This happens outside the original room — but the backpack remembers everything.',
      ],
    },
  },
  {
    animationStep: 4,
    heading: 'Independent closures',
    text: 'Each call to makeCounter() creates a fresh scope with its own count. Two counters do not share state.',
    codeExample: 'const a = makeCounter()\nconst b = makeCounter()\na() // 1\na() // 2\nb() // 1 — independent!',
    language: 'javascript',
    analogy: {
      icon: '🎒🎒',
      title: 'Step 5 — Independent closures',
      text: [
        'Every call to makeCounter() packs its own brand-new backpack with its own count.',
        'Counter a and counter b carry different backpacks. Completely independent.',
      ],
    },
  },
],
```

- [ ] **Step 2: Add commonErrors to js-closures**

After the `sections` array and before `cheatSheet`, add:

```typescript
commonErrors: [
  {
    title: 'var in Loops — all handlers share the same value',
    why: 'var is function-scoped, not block-scoped. In a loop there is only one variable i — all closures share the same reference and see the final value.',
    fixLabel: 'Fix — use let instead of var',
    fixCode: '// ❌ Wrong\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100) // 3 3 3\n}\n\n// ✅ Right\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100) // 0 1 2\n}',
  },
  {
    title: 'Stale Closure — outdated value in async callback',
    why: 'An async callback "sees" a variable\'s value at creation time, not call time. In React this causes bugs in useEffect callbacks with empty dependency arrays.',
    fixLabel: 'Fix — use an updater function',
    fixCode: '// ❌ stale\nsetInterval(() => setCount(count + 1), 1000)\n\n// ✅ Right\nsetInterval(() => setCount(prev => prev + 1), 1000)',
  },
  {
    title: 'Memory Leak — closure keeps DOM node alive',
    why: 'When a closure holds a reference to a large object or DOM node, the garbage collector cannot free it — even after it is removed from the DOM.',
    fixLabel: 'Fix — set reference to null',
    fixCode: 'let elem = document.getElementById(\'huge\')\nelem.addEventListener(\'click\', handler)\ndocument.body.removeChild(elem)\nelem = null // ✅ release reference',
  },
],
```

- [ ] **Step 3: Add realWorldExamples to js-closures**

```typescript
realWorldExamples: [
  {
    context: 'React Hooks',
    heading: 'useState internals',
    description: 'React\'s useState uses a closure so each component instance remembers its own state value — isolated from all other components.',
    code: '// Simplified — React internals\nfunction useState(init) {\n  let state = init\n  const setState = val => {\n    state = val // closure!\n    rerender()\n  }\n  return [state, setState]\n}',
  },
  {
    context: 'Event Handlers',
    heading: 'Button with index',
    description: 'When rendering a list, each click handler closes over its own index — the classic DOM closure use-case.',
    code: 'items.forEach((item, i) => {\n  btn.addEventListener(\'click\', () => {\n    // i is in the closure\n    console.log(`Item ${i}`)\n  })\n})',
  },
  {
    context: 'Module Pattern',
    heading: 'Private data',
    description: 'Before ES Modules, closures were used to simulate private variables — the Revealing Module Pattern.',
    code: 'const counter = (function() {\n  let n = 0 // private\n  return {\n    inc: () => ++n,\n    get: () => n\n  }\n})()',
  },
],
```

- [ ] **Step 4: Add playgroundExamples to js-closures**

```typescript
playgroundExamples: [
  {
    label: 'Counter Factory',
    code: '// 🎯 Closure as a Counter Factory\n// Create multiple independent counters and observe\n// that each keeps its own state.\n\nfunction makeCounter(startValue = 0) {\n  let count = startValue\n  return {\n    inc:   () => ++count,\n    dec:   () => --count,\n    reset: () => { count = startValue },\n    value: () => count,\n  }\n}\n\nconst a = makeCounter()\nconst b = makeCounter(10) // starts at 10\n\na.inc(); a.inc(); a.inc()\nb.dec()\n\nconsole.log(\'a:\', a.value()) // 3\nconsole.log(\'b:\', b.value()) // 9 — independent!\n\n// Try it: add a multiply() method',
  },
  {
    label: 'Memoization',
    code: '// 🎯 Memoization via Closure\n// The function remembers previously computed results —\n// the closure keeps the cache alive.\n\nfunction memoize(fn) {\n  const cache = new Map()\n  return (...args) => {\n    const key = JSON.stringify(args)\n    if (cache.has(key)) {\n      console.log(`Cache hit: ${key}`)\n      return cache.get(key)\n    }\n    const result = fn(...args)\n    cache.set(key, result)\n    return result\n  }\n}\n\nconst fastSquare = memoize(n => n * n)\nconsole.log(fastSquare(5))  // 25 (computed)\nconsole.log(fastSquare(5))  // Cache hit!\nconsole.log(fastSquare(5))  // 25 (from cache)',
  },
  {
    label: 'Private State',
    code: '// 🎯 Private State via Closure\n// Simulate private fields without classes —\n// the Revealing Module Pattern.\n\nfunction createBankAccount(initial) {\n  let balance = initial // private!\n  return {\n    deposit:    n => { balance += n },\n    withdraw:   n => { balance -= n },\n    getBalance: () => balance,\n  }\n}\n\nconst acc = createBankAccount(100)\nacc.deposit(50)\nacc.withdraw(30)\nconsole.log(acc.getBalance()) // 120',
  },
],
```

- [ ] **Step 5: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 6: Build check**

```bash
cd /home/jaywee92/web-dev-guide && npx vite build 2>&1 | tail -10
```

Expected: build succeeds.

- [ ] **Step 7: Verify in browser**

Open `http://localhost:5173/web-dev-guide/#/topic/js-closures`. Verify:
- Left column shows analogy panel below step dots; changes when clicking step blocks
- After Key Takeaways: Common Errors accordion with 3 cards, first open
- After Common Errors: In the Wild with 3 cards
- Playground: 3 tab buttons (Counter Factory, Memoization, Private State); clicking a tab resets editor to starter code

- [ ] **Step 8: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: fill js-closures with analogy, commonErrors, realWorldExamples, playgroundExamples"
```

---

## Task 9: Final TypeScript check and push

- [ ] **Step 1: Full TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 2: Production build**

```bash
cd /home/jaywee92/web-dev-guide && npx vite build 2>&1 | tail -15
```

Expected: build succeeds, no warnings about new code.

- [ ] **Step 3: Push**

```bash
git push
```
