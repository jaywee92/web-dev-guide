# Next.js Category + TanStack Query Step Implementation Plan

> ✅ **COMPLETED** — implemented and deployed to main

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Next.js" category with 1 topic (6 steps) to the app, and add 1 new step to the existing TanStack Query topic covering React Router loader integration.

**Architecture:** Pure data/content changes — no new React components needed. Modify `types/index.ts`, `data/categories.ts`, `data/topics.ts`, and EN/DE locale JSON files. Build to verify TypeScript correctness.

**Tech Stack:** TypeScript, React 18, Vite, i18next (EN + DE), Supabase-free

**Spec:** `docs/superpowers/specs/2026-03-16-nextjs-tanstack-integration.md`

---

## Chunk 1: Types + Categories infrastructure

### Task 1: Add `'nextjs'` to CategoryId type

**Files:**
- Modify: `src/types/index.ts`

- [x] **Step 1: Edit CategoryId union in `src/types/index.ts`**

Change:
```ts
| 'javascript' | 'javascript-oop' | 'javascript-async' | 'typescript' | 'react' | 'react-ecosystem' | 'webapis' | 'http' | 'postgresql'
```
To:
```ts
| 'javascript' | 'javascript-oop' | 'javascript-async' | 'typescript' | 'react' | 'react-ecosystem' | 'webapis' | 'http' | 'postgresql' | 'nextjs'
```

- [x] **Step 2: Verify no TS errors yet** (build will confirm later)

---

### Task 2: Add Next.js category + TECH_SECTION_META + categoryIds

**Files:**
- Modify: `src/data/categories.ts`

- [x] **Step 1: Add Next.js to the CATEGORIES array**

Insert after the `react-ecosystem` entry (before `webapis`):
```ts
  {
    id: 'nextjs',
    title: 'Next.js',
    description: 'Fullstack React framework with App Router and React Server Components',
    color: '#a3b4c6',
    icon: 'Layers',
    topicIds: ['nextjs-basics'],
    cardLabel: 'Basics',
    cardEmoji: '📖',
  },
```

- [x] **Step 2: Add Next.js to TECH_SECTION_META**

Insert after the `'react-ecosystem'` entry:
```ts
  nextjs: { title: 'Next.js', subtitle: 'Fullstack React Framework', color: '#a3b4c6' },
```

- [x] **Step 3: Add `'nextjs'` to the FRAMEWORKS & WEB group categoryIds**

Change:
```ts
categoryIds: ['react', 'react-ecosystem', 'http', 'webapis', 'postgresql'],
```
To:
```ts
categoryIds: ['react', 'react-ecosystem', 'nextjs', 'http', 'webapis', 'postgresql'],
```

---

## Chunk 2: Topic content

### Task 3: Add TanStack Query — React Router integration step

**Files:**
- Modify: `src/data/topics.ts` (around line 5224, inside `react-tanstack-query`)

- [x] **Step 1: Append new step to `react-tanstack-query` explanation steps**

The existing steps have `animationStep: 0–4`. Insert a 6th step (animationStep: 5) inside the `explanation` section's `steps` array, after the `useMutation` step (currently the last one):

```ts
          {
            animationStep: 5,
            icon: '🔗',
            heading: 'React Router loader integration',
            text: 'React Router loaders re-run on every navigation by default — even when the data has not changed. You can integrate TanStack Query with loaders using queryClient.ensureQueryData(): the loader populates the cache, and subsequent visits are served instantly without a network round-trip.',
            codeExample: `// src/main.jsx — provide QueryClient to the router\nimport { QueryClient, QueryClientProvider } from '@tanstack/react-query'\nconst queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } })\n\n// src/routes/posts.jsx — loader uses TanStack Query as cache layer\nconst postsQuery = { queryKey: ['posts'], queryFn: () => fetch('/api/posts').then(r => r.json()) }\n\nexport const loader = async () => {\n  // Returns cached data instantly on re-visit; only fetches when stale\n  return queryClient.ensureQueryData(postsQuery)\n}\n\nexport default function PostsPage() {\n  // useQuery reads from the same cache the loader populated\n  const { data: posts } = useQuery(postsQuery)\n  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>\n}`,
            language: 'javascript',
          },
```

---

### Task 4: Add `nextjs-basics` topic to `src/data/topics.ts`

**Files:**
- Modify: `src/data/topics.ts`

Insert the full topic block **before** the `// ─── Git ───` comment (currently around line 5248). The topic has 6 explanation steps drawn from the WBS source files.

- [x] **Step 1: Insert the nextjs-basics topic block**

```ts
  // ─── Next.js ──────────────────────────────────────────────────────────────
  {
    id: 'nextjs-basics',
    title: 'Next.js',
    description: 'Build fullstack React apps with the App Router — server components, data fetching, server functions, and error handling',
    category: 'nextjs',
    color: '#a3b4c6',
    estimatedMinutes: 20,
    animationComponent: undefined,
    bannerComponent: undefined,
    playgroundType: 'monaco',
    nextTopicId: undefined,
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            icon: '🏗️',
            heading: 'What is Next.js?',
            text: 'Next.js is a React framework for production apps that provides routing, data fetching, code-splitting, and deployment out of the box. With React 19 and React Server Components (RSC), it now embraces a fullstack model: components can run permanently on the server, fetch data without useEffect, and query databases directly — all in the same component tree as your client-side UI.',
            codeExample: `// The mental shift: server as permanent co-equal runtime\n\n// ❌ Old model — SSR was a one-time render step before hydration\n// getServerSideProps() ran on every request, then handed off to client\n\n// ✅ New model — Server Components run on the server PERMANENTLY\nexport default async function Page() {\n  // Runs on the server — never shipped to the browser\n  const posts = await db.select().from(postsTable)\n  \n  return (\n    <ul>\n      {posts.map(p => (\n        <li key={p.id}>\n          <h2>{p.title}</h2>\n          <InteractiveVoteButton postId={p.id} />  {/* Client Component */}\n        </li>\n      ))}\n    </ul>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 1,
            icon: '📁',
            heading: 'App Router & project structure',
            text: 'Create a Next.js project with `npx create-next-app@latest`. The App Router uses the file system to define routes: every folder under `src/app/` becomes a URL segment. Special files control what renders at each segment — page.js is the UI, layout.js wraps it with shared chrome, loading.js shows a Suspense fallback, and error.js catches uncaught exceptions.',
            codeExample: `// Bootstrap a new project:\n// npx create-next-app@latest\n// → TypeScript: No  ESLint: Yes  Tailwind: Yes  src/: Yes  App Router: Yes\n\nsrc/app/\n├── layout.js          // Root layout — wraps every page (html, body, nav)\n├── page.js            // Renders at /\n├── loading.js         // Suspense fallback shown during page render\n├── error.js           // Error boundary for this route segment\n├── about/\n│   └── page.js        // Renders at /about\n└── post/\n    └── [id]/\n        └── page.js    // Renders at /post/1, /post/2 … (dynamic segment)\n\n// src/app/layout.js\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="en">\n      <body>\n        <nav>My App</nav>\n        {children}        {/* page.js renders here */}\n      </body>\n    </html>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 2,
            icon: '⚡',
            heading: 'Server vs Client Components',
            text: 'In the App Router, every component is a Server Component by default — it runs on the server, can be async, and never ships to the client bundle. Add `\'use client\'` at the top of a file to opt into a Client Component when you need interactivity, state, or browser APIs. The rule: start with Server Components, reach for Client Components only when necessary.',
            codeExample: `// ─── Server Component (default) ───────────────────────────\n// async ✅  fetch/db ✅  no hooks ✅  no browser APIs ✅\nexport default async function PostPage({ params }) {\n  const post = await db.posts.findById(params.id)  // runs on server only\n  return (\n    <article>\n      <h1>{post.title}</h1>\n      <p>{post.body}</p>\n      <LikeButton postId={post.id} />  {/* Client Component for interactivity */}\n    </article>\n  )\n}\n\n// ─── Client Component ──────────────────────────────────────\n// 'use client' must be the FIRST line\n'use client'\nimport { useState } from 'react'\n\nexport default function LikeButton({ postId }) {\n  const [liked, setLiked] = useState(false)\n  return (\n    <button onClick={() => setLiked(l => !l)}>\n      {liked ? '❤️ Liked' : '🤍 Like'}\n    </button>\n  )\n}\n// useState, useEffect, onClick, window, localStorage → Client Component\n// fetch, db queries, secrets, no interactivity       → Server Component`,
            language: 'jsx',
          },
          {
            animationStep: 3,
            icon: '📡',
            heading: 'Data fetching & streaming',
            text: 'Server Components can use `fetch()` or call a database client directly — no API layer needed. For slow data, pass a Promise to a Client Component and use `use()` with `<Suspense>` to stream content progressively. A `loading.js` file is the shortcut: Next.js automatically wraps the page in a Suspense boundary and shows the loading UI while rendering.',
            codeExample: `// Simple fetch in a Server Component\nexport default async function PostsPage() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts')\n  if (!res.ok) throw new Error('Failed to fetch')\n  const posts = await res.json()\n  return <PostsList posts={posts} />\n}\n\n// ─── Streaming with Suspense ────────────────────────────────\n// src/app/page.js (Server Component — NOT async)\nimport { Suspense } from 'react'\nimport { PostsList, PostsListSkeleton } from '@/components'\nimport { getPosts } from '@/data/posts'\n\nexport default function Home() {\n  const postsPromise = getPosts()  // start fetching — don't await\n  return (\n    <Suspense fallback={<PostsListSkeleton />}>\n      <PostsList postsPromise={postsPromise} />\n    </Suspense>\n  )\n}\n\n// src/components/PostsList.js (Client Component)\n'use client'\nimport { use } from 'react'\nexport default function PostsList({ postsPromise }) {\n  const posts = use(postsPromise)  // suspends until resolved\n  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>\n}`,
            language: 'jsx',
          },
          {
            animationStep: 4,
            icon: '✍️',
            heading: 'Server Functions & mutations',
            text: 'A Server Function is an async function marked with `\'use server\'` — it runs exclusively on the server but can be called from any component, including Client Components. Use them as form `action` props to handle submissions without a separate API endpoint. After mutating data, call `revalidatePath()` or `revalidateTag()` to purge the cache and trigger a re-render.',
            codeExample: `// src/app/actions.js\n'use server'\nimport { revalidatePath } from 'next/cache'\n\nexport async function createPost(formData) {\n  const title = formData.get('title')\n  const body  = formData.get('body')\n\n  if (!title || !body) {\n    return { error: 'Title and body are required.' }\n  }\n\n  await db.posts.create({ title, body })    // runs on server only\n  revalidatePath('/posts')                  // bust the /posts cache\n  return { success: true }\n}\n\n// src/app/new-post/page.js — form calls the Server Function directly\nimport { createPost } from '../actions'\n\nexport default function NewPostPage() {\n  return (\n    <form action={createPost}>\n      <input  name="title" placeholder="Title" />\n      <textarea name="body" placeholder="Body" />\n      <button type="submit">Publish</button>\n    </form>\n  )\n  // No fetch(), no API route, no useEffect — the browser POSTs to the\n  // Server Function. Works even with JavaScript disabled.\n}`,
            language: 'jsx',
          },
          {
            animationStep: 5,
            icon: '🚨',
            heading: 'Error handling',
            text: 'Next.js splits errors into two categories. Expected errors (validation, 404s) should be handled explicitly — return structured state from Server Functions with `useActionState`, check `res.ok` from fetch, or call `notFound()` for missing resources. Unexpected errors (unhandled exceptions) are caught by `error.js` boundaries — a Client Component that receives the error and a `reset()` function to retry.',
            codeExample: `// ─── Expected: Server Function returns error state ─────────\n'use server'\nexport async function registerUser(prevState, formData) {\n  const email = formData.get('email')\n  if (!email) return { error: 'Email is required.' }\n  await db.users.create({ email })\n  return { success: true }\n}\n\n// ─── Expected: notFound() for missing resources ─────────────\nimport { notFound } from 'next/navigation'\nexport default async function PostPage({ params }) {\n  const res = await fetch(\`/api/posts/\${params.id}\`)\n  if (res.status === 404) notFound()   // renders the nearest not-found.js\n  const post = await res.json()\n  return <h1>{post.title}</h1>\n}\n\n// ─── Unexpected: src/app/error.js ───────────────────────────\n'use client'   // must be a Client Component\nexport default function Error({ error, reset }) {\n  return (\n    <div>\n      <h2>Something went wrong</h2>\n      <p>{error.message}</p>\n      <button onClick={() => reset()}>Try again</button>\n    </div>\n  )\n}\n// Place error.js next to page.js to scope it to that route.\n// app/global-error.js is the last-resort fallback for the root.`,
            language: 'jsx',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'Server Component', code: '// Default — no directive needed\nexport default async function Page() {\n  const data = await fetchData()\n  return <div>{data.title}</div>\n}', note: 'async, can fetch/query DB, never in browser bundle' },
        { label: 'Client Component', code: "'use client'\nimport { useState } from 'react'\nexport default function Counter() {\n  const [n, setN] = useState(0)\n  return <button onClick={() => setN(n + 1)}>{n}</button>\n}", note: '\'use client\' must be the first line' },
        { label: 'Server Function', code: "'use server'\nexport async function createItem(formData) {\n  const name = formData.get('name')\n  await db.items.create({ name })\n  revalidatePath('/items')\n}", note: 'Called as form action or from Client Components' },
        { label: 'Suspense streaming', code: 'export default function Page() {\n  const promise = getData()        // do not await\n  return (\n    <Suspense fallback={<Skeleton />}>\n      <DataComponent dataPromise={promise} />\n    </Suspense>\n  )\n}', note: 'Client Component uses use(promise) to unwrap' },
        { label: 'loading.js', code: "export default function Loading() {\n  return <p>Loading…</p>\n}", note: 'Automatically wraps page.js in a Suspense boundary' },
        { label: 'error.js', code: "'use client'\nexport default function Error({ error, reset }) {\n  return <button onClick={reset}>Retry: {error.message}</button>\n}", note: 'Catches uncaught exceptions in this route segment' },
        { label: 'notFound()', code: "import { notFound } from 'next/navigation'\nif (!item) notFound()", note: 'Renders the nearest not-found.js file' },
        { label: 'revalidatePath', code: "import { revalidatePath } from 'next/cache'\nrevalidatePath('/posts')   // bust cache for route", note: 'Call inside Server Functions after mutations' },
      ],
      patterns: [
        { title: 'Full route: Server Component + Client interaction', code: "// app/posts/page.js\nexport default async function PostsPage() {\n  const posts = await db.posts.findAll()\n  return (\n    <main>\n      <h1>Posts</h1>\n      <PostList posts={posts} />   {/* Server Component */}\n      <NewPostForm />              {/* Client Component */}\n    </main>\n  )\n}", language: 'jsx' },
        { title: 'Server Function with useActionState', code: "'use client'\nimport { useActionState } from 'react'\nimport { createPost } from './actions'\n\nexport default function NewPostForm() {\n  const [state, action, isPending] = useActionState(createPost, null)\n  return (\n    <form action={action}>\n      <input name=\"title\" />\n      {state?.error && <p className=\"text-red-500\">{state.error}</p>}\n      <button disabled={isPending}>{isPending ? 'Saving…' : 'Publish'}</button>\n    </form>\n  )\n}", language: 'jsx' },
      ],
      whenToUse: 'Use Next.js when you need a fullstack React app with server-side data access, SEO-friendly rendering, or a unified routing + data model. If you only need client-side React with a separate API, React Router or Vite are lighter choices.',
      commonMistakes: [
        'Using useState or event handlers in a Server Component — add \'use client\' or move logic to a Client Component',
        'Forgetting to call revalidatePath() after a Server Function mutation — the page shows stale data until the next build',
        'Awaiting a promise in the Server Component when passing it to a Client Component for streaming — don\'t await, pass the raw Promise',
        'Placing \'use server\' in a Client Component file — Server Functions must live in separate files or in Server Components',
      ],
    },
  },
```

---

## Chunk 3: Locale files + build

### Task 5: Add Next.js entries to EN locale

**Files:**
- Modify: `src/i18n/locales/en/categories.json`

- [x] **Step 1: Add nextjs category entry** (after `react-ecosystem` block, before `topicLabels`)

```json
  "nextjs": {
    "title": "Next.js",
    "description": "Fullstack React with App Router & RSC",
    "cardLabel": "Basics"
  },
```

- [x] **Step 2: Add nextjs topicLabel entry** (inside `topicLabels`, after existing react entries)

```json
    "nextjs-basics": "Next.js",
```

- [x] **Step 3: Add nextjs techMeta entry** (inside `techMeta`, after `react-ecosystem`)

```json
    "nextjs": { "title": "Next.js", "subtitle": "Fullstack React Framework" },
```

---

### Task 6: Add Next.js entries to DE locale

**Files:**
- Modify: `src/i18n/locales/de/categories.json`

- [x] **Step 1: Add nextjs category entry** (after `react-ecosystem` block, before `topicLabels`)

```json
  "nextjs": {
    "title": "Next.js",
    "description": "Fullstack React mit App Router & RSC",
    "cardLabel": "Grundlagen"
  },
```

- [x] **Step 2: Add nextjs topicLabel entry** (inside `topicLabels`)

```json
    "nextjs-basics": "Next.js",
```

- [x] **Step 3: Add nextjs techMeta entry** (inside `techMeta`)

```json
    "nextjs": { "title": "Next.js", "subtitle": "Fullstack React Framework" },
```

---

### Task 7: TypeScript check + build

**Files:** none created; verification only

- [x] **Step 1: Run build**

```bash
npm run build
```

Expected: `✓ built in X.XXs` with no TypeScript errors. If errors appear, check that `'nextjs'` is in `CategoryId` and `category: 'nextjs'` matches the type exactly.

- [x] **Step 2: Commit**

```bash
git add src/types/index.ts src/data/categories.ts src/data/topics.ts \
        src/i18n/locales/en/categories.json src/i18n/locales/de/categories.json \
        docs/superpowers/specs/2026-03-16-nextjs-tanstack-integration.md \
        docs/superpowers/plans/2026-03-16-nextjs-tanstack-integration.md
git commit -m "feat: add Next.js category + TanStack Query router-integration step"
```
