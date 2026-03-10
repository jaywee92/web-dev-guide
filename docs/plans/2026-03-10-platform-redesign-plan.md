# Platform Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure the web-dev-guide from a 3-Level card grid into a full LMS/Knowledge Base with 8 technology categories, live hover-preview animations, a topic sidebar, and per-topic cheat sheets.

**Architecture:** New `src/data/categories.ts` defines 8 tech categories. The Homepage becomes a category-tile grid. Each category gets its own page with topic cards that expand on hover showing the live Viz in compact mode. The Topic page gains a fixed sidebar + a new Cheat Sheet section between explanation and playground.

**Tech Stack:** React, Framer Motion, React Router (HashRouter), Lucide React, existing `preloadAnimation` / `getAnimationComponent` from `src/topics/registry.ts`.

---

## Task 1: Extend Type System

**Files:**
- Modify: `src/types/index.ts`

Add `Category` interface, `CheatSheet` types, and `category` + `cheatSheet` fields to `Topic`.

**Step 1: Replace `src/types/index.ts` with:**

```ts
export type Level = 1 | 2 | 3 | 4
export type PlaygroundType = 'visual-controls' | 'monaco' | 'none'
export type ThemeMode = 'dark' | 'light'
export type CategoryId = 'html' | 'css' | 'javascript' | 'typescript' | 'react' | 'webapis' | 'http' | 'postgresql'

export interface Category {
  id: CategoryId
  title: string
  description: string
  color: string
  icon: string        // Lucide icon name
  topicIds: string[]  // ordered
}

export interface CheatSheetSyntax {
  label: string
  code: string
  note?: string
}

export interface CheatSheetPattern {
  title: string
  code: string
  language?: string
}

export interface CheatSheet {
  syntax?: CheatSheetSyntax[]
  patterns?: CheatSheetPattern[]
  whenToUse?: string
  commonMistakes?: string[]
}

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
  category: CategoryId
  color: string
  estimatedMinutes: number
  animationComponent: string
  playgroundType: PlaygroundType
  sections: Section[]
  cheatSheet?: CheatSheet
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

export interface ReferenceEntry {
  name: string
  description: string
  example: string
  link: string
  tags?: string[]
}

export interface ReferenceCategory {
  id: string
  title: string
  color: string
  entries: ReferenceEntry[]
}
```

**Step 2: Build (expect TS errors about missing `category` — normal)**
```bash
npm run build 2>&1 | tail -5
```

**Step 3: Commit**
```bash
git add src/types/index.ts
git commit -m "feat: extend types — Category, CheatSheet, add category field to Topic"
```

---

## Task 2: Create `src/data/categories.ts`

**Files:**
- Create: `src/data/categories.ts`

```ts
import type { Category } from '@/types'

export const CATEGORIES: Category[] = [
  {
    id: 'html',
    title: 'HTML',
    description: 'Structure of the web',
    color: '#4ade80',
    icon: 'FileCode2',
    topicIds: ['html-dom', 'html-semantic', 'html-forms'],
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Style and layout',
    color: '#5b9cf5',
    icon: 'Palette',
    topicIds: ['css-box-model', 'css-flexbox', 'css-grid', 'css-selectors'],
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Language of the browser',
    color: '#fbbf24',
    icon: 'Zap',
    topicIds: ['js-variables', 'js-arrays', 'js-event-loop', 'js-closures'],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScript with types',
    color: '#a78bfa',
    icon: 'Shield',
    topicIds: ['ts-basics', 'ts-interfaces', 'ts-generics'],
  },
  {
    id: 'react',
    title: 'React',
    description: 'Component-based UI',
    color: '#f472b6',
    icon: 'Layers',
    topicIds: ['react-components', 'react-state', 'react-useeffect', 'react-router'],
  },
  {
    id: 'webapis',
    title: 'Web APIs',
    description: 'Browser built-ins',
    color: '#34d399',
    icon: 'Globe',
    topicIds: ['webapi-fetch', 'webapi-events', 'webapi-storage'],
  },
  {
    id: 'http',
    title: 'HTTP',
    description: 'How the web communicates',
    color: '#fb923c',
    icon: 'ArrowLeftRight',
    topicIds: ['http-request-cycle', 'http-rest', 'http-status'],
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: 'Relational databases',
    color: '#60a5fa',
    icon: 'Database',
    topicIds: ['postgres-queries', 'postgres-joins', 'postgres-crud'],
  },
]

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id)
}

export function getCategoryForTopic(topicId: string): Category | undefined {
  return CATEGORIES.find(c => c.topicIds.includes(topicId))
}
```

**Step 2: Commit**
```bash
git add src/data/categories.ts
git commit -m "feat: add categories data file — 8 tech categories"
```

---

## Task 3: Add `category` Field to All 27 Topics

**Files:**
- Modify: `src/data/topics.ts`

For each topic, add `category: '<id>',` after the `level:` field. Mapping:

```
html-dom, html-semantic, html-forms              → 'html'
css-box-model, css-flexbox, css-grid, css-selectors → 'css'
js-variables, js-arrays, js-event-loop, js-closures → 'javascript'
ts-basics, ts-interfaces, ts-generics            → 'typescript'
react-components, react-state, react-useeffect, react-router → 'react'
webapi-fetch, webapi-events, webapi-storage      → 'webapis'
http-request-cycle, http-rest, http-status       → 'http'
postgres-queries, postgres-joins, postgres-crud  → 'postgresql'
```

**Step 2: Build — must pass cleanly**
```bash
npm run build 2>&1 | tail -5
```
Expected: `✓ built in X.XXs`

**Step 3: Commit**
```bash
git add src/data/topics.ts
git commit -m "feat: add category field to all 27 topics"
```

---

## Task 4: Router — Add Category Routes

**Files:**
- Create: `src/pages/CategoryPage/index.tsx` (stub)
- Modify: `src/App.tsx`

**Step 1: Create stub CategoryPage**

`src/pages/CategoryPage/index.tsx`:
```tsx
export default function CategoryPage() {
  return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Loading…</div>
}
```

**Step 2: Update `src/App.tsx`**

Replace the existing content with:

```tsx
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import CategoryPage from '@/pages/CategoryPage'
import TopicPage from '@/pages/TopicPage'
import SearchPage from '@/pages/SearchPage'
import SearchPalette from '@/components/ui/SearchPalette'
import ReferencePage from '@/pages/ReferencePage'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <Navbar />
        <SearchPalette />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/html" element={<CategoryPage />} />
              <Route path="/css" element={<CategoryPage />} />
              <Route path="/javascript" element={<CategoryPage />} />
              <Route path="/typescript" element={<CategoryPage />} />
              <Route path="/react" element={<CategoryPage />} />
              <Route path="/webapis" element={<CategoryPage />} />
              <Route path="/http" element={<CategoryPage />} />
              <Route path="/postgresql" element={<CategoryPage />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/reference/html" element={<ReferencePage type="html" />} />
              <Route path="/reference/css" element={<ReferencePage type="css" />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
```

**Step 3: Build**
```bash
npm run build 2>&1 | tail -5
```

**Step 4: Commit**
```bash
git add src/App.tsx src/pages/CategoryPage/index.tsx
git commit -m "feat: add category routes /html /css /javascript etc"
```

---

## Task 5: Topic Card — Live Hover-Preview

**Files:**
- Replace: `src/components/ui/TopicCard.tsx`

On hover the card expands and shows the Viz component in `compact` mode. The existing `preloadAnimation` / `getAnimationComponent` from `src/topics/registry.ts` handle lazy loading.

**Replace `src/components/ui/TopicCard.tsx`:**

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback, type ComponentType } from 'react'
import { preloadAnimation, getAnimationComponent } from '@/topics/registry'
import type { Topic } from '@/types'

interface Props { topic: Topic }

export default function TopicCard({ topic }: Props) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const [AnimComp, setAnimComp] = useState<ComponentType<{ step: number; compact?: boolean }> | null>(null)
  const [previewStep, setPreviewStep] = useState(0)

  const handleMouseEnter = useCallback(async () => {
    setHovered(true)
    setPreviewStep(0)
    await preloadAnimation(topic.animationComponent)
    setAnimComp(() => getAnimationComponent(topic.animationComponent))
  }, [topic.animationComponent])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    setPreviewStep(0)
  }, [])

  // Auto-play steps 0 → 1 → 2 while hovered
  useEffect(() => {
    if (!hovered || !AnimComp) return
    setPreviewStep(0)
    const t1 = setTimeout(() => setPreviewStep(1), 1600)
    const t2 = setTimeout(() => setPreviewStep(2), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [hovered, AnimComp])

  return (
    <motion.div
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      onClick={() => navigate(`/topic/${topic.id}`)}
      animate={{ scale: hovered ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? topic.color + '55' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: '20px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Top accent line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2, background: topic.color, transformOrigin: 'left',
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 0%, ${topic.color}12 0%, transparent 70%)`,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
          {topic.title}
        </h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
          {topic.description}
        </p>

        {/* Live preview — expands on hover */}
        <AnimatePresence>
          {hovered && AnimComp && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 160, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{
                overflow: 'hidden',
                marginBottom: 14,
                borderRadius: 8,
                background: 'var(--surface-bright)',
                border: `1px solid ${topic.color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
              }}
            >
              <AnimComp step={previewStep} compact />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={12} /> {topic.estimatedMinutes} min
          </span>
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
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

**Step 2: Build**
```bash
npm run build 2>&1 | tail -5
```

**Step 3: Commit**
```bash
git add src/components/ui/TopicCard.tsx
git commit -m "feat: topic card live hover-preview — compact Viz auto-plays on hover"
```

---

## Task 6: Category Page (Real Implementation)

**Files:**
- Replace: `src/pages/CategoryPage/index.tsx`

Read the current file, then replace with:

```tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCategoryById } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import PageWrapper from '@/components/layout/PageWrapper'
import TopicCard from '@/components/ui/TopicCard'
import StaggerChildren, { staggerItem } from '@/components/animations/primitives/StaggerChildren'

export default function CategoryPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const categoryId = location.pathname.replace('/', '')
  const category = getCategoryById(categoryId)
  const topics = TOPICS.filter(t => t.category === categoryId)

  if (!category) {
    return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Category not found.</div>
  }

  const hasReference = categoryId === 'html' || categoryId === 'css'

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
        >
          <ArrowLeft size={16} /> All topics
        </button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 8,
            background: `${category.color}18`, border: `1px solid ${category.color}40`,
            marginBottom: 16,
          }}>
            <span style={{ color: category.color, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700 }}>
              {category.title}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>
            {category.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: hasReference ? 24 : 48 }}>
            {category.description}
          </p>

          {hasReference && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
              <Link
                to={`/reference/${categoryId}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8,
                  background: `${category.color}12`, border: `1px solid ${category.color}33`,
                  color: category.color, fontSize: 12, fontFamily: 'var(--font-mono)',
                  textDecoration: 'none', fontWeight: 600,
                }}
              >
                <ExternalLink size={11} /> {category.title} Reference
              </Link>
            </div>
          )}
        </motion.div>

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

**Step 2: Build**
```bash
npm run build 2>&1 | tail -5
```

**Step 3: Commit**
```bash
git add src/pages/CategoryPage/index.tsx
git commit -m "feat: category pages — topic grid with reference links"
```

---

## Task 7: Homepage — Category Tile Grid

**Files:**
- Create: `src/pages/Home/CategoryGrid.tsx`
- Modify: `src/pages/Home/index.tsx`
- Modify: `src/pages/Home/HeroSection.tsx` (subtitle only)

**Step 1: Create `src/pages/Home/CategoryGrid.tsx`**

```tsx
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import type { Category } from '@/types'

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database,
}

function CategoryTile({ category, index }: { category: Category; index: number }) {
  const navigate = useNavigate()
  const topics = TOPICS.filter(t => t.category === category.id)
  const Icon = ICONS[category.icon] ?? FileCode2

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/${category.id}`)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '24px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 20% 20%, ${category.color}0e 0%, transparent 65%)`,
        }}
      />

      {/* Color bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 3, background: category.color, transformOrigin: 'left',
          borderRadius: '16px 16px 0 0',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-3">
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: `${category.color}18`,
            border: `1px solid ${category.color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={20} color={category.color} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{category.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{category.description}</div>
          </div>
        </div>

        {/* Topic count badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '3px 10px', borderRadius: 99,
          background: `${category.color}14`, border: `1px solid ${category.color}30`,
          fontSize: 11, color: category.color, fontFamily: 'var(--font-mono)',
          fontWeight: 600, marginBottom: 12,
        }}>
          {topics.length} topic{topics.length !== 1 ? 's' : ''}
        </div>

        {/* Topic name chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {topics.slice(0, 3).map(t => (
            <span key={t.id} style={{
              fontSize: 10, color: 'var(--text-muted)',
              background: 'var(--surface-bright)',
              border: '1px solid var(--border)',
              borderRadius: 6, padding: '2px 7px',
              fontFamily: 'var(--font-mono)',
            }}>
              {t.title}
            </span>
          ))}
          {topics.length > 3 && (
            <span style={{ fontSize: 10, color: 'var(--text-faint)', padding: '2px 4px' }}>
              +{topics.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function CategoryGrid() {
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {CATEGORIES.map((cat, i) => (
          <CategoryTile key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
```

**Step 2: Update `src/pages/Home/index.tsx`**

```tsx
import PageWrapper from '@/components/layout/PageWrapper'
import HeroSection from './HeroSection'
import CategoryGrid from './CategoryGrid'

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <CategoryGrid />
    </PageWrapper>
  )
}
```

**Step 3: Update hero subtitle in `HeroSection.tsx`**

Find the `<motion.p>` with description text and change to:
```
Complex concepts. Simple animations.
From HTML to PostgreSQL — watch it work, then build it yourself.
```

**Step 4: Build**
```bash
npm run build 2>&1 | tail -5
```

**Step 5: Commit**
```bash
git add src/pages/Home/CategoryGrid.tsx src/pages/Home/index.tsx src/pages/Home/HeroSection.tsx
git commit -m "feat: homepage — category tile grid replaces level grid"
```

---

## Task 8: Topic Sidebar Component

**Files:**
- Create: `src/components/layout/TopicSidebar.tsx`

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import type { CategoryId } from '@/types'

interface Props {
  activeTopicId: string
  activeCategoryId: CategoryId
}

export default function TopicSidebar({ activeTopicId, activeCategoryId }: Props) {
  const navigate = useNavigate()
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set([activeCategoryId])
  )

  const toggle = (id: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      position: 'sticky',
      top: 72,
      height: 'calc(100vh - 72px)',
      overflowY: 'auto',
      borderRight: '1px solid var(--border)',
      padding: '24px 0',
      scrollbarWidth: 'none',
    }}>
      {CATEGORIES.map(cat => {
        const isOpen = openCategories.has(cat.id)
        const catTopics = TOPICS.filter(t => t.category === cat.id)

        return (
          <div key={cat.id} style={{ marginBottom: 2 }}>
            <button
              onClick={() => toggle(cat.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 16px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: cat.id === activeCategoryId ? cat.color : 'var(--text-muted)',
                fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)',
                letterSpacing: '0.3px',
                borderLeft: cat.id === activeCategoryId
                  ? `2px solid ${cat.color}`
                  : '2px solid transparent',
              }}
            >
              {cat.title}
              {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </button>

            {isOpen && (
              <div style={{ paddingBottom: 4 }}>
                {catTopics.map(topic => {
                  const isActive = topic.id === activeTopicId
                  return (
                    <button
                      key={topic.id}
                      onClick={() => navigate(`/topic/${topic.id}`)}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '5px 16px 5px 24px',
                        background: isActive ? `${cat.color}14` : 'none',
                        border: 'none', cursor: 'pointer',
                        color: isActive ? cat.color : 'var(--text-muted)',
                        fontSize: 12,
                        fontWeight: isActive ? 600 : 400,
                        borderLeft: isActive
                          ? `2px solid ${cat.color}`
                          : '2px solid transparent',
                        transition: 'all 0.15s',
                      }}
                    >
                      {topic.title}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </aside>
  )
}
```

**Step 2: Build**
```bash
npm run build 2>&1 | tail -5
```

**Step 3: Commit**
```bash
git add src/components/layout/TopicSidebar.tsx
git commit -m "feat: topic sidebar — collapsible category nav with active topic highlight"
```

---

## Task 9: Wire Sidebar into Topic Page

**Files:**
- Modify: `src/pages/TopicPage/index.tsx`
- Possibly modify: `src/components/layout/PageWrapper.tsx`

**Step 1: Read the full current `src/pages/TopicPage/index.tsx`**

**Step 2: Read `src/components/layout/PageWrapper.tsx`**

**Step 3: Add `noPadding` prop to PageWrapper if needed**

If PageWrapper applies padding/max-width to its children, add an optional `noPadding?: boolean` prop. When true, render children directly without wrappers.

```tsx
interface Props {
  children: React.ReactNode
  noPadding?: boolean
}

export default function PageWrapper({ children, noPadding = false }: Props) {
  if (noPadding) return <>{children}</>
  // ... existing wrapper
}
```

**Step 4: Modify TopicPage to add sidebar layout**

Add these imports to `src/pages/TopicPage/index.tsx`:
```tsx
import TopicSidebar from '@/components/layout/TopicSidebar'
import { getCategoryForTopic } from '@/data/categories'
import type { CategoryId } from '@/types'
```

After resolving `topic` and `level`, add:
```tsx
const category = getCategoryForTopic(topic.id)
```

Wrap the existing `<PageWrapper>` content in a two-column flex layout:
```tsx
return (
  <PageWrapper noPadding>
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <TopicSidebar
        activeTopicId={topic.id}
        activeCategoryId={(category?.id ?? 'html') as CategoryId}
      />
      <div style={{ flex: 1, minWidth: 0, padding: '40px 40px 80px', maxWidth: 860 }}>
        {/* All existing header, back button, IntroAnimation, SyncExplanation, PlaygroundSection */}
      </div>
    </div>
  </PageWrapper>
)
```

Also update the back button `onClick` to navigate to `/${category?.id ?? ''}` instead of `/level/${topic.level}`.

**Step 5: Build**
```bash
npm run build 2>&1 | tail -5
```

**Step 6: Commit**
```bash
git add src/pages/TopicPage/index.tsx src/components/layout/PageWrapper.tsx
git commit -m "feat: topic page — two-column layout with sidebar"
```

---

## Task 10: Cheat Sheet Component

**Files:**
- Create: `src/components/ui/CheatSheet.tsx`

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import type { CheatSheet as CheatSheetType } from '@/types'

interface Props {
  data: CheatSheetType
  color: string
}

type Tab = 'syntax' | 'patterns' | 'gotchas'

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button
      onClick={copy}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: copied ? '#4ade80' : 'var(--text-faint)',
        padding: '2px 4px', borderRadius: 4, transition: 'color 0.15s',
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )
}

function CodeSnippet({ code, language = 'code' }: { code: string; language?: string }) {
  return (
    <div style={{
      position: 'relative',
      background: '#0d1117',
      borderRadius: 8,
      padding: '12px 16px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      lineHeight: 1.7,
      color: '#e2e8f0',
      overflowX: 'auto',
    }}>
      <div style={{ position: 'absolute', top: 8, right: 8 }}>
        <CopyButton code={code} />
      </div>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{code}</pre>
      <div style={{ fontSize: 10, color: '#475569', marginTop: 4, fontFamily: 'sans-serif' }}>
        {language}
      </div>
    </div>
  )
}

export default function CheatSheet({ data, color }: Props) {
  const hasSyntax = (data.syntax?.length ?? 0) > 0
  const hasPatterns = (data.patterns?.length ?? 0) > 0
  const hasGotchas = (data.commonMistakes?.length ?? 0) > 0 || !!data.whenToUse

  const availableTabs: Tab[] = [
    ...(hasSyntax ? ['syntax' as Tab] : []),
    ...(hasPatterns ? ['patterns' as Tab] : []),
    ...(hasGotchas ? ['gotchas' as Tab] : []),
  ]

  const [activeTab, setActiveTab] = useState<Tab>(availableTabs[0] ?? 'syntax')

  if (availableTabs.length === 0) return null

  return (
    <div style={{ borderRadius: 16, border: `1px solid ${color}33`, overflow: 'hidden', marginBottom: 40 }}>
      {/* Header + tabs */}
      <div style={{ padding: '16px 24px 0', background: `${color}0a`, borderBottom: '1px solid var(--border)' }}>
        <div style={{
          fontSize: 11, color, fontFamily: 'var(--font-mono)',
          fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 12,
        }}>
          Cheat Sheet
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {availableTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px', borderRadius: '8px 8px 0 0',
                border: 'none', cursor: 'pointer',
                background: activeTab === tab ? 'var(--surface)' : 'transparent',
                color: activeTab === tab ? 'var(--text)' : 'var(--text-muted)',
                fontSize: 12, fontWeight: activeTab === tab ? 600 : 400,
                borderBottom: activeTab === tab ? `2px solid ${color}` : '2px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              {tab === 'syntax' ? 'Syntax' : tab === 'patterns' ? 'Patterns' : 'Gotchas'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding: '20px 24px', background: 'var(--surface)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'syntax' && data.syntax && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {data.syntax.map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, alignItems: 'start' }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                        {item.label}
                      </div>
                      {item.note && (
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>
                          {item.note}
                        </div>
                      )}
                    </div>
                    <CodeSnippet code={item.code} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'patterns' && data.patterns && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {data.patterns.map((p, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{p.title}</div>
                    <CodeSnippet code={p.code} language={p.language} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'gotchas' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {data.whenToUse && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: 'var(--font-mono)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      When to use
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                      {data.whenToUse}
                    </p>
                  </div>
                )}
                {data.commonMistakes && data.commonMistakes.length > 0 && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#f87171', fontFamily: 'var(--font-mono)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      Common mistakes
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {data.commonMistakes.map((m, i) => (
                        <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                          <span style={{ color: '#f87171', fontWeight: 700, flexShrink: 0 }}>✕</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
```

**Step 2: Wire into TopicPage**

In `src/pages/TopicPage/index.tsx`, import and render after `SyncExplanation`:

```tsx
import CheatSheet from '@/components/ui/CheatSheet'

// After SyncExplanation, before PlaygroundSection:
{topic.cheatSheet && (
  <div style={{ marginTop: 48 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: 'var(--text)' }}>
      Cheat Sheet
    </h2>
    <CheatSheet data={topic.cheatSheet} color={topic.color} />
  </div>
)}
```

**Step 3: Build**
```bash
npm run build 2>&1 | tail -5
```

**Step 4: Commit**
```bash
git add src/components/ui/CheatSheet.tsx src/pages/TopicPage/index.tsx
git commit -m "feat: cheat sheet component — syntax/patterns/gotchas tabs with copy"
```

---

## Tasks 11–13: Cheat Sheet Data

For all 27 topics, add a `cheatSheet` field to the topic object in `src/data/topics.ts`.

Each `cheatSheet` object follows this structure:
```ts
cheatSheet: {
  syntax: [{ label, code, note? }],
  patterns: [{ title, code, language? }],
  whenToUse: '...',
  commonMistakes: ['...'],
}
```

### Task 11: HTML + CSS (7 topics)

**Topics:** html-dom, html-semantic, html-forms, css-box-model, css-flexbox, css-grid, css-selectors

Key content per topic (implement in order):

**html-dom syntax entries:** querySelector, querySelectorAll, createElement, appendChild, textContent, setAttribute, classList.add/toggle

**html-semantic syntax entries:** header, nav, main, article, section, aside, footer — each with minimal code example

**html-forms syntax entries:** form, input (with type variants), label+for pattern, select/option, textarea, button

**css-box-model syntax entries:** box-sizing: border-box, padding shorthand, margin auto centering, border + border-radius, width/max-width, overflow

**css-flexbox syntax entries:** display:flex + direction, justify-content values, align-items values, flex shorthand on children, flex-wrap, gap

**css-grid syntax entries:** display:grid + template-columns, fr unit, repeat() + auto-fill/minmax, grid-column spanning, gap

**css-selectors syntax entries:** type, class, id, attribute, descendant vs child, :hover/:nth-child, ::before/::after

For `commonMistakes`, include 3 concrete pitfalls per topic.

**Build + commit after all 7:**
```bash
git add src/data/topics.ts
git commit -m "feat: cheat sheet data — HTML + CSS topics (7)"
```

---

### Task 12: JavaScript + TypeScript (7 topics)

**Topics:** js-variables, js-arrays, js-event-loop, js-closures, ts-basics, ts-interfaces, ts-generics

**js-variables:** const/let/var, typeof, destructuring, template literals

**js-arrays:** map, filter, reduce, find, some/every, push/pop, spread for immutable add, flat

**js-event-loop:** setTimeout, Promise/.then, async/await, execution order example (sync → microtask → macrotask)

**js-closures:** basic closure with counter, IIFE, factory function returning object with methods

**ts-basics:** type annotations (number/string/boolean), array types, union types, type alias, function signature

**ts-interfaces:** interface declaration, optional (?), readonly, extends, implements, index signature

**ts-generics:** generic function, inference at call site, generic interface, constraint with extends, Partial/Required/Pick/Omit utility types

**Build + commit:**
```bash
git add src/data/topics.ts
git commit -m "feat: cheat sheet data — JavaScript + TypeScript topics (7)"
```

---

### Task 13: React + Web APIs + HTTP + PostgreSQL (13 topics)

**Topics:** react-components, react-state, react-useeffect, react-router, webapi-fetch, webapi-events, webapi-storage, http-request-cycle, http-rest, http-status, postgres-queries, postgres-joins, postgres-crud

**react-components:** function component, props with TS interface, JSX conditionals + .map with key=, children prop

**react-state:** useState declaration, functional updater, object state spread update, array state immutable operations

**react-useeffect:** run once ([]), run on change, cleanup return, run every render (no deps)

**react-router:** BrowserRouter setup, Link, useNavigate, useParams, useSearchParams, nested routes + Outlet, protected route pattern

**webapi-fetch:** GET, POST with body+headers, res.ok error check, response methods (.json/.text/.blob)

**webapi-events:** addEventListener, removeEventListener, event object props (target/currentTarget/preventDefault/stopPropagation), common event names, event delegation pattern

**webapi-storage:** localStorage setItem/getItem/removeItem/clear with JSON.stringify/parse, sessionStorage, null check on getItem, custom usePersist hook pattern

**http-request-cycle:** request structure (method/path/headers), response structure (status/headers/body), common headers

**http-rest:** GET/POST/PUT/PATCH/DELETE with URL conventions, RESTful endpoint design table

**http-status:** 200/201/204, 301/302/304, 400/401/403/404/422, 500/502/503

**postgres-queries:** SELECT with WHERE/ORDER/LIMIT, aggregate (COUNT/AVG/GROUP BY/HAVING), parameterized query pattern

**postgres-joins:** INNER JOIN, LEFT JOIN, table aliases, multiple join chain, users+orders example

**postgres-crud:** CREATE TABLE with types (SERIAL/TEXT/TIMESTAMPTZ), INSERT with RETURNING, UPDATE with WHERE, DELETE with WHERE, common PG types, upsert ON CONFLICT pattern

**Build + commit:**
```bash
git add src/data/topics.ts
git commit -m "feat: cheat sheet data — React, Web APIs, HTTP, PostgreSQL topics (13)"
```

---

## Task 14: Push + Verify Deploy

```bash
npm run build 2>&1 | grep -E "✓|error|Error"
git push
```

Wait ~2 minutes, then verify GitHub Actions deploy passed.

---

## Summary

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Extend types: Category, CheatSheet, category/cheatSheet on Topic | `feat: extend types` |
| 2 | `src/data/categories.ts` — 8 categories | `feat: add categories data` |
| 3 | `category` field on all 27 topics | `feat: add category field to topics` |
| 4 | Router + stub CategoryPage | `feat: add category routes` |
| 5 | TopicCard live hover-preview | `feat: topic card hover preview` |
| 6 | CategoryPage real implementation | `feat: category pages` |
| 7 | Homepage CategoryGrid + updated hero | `feat: homepage category grid` |
| 8 | TopicSidebar component | `feat: topic sidebar` |
| 9 | Sidebar + two-column layout in TopicPage | `feat: topic page sidebar layout` |
| 10 | CheatSheet component + wired into TopicPage | `feat: cheat sheet component` |
| 11 | Cheat sheet data — HTML + CSS | `feat: cheat sheet data HTML+CSS` |
| 12 | Cheat sheet data — JS + TS | `feat: cheat sheet data JS+TS` |
| 13 | Cheat sheet data — React + Web APIs + HTTP + PG | `feat: cheat sheet data React+APIs+HTTP+PG` |
| 14 | Push + verify deploy | — |
