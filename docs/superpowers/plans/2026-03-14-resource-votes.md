# Resource Votes Implementation Plan

> ⚠️ **PARTIAL** — ResourcesPage exists but Supabase vote integration (useResourceVotes hook, optimistic updates, top-5 home section) not yet verified as fully wired. Needs review.

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Supabase-backed upvote system to the Resources page, with per-browser duplicate prevention via localStorage, and show the top 5 voted resources on the home page.

**Architecture:** A `useResourceVotes` hook fetches all vote counts in one Supabase request and provides an `upvote(id)` function with optimistic updates and rollback. `ResourcesPage` calls the hook at the top level and threads state down through `ResourceGroupSection` to `ResourceCard`. `ResourcesSection` on the home page calls the hook independently and renders top-5 resources instead of group subcategories.

**Tech Stack:** React 18, TypeScript strict, `@supabase/supabase-js`, localStorage, Vite env vars (`VITE_SUPABASE_*`).

---

## Chunk 1: Infrastructure

### Task 1: Install Supabase and create client + env.example

**Files:**
- Modify: `package.json` (via pnpm add)
- Create: `src/lib/supabase.ts`
- Create: `.env.example`

- [ ] **Step 1: Install `@supabase/supabase-js`**

```bash
cd /home/jaywee92/web-dev-guide && pnpm add @supabase/supabase-js
```

Expected: package added, `pnpm-lock.yaml` updated.

- [ ] **Step 2: Create `src/lib/supabase.ts`**

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string,
)
```

- [ ] **Step 3: Create `.env.example`**

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] **Step 4: TypeScript check**

```bash
node_modules/.bin/tsc --noEmit
```

Expected: no output (zero errors).

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase.ts .env.example package.json pnpm-lock.yaml
git commit -m "feat: add Supabase client + install @supabase/supabase-js"
```

---

### Task 2: Create `useResourceVotes` hook

**Files:**
- Create: `src/hooks/useResourceVotes.ts`

- [ ] **Step 1: Create `src/hooks/useResourceVotes.ts`**

```ts
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

const LS_KEY = 'rv_voted'

function getVoted(): string[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') } catch { return [] }
}

function setVoted(ids: string[]): void {
  try { localStorage.setItem(LS_KEY, JSON.stringify(ids)) } catch { /* ignore */ }
}

export interface UseResourceVotesResult {
  votes: Record<string, number>
  hasVoted: Record<string, boolean>
  submitting: Set<string>
  upvote: (resourceId: string) => Promise<void>
  loading: boolean
}

export function useResourceVotes(): UseResourceVotesResult {
  const [votes, setVotes] = useState<Record<string, number>>({})
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(getVoted().map(id => [id, true]))
  )
  const [submitting, setSubmitting] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('resource_votes')
      .select('resource_id, vote_count')
      .then(({ data }) => {
        if (data) {
          setVotes(Object.fromEntries(data.map(row => [row.resource_id, row.vote_count])))
        }
        setLoading(false)
      })
  }, [])

  const upvote = useCallback(async (id: string) => {
    if (hasVoted[id] || submitting.has(id)) return

    const previousCount = votes[id] ?? 0

    // Optimistic update
    setVotes(v => ({ ...v, [id]: (v[id] ?? 0) + 1 }))
    setHasVoted(h => ({ ...h, [id]: true }))
    setSubmitting(s => { const n = new Set(s); n.add(id); return n })
    const voted = getVoted()
    setVoted([...voted, id])

    const { error } = await supabase.rpc('increment_vote', { rid: id })

    if (error) {
      // Rollback
      setVotes(v => ({ ...v, [id]: previousCount }))
      setHasVoted(h => ({ ...h, [id]: false }))
      setVoted(getVoted().filter(v => v !== id))
    }

    setSubmitting(s => { const n = new Set(s); n.delete(id); return n })
  }, [votes, hasVoted, submitting])

  return { votes, hasVoted, submitting, upvote, loading }
}
```

- [ ] **Step 2: TypeScript check**

```bash
node_modules/.bin/tsc --noEmit
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useResourceVotes.ts
git commit -m "feat: add useResourceVotes hook (Supabase fetch + optimistic upvote)"
```

---

## Chunk 2: UI

### Task 3: Update ResourcesPage — add upvote button

**Files:**
- Modify: `src/pages/ResourcesPage/index.tsx`

Replace the entire file with:

- [ ] **Step 1: Rewrite `src/pages/ResourcesPage/index.tsx`**

```tsx
import PageWrapper from '@/components/layout/PageWrapper'
import { RESOURCE_GROUPS } from '@/data/resources'
import type { Resource, ResourceGroup } from '@/data/resources'
import { useResourceVotes } from '@/hooks/useResourceVotes'

function getHost(url: string): string {
  try { return new URL(url).host } catch { return url }
}

interface ResourceCardProps {
  r: Resource
  votes: number
  hasVoted: boolean
  submitting: boolean
  onUpvote: () => void
  loading: boolean
}

function ResourceCard({ r, votes, hasVoted, submitting, onUpvote, loading }: ResourceCardProps) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 0.2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = r.color + '80')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {/* Header */}
      <div style={{
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
        background: `linear-gradient(135deg, ${r.color}1a 0%, ${r.color}0d 100%)`,
        flexShrink: 0,
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={r.color} strokeWidth={1.5} opacity={0.85}>
          {r.icon}
        </svg>
        <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 10, color: 'var(--text-faint)' }}>↗</span>
      </div>

      {/* Body */}
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>{r.name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.55, flex: 1 }}>
          {r.description}
        </div>
        <div style={{
          fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)',
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 5, padding: '4px 8px', display: 'inline-block', width: 'fit-content',
        }}>
          {getHost(r.url)} ↗
        </div>
        <button
          onClick={e => { e.preventDefault(); if (!hasVoted && !submitting) onUpvote() }}
          disabled={hasVoted || submitting}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'none', cursor: hasVoted ? 'default' : 'pointer',
            border: `1px solid ${hasVoted ? r.color + '99' : 'var(--border)'}`,
            borderRadius: 5, padding: '3px 8px', marginTop: 4,
            fontSize: 10, fontFamily: 'var(--font-mono)',
            color: hasVoted ? r.color + '99' : 'var(--text-faint)',
            transition: 'border-color 0.15s, color 0.15s',
            width: 'fit-content',
          }}
        >
          ▲ {loading ? '—' : votes}
        </button>
      </div>
    </a>
  )
}

interface ResourceGroupSectionProps {
  group: ResourceGroup
  votes: Record<string, number>
  hasVoted: Record<string, boolean>
  submitting: Set<string>
  onUpvote: (id: string) => void
  loading: boolean
}

function ResourceGroupSection({ group, votes, hasVoted, submitting, onUpvote, loading }: ResourceGroupSectionProps) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ width: 3, height: 18, background: group.color, borderRadius: 2, flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: group.color, letterSpacing: '0.1em', fontWeight: 700 }}>
          {group.label}
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>
          {group.resources.length} {group.resources.length === 1 ? 'resource' : 'resources'}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
        {group.resources.map(r => (
          <ResourceCard
            key={r.id}
            r={r}
            votes={votes[r.id] ?? 0}
            hasVoted={hasVoted[r.id] ?? false}
            submitting={submitting.has(r.id)}
            onUpvote={() => onUpvote(r.id)}
            loading={loading}
          />
        ))}
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  const { votes, hasVoted, submitting, upvote, loading } = useResourceVotes()

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', letterSpacing: '0.08em', marginBottom: 8 }}>
            RESOURCES
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 10px' }}>
            Useful Resources
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, maxWidth: 520 }}>
            A curated collection of tools, libraries, and references to help you build better web projects.
          </p>
        </div>
        {RESOURCE_GROUPS.map(group => (
          <ResourceGroupSection
            key={group.id}
            group={group}
            votes={votes}
            hasVoted={hasVoted}
            submitting={submitting}
            onUpvote={upvote}
            loading={loading}
          />
        ))}
      </div>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
node_modules/.bin/tsc --noEmit
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ResourcesPage/index.tsx
git commit -m "feat: add upvote button to ResourceCard"
```

---

### Task 4: Update ResourcesSection on home page — Top 5 by votes

**Files:**
- Modify: `src/pages/Home/CategoryGrid.tsx`

The `ResourcesSection` function currently renders one `.subcat` per resource group. Replace only its internals: add `useResourceVotes()` call and rewrite the render body.

- [ ] **Step 1: Add `useResourceVotes` import to CategoryGrid.tsx**

In `src/pages/Home/CategoryGrid.tsx`, insert this import directly after the line `import type { TrailHandle } from './CursorTrail'`:

```tsx
import { useResourceVotes } from '@/hooks/useResourceVotes'
```

- [ ] **Step 2a: Add `getHost` helper before `ResourcesSection`**

In `src/pages/Home/CategoryGrid.tsx`, insert this module-level helper directly before the line `function ResourcesSection({`:

```tsx
function getHost(url: string): string {
  try { return new URL(url).host } catch { return url }
}
```

- [ ] **Step 2b: Replace the `ResourcesSection` function**

Find and replace the entire `ResourcesSection` function (from `function ResourcesSection({` to its closing `}`) with:

```tsx
function ResourcesSection({ globalIndex, galaxyRef, trailRef }: {
  globalIndex: number
  galaxyRef: RefObject<GalaxyHandle | null>
  trailRef: RefObject<TrailHandle | null>
}) {
  const navigate = useNavigate()
  const color = '#a78bfa'
  const { votes, loading } = useResourceVotes()

  const allResources = RESOURCE_GROUPS.flatMap(g => g.resources)
  const top5 = [...allResources]
    .sort((a, b) => (votes[b.id] ?? 0) - (votes[a.id] ?? 0))
    .slice(0, 5)
  const totalLinks = allResources.length
  const totalVotes = Object.values(votes).reduce((s, n) => s + n, 0)

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    galaxyRef.current?.setHover(color, rect)
    trailRef.current?.setColor(color)
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)'
    galaxyRef.current?.setHover(null, null)
    trailRef.current?.setColor(null)
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = -((y / rect.height) - 0.5) * 6
    const ry = ((x / rect.width) - 0.5) * 6
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  return (
    <div
      className="tsec"
      style={{ '--tc': color, '--idx': globalIndex, cursor: 'pointer' } as CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={() => navigate('/resources')}
    >
      <div className="tsec-head">
        <div className="tsec-icon">
          <Globe size={22} color={color} />
        </div>
        <div className="tsec-head-text">
          <div className="tsec-name">Resources</div>
          <div className="tsec-sub">Curated external tools, libraries &amp; references</div>
        </div>
        <span className="tsec-badge">
          {loading ? `${totalLinks} Links` : `${totalLinks} Links · ▲ ${totalVotes}`}
        </span>
      </div>
      <div className="tsec-body">
        {top5.map(r => (
          <div
            key={r.id}
            className="subcat"
            style={{ '--sc': r.color } as CSSProperties}
          >
            <div className="subcat-top">
              <Globe size={16} color={r.color} />
              <span className="subcat-label">{r.name}</span>
              <span className="subcat-cnt">▲ {votes[r.id] ?? 0}</span>
            </div>
            <div className="subcat-topics">
              {getHost(r.url)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: TypeScript check**

```bash
node_modules/.bin/tsc --noEmit
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home/CategoryGrid.tsx
git commit -m "feat: show top-5 voted resources in home page ResourcesSection"
```

---

### Task 5: Final check and push

- [ ] **Step 1: Full TypeScript check**

```bash
node_modules/.bin/tsc --noEmit
```

Expected: no output.

- [ ] **Step 2: Push**

```bash
git push
```
