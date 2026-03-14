# Resources Page — Design Spec

**Date:** 2026-03-14
**Status:** Draft

## Overview

A new standalone `/resources` page listing curated external web development resources. No subcategories, no topics — pure external links. Resources are organized into 5 labeled groups, each rendered as a 3-column showcase grid. Each card has a colored gradient header with SVG icon, title, description, and a URL chip.

---

## Route & Navigation

- **Route:** `/resources` added to `App.tsx`
- **Navbar:** A `RESOURCES` text link button added between the Reference dropdown and the Search button. Same visual style as the Reference button (monospace, border, hover color) but a plain `Link` (no dropdown). Accent color: `#a78bfa` (purple).

---

## Data Model

**File:** `src/data/resources.tsx`  (`.tsx` to allow JSX icon nodes)

```tsx
export interface Resource {
  id: string
  name: string
  url: string             // full URL (e.g. "https://heroui.com")
  displayUrl: string      // short display form (e.g. "heroui.com")
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

Icons are JSX rendered inside a fixed `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} opacity={0.85}>` wrapper in the page component. Each resource's `icon` field contains only the SVG child elements (`<circle>`, `<path>`, `<polygon>`, etc.) — no wrapper SVG tag, no external references.

**Groups and resources:**

| Group | Label | Color | Resources |
|---|---|---|---|
| `ui-components` | UI COMPONENT LIBRARIES | `#5b9cf5` | HeroUI, DaisyUI, UIverse.io |
| `animated-components` | ANIMATED COMPONENTS | `#f472b6` | Aceternity UI, Magic UI, Hover.dev |
| `animation` | ANIMATION & MOTION | `#fb923c` | Anime.js |
| `react` | REACT RESOURCES | `#e879f9` | ReactBits |
| `tools` | TOOLS & AI | `#34d399` | v0 by Vercel, WebCode.tools |

**Resource details:**

| id | name | displayUrl | color |
|---|---|---|---|
| `heroui` | HeroUI | `heroui.com` | `#f472b6` |
| `daisyui` | DaisyUI | `daisyui.com` | `#4ade80` |
| `uiverse` | UIverse.io | `uiverse.io` | `#a78bfa` |
| `aceternity` | Aceternity UI | `ui.aceternity.com` | `#5b9cf5` |
| `magicui` | Magic UI | `magicui.design` | `#38bdf8` |
| `hover-dev` | Hover.dev | `hover.dev` | `#fbbf24` |
| `animejs` | Anime.js | `animejs.com` | `#fb923c` |
| `reactbits` | ReactBits | `reactbits.dev` | `#e879f9` |
| `v0` | v0 by Vercel | `v0.dev` | `#34d399` |
| `webcode-tools` | WebCode.tools | `webcode.tools` | `#2dd4bf` |

---

## Page Component

**File:** `src/pages/ResourcesPage/index.tsx`

Single file, no sub-components.

### Layout

```
PageWrapper
  └─ max-width: 1100px, margin: 0 auto, padding: 48px 40px 80px
      ├─ Page header
      │    ├─ "RESOURCES" breadcrumb label (monospace, var(--text-faint))
      │    ├─ <h1> "Useful Resources"
      │    └─ <p> subtitle
      └─ [ResourceGroup sections × 5]
           ├─ Group header row
           │    ├─ 3px colored left accent bar
           │    ├─ Group label (monospace, group.color)
           │    ├─ flex-1 divider line
           │    └─ "N resources" count
           └─ 3-column CSS grid (gap: 10px)
                └─ [ResourceCard × N]
```

### ResourceCard

Each card is an `<a target="_blank" rel="noopener noreferrer">` wrapping:

1. **Header area** (height: 80px): `linear-gradient` using `resource.color` at low opacity (10–15%) over the dark base `#0d1a2a`. SVG icon centered (36×36, stroke = `resource.color`, strokeWidth 1.5, opacity 0.85). Small `↗` indicator top-right in `var(--text-faint)`.

2. **Body** (padding: 12px, flex-column, gap: 6px):
   - `resource.name` — 13px bold, `var(--text)`
   - `resource.description` — 11px, `var(--text-muted)`, line-height 1.55, flex: 1
   - URL chip — `resource.displayUrl ↗`, 10px monospace, `var(--text-faint)`, dark background chip with `var(--border)` border

**Hover state:** `border-color` transitions from `var(--border)` → `resource.color` at 50% opacity. `0.2s ease` transition.

**No JavaScript click handlers** — pure `<a>` tags with `target="_blank"`.

### SVG Icon rendering

```tsx
<svg
  width="36" height="36" viewBox="0 0 24 24"
  fill="none" stroke={resource.color} strokeWidth={1.5} opacity={0.85}
>
  {resource.icon}
</svg>
```

Icons are JSX literals defined directly in `resources.tsx`:
```tsx
icon: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></>
```

No `dangerouslySetInnerHTML`, no external assets, no sanitization needed.

---

## Files Changed

| File | Change |
|---|---|
| `src/data/resources.tsx` | New — `RESOURCE_GROUPS` data with JSX icons |
| `src/pages/ResourcesPage/index.tsx` | New — page component |
| `src/App.tsx` | Add `<Route path="/resources" element={<ResourcesPage />} />` |
| `src/components/layout/Navbar.tsx` | Add Resources nav link |
