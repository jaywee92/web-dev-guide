# Improvements Batch Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Seven improvements: "category complete" card, animation loading spinner, styled 404 page, keyboard navigation, memoization, 5 new topic stubs, and SearchPalette enhancements.

**Architecture:** Four independent groups executed sequentially. Groups A and B touch existing files surgically. Group C adds new data entries only. Group D enhances one existing component.

**Tech Stack:** React, TypeScript, Framer Motion, Lucide React, Zustand

---

## Chunk 1: Group A — Quick Fixes

### Task 1: NextTopicCard "category complete" variant

**Files:**
- Modify: `src/components/ui/NextTopicCard.tsx`
- Modify: `src/pages/TopicPage/index.tsx:186-190`

**Context:** `NextTopicCard` currently requires `topic: Topic` and is only rendered when `nextTopic` exists (`{nextTopic && <NextTopicCard topic={nextTopic} />}`). We change it to always render, showing a "category complete" card when `topic` is undefined.

The `TopicPage` already has `category` (from `getCategoryForTopic`) and `topic` in scope, so the call site becomes `<NextTopicCard topic={nextTopic} currentTopic={topic} />`.

- [ ] **Step 1: Update `NextTopicCard.tsx`**

Replace the entire file content:

```tsx
import { motion } from 'framer-motion'
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Topic } from '@/types'
import { getCategoryForTopic } from '@/data/categories'

interface Props {
  topic?: Topic
  currentTopic: Topic
}

export default function NextTopicCard({ topic, currentTopic }: Props) {
  const navigate = useNavigate()
  const category = getCategoryForTopic(currentTopic.id)

  if (!topic) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{
          marginTop: 64,
          padding: '28px 32px',
          borderRadius: 'var(--radius)',
          border: `1px solid ${currentTopic.color}33`,
          background: `linear-gradient(135deg, ${currentTopic.color}08 0%, transparent 60%)`,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <CheckCircle2 size={36} color={currentTopic.color} style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginBottom: 6 }}>
            Category complete!
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            You've finished all {category?.title ?? 'category'} topics.
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: 8,
              fontSize: 13,
              fontFamily: 'var(--font-mono)',
              color: currentTopic.color,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ← Back to Overview
          </button>
        </div>
      </motion.div>
    )
  }

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

- [ ] **Step 2: Update call site in `TopicPage/index.tsx`**

Find lines 186–190:
```tsx
      {nextTopic && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
          <NextTopicCard topic={nextTopic} />
        </div>
      )}
```

Replace with:
```tsx
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <NextTopicCard topic={nextTopic} currentTopic={topic} />
      </div>
```

- [ ] **Step 3: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```
Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/NextTopicCard.tsx src/pages/TopicPage/index.tsx
git commit -m "feat: NextTopicCard category-complete fallback when no next topic"
```

---

### Task 2: Animation loading state + styled 404 page

**Files:**
- Modify: `src/pages/TopicPage/index.tsx`
- Modify: `src/pages/TopicPage/SyncExplanation.tsx:44-48`

**Context:** Currently when `AnimComp` is null, `SyncExplanation` renders a plain `"Animation"` text. `TopicPage` shows unstyled `"Topic not found."` text. Both need improvement.

The loading state lives in `SyncExplanation` (it receives `AnimComp` prop). Add an `isLoading` signal: pass `animLoading` prop. In `TopicPage`, `animLoading` is true from topic mount until `preloadAnimation` resolves.

- [ ] **Step 1: Add `animLoading` state to `TopicPage/index.tsx`**

After the existing `AnimComp` state (line 23):
```tsx
const [animLoading, setAnimLoading] = useState<boolean>(() => {
  // True when component is NOT yet in cache (null = not loaded yet)
  return topic ? getAnimationComponent(topic.animationComponent) === null : false
})
```

Modify the existing `preloadAnimation` effect (lines 27–32) to set loading state:
```tsx
useEffect(() => {
  if (!topic) return
  setAnimLoading(getAnimationComponent(topic.animationComponent) === null)
  preloadAnimation(topic.animationComponent).then(() => {
    setAnimComp(() => getAnimationComponent(topic.animationComponent))
    setAnimLoading(false)
  })
}, [topic?.animationComponent])
```

Pass to `SyncExplanation`:
```tsx
<SyncExplanation topic={topic} AnimComp={AnimComp} animLoading={animLoading} />
```

- [ ] **Step 2: Update `SyncExplanation.tsx` to accept and use `animLoading`**

Add `animLoading?: boolean` to the `Props` interface:
```tsx
interface Props {
  topic: Topic
  AnimComp: ComponentType<{ step: number; compact?: boolean }> | null
  animLoading?: boolean
}
```

Replace the animation panel fallback (lines 44–48):
```tsx
{/* Before: */}
{AnimComp
  ? <AnimComp step={ctrl.step} />
  : <span style={{ color: 'var(--text-muted)' }}>Animation</span>
}

{/* After: */}
{AnimComp ? (
  <AnimComp step={ctrl.step} />
) : animLoading ? (
  <div style={{
    width: 60, height: 60, borderRadius: '50%',
    border: `2px solid ${topic.color}20`,
    borderTopColor: topic.color,
    animation: 'spin 1s linear infinite',
  }} />
) : null}
```

Wrap the return in a fragment and add a `<style>` tag at the top of the JSX output:

```tsx
<>
  <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
  <section ...>
    ...
  </section>
</>
```

Note: the `<style>` tag goes at the top level of the existing return fragment — do not nest it inside the animation panel div.

- [ ] **Step 3: Replace the "Topic not found" page in `TopicPage/index.tsx`**

Note: `PageWrapper` is already imported at the top of `TopicPage/index.tsx` — no new import needed.

Find lines 45–47:
```tsx
  if (!topic) {
    return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Topic not found.</div>
  }
```

Replace with:
```tsx
  if (!topic) {
    return (
      <PageWrapper>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: 'calc(100vh - 60px)', gap: 16, textAlign: 'center', padding: 40,
        }}>
          <div style={{ fontSize: 72, fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', lineHeight: 1 }}>
            404
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            Topic not found
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
            We couldn't find the topic you're looking for.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: 8, padding: '9px 20px',
              borderRadius: 8, border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text)',
              fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-mono)',
            }}
          >
            ← Back to Overview
          </button>
        </div>
      </PageWrapper>
    )
  }
```

- [ ] **Step 4: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```
Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/TopicPage/index.tsx src/pages/TopicPage/SyncExplanation.tsx
git commit -m "feat: animation loading spinner + styled 404 topic-not-found page"
```

---

## Chunk 2: Group B — Performance & Accessibility

### Task 3: Keyboard navigation

**Files:**
- Modify: `src/pages/TopicPage/SyncExplanation.tsx:53-69` (step dots)
- Modify: `src/components/layout/TopicSidebar.tsx:98-136` (tech toggles) + `:149-176` (cat toggles)
- Modify: `src/components/layout/Navbar.tsx:24-32` (escape key for reference dropdown)

- [ ] **Step 1: Add keyboard support to step dots in `SyncExplanation.tsx`**

Find the step dot buttons (lines 53–69). Add `tabIndex`, `aria-label`, `aria-current`, and `onKeyDown` to each dot button:

```tsx
{steps.map((_, i) => (
  <button
    key={i}
    onClick={() => ctrl.goTo(i)}
    tabIndex={0}
    aria-label={`Step ${i + 1}${ctrl.step === i ? ', current' : ''}`}
    aria-current={ctrl.step === i ? 'step' : undefined}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        ctrl.goTo(i)
      }
    }}
    title={`Step ${i + 1}`}
    style={{
      width: ctrl.step === i ? 24 : 8,
      height: 8,
      borderRadius: 4,
      background: ctrl.step === i ? topic.color : 'var(--border)',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      transition: 'all 0.25s',
    }}
  />
))}
```

- [ ] **Step 2: Add `aria-expanded` to tech group toggles in `TopicSidebar.tsx`**

Find the tech group toggle button (line 98). Add `aria-expanded`:
```tsx
<button
  onClick={() => toggleTech(techKey)}
  aria-expanded={isTechOpen}
  style={{ ... }}
>
```

- [ ] **Step 3: Add `aria-expanded` to category toggles in `TopicSidebar.tsx`**

Find the category toggle button (line 149). Add `aria-expanded`:
```tsx
<button
  onClick={() => toggleCat(cat.id)}
  aria-expanded={isCatOpen}
  style={{ ... }}
>
```

- [ ] **Step 4: Add Escape key handler to Reference dropdown in `Navbar.tsx`**

Find the existing mousedown `useEffect` (lines 24–32). Add a second `useEffect` for Escape:

```tsx
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setRefOpen(false)
  }
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}, [])
```

Also add `aria-expanded` to the Reference button:
```tsx
<button
  onClick={() => setRefOpen(o => !o)}
  aria-expanded={refOpen}
  style={{ ... }}
>
```

- [ ] **Step 5: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```
Expected: zero errors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/TopicPage/SyncExplanation.tsx src/components/layout/TopicSidebar.tsx src/components/layout/Navbar.tsx
git commit -m "feat: keyboard nav — step dots tabIndex/aria, sidebar aria-expanded, navbar Escape"
```

---

### Task 4: Memoization

**Files:**
- Modify: `src/pages/Home/CategoryGrid.tsx`
- Modify: `src/components/layout/TopicSidebar.tsx`

**Context:** `CategoryGrid` recreates `showTooltip`/`scheduleHide`/`cancelHide` handlers on every render. `TopicSidebar` re-runs `buildTechSections()` on every render (though it's module-level already — see Step 2).

- [ ] **Step 1: Read `CategoryGrid.tsx` fully to find tooltip handlers**

```bash
grep -n "showTooltip\|scheduleHide\|cancelHide\|onCardHover\|onCardLeave\|useCallback\|useMemo" /home/jaywee92/web-dev-guide/src/pages/Home/CategoryGrid.tsx
```

- [ ] **Step 2: Add `useCallback` to tooltip handlers in `CategoryGrid.tsx`**

First read the file to find the exact current bodies of `showTooltip`, `scheduleHide`, and `cancelHide`:

```bash
grep -n "showTooltip\|scheduleHide\|cancelHide" /home/jaywee92/web-dev-guide/src/pages/Home/CategoryGrid.tsx
cat /home/jaywee92/web-dev-guide/src/pages/Home/CategoryGrid.tsx
```

Then add `useCallback` (and `useMemo`) to the import at the top. Wrap each handler with `useCallback`, preserving the existing body verbatim. The pattern — fill in actual bodies from the file:

```tsx
import { ..., useCallback, useMemo } from 'react'

// Inside the component — wrap existing bodies:
const showTooltip = useCallback((cat: Category, rect: DOMRect) => {
  // PASTE exact existing body here
}, [])

const scheduleHide = useCallback(() => {
  // PASTE exact existing body here
}, [])

const cancelHide = useCallback(() => {
  // PASTE exact existing body here
}, [])
```

Deps arrays are `[]` because these handlers only reference `setTooltip`/`hideTimeout` refs/state setters which are stable across renders.

Also wrap `deriveTechSections` calls in `useMemo` if called inside the render function:
```tsx
// For each CATEGORY_GROUP's techSections derivation inside JSX, lift to useMemo:
const allTechSections = useMemo(() =>
  CATEGORY_GROUPS.map(group => ({
    group,
    techSections: deriveTechSections(group.categoryIds as CategoryId[]),
  })),
  []
)
```

- [ ] **Step 3: Wrap `TechSection` in `React.memo` in `CategoryGrid.tsx`**

Find the `TechSection` function definition and wrap it:

```tsx
const TechSection = React.memo(function TechSection({
  techKey, categories, globalIndex,
  galaxyRef, trailRef,
  onCardHover, onCardLeave,
}: TechSectionProps) {
  // ... existing body unchanged
})
```

Add `React` as a named import to the existing import statement — change the first line from:
```tsx
import { ... } from 'react'
```
to:
```tsx
import React, { ... } from 'react'
```
(Keep all other existing named imports.)

- [ ] **Step 4: Verify `TopicSidebar.tsx` — no changes needed**

First confirm `TopicSidebar.tsx` has no inline component that needs memoizing:

```bash
grep -n "function.*Section\|React.memo\|^const.*= function\|^function " /home/jaywee92/web-dev-guide/src/components/layout/TopicSidebar.tsx
```

Expected: no inline sub-components named `TechSection` or similar. If any are found, wrap them in `React.memo` before continuing.

Then confirm `buildTechSections` is module-level:
```bash
grep -n "buildTechSections\|TECH_SECTIONS" /home/jaywee92/web-dev-guide/src/components/layout/TopicSidebar.tsx
```

Expected: `const TECH_SECTIONS = buildTechSections()` at module scope (outside any component function). This is already a module-level constant — called once at import time. No change needed.

Note: The spec mentions `React.memo` for `TechSection` and `useMemo` for `buildTechSections()` in `TopicSidebar.tsx` — these are satisfied in `CategoryGrid.tsx` (where `TechSection` actually lives) and by the module-level constant respectively. Both spec items are addressed without modification to `TopicSidebar.tsx`.

- [ ] **Step 5: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```
Expected: zero errors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home/CategoryGrid.tsx
git commit -m "perf: useCallback for tooltip handlers + React.memo on TechSection in CategoryGrid"
```

---

## Chunk 3: Group C — New Topic Stubs

### Task 5: Add 5 new topic stubs + wire all JS/TS/React/HTTP/PostgreSQL/WebAPI nextTopicId chains

**Files:**
- Modify: `src/data/topics.ts`

**Context:** All JS, TS, React, WebAPI, HTTP, PostgreSQL categories have no `nextTopicId` on their topics (only HTML/CSS/Git have it wired). This task: (1) wire existing chains with `nextTopicId`, (2) append 5 new stub topics.

Note on step content format: the plan uses `heading`/`text`/`codeExample`/`language` fields per step (matching the actual Topic data model) rather than the simplified `id`/`title`/`description` placeholder format shown in the spec. The plan's format is correct for the TypeScript type system.

**Existing topic IDs by category (for chain wiring):**

JavaScript: `js-event-loop` → `js-closures` → `js-variables` → `js-arrays`
TypeScript: `ts-basics` → `ts-interfaces` → `ts-generics`
React: `react-components` → `react-state` → `react-useeffect` → `react-router`
Web APIs: `webapi-fetch` → `webapi-events` → `webapi-storage`
HTTP: `http-request-cycle` → `http-rest` → `http-status`
PostgreSQL: `postgres-queries` → `postgres-joins` → `postgres-crud`

**New topics to append (after `js-arrays` and `ts-generics` respectively):**

```
js-arrays → js-functions → js-promises → js-destructuring (end)
ts-generics → ts-narrowing → ts-utility-types (end)
```

- [ ] **Step 1: Wire `nextTopicId` into existing JS topics**

Note: Git topics already have `nextTopicId` wired — no Git changes needed here.

In `src/data/topics.ts`, find each JS topic object and add `nextTopicId` to it (position within the object doesn't matter):

- `js-event-loop`: add `nextTopicId: 'js-closures',`
- `js-closures`: add `nextTopicId: 'js-variables',`
- `js-variables`: add `nextTopicId: 'js-arrays',`
- `js-arrays`: add `nextTopicId: 'js-functions',`

- [ ] **Step 2: Wire `nextTopicId` into existing TS topics**

In `src/data/topics.ts`, find each TS topic object and add `nextTopicId` to it:

- `ts-basics`: add `nextTopicId: 'ts-interfaces',`
- `ts-interfaces`: add `nextTopicId: 'ts-generics',`
- `ts-generics`: add `nextTopicId: 'ts-narrowing',`

- [ ] **Step 3: Wire `nextTopicId` into existing React topics**

- `react-components`: add `nextTopicId: 'react-state',`
- `react-state`: add `nextTopicId: 'react-useeffect',`
- `react-useeffect`: add `nextTopicId: 'react-router',`
(react-router is chain end — no nextTopicId)

- [ ] **Step 4: Wire `nextTopicId` into existing WebAPI, HTTP, PostgreSQL topics**

WebAPI:
- `webapi-fetch`: add `nextTopicId: 'webapi-events',`
- `webapi-events`: add `nextTopicId: 'webapi-storage',`
(webapi-storage is chain end)

HTTP:
- `http-request-cycle`: add `nextTopicId: 'http-rest',`
- `http-rest`: add `nextTopicId: 'http-status',`
(http-status is chain end)

PostgreSQL:
- `postgres-queries`: add `nextTopicId: 'postgres-joins',`
- `postgres-joins`: add `nextTopicId: 'postgres-crud',`
(postgres-crud is chain end)

- [ ] **Step 5: Record baseline topic count before edits**

```bash
grep -c "^  {$" /home/jaywee92/web-dev-guide/src/data/topics.ts
```
Expected: 54. Record this number — it will be used in Step 12 to verify 5 topics were added. If the result is not 54, note the actual number and adjust Step 12 accordingly (expected = baseline + 5).

- [ ] **Step 6: Append `js-functions` stub topic after `js-arrays` in `src/data/topics.ts`**

After the closing `},` of the `js-arrays` topic object, insert:

Note on `animationComponent` values — first verify `AnimatedFlowViz` is not in the registry:

```bash
grep -r "AnimatedFlowViz" /home/jaywee92/web-dev-guide/src/
```

Expected: no matches. If it does exist, use `AnimatedFlowViz` instead of the substitutions below for `js-promises`, `ts-narrowing`, and `ts-utility-types`.

Substitutions used across all 5 stubs (assuming `AnimatedFlowViz` is not registered):
- `js-functions` → `ClosureViz` (function scope context)
- `js-promises` → `EventLoopViz` (async/event loop context)
- `js-destructuring` → `VariablesViz` (variable binding context)
- `ts-narrowing` → `VariablesViz` (type variable context)
- `ts-utility-types` → `ClosureViz` (type transformation context)

```ts
  {
    id: 'js-functions',
    title: 'Functions & Scope',
    description: 'How functions create scope, closures, and encapsulate reusable logic',
    category: 'javascript',
    color: '#fb923c',
    estimatedMinutes: 10,
    animationComponent: 'ClosureViz',
    playgroundType: 'monaco',
    nextTopicId: 'js-promises',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'Function declarations vs expressions',
            text: 'Functions can be declared with the function keyword or assigned as expressions. Declarations are hoisted; expressions are not.',
            codeExample: '// Declaration — hoisted\nfunction greet(name: string) {\n  return `Hello, ${name}`\n}\n\n// Expression — not hoisted\nconst greet = (name: string) => `Hello, ${name}`',
            language: 'javascript',
          },
          {
            animationStep: 1,
            heading: 'Scope and the scope chain',
            text: 'Each function creates a new scope. Inner functions can access variables from outer scopes — this chain of scopes is called the scope chain.',
            codeExample: 'const outer = "I am outer"\n\nfunction inner() {\n  console.log(outer) // accessible via scope chain\n}\n\ninner() // "I am outer"',
            language: 'javascript',
          },
          {
            animationStep: 2,
            heading: 'Higher-order functions',
            text: 'Functions are first-class values in JavaScript. A higher-order function takes a function as argument or returns one.',
            codeExample: 'const double = (n: number) => n * 2\n\n// map is a higher-order function\nconst result = [1, 2, 3].map(double)\n// [2, 4, 6]',
            language: 'javascript',
          },
        ],
      },
    ],
  },
```

- [ ] **Step 7: Append `js-promises` stub topic**

After `js-functions`, insert:

```ts
  {
    id: 'js-promises',
    title: 'Promises & Async/Await',
    description: 'Handle asynchronous operations elegantly with Promises and async/await syntax',
    category: 'javascript',
    color: '#4ade80',
    estimatedMinutes: 12,
    animationComponent: 'EventLoopViz',
    playgroundType: 'monaco',
    nextTopicId: 'js-destructuring',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'What is a Promise?',
            text: 'A Promise represents a value that will be available in the future. It can be pending, fulfilled, or rejected.',
            codeExample: 'const p = new Promise<string>((resolve, reject) => {\n  setTimeout(() => resolve("done!"), 1000)\n})\n\np.then(val => console.log(val)) // "done!" after 1s',
            language: 'javascript',
          },
          {
            animationStep: 1,
            heading: 'Chaining with .then()',
            text: 'Promises can be chained: each .then() receives the previous result and returns a new Promise.',
            codeExample: 'fetch("/api/user")\n  .then(res => res.json())\n  .then(user => console.log(user.name))\n  .catch(err => console.error(err))',
            language: 'javascript',
          },
          {
            animationStep: 2,
            heading: 'async/await syntax',
            text: 'async/await is syntactic sugar over Promises. An async function always returns a Promise; await pauses execution until the Promise settles.',
            codeExample: 'async function getUser(id: number) {\n  const res = await fetch(`/api/users/${id}`)\n  if (!res.ok) throw new Error("Not found")\n  return res.json()\n}\n\nconst user = await getUser(1)',
            language: 'typescript',
          },
        ],
      },
    ],
  },
```

- [ ] **Step 8: Append `js-destructuring` stub topic**

After `js-promises`, insert:

```ts
  {
    id: 'js-destructuring',
    title: 'Destructuring & Spread',
    description: 'Extract values from arrays and objects with concise destructuring syntax',
    category: 'javascript',
    color: '#f472b6',
    estimatedMinutes: 8,
    animationComponent: 'VariablesViz',
    playgroundType: 'monaco',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'Array destructuring',
            text: 'Extract values from an array by position. Use _ or skip commas to skip elements.',
            codeExample: 'const [first, second, , fourth] = [1, 2, 3, 4]\nconsole.log(first)  // 1\nconsole.log(fourth) // 4\n\n// With default values\nconst [a = 10, b = 20] = [5]\nconsole.log(a) // 5\nconsole.log(b) // 20',
            language: 'javascript',
          },
          {
            animationStep: 1,
            heading: 'Object destructuring',
            text: 'Extract properties from an object by name. You can rename while destructuring and set defaults.',
            codeExample: 'const { name, age = 0, role: userRole } = { name: "Alice", role: "admin" }\nconsole.log(name)     // "Alice"\nconsole.log(age)      // 0 (default)\nconsole.log(userRole) // "admin"',
            language: 'javascript',
          },
          {
            animationStep: 2,
            heading: 'Spread and rest',
            text: 'The spread operator (...) expands iterables. Rest syntax collects remaining elements into an array.',
            codeExample: '// Spread: copy/merge arrays and objects\nconst a = [1, 2, 3]\nconst b = [...a, 4, 5] // [1, 2, 3, 4, 5]\n\n// Rest: collect remaining args\nfunction sum(first: number, ...rest: number[]) {\n  return rest.reduce((acc, n) => acc + n, first)\n}',
            language: 'typescript',
          },
        ],
      },
    ],
  },
```

- [ ] **Step 9: Append `ts-narrowing` stub topic after `ts-generics`**

Find the closing `},` of the `ts-generics` topic and after it insert:

```ts
  {
    id: 'ts-narrowing',
    title: 'Type Narrowing',
    description: 'Refine broad types to specific ones using type guards and control flow analysis',
    category: 'typescript',
    color: '#818cf8',
    estimatedMinutes: 10,
    animationComponent: 'VariablesViz',
    playgroundType: 'monaco',
    nextTopicId: 'ts-utility-types',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'typeof and instanceof guards',
            text: 'TypeScript narrows types inside conditional blocks. After typeof check, the type is refined automatically.',
            codeExample: 'function format(val: string | number) {\n  if (typeof val === "string") {\n    return val.toUpperCase() // string here\n  }\n  return val.toFixed(2)    // number here\n}',
            language: 'typescript',
          },
          {
            animationStep: 1,
            heading: 'Discriminated unions',
            text: 'A discriminated union uses a shared literal property to distinguish between types. TypeScript narrows based on that field.',
            codeExample: 'type Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "rect"; width: number; height: number }\n\nfunction area(s: Shape) {\n  if (s.kind === "circle") return Math.PI * s.radius ** 2\n  return s.width * s.height\n}',
            language: 'typescript',
          },
          {
            animationStep: 2,
            heading: 'Custom type guards',
            text: 'A type predicate function (x is T) tells TypeScript the exact narrowed type when the function returns true.',
            codeExample: 'function isString(val: unknown): val is string {\n  return typeof val === "string"\n}\n\nif (isString(input)) {\n  console.log(input.length) // string here\n}',
            language: 'typescript',
          },
        ],
      },
    ],
  },
```

- [ ] **Step 10: Append `ts-utility-types` stub topic**

After `ts-narrowing`, insert:

```ts
  {
    id: 'ts-utility-types',
    title: 'Utility Types',
    description: 'Built-in TypeScript types that transform and derive new types from existing ones',
    category: 'typescript',
    color: '#a78bfa',
    estimatedMinutes: 10,
    animationComponent: 'ClosureViz',
    playgroundType: 'monaco',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'Partial and Required',
            text: 'Partial<T> makes all properties optional. Required<T> makes all properties required. Both derive a new type from an existing interface.',
            codeExample: 'interface User { id: number; name: string; email: string }\n\ntype UserDraft = Partial<User>\n// { id?: number; name?: string; email?: string }\n\ntype StrictUser = Required<UserDraft>\n// { id: number; name: string; email: string }',
            language: 'typescript',
          },
          {
            animationStep: 1,
            heading: 'Pick and Omit',
            text: 'Pick<T, K> keeps only the listed keys. Omit<T, K> removes the listed keys. Both create a subset type.',
            codeExample: 'type UserPreview = Pick<User, "id" | "name">\n// { id: number; name: string }\n\ntype PublicUser = Omit<User, "email">\n// { id: number; name: string }',
            language: 'typescript',
          },
          {
            animationStep: 2,
            heading: 'Record, Readonly, and ReturnType',
            text: 'Record<K, V> creates an object type with keys K and values V. Readonly<T> prevents mutation. ReturnType<F> extracts a function\'s return type.',
            codeExample: 'type Scores = Record<string, number>\n// { [key: string]: number }\n\nconst config: Readonly<User> = { id: 1, name: "Alice", email: "a@b.com" }\n// config.id = 2 // Error: readonly\n\nfunction getUser() { return { id: 1, name: "Alice" } }\ntype User2 = ReturnType<typeof getUser>\n// { id: number; name: string }',
            language: 'typescript',
          },
        ],
      },
    ],
  },
```

- [ ] **Step 11: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```
Expected: zero errors.

- [ ] **Step 12: Verify topic counts**

```bash
grep -c "^  {$" /home/jaywee92/web-dev-guide/src/data/topics.ts
```

Should equal baseline (from Step 5) + 5. If baseline was 54, expect 59. If it doesn't match, use `grep -n "js-functions\|js-promises\|js-destructuring\|ts-narrowing\|ts-utility-types" src/data/topics.ts` to confirm all 5 IDs are present.

- [ ] **Step 13: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: wire nextTopicId chains (JS/TS/React/HTTP/PG/WebAPI) + 5 new topic stubs"
```

---

## Chunk 4: Group D — SearchPalette Enhancements

### Task 6: Keyboard navigation + category badge + match highlight in SearchPalette

**Files:**
- Modify: `src/components/ui/SearchPalette.tsx`

**Context:** `SearchPalette.tsx` is already fully implemented with AnimatePresence, `useSearch`, Escape key, and overlay click. Three enhancements: (1) `activeIdx` state for ↑↓ keyboard nav, (2) category badge on each result row, (3) match highlighting on the title.

Read `src/data/categories.ts` to find how to get a category's label from `CategoryId`.

- [ ] **Step 1: Read `SearchPalette.tsx` and `src/data/categories.ts`**

Read both files fully. In `categories.ts`, confirm:
- `CATEGORIES` is an array of `Category` objects exported as a named export
- Each `Category` entry has a `.title` field (e.g., `"HTML Basics"`, `"JavaScript"`) — this is what the badge will display
- `category.id` on a topic (e.g., `"javascript"`) matches the `id` field on `CATEGORIES` entries

Expected: `CATEGORIES.find(c => c.id === topic.category)?.title` will return the display label.

- [ ] **Step 2: Add `activeIdx` state and keyboard handler**

In `SearchPalette.tsx`, add after the existing state:

```tsx
const [activeIdx, setActiveIdx] = useState(-1)
```

Reset on query change:
```tsx
useEffect(() => { setActiveIdx(-1) }, [query])
```

Add keyboard handler for ↑↓ Enter inside the existing `searchOpen` effect or as a separate `useEffect`:
```tsx
useEffect(() => {
  const h = (e: KeyboardEvent) => {
    if (!searchOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      go(results[activeIdx].id)
    }
  }
  window.addEventListener('keydown', h)
  return () => window.removeEventListener('keydown', h)
}, [searchOpen, results, activeIdx, go])
```

Note: wrap `go` in `useCallback` to include it as a stable dependency:
```tsx
const go = useCallback((topicId: string) => {
  navigate(`/topic/${topicId}`)
  setSearchOpen(false)
}, [navigate, setSearchOpen])
```

- [ ] **Step 3: Add category badge to each result row**

Add import: `import { CATEGORIES } from '@/data/categories'`

In the results `.map((topic, i) => ...)` callback, declare a local variable and render the badge above the title div:
```tsx
const cat = CATEGORIES.find(c => c.id === topic.category)
// ... then in JSX, above the title div:
{cat && (
  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: cat.color, marginBottom: 3, opacity: 0.8 }}>
    {cat.title}
  </div>
)}
```

Note: `cat.title` is the correct field — `Category` entries use `.title` (e.g., `"JavaScript"`, `"HTML Basics"`). There is no `.label` field on `Category`.

- [ ] **Step 4: Add match highlight helper and apply to title**

Add a helper function above the component:

```tsx
function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'none', color: 'inherit', fontWeight: 700 }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}
```

Apply to the title display:
```tsx
{/* Before: */}
<div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
  {topic.title}
</div>

{/* After: */}
<div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
  {highlight(topic.title, query)}
</div>
```

- [ ] **Step 5: Apply active highlight to result rows**

In the results map, apply active background via `activeIdx` state (state-driven render, no inline mutation):
```tsx
<button
  key={topic.id}
  onClick={() => go(topic.id)}
  onMouseEnter={() => setActiveIdx(i)}
  style={{
    ...,
    background: activeIdx === i ? 'var(--surface-bright)' : 'none',
  }}
>
```

Note: do NOT add `onMouseLeave` style mutation — the re-render triggered by `setActiveIdx` on `onMouseEnter` will handle background changes correctly without stale-closure bugs. The `i` is the map index — make sure `.map((topic, i) => ...)` has the index parameter.

- [ ] **Step 6: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```
Expected: zero errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/SearchPalette.tsx
git commit -m "feat: SearchPalette — keyboard nav (↑↓ Enter), category badge, match highlight"
```

---

## Final Step

- [ ] **Push to remote**

```bash
cd /home/jaywee92/web-dev-guide && git push origin main
```
