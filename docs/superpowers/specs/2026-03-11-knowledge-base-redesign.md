# Knowledge Base Redesign — Design Spec

## Overview

Redesign the web-dev-guide as an animated reference documentation system (knowledge base / lexikon). Three concurrent changes:

1. **CSS split** — one 15-topic category → three focused categories
2. **Homepage redesign** — category list with group section headers
3. **Category + Topic page redesign** — reference-doc style with numbered entries, breadcrumbs, on-page nav

All decisions confirmed via visual mockup (brainstorm session 2799005-1773217532).

---

## 1. CSS Split

### New Categories (replaces existing `css`)

| ID | Title | Color | Topics |
|---|---|---|---|
| `css-grundlagen` | CSS Grundlagen | `#5b9cf5` | css-basics, css-selectors, css-colors-units, css-box-model, css-typography, css-backgrounds-gradients, css-images |
| `css-layout` | CSS Layout | `#38bdf8` | css-display-positioning, css-flexbox, css-grid, css-responsive |
| `css-modern` | CSS Modern | `#a78bfa` | css-custom-properties, css-transforms, css-transitions, css-animations |

### Data Changes
- `src/data/categories.ts` — remove `css`, add the 3 new categories
- `src/data/topics.ts` — update `category` field on all 15 CSS topics to new IDs
- `src/types/index.ts` — update `CategoryId` union type to:
  ```ts
  export type CategoryId = 'html' | 'css-grundlagen' | 'css-layout' | 'css-modern'
    | 'javascript' | 'typescript' | 'react' | 'webapis' | 'http' | 'postgresql'
  ```

---

## 2. Homepage — Group Headers

### Category Groups (new concept)

Three named groups render as section dividers above their categories:

| Group key | Label | Category IDs |
|---|---|---|
| `markup-style` | `MARKUP & STIL` | `html`, `css-grundlagen`, `css-layout`, `css-modern` |
| `programmierung` | `PROGRAMMIERUNG` | `javascript`, `typescript` |
| `frameworks-web` | `FRAMEWORKS & WEB` | `react`, `webapis`, `http`, `postgresql` |

### Implementation Approach

Add `CATEGORY_GROUPS` array and `CategoryGroup` type to `src/data/categories.ts`:
```ts
export interface CategoryGroup {
  key: string
  label: string
  categoryIds: CategoryId[]
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  { key: 'markup-style',    label: 'MARKUP & STIL',      categoryIds: ['html', 'css-grundlagen', 'css-layout', 'css-modern'] },
  { key: 'programmierung',  label: 'PROGRAMMIERUNG',     categoryIds: ['javascript', 'typescript'] },
  { key: 'frameworks-web',  label: 'FRAMEWORKS & WEB',   categoryIds: ['react', 'webapis', 'http', 'postgresql'] },
]
```

`CategoryGrid.tsx` iterates over `CATEGORY_GROUPS`, renders a small `<GroupLabel>` text header before each group, then renders `CategoryRow` for each category in the group.

### CategoryRow — compact mode for small categories

Any category with **≤ 4 topics** uses a compact card (title + topic count only, no chip list). Categories with > 4 topics render as full rows with topic chips as before. This is a topic-count rule, not a group-position rule.

---

## 3. Category Page Redesign

### Layout
- Breadcrumb: `Docs / {Category Title}`
- Header: icon + title + topic count badge + description
- Topic list: vertical stack of numbered reference cards

### Reference Card (per topic)
```
[ 01 ]  Topic Title                    Level 2
        Short description (1 sentence)
        [Viz] [Playground] [Cheat Sheet]   →
```

- Number badge reflects order within category
- Feature badges show which features the topic has:
  - `Viz` — always (every topic has an animation component)
  - `Playground` — if `topic.playgroundType !== 'none'`
  - `Cheat Sheet` — if `topic.cheatSheet` is defined
- Hover: border highlight in category color
- Click: navigate to `/topic/{topicId}`

### `hasReference` condition

Replace the hardcoded `categoryId === 'html' || categoryId === 'css'` check with:
```ts
const hasReference = categoryId === 'html' || categoryId.startsWith('css-')
```
This shows the Reference link for all three CSS sub-categories.

---

## 4. Topic Page Redesign

### Breadcrumb
Below the back button:
```
Docs / CSS Layout / Flexbox
```

### On-Page Sidebar Navigation
The `TopicSidebar` gains a second section below the category topic list:

**AUF DIESER SEITE** — anchor links to hardcoded section IDs. This is a separate section at the bottom of the `TopicSidebar` aside, rendered after the full topic list. It is always visible when a topic page is active.

Links:
- Was ist {topic.title}?  → `#intro`
- Visualisierung          → `#viz`
- Erklärung               → `#explanation`
- Cheat Sheet             → `#cheatsheet` (only if `topic.cheatSheet` is defined)
- Playground              → `#playground` (only if `topic.playgroundType !== 'none'`)

### Section IDs in Topic Page

These are plain `id` attributes on wrapper `<div>` elements — they do **not** map to the existing `Section` interface (`type: 'intro' | 'explanation' | 'playground'`). The existing `Section` data model drives step content; the new `id` attributes are purely for in-page anchor scrolling:

```tsx
<div id="intro">   {/* title, description, reference link */}
<div id="viz">     {/* IntroAnimation */}
<div id="explanation"> {/* SyncExplanation */}
<div id="cheatsheet">  {/* CheatSheet — conditional */}
<div id="playground">  {/* PlaygroundSection — conditional */}
```

---

## File Map

| File | Action |
|---|---|
| `src/types/index.ts` | MODIFY — update `CategoryId` union |
| `src/data/categories.ts` | MODIFY — split css → 3, add `CATEGORY_GROUPS` |
| `src/data/topics.ts` | MODIFY — update `category` on 15 CSS topics |
| `src/pages/Home/CategoryGrid.tsx` | MODIFY — render group headers, compact small-category layout |
| `src/pages/CategoryPage/index.tsx` | MODIFY — breadcrumb + numbered reference cards |
| `src/pages/TopicPage/index.tsx` | MODIFY — breadcrumb + section IDs |
| `src/components/layout/TopicSidebar.tsx` | MODIFY — add on-page anchor nav section |
| `src/App.tsx` (or router) | MODIFY — add `/css-grundlagen`, `/css-layout`, `/css-modern` routes; remove `/css` route |

---

## Non-Goals (YAGNI)

- No alphabetical index view
- No tag/keyword cross-linking
- No topic search within category page
- No progress tracking / completion badges
- No mobile sidebar (existing behavior unchanged)
- No rename of existing topic IDs (routes stay stable)
