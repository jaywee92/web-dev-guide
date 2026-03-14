# Resources Page — Design Spec

**Date:** 2026-03-14
**Status:** Approved

## Overview

A new standalone `/resources` page listing curated external web development resources. No subcategories, no topics — pure external links. Resources are organized into 5 labeled groups, each rendered as a responsive showcase grid. Each card has a colored gradient header with SVG icon, title, description, and a URL chip.

---

## Route & Navigation

- **Route:** `/resources` added to `App.tsx`. The page gets the entrance animation automatically from the existing `<AnimatePresence mode="wait">` wrapper in `App.tsx` — no additional motion wrapping needed.
- **Navbar:** A `RESOURCES` `<Link>` button inserted between the Reference dropdown and the Search button (i.e. third from right, before Search, after Reference). Visual style: same monospace font, border, padding as the Reference button but no dropdown arrow and no open state. Hover: `onMouseEnter`/`onMouseLeave` handlers set `borderColor` and `color` to `#a78bfa` (same imperative pattern as Reference button). Default color: `var(--text-muted)`. Default border: `var(--border)`.

---

## Data Model

**File:** `src/data/resources.tsx` (`.tsx` to allow JSX icon nodes)

```tsx
export interface Resource {
  id: string
  name: string
  url: string             // full URL (e.g. "https://heroui.com")
  description: string     // 1–2 sentence description
  color: string           // hex, used for icon stroke and gradient tint
  icon: React.ReactNode   // inline SVG children as JSX (no dangerouslySetInnerHTML)
}

export interface ResourceGroup {
  id: string
  label: string           // e.g. "UI COMPONENT LIBRARIES"
  color: string           // hex for category header accent
  resources: Resource[]
}

export const RESOURCE_GROUPS: ResourceGroup[]
```

**`displayUrl` is not stored** — derived at render time: `new URL(resource.url).host`.

Icons are JSX fragments defined inline in the data file:
```tsx
icon: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></>
```

No `dangerouslySetInnerHTML`, no external assets, no sanitization needed.

**Groups and resources:**

| Group id | Label | Color | Resources |
|---|---|---|---|
| `ui-components` | UI COMPONENT LIBRARIES | `#5b9cf5` | HeroUI, DaisyUI, UIverse.io |
| `animated-components` | ANIMATED COMPONENTS | `#f472b6` | Aceternity UI, Magic UI, Hover.dev |
| `animation` | ANIMATION & MOTION | `#fb923c` | Anime.js |
| `react` | REACT RESOURCES | `#e879f9` | ReactBits |
| `tools` | TOOLS & AI | `#34d399` | v0 by Vercel, WebCode.tools |

**Resource details:**

| id | name | url | color |
|---|---|---|---|
| `heroui` | HeroUI | `https://www.heroui.com` | `#f472b6` |
| `daisyui` | DaisyUI | `https://daisyui.com` | `#4ade80` |
| `uiverse` | UIverse.io | `https://uiverse.io` | `#a78bfa` |
| `aceternity` | Aceternity UI | `https://ui.aceternity.com` | `#5b9cf5` |
| `magicui` | Magic UI | `https://magicui.design` | `#38bdf8` |
| `hover-dev` | Hover.dev | `https://www.hover.dev` | `#fbbf24` |
| `animejs` | Anime.js | `https://animejs.com` | `#fb923c` |
| `reactbits` | ReactBits | `https://reactbits.dev` | `#e879f9` |
| `v0` | v0 by Vercel | `https://v0.dev` | `#34d399` |
| `webcode-tools` | WebCode.tools | `https://webcode.tools` | `#2dd4bf` |

---

## Page Component

**File:** `src/pages/ResourcesPage/index.tsx`

Single file, no sub-components.

### Layout

```
PageWrapper
  └─ max-width 1100px, margin auto, padding 48px 24px 80px
      ├─ Page header
      │    ├─ "RESOURCES" label (11px monospace, var(--text-faint), letter-spacing 0.08em)
      │    ├─ <h1> "Useful Resources" (28px, 800 weight, var(--text))
      │    └─ <p> subtitle (14px, var(--text-muted))
      └─ [ResourceGroup sections × 5]  (marginBottom: 40px each)
           ├─ Group header row
           │    ├─ 3px × 18px colored accent bar (background: group.color, borderRadius: 2px)
           │    ├─ Group label (11px monospace, group.color, letterSpacing 0.1em, fontWeight 700)
           │    ├─ flex-1 divider line (height 1px, background var(--border))
           │    └─ "N resources" count (10px, var(--text-faint))
           └─ CSS grid
                └─ gridTemplateColumns: repeat(auto-fill, minmax(280px, 1fr))
                   gap: 10px
                   ResourceCard per resource (key={resource.id})
```

Using `auto-fill` + `minmax(280px, 1fr)` ensures single-item groups (Animation, React) render as a single naturally sized card rather than spanning an empty 3-column row.

### ResourceCard

`<a href={resource.url} target="_blank" rel="noopener noreferrer">` styled as a card. No JS click handlers.

**Structure (flex-column, full height):**

1. **Header area** — height 80px, position relative, borderBottom `var(--border)`.
   - Background: `linear-gradient(135deg, ${resource.color}1a 0%, ${resource.color}0d 100%)` over base `#0d1a2a`. (`1a` = 10%, `0d` = 5% hex alpha — gives a subtle tinted gradient without washing out the dark background.)
   - Centered: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={resource.color} strokeWidth={1.5} opacity={0.85}>{resource.icon}</svg>`
   - Top-right: `↗` in 10px `var(--text-faint)`, position absolute top-8 right-8.

2. **Body** — padding 12px, flex-column, gap 6px, flex 1.
   - Name: 13px, fontWeight 800, `var(--text)`
   - Description: 11px, `var(--text-muted)`, lineHeight 1.55, flex 1
   - URL chip: `new URL(resource.url).host + ' ↗'`, 10px monospace, `var(--text-faint)`, background `var(--bg)` or `#07101a`, border `1px solid var(--border)`, borderRadius 5px, padding `4px 8px`, display inline-block, width fit-content.

**Card base styles:** background `var(--surface)`, border `1px solid var(--border)`, borderRadius 10px, overflow hidden, display flex, flexDirection column, textDecoration none.

**Hover:** `onMouseEnter` → `borderColor = resource.color + '80'` (50% alpha). `onMouseLeave` → `borderColor = 'var(--border)'`. Transition: `border-color 0.2s ease`.

---

## Files Changed

| File | Change |
|---|---|
| `src/data/resources.tsx` | New — `Resource`, `ResourceGroup` interfaces + `RESOURCE_GROUPS` data |
| `src/pages/ResourcesPage/index.tsx` | New — page component |
| `src/App.tsx` | Add `import ResourcesPage` + `<Route path="/resources" element={<ResourcesPage />} />` |
| `src/components/layout/Navbar.tsx` | Add Resources `<Link>` between Reference dropdown and Search button |
