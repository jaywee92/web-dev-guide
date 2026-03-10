# Platform Redesign Design — 2026-03-10

## Vision

Transform the web-dev-guide from an animation-first learning tool into a comprehensive **LMS / Knowledge Base / Cheatsheet** platform. The primary value is: all necessary information about a web development topic — well-structured, easy to find, beautifully presented.

Animations remain the signature differentiator, but they become one element of a richer per-topic experience.

---

## 1. Information Architecture

### Navigation Model: Technology Categories (not Levels)

Replace the 3-Level hierarchy with 8 Technology Categories as the primary navigation axis. Difficulty levels (Fundamentals / Modern Frontend / Backend & Data) are retained as tags on each topic but are no longer the primary grouping.

| Category   | Color     | Topics |
|------------|-----------|--------|
| HTML       | #4ade80   | DOM, Semantic Elements, Forms |
| CSS        | #5b9cf5   | Box Model, Flexbox, Grid, Selectors |
| JavaScript | #fbbf24   | Variables, Arrays, Event Loop, Closures |
| TypeScript | #a78bfa   | Basics, Interfaces, Generics |
| React      | #f472b6   | Components, State, useEffect, Router |
| Web APIs   | #34d399   | Fetch, DOM Events, localStorage |
| HTTP       | #fb923c   | Request Cycle, REST, Status Codes |
| PostgreSQL | #60a5fa   | Queries, JOINs, Schema & CRUD |

### URL Structure

```
/                        Homepage (category grid)
/html                    HTML category page
/css                     CSS category page
/javascript              JavaScript category page
/typescript              TypeScript category page
/react                   React category page
/webapis                 Web APIs category page
/http                    HTTP category page
/postgresql              PostgreSQL category page
/topic/:topicId          Topic page (with sidebar)
/reference/html          HTML reference (unchanged)
/reference/css           CSS reference (unchanged)
/search                  Search (unchanged)
```

---

## 2. Homepage Redesign

### Layout

8 category tiles in a responsive grid (2-col on mobile, 4-col on desktop). HTML, CSS, JavaScript tiles are visually larger (more topics, higher frequency of use).

### Category Tile

Each tile displays:
- Tech icon (Lucide or inline SVG) + category color accent
- Category name + short description ("Structure of the web")
- Topic count badge
- 2–3 topic name chips as preview
- On hover: tile expands slightly, reveals topic cards directly below

### Hover Behavior

Clicking a category tile navigates to `/html`, `/css`, etc.

---

## 3. Category Pages

Replaces LevelOverview. Each category page (`/html`, `/css`, etc.) shows:

- Category header: icon, name, one-line description
- Topic cards grid with **live animation hover preview**
- Quick links to reference pages where applicable (HTML Reference, CSS Reference)

### Topic Card Hover-Preview (Live Animation)

On hover, the card expands vertically from ~140px to ~280px. The Viz component renders in `compact` mode at Step 0, then auto-plays through steps 0→2 with 1.5s delay between steps. On mouse-leave, card collapses back.

All 27 Viz components already support `compact` prop — no changes needed to Viz files.

---

## 4. Topic Page Redesign

### Layout

Two-column layout: fixed sidebar on the left, scrollable content on the right.

```
┌─────────────────────────────────────────────────────┐
│ Navbar                                              │
├──────────────┬──────────────────────────────────────┤
│  Sidebar     │  Content                             │
│  (fixed)     │  (scrollable)                        │
│              │                                      │
│  HTML ▾      │  [Topic Header]                      │
│  ● DOM       │  Level badge + title + description   │
│  ● Semantic  │                                      │
│  ● Forms ←   │  ① Intro Animation                   │
│              │                                      │
│  CSS ▸       │  ② Step-by-Step Explanation          │
│  JavaScript ▸│     Animation (left) + Text (right)  │
│  TypeScript ▸│                                      │
│  React ▸     │  ③ Cheat Sheet  ← NEW               │
│  Web APIs ▸  │     Tabs: Syntax / Patterns / Gotchas│
│  HTTP ▸      │                                      │
│  PostgreSQL ▸│  ④ Playground                        │
└──────────────┴──────────────────────────────────────┘
```

**Sidebar behavior:**
- Fixed position while scrolling
- All 8 categories listed; active category expanded, others collapsed
- Active topic highlighted with category color
- Collapsible on mobile (hamburger toggle)

### Content Sections

1. **Intro Animation** — unchanged (full-width, auto-steps)
2. **Step-by-Step Explanation** — unchanged (animation left, text+code right)
3. **Cheat Sheet** — NEW (see below)
4. **Playground** — unchanged

---

## 5. Cheat Sheet Section

### Visual Design

Dark-background card with 3 tabs:
- **Syntax** — table of key syntax entries (label, code snippet, short note)
- **Patterns** — common usage patterns with code examples
- **Gotchas** — common mistakes / "when to use" prose

Code snippets are Monaco-styled, copyable on click.

### Data Model Addition

New optional field on `Topic`:

```ts
cheatSheet?: {
  syntax: Array<{
    label: string    // e.g. "SELECT"
    code: string     // e.g. "SELECT col FROM table WHERE id = 1"
    note?: string    // e.g. "Returns matching rows"
  }>
  patterns: Array<{
    title: string
    code: string
    language?: string
  }>
  whenToUse?: string
  commonMistakes?: string[]
}
```

Field is optional — topics without `cheatSheet` simply skip the section.

---

## 6. Data Model Changes

### New: Category config

```ts
interface Category {
  id: string          // 'html' | 'css' | 'javascript' | ...
  title: string       // 'HTML'
  description: string // 'Structure of the web'
  color: string
  icon: string        // Lucide icon name
  topicIds: string[]  // ordered list of topic IDs
}
```

### Modified: Topic

```ts
interface Topic {
  // ... existing fields ...
  category: string    // 'html' | 'css' | 'javascript' | ...
  cheatSheet?: CheatSheet
}
```

The existing `level` field remains for the difficulty badge.

---

## 7. Implementation Scope

### In scope
- New `src/data/categories.ts` with 8 category configs
- Homepage rebuilt around category tiles
- Category pages at `/html`, `/css`, etc.
- Topic card with live animation hover-preview
- Topic page sidebar (all categories, collapsible)
- Cheat Sheet section component
- Cheat sheet data for all 27 topics
- `category` field added to all topics in `topics.ts`
- Router updated for new category URLs

### Out of scope (future)
- Quiz / self-check
- Progress tracking / completion state
- User accounts
- Mobile sidebar (collapse to bottom sheet) — basic responsive only

---

## Tech Stack

- React + Framer Motion (existing)
- React Router (existing)
- Lucide React icons (existing)
- Monaco Editor (existing, for playground)
- No new dependencies required
