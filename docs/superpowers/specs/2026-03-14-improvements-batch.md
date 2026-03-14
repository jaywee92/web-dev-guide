# Improvements Batch — Design Spec

**Date:** 2026-03-14
**Status:** Draft

## Overview

Seven improvements across four groups: quick fixes (nextTopicId chains, loading state, not-found page), performance & accessibility (keyboard nav, memoization), new JS/TS topic stubs, and a Cmd+K search modal. All UI text in English.

---

## Group A — Quick Fixes

### 1. nextTopicId chains

Each topic category already has an internal chain. The last topic in each category has no `nextTopicId`. Instead of cross-category linking, `NextTopicCard` renders a **"Category complete"** variant when no next topic exists.

**Current chain ends (no `nextTopicId`):** `html-media`, `css-animations`, `js-arrays`, `ts-generics`, `react-router`, `webapi-storage`, `http-status`, `postgres-crud`, `git-undo-stash`.

**`NextTopicCard` prop change:**
```tsx
// Before
interface Props { topic: Topic }

// After
interface Props {
  topic?: Topic          // next topic (undefined = last in category)
  currentTopic: Topic    // always provided — used for category label in fallback
}
```

When `topic` is undefined, render the **"Category complete"** variant:
- Checkmark icon in `currentTopic.color`
- Heading: "Category complete!"
- Subtext: "You've finished all [Category Name] topics." — category name derived from `CATEGORIES[currentTopic.category].label`
- Button: "← Back to Overview" (navigates to `/`)

In `TopicPage/index.tsx`, change from:
```tsx
{nextTopic && <NextTopicCard topic={nextTopic} />}
```
to:
```tsx
<NextTopicCard topic={nextTopic} currentTopic={topic} />
```

### 2. Animation loading state

While `AnimComp` is loading (state is `null` and `topic.animationComponent` is set), the animation panel shows a centered spinner:

- A `60px` ring (`border-radius: 50%`, `border: 2px solid ${topic.color}20`, `border-top-color: ${topic.color}`)
- CSS `@keyframes spin` animation, 1s linear infinite
- No text, no skeleton
- Disappears instantly when `AnimComp` resolves

Added to `TopicPage/index.tsx`: `isAnimLoading` state, set to `true` on topic change, `false` after `preloadAnimation` resolves.

### 3. "Topic not found" page

Rendered when `topic` is `undefined` in `TopicPage/index.tsx`. Uses the same page wrapper as the normal topic page but renders:

```
[large dimmed "404"]
Topic not found
We couldn't find the topic you're looking for.
[← Back to Overview  button]
```

Styled inline, no new component file. Matches app dark theme (`background: #07101a`, white text at 0.6 opacity).

---

## Group B — Performance & Accessibility

### 4. Keyboard navigation

Three targeted changes:

**`SyncExplanation.tsx` — Step dots:**
```tsx
<button
  tabIndex={0}
  aria-label={`Step ${i + 1}${ctrl.step === i ? ', current' : ''}`}
  aria-current={ctrl.step === i ? 'step' : undefined}
  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') ctrl.goTo(i) }}
/>
```

**`TopicSidebar.tsx` — Section toggles:**
```tsx
<button aria-expanded={isTechOpen} ...>
<button aria-expanded={isCatOpen} ...>
```

**`Navbar.tsx` — Reference dropdown:**
```tsx
// Add to useEffect:
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') setOpen(false)
}
// Add to button:
aria-expanded={open}
```

### 5. Memoization

**`CategoryGrid.tsx`:**
- Wrap `showTooltip`, `scheduleHide`, `cancelHide` in `useCallback`
- Pre-compute `techSections` with `useMemo` outside JSX

**`TopicSidebar.tsx`:**
- Wrap `TechSection` component definition in `React.memo`
- Wrap `buildTechSections()` result in `useMemo`

No state management library, no structural refactoring.

---

## Group C — New Topic Stubs (5 topics)

All stubs: complete data structure, English placeholder content, 3 steps minimum, no new animation components (reuse existing).

| Topic | ID | Category | Color | AnimComp |
|---|---|---|---|---|
| Functions & Scope | `js-functions` | JavaScript | `#fb923c` | `ClosureViz` |
| Promises & Async | `js-promises` | JavaScript | `#4ade80` | `AnimatedFlowViz` |
| Destructuring | `js-destructuring` | JavaScript | `#f472b6` | `VariablesViz` |
| Type Narrowing | `ts-narrowing` | TypeScript | `#818cf8` | `AnimatedFlowViz` |
| Utility Types | `ts-utility-types` | TypeScript | `#a78bfa` | `AnimatedFlowViz` |

**Stub structure per topic:**
- `title`, `description`, `color`, `estimatedMinutes` (10 as placeholder)
- `animationComponent`: reuse closest existing viz
- `bannerComponent`: omitted (fallback gradient shown)
- `sections`: one `intro` section with 3 placeholder steps in English
- `nextTopicId`: wired into existing JS/TS chains

**nextTopicId insertion points:**
- `js-arrays` → `js-functions` → `js-promises` → `js-destructuring` (end of JS chain)
- `ts-basics` → `ts-interfaces` → `ts-generics` → `ts-narrowing` → `ts-utility-types` (end of TS chain)

**Placeholder step format (English):**
```ts
{
  id: 'step-1',
  title: 'Coming soon',
  description: 'Detailed content for this step is being prepared.',
  animationStep: 0,
}
```

---

## Group D — Search Enhancements

`SearchPalette.tsx` (`src/components/ui/SearchPalette.tsx`) is already fully implemented:
- Cmd+K trigger in `Navbar.tsx` via `useAppStore.setSearchOpen`
- AnimatePresence modal with overlay, blur, input, results
- `useSearch` hook for live filtering (title + description, max 8)
- Escape to close, click overlay to close
- ⌘K badge in Navbar
- Empty state + suggestions

**Three enhancements only:**

**1. Keyboard ↑↓ navigation in results**

Add `activeIdx: number` state (default -1). On `↓`: increment (max results.length-1), on `↑`: decrement (min 0). On `Enter`: call `go(results[activeIdx].id)` if activeIdx ≥ 0. Reset `activeIdx` to -1 on query change. Active result gets `background: var(--surface-bright)` style.

**2. Category badge on each result**

Each result row: add a small colored dot + category label (e.g., "CSS", "JavaScript") in `var(--text-faint)` before the description line. Derive from `CATEGORIES[topic.category].label`.

**3. Match highlight**

Wrap matched substring in `<mark style={{ background: 'none', color: 'inherit', fontWeight: 700 }}>`. Applied to `topic.title` display only (not description). Use a `highlight(text, query)` helper that splits on match and wraps.

---

## Files Changed

| File | Change |
|---|---|
| `src/components/ui/NextTopicCard.tsx` | Add "category complete" fallback variant, change prop to `topic?: Topic` + `currentTopic: Topic` |
| `src/pages/TopicPage/index.tsx` | Loading state, not-found page, SearchModal state |
| `src/pages/TopicPage/SyncExplanation.tsx` | Keyboard nav on step dots |
| `src/components/layout/TopicSidebar.tsx` | aria-expanded + React.memo + useMemo |
| `src/components/layout/Navbar.tsx` | Cmd+K listener, aria-expanded, ⌘K badge, SearchModal |
| `src/components/ui/SearchPalette.tsx` | Enhance existing: keyboard ↑↓ nav, category badge, match highlight |
| `src/data/topics.ts` | 5 new topic stubs + nextTopicId fixes |
