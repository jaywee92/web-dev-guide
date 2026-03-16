# Spec: NextJS Category + TanStack Query Step

**Date:** 2026-03-16
**Sources:** `wbs-sources/new/NextJS/` (6 files), `wbs-sources/new/TanStack Query/` (1 file)

---

## 1. TanStack Query — Additional Step

### What
Add 1 new step to the existing `react-tanstack-query` topic.

### Step content
**Title:** React Router + TanStack Query Integration
**Source:** `📖 Caching and Why it Matters! – WBS CODING SCHOOL.md`

The step explains:
- Why repeated navigation triggers redundant network requests with plain React Router loaders
- What client-side caching means in practice (in-memory, freshness, stale vs. fresh)
- How TanStack Query integrates with React Router loaders to prefetch and cache before rendering
- The `QueryClient` + `QueryClientProvider` setup

### Where
Append as the last step in `react-tanstack-query` in `src/data/topics.ts`.

---

## 2. Next.js — New Category + Topic

### Category structure

New `CategoryId`: `'nextjs'`

```
FRAMEWORKS & WEB section:
  categoryIds: ['react', 'react-ecosystem', 'http', 'webapis', 'nextjs', 'postgresql']
```

New entry in `CATEGORIES`:
```ts
{
  id: 'nextjs',
  title: 'Next.js',
  description: 'Fullstack React framework with App Router and RSC',
  color: '#e2e8f0',   // near-white, matching Next.js brand
  icon: 'Layers',
  topicIds: ['nextjs-basics'],
  cardLabel: 'Basics',
  cardEmoji: '📖',
}
```

New `TECH_SECTION_META` entry:
```ts
nextjs: { title: 'Next.js', subtitle: 'Fullstack React Framework', color: '#a3b4c6' }
```

`getTechKey('nextjs')` → returns `'nextjs'` (default, no special rule needed).

### Topic

**Topic id:** `nextjs-basics`
**Title:** Next.js
**Category:** `'nextjs'`
**Color:** `'#a3b4c6'`
**estimatedMinutes:** 20
**bannerComponent:** `undefined`

**6 Steps:**

| # | Title | Source file |
|---|-------|-------------|
| 1 | What is Next.js? | `📖 NextJS – WBS CODING SCHOOL.md` |
| 2 | App Router & Project Structure | `🧩 Layouts, Pages and Routing files – WBS CODING SCHOOL.md` |
| 3 | React Server Components | `🧩 React Server Components (and Client Components) – WBS CODING SCHOOL.md` |
| 4 | Data Fetching & Streaming | `🧩 Fetching Data and Streaming – WBS CODING SCHOOL.md` |
| 5 | Server Functions & Mutations | `🧩 Updating Data – WBS CODING SCHOOL.md` |
| 6 | Error Handling | `🧩 Error Handling – WBS CODING SCHOOL.md` |

Each step uses the standard topic step shape: `{ title, content: [{ type: 'text'|'code', ... }] }`.

### Type changes

`src/types/index.ts` — add `'nextjs'` to `CategoryId` union.

### Locale changes

`src/i18n/locales/en/categories.json`:
- Add `"nextjs": { "title": "Next.js", "description": "Fullstack React with App Router & RSC", "cardLabel": "Basics" }`
- Add to `sectionMeta`: `"nextjs": { "title": "Next.js", "subtitle": "Fullstack React Framework" }`
- Add `topicLabels` entry: `"nextjs-basics": "Next.js"`

`src/i18n/locales/de/categories.json`:
- Add `"nextjs": { "title": "Next.js", "description": "Fullstack React mit App Router & RSC", "cardLabel": "Grundlagen" }`
- Add to `sectionMeta`: `"nextjs": { "title": "Next.js", "subtitle": "Fullstack React Framework" }`
- Add `topicLabels` entry: `"nextjs-basics": "Next.js"`

---

## Implementation order

1. `src/types/index.ts` — add `'nextjs'` to `CategoryId`
2. `src/data/categories.ts` — add Category entry + TECH_SECTION_META + categoryIds
3. `src/data/topics.ts` — add `nextjs-basics` topic block + TanStack Query step
4. `src/i18n/locales/en/categories.json` — add nextjs entries
5. `src/i18n/locales/de/categories.json` — add nextjs entries
6. TypeScript check + build
