# Topic Banner — Design Spec

**Date:** 2026-03-14
**Status:** Draft

## Overview

Each topic page gets a concept-diagram SVG banner inserted between the title area and the "How it works" section. The banner shows the core concept as a recognisable static diagram, giving learners an immediate visual anchor before reading the step-by-step explanation.

---

## Visual Design

**Style:** Option A — title area on top (existing), diagram as a full-width strip below.

**Banner dimensions:**
- Width: 100% of content column (max ~780px, matching existing `maxWidth: 860` minus 40px side padding)
- Height: 220px (fixed, consistent across all topics)
- Border radius: 12px
- Border: `1px solid ${topic.color}20`
- Box shadow: `0 0 40px ${topic.color}08`

**Banner background:**
- Dark base: `#07101a`
- Dot-grid texture: rendered inside each banner SVG (not by the wrapper) — `rgba(topic.color, 0.10)` circles at 26px intervals using `<pattern>`
- Radial glow: `rgba(topic.color, 0.06)` centered, also inside the SVG

**Diagram SVG:**
- `viewBox="0 0 780 220"`, `width="100%"`, `style="display:block"`
- Shows the topic concept directly (not abstract/decorative)
- Topic color used as primary stroke/fill accent
- All text in `font-family: monospace`, minimum 10px
- All elements must be fully visible within the viewBox — no cropping
- Annotation lines (width/height rulers) are optional, used for structural/layout diagrams

**Animation (mount only, no loop):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
>
  {BannerComp ? <BannerComp /> : null}
</motion.div>
```

---

## Page Placement

The banner is inserted in `TopicPage/index.tsx` between `#intro` and `#explanation`. The `#explanation` div's existing `marginTop: 32` is removed (set to 0) — the banner's own `marginBottom` provides the spacing instead.

Actual DOM structure (simplified):

```
<PageWrapper>
  <div style={{ display: 'flex' }}>                 ← flex row
    <TopicSidebar />
    <div style={{ flex:1, padding:'40px 40px 80px', maxWidth:860 }}>
      <div id="intro">                               ← back btn, breadcrumb, progress, H1, desc
        ...existing content unchanged...
      </div>

      ★ <TopicBanner topic={topic} BannerComp={BannerComp} />   ← NEW

      <div id="explanation" style={{ marginTop: 0 }}> ← was 32, now 0
        <SyncExplanation ... />
      </div>
      <KeyTakeaways ... />
      <ContentTabs ... />
    </div>
  </div>
  <NextTopicCard />                                  ← outside the maxWidth div (unchanged)
</PageWrapper>
```

---

## Type Changes

### `src/types/index.ts` — add `bannerComponent` to `Topic`

```ts
export interface Topic {
  // ...existing fields...
  animationComponent: string
  bannerComponent?: string   // ← ADD THIS (optional; omit for fallback gradient)
  // ...
}
```

---

## New Files

### `src/pages/TopicPage/TopicBanner.tsx`

```tsx
import { motion } from 'framer-motion'
import type { ComponentType } from 'react'
import type { Topic } from '@/types'

interface Props {
  topic: Topic
  BannerComp: ComponentType<Record<string, never>> | null
}

export default function TopicBanner({ topic, BannerComp }: Props) {
  const wrapperStyle = {
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

Note: `wrapperStyle` (including `margin` and `boxShadow`) is applied by `TopicBanner` in both the fallback and the animated paths — spacing is always consistent.

### `src/topics/banners/{category}/{TopicId}Banner.tsx` (one per topic)

Example — `src/topics/banners/css/BoxModelBanner.tsx`:

```tsx
export default function BoxModelBanner() {
  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      {/* dot grid, diagram, annotations */}
    </svg>
  )
}
```

- No props, no state — `ComponentType<Record<string, never>>`
- SVG is self-contained (background, dot grid, glow all inside the SVG)
- Named after the component: `BoxModelBanner`, `EventLoopBanner`, etc.

---

## Registry Extension: `src/topics/registry.ts`

Add a separate lazy registry and cache for banners, mirroring the existing animation pattern exactly:

```ts
type BannerComp = ComponentType<Record<string, never>>

const bannerLazyRegistry: Record<string, () => Promise<{ default: BannerComp }>> = {
  BoxModelBanner:            () => import('./banners/css/BoxModelBanner'),
  FlexboxBanner:             () => import('./banners/css/FlexboxBanner'),
  // ... one entry per banner file (see Scope table below)
}

const loadedBannerRegistry: Record<string, BannerComp> = {}

export function getBannerComponent(name: string): BannerComp | null {
  return loadedBannerRegistry[name] ?? null
}

export async function preloadBanner(name: string): Promise<void> {
  if (loadedBannerRegistry[name] || !bannerLazyRegistry[name]) return
  const mod = await bannerLazyRegistry[name]()
  loadedBannerRegistry[name] = mod.default
}
```

The `bannerLazyRegistry` is populated with one entry per banner file as they are created. Entries not yet in the registry are handled gracefully — `getBannerComponent` returns `null`, fallback gradient is shown.

---

## TopicPage/index.tsx Changes

```tsx
// Add imports
import TopicBanner from './TopicBanner'
import { preloadBanner, getBannerComponent } from '@/topics/registry'

// Add state (mirror AnimComp pattern exactly)
const [BannerComp, setBannerComp] = useState<ComponentType<Record<string, never>> | null>(
  () => topic ? getBannerComponent(topic.bannerComponent ?? '') : null
)

// Add effect (mirror AnimComp pattern exactly)
useEffect(() => {
  if (!topic?.bannerComponent) return
  preloadBanner(topic.bannerComponent).then(() => {
    setBannerComp(() => getBannerComponent(topic.bannerComponent!))
  })
}, [topic?.bannerComponent])

// Insert between #intro and #explanation:
<TopicBanner topic={topic} BannerComp={BannerComp} />

// Change #explanation marginTop from 32 to 0:
<div id="explanation" style={{ marginTop: 0 }}>
```

---

## Scope

There are **56 entries** in the current `lazyRegistry` in `registry.ts`. Each topic has exactly one `animationComponent`, so there is one banner per topic. `AnimatedFlow` is a shared component used by multiple topics — those topics share a single `AnimatedFlowBanner` that shows a generic flow diagram.

| Category | Banner component names | Count |
|---|---|---|
| HTML | DomTreeBanner, SemanticBanner, FormsBanner, ElementsBanner, TextHeadingsBanner, LinksImagesBanner, ListsBanner, MediaEmbedsBanner, AccessibilityBanner | 9 |
| CSS | BoxModelBanner, FlexboxBanner, FlexboxUseCasesBanner, GridBanner, GridAreasBanner, SelectorsBanner, CSSBasicsBanner, ColorsUnitsBanner, TypographyBanner, BackgroundsBanner, DisplayPositioningBanner, ResponsiveBanner, ImagesBanner, CustomPropertiesBanner, TransformsBanner, TransitionsBanner, AnimationsBanner, ShadowsBanner, OverflowBanner, ThemingBanner | 20 |
| JavaScript | EventLoopBanner, ClosureBanner, VariablesBanner, ArraysBanner | 4 |
| TypeScript | TypeScriptBanner, InterfacesBanner, GenericsBanner | 3 |
| React | RouterBanner, ComponentsBanner, StateBanner, UseEffectBanner | 4 |
| Web APIs | FetchBanner, DomEventsBanner, StorageBanner | 3 |
| HTTP | RestBanner, StatusCodesBanner | 2 |
| PostgreSQL | QueriesBanner, JoinsBanner, CrudBanner | 3 |
| Git | GitIntroBanner, GitWorkflowBanner, GitIgnoreBanner, GitHubBanner, GitCollabSetupBanner, GitConflictBanner, GitUndoBanner | 7 |
| Shared | AnimatedFlowBanner | 1 |
| **Total** | | **56** |

---

## Diagram Content Guidelines

Each SVG must:
- Show the core concept of the topic at a glance
- Use the topic's `color` as the primary stroke/fill accent
- Be fully readable at 780×220px (no cropping)
- Use `monospace` for all text labels, minimum 10px
- Include dot-grid background + radial glow inside the SVG itself

Diagram types by topic category:

| Category type | Diagram style |
|---|---|
| Box/layout (Box Model, Grid, Flexbox, Display) | Nested rectangles or grid cells with labels |
| Flow/sequence (Event Loop, Fetch, REST, Transitions) | Left-to-right blocks with arrows |
| Tree/hierarchy (DOM, Semantic, HTML Elements) | Vertical indented tree |
| Branch/graph (Git) | Horizontal timeline with branch arcs |
| Comparison (Flexbox vs block, before/after) | Side-by-side split |
| State/toggle (Theming, Animations, CSS Basics) | Before → after with transition arrow |
| Scope/nesting (Closures, Variables) | Nested scope rectangles with labels |
| Table/query (PostgreSQL) | Mini table rows with highlighted cells |
| Component tree (React) | Component hierarchy boxes |
| Type diagram (TypeScript) | Interface / type annotation blocks |
| Config/ignore (GitIgnore, Storage) | File/key-value structure |

---

## Implementation Order

1. Add `bannerComponent?: string` to `Topic` interface in `src/types/index.ts`
2. Create `TopicBanner.tsx` with fallback (no banner files needed yet)
3. Add `getBannerComponent` + `preloadBanner` + empty `bannerLazyRegistry` to `registry.ts`
4. Wire `TopicPage/index.tsx` — state, effect, insert `<TopicBanner>`, set `#explanation` marginTop to 0
5. Run `npx tsc --noEmit` — must pass with zero errors (fallback renders for all topics)
6. Create all 56 banner SVGs in parallel agents (batched by category, ~8 agents)
7. Add `bannerComponent` fields to all topics in `src/data/topics.ts`
8. Add entries to `bannerLazyRegistry` in `registry.ts` as banners are created
9. Final TypeScript check + push
