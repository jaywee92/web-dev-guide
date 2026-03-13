# Topic Page Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the Topic page UX with five targeted changes: remove the redundant IntroAnimation, add a progress indicator to the header, make active steps use the topic's own color, add a Key Takeaways section, and replace sequential CheatSheet + Playground with a tab layout.

**Architecture:** All changes are contained in `src/pages/TopicPage/`. Two new small components are created (`KeyTakeaways.tsx`, `ContentTabs.tsx`). `TopicPage/index.tsx` is the main orchestrator — it gets the progress bar and switches to the tab layout. `SyncExplanation.tsx` gets the color fix. `TopicSidebar.tsx` drops the now-removed 'viz' anchor.

**Tech Stack:** React 19, TypeScript, Framer Motion (already installed), no new deps.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/pages/TopicPage/IntroAnimation.tsx` | DELETE usage (keep file) | No longer rendered |
| `src/pages/TopicPage/index.tsx` | MODIFY | Remove IntroAnimation, add progress bar, add ContentTabs |
| `src/pages/TopicPage/SyncExplanation.tsx` | MODIFY | Use `topic.color` for active step instead of `var(--blue)` |
| `src/pages/TopicPage/KeyTakeaways.tsx` | CREATE | Shows step headings as "what you learned" bullets |
| `src/pages/TopicPage/ContentTabs.tsx` | CREATE | Tab bar switching between CheatSheet and Playground |
| `src/components/layout/TopicSidebar.tsx` | MODIFY | Remove 'viz' anchor, rename 'explanation' to 'How it works' |

---

## Task 1: Remove IntroAnimation and drop the 'viz' anchor

**Files:**
- Modify: `src/pages/TopicPage/index.tsx`
- Modify: `src/components/layout/TopicSidebar.tsx`

**Context:** `IntroAnimation` is rendered at line 101–103 of `index.tsx` inside `<div id="viz">`. The sidebar has a `{ id: 'viz', label: 'Visualization' }` anchor link. Both must go together so the sidebar doesn't point at a missing element. The `AnimComp` state and `preloadAnimation` effect are still needed for `SyncExplanation` — do NOT remove those.

- [ ] **Step 1: Remove IntroAnimation from TopicPage/index.tsx**

In `src/pages/TopicPage/index.tsx`, delete the import and the entire `<div id="viz">` block:

```tsx
// REMOVE this import:
import IntroAnimation from './IntroAnimation'

// REMOVE this block (lines 101–103):
{/* Phase 1: Intro */}
<div id="viz" style={{ marginTop: 32 }}>
  <IntroAnimation AnimComp={AnimComp} />
</div>
```

The `<div id="explanation">` that follows should get `style={{ marginTop: 32 }}` so the spacing is preserved:
```tsx
<div id="explanation" style={{ marginTop: 32 }}>
  <SyncExplanation topic={topic} AnimComp={AnimComp} />
</div>
```

- [ ] **Step 2: Remove 'viz' anchor from TopicSidebar**

In `src/components/layout/TopicSidebar.tsx`, remove the `{ id: 'viz', label: 'Visualization' }` entry from `anchorLinks`:

```tsx
const anchorLinks: Array<{ id: string; label: string }> = [
  { id: 'intro', label: `What is ${topicTitle}?` },
  { id: 'explanation', label: 'How it works' },
  ...(hasCheatSheet ? [{ id: 'cheatsheet', label: 'Cheat Sheet' }] : []),
  ...(hasPlayground ? [{ id: 'playground', label: 'Playground' }] : []),
]
```

- [ ] **Step 3: Type-check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/TopicPage/index.tsx src/components/layout/TopicSidebar.tsx
git commit -m "feat: remove IntroAnimation — animation only shown in SyncExplanation"
```

---

## Task 2: Progress bar in topic header

**Files:**
- Modify: `src/pages/TopicPage/index.tsx`

**Context:** `topic.category` is a `CategoryId`. `getCategoryForTopic(topic.id)` already returns the category. `category.topicIds` is an ordered array. The topic's position is `category.topicIds.indexOf(topic.id) + 1`. `topic.estimatedMinutes` already exists on the type. The progress bar goes between the breadcrumb and the LevelBadge (before line ~77 in the current file, after the `<div id="intro">` opens).

- [ ] **Step 1: Add progress info to the intro header in `index.tsx`**

After the breadcrumb `<div>` and before `<LevelBadge ...>`, insert:

```tsx
{category && (() => {
  const pos = category.topicIds.indexOf(topic.id) + 1
  const total = category.topicIds.length
  const pct = (pos / total) * 100
  return (
    <div style={{ marginBottom: 16 }}>
      {/* Label row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 6,
      }}>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
          Topic {pos} of {total} in {category.title}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={11} /> {topic.estimatedMinutes} min
        </span>
      </div>
      {/* Progress bar */}
      <div style={{
        height: 3, borderRadius: 2,
        background: 'var(--surface-bright)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: 2,
          background: `linear-gradient(to right, ${topic.color}99, ${topic.color})`,
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  )
})()}
```

Add `Clock` to the existing lucide import at the top of `index.tsx`:
```tsx
import { ArrowLeft, ExternalLink, Clock } from 'lucide-react'
```

- [ ] **Step 2: Type-check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/TopicPage/index.tsx
git commit -m "feat: topic header progress bar — position N of M + estimated read time"
```

---

## Task 3: SyncExplanation — use topic color for active step

**Files:**
- Modify: `src/pages/TopicPage/SyncExplanation.tsx`

**Context:** `SyncExplanation` receives `topic` as a prop. Currently the active step uses `var(--blue)` in three places in `StepBlock`: the step-number circle background, the border, and the `borderLeft`. Replace all three with `topic.color`. The `StepBlock` already receives `active: boolean` and `onActivate`; it needs the color passed in too.

- [ ] **Step 1: Thread `color` through to StepBlock**

Change the `StepBlock` interface and calls to pass the topic color:

```tsx
function StepBlock({ step, index, active, onActivate, color }: {
  step: ExplanationStep
  index: number
  active: boolean
  onActivate: () => void
  color: string      // ← add this
}) {
```

In the render inside `SyncExplanation`, pass the color:
```tsx
{steps.map((step, i) => (
  <StepBlock
    key={step.heading}
    step={step}
    index={i}
    active={ctrl.step === i}
    onActivate={() => ctrl.goTo(i)}
    color={topic.color}    // ← add this
  />
))}
```

- [ ] **Step 2: Replace `var(--blue)` with `color` inside StepBlock**

Three replacements in the JSX of `StepBlock`:

```tsx
// borderLeft on the outer div:
borderLeft: `3px solid ${active ? color : 'transparent'}`,

// step-number circle:
background: active ? color : 'var(--surface-bright)',
border: `2px solid ${active ? color : 'var(--border)'}`,

// step dots in the nav bar (in SyncExplanation, not StepBlock):
background: ctrl.step === i ? topic.color : 'var(--border)',
```

Also fix the "Next" button in the nav bar to use `topic.color`:
```tsx
background: ctrl.step === steps.length - 1 ? 'var(--surface)' : topic.color,
border: `1px solid ${ctrl.step === steps.length - 1 ? 'var(--border)' : topic.color}`,
```

- [ ] **Step 3: Type-check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/TopicPage/SyncExplanation.tsx
git commit -m "feat: SyncExplanation active step uses topic color instead of hardcoded blue"
```

---

## Task 4: KeyTakeaways component

**Files:**
- Create: `src/pages/TopicPage/KeyTakeaways.tsx`
- Modify: `src/pages/TopicPage/index.tsx`

**Context:** Key Takeaways shows the step headings from the `explanation` section as a compact "what you learned" summary. It renders after `SyncExplanation` and before the tab section. Uses the topic color for the accent. Only renders if there are at least 2 steps.

- [ ] **Step 1: Create `src/pages/TopicPage/KeyTakeaways.tsx`**

```tsx
// src/pages/TopicPage/KeyTakeaways.tsx
import { CheckCircle2 } from 'lucide-react'
import type { Topic } from '@/types'

interface Props {
  topic: Topic
}

export default function KeyTakeaways({ topic }: Props) {
  const steps = topic.sections.find(s => s.type === 'explanation')?.steps ?? []
  if (steps.length < 2) return null

  return (
    <div style={{
      margin: '48px 0 0',
      padding: '20px 24px',
      borderRadius: 12,
      background: `${topic.color}08`,
      border: `1px solid ${topic.color}25`,
    }}>
      <div style={{
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        letterSpacing: '0.08em',
        color: topic.color,
        textTransform: 'uppercase',
        marginBottom: 14,
      }}>
        Key Takeaways
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {steps.map((step, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <CheckCircle2
              size={15}
              color={topic.color}
              style={{ flexShrink: 0, marginTop: 1, opacity: 0.8 }}
            />
            <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>{step.heading}</strong>
              {step.text ? ` — ${step.text.split('.')[0]}.` : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2: Wire into `index.tsx`**

Add import:
```tsx
import KeyTakeaways from './KeyTakeaways'
```

Add after the `<div id="explanation">` block:
```tsx
{/* Key Takeaways */}
<KeyTakeaways topic={topic} />
```

- [ ] **Step 3: Type-check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/TopicPage/KeyTakeaways.tsx src/pages/TopicPage/index.tsx
git commit -m "feat: KeyTakeaways section after explanation — step headings as bullet summary"
```

---

## Task 5: ContentTabs — CheatSheet + Playground as tabs

**Files:**
- Create: `src/pages/TopicPage/ContentTabs.tsx`
- Modify: `src/pages/TopicPage/index.tsx`
- Modify: `src/components/layout/TopicSidebar.tsx`

**Context:** Currently CheatSheet and Playground are sequential sections with large vertical spacing. Replace them with a tab bar. The tab bar has `CheatSheet` and `Playground` tabs, only showing tabs that exist (if neither exists, render nothing). The `id="cheatsheet"` and `id="playground"` anchor IDs move to the tab bar container so sidebar links still work — clicking them scrolls to the tab area AND activates that tab.

The tab component receives children mapped by label, plus the topic color for active tab styling.

- [ ] **Step 1: Create `src/pages/TopicPage/ContentTabs.tsx`**

```tsx
// src/pages/TopicPage/ContentTabs.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface Props {
  tabs: Tab[]
  color: string
  defaultTab?: string
}

export default function ContentTabs({ tabs, color, defaultTab }: Props) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? '')

  // Allow external scroll-to anchors to switch tab
  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash.slice(1)
      const match = tabs.find(t => t.id === hash)
      if (match) setActive(match.id)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [tabs])

  if (tabs.length === 0) return null

  const current = tabs.find(t => t.id === active) ?? tabs[0]

  return (
    <div style={{ marginTop: 48 }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border)',
        marginBottom: 32,
        gap: 4,
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderBottom: `2px solid ${active === tab.id ? color : 'transparent'}`,
              background: 'none',
              cursor: 'pointer',
              color: active === tab.id ? color : 'var(--text-muted)',
              fontSize: 14,
              fontWeight: active === tab.id ? 700 : 400,
              transition: 'all 0.15s',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {current.content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Replace sequential CheatSheet + Playground with ContentTabs in `index.tsx`**

Remove the existing separate blocks:
```tsx
// REMOVE:
{hasCheatSheet && (
  <div id="cheatsheet" style={{ marginTop: 48 }}>
    <h2 ...>Cheat Sheet</h2>
    <CheatSheet key={topic.id} data={topic.cheatSheet!} color={topic.color} />
  </div>
)}
{hasPlayground && (
  <div id="playground">
    <PlaygroundSection topic={topic} />
  </div>
)}
```

Replace with:
```tsx
{/* CheatSheet + Playground as tabs */}
{(hasCheatSheet || hasPlayground) && (
  <ContentTabs
    color={topic.color}
    tabs={[
      ...(hasCheatSheet ? [{
        id: 'cheatsheet',
        label: 'Cheat Sheet',
        content: <CheatSheet key={topic.id} data={topic.cheatSheet!} color={topic.color} />,
      }] : []),
      ...(hasPlayground ? [{
        id: 'playground',
        label: 'Playground',
        content: <PlaygroundSection topic={topic} />,
      }] : []),
    ]}
  />
)}
```

Add the import:
```tsx
import ContentTabs from './ContentTabs'
```

- [ ] **Step 3: Update sidebar anchor click to switch tab + scroll**

In `src/components/layout/TopicSidebar.tsx`, the `scrollToSection` function currently calls `el.scrollIntoView`. For the tab IDs (`cheatsheet`, `playground`), the element is now the tab *button* inside `ContentTabs`. Clicking the tab button and scrolling to it is correct behavior — no change needed in the sidebar since `id={tab.id}` is set on the tab button element itself.

Verify the anchor links are still correct (cheatsheet and playground IDs exist as button IDs):
```tsx
// These are already correct in anchorLinks, no change needed:
...(hasCheatSheet ? [{ id: 'cheatsheet', label: 'Cheat Sheet' }] : []),
...(hasPlayground ? [{ id: 'playground', label: 'Playground' }] : []),
```

- [ ] **Step 4: Type-check + build**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```

```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -5
```

Expected: both pass with no errors.

- [ ] **Step 5: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/TopicPage/ContentTabs.tsx src/pages/TopicPage/index.tsx
git commit -m "feat: CheatSheet + Playground as ContentTabs — tab layout replaces sequential scroll"
```

---

## Final verification

- [ ] Open any topic (e.g. `/topic/css-box-model`) — no intro animation, progress bar visible
- [ ] Progress bar shows correct position (e.g. "Topic 4 of 8 in CSS Basics")
- [ ] Active step uses topic color (green for HTML, blue for CSS, yellow for JS)
- [ ] Key Takeaways box appears after explanation steps
- [ ] Cheat Sheet and Playground appear as tabs — switching works
- [ ] Sidebar "Cheat Sheet" link scrolls to and activates the Cheat Sheet tab
- [ ] Run `npm run build` — must succeed
