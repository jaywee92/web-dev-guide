# Topic Banners Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 220px concept-diagram SVG banner between the topic title and "How it works" section on every topic page (54 topics, 54 banner components).

**Architecture:** Infrastructure task first (type + component + registry + page wiring), then 7 parallel banner-creation tasks (SVG files only, no shared file edits), then sequential wiring of `topics.ts` and `registry.ts`, then final check and push.

**Tech Stack:** React, TypeScript, Framer Motion, inline SVG

---

## Chunk 1: Infrastructure

### Task 1: Type + TopicBanner component + registry extension + TopicPage wiring

**Files:**
- Modify: `src/types/index.ts` — add `bannerComponent?: string` to `Topic`
- Create: `src/pages/TopicPage/TopicBanner.tsx` — wrapper component with fallback
- Modify: `src/topics/registry.ts` — add `bannerLazyRegistry`, `getBannerComponent`, `preloadBanner`
- Modify: `src/pages/TopicPage/index.tsx` — add state/effect, insert `<TopicBanner>`, fix `#explanation` margin

- [ ] **Step 1: Add `bannerComponent` to the `Topic` interface**

File: `src/types/index.ts`

Find the `Topic` interface and add the optional field after `animationComponent`:

```ts
export interface Topic {
  id: string
  title: string
  description: string
  category: CategoryId
  color: string
  estimatedMinutes: number
  animationComponent: string
  bannerComponent?: string          // ← ADD THIS LINE
  playgroundType: PlaygroundType
  defaultCSS?: string
  previewHTML?: string
  nextTopicId?: string
  sections: Section[]
  cheatSheet?: CheatSheet
}
```

- [ ] **Step 2: Create `TopicBanner.tsx`**

Create file `src/pages/TopicPage/TopicBanner.tsx` with this exact content:

```tsx
import { motion } from 'framer-motion'
import type { ComponentType, CSSProperties } from 'react'
import type { Topic } from '@/types'

interface Props {
  topic: Topic
  BannerComp: ComponentType<Record<string, never>> | null
}

export default function TopicBanner({ topic, BannerComp }: Props) {
  const wrapperStyle: CSSProperties = {
    borderRadius: 12,
    overflow: 'hidden',
    margin: '8px 0 36px',
    border: `1px solid ${topic.color}20`,
    boxShadow: `0 0 40px ${topic.color}08`,
  }

  if (!BannerComp) {
    return (
      <div style={{
        ...wrapperStyle,
        height: 220,
        background: `linear-gradient(135deg, ${topic.color}14, ${topic.color}04)`,
      }} />
    )
  }

  return (
    <motion.div
      style={wrapperStyle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
    >
      <BannerComp />
    </motion.div>
  )
}
```

- [ ] **Step 3: Extend `registry.ts` with banner lazy loading**

File: `src/topics/registry.ts`

Add the following AFTER the existing animation registry code (do not modify existing code):

```ts
// ─── Banner registry ───────────────────────────────────────────────────────

type BannerComp = ComponentType<Record<string, never>>

// Populated incrementally as banner files are created
const bannerLazyRegistry: Record<string, () => Promise<{ default: BannerComp }>> = {}

const loadedBannerRegistry: Record<string, BannerComp> = {}

export function getBannerComponent(name: string): BannerComp | null {
  if (!name) return null
  return loadedBannerRegistry[name] ?? null
}

export async function preloadBanner(name: string): Promise<void> {
  if (!name || loadedBannerRegistry[name] || !bannerLazyRegistry[name]) return
  const mod = await bannerLazyRegistry[name]()
  loadedBannerRegistry[name] = mod.default
}
```

Also add `import type { ComponentType } from 'react'` at the top if not already present (it already is — `AnimComp` uses it).

- [ ] **Step 4: Wire `TopicPage/index.tsx`**

File: `src/pages/TopicPage/index.tsx`

**4a.** Add imports at top (after existing imports):
```tsx
import TopicBanner from './TopicBanner'
import { preloadBanner, getBannerComponent } from '@/topics/registry'
```

**4b.** Add banner state after the existing `AnimComp` state (around line 22):
```tsx
const [BannerComp, setBannerComp] = useState<ComponentType<Record<string, never>> | null>(
  () => topic ? getBannerComponent(topic.bannerComponent ?? '') : null
)
```

**4c.** Add banner preload effect after the existing `AnimComp` effect (around line 26):
```tsx
useEffect(() => {
  if (!topic?.bannerComponent) return
  preloadBanner(topic.bannerComponent).then(() => {
    setBannerComp(() => getBannerComponent(topic.bannerComponent!))
  })
}, [topic?.bannerComponent])
```

**4d.** Insert `<TopicBanner>` between `#intro` and `#explanation`. Find this block:
```tsx
          </div>

          {/* Phase 2: Explanation */}
          <div id="explanation" style={{ marginTop: 32 }}>
```
Replace with:
```tsx
          </div>

          <TopicBanner topic={topic} BannerComp={BannerComp} />

          {/* Phase 2: Explanation */}
          <div id="explanation" style={{ marginTop: 0 }}>
```

- [ ] **Step 5: TypeScript check — must pass clean**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```

Expected: no output (zero errors). All topics show the fallback gradient banner because `bannerLazyRegistry` is empty and no topic has `bannerComponent` set yet.

If errors appear, fix them before continuing.

- [ ] **Step 6: Commit infrastructure**

```bash
git add src/types/index.ts src/pages/TopicPage/TopicBanner.tsx src/topics/registry.ts src/pages/TopicPage/index.tsx
git commit -m "feat: topic banner infrastructure — TopicBanner component + registry + TopicPage wiring"
```

---

## Chunk 2: HTML + CSS Banner SVGs

> Tasks 2–4 are **fully parallel** — each creates files in separate directories, no shared file edits.

### SVG Template (all banners follow this pattern)

```tsx
export default function XxxBanner() {
  return (
    <svg
      width="100%"
      viewBox="0 0 780 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: '#07101a' }}
    >
      {/* Dot grid */}
      <defs>
        <pattern id="dots" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill="rgba(COLOR, 0.10)" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="COLOR" stopOpacity="0.06" />
          <stop offset="100%" stopColor="COLOR" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots)" />
      <rect width="780" height="220" fill="url(#glow)" />

      {/* Concept diagram here */}
    </svg>
  )
}
```

Replace `COLOR` with the topic hex color. All text: `fontFamily="monospace"`, minimum 10px. All elements must fit within `0 0 780 220`.

---

### Task 2: HTML Banner SVGs (9 files)

**Files to create:**
- `src/topics/banners/html/ElementsBanner.tsx`
- `src/topics/banners/html/TextHeadingsBanner.tsx`
- `src/topics/banners/html/LinksImagesBanner.tsx`
- `src/topics/banners/html/ListsBanner.tsx`
- `src/topics/banners/html/DomTreeBanner.tsx`
- `src/topics/banners/html/SemanticBanner.tsx`
- `src/topics/banners/html/FormsBanner.tsx`
- `src/topics/banners/html/AccessibilityBanner.tsx`
- `src/topics/banners/html/MediaEmbedsBanner.tsx`

- [ ] **Step 1: Create `ElementsBanner.tsx`** — color `#f97316`

Shows core HTML elements as labelled boxes in a horizontal row: `<h1>`, `<p>`, `<img>`, `<a>`, `<div>`, `<span>`. Each box ~90px wide, spaced evenly across 780px. Stroke `rgba(249,115,22,0.6)`, fill `rgba(249,115,22,0.08)`. Tag name inside each box in monospace.

```tsx
export default function ElementsBanner() {
  const C = '#f97316'
  const elements = ['<h1>', '<p>', '<img />', '<a>', '<div>', '<span>']
  const w = 100, h = 60, gap = 16
  const total = elements.length * w + (elements.length - 1) * gap
  const startX = (780 - total) / 2
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-el" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-el" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-el)" />
      <rect width="780" height="220" fill="url(#glow-el)" />
      {/* heading above */}
      <text x="390" y="52" fill={`${C}60`} fontSize="11" fontFamily="monospace" textAnchor="middle">HTML Elements</text>
      {/* element boxes */}
      {elements.map((tag, i) => {
        const x = startX + i * (w + gap)
        const y = 80
        return (
          <g key={tag}>
            <rect x={x} y={y} width={w} height={h} rx="6"
              fill={`${C}0d`} stroke={`${C}55`} strokeWidth="1.5" />
            <text x={x + w / 2} y={y + h / 2 + 4} fill={`${C}cc`}
              fontSize="11" fontFamily="monospace" textAnchor="middle">{tag}</text>
          </g>
        )
      })}
      {/* annotation */}
      <text x="390" y="168" fill={`${C}40`} fontSize="10" fontFamily="monospace" textAnchor="middle">
        block vs inline · semantic meaning · attributes
      </text>
    </svg>
  )
}
```

- [ ] **Step 2: Create `TextHeadingsBanner.tsx`** — color `#60a5fa`

Heading hierarchy: h1 → h2 → h3 → h4 as indented lines with decreasing font size. Left-aligned block starting at x=60. h1: fontSize 28, h2: 22, h3: 18, h4: 14. Each indented 20px more than previous. Stroke color per level (h1: full `#60a5fa`, h2: 80% opacity, h3: 60%, h4: 40%). On the right side (x=460) show a small `<div>` "div-soup" comparison with no hierarchy (all same size, gray, slightly blurred/faded).

- [ ] **Step 3: Create `LinksImagesBanner.tsx`** — color `#34d399`

Left half: an `<a>` tag box with `href="#"` label, an arrow pointing right, and a "destination page" box. Right half: an `<img>` tag with `src`, `alt`, `width` attributes listed as chips, and a placeholder image rectangle (gradient fill) with a small mountain/sun icon drawn in SVG.

- [ ] **Step 4: Create `ListsBanner.tsx`** — color `#a78bfa`

Side by side: left = `<ul>` unordered list (3 items with bullet dots, label "unordered"), center = `<ol>` ordered list (3 items with numbers 1/2/3, label "ordered"), right = `<dl>` definition list (dt + dd pairs, label "definition"). Each is a rounded rect containing the list items.

- [ ] **Step 5: Create `DomTreeBanner.tsx`** — color `#f59e0b`

DOM tree: `<html>` at top center → branches to `<head>` (left) and `<body>` (right). `<head>` branches to `<title>` and `<meta>`. `<body>` branches to `<header>`, `<main>`, `<footer>`. `<main>` branches to `<h1>` and `<p>`. Lines connect nodes. Each node is a rounded rectangle with the tag name. Root node slightly larger and brighter.

- [ ] **Step 6: Create `SemanticBanner.tsx`** — color `#2dd4bf`

Two-column comparison. Left: semantic HTML — `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` as labelled nested blocks. Right: div soup — nested `<div>` blocks all labeled "div" in gray. Divider line between columns. Label "Semantic" (green) vs "Div soup" (gray/red) above each column.

- [ ] **Step 7: Create `FormsBanner.tsx`** — color `#60a5fa`

A form mockup: label + text input (active/blue glow state), label + select dropdown (closed), submit button ("Submit →" in blue). Each element drawn as SVG rectangles. Floating label pattern shown on the input. On the right: a small validation state diagram showing empty → filled → valid (green checkmark) → invalid (red X).

- [ ] **Step 8: Create `AccessibilityBanner.tsx`** — color `#f59e0b`

Layered diagram (left to right): plain `<div>` box → `role="button"` chip added → `aria-label="..."` chip added → focus ring shown → screen reader output bubble ("Close, button" text). Arrows between each step. Color: amber `#f59e0b` for role/aria elements, blue `#60a5fa` for screen reader output.

- [ ] **Step 9: Create `MediaEmbedsBanner.tsx`** — color `#ec4899`

Three boxes side by side: 1) Video player placeholder (rectangle with play ▶ button, `<video>` tag below), 2) Audio waveform placeholder (zigzag line, `<audio>` tag below), 3) iframe box (dashed border, "external content" label, `<iframe>` tag below). Each box ~190px wide.

- [ ] **Step 10: Commit HTML banners**

```bash
git add src/topics/banners/html/
git commit -m "feat: HTML topic banner SVGs (9 banners)"
```

---

### Task 3: CSS Layout Banner SVGs (8 files)

**Files to create:**
- `src/topics/banners/css/CSSBasicsBanner.tsx`
- `src/topics/banners/css/BoxModelBanner.tsx`
- `src/topics/banners/css/FlexboxBanner.tsx`
- `src/topics/banners/css/GridBanner.tsx`
- `src/topics/banners/css/DisplayPositioningBanner.tsx`
- `src/topics/banners/css/ResponsiveBanner.tsx`
- `src/topics/banners/css/OverflowBanner.tsx`
- `src/topics/banners/css/ImagesBanner.tsx`

- [ ] **Step 1: Create `CSSBasicsBanner.tsx`** — color `#60a5fa`

A CSS rule anatomy diagram: selector box → `{` → property + `:` + value + `;` line → `}`. Each part labeled below: "selector", "property", "value". Show 2-3 example rules stacked (e.g., `color: blue`, `font-size: 16px`, `margin: 0`). On the right side, show a cascade priority tower: inline → id → class → element, taller = higher priority, filled rectangles.

- [ ] **Step 2: Create `BoxModelBanner.tsx`** — color `#60a5fa`

Full concentric-rectangle box model diagram, centered at (390, 110). Use the full 780×220 space. Layers:
- margin (outermost, dashed yellow `#fbbf24`, label "margin")
- border (solid blue `#60a5fa`, 2.5px, label "border")
- padding (solid purple `rgba(167,139,250,0.45)`, label "padding")
- content (filled blue `rgba(96,165,250,0.18)`, label "content", white text)

Width annotation line below: "total width = content + padding + border + margin" in gray. Height annotation line on left side (rotated). box-sizing note in top-right corner: small rect with `box-sizing: border-box` label.

```tsx
export default function BoxModelBanner() {
  const BLUE = '#60a5fa'
  const YELLOW = '#fbbf24'
  const PURPLE = '#a78bfa'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-bm" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${BLUE}18`} />
        </pattern>
        <radialGradient id="glow-bm" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={BLUE} stopOpacity="0.06" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-bm)" />
      <rect width="780" height="220" fill="url(#glow-bm)" />
      <g transform="translate(390,110)">
        {/* margin */}
        <rect x="-310" y="-95" width="620" height="190" rx="8"
          fill="none" stroke={`${YELLOW}35`} strokeWidth="1.5" strokeDasharray="8 5" />
        <text x="-296" y="-78" fill={`${YELLOW}60`} fontSize="11" fontFamily="monospace">margin</text>
        {/* border */}
        <rect x="-248" y="-72" width="496" height="144" rx="6"
          fill={`${BLUE}04`} stroke={`${BLUE}60`} strokeWidth="2.5" />
        <text x="-234" y="-55" fill={`${BLUE}75`} fontSize="11" fontFamily="monospace">border</text>
        {/* padding */}
        <rect x="-186" y="-48" width="372" height="96" rx="5"
          fill={`${PURPLE}07`} stroke={`${PURPLE}50`} strokeWidth="2" />
        <text x="-172" y="-31" fill={`${PURPLE}75`} fontSize="11" fontFamily="monospace">padding</text>
        {/* content */}
        <rect x="-118" y="-24" width="236" height="48" rx="4"
          fill={`${BLUE}22`} stroke={`${BLUE}85`} strokeWidth="2" />
        <text x="0" y="8" fill="rgba(255,255,255,0.9)" fontSize="13" fontFamily="monospace"
          textAnchor="middle" fontWeight="700">content</text>
      </g>
      {/* width annotation */}
      <line x1="80" y1="207" x2="700" y2="207" stroke={`${BLUE}25`} strokeWidth="1" />
      <line x1="80" y1="202" x2="80" y2="212" stroke={`${BLUE}25`} strokeWidth="1" />
      <line x1="700" y1="202" x2="700" y2="212" stroke={`${BLUE}25`} strokeWidth="1" />
      <text x="390" y="218" fill={`${BLUE}35`} fontSize="9" fontFamily="monospace" textAnchor="middle">
        total width = content + padding + border + margin
      </text>
      {/* box-sizing note */}
      <rect x="598" y="12" width="172" height="22" rx="4"
        fill={`${BLUE}08`} stroke={`${BLUE}22`} strokeWidth="1" />
      <text x="612" y="27" fill={`${BLUE}60`} fontSize="9" fontFamily="monospace">
        box-sizing: border-box
      </text>
    </svg>
  )
}
```

- [ ] **Step 3: Create `FlexboxBanner.tsx`** — color `#a78bfa`

Flex container (dashed outer rect, label `display: flex`) containing 4 flex items (purple rectangles, labeled 1–4). Below: two rows showing `justify-content` variations: `flex-start` (items left), `center` (items centered), `space-between` (items spread). Main axis arrow along bottom. Cross axis arrow on left side.

- [ ] **Step 4: Create `GridBanner.tsx`** — color `#34d399`

3×3 CSS Grid showing named areas: header (top full width), sidebar (left col, 2 rows), main (center+right, 2 rows), footer (bottom full width). Each area is a rounded rect with the area name as label. Grid lines visible as light strokes. `grid-template-areas` snippet in top-right corner.

- [ ] **Step 5: Create `DisplayPositioningBanner.tsx`** — color `#f59e0b`

Four mini panels in a 2×2 grid, each showing a positioning mode:
1. `position: static` — element in normal flow
2. `position: relative` — element shifted, ghost at original position
3. `position: absolute` — element floating over parent, coordinates shown
4. `position: fixed` — element pinned to viewport corner with pin icon

Each panel is ~160×80px with a label.

- [ ] **Step 6: Create `ResponsiveBanner.tsx`** — color `#2dd4bf`

Three device silhouettes side by side: mobile (small rect ~80px wide), tablet (~140px), desktop (~240px). Each shows a simplified page layout inside (header bar + content block). Breakpoint labels between devices: `@media (min-width: 768px)` and `@media (min-width: 1024px)`. The desktop layout shows a sidebar + main content.

- [ ] **Step 7: Create `OverflowBanner.tsx`** — color `#f87171`

A container box (fixed size, ~200×80px) with long text content. Four variations shown left to right:
1. `overflow: visible` — text bleeds outside container (red indicator lines)
2. `overflow: hidden` — text clipped at box edge (scissors icon or clip line)
3. `overflow: scroll` — scrollbar shown on right side
4. `overflow: clip` + `text-overflow: ellipsis` — text truncated with "..."

Each has a label below.

- [ ] **Step 8: Create `ImagesBanner.tsx`** — color `#ec4899`

A portrait-ratio placeholder image (gradient pink, ~120×160px tall) shown four times side by side in a landscape container, demonstrating `object-fit`:
1. `stretch` — distorted wider
2. `contain` — letterboxed with bars
3. `cover` — cropped to fill
4. `fill` — same as contain but label different

Labels below each. Container outline shown as dashed rect.

> Note: `FlexboxBanner` covers the `css-flexbox` topic (which uses `FlexboxUseCasesViz` as its AnimComp). `GridBanner` covers `css-grid` (which uses `GridAreasViz`). There are 18 CSS topics total — one banner per topic, not per registry entry.

- [ ] **Step 9: Commit CSS layout banners**

```bash
git add src/topics/banners/css/
git commit -m "feat: CSS layout banner SVGs (8 banners)"
```

---

### Task 4: CSS Style Banner SVGs (10 files)

**Files to create:**
- `src/topics/banners/css/SelectorsBanner.tsx`
- `src/topics/banners/css/ColorsUnitsBanner.tsx`
- `src/topics/banners/css/TypographyBanner.tsx`
- `src/topics/banners/css/BackgroundsBanner.tsx`
- `src/topics/banners/css/ShadowsBanner.tsx`
- `src/topics/banners/css/CustomPropertiesBanner.tsx`
- `src/topics/banners/css/ThemingBanner.tsx`
- `src/topics/banners/css/TransformsBanner.tsx`
- `src/topics/banners/css/TransitionsBanner.tsx`
- `src/topics/banners/css/AnimationsBanner.tsx`

All follow the SVG template. Color notes and diagram descriptions:

- [ ] **Step 1: Create `SelectorsBanner.tsx`** — color `#f59e0b`

Specificity tower (vertical bars, tallest = highest): `#id` (amber, tallest ~140px), `.class` (orange, ~90px), `element` (yellow, ~50px), `*` (gray, ~20px). Each bar labeled with the selector type and a specificity score (e.g., `(0,1,0)`). On the left: a CSS rule showing `.button#submit:hover` with each part highlighted in the matching color.

- [ ] **Step 2: Create `ColorsUnitsBanner.tsx`** — color `#a78bfa`

Two sections. Left: color representations — a swatch row showing the same purple in: `#a78bfa` (hex), `rgb(167,139,250)`, `hsl(252,90%,76%)`, `oklch(...)`. Each swatch is a filled circle. Right: units comparison — a horizontal bar showing `px` (fixed, ~120px), `rem` (relative, labeled "1rem = 16px"), `%` (relative, 100%), `vw` (viewport, labeled "50vw"). Bars with labels.

- [ ] **Step 3: Create `TypographyBanner.tsx`** — color `#22d3ee`

Font scale visual: text "Aa" shown at sizes 12, 16, 20, 28, 36px (increasing left to right). Below: line-height comparison — two text block rectangles, one cramped (1.0) and one open (1.6), with spacing indicators. Bottom row: font-weight progression from 300 (thin) to 900 (black) using the word "Bold" at each weight.

- [ ] **Step 4: Create `BackgroundsBanner.tsx`** — color `#34d399`

Four boxes in a 2×2 grid demonstrating: 1) `background-color: #34d399` (solid fill), 2) `background-image: linear-gradient(...)` (gradient from green to transparent), 3) `background-image: url(...)` (crosshatch pattern representing an image), 4) `background-size: cover / contain` (split box showing cover vs contain). Labels inside each box.

- [ ] **Step 5: Create `ShadowsBanner.tsx`** — color `#60a5fa`

A single card box shown 5 times in a row, each with increasing shadow depth:
1. No shadow (flat)
2. `2px 2px 4px rgba(0,0,0,0.3)` (subtle)
3. `0 8px 24px rgba(0,0,0,0.4)` (elevated)
4. `0 0 20px #60a5fa55` (colored glow)
5. Multiple shadows stacked (most dramatic)

Shadow effect drawn directly in SVG using blur filters or approximated with offset rect. CSS snippet below each card.

- [ ] **Step 6: Create `CustomPropertiesBanner.tsx`** — color `#a78bfa`

`:root {}` block on the left with `--primary`, `--spacing`, `--radius` variables listed. Three arrows fan out to the right → three usage sites (button, card, heading) each referencing `var(--primary)`. The primary color flows through all three. On the far right, a "change variable" arrow shows how updating `:root` affects all three simultaneously.

- [ ] **Step 7: Create `ThemingBanner.tsx`** — color `#f5c542`

Split banner: left half = light theme card (white background, dark text, `[data-theme="light"]` label), right half = dark theme card (dark background, light text, `[data-theme="dark"]` label). Both cards show the same content (heading + paragraph + button) with theme tokens applied. Center divider with two SVG icons: left = sun (circle + 8 radial lines, yellow), right = moon (crescent drawn as two overlapping circles with subtraction, white/gray). Do NOT use emoji characters in SVG `<text>` — draw the icons as SVG shapes.

- [ ] **Step 8: Create `TransformsBanner.tsx`** — color `#f97316`

A reference square (outline only) on the left, then 4 transformed versions shown with arrows: `translate(40px, 20px)` (shifted), `rotate(45deg)` (rotated diamond), `scale(1.5)` (enlarged), `skew(20deg)` (skewed). Each transformation labeled below. 2D coordinate axis in background.

- [ ] **Step 9: Create `TransitionsBanner.tsx`** — color `#2dd4bf`

Before → after with transition arrow in the center. Left: button in default state (gray, `width: 120px`). Right: button in hover state (teal, wider, `width: 180px`, shadow). Arrow labeled `transition: all 0.3s ease`. Below: easing curve visualization — S-curve for `ease`, straight line for `linear`, steep start for `ease-in`.

- [ ] **Step 10: Create `AnimationsBanner.tsx`** — color `#f59e0b`

`@keyframes` block on the left (showing `from { opacity: 0 }` → `to { opacity: 1 }`). In the center: a timeline bar with keyframe markers at 0%, 25%, 75%, 100% with animation properties at each stop. On the right: `animation:` shorthand syntax broken into labeled parts: `name | duration | easing | delay | iteration`.

- [ ] **Step 11: Commit CSS style banners**

```bash
git add src/topics/banners/css/
git commit -m "feat: CSS style banner SVGs (10 banners)"
```

---

## Chunk 3: JS / TS / React / APIs / DB / Git Banner SVGs

> Tasks 5–8 are **fully parallel** — each creates files in separate directories only.

### Task 5: JavaScript + TypeScript Banner SVGs (7 files)

**Files to create:**
- `src/topics/banners/javascript/EventLoopBanner.tsx`
- `src/topics/banners/javascript/ClosureBanner.tsx`
- `src/topics/banners/javascript/VariablesBanner.tsx`
- `src/topics/banners/javascript/ArraysBanner.tsx`
- `src/topics/banners/typescript/TypeScriptBanner.tsx`
- `src/topics/banners/typescript/InterfacesBanner.tsx`
- `src/topics/banners/typescript/GenericsBanner.tsx`

- [ ] **Step 1: Create `EventLoopBanner.tsx`** — color `#f59e0b`

Three blocks connected left to right:
- **Call Stack** (~190px wide, 180px tall): labeled rectangles stacking up — `console.log()`, `greet()`, `main()`. Label "LIFO stack" at bottom.
- **Event Loop** (center circle, ~70px radius): circular arrow, text "Event Loop" inside, "checks when stack empty" below.
- **Task Queue** (~190px wide, 180px tall): labeled rectangles — `setTimeout cb`, `fetch().then()`, `click handler`. Label "FIFO queue" at bottom.

Arrows between Stack→Loop and Loop→Queue. Colors: amber `#f59e0b` for stack, blue `#60a5fa` for loop, green `#4ade80` for queue.

```tsx
export default function EventLoopBanner() {
  const AMBER = '#f59e0b', BLUE = '#60a5fa', GREEN = '#4ade80'
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-el" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${AMBER}15`} />
        </pattern>
        <radialGradient id="glow-el" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={AMBER} stopOpacity="0.05" />
          <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
        </radialGradient>
        <marker id="arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(255,255,255,0.2)" />
        </marker>
      </defs>
      <rect width="780" height="220" fill="url(#dots-el)" />
      <rect width="780" height="220" fill="url(#glow-el)" />
      {/* Call Stack */}
      <g transform="translate(130,110)">
        <rect x="-100" y="-88" width="200" height="176" rx="8" fill={`${AMBER}06`} stroke={`${AMBER}35`} strokeWidth="1.5" />
        <text x="0" y="-70" fill={`${AMBER}65`} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="600">Call Stack</text>
        {[['console.log()', AMBER, 0.9], ['greet()', AMBER, 0.55], ['main()', AMBER, 0.3]].map(([label, color, opacity], i) => (
          <g key={i as number}>
            <rect x="-78" y={-54 + i * 38} width="156" height="30" rx="4" fill={`${color}${i === 0 ? '20' : '0d'}`} stroke={`${color}${i === 0 ? '55' : '28'}`} strokeWidth="1.2" />
            <text x="0" y={-54 + i * 38 + 19} fill={`${color}${Math.round((opacity as number) * 255).toString(16).padStart(2,'0')}`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">{label as string}</text>
          </g>
        ))}
        <text x="0" y="80" fill={`${AMBER}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">LIFO stack</text>
      </g>
      {/* Arrow Stack→Loop */}
      <line x1="232" y1="110" x2="303" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arr)" />
      {/* Event Loop */}
      <g transform="translate(390,110)">
        <circle cx="0" cy="0" r="64" fill={`${BLUE}04`} stroke={`${BLUE}22`} strokeWidth="1.5" />
        <path d="M0,-60 A60,60 0 1,1 -60,0" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
        <polygon points="0,-66 6,-52 -6,-52" fill={BLUE} />
        <text x="0" y="-5" fill="rgba(255,255,255,0.75)" fontSize="11.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">Event</text>
        <text x="0" y="11" fill="rgba(255,255,255,0.75)" fontSize="11.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">Loop</text>
        <text x="0" y="85" fill={`${BLUE}40`} fontSize="9" fontFamily="monospace" textAnchor="middle">checks when stack empty</text>
      </g>
      {/* Arrow Loop→Queue */}
      <line x1="456" y1="110" x2="527" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#arr)" />
      {/* Task Queue */}
      <g transform="translate(650,110)">
        <rect x="-110" y="-88" width="220" height="176" rx="8" fill={`${GREEN}04`} stroke={`${GREEN}28`} strokeWidth="1.5" />
        <text x="0" y="-70" fill={`${GREEN}55`} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="600">Task Queue</text>
        {[['setTimeout cb', 0.85], ['fetch().then()', 0.55], ['click handler', 0.3]].map(([label, opacity], i) => (
          <g key={i as number}>
            <rect x="-88" y={-54 + i * 38} width="176" height="30" rx="4" fill={`${GREEN}${i === 0 ? '14' : '08'}`} stroke={`${GREEN}${i === 0 ? '40' : '20'}`} strokeWidth="1.2" />
            <text x="0" y={-54 + i * 38 + 19} fill={`${GREEN}${Math.round((opacity as number) * 255).toString(16).padStart(2,'0')}`} fontSize="10.5" fontFamily="monospace" textAnchor="middle">{label as string}</text>
          </g>
        ))}
        <text x="0" y="80" fill={`${GREEN}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">FIFO queue</text>
      </g>
    </svg>
  )
}
```

- [ ] **Step 2: Create `ClosureBanner.tsx`** — color `#4ade80`

Nested scope rectangles:
- Outer rect (large, green stroke): `outer()` label top-left, contains `let count = 0` variable box
- Inner rect (medium, inside outer): `inner()` label, contains `count++` reference box
- A dashed arrow from `count++` curving back to `let count` with label "closure ↗"
- Outside both rects: `inner()` being called externally, with "still has access" annotation

- [ ] **Step 3: Create `VariablesBanner.tsx`** — color `#fb923c`

Three side-by-side scope boxes:
1. `var` (orange) — function scope box, hoisting ghost shown above (faded copy at top), label "function scope + hoisting"
2. `let` (blue) — block scope box (smaller), TDZ zone shown above as red hatched area, label "block scope + TDZ"
3. `const` (purple) — block scope box with 🔒 icon, label "block scope + immutable binding"

Below each: 2-3 code snippet chips showing valid/invalid usage.

- [ ] **Step 4: Create `ArraysBanner.tsx`** — color `#34d399`

Array visual: `[42, "hi", true, null, []]` shown as index-labeled boxes (0–4). Below: three method operation diagrams:
- `push / pop` — arrow adding/removing from right end
- `map` — array → transform → new array
- `filter` — array → predicate → smaller array

Each operation shown with mini before/after arrays.

- [ ] **Step 5: Create `TypeScriptBanner.tsx`** — color `#3b82f6`

Two-column: left = JS code (untyped, red underlines on implicit `any`), right = TS equivalent (typed, green checkmarks). Show: function parameter type annotation, return type annotation, variable type annotation. Center: TypeScript logo / "TS" badge. Bottom: compiler error message example in a styled error box.

- [ ] **Step 6: Create `InterfacesBanner.tsx`** — color `#6366f1`

An `interface User { ... }` block on the left showing: `id: number`, `name: string`, `email: string`, `role?: 'admin' | 'user'`. Arrow to the right → an object literal `{ id: 1, name: "Alice", ... }` showing how it implements the interface. Below: `interface extends` diagram showing `AdminUser extends User` adding an `adminSince` field. Type-check green ✓ or red ✗ indicators.

- [ ] **Step 7: Create `GenericsBanner.tsx`** — color `#8b5cf6`

Generic function anatomy: `function identity<T>(value: T): T`. The `T` highlighted in purple. Below: three call sites showing type inference: `identity(42)` → `T = number`, `identity("hi")` → `T = string`, `identity(true)` → `T = boolean`. Arrows from call site to type inference box. On the right: `Array<T>` and `Promise<T>` as common generic types.

- [ ] **Step 8: Commit JS + TS banners**

```bash
git add src/topics/banners/javascript/ src/topics/banners/typescript/
git commit -m "feat: JavaScript + TypeScript banner SVGs (7 banners)"
```

---

### Task 6: React + Web APIs Banner SVGs (7 files)

**Files to create:**
- `src/topics/banners/react/ComponentsBanner.tsx`
- `src/topics/banners/react/StateBanner.tsx`
- `src/topics/banners/react/UseEffectBanner.tsx`
- `src/topics/banners/react/RouterBanner.tsx`
- `src/topics/banners/webapis/FetchBanner.tsx`
- `src/topics/banners/webapis/DomEventsBanner.tsx`
- `src/topics/banners/webapis/StorageBanner.tsx`

All follow the SVG template. Colors and diagrams:

- [ ] **Step 1: Create `ComponentsBanner.tsx`** — color `#61dafb`

Component tree: `<App>` at top center → children: `<Header>`, `<Main>`, `<Footer>`. `<Main>` → `<ProductList>` → `<ProductCard>` (×3). Each component is a rounded rect. Props shown as small downward arrows labeled "props". State shown as a circular badge on `<ProductList>`. JSX snippet: `<ProductCard title={...} price={...} />` below the tree.

- [ ] **Step 2: Create `StateBanner.tsx`** — color `#61dafb`

Left: `useState` hook call — `const [count, setCount] = useState(0)`. Center: state value box `count = 3`. Right: re-render cycle — component box with "re-render" circular arrow. Below: `setCount(count + 1)` call → state update → new render. Shows the unidirectional data flow: state → render → event → setState → re-render.

- [ ] **Step 3: Create `UseEffectBanner.tsx`** — color `#61dafb`

Timeline diagram (horizontal): component mounts → effect runs (green ▶) → cleanup runs (red ⏹) on unmount. Dependency array shown: `[]` (run once), `[dep]` (run on dep change), no array (run every render). Three rows for each case. `useEffect(() => { ... }, [deps])` anatomy in top-right.

- [ ] **Step 4: Create `RouterBanner.tsx`** — color `#f59e0b`

URL bar at top showing changing paths: `/` → `/about` → `/products/42`. Below: routing table showing `<Route path="/" → <Home>`, `<Route path="/about" → <About>`, `<Route path="/products/:id" → <Product>`. Arrow from active URL to matched route highlighted. `useParams()` shown extracting `id: "42"` from the URL.

- [ ] **Step 5: Create `FetchBanner.tsx`** — color `#34d399`

Left-to-right flow: Browser → `fetch(url)` call → HTTP GET arrow → Server/API box → JSON response arrow back → `.then(res => res.json())` → data object `{ id: 1, name: "..." }`. Loading state (spinner) and error state (red X) shown as branches. `async/await` alternative shown below as a parallel path.

- [ ] **Step 6: Create `DomEventsBanner.tsx`** — color `#f97316`

Event bubbling diagram: inner `<button>` click → bubble up through `<div>` → `<section>` → `<body>`. Each level shown as nested rectangles. `addEventListener('click', handler)` shown on one level. `event.stopPropagation()` shown blocking the bubble with a barrier. Event delegation pattern shown in a side panel.

- [ ] **Step 7: Create `StorageBanner.tsx`** — color `#a78bfa`

Three storage types side by side:
1. **localStorage** — persistent icon (💾), shows `setItem / getItem`, label "persists across sessions"
2. **sessionStorage** — session icon (🔄), label "cleared on tab close"
3. **Cookie** — 🍪 icon, shows `expires` and `httpOnly` flags, label "sent with HTTP requests"

Each as a labelled box with key-value pair examples inside.

- [ ] **Step 8: Commit React + WebAPIs banners**

```bash
git add src/topics/banners/react/ src/topics/banners/webapis/
git commit -m "feat: React + Web APIs banner SVGs (7 banners)"
```

---

### Task 7: HTTP + PostgreSQL Banner SVGs (6 files)

**Files to create:**
- `src/topics/banners/http/AnimatedFlowBanner.tsx`
- `src/topics/banners/http/RestBanner.tsx`
- `src/topics/banners/http/StatusCodesBanner.tsx`
- `src/topics/banners/postgresql/QueriesBanner.tsx`
- `src/topics/banners/postgresql/JoinsBanner.tsx`
- `src/topics/banners/postgresql/CrudBanner.tsx`

- [ ] **Step 1: Create `AnimatedFlowBanner.tsx`** — color `#60a5fa`

Generic request-response cycle: Browser box → HTTP Request arrow (labeled `GET /api/data`) → Server box → Database cylinder → Response arrow back → JSON data object. Status code badge `200 OK` on the response arrow. TLS lock icon on the connection. Latency annotation on the arrows.

- [ ] **Step 2: Create `RestBanner.tsx`** — color `#34d399`

REST methods table: four rows showing `GET`, `POST`, `PUT`, `DELETE` with: method badge (colored), endpoint example (`/users`, `/users`, `/users/42`, `/users/42`), CRUD operation label (Read, Create, Update, Delete), HTTP status code (`200`, `201`, `200`, `204`). Clean table layout.

- [ ] **Step 3: Create `StatusCodesBanner.tsx`** — color `#f59e0b`

Five status code groups as horizontal bars with example codes:
- `1xx` (gray, "Informational") — `100 Continue`
- `2xx` (green, "Success") — `200 OK`, `201 Created`
- `3xx` (blue, "Redirect") — `301 Moved`, `304 Not Modified`
- `4xx` (orange, "Client Error") — `404 Not Found`, `403 Forbidden`, `400 Bad Request`
- `5xx` (red, "Server Error") — `500 Internal Server Error`, `503 Unavailable`

Each group as a labelled colored rectangle with code examples inside.

- [ ] **Step 4: Create `QueriesBanner.tsx`** — color `#38bdf8`

SQL `SELECT` anatomy: each clause labeled — `SELECT` (columns), `FROM` (table name), `WHERE` (condition), `ORDER BY` (column + direction), `LIMIT` (number). A mini result table shown on the right: 3 columns, 3 rows, one row highlighted as matching the WHERE clause. Query: `SELECT name, age FROM users WHERE age > 18 ORDER BY name LIMIT 10`.

- [ ] **Step 5: Create `JoinsBanner.tsx`** — color `#38bdf8`

Two table Venn-diagram style: Table A (users) overlapping Table B (orders). Four join types shown as small diagrams:
- `INNER JOIN` — only intersection highlighted
- `LEFT JOIN` — left + intersection highlighted
- `RIGHT JOIN` — right + intersection highlighted
- `FULL OUTER JOIN` — everything highlighted

Each with its name label. The overlapping foreign key (`user_id`) shown as the join condition.

- [ ] **Step 6: Create `CrudBanner.tsx`** — color `#38bdf8`

Four operation panels:
1. `CREATE` — `INSERT INTO users (name) VALUES ('Alice')` → new row appears in table (green +)
2. `READ` — `SELECT * FROM users WHERE id = 1` → row highlighted in table
3. `UPDATE` — `UPDATE users SET name = 'Bob' WHERE id = 1` → row shows change (amber →)
4. `DELETE` — `DELETE FROM users WHERE id = 1` → row crossed out (red -)

Each in a compact rounded panel with the SQL snippet and table visualization.

- [ ] **Step 7: Commit HTTP + PostgreSQL banners**

```bash
git add src/topics/banners/http/ src/topics/banners/postgresql/
git commit -m "feat: HTTP + PostgreSQL banner SVGs (6 banners)"
```

---

### Task 8: Git Banner SVGs (7 files)

**Files to create:**
- `src/topics/banners/git/GitIntroBanner.tsx`
- `src/topics/banners/git/GitWorkflowBanner.tsx`
- `src/topics/banners/git/GitIgnoreBanner.tsx`
- `src/topics/banners/git/GitHubBanner.tsx`
- `src/topics/banners/git/GitCollabSetupBanner.tsx`
- `src/topics/banners/git/GitConflictBanner.tsx`
- `src/topics/banners/git/GitUndoBanner.tsx`

Color for all Git banners: `#2dd4bf` (teal).

- [ ] **Step 1: Create `GitIntroBanner.tsx`**

Git object model: four box types connected: `Working Directory` → (git add) → `Staging Area` → (git commit) → `Local Repo` → (git push) → `Remote Repo`. Each box with an icon (folder, clipboard, cylinder, cloud). Arrow labels with the git commands. Horizontal flow left-to-right across 780px.

- [ ] **Step 2: Create `GitWorkflowBanner.tsx`**

Branch timeline (horizontal): main branch line from left to right with commits (circles). Feature branch arcs above main. Commits on feature: c3, c4, c5. Merge commit on main labeled "M". `git checkout -b feature` label at branch point. `git merge feature` label at merge point. Commit labels: c1, c2 on main before branch, M after merge, HEAD at tip.

- [ ] **Step 3: Create `GitIgnoreBanner.tsx`**

Left: `.gitignore` file box showing 5-6 pattern lines: `node_modules/`, `*.log`, `.env`, `dist/`, `.DS_Store`. Right: file tree with matching files shown as ✗ (ignored, red) vs ✓ (tracked, green). Arrow from each pattern to the matching file(s). Pattern syntax chips: `*` (wildcard), `/` (directory), `!` (negation).

- [ ] **Step 4: Create `GitHubBanner.tsx`**

Repository lifecycle: Local Repo box → `git push` → GitHub cloud box (with Octocat-style logo) → `Pull Request` flow (PR box with diff visualization: green + lines and red - lines) → `Merge` → main branch updated. Issue tracker icon and star/fork counts shown on the GitHub box.

- [ ] **Step 5: Create `GitCollabSetupBanner.tsx`**

Three developer avatars (Dev A, Dev B, Dev C) with their local repo boxes, all connected via arrows to a central GitHub cloud box (remote repo). Branch protection shield shown on main. PR arrows from dev branches to the remote with "review required" badge.

- [ ] **Step 6: Create `GitConflictBanner.tsx`**

Conflict diagram: two branches diverge from a common commit → both modify the same file (different changes shown as colored blocks) → merge attempt → conflict marker visualization:
```
<<<<<<< HEAD
  branch A change
=======
  branch B change
>>>>>>> feature
```
Resolution arrow → merged result. Colors: blue for branch A, purple for branch B, green for resolved.

- [ ] **Step 7: Create `GitUndoBanner.tsx`**

Three "undo" operations shown as panels:
1. `git restore file.txt` — working directory change discarded (arrow back to last commit state)
2. `git reset HEAD~1` — commit pointer moved back one (commit grayed out)
3. `git revert abc123` — new inverse commit added (shown as +/- reversed commit)

Each in a compact panel with commit graph showing before/after.

- [ ] **Step 8: Commit Git banners**

```bash
git add src/topics/banners/git/
git commit -m "feat: Git banner SVGs (7 banners)"
```

---

## Chunk 4: Wiring + Final

> Tasks 9–11 are **sequential** — they modify shared files.

### Task 9: Wire `topics.ts` — add `bannerComponent` to all 54 topics

**File:** `src/data/topics.ts`

Add `bannerComponent: 'XxxBanner'` field to each topic. The field goes immediately after `animationComponent`. Complete mapping:

| topicId | bannerComponent |
|---|---|
| `html-basics` | `ElementsBanner` |
| `html-text` | `TextHeadingsBanner` |
| `html-links-images` | `LinksImagesBanner` |
| `html-lists` | `ListsBanner` |
| `html-dom` | `DomTreeBanner` |
| `html-semantic` | `SemanticBanner` |
| `html-forms` | `FormsBanner` |
| `html-accessibility` | `AccessibilityBanner` |
| `html-media` | `MediaEmbedsBanner` |
| `css-basics` | `CSSBasicsBanner` |
| `css-box-model` | `BoxModelBanner` |
| `css-flexbox` | `FlexboxBanner` |
| `css-grid` | `GridBanner` |
| `css-selectors` | `SelectorsBanner` |
| `css-colors-units` | `ColorsUnitsBanner` |
| `css-typography` | `TypographyBanner` |
| `css-backgrounds-gradients` | `BackgroundsBanner` |
| `css-shadows` | `ShadowsBanner` |
| `css-overflow` | `OverflowBanner` |
| `css-display-positioning` | `DisplayPositioningBanner` |
| `css-responsive` | `ResponsiveBanner` |
| `css-images` | `ImagesBanner` |
| `css-custom-properties` | `CustomPropertiesBanner` |
| `css-variables-theming` | `ThemingBanner` |
| `css-transforms` | `TransformsBanner` |
| `css-transitions` | `TransitionsBanner` |
| `css-animations` | `AnimationsBanner` |
| `js-event-loop` | `EventLoopBanner` |
| `js-closures` | `ClosureBanner` |
| `js-variables` | `VariablesBanner` |
| `js-arrays` | `ArraysBanner` |
| `http-request-cycle` | `AnimatedFlowBanner` |
| `http-rest` | `RestBanner` |
| `http-status` | `StatusCodesBanner` |
| `postgres-queries` | `QueriesBanner` |
| `postgres-joins` | `JoinsBanner` |
| `postgres-crud` | `CrudBanner` |
| `ts-basics` | `TypeScriptBanner` |
| `ts-interfaces` | `InterfacesBanner` |
| `ts-generics` | `GenericsBanner` |
| `webapi-fetch` | `FetchBanner` |
| `webapi-events` | `DomEventsBanner` |
| `webapi-storage` | `StorageBanner` |
| `react-components` | `ComponentsBanner` |
| `react-state` | `StateBanner` |
| `react-useeffect` | `UseEffectBanner` |
| `react-router` | `RouterBanner` |
| `git-intro` | `GitIntroBanner` |
| `git-workflow` | `GitWorkflowBanner` |
| `git-gitignore` | `GitIgnoreBanner` |
| `git-github` | `GitHubBanner` |
| `git-collab-setup` | `GitCollabSetupBanner` |
| `git-merge-conflicts` | `GitConflictBanner` |
| `git-undo-stash` | `GitUndoBanner` |

- [ ] **Step 1: Add bannerComponent fields to all 54 topics in `src/data/topics.ts`**

For each topic, find the line `animationComponent: 'XxxViz',` and add `bannerComponent: 'XxxBanner',` on the next line.

- [ ] **Step 2: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add bannerComponent field to all 54 topics in topics.ts"
```

---

### Task 10: Wire `registry.ts` — add all 54 banner entries

**File:** `src/topics/registry.ts`

Replace the empty `bannerLazyRegistry` (added in Task 1) with all 54 entries:

- [ ] **Step 1: Populate `bannerLazyRegistry` with all 54 entries**

```ts
const bannerLazyRegistry: Record<string, () => Promise<{ default: BannerComp }>> = {
  // HTML
  ElementsBanner:      () => import('./banners/html/ElementsBanner'),
  TextHeadingsBanner:  () => import('./banners/html/TextHeadingsBanner'),
  LinksImagesBanner:   () => import('./banners/html/LinksImagesBanner'),
  ListsBanner:         () => import('./banners/html/ListsBanner'),
  DomTreeBanner:       () => import('./banners/html/DomTreeBanner'),
  SemanticBanner:      () => import('./banners/html/SemanticBanner'),
  FormsBanner:         () => import('./banners/html/FormsBanner'),
  AccessibilityBanner: () => import('./banners/html/AccessibilityBanner'),
  MediaEmbedsBanner:   () => import('./banners/html/MediaEmbedsBanner'),
  // CSS
  CSSBasicsBanner:           () => import('./banners/css/CSSBasicsBanner'),
  BoxModelBanner:            () => import('./banners/css/BoxModelBanner'),
  FlexboxBanner:             () => import('./banners/css/FlexboxBanner'),
  GridBanner:                () => import('./banners/css/GridBanner'),
  SelectorsBanner:           () => import('./banners/css/SelectorsBanner'),
  ColorsUnitsBanner:         () => import('./banners/css/ColorsUnitsBanner'),
  TypographyBanner:          () => import('./banners/css/TypographyBanner'),
  BackgroundsBanner:         () => import('./banners/css/BackgroundsBanner'),
  ShadowsBanner:             () => import('./banners/css/ShadowsBanner'),
  OverflowBanner:            () => import('./banners/css/OverflowBanner'),
  DisplayPositioningBanner:  () => import('./banners/css/DisplayPositioningBanner'),
  ResponsiveBanner:          () => import('./banners/css/ResponsiveBanner'),
  ImagesBanner:              () => import('./banners/css/ImagesBanner'),
  CustomPropertiesBanner:    () => import('./banners/css/CustomPropertiesBanner'),
  ThemingBanner:             () => import('./banners/css/ThemingBanner'),
  TransformsBanner:          () => import('./banners/css/TransformsBanner'),
  TransitionsBanner:         () => import('./banners/css/TransitionsBanner'),
  AnimationsBanner:          () => import('./banners/css/AnimationsBanner'),
  // JavaScript
  EventLoopBanner:  () => import('./banners/javascript/EventLoopBanner'),
  ClosureBanner:    () => import('./banners/javascript/ClosureBanner'),
  VariablesBanner:  () => import('./banners/javascript/VariablesBanner'),
  ArraysBanner:     () => import('./banners/javascript/ArraysBanner'),
  // TypeScript
  TypeScriptBanner:  () => import('./banners/typescript/TypeScriptBanner'),
  InterfacesBanner:  () => import('./banners/typescript/InterfacesBanner'),
  GenericsBanner:    () => import('./banners/typescript/GenericsBanner'),
  // React
  ComponentsBanner: () => import('./banners/react/ComponentsBanner'),
  StateBanner:      () => import('./banners/react/StateBanner'),
  UseEffectBanner:  () => import('./banners/react/UseEffectBanner'),
  RouterBanner:     () => import('./banners/react/RouterBanner'),
  // Web APIs
  FetchBanner:      () => import('./banners/webapis/FetchBanner'),
  DomEventsBanner:  () => import('./banners/webapis/DomEventsBanner'),
  StorageBanner:    () => import('./banners/webapis/StorageBanner'),
  // HTTP
  AnimatedFlowBanner: () => import('./banners/http/AnimatedFlowBanner'),
  RestBanner:         () => import('./banners/http/RestBanner'),
  StatusCodesBanner:  () => import('./banners/http/StatusCodesBanner'),
  // PostgreSQL
  QueriesBanner: () => import('./banners/postgresql/QueriesBanner'),
  JoinsBanner:   () => import('./banners/postgresql/JoinsBanner'),
  CrudBanner:    () => import('./banners/postgresql/CrudBanner'),
  // Git
  GitIntroBanner:       () => import('./banners/git/GitIntroBanner'),
  GitWorkflowBanner:    () => import('./banners/git/GitWorkflowBanner'),
  GitIgnoreBanner:      () => import('./banners/git/GitIgnoreBanner'),
  GitHubBanner:         () => import('./banners/git/GitHubBanner'),
  GitCollabSetupBanner: () => import('./banners/git/GitCollabSetupBanner'),
  GitConflictBanner:    () => import('./banners/git/GitConflictBanner'),
  GitUndoBanner:        () => import('./banners/git/GitUndoBanner'),
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```

Expected: no output (zero errors).

- [ ] **Step 3: Commit**

```bash
git add src/topics/registry.ts
git commit -m "feat: populate bannerLazyRegistry with all 54 banner entries"
```

---

### Task 11: Final check + push

- [ ] **Step 1: Full TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```

Expected: no output.

- [ ] **Step 2: Verify banner file count**

```bash
find /home/jaywee92/web-dev-guide/src/topics/banners -name "*.tsx" | wc -l
```

Expected: `54`

- [ ] **Step 3: Push**

```bash
git push origin main
```

- [ ] **Step 4: Done**

Every topic page now shows a 220px concept-diagram SVG banner between the title and "How it works" section, with a fade-in animation on mount and topic-color glow.
