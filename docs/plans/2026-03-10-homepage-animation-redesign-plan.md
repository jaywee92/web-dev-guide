# Homepage Animation Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the flat 2-column category tile grid with interactive horizontal category rows featuring SpotlightCard mouse-glow, ClickSpark particles on topic chips, and ShinyText shimmer in the hero.

**Architecture:** Three new in-project components (SpotlightCard, ClickSpark, ShinyText) hand-adapted from reactbits.dev patterns. CategoryGrid.tsx is rewritten to render horizontal rows instead of grid tiles. HeroSection.tsx gets ShinyText on its subtitle. No new npm packages.

**Tech Stack:** React, TypeScript, Framer Motion, inline styles, lucide-react.

---

## Task 1: Create `SpotlightCard.tsx`

**Files:**
- Create: `src/pages/Home/SpotlightCard.tsx`

**Step 1: Create the file**

```tsx
import { useRef, type ReactNode, type CSSProperties } from 'react'

interface Props {
  children: ReactNode
  color?: string
  style?: CSSProperties
  onClick?: () => void
}

export default function SpotlightCard({ children, color = '#ffffff', style, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--x', `${x}px`)
    card.style.setProperty('--y', `${y}px`)
    card.style.setProperty('--opacity', '1')
  }

  const handleMouseLeave = () => {
    const card = ref.current
    if (!card) return
    card.style.setProperty('--opacity', '0')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        '--x': '50%',
        '--y': '50%',
        '--opacity': '0',
        ...style,
      } as CSSProperties}
    >
      {/* Spotlight overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(300px circle at var(--x) var(--y), ${color}22, transparent 70%)`,
          opacity: 'var(--opacity)' as unknown as number,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
```

**Step 2: Build to verify no TypeScript errors**

```bash
npm run build 2>&1 | tail -3
```

Expected: `✓ built in ...s`

**Step 3: Commit**

```bash
git add src/pages/Home/SpotlightCard.tsx
git commit -m "feat: add SpotlightCard component with mouse-tracking glow"
```

---

## Task 2: Create `ClickSpark.tsx`

**Files:**
- Create: `src/pages/Home/ClickSpark.tsx`

**Step 1: Create the file**

```tsx
import { useState, useCallback, type ReactNode } from 'react'

interface Spark {
  id: number
  x: number
  y: number
  angle: number
}

interface Props {
  children: ReactNode
  color?: string
}

export default function ClickSpark({ children, color = '#ffffff' }: Props) {
  const [sparks, setSparks] = useState<Spark[]>([])

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    const newSparks = Array.from({ length: 8 }, (_, i) => ({
      id: id + i,
      x,
      y,
      angle: (i * 360) / 8,
    }))
    setSparks(prev => [...prev, ...newSparks])
    setTimeout(() => setSparks(prev => prev.filter(s => s.id < id || s.id >= id + 8)), 500)
  }, [])

  return (
    <span style={{ position: 'relative', display: 'inline-block' }} onClick={handleClick}>
      {children}
      <svg
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
        width="100%"
        height="100%"
      >
        {sparks.map(spark => {
          const rad = (spark.angle * Math.PI) / 180
          const x2 = spark.x + Math.cos(rad) * 20
          const y2 = spark.y + Math.sin(rad) * 20
          return (
            <line
              key={spark.id}
              x1={spark.x}
              y1={spark.y}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
              style={{
                animation: 'spark-fade 0.4s ease-out forwards',
              }}
            />
          )
        })}
        <style>{`
          @keyframes spark-fade {
            0%   { stroke-dasharray: 0 20; opacity: 1; }
            100% { stroke-dasharray: 20 20; opacity: 0; }
          }
        `}</style>
      </svg>
    </span>
  )
}
```

**Step 2: Build to verify**

```bash
npm run build 2>&1 | tail -3
```

Expected: `✓ built in ...s`

**Step 3: Commit**

```bash
git add src/pages/Home/ClickSpark.tsx
git commit -m "feat: add ClickSpark component for click particle effect"
```

---

## Task 3: Create `ShinyText.tsx` and update `HeroSection.tsx`

**Files:**
- Create: `src/pages/Home/ShinyText.tsx`
- Modify: `src/pages/Home/HeroSection.tsx`

### Step 1: Create `ShinyText.tsx`

```tsx
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  speed?: number   // animation duration in seconds, default 3
}

export default function ShinyText({ children, speed = 3 }: Props) {
  return (
    <span
      style={{
        display: 'inline-block',
        backgroundImage: 'linear-gradient(120deg, var(--text-muted) 40%, rgba(255,255,255,0.85) 50%, var(--text-muted) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: `shiny-sweep ${speed}s linear infinite`,
      }}
    >
      {children}
      <style>{`
        @keyframes shiny-sweep {
          0%   { background-position: 100% 50%; }
          100% { background-position: -100% 50%; }
        }
      `}</style>
    </span>
  )
}
```

### Step 2: Update `HeroSection.tsx` — wrap subtitle text in ShinyText

In `src/pages/Home/HeroSection.tsx`, add this import at the top:

```tsx
import ShinyText from './ShinyText'
```

Then find the `<motion.p>` that contains the subtitle text:

```tsx
<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.25 }}
  style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 48px' }}
>
  Complex concepts. Simple animations.
  From HTML to PostgreSQL — watch it work, then build it yourself.
</motion.p>
```

Replace the text content with ShinyText:

```tsx
<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.25 }}
  style={{ fontSize: 18, maxWidth: 520, margin: '0 auto 48px' }}
>
  <ShinyText speed={4}>
    Complex concepts. Simple animations.
    From HTML to PostgreSQL — watch it work, then build it yourself.
  </ShinyText>
</motion.p>
```

Note: Remove `color: 'var(--text-muted)'` from the `<motion.p>` style since ShinyText controls its own color.

### Step 3: Build to verify

```bash
npm run build 2>&1 | tail -3
```

Expected: `✓ built in ...s`

### Step 4: Commit

```bash
git add src/pages/Home/ShinyText.tsx src/pages/Home/HeroSection.tsx
git commit -m "feat: add ShinyText component and apply to hero subtitle"
```

---

## Task 4: Rewrite `CategoryGrid.tsx` — horizontal category rows

**Files:**
- Modify: `src/pages/Home/CategoryGrid.tsx`

**Step 1: Replace the entire file content**

```tsx
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import type { Category } from '@/types'
import SpotlightCard from './SpotlightCard'
import ClickSpark from './ClickSpark'

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database,
}

function CategoryRow({ category, index }: { category: Category; index: number }) {
  const navigate = useNavigate()
  const topics = TOPICS.filter(t => t.category === category.id)
  const Icon = ICONS[category.icon] ?? FileCode2

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <SpotlightCard
        color={category.color}
        onClick={() => navigate(`/${category.id}`)}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          borderLeft: `3px solid ${category.color}`,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
      >
        {/* Icon */}
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: `${category.color}18`,
          border: `1px solid ${category.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color={category.color} />
        </div>

        {/* Category title */}
        <div style={{ width: 130, flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
            {category.title}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 1 }}>
            {topics.length} topic{topics.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 32, background: 'var(--border)', flexShrink: 0 }} />

        {/* Topic chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
          {topics.map(t => (
            <ClickSpark key={t.id} color={category.color}>
              <motion.span
                onClick={e => { e.stopPropagation(); navigate(`/topic/${t.id}`) }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: 'var(--surface-bright)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = `${category.color}18`
                  el.style.color = category.color
                  el.style.borderColor = `${category.color}44`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'var(--surface-bright)'
                  el.style.color = 'var(--text-muted)'
                  el.style.borderColor = 'var(--border)'
                }}
              >
                {t.title}
              </motion.span>
            </ClickSpark>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function CategoryGrid() {
  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CATEGORIES.map((cat, i) => (
          <CategoryRow key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
```

**Step 2: Build to verify no TypeScript errors**

```bash
npm run build 2>&1 | tail -5
```

Expected: `✓ built in ...s` with no `error TS` lines.

**Step 3: Commit**

```bash
git add src/pages/Home/CategoryGrid.tsx
git commit -m "feat: redesign homepage to horizontal category rows with SpotlightCard + ClickSpark"
```

---

## Summary

| Task | Files | What it does |
|------|-------|-------------|
| 1 | `SpotlightCard.tsx` | Mouse-tracking radial glow per card |
| 2 | `ClickSpark.tsx` | Particle burst on topic chip click |
| 3 | `ShinyText.tsx` + `HeroSection.tsx` | Shimmer sweep on hero subtitle |
| 4 | `CategoryGrid.tsx` | Horizontal rows replacing grid tiles |
