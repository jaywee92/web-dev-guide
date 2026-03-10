# Homepage Animation Redesign — Design Document

**Goal:** Replace the flat 2-column category tile grid with interactive horizontal category rows featuring SpotlightCard glow, ClickSpark on topic chips, and ShinyText in the hero — all compact and structured.

**Architecture:** Three new in-project components (SpotlightCard, ClickSpark, ShinyText) copied and adapted from reactbits.dev. CategoryGrid.tsx is rewritten to render horizontal rows. HeroSection gets a ShinyText subtitle. No npm packages added.

**Tech Stack:** React, TypeScript, Framer Motion, CSS-in-JS (inline styles).

---

## Layout

Each category = one `SpotlightCard` row:

```
┌─────────────────────────────────────────────────────┐  ← SpotlightCard (spotlight glow on hover)
│  ●  HTML          [Elements] [Semantics] [Forms]    │
└─────────────────────────────────────────────────────┘
```

- Left (180px): colored dot + category title, `border-left: 3px solid category-color`
- Right: topic pills, clickable → `/topic/:id`
- Full row clickable → `/html`, `/css`, etc.
- Staggered Framer Motion entry (60ms delay per row)

## Components

### SpotlightCard
- Tracks mouse position via `onMouseMove`
- Radial gradient overlay: `rgba(color, 0.08)` rest → `rgba(color, 0.15)` hover
- Border: `rgba(255,255,255,0.06)` → `rgba(color, 0.3)` hover
- Accepts `color` prop per category

### ClickSpark
- Wraps any element, listens for click
- Spawns 8 SVG `<line>` particles in category color
- Radius ~20px, duration ~400ms, then removed from DOM

### ShinyText
- CSS `@keyframes` shimmer sweep across text
- Used in HeroSection subtitle

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Home/CategoryGrid.tsx` | Full rewrite — horizontal rows |
| `src/pages/Home/SpotlightCard.tsx` | New component |
| `src/pages/Home/ClickSpark.tsx` | New component |
| `src/pages/Home/ShinyText.tsx` | New component |
| `src/pages/Home/HeroSection.tsx` | Add ShinyText to subtitle |

## Visual Spec

**Topic chips:**
- `border-radius: 20px`, `padding: 3px 10px`, `font-size: 12px`
- Hover: `background: rgba(color, 0.15)`, `color: category-color`
- Transition: `0.15s ease`

**Row stagger:**
- `initial={{ opacity: 0, y: 16 }}` → `animate={{ opacity: 1, y: 0 }}`
- `transition={{ delay: index * 0.06, duration: 0.4 }}`
