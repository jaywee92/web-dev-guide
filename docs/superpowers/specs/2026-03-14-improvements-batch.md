# Improvements Batch — Design Spec

**Date:** 2026-03-14
**Status:** Draft

## Overview

Seven improvements across four groups: quick fixes (nextTopicId chains, loading state, not-found page), performance & accessibility (keyboard nav, memoization), new JS/TS topic stubs, and a Cmd+K search modal. All UI text in English.

---

## Group A — Quick Fixes

### 1. nextTopicId chains

Each topic category already has an internal chain. The last topic in each category has no `nextTopicId`. Instead of cross-category linking, `NextTopicCard` renders a **"Category complete"** variant when `nextTopicId` is absent:

- Checkmark icon (topic color)
- Heading: "Category complete!"
- Subtext: "You've finished all topics in [Category Name]."
- Button: "← Back to Overview" (navigates to `/`)

The existing `NextTopicCard` component is modified to handle the `nextTopicId === undefined` case. No new component needed.

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

## Group D — Cmd+K Search Modal

### Component: `src/components/ui/SearchModal.tsx`

**Trigger:** `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux) — global `keydown` listener in `Navbar.tsx`.

**Visual design:**
- Full-screen dark overlay: `rgba(0, 0, 0, 0.7)`, backdrop blur
- Centered panel: `560px` wide, `max-height: 480px`, `border-radius: 14px`, `background: #0d1117`, `border: 1px solid rgba(255,255,255,0.08)`
- Search input: full-width, `background: transparent`, `border-bottom: 1px solid rgba(255,255,255,0.08)`, `font-size: 16px`, placeholder `"Search topics..."`
- Shortcut hint: `⌘K` badge visible in Navbar next to Reference button (desktop only)

**Results list:**
- Each result: category badge (colored) + topic title + short description (1 line, truncated)
- Active result: highlighted with `background: rgba(255,255,255,0.06)`
- Match highlight: searched term wrapped in `<mark>` styled with `color: topic.color, background: transparent, font-weight: 600`
- Max 8 results shown, scrollable if more
- Empty state: "No topics found" centered in the results area

**Keyboard behavior:**
- `↑` / `↓`: move active result
- `Enter`: navigate to active result's topic page, close modal
- `Escape`: close modal
- Clicking outside overlay: close modal

**Data:** filters `topics` array from `src/data/topics.ts` by matching `title`, `description`, and `category` (case-insensitive). No fuzzy matching — simple `includes()`.

**State:** `isOpen: boolean` in `Navbar.tsx`, passed as prop to `SearchModal`. Modal is conditionally rendered (not mounted when closed).

---

## Files Changed

| File | Change |
|---|---|
| `src/components/layout/NextTopicCard.tsx` | Add "category complete" fallback variant |
| `src/pages/TopicPage/index.tsx` | Loading state, not-found page, SearchModal state |
| `src/pages/TopicPage/SyncExplanation.tsx` | Keyboard nav on step dots |
| `src/components/layout/TopicSidebar.tsx` | aria-expanded + React.memo + useMemo |
| `src/components/layout/Navbar.tsx` | Cmd+K listener, aria-expanded, ⌘K badge, SearchModal |
| `src/components/ui/SearchModal.tsx` | New file — search modal |
| `src/data/topics.ts` | 5 new topic stubs + nextTopicId fixes |
