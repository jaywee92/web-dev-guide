# Performance & Display Fixes Design — 2026-03-10

## Vision

Fix 4 concrete issues found by browser inspection:
1. Homepage category grid: 6/8 tiles invisible (whileInView not triggering off-screen)
2. Topic page IntroAnimation: placeholder flash until preload resolves
3. Topic page SyncExplanation: "Animation" placeholder shown permanently
4. Main bundle 550KB+ (Monaco + large topics.ts data in one chunk)

---

## Fix 1: Homepage Grid Invisible Tiles

**Root cause:** `CategoryTile` uses `whileInView` with `initial={{ opacity: 0, y: 24 }}`. Tiles below the fold never trigger and stay invisible.

**Solution:** Replace `whileInView` / `viewport` with plain `animate={{ opacity: 1, y: 0 }}`. Tiles animate in on mount with stagger delay. No viewport dependency.

**File:** `src/pages/Home/CategoryGrid.tsx`

---

## Fix 2 & 3: Animation Placeholders

**Root cause:** Both `IntroAnimation` and `SyncExplanation` call `getAnimationComponent()` at render. `IntroAnimation` preloads + force-re-renders itself. `SyncExplanation` never triggers a re-render after preload.

**Solution:** Lift preloading into `TopicPage`. Single `useEffect` preloads the animation, stores result in `useState`. Pass `AnimComp` as a prop to both `IntroAnimation` and `SyncExplanation`. One preload, both in sync, no duplicate logic.

**Files:**
- `src/pages/TopicPage/index.tsx` — add preload state, pass AnimComp prop
- `src/pages/TopicPage/IntroAnimation.tsx` — accept AnimComp prop, remove internal preload
- `src/pages/TopicPage/SyncExplanation.tsx` — accept AnimComp prop

---

## Fix 4: Bundle Splitting

**Root cause:** Monaco Editor (~450KB) and topics.ts data land in the main chunk.

**Solution:**
1. Add `build.rollupOptions.output.manualChunks` in `vite.config.ts` — split `monaco-editor` into its own chunk.
2. Extract cheat sheet data from `topics.ts` into a separate `src/data/cheatsheets.ts` that is dynamically imported in `TopicPage` (or simply split via Vite manualChunks targeting the topics module).

**File:** `vite.config.ts`

---

## Tech Stack

- React + Framer Motion (existing)
- Vite (existing, add manualChunks)
- No new dependencies
