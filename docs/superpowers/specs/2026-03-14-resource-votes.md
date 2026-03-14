# Resource Votes — Design Spec

**Date:** 2026-03-14
**Status:** Draft

## Overview

Add an upvote system to the Resources page backed by Supabase. Each resource card shows a vote count and an upvote button. Votes persist in Supabase; per-browser duplicate-vote prevention uses localStorage. The home page Resources card replaces its group subcategory list with the top 5 resources by vote count.

---

## Supabase Setup

**Table:** `resource_votes`

| Column | Type | Constraints |
|---|---|---|
| `resource_id` | `text` | Primary Key |
| `vote_count` | `integer` | NOT NULL, DEFAULT 0 |

Seed all 10 resource IDs with `vote_count = 0` on creation.

**Postgres function** (positional `$1` syntax to avoid named-param ambiguity):
```sql
CREATE OR REPLACE FUNCTION increment_vote(rid text)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE resource_votes SET vote_count = vote_count + 1 WHERE resource_id = $1;
$$;
```

`SECURITY DEFINER` runs the function as the function owner (bypassing anon RLS), so the RLS policy only needs to permit `EXECUTE` on the function — direct `UPDATE` is blocked for the anon role.

**RLS Policies:**
```sql
-- Enable RLS
ALTER TABLE resource_votes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read all rows
CREATE POLICY "public read"
  ON resource_votes FOR SELECT
  TO anon
  USING (true);

-- Block all direct writes from anon (votes go through the function only)
-- No INSERT, UPDATE, DELETE policies for anon role.
-- The increment_vote function uses SECURITY DEFINER and bypasses this.
```

**Supabase credentials:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` (already in `.gitignore`). `.env.example` committed with placeholder values.

---

## Supabase Client

**File:** `src/lib/supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string,
)
```

---

## `useResourceVotes` Hook

**File:** `src/hooks/useResourceVotes.ts`

**Interface:**
```ts
interface UseResourceVotesResult {
  votes: Record<string, number>     // resource_id → vote_count
  hasVoted: Record<string, boolean> // resource_id → voted in this browser
  submitting: Set<string>           // resource_ids currently awaiting RPC response
  upvote: (resourceId: string) => Promise<void>
  loading: boolean
}
```

**localStorage helpers** — all access wrapped in try/catch to handle private browsing / quota errors:
```ts
const LS_KEY = 'rv_voted'

function getVoted(): string[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') } catch { return [] }
}
function setVoted(ids: string[]): void {
  try { localStorage.setItem(LS_KEY, JSON.stringify(ids)) } catch { /* ignore */ }
}
```

**State:**
- `votes: Record<string, number>` — initialized `{}`, populated after fetch
- `hasVoted: Record<string, boolean>` — initialized from `getVoted()` on mount
- `submitting: Set<string>` — IDs with in-flight RPC calls; prevents double-submit
- `loading: boolean` — true during initial fetch

**`upvote(id)` logic:**
1. If `hasVoted[id]` or `submitting.has(id)` → return (no-op)
2. Store `previousCount = votes[id] ?? 0`
3. Optimistically: `votes[id]++`, `hasVoted[id] = true`, `submitting.add(id)`, persist `hasVoted` to localStorage
4. Call `supabase.rpc('increment_vote', { rid: id })`
5. On **success**: remove `id` from `submitting`
6. On **error**: rollback — `votes[id] = previousCount`, `hasVoted[id] = false`, remove from localStorage voted list, remove from `submitting`

**Initial fetch:**
```ts
const { data } = await supabase.from('resource_votes').select('resource_id, vote_count')
// data is an array of { resource_id: string, vote_count: number }
// convert to Record<string, number>
```

---

## Resources Page Changes

**File:** `src/pages/ResourcesPage/index.tsx`

### Props threading

`ResourcesPage` calls `useResourceVotes()` at the top level and passes relevant data down through `ResourceGroupSection` to `ResourceCard`.

**Updated `ResourceGroupSection` props** (add pass-through):
```ts
interface ResourceGroupSectionProps {
  group: ResourceGroup
  votes: Record<string, number>
  hasVoted: Record<string, boolean>
  submitting: Set<string>
  onUpvote: (id: string) => void
  loading: boolean
}
```

**Updated `ResourceCard` props:**
```ts
interface ResourceCardProps {
  r: Resource
  votes: number
  hasVoted: boolean
  submitting: boolean
  onUpvote: () => void
  loading: boolean
}
```

### Upvote button

Added as a footer row inside the card body, **after** the URL chip:

```tsx
<button
  onClick={e => { e.preventDefault(); if (!hasVoted && !submitting) onUpvote() }}
  disabled={hasVoted || submitting}
  style={{
    display: 'flex', alignItems: 'center', gap: 5,
    background: 'none', border: `1px solid ${hasVoted ? r.color + '99' : 'var(--border)'}`,
    borderRadius: 5, padding: '3px 8px', cursor: hasVoted ? 'default' : 'pointer',
    fontSize: 10, fontFamily: 'var(--font-mono)',
    color: hasVoted ? r.color + '99' : 'var(--text-faint)',
    transition: 'border-color 0.15s, color 0.15s',
    marginTop: 4,
  }}
>
  ▲ {loading ? '—' : votes}
</button>
```

`e.preventDefault()` prevents the parent `<a>` from navigating when the button is clicked.

---

## Home Page Changes

**File:** `src/pages/Home/CategoryGrid.tsx`

`ResourcesSection` calls `useResourceVotes()` internally (independent instance). Existing `galaxyRef`, `trailRef`, `globalIndex` props are preserved unchanged.

**Top 5 resources:**
```ts
const allResources = RESOURCE_GROUPS.flatMap(g => g.resources)
const sorted = [...allResources].sort((a, b) => (votes[b.id] ?? 0) - (votes[a.id] ?? 0))
const top5 = sorted.slice(0, 5)
```

Fallback when all votes are 0: `sorted` preserves data-file order (stable sort), so top5 = HeroUI, DaisyUI, UIverse, Aceternity, Magic UI.

**Each top-5 resource rendered as `.subcat`:**
- Top row: `Globe` icon (16px, `r.color`) + resource name (`subcat-label`) + `▲ N` badge (`subcat-cnt`)
- Bottom row (`.subcat-topics`): `new URL(r.url).host`
- `onClick`: `navigate('/resources')` (same as the card click — no per-resource deep-link needed)

**Total votes badge** on the TechSection header:
```ts
const totalVotes = Object.values(votes).reduce((s, n) => s + n, 0)
// badge text: loading ? '10 Links' : `10 Links · ▲ ${totalVotes}`
```

---

## Files Changed

| File | Change |
|---|---|
| `src/lib/supabase.ts` | New — Supabase client singleton |
| `src/hooks/useResourceVotes.ts` | New — vote state, fetch, upvote logic |
| `src/pages/ResourcesPage/index.tsx` | Add vote button; thread votes/hasVoted/submitting/onUpvote/loading through ResourceGroupSection → ResourceCard |
| `src/pages/Home/CategoryGrid.tsx` | ResourcesSection: call useResourceVotes, replace group subcats with Top 5 |
| `.env.example` | New — document VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY |

**Not changed:** `src/data/resources.tsx`, `App.tsx`, `Navbar.tsx`, `categories.ts`

---

## Dependencies

```bash
pnpm add @supabase/supabase-js
```
