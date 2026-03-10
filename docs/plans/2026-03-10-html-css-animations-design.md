# HTML & CSS Animations — Design Document

**Goal:** Upgrade all 5 remaining HTML/CSS topic animations from simple colored boxes to rich pictorial visualizations with real visual metaphors.

**Scope:** 5 files — SemanticViz (HTML), FormsViz (HTML), BoxModelViz (CSS), GridViz (CSS), SelectorsViz (CSS). DomTreeBuilder and FlexboxViz were already upgraded in the previous batch.

**Tech Stack:** React, TypeScript, Framer Motion (AnimatePresence, layout, motion), inline styles. No new npm packages.

---

## 1. SemanticViz — "Browser Wireframe"

**Metaphor:** A mini browser window frame with a real webpage wireframe inside.

**Steps:**
- Step 0: Generic `<div>` blocks stacked (grey, no meaning)
- Step 1: `<header>` zone lights up (blue) — shows logo bar + nav placeholder
- Step 2: `<nav>` zone lights up (green) — shows link pills
- Step 3: `<main> + <article>` zone lights up (purple) — shows article lines
- Step 4: `<footer>` zone lights up (yellow) — full semantic page complete

**Visuals:** Browser chrome (traffic lights + URL bar) at top. Each zone has a tag label top-left + content placeholders (colored rectangles). Active zone gets color + inner glow.

---

## 2. FormsViz — "Live Input Preview"

**Metaphor:** A real UI form with interactive-looking inputs.

**Improvements over current:**
- Text field with blinking cursor animation
- Select dropdown shows `▾` and selected value styled
- Checkbox renders with actual `✓` checkmark; radio renders with inner dot
- Submit button pulses with repeating `boxShadow` glow animation

**Steps unchanged** (0–4 same meaning), visual quality upgraded.

---

## 3. BoxModelViz — "Dimension Ruler"

**Metaphor:** Concentric boxes (keep concept) + CSS value badge per layer.

**Improvement:** When a layer becomes active, a small badge appears next to the layer label showing the CSS value (`margin: 32px`, `border: 3px solid`, `padding: 24px`, `width: 120px`). Content box shows "Hello World" text. Active layer glows.

---

## 4. GridViz — "Named Area Layout"

**Metaphor:** A real page layout with named grid areas building up step by step.

**Steps:**
- Step 0: 3 block-flow divs (header, main, footer) stacked vertically
- Step 1: `display: grid` — same visual but grid context label appears
- Step 2: `grid-template-columns: 1fr 3fr` — sidebar splits out beside main
- Step 3: `gap: 12px` — visible gaps between cells
- Step 4: `grid-column: 1 / -1` — header/footer span highlighted

**Visuals:** Named areas with colored labels, content placeholder lines. CSS rule badge at top updates each step.

---

## 5. SelectorsViz — "DevTools Inspector"

**Metaphor:** Two-panel layout — CSS rule on left, HTML elements on right. Selector "fires" at matching elements.

**Steps:**
- Step 0: Both panels visible, no rule active
- Step 1: `* { color: yellow }` — all 3 elements highlight yellow
- Step 2: `h1 { color: green }` — only `<h1>` highlights green
- Step 3: `.title { color: blue }` — `<h1 class="title">` highlights blue
- Step 4: `#box { color: purple }` — `<div id="box">` highlights purple

**Visuals:** CSS panel shows selector + rule. HTML panel shows 3 elements (`<h1>`, `<p>`, `<div>`). Targeted elements get color + glow. Specificity score badge appears per step.

---

## Files

| File | Change |
|------|--------|
| `src/topics/html/SemanticViz.tsx` | Full rewrite — browser wireframe |
| `src/topics/html/FormsViz.tsx` | Upgrade — blinking cursor, real checkboxes, pulsing button |
| `src/topics/css/BoxModelViz.tsx` | Upgrade — CSS value badges per layer |
| `src/topics/css/GridViz.tsx` | Full rewrite — named area layout |
| `src/topics/css/SelectorsViz.tsx` | Full rewrite — two-panel DevTools inspector |
