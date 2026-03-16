# React Context & useReducer — Design Spec

**Date:** 2026-03-16
**Sub-project:** B of 4 (wbs-sources/new/ integration)
**Status:** Approved

---

## Goal

Add a new `react-context` topic to the `react` category covering the Context API (prop drilling, createContext, Provider, useContext) and useReducer (reducer pattern, dispatch, actions, combined with Context). Source: `wbs-sources/new/Context API/` (5 files).

---

## Architecture

One new topic (`react-context`) appended to the `react` category after `react-router`. No new visualisation component — follows the same pattern as `js-npm-bundlers` (banner only). All text is i18n-driven; code examples live in `topics.ts` only.

The `react-router` topic's `nextTopicId` is patched from `undefined` to `'react-context'` to maintain the learn-next chain.

---

## Topic Definition

```
id:               react-context
title:            Context & useReducer
description:      Share state across the component tree without prop drilling — and manage complex state with useReducer
category:         react
color:            #f472b6
estimatedMinutes: 14
animationComponent: undefined
bannerComponent:  ContextBanner
playgroundType:   monaco
nextTopicId:      undefined  (last in react category)
```

---

## Explanation Steps

| Step | Icon | Heading | Language |
|------|------|---------|----------|
| 0 | 🔗 | Prop drilling | javascript |
| 1 | 🏭 | createContext & Provider | jsx |
| 2 | 🪝 | useContext | jsx |
| 3 | ✅ | When to use Context | javascript |
| 4 | ⚙️ | useReducer — what & why | javascript |
| 5 | 📨 | dispatch & actions | javascript |
| 6 | 🔗 | Reducer + Context together | jsx |

### Step content

**Step 0 — Prop drilling**
Text: Prop drilling is passing data through intermediate components that don't use it — just so a deeply nested child can receive it. As trees grow, this creates noise: every layer must declare and forward props it doesn't care about.
Code: 3-level tree passing `user` through `App → Layout → Sidebar → Avatar` even though only `Avatar` needs it.

**Step 1 — createContext & Provider**
Text: `createContext()` creates the context object. Wrap the subtree that needs access with `<XContext.Provider value={...}>`. Every component inside can now read that value — no matter how deep.
Code: `const UserContext = createContext(null)` + Provider wrapping App children.

**Step 2 — useContext**
Text: `useContext(MyContext)` reads the nearest Provider above and returns its `value`. The component re-renders automatically when the value changes. Works at any depth — no prop passing needed.
Code: `Avatar` component reading `user` directly via `useContext(UserContext)`.

**Step 3 — When to use Context**
Text: Good for: auth state, theme, locale, user settings — data that's truly global or shared across many components. Avoid for: frequently updating values (every change re-renders all consumers), data needed by only 1–2 siblings (just lift state), or as a full replacement for a state library in large apps.
Code: Side-by-side good/bad use comment block.

**Step 4 — useReducer: what & why**
Text: When state has multiple interrelated fields — like a cart with items, total, and count — every `useState` update must touch all of them consistently. `useReducer` centralises all transitions into one reducer function: `(state, action) => newState`. Easier to test, easier to trace.
Code: Contrast — verbose `addToCart` with `useState` vs. clean `dispatch({ type: 'ADD_ITEM', payload: product })`.

**Step 5 — dispatch & actions**
Text: `useReducer` takes the reducer and initial state; returns `[state, dispatch]`. Actions are plain objects with a `type` string and optional `payload`. The reducer switches on `type` and returns a new state object — never mutate.
Code: `useReducer` signature + reducer skeleton with `ADD_ITEM`, `REMOVE_ITEM`, `CLEAR_CART` cases.

**Step 6 — Reducer + Context together**
Text: Combine patterns: put `useReducer` inside a Provider, expose `[state, dispatch]` through context. Any child can read state or fire actions without prop drilling. This is the standard pattern for app-level state in React without an external library.
Code: `CartProvider` component with `useReducer` inside, providing `{ state, dispatch }` via context; `useCart()` custom hook for clean consumption.

---

## cheatSheet

**Syntax entries:**
- `createContext` — `const MyCtx = createContext(defaultValue)`
- Provider — `<MyCtx.Provider value={...}>`
- `useContext` — `const value = useContext(MyCtx)`
- Custom context hook — `export function useMyCtx() { const ctx = useContext(MyCtx); if (!ctx) throw new Error('...'); return ctx }`
- `useReducer` — `const [state, dispatch] = useReducer(reducer, initialState)`
- Action pattern — `dispatch({ type: 'ADD_ITEM', payload: item })`
- Combined Provider — `useReducer` inside a Provider exposing `{ state, dispatch }`

**Patterns:**
- `CartProvider` with `useReducer` + context
- Custom `useCart()` hook

**whenToUse:** Use Context when data needs to be accessible by many components at different nesting levels. Combine with useReducer when that shared data involves complex transitions (multiple fields, multiple action types).

**commonMistakes:**
- Putting fast-changing values in context (causes all consumers to re-render on every change)
- Forgetting to throw in the custom hook when context is `null` (silent failures are hard to debug)
- Using context as a global event bus for unrelated state (split into multiple contexts instead)

---

## Banner

**File:** `src/topics/banners/react/ContextBanner.tsx`
**Size:** 780×220px, theme color `#f472b6`

Three panels:
1. **Left — Prop drilling**: 3-node vertical tree, middle nodes greyed and labelled "passes props it doesn't use", leaf receives `user`
2. **Center — Context solution**: Same tree with a Provider arc wrapping the top and a direct arrow from Provider to leaf labelled `useContext` — middle nodes untouched
3. **Right — useReducer cycle**: Circular flow: `state → UI → dispatch(action) → reducer → new state`

---

## Files Modified / Created

| File | Change |
|------|--------|
| `src/data/topics.ts` | Add `react-context` topic block; patch `react-router.nextTopicId` |
| `src/data/categories.ts` | Add `react-context` to `react.topicIds`; add to `TOPIC_ICONS`, `TOPIC_LABELS` |
| `src/i18n/locales/en/topics-other.json` | Add `react-context` with 7 steps |
| `src/i18n/locales/de/topics-other.json` | Add `react-context` with 7 steps (DE) |
| `src/i18n/locales/en/categories.json` | Add `react-context` to `topicLabels` |
| `src/i18n/locales/de/categories.json` | Add `react-context` to `topicLabels` |
| `src/topics/banners/react/ContextBanner.tsx` | New SVG banner |
| `src/topics/registry.ts` | Add `ContextBanner` to `bannerLazyRegistry` |
