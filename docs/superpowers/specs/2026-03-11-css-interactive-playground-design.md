# CSS Interactive Playground + Expansion Design

## Overview

Extend the web-dev-guide CSS learning section with:
1. **Live Playground** — split-pane Monaco editor + iframe preview, per-topic pre-filled CSS
2. **Syntax Highlighting** — One Dark Pro theme via Shiki for static CodeBlock components
3. **4 New Topics** — css-custom-properties, css-transforms, css-transitions, css-animations
4. **Topic Reorder** — 15 CSS topics in 4 logical groups

All decisions confirmed by user via visual companion brainstorming session.

---

## Design Decisions

### Playground (confirmed: Option A)
- **Split layout**: Monaco editor (left, pre-filled CSS) + iframe sandbox (right, live preview)
- **Fixed HTML template per topic**: User writes only CSS; HTML is topic-specific but hidden (show HTML toggle optional)
- **Pre-filled CSS**: Each topic gets a realistic starting CSS block the user can tweak
- **Reset button**: Restores original pre-filled CSS
- **PlaygroundType**: New value `'css-live'` added to the existing union

### Syntax Highlighting (confirmed: One Dark Pro)
Colors for static CodeBlock components:
- Selectors: `#61afef` (blue)
- Properties: `#98c379` (green)
- Values: `#d19a66` (orange)
- Color values: `#e5c07b` (yellow)
- Comments: `#e06c75` (red/pink)
- Punctuation: `#abb2bf` (grey)
- Background: `#282c34`

Implementation: **Shiki** (`shiki` npm package), build-time or client-side, `one-dark-pro` theme, language `css`. Applied to existing `CodeBlock.tsx`.

### New Topics (confirmed: all 4)
1. `css-custom-properties` — CSS variables: declaration, `var()`, override, theming
2. `css-transforms` — 2D transforms: translate, rotate, scale, combined
3. `css-transitions` — Smooth state changes: duration, timing-function, multiple properties
4. `css-animations` — `@keyframes`: name, duration, iteration, states

### Topic Order (confirmed)
**GRUNDLAGEN** (1–4): css-basics, css-selectors, css-colors-units, css-box-model
**STYLING** (5–7): css-typography, css-backgrounds-gradients, css-images
**LAYOUT** (8–11): css-display-positioning, css-flexbox, css-grid, css-responsive
**MODERNE CSS / EFFEKTE** (12–15): css-custom-properties, css-transforms, css-transitions, css-animations

---

## Architecture

### New Component: `CSSLivePlayground.tsx`
```
src/components/CSSLivePlayground.tsx
```
- Props: `{ topicId: string; defaultCSS: string; html: string; }`
- Left pane: Monaco Editor (language: css, theme: one-dark-pro or equivalent)
- Right pane: `<iframe srcDoc={...}>` — receives `<style>{userCSS}</style>` + `html`
- Toolbar: Reset button, "Show HTML" toggle
- Responsive: stacks vertically on narrow viewports

### Shiki Integration: `CodeBlock.tsx`
```
src/components/CodeBlock.tsx  (modify existing)
```
- Import Shiki, load `one-dark-pro` theme + `css` language
- Replace plain `<pre><code>` with Shiki-highlighted HTML
- Props unchanged from outside; internal rendering upgraded

### PlaygroundType Extension
```
src/types/topic.ts  (or wherever PlaygroundType is defined)
```
- Add `'css-live'` to the union
- Playground router in topic page reads `playgroundType === 'css-live'` → renders `CSSLivePlayground`

### New Viz Components (src/topics/css/)
- `CustomPropertiesViz.tsx` — 5 steps: no vars → declare `--color` → `var()` → override in child → theming
- `TransformsViz.tsx` — 5 steps: none → translate → rotate → scale → combined
- `TransitionsViz.tsx` — 5 steps: no transition → add transition → duration → timing-fn → multi-property
- `AnimationsViz.tsx` — 5 steps: none → @keyframes → name+duration → iteration → fill-mode

### Data Files
- `src/data/topics.ts` — add 4 new topic definitions; update all CSS topics with `playgroundType: 'css-live'` + `defaultCSS` + `previewHTML` fields
- `src/data/categories.ts` — reorder `topicIds` array to 15 topics in 4 logical groups
- `src/topics/registry.ts` — register 4 new viz components

---

## Pre-filled Playground Examples

| Topic | HTML template | Default CSS |
|-------|--------------|-------------|
| css-basics | `<p class="text">Hello, CSS!</p>` | `.text { color: #3b82f6; font-size: 1.5rem; }` |
| css-selectors | `<p>Normal</p><p class="highlight">Selected</p><a href="#">Link</a>` | `.highlight { color: #f97316; } a:hover { color: #3b82f6; }` |
| css-colors-units | `<div class="box">Box</div>` | `.box { width: 10rem; height: 10rem; background: hsl(220, 80%, 60%); }` |
| css-box-model | `<div class="card">Card content</div>` | `.card { padding: 24px; margin: 16px auto; border: 3px solid #3b82f6; border-radius: 12px; background: #1e293b; }` |
| css-typography | `<article><h1>Title</h1><p>Body text goes here.</p></article>` | `h1 { font-family: Georgia, serif; font-size: 2rem; } p { line-height: 1.7; color: #94a3b8; }` |
| css-backgrounds-gradients | `<div class="hero">Hero Section</div>` | `.hero { background: linear-gradient(135deg, #1e293b, #3b82f6); padding: 60px; color: white; }` |
| css-images | `<img class="avatar" src="https://picsum.photos/200" alt="avatar">` | `.avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; }` |
| css-display-positioning | `<div class="container"><div class="box">A</div><div class="box">B</div></div>` | `.container { display: flex; gap: 16px; } .box { padding: 20px; background: #3b82f6; }` |
| css-flexbox | `<nav><a>Home</a><a>About</a><a>Contact</a></nav>` | `nav { display: flex; gap: 24px; justify-content: center; padding: 16px; background: #1e293b; }` |
| css-grid | `<div class="grid"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>` | `.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }` |
| css-responsive | `<div class="grid"><div class="card">Card 1</div><div class="card">Card 2</div><div class="card">Card 3</div></div>` | `.grid { display: grid; grid-template-columns: 1fr; gap: 16px; } @media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); } }` |
| css-custom-properties | `<div class="card"><button class="btn">Click me</button></div>` | `:root { --color-primary: #3b82f6; --radius: 8px; } .btn { background: var(--color-primary); border-radius: var(--radius); padding: 10px 20px; color: white; }` |
| css-transforms | `<div class="box">Hover me</div>` | `.box { width: 100px; height: 100px; background: #3b82f6; transform: rotate(15deg) scale(1.1); transition: transform 0.3s; }` |
| css-transitions | `<button class="btn">Hover me</button>` | `.btn { background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; transition: background 0.3s ease, transform 0.2s ease; } .btn:hover { background: #1d4ed8; transform: translateY(-2px); }` |
| css-animations | `<div class="ball"></div>` | `.ball { width: 60px; height: 60px; border-radius: 50%; background: #3b82f6; animation: bounce 1s ease-in-out infinite alternate; } @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-80px); } }` |

---

## Viz Component Specs

### CustomPropertiesViz — 5 steps
1. No variables — hardcoded `color: #3b82f6` repeated in 3 places
2. Declare `--color-primary: #3b82f6` on `:root`, properties still hardcoded
3. Use `var(--color-primary)` — all 3 consumers updated
4. Override in child scope — `.dark { --color-primary: #1d4ed8 }`
5. Theme system — 3 custom properties (`--color`, `--radius`, `--spacing`) as "design tokens"

### TransformsViz — 5 steps
1. No transform — plain box
2. `translate(40px, 20px)` — box shifts right+down
3. `rotate(45deg)` — box rotates
4. `scale(1.5)` — box grows
5. Combined — `translate + rotate + scale` all at once

### TransitionsViz — 5 steps
1. No transition — instant color change on state indicator
2. `transition: color 0.3s` — color animates smoothly
3. `transition: all 0.5s` — all properties animate
4. `transition: color 0.3s ease-in-out` — timing function shown
5. Multiple: `transition: color 0.3s, transform 0.2s` — separate durations

### AnimationsViz — 5 steps
1. No animation — static element
2. `@keyframes` defined, not applied
3. `animation-name + animation-duration` applied — element animates
4. `animation-iteration-count: infinite`
5. `animation-fill-mode: forwards` — holds end state

---

## File Map

| File | Action |
|------|--------|
| `src/components/CSSLivePlayground.tsx` | CREATE |
| `src/components/CodeBlock.tsx` | MODIFY — add Shiki |
| `src/topics/css/CustomPropertiesViz.tsx` | CREATE |
| `src/topics/css/TransformsViz.tsx` | CREATE |
| `src/topics/css/TransitionsViz.tsx` | CREATE |
| `src/topics/css/AnimationsViz.tsx` | CREATE |
| `src/data/topics.ts` | MODIFY — 4 new topics + `css-live` + `defaultCSS`/`previewHTML` for all |
| `src/data/categories.ts` | MODIFY — reorder 15 topics in 4 groups |
| `src/topics/registry.ts` | MODIFY — register 4 new viz components |
| `src/types/topic.ts` | MODIFY — add `'css-live'` to `PlaygroundType` |
| Topic page component | MODIFY — route `css-live` playgroundType to `CSSLivePlayground` |

---

## Non-Goals (YAGNI)
- No user account / progress saving
- No code sharing / export
- No HTML editing (fixed template only)
- No JavaScript in the playground
- No CSS linting / error highlighting
- No mobile-first responsive editor layout (stack is sufficient)
