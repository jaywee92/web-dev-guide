# Top 5 Visual Animations — Design Document

**Goal:** Replace 2 stubs + upgrade 3 existing animations with rich pictorial visualizations using unique visual metaphors per concept.

**Style:** Animierte Infografik — each topic gets its own visual metaphor. No generic boxes. SVG paths, Framer Motion layout animations, and Lucide icons for pictorial clarity.

**Tech Stack:** React, TypeScript, Framer Motion (layout prop, AnimatePresence, staggerChildren), SVG, Lucide icons. No new npm packages.

**Interface (all animations):**
```tsx
interface Props { step: number; compact?: boolean }
```

---

## 1. DomTreeBuilder (HTML)

**Metaphor:** Growing HTML tree with SVG branch lines

**Steps:**
- Step 0: `<html>` node appears alone
- Step 1: `<head>` + `<body>` grow as children with SVG connecting lines
- Step 2: `<title>`, `<h1>`, `<p>` appear + their lines
- Step 3: One node is "selected" — glowing outline, others dimmed
- Step 4: New `<span>` node inserted live with bounce animation

**Visuals:**
- Nodes: rounded tag-label boxes (`<html>`, `<body>`, etc.) in HTML green (#4ade80)
- Lines: SVG `<line>` with `scaleY` animation from parent to child
- Selected state: `boxShadow` glow ring, siblings at 40% opacity
- Layout: centered tree, each level a flex row

**Animation techniques:**
- `staggerChildren` for node appearance
- `scaleY: 0→1` with `transformOrigin: top` for branch lines
- `AnimatePresence` for node insertion at step 4

---

## 2. FlexboxViz (CSS)

**Metaphor:** Live layout demo — colored boxes rearrange in real time

**Steps:**
- Step 0: `flex-direction: row` — 3 boxes side by side
- Step 1: `flex-direction: column` — boxes stack
- Step 2: `justify-content: space-between` — boxes spread
- Step 3: `align-items: center` — boxes center on cross axis
- Step 4: `flex-wrap: wrap` — 5 boxes, last 2 wrap to new line

**Visuals:**
- Container: dashed border, labeled "flex container"
- Items: colored rounded boxes (A, B, C...) in category colors
- Code badge at top showing active CSS rule changes with each step
- Smooth reflow via Framer Motion `layout` prop

**Animation techniques:**
- Framer Motion `layout` prop on each box — automatic FLIP animation on position change
- `AnimatePresence` for adding boxes at step 4
- Code badge text swaps with `AnimatePresence mode="wait"`

---

## 3. EventLoopViz (Upgrade — JS)

**Metaphor:** Visual machine with 3 zones — conveyor belt style

**Steps:**
- Step 0: Empty Call Stack + empty Queue — machine idle
- Step 1: `main()` + `setTimeout()` appear in Call Stack
- Step 2: `setTimeout` moves to Web APIs zone — timer bubble with countdown
- Step 3: Callback appears on Task Queue conveyor belt
- Step 4: Event Loop moves callback into Stack — executed, stack clears

**Visuals:**
- 3 zones side by side: Call Stack (left) | Web APIs (center) | Task Queue (right)
- Call Stack: cards slide in/out vertically with spring animation
- Web APIs: floating bubble with animated border + timer text
- Task Queue: items slide in from right like a conveyor belt
- Animated SVG arrow paths between zones with glowing stroke
- Event Loop: spinning ↻ icon between Stack and Queue zones

**Animation techniques:**
- `AnimatePresence` for stack card enter/exit
- `pathLength: 0→1` for SVG connection arrows
- Spring physics: `stiffness: 300, damping: 22`
- Glowing `boxShadow` pulse on active zone

---

## 4. ComponentsViz (React)

**Metaphor:** Lego bricks snapping together to form an App

**Steps:**
- Step 0: Single `<Button>` block alone
- Step 1: `<Card>` block appears beside it
- Step 2: `<Nav>` block appears above
- Step 3: All snap together into `<App>` (spring animation)
- Step 4: Props arrows appear from App → Button (color, onClick)

**Visuals:**
- Component blocks: rounded rectangles with small circles on top (Lego studs)
- Each component has unique color: Nav=blue, Card=purple, Button=pink
- "Snap" animation: blocks slide into place with spring overshoot
- Props: small labeled arrows (`color=`, `onClick=`) from parent to child
- `<App>` wrapper appears as outer container at step 3

**Animation techniques:**
- Spring animation `[0.34, 1.56, 0.64, 1]` ease for snap feel
- `AnimatePresence` for sequential block appearance
- `staggerChildren` for props arrows

---

## 5. FetchViz (Web APIs)

**Metaphor:** Data packet journey — Browser → Server → back with JSON

**Steps:**
- Step 0: Browser icon (left) + Server icon (right), dashed path between them
- Step 1: `fetch('/api/users')` badge — packet travels left→right
- Step 2: Server "thinking" spinner — packet waits at server
- Step 3: Response packet travels right→left (different color)
- Step 4: JSON unrolls at browser: `[{id:1, name:"Ana"}...]` + `200 OK` green badge

**Visuals:**
- Browser: Monitor icon (Lucide) in blue box
- Server: Server icon (Lucide) in green box
- Path: SVG dashed `<line>` between them
- Packet: small colored rectangle animates along the path
- JSON: lines appear one by one with stagger
- Status badge: green pill `200 OK`

**Animation techniques:**
- `x` translate for packet travel along path
- `pathLength` for drawing the dashed line
- `staggerChildren` for JSON lines appearing
- `AnimatePresence` for response packet vs request packet swap

---

## Files

| File | Status |
|------|--------|
| `src/topics/html/DomTreeBuilder.tsx` | Stub → full implementation |
| `src/topics/css/FlexboxViz.tsx` | Stub → full implementation |
| `src/topics/javascript/EventLoopViz.tsx` | Upgrade existing |
| `src/topics/react/ComponentsViz.tsx` | Stub → full implementation |
| `src/topics/webapis/FetchViz.tsx` | Stub → full implementation |
