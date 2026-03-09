# Web Dev Visual Guide — React Rebuild Design
**Date:** 2026-03-09
**Status:** Approved
**Strategy:** Clean Slate — full rebuild in same repo (`jaywee92/web-dev-guide`)

---

## 1. Goals

- **Primary:** "Learning by Animation" — complex concepts explained through visual flows
- **Audience:** Beginners + portfolio showcase + self-learning reference
- **Tone:** Maximum visual impact + pedagogical clarity. Impressive AND didactically sound.

---

## 2. Tech Stack

| Package | Purpose |
|---------|---------|
| `vite` + `react` + `typescript` | Build system + framework |
| `tailwindcss` | Styling + theme system |
| `framer-motion` | All animations (micro-interactions, page transitions, step animations) |
| `react-router-dom` (HashRouter) | Routing — HashRouter required for GitHub Pages |
| `lucide-react` | Icons |
| `@monaco-editor/react` | Code editor for complex topic playgrounds |
| `zustand` | Lightweight state (playground state, animation step control) |
| `lz-string` | URL-safe compression for playground code sharing |

---

## 3. Design Language

### Color System (existing dark theme extended)

```
Background:      #0f1117
Surface:         #1a1d27
Surface-bright:  #222633
Border:          #2e3348
Text:            #e2e4ed
Text-muted:      #8b8fa7

Accents:
  green:   #4ade80    green-dim:  rgba(74,222,128,0.12)
  blue:    #5b9cf5    blue-dim:   rgba(91,156,245,0.12)
  purple:  #a78bfa    purple-dim: rgba(167,139,250,0.12)
  yellow:  #f5c542    yellow-dim: rgba(245,197,66,0.15)
  cyan:    #22d3ee    cyan-dim:   rgba(34,211,238,0.12)
  pink:    #ec4899    pink-dim:   rgba(236,72,153,0.12)
  orange:  #f59e42    orange-dim: rgba(245,158,66,0.12)
  red:     #f87171    red-dim:    rgba(248,113,113,0.12)
```

### Typography
- **Body:** DM Sans (self-hosted in `public/fonts/`)
- **Code:** JetBrains Mono (self-hosted)

### Level Color Coding
| Level | Name | Color |
|-------|------|-------|
| 1 | Fundamentals | `green #4ade80` |
| 2 | Modern Frontend | `blue #5b9cf5` |
| 3 | Backend & Databases | `purple #a78bfa` |
| 4 | Tooling & Deployment | `yellow #f5c542` |

### Theme
- Dark/Light mode toggle
- Dark is primary (default)
- CSS variables switched via `data-theme` attribute on `<html>`

---

## 4. Routing

HashRouter — required for GitHub Pages (no server-side redirects).

```
/#/                          Home — Hero + Level Grid
/#/level/1                   Level 1 Overview (HTML, CSS, JS cards)
/#/level/2                   Level 2 Overview
/#/level/3                   Level 3 Overview
/#/level/4                   Level 4 Overview
/#/topic/:topicId            Topic Page (generic shell)
/#/search?q=:query           Search results
```

---

## 5. Folder Structure

```
web-dev-guide/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Sticky nav, breadcrumb, search trigger, theme toggle
│   │   │   ├── PageWrapper.tsx         # Framer Motion page transition wrapper
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── TopicCard.tsx           # Reusable card with hover glow (Framer Motion)
│   │   │   ├── LevelBadge.tsx          # "Level 1 · Fundamentals" colored badge
│   │   │   ├── CodeBlock.tsx           # Read-only syntax-highlighted code
│   │   │   ├── AnimationControls.tsx   # Play/Pause/Restart/Speed slider
│   │   │   ├── SearchPalette.tsx       # Cmd+K modal search
│   │   │   └── SectionDivider.tsx      # Animated section separator
│   │   └── animations/
│   │       ├── primitives/
│   │       │   ├── FadeIn.tsx
│   │       │   ├── SlideIn.tsx
│   │       │   ├── StaggerChildren.tsx
│   │       │   ├── AnimatedArrow.tsx   # SVG arrow that draws itself (pathLength)
│   │       │   ├── GlowPulse.tsx       # Pulsing glow on node activation
│   │       │   └── TypeWriter.tsx      # Text types itself character by character
│   │       ├── AnimatedFlow.tsx        # Client→Server→DB request cycle
│   │       ├── DomTreeBuilder.tsx      # DOM tree builds node by node
│   │       ├── BoxModelViz.tsx         # CSS Box Model layer by layer
│   │       ├── FlexboxViz.tsx          # Flexbox axes + properties live
│   │       ├── GridViz.tsx             # CSS Grid animated
│   │       ├── HttpCycleViz.tsx        # HTTP methods animated
│   │       ├── EventLoopViz.tsx        # JS Call Stack + Event Loop
│   │       └── JoinViz.tsx             # SQL JOIN tables sliding together
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── index.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   └── LevelGrid.tsx
│   │   ├── LevelOverview/
│   │   │   └── index.tsx               # Generic for all 4 levels
│   │   ├── TopicPage/
│   │   │   ├── index.tsx               # Shell: Phase1 → Phase2 → Phase3
│   │   │   ├── IntroAnimation.tsx      # Auto-playing fullscreen intro (skippable)
│   │   │   ├── SyncExplanation.tsx     # Left: animation, Right: text (scroll-synced)
│   │   │   └── PlaygroundSection.tsx   # Routes to visual or monaco playground
│   │   └── SearchPage/
│   │       └── index.tsx
│   │
│   ├── topics/                         # Topic-specific content components
│   │   ├── html/
│   │   │   ├── DomTree.tsx
│   │   │   ├── SemanticTags.tsx
│   │   │   └── Forms.tsx
│   │   ├── css/
│   │   │   ├── BoxModel.tsx
│   │   │   ├── Flexbox.tsx
│   │   │   └── Grid.tsx
│   │   ├── javascript/
│   │   │   ├── EventLoop.tsx
│   │   │   └── Closures.tsx
│   │   ├── flask/
│   │   │   ├── RequestCycle.tsx
│   │   │   └── Blueprints.tsx
│   │   └── postgresql/
│   │       └── JoinViz.tsx
│   │
│   ├── playgrounds/
│   │   ├── VisualPlayground.tsx        # Slider/Toggle controls → live preview
│   │   └── MonacoPlayground.tsx        # Monaco editor + output panel
│   │
│   ├── data/
│   │   ├── levels.ts                   # Level configs (title, color, topics list)
│   │   ├── topics.ts                   # All topics with metadata + sections
│   │   └── codeExamples.ts            # Code snippets for playgrounds
│   │
│   ├── hooks/
│   │   ├── useAnimationStep.ts         # Step-by-step animation state + controls
│   │   ├── usePlayground.ts            # Playground state + URL sync
│   │   └── useSearch.ts               # Search index + query logic
│   │
│   ├── store/
│   │   └── useAppStore.ts             # Zustand: theme, search open state
│   │
│   ├── types/
│   │   └── index.ts                   # Topic, Level, Section, ExplanationStep types
│   │
│   ├── App.tsx                        # Router + layout wrapper
│   └── main.tsx
│
├── public/
│   └── fonts/                         # Self-hosted DM Sans + JetBrains Mono
│
├── docs/
│   └── plans/
│       └── 2026-03-09-react-rebuild-design.md
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 6. Topic Page — 3-Phase Structure

### Phase 1: Intro Animation
- Fullscreen, auto-plays on mount
- Duration: 8–15 seconds per topic
- Controls: Play / Pause / Skip
- Keyboard: `Space` = play/pause, `R` = restart, `Esc` = skip

### Phase 2: Synchronized Explanation
- Left column (sticky): Animation, shows the relevant step highlighted
- Right column: Scrollable text steps
- Scroll position drives animation step (IntersectionObserver)
- Each step: heading + text + optional code block

### Phase 3: Playground
- **Visual Controls** (Slider/Toggle/Dropdown): Box Model, Flexbox, Grid, simple CSS topics
- **Monaco Editor + Output**: JavaScript, Flask routing, PostgreSQL queries
- **Code sharing:** Playground state compressed via `lz-string` and encoded in URL hash — sharable link works immediately

---

## 7. Animation System

### Layer 1: Primitives
```
FadeIn           opacity 0→1, configurable delay + duration
SlideIn          translateY/X with spring physics
StaggerChildren  sequential children animation
AnimatedArrow    SVG path draws itself (strokeDashoffset / pathLength)
GlowPulse        box-shadow pulses in accent color
TypeWriter       text appears character by character
```

### Layer 2: Topic Animations (built from primitives)
```
DomTreeBuilder   nodes appear sequentially, connector lines draw themselves
BoxModelViz      layer-by-layer build, active layer glows
AnimatedFlow     data packets flow Browser→DNS→Server→DB with arrows
FlexboxViz       items rearrange live when flex properties change
EventLoopViz     call stack pushes/pops, queue drains, loop rotates
JoinViz          two SQL tables slide together, matching rows highlight
```

### Layer 3: useAnimationStep Hook
```typescript
const { step, isPlaying, play, pause, restart, setSpeed } = useAnimationStep({
  totalSteps: 5,
  autoPlay: true,
  stepDuration: 1200
})
```

---

## 8. Data Model (TypeScript)

```typescript
type Level = 1 | 2 | 3 | 4
type PlaygroundType = 'visual-controls' | 'monaco' | 'none'

interface LevelConfig {
  id: Level
  title: string
  subtitle: string
  color: string
  topics: Topic[]
}

interface Topic {
  id: string
  title: string
  description: string
  level: Level
  estimatedMinutes: number
  animationComponent: string
  playgroundType: PlaygroundType
  sections: Section[]
}

interface Section {
  id: string
  type: 'intro' | 'explanation' | 'playground'
  steps: ExplanationStep[]
}

interface ExplanationStep {
  animationStep: number
  heading: string
  text: string
  codeExample?: string
  language?: string
}
```

---

## 9. Features

| Feature | Implementation |
|---------|---------------|
| Dark/Light toggle | CSS variables on `<html data-theme>`, Zustand persisted to localStorage |
| Cmd+K Search | `SearchPalette` component, fuzzy search over `topics.ts` data |
| Code sharing | `lz-string` compresses playground state → URL hash param |
| Self-hosted fonts | `public/fonts/` — no Google Fonts network request |
| Keyboard shortcuts | Space/R/←/→ for animation control, Esc to close search |

---

## 10. GitHub Pages Deploy

### `vite.config.ts`
```typescript
export default defineConfig({
  base: '/web-dev-guide/',
  plugins: [react()],
  build: { outDir: 'dist' }
})
```

### `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 11. Content Scope (initial build)

### Level 1 — Fundamentals
- HTML: DOM Tree, Semantic Tags, Forms
- CSS: Box Model, Flexbox, Grid, Selectors
- JavaScript: Event Loop, Closures

### Level 2 — Modern Frontend
- TypeScript: Types, Interfaces, Generics
- React: Component lifecycle, Props/State, Hooks
- Tailwind CSS: Utility classes, responsive design

### Level 3 — Backend & Databases
- Flask: Request/Response cycle, Routing, Blueprints, CRUD
- PostgreSQL: Queries, JOINs, Schema design

### Level 4 — Tooling & Deployment
- Git: Commit flow, branching, merging
- GitHub Pages: Deploy workflow
- Vercel/Netlify: CI/CD basics

---

*Design approved. Next step: implementation plan via writing-plans skill.*
