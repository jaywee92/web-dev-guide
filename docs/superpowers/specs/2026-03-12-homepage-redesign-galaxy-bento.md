# Homepage Redesign — Galaxy Background + MagicBento Effects

## Overview

Full visual overhaul of the web-dev-guide homepage. Replaces the WebGL2 Aurora background with an animated 2D Galaxy canvas, integrates MagicBento-inspired interactive card effects, adds a cursor trail, and applies glassmorphism so the galaxy background shows through the category cards.

---

## Goals

- Replace AuroraBackground (WebGL2) with a lightweight animated Galaxy canvas (2D Canvas API)
- Stars in the hovered TechSection region illuminate/colorize to the category's accent color
- TechSection cards use glassmorphism so the galaxy is visible through them
- MagicBento-inspired effects: cursor spotlight, border glow, 3D tilt on hover
- Custom cursor trail that transitions color to match the hovered category
- No new npm packages (custom Canvas implementations only)
- Centered layout (max-width: 680px, margin auto)
- Keep the existing 3-group TechSection column structure (MARKUP & STIL, PROGRAMMIERUNG, FRAMEWORKS & WEB)

---

## Architecture

### Components

| Component | File | Purpose |
|---|---|---|
| `GalaxyBackground` | `src/pages/Home/GalaxyBackground.tsx` | Replaces AuroraBackground. 2D Canvas, ~440 drifting stars, imperative ref handle |
| `CursorTrail` | `src/pages/Home/CursorTrail.tsx` | Canvas cursor trail overlay, 18 trail points, color synced with hovered category |
| `CategoryGrid` | `src/pages/Home/CategoryGrid.tsx` | Rewritten — passes galaxyRef, calls `setHover` on TechSection hover, handles 3D tilt |
| `Home` | `src/pages/Home/index.tsx` | Replaces AuroraBackground with GalaxyBackground, adds CursorTrail, centered layout |

`CategoryCard.tsx` receives minor visual updates (already modified for emoji font stack).

---

## GalaxyBackground Component

**Approach:** Pure 2D Canvas API. No WebGL, no external deps.

**Stars:**
- ~440 stars with random position, radius (0.4–1.6px), speed (0.08–0.22px/frame), twinkle phase
- Drift upward; wrap around top edge
- Base color: near-white blue-gray (`rgba(180,200,240, alpha)`)

**Star illumination (imperative, no re-renders):**
- Ref handle: `galaxyRef.current.setHover(color: string | null, rect: DOMRect | null)`
- Called from CategoryGrid on TechSection `mouseenter` / `mouseleave`
- On each frame, for each star within the hovered rect (with 38px soft-margin fade):
  - Blend star color from neutral → category accent color using `color-mix`-equivalent lerp
  - Add a subtle glow halo (`shadowBlur` 3–6px in category color)
- Stars outside the rect render in neutral color

**Performance:** `requestAnimationFrame` loop, `devicePixelRatio` scaling, `will-change: transform` on canvas.

---

## CursorTrail Component

**Approach:** Absolute-positioned Canvas overlay inside the demo container. `pointer-events: none`.

**Trail:**
- 18 trail points stored in a circular buffer
- On `mousemove`: push new point, fade oldest
- Each frame: draw glow dot (4px radius) + outer ring (8px) at latest point
- Color lerps toward `currentColor` (set by `setColor(hex)` imperative method)
- Trail fades with decreasing alpha per point

---

## TechSection Card Effects

### Glassmorphism
```css
.tsec {
  background: rgba(7, 9, 19, 0.42);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.07);
}
```

### Cursor Spotlight + Border Glow (MagicBento-style)
- `--mx` / `--my` CSS custom properties updated on `mousemove` (relative to card)
- `::after` pseudo: radial-gradient spotlight in category color (opacity 0 → 1 on hover)
- `::before` pseudo: border glow radial-gradient in category color

### 3D Tilt
- `mousemove` on `.tsec`: compute normalized offset → `rotateX/Y` (±6deg)
- `perspective(700px)` on parent
- Reset to `rotateX(0) rotateY(0)` on `mouseleave` with CSS transition

### Entry Animation
- `@keyframes fadeUp`: `opacity: 0, translateY(16px)` → `opacity: 1, translateY(0)`
- Staggered `animation-delay` per TechSection card (0ms, 80ms, 160ms, …)

---

## Subcategory Cards

```css
.subcat {
  background: rgba(14, 22, 45, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.22);
}
.subcat-label { color: #b8d4f0; }
.subcat-topics { color: #7a9fc4; }
```

- No shimmer animation (removed)
- Hover: slightly lighter background, category-colored border glow
- Count badge: category color tint

---

## Category Header (Dominant)

```css
.tsec-head {
  background: linear-gradient(135deg, color-mix(in srgb, var(--tc) 14%, #080d1a), #080d1a);
  border-left: 3px solid var(--tc);
}
.tsec-icon { box-shadow: 0 0 18px color-mix(in srgb, var(--tc) 55%, transparent); }
.tsec-name { font-size: 18px; font-weight: 800; color: var(--tc); text-shadow: 0 0 22px color-mix(...); }
```

---

## Layout

- `Home/index.tsx`: `display: flex; flex-direction: column; align-items: center`
- Content column: `max-width: 680px; width: 100%`
- Group labels (MARKUP & STIL etc.) with horizontal divider lines

---

## Film Grain Overlay

SVG `feTurbulence` data-URI background at `z-index: 99`, `mix-blend-mode: overlay`, `opacity: 0.055`.

---

## What Is NOT Changing

- Route structure, page hierarchy
- `categories.ts` data shape (no new fields needed)
- CategoryTooltip portal behavior
- Mobile layout (out of scope for this redesign)

---

## Files Affected

| File | Change |
|---|---|
| `src/pages/Home/index.tsx` | Replace AuroraBackground → GalaxyBackground, add CursorTrail, centered layout |
| `src/pages/Home/GalaxyBackground.tsx` | **New** — Galaxy canvas component |
| `src/pages/Home/CursorTrail.tsx` | **New** — Cursor trail canvas overlay |
| `src/pages/Home/CategoryGrid.tsx` | Rewrite TechSection with glassmorphism, tilt, spotlight, star illumination hook |
| `src/pages/Home/CategoryCard.tsx` | Minor — emoji font stack (already done) |
| `src/pages/Home/AuroraBackground.tsx` | Remove (replaced) |
