# JS Beginner Features — Design Spec

**Date:** 2026-03-19
**Scope:** JavaScript category topics (12 topics across `javascript` and `javascript-oop` categories)
**Approach:** Smart Reuse — extend existing `Topic` type and `SyncExplanation` layout; no new routing or infrastructure

---

## 1. Goal

Make JavaScript topics more beginner-friendly by adding four enhancements:

- **A** Per-step analogies embedded in the existing How-it-Works animation column
- **B** Common Errors expandable panel (after Key Takeaways)
- **C** Real-World "In the Wild" section (after Common Errors)
- **D** Playground named example tabs with starter code

---

## 2. Data Model

### 2.1 New fields on `ExplanationStep`

```typescript
interface ExplanationStep {
  // existing fields ...
  animationStep: number
  heading: string
  text: string
  icon?: string
  codeExample?: string
  language?: string

  // NEW
  analogy?: {
    icon: string        // emoji, e.g. "🎒"
    title: string       // short label shown in analogy header, e.g. "Step 3 — Outer function returns"
    text: string[]      // 2–3 short paragraphs (plain text; inline <code> handled by renderer)
  }
}
```

### 2.2 New fields on `Topic`

```typescript
interface CommonError {
  title: string         // e.g. "var in Loops — all handlers share the same value"
  why: string           // 1–2 sentences explaining the root cause
  fixLabel: string      // e.g. "Fix — use let instead of var"
  fixCode: string       // corrected code snippet
}

interface RealWorldExample {
  context: string       // e.g. "React Hooks"
  heading: string       // e.g. "useState internals"
  description: string   // 1–2 sentences
  code: string          // code snippet
}

interface Topic {
  // existing fields ...

  // NEW
  commonErrors?: CommonError[]
  realWorldExamples?: RealWorldExample[]
}
```

### 2.3 Playground starter examples

The existing `playgroundType: 'monaco'` field is unchanged. A new optional field is added:

```typescript
interface Topic {
  playgroundExamples?: Array<{
    label: string    // tab label, e.g. "Counter Factory"
    code: string     // pre-filled starter code
  }>
}
```

---

## 3. Layout Changes — SyncExplanation

The left sticky column currently shows: Animation panel → Step dots.

**New layout (left column, still sticky):**

```
┌─────────────────────────┐
│   Animation panel       │  ~280px, unchanged
└─────────────────────────┘
  · · ● · ·   (step dots)
┌─────────────────────────┐
│  ANALOGIE badge + title │
│  🎒  text paragraph 1   │  ~160–200px, swaps per active step
│      text paragraph 2   │
└─────────────────────────┘
```

- The analogy panel has a 3px amber left-accent border and amber header gradient (matches accent color `#fbbf24`)
- Analogy content swaps when the active step changes (same trigger as step dots / scroll IntersectionObserver)
- If a step has no `analogy` field, the panel is hidden for that step
- Title in header is derived from `step.analogy.title`

---

## 4. New Components

### 4.1 `AnalogyPanel.tsx`

**Location:** `src/pages/TopicPage/AnalogyPanel.tsx`

Props:
```typescript
interface Props {
  analogy: ExplanationStep['analogy'] | undefined
  color: string   // topic color (unused visually — panel always uses amber)
}
```

Renders nothing when `analogy` is undefined (topic has no analogy for this step).

### 4.2 `CommonErrorsPanel.tsx`

**Location:** `src/pages/TopicPage/CommonErrorsPanel.tsx`

Props:
```typescript
interface Props {
  errors: CommonError[]
  color: string
}
```

Renders an expandable accordion. First item is open by default. Uses local `useState` for open/closed state per card.

### 4.3 `RealWorldPanel.tsx`

**Location:** `src/pages/TopicPage/RealWorldPanel.tsx`

Props:
```typescript
interface Props {
  examples: RealWorldExample[]
  color: string
}
```

Renders a 3-column CSS grid (collapses to 1 column on mobile). Each card shows: context tag, heading, description, code snippet.

---

## 5. TopicPage Wiring

Changes to `src/pages/TopicPage/index.tsx`:

- Pass `activeStep` state up from `SyncExplanation` (currently internal) so `AnalogyPanel` can receive it — or keep it internal and co-locate `AnalogyPanel` inside `SyncExplanation`'s left column
- After `<KeyTakeaways>`: render `<CommonErrorsPanel>` if `topic.commonErrors` is defined
- After `<CommonErrorsPanel>`: render `<RealWorldPanel>` if `topic.realWorldExamples` is defined

### Preferred option: co-locate AnalogyPanel inside SyncExplanation

`AnalogyPanel` needs the active step index, which is already managed by `useAnimationStep` inside `SyncExplanation`. Keeping it co-located avoids lifting state.

```tsx
// SyncExplanation.tsx — left column
<div style={{ position: 'sticky', top: 80 }}>
  <div onClick={ctrl.next} style={{ /* anim panel */ }}>
    {AnimComp && <AnimComp step={ctrl.step} />}
  </div>
  <StepDots steps={steps} current={ctrl.step} onGoTo={ctrl.goTo} color={topic.color} />
  <AnalogyPanel analogy={steps[ctrl.step]?.analogy} color={topic.color} />
</div>
```

---

## 6. Playground Named Tabs

Changes to `src/pages/TopicPage/PlaygroundSection.tsx`:

- If `topic.playgroundExamples` is defined and non-empty, render tab buttons above the Monaco editor
- Clicking a tab sets the editor content to `example.code`
- If no `playgroundExamples`, the playground renders exactly as today (no regression)

---

## 7. i18n

All new content fields (`analogy.text`, `commonErrors`, `realWorldExamples`, `playgroundExamples`) are stored directly in `src/data/topics.ts` (English). German translations are added to the corresponding `topics-js.json` locale file.

The existing pattern for i18n of topic content is: base data in `topics.ts` → overridden by `useTopic()` hook which merges locale translations. This pattern applies unchanged.

---

## 8. Scope & Phasing

**Phase 1 (this plan):** Infrastructure + Closures topic as pilot

1. Extend `ExplanationStep`, `Topic` types in `src/types/index.ts`
2. Build `AnalogyPanel`, `CommonErrorsPanel`, `RealWorldPanel` components
3. Wire into `SyncExplanation` and `TopicPage/index.tsx`
4. Update `PlaygroundSection` for named tabs
5. Fill `js-closures` topic with all new content (pilot)
6. TypeScript check

**Phase 2 (follow-up):** Fill remaining 11 JS topics with content data

---

## 9. Out of Scope

- CSS, HTML, React, TypeScript topics (not touched)
- New routing or URL parameters
- Backend / Supabase changes
- Mobile layout changes beyond what CSS grid already handles
- Animation changes to existing Viz components (analogies use emoji + text only, not SVG animation)
