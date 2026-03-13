# Topic Banner — Design Spec

**Date:** 2026-03-14
**Status:** Approved

## Overview

Each topic page gets a concept-diagram SVG banner inserted between the title area and the "How it works" section. The banner shows the core concept as a recognisable static diagram, giving learners an immediate visual anchor before reading the step-by-step explanation.

---

## Visual Design

**Style:** Option A — title area on top (existing), diagram as a full-width strip below.

**Banner dimensions:**
- Width: 100% of content column (max ~780px, matching existing `maxWidth: 860` minus padding)
- Height: 220px (fixed, consistent across all topics)
- Border radius: 12px
- Border: `1px solid {topic.color}20`
- Box shadow: `0 0 40px {topic.color}08`

**Banner background:**
- Dark: `#07101a` (very dark, slightly blue-tinted — matches app dark theme)
- Dot-grid texture: `rgba(topic.color, 0.10)` circles at 26px intervals
- Radial glow: `rgba(topic.color, 0.06)` centered

**Diagram SVG:**
- `viewBox="0 0 780 220"`, `width="100%"`
- Shows the topic concept directly (not abstract/decorative)
- Topic color used as primary accent
- All text in `font-family: monospace`, minimum 10px
- All elements must be fully visible within the viewBox — no cropping
- Annotation lines (width/height rulers) optional but recommended for structural diagrams

**Animation (mount only, no loop):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
>
```

---

## Page Placement

In `TopicPage/index.tsx`, the banner is inserted between `#intro` and `#explanation`:

```
#intro
  ← back button
  breadcrumb
  progress bar
  H1 title
  description
  [reference link]

★ <TopicBanner>   ← NEW, inserted here

#explanation
  SyncExplanation (sticky anim + step cards)

KeyTakeaways
ContentTabs
NextTopicCard
```

---

## Architecture

### New component: `src/pages/TopicPage/TopicBanner.tsx`

```tsx
interface Props {
  topic: Topic
  BannerComp: ComponentType | null
}
```

- Renders the motion wrapper + `BannerComp` SVG
- If `BannerComp` is null: renders a simple 220px gradient fallback strip using `topic.color`
- No click interaction, no state

### Banner components: `src/topics/banners/{category}/{TopicId}Banner.tsx`

- One file per topic, e.g. `src/topics/banners/css/BoxModelBanner.tsx`
- Export: `export default function BoxModelBanner() { return <svg ...> }`
- No props, no state — pure SVG wrapped in a React fragment
- SVG `viewBox="0 0 780 220"`, `width="100%"`, `display: block`

### Registry extension: `src/topics/registry.ts`

Extend the existing registry (which already handles `animationComponent` lazy loading) to also handle `bannerComponent`:

```ts
// New field alongside animationComponent
bannerComponent?: string

// New functions mirroring existing animation API:
export function preloadBanner(name?: string): Promise<void>
export function getBannerComponent(name?: string): ComponentType | null
```

### Topics data: `src/data/topics.ts`

Add `bannerComponent` field to each topic:

```ts
bannerComponent: 'BoxModelBanner',
```

Topics without a banner component omit the field (fallback gradient strip shown).

### TopicPage/index.tsx changes

1. Import `preloadBanner`, `getBannerComponent`, `TopicBanner`
2. Add state: `const [BannerComp, setBannerComp] = useState(...)`
3. Add effect: preload banner on topic change (same pattern as AnimComp)
4. Insert `<TopicBanner topic={topic} BannerComp={BannerComp} />` between `#intro` and `#explanation`

---

## Scope

All ~54 topics that currently have an `animationComponent` get a banner. Topics are grouped by category:

| Category | Topics | Count |
|---|---|---|
| HTML | elements, forms, headings, lists, links-images, semantic, accessibility, media-embeds | 8 |
| CSS | box-model, flexbox, grid, typography, colors-units, display-positioning, selectors, css-basics, transforms, transitions, animations, backgrounds, responsive, overflow, shadows, theming, custom-properties, images | 18 |
| JavaScript | variables, closures, arrays, event-loop | 4 |
| React | components, state, use-effect, router | 4 |
| TypeScript | typescript-intro, interfaces, generics | 3 |
| Web APIs | dom-events, fetch, storage | 3 |
| HTTP | rest, status-codes | 2 |
| PostgreSQL | crud, queries, joins | 3 |
| Git | git-intro, git-workflow, github, gitignore, git-conflict, git-undo, git-collab-setup | 7 |

**Total: ~56 banners**

---

## Diagram Content Guidelines

Each SVG must:
- Show the core concept of the topic at a glance
- Use the topic's `color` as the primary stroke/fill accent
- Be fully readable at 780×220px
- Use `monospace` font for all labels
- Include a dot-grid background for texture

Diagram types by topic category:
- **Box Model / layout topics** → nested rectangles with dimension annotations
- **Flow/sequence topics (Event Loop, Fetch, REST)** → left-to-right block flow with arrows
- **Tree/hierarchy topics (DOM, HTML structure)** → vertical tree diagram
- **Branch/graph topics (Git)** → horizontal timeline with branch arcs
- **Comparison topics (Flexbox, Grid)** → side-by-side layout examples
- **State/toggle topics (Theming, Transitions)** → before/after split

---

## Fallback

If a topic has no `bannerComponent`, `TopicBanner` renders:

```tsx
<div style={{
  height: 220,
  borderRadius: 12,
  background: `linear-gradient(135deg, ${topic.color}14, ${topic.color}04)`,
  border: `1px solid ${topic.color}20`,
  margin: '8px 0 36px',
}} />
```

---

## Implementation Order

1. Create `TopicBanner.tsx` component with fallback
2. Extend `registry.ts` with banner lazy-loading
3. Wire `TopicPage/index.tsx` (insert banner, add state/effect)
4. Verify TypeScript clean with fallback only (no banners yet)
5. Create all ~56 banner SVGs in parallel agents (batched by category)
6. Add `bannerComponent` fields to `topics.ts`
7. Final TypeScript check + push
