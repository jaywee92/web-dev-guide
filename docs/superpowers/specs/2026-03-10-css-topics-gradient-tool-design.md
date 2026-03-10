# Design Spec: 6 New CSS Topics + Gradient Playground

**Date:** 2026-03-10
**Status:** Approved

---

## Overview

Add 6 new CSS topics to the web-dev-guide, sourced from WBS Coding School course materials. Each topic gets full treatment: viz animation (5 steps), cheat sheet, and playground. The "Backgrounds & Gradients" topic includes an interactive CSS gradient generator as its playground — similar to cssgradient.io.

---

## Topics

All 6 topics are added to the CSS category in `src/data/topics.ts` and `src/data/categories.ts`.

| ID | Title | Level | Est. Time | Playground |
|----|-------|-------|-----------|------------|
| `css-colors-units` | Colors & Units | 1 | 10 min | visual-controls |
| `css-typography` | Text & Typography | 1 | 10 min | visual-controls |
| `css-backgrounds-gradients` | Backgrounds & Gradients | 1 | 15 min | gradient-generator |
| `css-display-positioning` | Display & Positioning | 1 | 12 min | visual-controls |
| `css-responsive` | Responsive Design | 2 | 15 min | visual-controls |
| `css-images` | Images | 1 | 8 min | visual-controls |

---

## Animation Steps

### Colors & Units (`ColorsUnitsViz.tsx`)
- Step 0 — Named colors (`red`, `blue`, `tomato`)
- Step 1 — HEX codes (`#ff0000`, `#3b82f6`)
- Step 2 — RGB / RGBA (`rgb(255,0,0)`, `rgba(0,0,0,0.5)`)
- Step 3 — HSL / HSLA (`hsl(0,100%,50%)`)
- Step 4 — Units: px vs em vs rem vs %

### Text & Typography (`TypographyViz.tsx`)
- Step 0 — Default unstyled text
- Step 1 — `font-family`, `font-size`, `font-weight`
- Step 2 — `text-align`, `text-decoration`
- Step 3 — `letter-spacing`, `line-height`, `word-spacing`
- Step 4 — Google Fonts / `@import` / `@font-face`

### Backgrounds & Gradients (`BackgroundsViz.tsx`)
- Step 0 — `background-color`
- Step 1 — `background-image` with a URL
- Step 2 — `background-repeat`, `background-position`, `background-size`
- Step 3 — `linear-gradient()`
- Step 4 — `radial-gradient()`

### Display & Positioning (`DisplayPositioningViz.tsx`)
- Step 0 — block flow
- Step 1 — `display: inline`
- Step 2 — `display: inline-block`
- Step 3 — `position: relative`
- Step 4 — `position: absolute`

### Responsive Design (`ResponsiveViz.tsx`)
- Step 0 — Mobile layout (no media query)
- Step 1 — `@media (min-width: 768px)` — tablet
- Step 2 — `@media (min-width: 1024px)` — desktop
- Step 3 — Mobile-first approach (min-width vs max-width)
- Step 4 — Fluid units (`%`, `vw`, `rem`)

### Images (`ImagesViz.tsx`)
- Step 0 — Unstyled image (overflows container)
- Step 1 — `max-width: 100%`
- Step 2 — `object-fit: cover` with fixed height container
- Step 3 — `border-radius`
- Step 4 — `aspect-ratio`

---

## Gradient Generator Playground

The "Backgrounds & Gradients" topic gets a custom gradient generator component instead of the standard `VisualPlayground`.

**Layout:** Split — controls left, preview right (matches cssgradient.io pattern).

**Controls:**
- Gradient type selector: `linear` / `radial` / `conic` (toggle buttons)
- Angle slider: 0–360°, visible only for `linear`
- Color stops: list of stops, each with a color picker and position (%)
  - Add stop button
  - Remove stop button (min 2 stops)
- Live CSS output panel (read-only, monospace, syntax-highlighted)
- Copy CSS button (copies `background: ...` declaration to clipboard)

**Preview:** Large live preview box updates on every control change.

**Component:** `src/playgrounds/GradientPlayground.tsx`
**Integration:** New `playgroundType: 'gradient'` in topic definition, handled in `PlaygroundSection.tsx`.

---

## File Changes

```
src/data/topics.ts              — add 6 topic definitions
src/data/categories.ts          — no change needed (css category already exists)
src/topics/css/
  ColorsUnitsViz.tsx            — new
  TypographyViz.tsx             — new
  BackgroundsViz.tsx            — new
  DisplayPositioningViz.tsx     — new
  ResponsiveViz.tsx             — new
  ImagesViz.tsx                 — new
src/playgrounds/GradientPlayground.tsx  — new
src/pages/TopicPage/PlaygroundSection.tsx — add gradient case
src/topics/registry.ts          — register 6 new viz components
```

---

## Component Conventions

All viz components follow the existing pattern:
- Props: `{ step: number; compact?: boolean }`
- `const s = Math.min(step, N)` guard
- Framer Motion: `motion`, `AnimatePresence`, spring transitions
- `position: 'relative'` on all absolutely-positioned parent layers
- `key` on both `AnimatePresence` and its direct `motion.*` child

---

## Out of Scope

- No new routes or navbar changes
- No changes to existing 4 CSS topics
- No backend / server changes
