# Web Dev Visual Guide — React Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Web Dev Visual Guide as a React/Vite/TypeScript app with animated, interactive learning content deployed to GitHub Pages.

**Architecture:** Clean slate in same repo. Vite builds to `dist/`, GitHub Actions deploys to `gh-pages` branch. HashRouter for client-side routing. Three-phase topic pages: Intro Animation → Synchronized Explanation → Playground.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, React Router DOM (HashRouter), Lucide React, Monaco Editor, Zustand, lz-string

---

## Phase 0: Clean Repo & Project Init

### Task 0.1: Remove old files

**Files:** Delete everything in repo root except `.git/`, `.github/`, `docs/`

```bash
cd /home/jaywee92/web-dev-guide
rm -rf *.html *.py process_animations.py wbs_sources .claude .playwright-mcp logs
rm -f README.md CLAUDE.md .gitignore
```

Verify: `ls` shows only `.git/`, `.github/`, `docs/`

**Commit:**
```bash
git add -A && git commit -m "chore: remove old static HTML project"
```

---

### Task 0.2: Scaffold Vite + React + TypeScript

```bash
cd /home/jaywee92/web-dev-guide
npm create vite@latest . -- --template react-ts
```

When prompted "current directory is not empty" → select **Ignore files and continue**

Verify: `ls` shows `src/`, `public/`, `index.html`, `vite.config.ts`, `package.json`

---

### Task 0.3: Install all dependencies

```bash
npm install
npm install framer-motion react-router-dom zustand lucide-react lz-string
npm install @monaco-editor/react
npm install -D tailwindcss @tailwindcss/vite
```

Verify: `cat package.json | grep -E "framer|router|zustand|lucide|monaco|lz-string|tailwind"`
Expected: all packages listed

---

### Task 0.4: Configure Tailwind

**Create:** `src/index.css`
```css
@import "tailwindcss";
```

**Modify:** `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/web-dev-guide/',
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist' }
})
```

**Modify:** `src/main.tsx`
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

### Task 0.5: Configure TypeScript paths

**Modify:** `tsconfig.json` — add paths for clean imports:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

**Modify:** `vite.config.ts` — add resolve alias:
```typescript
import path from 'path'
// inside defineConfig:
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```

**Commit:**
```bash
git add -A && git commit -m "feat: scaffold Vite React TypeScript with Tailwind"
```

---

## Phase 1: Types & Data

### Task 1.1: TypeScript types

**Create:** `src/types/index.ts`
```typescript
import type { ComponentType } from 'react'

export type Level = 1 | 2 | 3 | 4
export type PlaygroundType = 'visual-controls' | 'monaco' | 'none'
export type ThemeMode = 'dark' | 'light'

export interface LevelConfig {
  id: Level
  title: string
  subtitle: string
  color: string
  dimColor: string
  topics: Topic[]
}

export interface Topic {
  id: string
  title: string
  description: string
  level: Level
  color: string
  estimatedMinutes: number
  animationComponent: string
  playgroundType: PlaygroundType
  sections: Section[]
}

export interface Section {
  id: string
  type: 'intro' | 'explanation' | 'playground'
  steps: ExplanationStep[]
}

export interface ExplanationStep {
  animationStep: number
  heading: string
  text: string
  codeExample?: string
  language?: string
}

export interface SearchResult {
  topic: Topic
  matchedIn: 'title' | 'description' | 'content'
}
```

---

### Task 1.2: Level data

**Create:** `src/data/levels.ts`
```typescript
import type { LevelConfig } from '@/types'

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'Fundamentals',
    subtitle: 'HTML · CSS · JavaScript',
    color: '#4ade80',
    dimColor: 'rgba(74,222,128,0.12)',
    topics: [],
  },
  {
    id: 2,
    title: 'Modern Frontend',
    subtitle: 'TypeScript · React · Tailwind',
    color: '#5b9cf5',
    dimColor: 'rgba(91,156,245,0.12)',
    topics: [],
  },
  {
    id: 3,
    title: 'Backend & Databases',
    subtitle: 'Flask · PostgreSQL',
    color: '#a78bfa',
    dimColor: 'rgba(167,139,250,0.12)',
    topics: [],
  },
  {
    id: 4,
    title: 'Tooling & Deployment',
    subtitle: 'Git · GitHub Pages · Vercel',
    color: '#f5c542',
    dimColor: 'rgba(245,197,66,0.15)',
    topics: [],
  },
]
```

---

### Task 1.3: Topics data (skeleton — content expanded later)

**Create:** `src/data/topics.ts`
```typescript
import type { Topic } from '@/types'

export const TOPICS: Topic[] = [
  {
    id: 'html-dom',
    title: 'The DOM Tree',
    description: 'How browsers parse HTML into a living tree of nodes',
    level: 1,
    color: '#4ade80',
    estimatedMinutes: 12,
    animationComponent: 'DomTreeBuilder',
    playgroundType: 'visual-controls',
    sections: [
      {
        id: 'intro',
        type: 'intro',
        steps: [],
      },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'HTML is just text',
            text: 'When your browser receives an HTML file, it sees plain text — tags, attributes, content. The DOM is what the browser builds from that text.',
            codeExample: '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>',
            language: 'html',
          },
          {
            animationStep: 1,
            heading: 'Parsing starts at the top',
            text: 'The browser reads your HTML top to bottom, creating a node for each element. The <html> tag becomes the root.',
          },
          {
            animationStep: 2,
            heading: 'Children branch outward',
            text: 'Nested elements become child nodes. The tree grows as each tag is parsed.',
          },
          {
            animationStep: 3,
            heading: 'Text is a node too',
            text: 'Every piece of text content between tags is its own text node in the tree.',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
  },
  {
    id: 'css-box-model',
    title: 'CSS Box Model',
    description: 'Every element is a box — content, padding, border, margin',
    level: 1,
    color: '#4ade80',
    estimatedMinutes: 10,
    animationComponent: 'BoxModelViz',
    playgroundType: 'visual-controls',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'Content Box',
            text: 'The innermost area. This is where your text and images live. Width and height apply here by default.',
            codeExample: '.box { width: 200px; height: 100px; }',
            language: 'css',
          },
          {
            animationStep: 1,
            heading: 'Padding',
            text: 'Space between the content and the border. Padding is inside the element — it shares the background color.',
            codeExample: '.box { padding: 24px; }',
            language: 'css',
          },
          {
            animationStep: 2,
            heading: 'Border',
            text: 'A line that wraps around padding and content. Can be styled independently.',
            codeExample: '.box { border: 2px solid #4ade80; }',
            language: 'css',
          },
          {
            animationStep: 3,
            heading: 'Margin',
            text: 'Space outside the border. Pushes other elements away. Margins can collapse between siblings.',
            codeExample: '.box { margin: 16px auto; }',
            language: 'css',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
  },
  {
    id: 'css-flexbox',
    title: 'Flexbox',
    description: 'One-dimensional layout — align items in rows or columns effortlessly',
    level: 1,
    color: '#4ade80',
    estimatedMinutes: 15,
    animationComponent: 'FlexboxViz',
    playgroundType: 'visual-controls',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'The flex container',
            text: 'Add display: flex to a parent and it becomes a flex container. Its direct children become flex items.',
            codeExample: '.container { display: flex; }',
            language: 'css',
          },
          {
            animationStep: 1,
            heading: 'flex-direction',
            text: 'Controls the main axis. Row lays items horizontally, column vertically.',
            codeExample: '.container { flex-direction: row; }',
            language: 'css',
          },
          {
            animationStep: 2,
            heading: 'justify-content',
            text: 'Aligns items along the main axis. flex-start, center, space-between, space-around.',
            codeExample: '.container { justify-content: space-between; }',
            language: 'css',
          },
          {
            animationStep: 3,
            heading: 'align-items',
            text: 'Aligns items along the cross axis (perpendicular to main axis).',
            codeExample: '.container { align-items: center; }',
            language: 'css',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
  },
  {
    id: 'http-request-cycle',
    title: 'HTTP Request Cycle',
    description: 'What happens between typing a URL and seeing a webpage',
    level: 3,
    color: '#a78bfa',
    estimatedMinutes: 14,
    animationComponent: 'AnimatedFlow',
    playgroundType: 'none',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'The client sends a request',
            text: 'Your browser (the client) sends an HTTP request to a server. It includes the method (GET, POST), the URL, and headers.',
          },
          {
            animationStep: 1,
            heading: 'DNS resolution',
            text: 'The domain name is resolved to an IP address by a DNS server. Like a phone book lookup.',
          },
          {
            animationStep: 2,
            heading: 'The server processes',
            text: 'The server receives the request, runs your application code (Flask, Node.js), may query a database.',
          },
          {
            animationStep: 3,
            heading: 'Database query',
            text: 'The app queries the database (PostgreSQL, SQLite) and waits for results.',
          },
          {
            animationStep: 4,
            heading: 'Response sent back',
            text: 'The server sends an HTTP response: status code (200 OK, 404 Not Found), headers, and the body (HTML, JSON).',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
  },
]

export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find(t => t.id === id)
}

export function getTopicsByLevel(level: number): Topic[] {
  return TOPICS.filter(t => t.level === level)
}
```

**Commit:**
```bash
git add -A && git commit -m "feat: add TypeScript types and data layer"
```

---

## Phase 2: Theme & Global State

### Task 2.1: Zustand store

**Create:** `src/store/useAppStore.ts`
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeMode } from '@/types'

interface AppStore {
  theme: ThemeMode
  searchOpen: boolean
  toggleTheme: () => void
  setSearchOpen: (open: boolean) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      searchOpen: false,
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', next)
        set({ theme: next })
      },
      setSearchOpen: (open) => set({ searchOpen: open }),
    }),
    { name: 'wdvg-settings', partialize: (s) => ({ theme: s.theme }) }
  )
)
```

---

### Task 2.2: CSS design tokens

**Replace** `src/index.css` content:
```css
@import "tailwindcss";

:root {
  --bg: #0f1117;
  --surface: #1a1d27;
  --surface-bright: #222633;
  --border: #2e3348;
  --text: #e2e4ed;
  --text-muted: #8b8fa7;
  --text-faint: #555a73;
  --green: #4ade80;
  --green-dim: rgba(74, 222, 128, 0.12);
  --blue: #5b9cf5;
  --blue-dim: rgba(91, 156, 245, 0.12);
  --purple: #a78bfa;
  --purple-dim: rgba(167, 139, 250, 0.12);
  --yellow: #f5c542;
  --yellow-dim: rgba(245, 197, 66, 0.15);
  --cyan: #22d3ee;
  --cyan-dim: rgba(34, 211, 238, 0.12);
  --pink: #ec4899;
  --pink-dim: rgba(236, 72, 153, 0.12);
  --orange: #f59e42;
  --orange-dim: rgba(245, 158, 66, 0.12);
  --red: #f87171;
  --radius: 12px;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

[data-theme="light"] {
  --bg: #f8f9fc;
  --surface: #ffffff;
  --surface-bright: #f0f2f8;
  --border: #dde0ec;
  --text: #1a1d27;
  --text-muted: #5a5e78;
  --text-faint: #9094b0;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { background: var(--bg); color: var(--text); }

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  transition: background 0.3s ease, color 0.3s ease;
}

code, pre, .mono { font-family: var(--font-mono); }

::selection { background: var(--blue-dim); }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
```

---

### Task 2.3: Apply theme on load

**Modify:** `src/main.tsx` — add theme init before render:
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply persisted theme before first render to avoid flash
const stored = localStorage.getItem('wdvg-settings')
if (stored) {
  try {
    const { state } = JSON.parse(stored)
    if (state?.theme) {
      document.documentElement.setAttribute('data-theme', state.theme)
    }
  } catch {}
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
)
```

**Commit:**
```bash
git add -A && git commit -m "feat: theme system with dark/light toggle and CSS variables"
```

---

## Phase 3: Router & Layout

### Task 3.1: App router

**Replace:** `src/App.tsx`
```typescript
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import LevelOverview from '@/pages/LevelOverview'
import TopicPage from '@/pages/TopicPage'
import SearchPage from '@/pages/SearchPage'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/level/:levelId" element={<LevelOverview />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
```

---

### Task 3.2: PageWrapper animation

**Create:** `src/components/layout/PageWrapper.tsx`
```typescript
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props { children: ReactNode }

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function PageWrapper({ children }: Props) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

---

### Task 3.3: Navbar

**Create:** `src/components/layout/Navbar.tsx`
```typescript
import { Link, useLocation } from 'react-router-dom'
import { Search, Sun, Moon, Code2 } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useEffect } from 'react'

export default function Navbar() {
  const { theme, toggleTheme, setSearchOpen } = useAppStore()
  const location = useLocation()

  // Cmd+K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setSearchOpen])

  return (
    <nav
      className="sticky top-0 z-50 border-b flex items-center justify-between px-6 h-14"
      style={{
        background: 'rgba(15,17,23,0.8)',
        backdropFilter: 'blur(20px)',
        borderColor: 'var(--border)',
      }}
    >
      <Link to="/" className="flex items-center gap-2 font-semibold" style={{ color: 'var(--text)' }}>
        <Code2 size={20} style={{ color: 'var(--green)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>web-dev-guide</span>
      </Link>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <Search size={14} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>⌘K</span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-all"
          style={{ color: 'var(--text-muted)' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  )
}
```

---

### Task 3.4: Footer

**Create:** `src/components/layout/Footer.tsx`
```typescript
export default function Footer() {
  return (
    <footer
      className="text-center py-8 text-sm border-t"
      style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
    >
      <p>Web Dev Visual Guide · Learning by Animation</p>
    </footer>
  )
}
```

**Commit:**
```bash
git add -A && git commit -m "feat: router, Navbar, Footer, PageWrapper"
```

Verify: `npm run dev` → browser shows navbar with search button and theme toggle. No errors in console.

---

## Phase 4: Animation Primitives

### Task 4.1: FadeIn primitive

**Create:** `src/components/animations/primitives/FadeIn.tsx`
```typescript
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function FadeIn({ children, delay = 0, duration = 0.5, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

### Task 4.2: SlideIn primitive

**Create:** `src/components/animations/primitives/SlideIn.tsx`
```typescript
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  from?: 'bottom' | 'top' | 'left' | 'right'
  delay?: number
  className?: string
}

const directionMap = {
  bottom: { y: 30, x: 0 },
  top: { y: -30, x: 0 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
}

export default function SlideIn({ children, from = 'bottom', delay = 0, className }: Props) {
  const initial = { opacity: 0, ...directionMap[from] }
  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

### Task 4.3: StaggerChildren primitive

**Create:** `src/components/animations/primitives/StaggerChildren.tsx`
```typescript
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

const container = (stagger: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function StaggerChildren({ children, staggerDelay = 0.1, className }: Props) {
  return (
    <motion.div
      variants={container(staggerDelay)}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

### Task 4.4: GlowPulse primitive

**Create:** `src/components/animations/primitives/GlowPulse.tsx`
```typescript
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  color?: string
  active?: boolean
  className?: string
}

export default function GlowPulse({ children, color = '#4ade80', active = true, className }: Props) {
  return (
    <motion.div
      animate={active ? {
        boxShadow: [
          `0 0 0px ${color}00`,
          `0 0 20px ${color}66`,
          `0 0 40px ${color}33`,
          `0 0 20px ${color}66`,
          `0 0 0px ${color}00`,
        ],
      } : { boxShadow: 'none' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

### Task 4.5: AnimatedArrow primitive

**Create:** `src/components/animations/primitives/AnimatedArrow.tsx`
```typescript
import { motion } from 'framer-motion'

interface Props {
  x1: number; y1: number
  x2: number; y2: number
  color?: string
  delay?: number
  width?: number
  height?: number
}

export default function AnimatedArrow({
  x1, y1, x2, y2,
  color = '#5b9cf5',
  delay = 0,
  width = 200,
  height = 60,
}: Props) {
  const path = `M ${x1} ${y1} L ${x2} ${y2}`
  const arrowId = `arrow-${Math.random().toString(36).slice(2, 7)}`

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <marker id={arrowId} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={color} />
        </marker>
      </defs>
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={2}
        fill="none"
        markerEnd={`url(#${arrowId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: 'easeInOut' }}
      />
    </svg>
  )
}
```

**Commit:**
```bash
git add -A && git commit -m "feat: animation primitives (FadeIn, SlideIn, StaggerChildren, GlowPulse, AnimatedArrow)"
```

---

## Phase 5: UI Components

### Task 5.1: LevelBadge

**Create:** `src/components/ui/LevelBadge.tsx`
```typescript
interface Props {
  level: number
  color: string
  title: string
  size?: 'sm' | 'md'
}

export default function LevelBadge({ level, color, title, size = 'md' }: Props) {
  const padding = size === 'sm' ? '2px 8px' : '4px 12px'
  const fontSize = size === 'sm' ? 10 : 11
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding,
        fontSize,
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        borderRadius: 6,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        color,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      Level {level} · {title}
    </span>
  )
}
```

---

### Task 5.2: AnimationControls

**Create:** `src/components/ui/AnimationControls.tsx`
```typescript
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  isPlaying: boolean
  step: number
  totalSteps: number
  onPlay: () => void
  onPause: () => void
  onRestart: () => void
  onPrev: () => void
  onNext: () => void
}

export default function AnimationControls({
  isPlaying, step, totalSteps,
  onPlay, onPause, onRestart, onPrev, onNext,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onRestart} style={{ color: 'var(--text-muted)' }} title="Restart (R)">
        <RotateCcw size={16} />
      </button>
      <button onClick={onPrev} disabled={step === 0} style={{ color: 'var(--text-muted)' }}>
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
        style={{ background: 'var(--blue)', color: '#fff' }}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={onNext} disabled={step >= totalSteps - 1} style={{ color: 'var(--text-muted)' }}>
        <ChevronRight size={16} />
      </button>
      <span style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
        {step + 1} / {totalSteps}
      </span>
    </div>
  )
}
```

---

### Task 5.3: CodeBlock

**Create:** `src/components/ui/CodeBlock.tsx`
```typescript
interface Props {
  code: string
  language?: string
  label?: string
}

export default function CodeBlock({ code, language = 'code', label }: Props) {
  return (
    <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {label && (
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ background: 'var(--surface-bright)', borderBottom: '1px solid var(--border)' }}
        >
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {label}
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
            {language}
          </span>
        </div>
      )}
      <pre
        style={{
          background: 'var(--surface)',
          padding: '16px',
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text)',
          overflowX: 'auto',
          margin: 0,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
```

---

### Task 5.4: TopicCard

**Create:** `src/components/ui/TopicCard.tsx`
```typescript
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Topic } from '@/types'

interface Props { topic: Topic }

export default function TopicCard({ topic }: Props) {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/topic/${topic.id}`)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2, background: topic.color, transformOrigin: 'left',
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 0%, ${topic.color}12 0%, transparent 70%)`,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
          {topic.title}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
          {topic.description}
        </p>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={12} /> {topic.estimatedMinutes} min
          </span>
          <motion.span
            whileHover={{ x: 4 }}
            style={{ color: topic.color, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
          >
            Explore <ArrowRight size={14} />
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
```

**Commit:**
```bash
git add -A && git commit -m "feat: UI components (LevelBadge, TopicCard, CodeBlock, AnimationControls)"
```

---

## Phase 6: Home Page

### Task 6.1: HeroSection

**Create:** `src/pages/Home/HeroSection.tsx`
```typescript
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Animated background orbs */}
      {[
        { color: '#4ade80', size: 500, top: '-150px', left: '-100px', delay: 0 },
        { color: '#5b9cf5', size: 400, top: '40%', right: '-150px', delay: -7 },
        { color: '#a78bfa', size: 350, bottom: '-100px', left: '30%', delay: -14 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: orb.size, height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            filter: 'blur(120px)',
            opacity: 0.07,
            top: orb.top, left: orb.left,
            right: (orb as { right?: string }).right,
            bottom: (orb as { bottom?: string }).bottom,
            pointerEvents: 'none',
          }}
          animate={{
            x: [0, 60, -40, 60, 0],
            y: [0, -50, 70, 30, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 20 + i * 4, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 99,
            background: 'rgba(74,222,128,0.1)',
            border: '1px solid rgba(74,222,128,0.3)',
            color: '#4ade80',
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            marginBottom: 24,
          }}
        >
          Learning by Animation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            background: 'linear-gradient(135deg, var(--text) 0%, var(--text-muted) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Web Dev
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #4ade80, #5b9cf5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Visual Guide
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 48px' }}
        >
          Complex concepts. Simple animations.
          From HTML fundamentals to full-stack deployment — watch it work, then build it yourself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ color: 'var(--text-muted)' }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

### Task 6.2: LevelGrid

**Create:** `src/pages/Home/LevelGrid.tsx`
```typescript
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LEVELS } from '@/data/levels'
import { TOPICS } from '@/data/topics'
import TopicCard from '@/components/ui/TopicCard'
import LevelBadge from '@/components/ui/LevelBadge'

export default function LevelGrid() {
  const navigate = useNavigate()

  return (
    <section className="px-6 pb-24 max-w-6xl mx-auto">
      {LEVELS.map((level, li) => {
        const topics = TOPICS.filter(t => t.level === level.id)
        return (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: li * 0.1 }}
            style={{ marginBottom: 64 }}
          >
            {/* Level header */}
            <div
              className="flex items-center justify-between mb-6 pb-4"
              style={{ borderBottom: `1px solid ${level.color}33` }}
            >
              <div>
                <LevelBadge level={level.id} color={level.color} title={level.title} />
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 6 }}>
                  {level.subtitle}
                </p>
              </div>
              <button
                onClick={() => navigate(`/level/${level.id}`)}
                style={{
                  fontSize: 12, color: level.color,
                  fontFamily: 'var(--font-mono)',
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                View all →
              </button>
            </div>

            {/* Topic cards grid */}
            {topics.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {topics.map(topic => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-faint)', fontSize: 13, fontStyle: 'italic' }}>
                Topics coming soon…
              </p>
            )}
          </motion.div>
        )
      })}
    </section>
  )
}
```

---

### Task 6.3: Home page index

**Create:** `src/pages/Home/index.tsx`
```typescript
import PageWrapper from '@/components/layout/PageWrapper'
import HeroSection from './HeroSection'
import LevelGrid from './LevelGrid'

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <LevelGrid />
    </PageWrapper>
  )
}
```

**Commit:**
```bash
git add -A && git commit -m "feat: Home page with animated hero and level grid"
```

Verify: `npm run dev` → home page shows animated hero, level sections with topic cards.

---

## Phase 7: Level Overview & Topic Page Shell

### Task 7.1: Level Overview page

**Create:** `src/pages/LevelOverview/index.tsx`
```typescript
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { LEVELS } from '@/data/levels'
import { TOPICS } from '@/data/topics'
import PageWrapper from '@/components/layout/PageWrapper'
import TopicCard from '@/components/ui/TopicCard'
import LevelBadge from '@/components/ui/LevelBadge'
import StaggerChildren, { staggerItem } from '@/components/animations/primitives/StaggerChildren'
import { motion } from 'framer-motion'

export default function LevelOverview() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const level = LEVELS.find(l => l.id === Number(levelId))
  const topics = TOPICS.filter(t => t.level === Number(levelId))

  if (!level) return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Level not found.</div>

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
        >
          <ArrowLeft size={16} /> Back to overview
        </button>

        <LevelBadge level={level.id} color={level.color} title={level.title} />
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
          marginTop: 16, marginBottom: 8, color: 'var(--text)',
        }}>
          {level.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 48 }}>{level.subtitle}</p>

        <StaggerChildren>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {topics.map(topic => (
              <motion.div key={topic.id} variants={staggerItem}>
                <TopicCard topic={topic} />
              </motion.div>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </PageWrapper>
  )
}
```

---

### Task 7.2: useAnimationStep hook

**Create:** `src/hooks/useAnimationStep.ts`
```typescript
import { useState, useEffect, useCallback, useRef } from 'react'

interface Options {
  totalSteps: number
  autoPlay?: boolean
  stepDuration?: number
}

export function useAnimationStep({ totalSteps, autoPlay = true, stepDuration = 1500 }: Options) {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clear = () => { if (intervalRef.current) clearInterval(intervalRef.current) }

  const start = useCallback(() => {
    clear()
    intervalRef.current = setInterval(() => {
      setStep(s => {
        if (s >= totalSteps - 1) { setIsPlaying(false); clear(); return s }
        return s + 1
      })
    }, stepDuration)
  }, [totalSteps, stepDuration])

  useEffect(() => {
    if (isPlaying) start()
    else clear()
    return clear
  }, [isPlaying, start])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === ' ') { e.preventDefault(); setIsPlaying(p => !p) }
      if (e.key === 'r' || e.key === 'R') { setStep(0); setIsPlaying(true) }
      if (e.key === 'ArrowRight') setStep(s => Math.min(s + 1, totalSteps - 1))
      if (e.key === 'ArrowLeft') setStep(s => Math.max(s - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [totalSteps])

  return {
    step,
    isPlaying,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    restart: () => { setStep(0); setIsPlaying(true) },
    goTo: (n: number) => setStep(Math.max(0, Math.min(n, totalSteps - 1))),
    prev: () => setStep(s => Math.max(s - 1, 0)),
    next: () => setStep(s => Math.min(s + 1, totalSteps - 1)),
  }
}
```

---

### Task 7.3: Topic Page shell

**Create:** `src/pages/TopicPage/index.tsx`
```typescript
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getTopicById } from '@/data/topics'
import { LEVELS } from '@/data/levels'
import PageWrapper from '@/components/layout/PageWrapper'
import LevelBadge from '@/components/ui/LevelBadge'
import IntroAnimation from './IntroAnimation'
import SyncExplanation from './SyncExplanation'
import PlaygroundSection from './PlaygroundSection'

export default function TopicPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const topic = topicId ? getTopicById(topicId) : undefined
  const level = topic ? LEVELS.find(l => l.id === topic.level) : undefined

  if (!topic || !level) {
    return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Topic not found.</div>
  }

  return (
    <PageWrapper>
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 0' }}>
        <button
          onClick={() => navigate(`/level/${topic.level}`)}
          className="flex items-center gap-2 mb-6"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
        >
          <ArrowLeft size={16} /> {level.title}
        </button>
        <LevelBadge level={level.id} color={level.color} title={level.title} size="sm" />
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, marginTop: 12, marginBottom: 8 }}>
          {topic.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 40 }}>
          {topic.description}
        </p>
      </div>

      {/* Phase 1: Intro */}
      <IntroAnimation topic={topic} />

      {/* Phase 2: Explanation */}
      <SyncExplanation topic={topic} />

      {/* Phase 3: Playground */}
      <PlaygroundSection topic={topic} />
    </PageWrapper>
  )
}
```

---

### Task 7.4: IntroAnimation shell

**Create:** `src/pages/TopicPage/IntroAnimation.tsx`
```typescript
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Topic } from '@/types'
import AnimationControls from '@/components/ui/AnimationControls'
import { useAnimationStep } from '@/hooks/useAnimationStep'
import { getAnimationComponent } from '@/topics/registry'

interface Props { topic: Topic }

export default function IntroAnimation({ topic }: Props) {
  const [skipped, setSkipped] = useState(false)
  const AnimComp = getAnimationComponent(topic.animationComponent)
  const ctrl = useAnimationStep({ totalSteps: 5, autoPlay: true, stepDuration: 1800 })

  if (skipped) return null

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          marginBottom: 64,
          overflow: 'hidden',
        }}
      >
        {/* Skip button */}
        <button
          onClick={() => setSkipped(true)}
          style={{
            position: 'absolute', top: 16, right: 16,
            color: 'var(--text-muted)', background: 'none',
            border: '1px solid var(--border)', borderRadius: 8,
            padding: '6px 12px', fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
          }}
        >
          <X size={12} /> Skip intro
        </button>

        {/* Animation component */}
        <div style={{ width: '100%', maxWidth: 800 }}>
          {AnimComp ? <AnimComp step={ctrl.step} /> : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              Animation coming soon…
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={{ marginTop: 32 }}>
          <AnimationControls
            isPlaying={ctrl.isPlaying}
            step={ctrl.step}
            totalSteps={5}
            onPlay={ctrl.play}
            onPause={ctrl.pause}
            onRestart={ctrl.restart}
            onPrev={ctrl.prev}
            onNext={ctrl.next}
          />
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
```

---

### Task 7.5: SyncExplanation

**Create:** `src/pages/TopicPage/SyncExplanation.tsx`
```typescript
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Topic } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'
import { getAnimationComponent } from '@/topics/registry'
import { useAnimationStep } from '@/hooks/useAnimationStep'

interface Props { topic: Topic }

export default function SyncExplanation({ topic }: Props) {
  const explanationSection = topic.sections.find(s => s.type === 'explanation')
  const steps = explanationSection?.steps ?? []
  const AnimComp = getAnimationComponent(topic.animationComponent)
  const ctrl = useAnimationStep({ totalSteps: steps.length, autoPlay: false })

  if (steps.length === 0) return null

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 40, color: 'var(--text)' }}>
        How it works
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        {/* Left: Sticky animation */}
        <div style={{ position: 'sticky', top: 80 }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: 32,
            minHeight: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {AnimComp
              ? <AnimComp step={ctrl.step} compact />
              : <span style={{ color: 'var(--text-muted)' }}>Animation</span>
            }
          </div>
        </div>

        {/* Right: Scrollable steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {steps.map((step, i) => (
            <StepBlock
              key={step.heading}
              step={step}
              index={i}
              active={ctrl.step === i}
              onActivate={() => ctrl.goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepBlock({ step, index, active, onActivate }: {
  step: import('@/types').ExplanationStep
  index: number
  active: boolean
  onActivate: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px' })

  if (inView && !active) onActivate()

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: active ? 1 : 0.4, x: active ? 0 : 8 }}
      transition={{ duration: 0.3 }}
      style={{ cursor: 'pointer' }}
      onClick={onActivate}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          background: active ? 'var(--blue)' : 'var(--surface-bright)',
          border: `2px solid ${active ? 'var(--blue)' : 'var(--border)'}`,
          color: active ? '#fff' : 'var(--text-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, flexShrink: 0, transition: 'all 0.3s',
        }}>
          {index + 1}
        </span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
            {step.heading}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: step.codeExample ? 12 : 0 }}>
            {step.text}
          </p>
          {step.codeExample && (
            <CodeBlock code={step.codeExample} language={step.language} />
          )}
        </div>
      </div>
    </motion.div>
  )
}
```

---

### Task 7.6: PlaygroundSection shell

**Create:** `src/pages/TopicPage/PlaygroundSection.tsx`
```typescript
import type { Topic } from '@/types'
import VisualPlayground from '@/playgrounds/VisualPlayground'
import MonacoPlayground from '@/playgrounds/MonacoPlayground'

interface Props { topic: Topic }

export default function PlaygroundSection({ topic }: Props) {
  if (topic.playgroundType === 'none') return null

  return (
    <section style={{
      maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px',
      borderTop: '1px solid var(--border)', paddingTop: 64,
    }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
        Playground
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
        Experiment directly — changes apply in real time.
      </p>
      {topic.playgroundType === 'visual-controls'
        ? <VisualPlayground topicId={topic.id} />
        : <MonacoPlayground topicId={topic.id} />
      }
    </section>
  )
}
```

**Commit:**
```bash
git add -A && git commit -m "feat: Topic page shell with intro, sync explanation, playground sections"
```

---

## Phase 8: Topic Animation Registry

### Task 8.1: Animation registry

**Create:** `src/topics/registry.ts`
```typescript
import type { ComponentType } from 'react'

// Lazy-loaded animation components
const registry: Record<string, () => Promise<{ default: ComponentType<{ step: number; compact?: boolean }> }>> = {
  BoxModelViz: () => import('./css/BoxModelViz'),
  DomTreeBuilder: () => import('./html/DomTreeBuilder'),
  FlexboxViz: () => import('./css/FlexboxViz'),
  AnimatedFlow: () => import('./shared/AnimatedFlow'),
}

// Synchronous registry for components already imported
const loadedRegistry: Record<string, ComponentType<{ step: number; compact?: boolean }>> = {}

export function getAnimationComponent(name: string) {
  return loadedRegistry[name] ?? null
}

export async function preloadAnimation(name: string) {
  if (!loadedRegistry[name] && registry[name]) {
    const mod = await registry[name]()
    loadedRegistry[name] = mod.default
  }
}
```

---

### Task 8.2: BoxModelViz animation

**Create:** `src/topics/css/BoxModelViz.tsx`
```typescript
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const layers = [
  { label: 'Margin', color: '#ec4899', dimColor: 'rgba(236,72,153,0.08)', padding: compact => compact ? 20 : 32 },
  { label: 'Border', color: '#f5c542', dimColor: 'rgba(245,197,66,0.08)', padding: compact => compact ? 16 : 28 },
  { label: 'Padding', color: '#4ade80', dimColor: 'rgba(74,222,128,0.08)', padding: compact => compact ? 14 : 24 },
  { label: 'Content', color: '#22d3ee', dimColor: 'rgba(34,211,238,0.1)', padding: compact => compact ? 12 : 20 },
]

export default function BoxModelViz({ step, compact = false }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {layers.map((layer, i) => {
          const visible = step >= i
          const active = step === i
          return (
            <AnimatePresence key={layer.label}>
              {visible && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1, opacity: 1,
                    boxShadow: active ? `0 0 24px ${layer.color}66` : 'none',
                  }}
                  style={{
                    border: `3px solid ${layer.color}`,
                    background: layer.dimColor,
                    borderRadius: 8,
                    padding: layer.padding(compact),
                    position: i === 0 ? 'relative' : undefined,
                  }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <span style={{
                    position: 'absolute', top: 8, left: 12,
                    fontSize: 10, fontFamily: 'var(--font-mono)',
                    fontWeight: 700, color: layer.color,
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                  }}>
                    {layer.label}
                  </span>
                  {i < layers.length - 1 && <div />}
                  {i === layers.length - 1 && (
                    <div style={{
                      padding: compact ? '12px 24px' : '20px 40px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: compact ? 11 : 13,
                      color: '#22d3ee',
                      fontWeight: 600,
                    }}>
                      {compact ? 'Content' : 'Content Area\nText, Images, etc.'}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{ color: layers[Math.min(step, 3)]?.color, fontFamily: 'var(--font-mono)', fontSize: 12 }}
        >
          {['Margin — pushes elements away', 'Border — frames the element', 'Padding — inner breathing room', 'Content — your actual content'][Math.min(step, 3)]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

---

### Task 8.3: AnimatedFlow (Client→Server→DB)

**Create:** `src/topics/shared/AnimatedFlow.tsx`
```typescript
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Server, Database } from 'lucide-react'

interface Props { step: number; compact?: boolean }

const nodes = [
  { icon: Monitor, label: 'Browser', color: '#5b9cf5' },
  { icon: Server, label: 'Server', color: '#4ade80' },
  { icon: Database, label: 'Database', color: '#a78bfa' },
]

const stepLabels = [
  'Client sends HTTP request →',
  'DNS resolves domain to IP →',
  'Server processes request →',
  'Database query executed →',
  '← Response sent back',
]

export default function AnimatedFlow({ step, compact = false }: Props) {
  const nodeSize = compact ? 48 : 72

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 16 : 32 }}>
        {nodes.map((node, i) => {
          const Icon = node.icon
          const active = (i === 0 && step >= 0) || (i === 1 && step >= 2) || (i === 2 && step >= 3)
          const isReturn = step === 4

          return (
            <div key={node.label} style={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                animate={{
                  boxShadow: active ? `0 0 24px ${node.color}66` : 'none',
                  borderColor: active ? node.color : 'var(--border)',
                }}
                style={{
                  width: nodeSize, height: nodeSize, borderRadius: 16,
                  background: 'var(--surface-bright)',
                  border: '2px solid var(--border)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 4,
                }}
                transition={{ duration: 0.4 }}
              >
                <Icon size={compact ? 20 : 28} color={active ? node.color : 'var(--text-muted)'} />
                {!compact && (
                  <span style={{ fontSize: 10, color: active ? node.color : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {node.label}
                  </span>
                )}
              </motion.div>

              {/* Arrow between nodes */}
              {i < nodes.length - 1 && (
                <div style={{ position: 'relative', width: compact ? 40 : 64, height: 2, margin: '0 4px' }}>
                  <motion.div
                    style={{ height: 2, background: 'var(--border)', width: '100%' }}
                  />
                  {/* Forward packet */}
                  {step >= i * 2 + 1 && step < 4 && (
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: compact ? 36 : 60 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', top: -4,
                        width: 10, height: 10, borderRadius: '50%',
                        background: nodes[i].color,
                      }}
                    />
                  )}
                  {/* Return packet */}
                  {isReturn && i < 2 && (
                    <motion.div
                      initial={{ x: compact ? 36 : 60 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.6, delay: (2 - i) * 0.2, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', top: -4,
                        width: 10, height: 10, borderRadius: '50%',
                        background: '#f5c542',
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          style={{ color: 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }}
        >
          {stepLabels[Math.min(step, stepLabels.length - 1)]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

**Commit:**
```bash
git add -A && git commit -m "feat: BoxModelViz and AnimatedFlow topic animations"
```

---

## Phase 9: Playgrounds

### Task 9.1: usePlayground hook with URL sync

**Create:** `src/hooks/usePlayground.ts`
```typescript
import { useState, useEffect } from 'react'
import LZString from 'lz-string'

export function usePlayground<T>(defaultState: T, key: string) {
  const [state, setState] = useState<T>(() => {
    // Try to restore from URL hash
    const hash = window.location.hash
    const match = hash.match(new RegExp(`[?&]${key}=([^&]*)`))
    if (match) {
      try {
        const decoded = LZString.decompressFromEncodedURIComponent(match[1])
        if (decoded) return JSON.parse(decoded) as T
      } catch {}
    }
    return defaultState
  })

  // Sync state to URL
  useEffect(() => {
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(state))
    const url = new URL(window.location.href)
    // Update hash params
    const hashPath = url.hash.split('?')[0]
    url.hash = `${hashPath}?${key}=${compressed}`
    window.history.replaceState(null, '', url.toString())
  }, [state, key])

  return [state, setState] as const
}
```

---

### Task 9.2: Visual Playground (Box Model)

**Create:** `src/playgrounds/VisualPlayground.tsx`
```typescript
import { usePlayground } from '@/hooks/usePlayground'
import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'

interface BoxModelState {
  padding: number
  margin: number
  borderWidth: number
  borderRadius: number
}

const defaultBoxModel: BoxModelState = { padding: 24, margin: 16, borderWidth: 2, borderRadius: 12 }

interface Props { topicId: string }

export default function VisualPlayground({ topicId }: Props) {
  const [state, setState] = usePlayground<BoxModelState>(defaultBoxModel, `pg-${topicId}`)

  const update = (key: keyof BoxModelState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setState(s => ({ ...s, [key]: Number(e.target.value) }))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
      {/* Controls */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Controls</h3>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <Share2 size={12} /> Share
          </button>
        </div>

        {([
          { label: 'padding', key: 'padding', min: 0, max: 60, unit: 'px' },
          { label: 'margin', key: 'margin', min: 0, max: 60, unit: 'px' },
          { label: 'border-width', key: 'borderWidth', min: 0, max: 12, unit: 'px' },
          { label: 'border-radius', key: 'borderRadius', min: 0, max: 40, unit: 'px' },
        ] as const).map(ctrl => (
          <div key={ctrl.key} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {ctrl.label}
              </label>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--blue)' }}>
                {state[ctrl.key]}{ctrl.unit}
              </span>
            </div>
            <input
              type="range" min={ctrl.min} max={ctrl.max}
              value={state[ctrl.key]}
              onChange={update(ctrl.key)}
              style={{ width: '100%', accentColor: 'var(--blue)' }}
            />
          </div>
        ))}
      </div>

      {/* Preview */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 280,
      }}>
        <motion.div
          animate={{
            padding: state.padding,
            margin: state.margin,
            borderWidth: state.borderWidth,
            borderRadius: state.borderRadius,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            borderStyle: 'solid',
            borderColor: 'var(--green)',
            background: 'rgba(74,222,128,0.08)',
            color: 'var(--green)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            textAlign: 'center',
            minWidth: 80,
          }}
        >
          .box
        </motion.div>
      </div>
    </div>
  )
}
```

---

### Task 9.3: Monaco Playground stub

**Create:** `src/playgrounds/MonacoPlayground.tsx`
```typescript
import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { usePlayground } from '@/hooks/usePlayground'

const defaultCode: Record<string, string> = {
  'http-request-cycle': `# Flask route example
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify({'users': ['Alice', 'Bob']})

if __name__ == '__main__':
    app.run(debug=True)`,
}

interface Props { topicId: string }

export default function MonacoPlayground({ topicId }: Props) {
  const { theme } = useAppStore()
  const [code, setCode] = usePlayground(defaultCode[topicId] ?? '// Write your code here', `monaco-${topicId}`)

  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 16px', background: 'var(--surface-bright)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {['#f87171', '#f5c542', '#4ade80'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginLeft: 8 }}>
          editor
        </span>
      </div>
      <Editor
        height="380px"
        language="python"
        value={code}
        onChange={v => setCode(v ?? '')}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          fontSize: 13,
          fontFamily: 'JetBrains Mono, monospace',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 16 },
        }}
      />
    </div>
  )
}
```

**Commit:**
```bash
git add -A && git commit -m "feat: playgrounds with URL state sharing, VisualPlayground, MonacoPlayground"
```

---

## Phase 10: Search

### Task 10.1: useSearch hook

**Create:** `src/hooks/useSearch.ts`
```typescript
import { useMemo } from 'react'
import { TOPICS } from '@/data/topics'
import type { Topic } from '@/types'

export function useSearch(query: string): Topic[] {
  return useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return TOPICS.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [query])
}
```

---

### Task 10.2: SearchPalette component

**Create:** `src/components/ui/SearchPalette.tsx`
```typescript
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { useSearch } from '@/hooks/useSearch'
import LevelBadge from './LevelBadge'
import { LEVELS } from '@/data/levels'

export default function SearchPalette() {
  const { searchOpen, setSearchOpen } = useAppStore()
  const [query, setQuery] = useState('')
  const results = useSearch(query)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [searchOpen])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [setSearchOpen])

  const go = (topicId: string) => {
    navigate(`/topic/${topicId}`)
    setSearchOpen(false)
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, backdropFilter: 'blur(4px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed', top: '15%', left: '50%', transform: 'translateX(-50%)',
              width: '100%', maxWidth: 560, zIndex: 101,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search topics…"
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)',
                }}
              />
              <button onClick={() => setSearchOpen(false)} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 ? (
              <div style={{ padding: 8 }}>
                {results.map(topic => {
                  const level = LEVELS.find(l => l.id === topic.level)!
                  return (
                    <button
                      key={topic.id}
                      onClick={() => go(topic.id)}
                      className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg transition-all"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8 }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-bright)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
                          {topic.title}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{topic.description}</div>
                      </div>
                      <LevelBadge level={level.id} color={level.color} title={level.title} size="sm" />
                      <ArrowRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    </button>
                  )
                })}
              </div>
            ) : query ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                No topics found for "{query}"
              </div>
            ) : (
              <div style={{ padding: '16px 12px' }}>
                <div style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', padding: '0 8px', marginBottom: 8 }}>
                  SUGGESTIONS
                </div>
                {['CSS Box Model', 'DOM Tree', 'HTTP Request Cycle'].map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13 }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-bright)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    <Clock size={12} /> {s}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

### Task 10.3: Wire SearchPalette into App

**Modify:** `src/App.tsx` — add SearchPalette alongside layout:
```typescript
import SearchPalette from '@/components/ui/SearchPalette'
// inside the JSX, after <Navbar />:
<SearchPalette />
```

**Commit:**
```bash
git add -A && git commit -m "feat: Cmd+K search palette with fuzzy topic search"
```

Verify: `npm run dev` → Cmd+K opens search, typing filters topics, Enter navigates.

---

## Phase 11: GitHub Pages Deploy

### Task 11.1: Update GitHub Actions workflow

**Delete:** `.github/workflows/static.yml`

**Create:** `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### Task 11.2: Update index.html

**Modify:** `index.html` — update title and fonts:
```html
<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/web-dev-guide/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Web Dev Visual Guide — Learning by Animation" />
    <title>Web Dev Visual Guide</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

### Task 11.3: Update README

**Replace:** `README.md`
```markdown
# Web Dev Visual Guide

Interactive animated learning guide for web development — from HTML fundamentals to full-stack deployment.

**Live:** https://jaywee92.github.io/web-dev-guide/

## Stack
React · TypeScript · Vite · Tailwind CSS · Framer Motion

## Development
\`\`\`bash
npm install
npm run dev
\`\`\`

## Build
\`\`\`bash
npm run build
\`\`\`
Deploys automatically on push to `main` via GitHub Actions.
```

---

### Task 11.4: Add .gitignore

**Create:** `.gitignore`
```
node_modules/
dist/
.env
.DS_Store
*.local
```

**Final commit:**
```bash
git add -A && git commit -m "feat: GitHub Pages deploy workflow, README, cleanup"
git push origin main
```

Verify: GitHub Actions tab shows green deploy. `https://jaywee92.github.io/web-dev-guide/` loads the app.

---

## Phase 12: Remaining Animations (post-MVP)

After the core app is live, add these in separate commits:

| Animation | File | Topic |
|-----------|------|-------|
| `DomTreeBuilder` | `src/topics/html/DomTreeBuilder.tsx` | html-dom |
| `FlexboxViz` | `src/topics/css/FlexboxViz.tsx` | css-flexbox |
| `EventLoopViz` | `src/topics/javascript/EventLoopViz.tsx` | js-event-loop |
| `JoinViz` | `src/topics/postgresql/JoinViz.tsx` | postgresql-joins |

Each follows the same pattern as `BoxModelViz`: accepts `{ step, compact }` props, exports default component, is registered in `src/topics/registry.ts`.

---

## Quick Reference

```bash
npm run dev      # Local dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

**Key files to touch when adding content:**
- `src/data/topics.ts` — add topic metadata + explanation steps
- `src/topics/<category>/<Name>.tsx` — create animation component
- `src/topics/registry.ts` — register the animation component
- `src/playgrounds/VisualPlayground.tsx` — add new visual control sets as needed
