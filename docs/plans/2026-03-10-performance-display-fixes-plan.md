# Performance & Display Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 4 bugs: invisible homepage tiles, permanent animation placeholders in IntroAnimation/SyncExplanation, and 550KB+ main bundle.

**Architecture:** Three independent fixes — (1) remove `whileInView` from CategoryGrid tiles, (2) lift animation preloading into TopicPage and pass AnimComp as a prop down to IntroAnimation and SyncExplanation, (3) add Vite `manualChunks` to split Monaco Editor out of the main bundle.

**Tech Stack:** React, Framer Motion, Vite, TypeScript.

---

## Task 1: Fix homepage grid — invisible category tiles

**Problem:** `CategoryTile` uses `whileInView` with `initial={{ opacity: 0, y: 24 }}`. Tiles below the fold stay permanently invisible because `whileInView` never fires for them (no scroll occurs on load).

**Files:**
- Modify: `src/pages/Home/CategoryGrid.tsx`

**Step 1: Open the file and find the motion.div on `CategoryTile`**

In `src/pages/Home/CategoryGrid.tsx`, the `CategoryTile` component's root `motion.div` currently has:

```tsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-60px' }}
transition={{ duration: 0.45, delay: index * 0.07 }}
```

**Step 2: Replace `whileInView` + `viewport` with `animate`**

Change those four props to:

```tsx
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.45, delay: index * 0.07 }}
```

Remove the `whileInView` and `viewport` lines entirely. Keep `whileHover`, `whileTap`, and `onClick` unchanged.

**Step 3: Build and verify**

```bash
npm run build 2>&1 | tail -3
```

Expected: `✓ built in ...s`

**Step 4: Commit**

```bash
git add src/pages/Home/CategoryGrid.tsx
git commit -m "fix: animate category tiles on mount instead of whileInView"
```

---

## Task 2: Fix animation placeholders — lift preloading into TopicPage

**Problem:** `SyncExplanation` calls `getAnimationComponent()` at render time but never triggers a re-render after the preload resolves — so it shows "Animation" placeholder permanently. `IntroAnimation` has its own preload+forceUpdate but this is duplicated logic.

**Solution:** Remove preloading from `IntroAnimation`. Add it to `TopicPage`. Pass the loaded `AnimComp` as a prop to both `IntroAnimation` and `SyncExplanation`.

**Files:**
- Modify: `src/pages/TopicPage/index.tsx`
- Modify: `src/pages/TopicPage/IntroAnimation.tsx`
- Modify: `src/pages/TopicPage/SyncExplanation.tsx`

---

### Step 1: Update `TopicPage/index.tsx` — add preload state

Add these imports at the top (after existing imports):

```tsx
import { useState, useEffect, type ComponentType } from 'react'
import { preloadAnimation, getAnimationComponent } from '@/topics/registry'
```

Inside `TopicPage()`, before the `return`, add:

```tsx
const [AnimComp, setAnimComp] = useState<ComponentType<{ step: number; compact?: boolean }> | null>(
  () => getAnimationComponent(topic.animationComponent)
)

useEffect(() => {
  preloadAnimation(topic.animationComponent).then(() => {
    setAnimComp(() => getAnimationComponent(topic.animationComponent))
  })
}, [topic.animationComponent])
```

Then pass `AnimComp` as a prop to `IntroAnimation` and `SyncExplanation`:

```tsx
<IntroAnimation topic={topic} AnimComp={AnimComp} />
...
<SyncExplanation topic={topic} AnimComp={AnimComp} />
```

---

### Step 2: Update `IntroAnimation.tsx` — accept AnimComp prop, remove internal preload

**Current signature:**
```tsx
interface Props { topic: Topic }
export default function IntroAnimation({ topic }: Props) {
```

**New signature:**
```tsx
import type { ComponentType } from 'react'

interface Props {
  topic: Topic
  AnimComp: ComponentType<{ step: number; compact?: boolean }> | null
}
export default function IntroAnimation({ topic, AnimComp }: Props) {
```

Remove these lines from the function body:
```tsx
const [, forceUpdate] = useState(0)
...
useEffect(() => {
  preloadAnimation(topic.animationComponent).then(() => forceUpdate(n => n + 1))
}, [topic.animationComponent])

const AnimComp = getAnimationComponent(topic.animationComponent)
```

Also remove unused imports: `preloadAnimation`, `getAnimationComponent` from `@/topics/registry`. Keep all other logic unchanged.

---

### Step 3: Update `SyncExplanation.tsx` — accept AnimComp prop

**Current signature:**
```tsx
interface Props { topic: Topic }
export default function SyncExplanation({ topic }: Props) {
```

**New signature:**
```tsx
import type { ComponentType } from 'react'

interface Props {
  topic: Topic
  AnimComp: ComponentType<{ step: number; compact?: boolean }> | null
}
export default function SyncExplanation({ topic, AnimComp }: Props) {
```

Remove this line from the function body:
```tsx
const AnimComp = getAnimationComponent(topic.animationComponent)
```

Also remove the unused import of `getAnimationComponent` from `@/topics/registry`.

---

### Step 4: Build and verify no TypeScript errors

```bash
npm run build 2>&1 | tail -5
```

Expected: `✓ built in ...s` with no `error TS` lines.

### Step 5: Commit

```bash
git add src/pages/TopicPage/index.tsx src/pages/TopicPage/IntroAnimation.tsx src/pages/TopicPage/SyncExplanation.tsx
git commit -m "fix: lift animation preloading into TopicPage — fixes SyncExplanation placeholder"
```

---

## Task 3: Fix bundle size — split Monaco Editor into its own chunk

**Problem:** Main JS chunk is 550KB+ after minification. Monaco Editor is the primary cause (~450KB).

**Files:**
- Modify: `vite.config.ts`

**Step 1: Add `manualChunks` to the build config**

Current `vite.config.ts`:
```ts
export default defineConfig({
  base: '/web-dev-guide/',
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist' },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
```

New `vite.config.ts`:
```ts
export default defineConfig({
  base: '/web-dev-guide/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('monaco-editor')) return 'monaco'
          if (id.includes('framer-motion')) return 'framer'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
```

**Step 2: Build and check chunk sizes**

```bash
npm run build 2>&1 | grep -E "kB|MB|error|Error"
```

Expected: no single chunk over 500KB. `monaco.js` will be large but that's expected (it's loaded lazily only when playground is used). The `index` chunk should drop significantly.

**Step 3: Commit**

```bash
git add vite.config.ts
git commit -m "perf: split Monaco and vendor libs into separate chunks"
```

---

## Summary

| Task | File(s) | Fix |
|------|---------|-----|
| 1 | `CategoryGrid.tsx` | `whileInView` → `animate` (tiles visible on mount) |
| 2 | `TopicPage/index.tsx`, `IntroAnimation.tsx`, `SyncExplanation.tsx` | Lift preload into TopicPage, pass AnimComp as prop |
| 3 | `vite.config.ts` | `manualChunks` splits Monaco + vendor libs |
