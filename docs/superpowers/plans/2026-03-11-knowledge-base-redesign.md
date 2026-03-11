# Knowledge Base Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the web-dev-guide as an animated knowledge base — split CSS into 3 categories, add homepage group headers, redesign category pages as numbered reference indexes, and add on-page nav to topic pages.

**Architecture:** Data-first (types → categories → topics → routing), then UI layers from outermost (homepage) inward (category page, topic page, sidebar). No new components created — all changes are modifications to existing files.

**Tech Stack:** React 19, TypeScript, Vite, React Router v7 (HashRouter), Framer Motion, Lucide React

**Spec:** `docs/superpowers/specs/2026-03-11-knowledge-base-redesign.md`

**Verification command (no test suite):** `npx tsc -b` — must pass with zero errors after each task.

---

## Chunk 1: Data Layer + Routing

### Task 1: Update TypeScript types — CategoryId union

**Files:**
- Modify: `src/types/index.ts:4`

- [ ] **Step 1: Update CategoryId union**

In `src/types/index.ts`, replace line 4:

```ts
// OLD:
export type CategoryId = 'html' | 'css' | 'javascript' | 'typescript' | 'react' | 'webapis' | 'http' | 'postgresql'

// NEW:
export type CategoryId = 'html' | 'css-grundlagen' | 'css-layout' | 'css-modern'
  | 'javascript' | 'typescript' | 'react' | 'webapis' | 'http' | 'postgresql'
```

- [ ] **Step 2: Run type-check — expect errors (CSS topics still have old category)**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc -b 2>&1 | grep "error TS" | head -20
```

Expected: Errors like `Type '"css"' is not assignable to type 'CategoryId'` on every CSS topic in `topics.ts`. This is correct — the next tasks fix these.

- [ ] **Step 3: Update categories.ts — remove css, add 3 new categories + CATEGORY_GROUPS**

Replace the entire `src/data/categories.ts` file with:

```ts
import type { Category, CategoryId } from '@/types'

export interface CategoryGroup {
  key: string
  label: string
  categoryIds: CategoryId[]
}

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
    id: 'css-grundlagen',
    title: 'CSS Grundlagen',
    description: 'Basics · Selektoren · Box Model · Styling',
    color: '#5b9cf5',
    icon: 'Palette',
    topicIds: [
      'css-basics',
      'css-selectors',
      'css-colors-units',
      'css-box-model',
      'css-typography',
      'css-backgrounds-gradients',
      'css-images',
    ],
  },
  {
    id: 'css-layout',
    title: 'CSS Layout',
    description: 'Flex · Grid · Responsive',
    color: '#38bdf8',
    icon: 'LayoutGrid',
    topicIds: [
      'css-display-positioning',
      'css-flexbox',
      'css-grid',
      'css-responsive',
    ],
  },
  {
    id: 'css-modern',
    title: 'CSS Modern',
    description: 'Variables · Transforms · Animations',
    color: '#a78bfa',
    icon: 'Sparkles',
    topicIds: [
      'css-custom-properties',
      'css-transforms',
      'css-transitions',
      'css-animations',
    ],
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

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    key: 'markup-style',
    label: 'MARKUP & STIL',
    categoryIds: ['html', 'css-grundlagen', 'css-layout', 'css-modern'],
  },
  {
    key: 'programmierung',
    label: 'PROGRAMMIERUNG',
    categoryIds: ['javascript', 'typescript'],
  },
  {
    key: 'frameworks-web',
    label: 'FRAMEWORKS & WEB',
    categoryIds: ['react', 'webapis', 'http', 'postgresql'],
  },
]

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id)
}

export function getCategoryForTopic(topicId: string): Category | undefined {
  return CATEGORIES.find(c => c.topicIds.includes(topicId))
}
```

- [ ] **Step 4: Update App.tsx — remove /css, add 3 new CSS routes**

In `src/App.tsx`, replace the `/css` route line with three new routes:

```tsx
// Remove this line:
<Route path="/css" element={<CategoryPage />} />

// Add these three lines in its place:
<Route path="/css-grundlagen" element={<CategoryPage />} />
<Route path="/css-layout" element={<CategoryPage />} />
<Route path="/css-modern" element={<CategoryPage />} />
```

The `src/App.tsx` Routes block should now look like:
```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/html" element={<CategoryPage />} />
  <Route path="/css-grundlagen" element={<CategoryPage />} />
  <Route path="/css-layout" element={<CategoryPage />} />
  <Route path="/css-modern" element={<CategoryPage />} />
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
```

- [ ] **Step 5: Update CategoryGrid.tsx — add LayoutGrid and Sparkles icons**

`CategoryGrid.tsx` imports icons from lucide-react. The new categories use `LayoutGrid` and `Sparkles`. Add them to the import and the `ICONS` map:

In `src/pages/Home/CategoryGrid.tsx`:

```tsx
// Change the import line from:
import { FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database } from 'lucide-react'

// To:
import { FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database, LayoutGrid, Sparkles } from 'lucide-react'
```

And in the `ICONS` record:
```tsx
// Change from:
const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database,
}

// To:
const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database, LayoutGrid, Sparkles,
}
```

- [ ] **Step 6: Verify type errors are now only about css topic categories**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc -b 2>&1 | grep "error TS"
```

Expected: Still errors on `topics.ts` lines with `category: 'css'`. No new errors anywhere else.

- [ ] **Step 7: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/types/index.ts src/data/categories.ts src/App.tsx src/pages/Home/CategoryGrid.tsx
git commit -m "feat: split CSS into 3 categories — data layer + routing"
```

---

### Task 2: Update category field on all 15 CSS topics in topics.ts

**Files:**
- Modify: `src/data/topics.ts`

The 15 CSS topics are currently all `category: 'css'`. Mapping (topic id → new category):

| Topic ID | New Category | Approx. line in topics.ts |
|---|---|---|
| css-basics | css-grundlagen | 229 |
| css-box-model | css-grundlagen | 304 |
| css-flexbox | css-layout | 375 |
| css-grid | css-layout | 447 |
| css-selectors | css-grundlagen | 525 |
| css-colors-units | css-grundlagen | 617 |
| css-typography | css-grundlagen | 696 |
| css-backgrounds-gradients | css-grundlagen | 776 |
| css-display-positioning | css-layout | 854 |
| css-responsive | css-layout | 932 |
| css-images | css-grundlagen | 1008 |
| css-custom-properties | css-modern | 1085 |
| css-transforms | css-modern | 1127 |
| css-transitions | css-modern | 1170 |
| css-animations | css-modern | 1212 |

- [ ] **Step 1: Locate each topic by its id and update its category field**

For each of the 15 topic objects in `src/data/topics.ts`, change `category: 'css'` to the value in the table above. The id field immediately precedes the category field in each object. Use the approximate line numbers from the table as a starting point; search for the id string to locate exactly.

- [ ] **Step 2: Run type-check — must pass clean**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc -b 2>&1
```

Expected: `0 errors`. If any errors remain, they will point to a topic whose category was not updated.

- [ ] **Step 3: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/data/topics.ts
git commit -m "feat: update CSS topic categories to css-grundlagen / css-layout / css-modern"
```

---

## Chunk 2: Homepage Groups

### Task 3: Homepage — group section headers + compact cards

**Files:**
- Modify: `src/pages/Home/CategoryGrid.tsx`

The current file iterates `CATEGORIES` and renders `CategoryRow` for each. After this task it iterates `CATEGORY_GROUPS` and renders a group header + rows per group. Categories with ≤ 4 topics render as compact cards.

- [ ] **Step 1: Replace CategoryGrid.tsx**

Replace the entire `src/pages/Home/CategoryGrid.tsx` with:

```tsx
import type { ComponentType } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
} from 'lucide-react'
import { CATEGORIES, CATEGORY_GROUPS } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import type { Category } from '@/types'
import SpotlightCard from './SpotlightCard'
import ClickSpark from './ClickSpark'

const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
}

function TopicChip({ topic, color, onNavigate }: {
  topic: { id: string; title: string }
  color: string
  onNavigate: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <ClickSpark color={color}>
      <motion.span
        onClick={e => { e.stopPropagation(); onNavigate(topic.id) }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.96 }}
        animate={{ scale: hovered ? 1.04 : 1 }}
        style={{
          display: 'inline-block',
          fontSize: 11,
          padding: '3px 10px',
          borderRadius: 20,
          background: hovered ? `${color}18` : 'var(--surface-bright)',
          border: `1px solid ${hovered ? `${color}44` : 'var(--border)'}`,
          color: hovered ? color : 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer',
          transition: 'background 0.15s, color 0.15s, border-color 0.15s',
        }}
      >
        {topic.title}
      </motion.span>
    </ClickSpark>
  )
}

function CategoryRow({ category, index }: { category: Category; index: number }) {
  const navigate = useNavigate()
  const topics = TOPICS.filter(t => t.category === category.id)
  const Icon = ICONS[category.icon] ?? FileCode2
  const isCompact = topics.length <= 4

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <SpotlightCard
        color={category.color}
        onClick={() => navigate(`/${category.id}`)}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          borderLeft: `3px solid ${category.color}`,
          padding: isCompact ? '10px 16px' : '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
      >
        {/* Icon */}
        <div title={category.description} style={{
          width: isCompact ? 30 : 36,
          height: isCompact ? 30 : 36,
          borderRadius: 8,
          flexShrink: 0,
          background: `${category.color}18`,
          border: `1px solid ${category.color}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={isCompact ? 15 : 18} color={category.color} />
        </div>

        {/* Category title */}
        <div style={{ width: isCompact ? 120 : 150, flexShrink: 0 }}>
          <div style={{ fontSize: isCompact ? 13 : 14, fontWeight: 700, color: 'var(--text)' }}>
            {category.title}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 1, lineHeight: 1.3 }}>
            {isCompact ? `${topics.length} topics` : category.description}
          </div>
        </div>

        {!isCompact && (
          <>
            {/* Divider */}
            <div style={{ width: 1, height: 32, background: 'var(--border)', flexShrink: 0 }} />

            {/* Topic chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
              {topics.map(t => (
                <TopicChip
                  key={t.id}
                  topic={t}
                  color={category.color}
                  onNavigate={id => navigate(`/topic/${id}`)}
                />
              ))}
            </div>
          </>
        )}
      </SpotlightCard>
    </motion.div>
  )
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      letterSpacing: '0.1em',
      color: 'var(--text-faint)',
      padding: '8px 4px 4px',
    }}>
      {label}
    </div>
  )
}

export default function CategoryGrid() {
  let rowIndex = 0

  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {CATEGORY_GROUPS.map(group => {
          const groupCategories = group.categoryIds
            .map(id => CATEGORIES.find(c => c.id === id))
            .filter((c): c is Category => c !== undefined)

          return (
            <div key={group.key}>
              <GroupLabel label={group.label} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
                {groupCategories.map(cat => (
                  <CategoryRow key={cat.id} category={cat} index={rowIndex++} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run type-check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc -b 2>&1
```

Expected: 0 errors.

- [ ] **Step 3: Visual check — start dev server**

```bash
cd /home/jaywee92/web-dev-guide && npm run dev
```

Open `http://localhost:5173` (or whatever port Vite prints). Verify:
- Homepage shows 3 group labels: `MARKUP & STIL`, `PROGRAMMIERUNG`, `FRAMEWORKS & WEB`
- Under `MARKUP & STIL`: HTML (full row with chips), CSS Grundlagen (full row, 7 chips), CSS Layout (compact, "4 topics"), CSS Modern (compact, "4 topics")
- Under `PROGRAMMIERUNG`: JavaScript (full, 4 chips), TypeScript (compact, "3 topics")
- Under `FRAMEWORKS & WEB`: React, Web APIs, HTTP, PostgreSQL — all compact

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/Home/CategoryGrid.tsx
git commit -m "feat: homepage — group section headers + compact cards for small categories"
```

---

## Chunk 3: Category Page Redesign

### Task 4: Category page — breadcrumb + numbered reference cards

**Files:**
- Modify: `src/pages/CategoryPage/index.tsx`

- [ ] **Step 1: Replace CategoryPage/index.tsx**

Replace the entire `src/pages/CategoryPage/index.tsx` with:

```tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCategoryById } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import { LEVELS } from '@/data/levels'
import PageWrapper from '@/components/layout/PageWrapper'
import StaggerChildren, { staggerItem } from '@/components/animations/primitives/StaggerChildren'

export default function CategoryPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const categoryId = location.pathname.slice(1)
  const category = getCategoryById(categoryId)
  const topics = TOPICS.filter(t => t.category === categoryId)

  if (!category) {
    return (
      <PageWrapper>
        <div style={{ padding: 40, color: 'var(--text-muted)' }}>Category not found.</div>
      </PageWrapper>
    )
  }

  const hasReference = categoryId === 'html' || categoryId.startsWith('css-')

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-4"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
        >
          <ArrowLeft size={16} /> All topics
        </button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginBottom: 14 }}>
            Docs / <span style={{ color: category.color }}>{category.title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, margin: 0, color: 'var(--text)' }}>
              {category.title}
            </h1>
            <span style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 4,
              background: `${category.color}14`, border: `1px solid ${category.color}30`,
              color: category.color, fontFamily: 'var(--font-mono)',
            }}>
              {topics.length} Topics
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', marginBottom: hasReference ? 20 : 36, fontSize: 14 }}>
            {category.description}
          </p>

          {hasReference && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 36 }}>
              <Link
                to={categoryId === 'html' ? '/reference/html' : '/reference/css'}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8,
                  background: `${category.color}12`, border: `1px solid ${category.color}33`,
                  color: category.color, fontSize: 12, fontFamily: 'var(--font-mono)',
                  textDecoration: 'none', fontWeight: 600,
                }}
              >
                <ExternalLink size={11} /> {categoryId === 'html' ? 'HTML' : 'CSS'} Reference
              </Link>
            </div>
          )}
        </motion.div>

        {/* Numbered reference cards */}
        <StaggerChildren style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {topics.map((topic, i) => {
            const level = LEVELS.find(l => l.id === topic.level)
            const hasPlayground = topic.playgroundType !== 'none'
            const hasCheatSheet = !!topic.cheatSheet

            return (
              <motion.div
                key={topic.id}
                variants={staggerItem}
                onClick={() => navigate(`/topic/${topic.id}`)}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '14px 18px',
                  display: 'flex',
                  gap: 16,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                whileHover={{ borderColor: `${category.color}60` } as never}
              >
                {/* Number badge */}
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: `${category.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: category.color,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                      {topic.title}
                    </span>
                    {level && (
                      <span style={{
                        fontSize: 9, padding: '1px 6px', borderRadius: 3,
                        background: 'var(--surface-bright)', border: '1px solid var(--border)',
                        color: 'var(--text-faint)', fontFamily: 'var(--font-mono)',
                      }}>
                        Level {level.id}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 8px', lineHeight: 1.5 }}>
                    {topic.description}
                  </p>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <span style={{
                      fontSize: 9, padding: '1px 7px', borderRadius: 3,
                      background: 'var(--surface-bright)', border: '1px solid var(--border)',
                      color: 'var(--text-faint)', fontFamily: 'var(--font-mono)',
                    }}>Viz</span>
                    {hasPlayground && (
                      <span style={{
                        fontSize: 9, padding: '1px 7px', borderRadius: 3,
                        background: 'var(--surface-bright)', border: '1px solid var(--border)',
                        color: 'var(--text-faint)', fontFamily: 'var(--font-mono)',
                      }}>Playground</span>
                    )}
                    {hasCheatSheet && (
                      <span style={{
                        fontSize: 9, padding: '1px 7px', borderRadius: 3,
                        background: 'var(--surface-bright)', border: '1px solid var(--border)',
                        color: 'var(--text-faint)', fontFamily: 'var(--font-mono)',
                      }}>Cheat Sheet</span>
                    )}
                  </div>
                </div>

                <div style={{ alignSelf: 'center', color: 'var(--text-faint)', fontSize: 16 }}>→</div>
              </motion.div>
            )
          })}
        </StaggerChildren>
      </div>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: Run type-check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc -b 2>&1
```

Expected: 0 errors.

- [ ] **Step 3: Visual check**

With dev server running, navigate to `/#/css-layout`. Verify:
- Breadcrumb shows `Docs / CSS Layout`
- Header: title "CSS Layout" + "4 Topics" badge + description
- 4 numbered cards (01–04): Display & Positioning, Flexbox, CSS Grid, Responsive Design
- Each card shows description + feature badges
- Navigate to `/#/css-grundlagen` → shows 7 cards numbered 01–07
- Navigate to `/#/html` → reference link appears; `/#/css-grundlagen` → reference link points to `/reference/css`
- Navigate to `/#/javascript` → no reference link

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/CategoryPage/index.tsx
git commit -m "feat: category page — breadcrumb + numbered reference cards + feature badges"
```

---

## Chunk 4: Topic Page + Sidebar

### Task 5: Topic page — breadcrumb + section IDs

**Files:**
- Modify: `src/pages/TopicPage/index.tsx`

- [ ] **Step 1: Update TopicPage/index.tsx**

The changes are:
1. Add a breadcrumb (`Docs / {category.title} / {topic.title}`) below the back button
2. Wrap each major section in a `<div id="...">` for anchor navigation

Replace the entire `src/pages/TopicPage/index.tsx` with:

```tsx
import { useState, useEffect, type ComponentType } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getTopicById } from '@/data/topics'
import { LEVELS } from '@/data/levels'
import PageWrapper from '@/components/layout/PageWrapper'
import LevelBadge from '@/components/ui/LevelBadge'
import IntroAnimation from './IntroAnimation'
import SyncExplanation from './SyncExplanation'
import PlaygroundSection from './PlaygroundSection'
import CheatSheet from '@/components/ui/CheatSheet'
import TopicSidebar from '@/components/layout/TopicSidebar'
import { getCategoryForTopic } from '@/data/categories'
import { preloadAnimation, getAnimationComponent } from '@/topics/registry'
import type { CategoryId } from '@/types'

export default function TopicPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const topic = topicId ? getTopicById(topicId) : undefined
  const level = topic ? LEVELS.find(l => l.id === topic.level) : undefined

  const [AnimComp, setAnimComp] = useState<ComponentType<{ step: number; compact?: boolean }> | null>(
    () => topic ? getAnimationComponent(topic.animationComponent) : null
  )

  useEffect(() => {
    if (!topic) return
    preloadAnimation(topic.animationComponent).then(() => {
      setAnimComp(() => getAnimationComponent(topic.animationComponent))
    })
  }, [topic?.animationComponent])

  if (!topic || !level) {
    return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Topic not found.</div>
  }

  const category = getCategoryForTopic(topic.id)
  const hasCheatSheet = !!topic.cheatSheet
  const hasPlayground = topic.playgroundType !== 'none'

  return (
    <PageWrapper>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        {/* fallback 'html' is safe: getCategoryForTopic only returns undefined if topic.category is missing from categories.ts — prevented by TypeScript */}
        <TopicSidebar
          key={category?.id}
          activeTopicId={topic.id}
          activeCategoryId={(category?.id ?? 'html') as CategoryId}
          hasCheatSheet={hasCheatSheet}
          hasPlayground={hasPlayground}
          topicTitle={topic.title}
        />
        <div style={{ flex: 1, minWidth: 0, padding: '40px 40px 80px', maxWidth: 860 }}>

          {/* Navigation header */}
          <div id="intro">
            <button
              onClick={() => navigate(`/${category?.id ?? ''}`)}
              className="flex items-center gap-2 mb-3"
              style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
            >
              <ArrowLeft size={16} /> {category?.title ?? level.title}
            </button>

            {/* Breadcrumb */}
            <div style={{
              fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)',
              marginBottom: 14,
            }}>
              Docs{category ? ` / ${category.title}` : ''} / <span style={{ color: 'var(--text-muted)' }}>{topic.title}</span>
            </div>

            <LevelBadge level={level.id} color={level.color} title={level.title} size="sm" />
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, marginTop: 12, marginBottom: 8 }}>
              {topic.title}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 24 }}>
              {topic.description}
            </p>
            {(topic.id.startsWith('html') || topic.id.startsWith('css')) && (
              <Link
                to={topic.id.startsWith('html') ? '/reference/html' : '/reference/css'}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 12, color: 'var(--text-faint)', textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-faint)')}
              >
                <ExternalLink size={11} />
                {topic.id.startsWith('html') ? 'HTML Reference' : 'CSS Reference'} →
              </Link>
            )}
          </div>

          {/* Phase 1: Intro */}
          <div id="viz" style={{ marginTop: 32 }}>
            <IntroAnimation AnimComp={AnimComp} />
          </div>

          {/* Phase 2: Explanation */}
          <div id="explanation">
            <SyncExplanation topic={topic} AnimComp={AnimComp} />
          </div>

          {/* Cheat Sheet */}
          {hasCheatSheet && (
            <div id="cheatsheet" style={{ marginTop: 48 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: 'var(--text)' }}>
                Cheat Sheet
              </h2>
              <CheatSheet key={topic.id} data={topic.cheatSheet!} color={topic.color} />
            </div>
          )}

          {/* Phase 3: Playground */}
          {hasPlayground && (
            <div id="playground">
              <PlaygroundSection topic={topic} />
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
```

Note: `TopicSidebar` now receives 3 new props (`hasCheatSheet`, `hasPlayground`, `topicTitle`) — Task 6 adds these to the sidebar. Until Task 6 is done, TypeScript will error on these props. Complete Task 5 and Task 6 together before running type-check.

- [ ] **Step 2: Proceed immediately to Task 6 — do NOT run tsc yet**

---

### Task 6: TopicSidebar — on-page anchor navigation

**Files:**
- Modify: `src/components/layout/TopicSidebar.tsx`

- [ ] **Step 1: Replace TopicSidebar.tsx**

Replace the entire `src/components/layout/TopicSidebar.tsx` with:

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
  hasCheatSheet: boolean
  hasPlayground: boolean
  topicTitle: string
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function TopicSidebar({
  activeTopicId,
  activeCategoryId,
  hasCheatSheet,
  hasPlayground,
  topicTitle,
}: Props) {
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

  const anchorLinks: Array<{ id: string; label: string }> = [
    { id: 'intro', label: `Was ist ${topicTitle}?` },
    { id: 'viz', label: 'Visualisierung' },
    { id: 'explanation', label: 'Erklärung' },
    ...(hasCheatSheet ? [{ id: 'cheatsheet', label: 'Cheat Sheet' }] : []),
    ...(hasPlayground ? [{ id: 'playground', label: 'Playground' }] : []),
  ]

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
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Category + topic list */}
      <div style={{ flex: 1 }}>
        {CATEGORIES.map(cat => {
          const isOpen = openCategories.has(cat.id)
          const catTopics = TOPICS.filter(t => t.category === cat.id)

          return (
            <div key={cat.id} style={{ marginBottom: 2 }}>
              <button
                onClick={() => toggle(cat.id)}
                aria-expanded={isOpen}
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
                        aria-current={isActive ? 'page' : undefined}
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
      </div>

      {/* On-page anchor navigation */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '14px 0 0',
        marginTop: 8,
      }}>
        <div style={{
          fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
          letterSpacing: '0.1em', color: 'var(--text-faint)',
          padding: '0 16px', marginBottom: 6,
        }}>
          AUF DIESER SEITE
        </div>
        {anchorLinks.map(link => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            style={{
              width: '100%', textAlign: 'left',
              padding: '4px 16px 4px 20px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-faint)',
              fontSize: 11,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-faint)')}
          >
            {link.label}
          </button>
        ))}
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Run type-check — must pass clean**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc -b 2>&1
```

Expected: 0 errors.

- [ ] **Step 3: Visual check**

With dev server running, navigate to any topic page (e.g., `/#/topic/css-flexbox`). Verify:
- Breadcrumb shows `Docs / CSS Layout / Flexbox`
- Sidebar shows `AUF DIESER SEITE` section at the bottom
- Clicking `Visualisierung` scrolls smoothly to the animation section
- Clicking `Cheat Sheet` scrolls to cheat sheet (if topic has one)
- Back button returns to `/#/css-layout`

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/pages/TopicPage/index.tsx src/components/layout/TopicSidebar.tsx
git commit -m "feat: topic page — breadcrumb + section IDs + on-page anchor navigation in sidebar"
```

---

## Final Verification

- [ ] **Run full build**

```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1
```

Expected: `✓ built in X.XXs` with no errors.

- [ ] **Smoke test key routes**

With `npm run dev`:
1. `/#/` — homepage shows 3 groups, CSS is split into 3 rows
2. `/#/css-grundlagen` — 7 numbered cards, breadcrumb shows category
3. `/#/css-layout` — 4 numbered cards, reference link points to CSS reference
4. `/#/css-modern` — 4 numbered cards
5. `/#/topic/css-flexbox` — breadcrumb shows `Docs / CSS Layout / Flexbox`, sidebar has on-page nav
6. `/#/topic/html-dom` — breadcrumb shows `Docs / HTML / ...`, HTML reference link works
7. Old `/#/css` — shows "Category not found." (expected — route removed)

- [ ] **Push to GitHub**

```bash
cd /home/jaywee92/web-dev-guide && git push origin main
```
