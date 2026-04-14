# Resources Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone `/resources` page listing 10 curated external web dev resources in 5 labeled groups, each rendered as a responsive 3-column showcase grid.

**Architecture:** Two new files (data + page component), two small modifications (App.tsx route + Navbar link). The data file (`resources.tsx`) exports typed `RESOURCE_GROUPS` with JSX icon nodes. The page component renders groups → grid → cards using only inline styles and CSS variables — no new dependencies.

**Tech Stack:** React 18, TypeScript (strict), inline styles, CSS variables, `react-router-dom` `<Link>`, `framer-motion` via `PageWrapper`.

---

## Chunk 1: Data + Page Component

### Task 1: Create resource data file

**Files:**
- Create: `src/data/resources.tsx`

- [ ] **Step 1: Create `src/data/resources.tsx` with interfaces and data**

```tsx
import type { ReactNode } from 'react'

export interface Resource {
  id: string
  name: string
  url: string
  description: string
  color: string
  icon: ReactNode
}

export interface ResourceGroup {
  id: string
  label: string
  color: string
  resources: Resource[]
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    id: 'ui-components',
    label: 'UI COMPONENT LIBRARIES',
    color: '#5b9cf5',
    resources: [
      {
        id: 'heroui',
        name: 'HeroUI',
        url: 'https://www.heroui.com',
        description: 'Beautiful, accessible React component library with dark mode, Tailwind integration, and 50+ ready-to-use components.',
        color: '#f472b6',
        icon: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></>,
      },
      {
        id: 'daisyui',
        name: 'DaisyUI',
        url: 'https://daisyui.com',
        description: 'The most popular Tailwind CSS component library. Adds semantic class names so you write less CSS and focus on structure.',
        color: '#4ade80',
        icon: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
      },
      {
        id: 'uiverse',
        name: 'UIverse.io',
        url: 'https://uiverse.io',
        description: 'Open-source community of CSS & Tailwind UI elements. Browse thousands of free buttons, cards, loaders, and more.',
        color: '#a78bfa',
        icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
      },
    ],
  },
  {
    id: 'animated-components',
    label: 'ANIMATED COMPONENTS',
    color: '#f472b6',
    resources: [
      {
        id: 'aceternity',
        name: 'Aceternity UI',
        url: 'https://ui.aceternity.com',
        description: 'Stunning animated React & Tailwind components. Parallax cards, text effects, gradients, and scroll-based animations.',
        color: '#5b9cf5',
        icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
      },
      {
        id: 'magicui',
        name: 'Magic UI',
        url: 'https://magicui.design',
        description: '150+ free animated React components. Border beams, shimmer effects, and attention-grabbing micro-interactions.',
        color: '#38bdf8',
        icon: <path d="M12 2l2 7h7l-6 4 2 7-5-4-5 4 2-7-6-4h7z" />,
      },
      {
        id: 'hover-dev',
        name: 'Hover.dev',
        url: 'https://www.hover.dev',
        description: 'Interactive hover animations and motion effects for React. Ready-to-paste components with spring physics.',
        color: '#fbbf24',
        icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
      },
    ],
  },
  {
    id: 'animation',
    label: 'ANIMATION & MOTION',
    color: '#fb923c',
    resources: [
      {
        id: 'animejs',
        name: 'Anime.js',
        url: 'https://animejs.com',
        description: 'Lightweight JavaScript animation library. Animate CSS properties, SVGs, DOM attributes, and JS objects with a clean API.',
        color: '#fb923c',
        icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
      },
    ],
  },
  {
    id: 'react',
    label: 'REACT RESOURCES',
    color: '#e879f9',
    resources: [
      {
        id: 'reactbits',
        name: 'ReactBits',
        url: 'https://reactbits.dev',
        description: 'Animated React component library with creative UI patterns — backgrounds, text effects, and interactive components.',
        color: '#e879f9',
        icon: <><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="2" fill="#e879f9" stroke="none" /></>,
      },
    ],
  },
  {
    id: 'tools',
    label: 'TOOLS & AI',
    color: '#34d399',
    resources: [
      {
        id: 'v0',
        name: 'v0 by Vercel',
        url: 'https://v0.dev',
        description: 'AI-powered UI generator by Vercel. Describe a component in plain English and get production-ready React + Tailwind code instantly.',
        color: '#34d399',
        icon: <><path d="M12 2a10 10 0 0 1 10 10c0 4-2.5 7.5-6 9.2M12 2a10 10 0 0 0-10 10c0 4 2.5 7.5 6 9.2" /><path d="M12 8v4l3 3" /></>,
      },
      {
        id: 'webcode-tools',
        name: 'WebCode.tools',
        url: 'https://webcode.tools',
        description: 'Collection of handy web code generators. Quickly create CSS gradients, shadows, flexbox layouts, meta tags, and more.',
        color: '#2dd4bf',
        icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
      },
    ],
  },
]
```

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsgo
```

Expected: no errors related to `resources.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/data/resources.tsx
git commit -m "feat: add resources data (RESOURCE_GROUPS with 10 entries, 5 groups)"
```

---

### Task 2: Create ResourcesPage component

**Files:**
- Create: `src/pages/ResourcesPage/index.tsx`

- [ ] **Step 1: Create `src/pages/ResourcesPage/index.tsx`**

```tsx
import PageWrapper from '@/components/layout/PageWrapper'
import { RESOURCE_GROUPS } from '@/data/resources'
import type { Resource, ResourceGroup } from '@/data/resources'

function getHost(url: string): string {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

function ResourceCard({ r }: { r: Resource }) {
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
        <svg
          width="36" height="36" viewBox="0 0 24 24"
          fill="none" stroke={r.color} strokeWidth={1.5} opacity={0.85}
        >
          {r.icon}
        </svg>
        <span style={{
          position: 'absolute', top: 8, right: 10,
          fontSize: 12, color: 'var(--text-faint)',
        }}>↗</span>
      </div>

      {/* Body */}
      <div style={{
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        flex: 1,
      }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>
          {r.name}
        </div>
        <div style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          lineHeight: 1.55,
          flex: 1,
        }}>
          {r.description}
        </div>
        <div style={{
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-faint)',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 5,
          padding: '4px 8px',
          display: 'inline-block',
          width: 'fit-content',
        }}>
          {getHost(r.url)} ↗
        </div>
      </div>
    </a>
  )
}

function ResourceGroupSection({ group }: { group: ResourceGroup }) {
  return (
    <div style={{ marginBottom: 40 }}>
      {/* Group header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
      }}>
        <div style={{
          width: 3, height: 18,
          background: group.color,
          borderRadius: 2,
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          color: group.color,
          letterSpacing: '0.1em',
          fontWeight: 700,
        }}>
          {group.label}
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>
          {group.resources.length} {group.resources.length === 1 ? 'resource' : 'resources'}
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 10,
      }}>
        {group.resources.map(r => (
          <ResourceCard key={r.id} r={r} />
        ))}
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Page header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-faint)',
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}>
            RESOURCES
          </div>
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--text)',
            margin: '0 0 10px',
          }}>
            Useful Resources
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, maxWidth: 520 }}>
            A curated collection of tools, libraries, and references to help you build better web projects.
          </p>
        </div>

        {/* Groups */}
        {RESOURCE_GROUPS.map(group => (
          <ResourceGroupSection key={group.id} group={group} />
        ))}
      </div>
    </PageWrapper>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsgo
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ResourcesPage/index.tsx
git commit -m "feat: add ResourcesPage component"
```

---

## Chunk 2: Wiring

### Task 3: Add route in App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add import and route**

In `src/App.tsx`:

Add import after the existing page imports (after `import ReferencePage ...`):
```tsx
import ResourcesPage from '@/pages/ResourcesPage'
```

Add route inside `<Routes>` directly after `<Route path="/git-collab" element={<CategoryPage />} />` and before `<Route path="/topic/:topicId" element={<TopicPage />} />`:
```tsx
<Route path="/resources" element={<ResourcesPage />} />
```

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsgo
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: register /resources route"
```

---

### Task 4: Add Resources nav link in Navbar

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Add Resources link**

In `src/components/layout/Navbar.tsx`, add `Link` to the existing imports from `react-router-dom` (it's already imported — confirm it's present, otherwise add it).

Insert the following directly before the `{/* Search */}` comment block (which starts the Search button section). Use that comment as your exact anchor:

```tsx
{/* Resources link */}
<Link
  to="/resources"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '5px 10px',
    borderRadius: 8,
    textDecoration: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 600,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    color: 'var(--text-muted)',
    transition: 'border-color 0.15s, color 0.15s',
    letterSpacing: '0.04em',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.borderColor = '#a78bfa'
    e.currentTarget.style.color = '#a78bfa'
  }}
  onMouseLeave={e => {
    e.currentTarget.style.borderColor = 'var(--border)'
    e.currentTarget.style.color = 'var(--text-muted)'
  }}
>
  RESOURCES
</Link>
```

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsgo
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Resources nav link to Navbar"
```

---

### Task 5: Final check and push

- [ ] **Step 1: Full TypeScript + lint check**

```bash
pnpm check
```

Expected: no errors or warnings **introduced by this change** (pre-existing warnings unrelated to resources are acceptable).

- [ ] **Step 2: Push**

```bash
git push
```
