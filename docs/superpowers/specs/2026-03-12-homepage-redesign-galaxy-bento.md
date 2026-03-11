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
| `CategoryGrid` | `src/pages/Home/CategoryGrid.tsx` | Rewritten — receives `galaxyRef` + `trailRef` as props, calls `setHover`/`setColor` on TechSection hover |
| `Home` | `src/pages/Home/index.tsx` | Owns `galaxyRef` + `trailRef`, renders GalaxyBackground + CursorTrail + CategoryGrid, centered layout |

`CategoryCard.tsx` receives minor visual updates (already modified for emoji font stack).
`AuroraBackground.tsx` is deleted (all imports and props usage removed from `index.tsx`).
`SpotlightCard` inside `CategoryGrid.tsx` is removed — its cursor-spotlight function is replaced by the CSS `::after`/`::before` pseudo approach on `.tsec` (see below). No `SpotlightCard` renders in the new TechSection.

---

## Ref Interfaces (TypeScript)

```ts
// GalaxyBackground
export interface GalaxyHandle {
  setHover(color: string | null, rect: DOMRect | null): void;
}
// exported and used as: const galaxyRef = useRef<GalaxyHandle>(null)

// CursorTrail
export interface TrailHandle {
  setColor(hex: string | null): void;
}
// exported and used as: const trailRef = useRef<TrailHandle>(null)
```

Both are created with `useRef` in `Home/index.tsx` and passed as props:
```tsx
// Home/index.tsx
<GalaxyBackground ref={galaxyRef} />
<CursorTrail ref={trailRef} />
<CategoryGrid galaxyRef={galaxyRef} trailRef={trailRef} />
```

`CategoryGrid` prop types:
```ts
interface CategoryGridProps {
  galaxyRef: React.RefObject<GalaxyHandle>;
  trailRef: React.RefObject<TrailHandle>;
}
```

---

## GalaxyBackground Component

**Approach:** Pure 2D Canvas API. No WebGL, no external deps. Implemented with `forwardRef` + `useImperativeHandle` exposing `GalaxyHandle`.

**Stars:**
- ~440 stars with random position, radius (0.4–1.6px), speed (0.08–0.22px/frame), twinkle phase
- Drift upward; wrap around top edge
- Base color: near-white blue-gray (`rgba(180, 200, 240, alpha)`)

**Star illumination (imperative, no re-renders):**
- `setHover(color, rect)` stores the current color string and rect. Called from `CategoryGrid` on TechSection `mouseenter`/`mouseleave`.
- On each frame, for each star, compute `inZone(star, rect)` → a value 0..1 using a soft-box margin of 38px:
  ```
  dx = max(0, |star.x - rect_center_x| - rect_half_w)
  dy = max(0, |star.y - rect_center_y| - rect_half_h)
  if dx > 38 or dy > 38: zone = 0
  else: zone = (1 - dx/38) * (1 - dy/38)
  ```
- **Coordinate transform**: `rect` is a `DOMRect` in viewport space. Before zone-testing, subtract the canvas element's own `getBoundingClientRect()` offset from all rect values to convert to canvas-local coordinates.
- **Color lerp**: parse hex accent color to `[r, g, h]`, lerp each channel linearly in sRGB toward base neutral `[180, 200, 240]` by `(1 - zone * t)` where `t` is the current illumination state (0..1, animated toward 1 while hovered, toward 0 on leave). Use `Math.round` before passing to `rgba(r,g,b,alpha)`.
- Add glow halo: `ctx.shadowBlur = zone * 6`, `ctx.shadowColor = accent` for illuminated stars.

**Performance:** `requestAnimationFrame` loop, `devicePixelRatio` scaling, `will-change: transform` on canvas.

---

## CursorTrail Component

**Approach:** Canvas element rendered in `Home/index.tsx` as a sibling to `GalaxyBackground`, positioned `absolute; inset: 0; pointer-events: none; z-index: 2` (above galaxy at z-index 1, below content at z-index 10, well below film grain at z-index 99). Implemented with `forwardRef` + `useImperativeHandle` exposing `TrailHandle`.

**Trail:**
- 18 trail points stored in a circular buffer
- On `mousemove` (listener attached to the page wrapper div in `Home/index.tsx`): push new point, fade oldest
- Each frame: draw glow dot (4px radius) + outer ring (8px) at latest point
- Current color lerps toward `targetColor` (set by `setColor(hex)`) at ~8% per frame
- Trail fades with decreasing alpha per point (oldest → 0)

**`setColor` wiring:** `CategoryGrid` calls `trailRef.current?.setColor(category.color)` on TechSection `mouseenter`, and `trailRef.current?.setColor(null)` on `mouseleave` (null resets target to the default neutral `#3a6090`). This is called from the same handler that calls `galaxyRef.current?.setHover(...)`.

---

## TechSection Card Effects

`SpotlightCard` is **removed** from TechSection. All hover effects are driven by CSS custom properties on the `.tsec` element itself.

### Glassmorphism
```css
.tsec {
  background: rgba(7, 9, 19, 0.42);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.07);
}
```

### CSS Custom Properties (`--tc`, `--sc`)

`--tc` (category accent color) is set on each `.tsec` element as an inline style: `style={{ '--tc': category.color } as React.CSSProperties}`. It is used by the spotlight, border glow, header gradient, icon glow, and category name color.

`--sc` (subcategory accent color) is set on each `.subcat` element as an inline style: `style={{ '--sc': subcat.color } as React.CSSProperties}`. It is used by the count badge and hover border.

### Cursor Spotlight + Border Glow (MagicBento-style)
- `onMouseMove` on each `.tsec` element: use `e.currentTarget.getBoundingClientRect()` to get the card rect (no separate `useRef` needed), compute `x = e.clientX - rect.left`, `y = e.clientY - rect.top`, then set `--mx` and `--my` as inline CSS custom properties via `e.currentTarget.style.setProperty('--mx', x + 'px')`.
- `::after` pseudo: radial-gradient spotlight in `var(--tc)`, opacity 0 → 1 on hover
- `::before` pseudo: border glow radial-gradient in `var(--tc)`

### 3D Tilt
- Same `onMouseMove` handler: compute normalized offset `(x/w - 0.5)` → `rotateY` ±6deg, `(y/h - 0.5)` → `rotateX` ∓6deg
- Applied via `e.currentTarget.style.transform = \`perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)\``
- `onMouseLeave`: reset to `perspective(700px) rotateX(0deg) rotateY(0deg)` via CSS transition (`.tsec { transition: transform 0.4s ease }`)

The single `onMouseMove` handler sets `--mx`, `--my`, and `transform` on `e.currentTarget` — no `useRef` required.

### Entry Animation
- `@keyframes fadeUp`: `opacity: 0, translateY(16px)` → `opacity: 1, translateY(0)`
- Staggered by **global** section index (flat across all three groups, not resetting per group), so delay = `globalIndex * 80ms`
- To compute: initialize `let globalIdx = 0` before the `CATEGORY_GROUPS.map(...)` loop; inside each group's `techSections.map(...)`, use `globalIdx++` per section after reading it.

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

- No shimmer animation
- Hover: slightly lighter background, category-colored border glow
- Count badge: category color tint (`color-mix(in srgb, var(--sc) 18%, #00000033)`)

---

## Category Header (Dominant)

```css
.tsec-head {
  background: linear-gradient(135deg, color-mix(in srgb, var(--tc) 14%, #080d1a), #080d1a);
  border-left: 3px solid var(--tc);
}
.tsec-icon { box-shadow: 0 0 18px color-mix(in srgb, var(--tc) 55%, transparent); }
.tsec-name { font-size: 18px; font-weight: 800; color: var(--tc); }
```

---

## Layout

- `Home/index.tsx`: `position: relative` wrapper div owns both canvas elements and the content. `display: flex; flex-direction: column; align-items: center`
- Content column: `max-width: 680px; width: 100%`
- `CategoryGrid` inner `<section>` max-width changes from 860px → 680px
- Group labels (MARKUP & STIL etc.) with horizontal divider lines
- `mousemove` listener for `CursorTrail` attached to the page wrapper div

---

## Z-Index Stack (inside page wrapper)

| Layer | z-index | Element |
|---|---|---|
| Galaxy canvas | 1 | `GalaxyBackground` canvas |
| Cursor trail | 2 | `CursorTrail` canvas (`pointer-events: none`) |
| Content | 10 | `CategoryGrid`, `HeroSection` (`position: relative`) |
| Film grain | 99 | SVG noise overlay div |

`CursorTrail` at z-index 2 sits above the galaxy (z-index 1) but below all content (z-index 10). The trail canvas is `pointer-events: none` so it never blocks interaction. The content's `position: relative; z-index: 10` creates a stacking context that renders on top of the trail canvas entirely.

---

## Film Grain Overlay

A `<div>` element inside the page wrapper in `Home/index.tsx` with `position: absolute; inset: 0; pointer-events: none; z-index: 99`. Use this exact inline style:

```tsx
<div style={{
  position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 99,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
  backgroundSize: '200px 200px',
  mixBlendMode: 'overlay',
  opacity: 0.055,
}} />
```

---

## What Is NOT Changing

- Route structure, page hierarchy
- `categories.ts` data shape (no new fields needed)
- CategoryTooltip portal behavior
- Mobile layout (out of scope for this redesign)
- `CategoryCard.tsx` (beyond the already-committed emoji font stack fix)

---

## Files Affected

| File | Change |
|---|---|
| `src/pages/Home/index.tsx` | Replace AuroraBackground → GalaxyBackground; remove all AuroraBackground props; add CursorTrail; add film grain div; create `galaxyRef` + `trailRef`; pass both refs to CategoryGrid; add mousemove listener; centered layout |
| `src/pages/Home/GalaxyBackground.tsx` | **New** — Galaxy canvas, `forwardRef`, exposes `GalaxyHandle` |
| `src/pages/Home/CursorTrail.tsx` | **New** — Cursor trail canvas, `forwardRef`, exposes `TrailHandle` |
| `src/pages/Home/CategoryGrid.tsx` | Rewrite TechSection: remove SpotlightCard, add glassmorphism + tilt + spotlight CSS, call `galaxyRef.setHover` + `trailRef.setColor` on hover, change max-width 860 → 680, use global section index for stagger |
| `src/pages/Home/CategoryCard.tsx` | Already done (emoji font stack) |
| `src/pages/Home/AuroraBackground.tsx` | **Delete** |
