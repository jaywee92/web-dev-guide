# React Ecosystem Category Implementation Plan

> ✅ **COMPLETED** — implemented and deployed to main

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `react-ecosystem` category with 4 topics (React Router Advanced, Data Fetching Strategies, Data Mutations, TanStack Query) including full topic data, EN/DE locales, 4 SVG banners, and registry wiring.

**Architecture:** Same pattern as all previous topic additions — data in `topics.ts`, category wiring in `categories.ts`, locale strings in `topics-other.json` and `categories.json`, SVG banners as TSX components lazy-loaded via `registry.ts`. No new infrastructure needed.

**Tech Stack:** TypeScript, React, inline SVG, i18next JSON

**Spec:** `docs/superpowers/specs/2026-03-16-react-ecosystem-design.md`

---

## Chunk 1: Data Layer

### Task 1: Wire categories.ts

**Files:**
- Modify: `src/data/categories.ts`

- [x] **Step 1: Add react-ecosystem to CATEGORIES array**

In `src/data/categories.ts`, after the `react` entry (after line ending `cardEmoji: '📖',`), add:

```typescript
  {
    id: 'react-ecosystem',
    title: 'React Ecosystem',
    description: 'Advanced patterns, data strategies, and ecosystem tools',
    color: '#a78bfa',
    icon: 'Layers',
    topicIds: ['react-router-advanced', 'react-data-fetching', 'react-mutations', 'react-tanstack-query'],
    cardLabel: 'Ecosystem',
    cardEmoji: '🌐',
  },
```

- [x] **Step 2: Add react-ecosystem to CATEGORY_GROUPS**

In the `frameworks-web` group, change `categoryIds` from:
```typescript
categoryIds: ['react', 'webapis', 'http', 'postgresql'],
```
to:
```typescript
categoryIds: ['react', 'react-ecosystem', 'webapis', 'http', 'postgresql'],
```

- [x] **Step 3: Add react-ecosystem to TECH_SECTION_META**

After the `react` entry in `TECH_SECTION_META`, add:
```typescript
  'react-ecosystem': { title: 'React', subtitle: 'Ecosystem & Patterns', color: '#a78bfa' },
```

- [x] **Step 4: Add 4 entries to TOPIC_ICONS**

After `'react-context': 'Share2',` add:
```typescript
  'react-router-advanced': 'Network',
  'react-data-fetching':   'Download',
  'react-mutations':       'Send',
  'react-tanstack-query':  'Database',
```

- [x] **Step 5: Add 4 entries to TOPIC_LABELS**

After `'react-context': 'Context & useReducer',` add:
```typescript
  'react-router-advanced': 'Router Advanced',
  'react-data-fetching':   'Data Fetching',
  'react-mutations':       'Data Mutations',
  'react-tanstack-query':  'TanStack Query',
```

- [x] **Step 6: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors (or only pre-existing errors unrelated to categories.ts)

- [x] **Step 7: Commit**

```bash
git add src/data/categories.ts
git commit -m "feat: add react-ecosystem category to categories.ts"
```

---

### Task 2: Add 4 topics to topics.ts

**Files:**
- Modify: `src/data/topics.ts`

Insert the following 4 topic blocks immediately before the `// ─── Git ───` comment (around line 4903). Add them after the closing `},` of the `react-context` topic.

- [x] **Step 1: Add react-router-advanced topic**

```typescript
  // ─── React Ecosystem ──────────────────────────────────────────────────────
  {
    id: 'react-router-advanced',
    title: 'React Router as a Framework',
    description: 'Go beyond the library — use React Router v7\'s framework mode with route modules, loaders, and actions for full-stack data handling',
    category: 'react-ecosystem',
    color: '#38bdf8',
    estimatedMinutes: 14,
    animationComponent: undefined,
    bannerComponent: 'RouterAdvancedBanner',
    playgroundType: 'monaco',
    nextTopicId: 'react-data-fetching',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            icon: '🔄',
            heading: 'Library vs Framework mode',
            text: 'React Router started as a client-side routing library. In v7, it can also run as a full framework — handling file-based routes, server-side rendering, and data loading out of the box. In library mode you configure <BrowserRouter> yourself; in framework mode you scaffold with create-react-router and React Router owns the entry point.',
            codeExample: `// Library mode — you manage everything:\nimport { BrowserRouter, Routes, Route } from 'react-router'\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/about" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  )\n}\n\n// Framework mode — scaffold once, React Router takes over:\n// npx create-react-router@latest my-app\n// → generates: app/root.tsx, app/routes.ts, react-router.config.js`,
            language: 'jsx',
          },
          {
            animationStep: 1,
            icon: '📁',
            heading: 'routes.js config',
            text: 'Framework mode uses a routes.js file to declare your route tree. The index() helper declares the index route; route() declares named routes with a URL pattern and a file path to the route module.',
            codeExample: `// app/routes.js\nimport { index, route } from '@react-router/dev/routes'\n\nexport default [\n  index('routes/home.jsx'),\n  route('/about',         'routes/about.jsx'),\n  route('/products/:pid', 'routes/product.jsx'),\n  route('/todos',         'routes/todos.jsx'),\n]`,
            language: 'javascript',
          },
          {
            animationStep: 2,
            icon: '📦',
            heading: 'Route modules',
            text: 'A route module is a file that exports named functions React Router understands: default (the component), loader/clientLoader (data fetching), action/clientAction (mutations), and ErrorBoundary (error UI). React Router wires these automatically — no manual prop passing needed.',
            codeExample: `// app/routes/product.jsx\n\nexport async function clientLoader({ params }) {\n  const res = await fetch(\`/api/products/\${params.pid}\`)\n  return res.json()   // becomes loaderData\n}\n\nexport function HydrateFallback() {\n  return <div>Loading...</div>\n}\n\nexport default function Product({ loaderData }) {\n  return <h1>{loaderData.name}</h1>\n}\n\nexport function ErrorBoundary() {\n  return <div>Something went wrong.</div>\n}`,
            language: 'jsx',
          },
          {
            animationStep: 3,
            icon: '🌐',
            heading: 'clientLoader — CSR data loading',
            text: 'clientLoader fetches data in the browser before the component renders. It receives { params } for URL parameters. Export HydrateFallback to show a loading UI while it runs on the first visit.',
            codeExample: `export async function clientLoader({ params }) {\n  const res = await fetch(\`https://api.example.com/products/\${params.pid}\`)\n  return res.json()   // becomes loaderData prop\n}\n\nexport function HydrateFallback() {\n  return <p>Loading product...</p>\n}\n\nexport default function Product({ loaderData }) {\n  return (\n    <main>\n      <h1>{loaderData.name}</h1>\n      <p>{loaderData.description}</p>\n      <strong>\${loaderData.price}</strong>\n    </main>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 4,
            icon: '🖥️',
            heading: 'loader — SSR data loading',
            text: 'loader runs on the server — before the HTML is sent to the browser. It can safely access databases or server-only APIs without exposing them to the client bundle. On client-side navigations React Router calls it via a network request. The component receives the same loaderData prop — no changes needed.',
            codeExample: `// Replace clientLoader with loader — component stays identical:\nexport async function loader({ params }) {\n  const res = await fetch(\`https://api.example.com/products/\${params.pid}\`)\n  return res.json()   // runs on server — never in the browser bundle\n}\n\nexport default function Product({ loaderData }) {\n  return <h1>{loaderData.name}</h1>  // same as before\n}\n\n// 💡 Check the Network tab: no API request visible!\n//    The server fetched data and embedded it in the HTML.`,
            language: 'jsx',
          },
          {
            animationStep: 5,
            icon: '📤',
            heading: 'Form & actions',
            text: 'clientAction / action handle form mutations. React Router\'s <Form> component serialises the submission and calls the matching action. The result is available as actionData. After the action runs, loaders automatically revalidate — no manual refetch.',
            codeExample: `import { Form } from 'react-router'\n\nexport async function clientAction({ request }) {\n  const formData = await request.formData()\n  const title = formData.get('title')\n  await saveTodo(title)\n  return { success: true }\n}\n\nexport default function Todos({ actionData }) {\n  return (\n    <div>\n      <Form method="post">  {/* React Router's Form — not native <form> */}\n        <input name="title" placeholder="New todo" />\n        <button type="submit">Add</button>\n      </Form>\n      {actionData?.success && <p>Todo added!</p>}\n    </div>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 6,
            icon: '🗂️',
            heading: 'Rendering strategies',
            text: 'React Router v7 supports three rendering strategies configured in react-router.config.js. CSR (SPA mode) renders everything in the browser; SSR renders HTML on every server request; SSG pre-renders pages at build time. Your choice determines when loaders run.',
            codeExample: `// react-router.config.js\n\n// CSR — SPA mode, all loaders run in browser:\nexport default { ssr: false }\n\n// SSR — server renders on every request (default):\nexport default { ssr: true }\n\n// SSG — pre-render specific routes at build time:\nexport default {\n  ssr: true,\n  async prerender() {\n    return ['/', '/about', '/products/1', '/products/2']\n  }\n}\n\n// Strategy | Loader runs…           | Data available…\n// CSR      | In the browser         | After React mounts\n// SSR      | On the server          | Before HTML is sent\n// SSG      | At build time (server) | Embedded in HTML`,
            language: 'javascript',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'routes.js entry', code: 'route(\'/path\', \'routes/file.jsx\')', note: 'Maps URL pattern to route module file' },
        { label: 'clientLoader', code: 'export async function clientLoader({ params }) {\n  return fetch(`/api/items/${params.id}`).then(r => r.json())\n}', note: 'Runs in browser — result becomes loaderData prop' },
        { label: 'loader (SSR)', code: 'export async function loader({ params }) {\n  return fetchFromDB(params.id)  // server-only safe\n}', note: 'Runs on server — not included in client bundle' },
        { label: 'HydrateFallback', code: 'export function HydrateFallback() { return <div>Loading…</div> }', note: 'Shown while clientLoader runs on first visit' },
        { label: 'clientAction', code: 'export async function clientAction({ request }) {\n  const fd = await request.formData()\n  return saveItem(fd.get(\'title\'))\n}', note: 'Handles form submissions in the browser' },
        { label: 'Form (React Router)', code: '<Form method="post">\n  <input name="title" />\n  <button type="submit">Save</button>\n</Form>', note: 'Use React Router\'s Form — not native <form>' },
        { label: 'useLoaderData', code: 'const data = useLoaderData()', note: 'Alternative to loaderData prop for nested components' },
      ],
      patterns: [
        { title: 'Route module with loader + error boundary', code: 'export async function clientLoader({ params }) {\n  const res = await fetch(`/api/posts/${params.id}`)\n  if (!res.ok) throw new Error(\'Post not found\')\n  return res.json()\n}\n\nexport function ErrorBoundary() {\n  return <div>Could not load post.</div>\n}\n\nexport default function Post({ loaderData }) {\n  return <article><h1>{loaderData.title}</h1></article>\n}', language: 'jsx' },
      ],
      whenToUse: 'Use framework mode when you want SSR, SSG, or co-located data loading without setting up your own server. Stick to library mode for pure SPAs where a Vite + BrowserRouter setup is already working well.',
      commonMistakes: [
        'Using native <form> instead of React Router\'s <Form> — the action function will not be called',
        'Accessing server-only resources in clientLoader — they will be bundled into the browser JavaScript',
        'Forgetting that after an action runs, loaders automatically revalidate — do not manually refetch',
      ],
    },
  },
```

- [x] **Step 2: Add react-data-fetching topic**

Append immediately after the react-router-advanced closing `},`:

```typescript
  {
    id: 'react-data-fetching',
    title: 'Data Fetching Strategies',
    description: 'Understand the fetch-on-render waterfall and how render-as-you-fetch with Suspense eliminates it',
    category: 'react-ecosystem',
    color: '#34d399',
    estimatedMinutes: 10,
    animationComponent: undefined,
    bannerComponent: 'DataFetchingBanner',
    playgroundType: 'monaco',
    nextTopicId: 'react-mutations',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            icon: '🌊',
            heading: 'The waterfall problem',
            text: 'When a parent component fetches data and only renders a child after its data arrives, and that child fetches its own data, you get a waterfall — each request waits for the previous one. Total wait time equals the sum of all requests, not the longest.',
            codeExample: `// 🌊 Waterfall: each request waits for the previous one\n\n// t=0ms    → App renders, fetches posts\n// t=500ms  → posts arrive, PostList renders\n// t=500ms  → PostList fetches comments\n// t=1000ms → comments arrive, Comments renders\n// t=1000ms → Comments fetches likes\n// t=1500ms → likes arrive — user sees full page\n\n// 3 × 500ms = 1500ms total wait\n\n// With parallel fetches:\n// t=0ms    → fetch posts + comments + likes simultaneously\n// t=500ms  → all arrive — user sees full page (3× faster)`,
            language: 'javascript',
          },
          {
            animationStep: 1,
            icon: '🔁',
            heading: 'Fetch-on-render (useEffect pattern)',
            text: 'The classic pattern puts fetching inside useEffect. The component renders first with a spinner, then the effect fires, then state updates cause a re-render with data. Easy to understand but forces sequential rendering: a child cannot start fetching until its parent has finished and rendered it.',
            codeExample: `function Post({ id }) {\n  const [post, setPost]       = useState(null)\n  const [loading, setLoading] = useState(true)\n\n  useEffect(() => {\n    fetch(\`/api/posts/\${id}\`)\n      .then(r => r.json())\n      .then(data => { setPost(data); setLoading(false) })\n  }, [id])\n\n  if (loading) return <Spinner />\n\n  // Only after post loads does Comments mount and start fetching:\n  return (\n    <article>\n      <h1>{post.title}</h1>\n      <Comments postId={id} />  {/* 🌊 cascade starts here */}\n    </article>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 2,
            icon: '⚡',
            heading: 'Render-as-you-fetch',
            text: 'Render-as-you-fetch starts all fetches before the component tree renders — then renders components that suspend until their data arrives. Fetches run in parallel so total time equals the slowest single request. The key: initiate fetches at navigation time, not at render time.',
            codeExample: `// ⚡ Start both fetches immediately — store the promises, don't await:\nconst postPromise     = fetchPost(id)\nconst commentsPromise = fetchComments(id)\n\n// Both requests fire at t=0ms and run in parallel.\n// Pass promises to child components:\nfunction Page() {\n  return (\n    <>\n      <Suspense fallback={<Spinner />}>\n        <Post promise={postPromise} />\n      </Suspense>\n      <Suspense fallback={<Spinner />}>\n        <Comments promise={commentsPromise} />\n      </Suspense>\n    </>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 3,
            icon: '🎯',
            heading: 'Suspense + use()',
            text: 'React\'s use() hook unwraps a promise inside a component. If the promise is not resolved yet, the component suspends and React shows the nearest <Suspense> fallback. Once resolved, the component renders with the data. ErrorBoundary catches rejections — no try/catch needed.',
            codeExample: `import { use, Suspense } from 'react'\n\nfunction Post({ promise }) {\n  const post = use(promise)  // suspends until promise resolves\n  return <h1>{post.title}</h1>\n}\n\nfunction Comments({ promise }) {\n  const comments = use(promise)\n  return <ul>{comments.map(c => <li key={c.id}>{c.body}</li>)}</ul>\n}\n\n// Both render independently — neither blocks the other:\n<ErrorBoundary fallback={<Error />}>\n  <Suspense fallback={<Spinner />}><Post promise={postP} /></Suspense>\n  <Suspense fallback={<Spinner />}><Comments promise={commP} /></Suspense>\n</ErrorBoundary>`,
            language: 'jsx',
          },
          {
            animationStep: 4,
            icon: '🛣️',
            heading: 'Loaders as the solution',
            text: 'The cleanest render-as-you-fetch implementation delegates fetching to your router. React Router\'s loader runs the moment a navigation starts — before any component renders. You get parallel fetching without manually managing promises or caches in your components.',
            codeExample: `// React Router data mode — loader fires at navigation time:\nexport async function loader({ params }) {\n  // Both fetches start in parallel — neither is awaited:\n  const post     = fetchPost(params.id)\n  const comments = fetchComments(params.id)\n  return { post, comments }  // return the promises\n}\n\nexport default function PostPage({ loaderData }) {\n  const { post, comments } = loaderData\n  return (\n    <>\n      <Suspense fallback={<Spinner />}>\n        <Post promise={post} />\n      </Suspense>\n      <Suspense fallback={<Spinner />}>\n        <Comments promise={comments} />\n      </Suspense>\n    </>\n  )\n}`,
            language: 'jsx',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'use() hook', code: 'const data = use(promise)', note: 'Suspends component until promise resolves; rejections caught by ErrorBoundary' },
        { label: 'Suspense boundary', code: '<Suspense fallback={<Spinner />}>\n  <ComponentThatCallsUse />\n</Suspense>', note: 'Shows fallback while any child is suspended' },
        { label: 'Parallel fetch initiation', code: 'const postP     = fetchPost(id)     // start — do NOT await\nconst commentsP = fetchComments(id)  // start — do NOT await', note: 'Both run simultaneously — total time = slowest request' },
      ],
      patterns: [
        { title: 'Render-as-you-fetch with use()', code: 'function Page({ id }) {\n  const postP     = fetchPost(id)\n  const commentsP = fetchComments(id)\n  return (\n    <ErrorBoundary fallback={<Error />}>\n      <Suspense fallback={<Spinner />}>\n        <Post promise={postP} />\n      </Suspense>\n      <Suspense fallback={<Spinner />}>\n        <Comments promise={commentsP} />\n      </Suspense>\n    </ErrorBoundary>\n  )\n}', language: 'jsx' },
      ],
      whenToUse: 'Fetch-on-render is fine for simple cases with a single data dependency. Switch to render-as-you-fetch when you have parallel data requirements or deeply nested components that create visible loading cascades.',
      commonMistakes: [
        'Awaiting promises before passing to Suspense — the component never suspends because data is already resolved before use() is called',
        'Fetching inside the render function without useEffect — triggers an infinite loop because each setState re-render fires the fetch again',
        'One Suspense boundary for independent data slices — one slow request blocks all; use separate boundaries per slice',
      ],
    },
  },
```

- [x] **Step 3: Add react-mutations topic**

```typescript
  {
    id: 'react-mutations',
    title: 'Data Mutations',
    description: 'Send data back to the server — from classic onSubmit patterns to React 19 form actions and useFormStatus',
    category: 'react-ecosystem',
    color: '#f97316',
    estimatedMinutes: 12,
    animationComponent: undefined,
    bannerComponent: 'MutationsBanner',
    playgroundType: 'monaco',
    nextTopicId: 'react-tanstack-query',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            icon: '📝',
            heading: 'onSubmit + preventDefault',
            text: 'The classic React form pattern intercepts the native submit event, calls preventDefault() to stop the page from reloading, then manually sends data with fetch. You manage loading, error, and success state yourself with useState.',
            codeExample: `function ContactForm() {\n  const [loading, setLoading] = useState(false)\n  const [error, setError]     = useState(null)\n\n  async function handleSubmit(e) {\n    e.preventDefault()      // stop page reload\n    setLoading(true)\n    try {\n      const form = new FormData(e.target)\n      await fetch('/api/contact', {\n        method: 'POST',\n        body:    JSON.stringify({ email: form.get('email') }),\n        headers: { 'Content-Type': 'application/json' },\n      })\n    } catch (err) {\n      setError(err.message)\n    } finally {\n      setLoading(false)\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name="email" type="email" />\n      <button disabled={loading}>Send</button>\n      {error && <p className="text-red-500">{error}</p>}\n    </form>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 1,
            icon: '⚡',
            heading: 'Form actions (React 19)',
            text: 'React 19 introduces the action prop on <form>. Pass an async function directly — React calls it with a FormData object when the form submits. No onSubmit, no preventDefault. The function is the action; the form is the trigger.',
            codeExample: `// React 19 — pass an async function to action:\nasync function submitContact(formData) {\n  const email = formData.get('email')\n  await fetch('/api/contact', {\n    method: 'POST',\n    body:    JSON.stringify({ email }),\n    headers: { 'Content-Type': 'application/json' },\n  })\n}\n\nfunction ContactForm() {\n  return (\n    <form action={submitContact}>  {/* action, not onSubmit */}\n      <input name="email" type="email" />\n      <button type="submit">Send</button>\n    </form>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 2,
            icon: '📋',
            heading: 'FormData',
            text: 'FormData is the browser\'s built-in way to collect form field values. Each input\'s name attribute becomes a key. formData.get() retrieves a single value; formData.getAll() retrieves multiple values for checkboxes and multi-select inputs.',
            codeExample: `async function handleSignup(formData) {\n  // Single values:\n  const name  = formData.get('name')   // 'Ana'\n  const email = formData.get('email')  // 'ana@example.com'\n  const role  = formData.get('role')   // 'developer'\n\n  // Multiple values (checkboxes, multi-select):\n  const tags = formData.getAll('tags') // ['react', 'typescript']\n\n  await createUser({ name, email, role, tags })\n}\n\nfunction SignupForm() {\n  return (\n    <form action={handleSignup}>\n      <input name="name" />\n      <input name="email" type="email" />\n      <input type="checkbox" name="tags" value="react" />\n      <input type="checkbox" name="tags" value="typescript" />\n      <button type="submit">Sign up</button>\n    </form>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 3,
            icon: '⏳',
            heading: 'useFormStatus — pending state',
            text: 'useFormStatus() from react-dom reads the pending state of the nearest parent form action. Use it inside a submit button component to disable the button while the action runs. The component must be inside the form — it reads context, not props.',
            codeExample: `import { useFormStatus } from 'react-dom'\n\n// Must be a separate component INSIDE the form:\nfunction SubmitButton() {\n  const { pending } = useFormStatus()\n  return (\n    <button type="submit" disabled={pending}>\n      {pending ? 'Saving…' : 'Save'}\n    </button>\n  )\n}\n\nfunction ContactForm() {\n  return (\n    <form action={submitContact}>\n      <input name="email" type="email" />\n      <SubmitButton />  {/* inside the form — can read pending state */}\n    </form>\n  )\n}\n\n// ❌ Wrong — useFormStatus outside the form always returns pending: false:\n// function ContactForm() {\n//   const { pending } = useFormStatus()  // doesn't work here`,
            language: 'jsx',
          },
          {
            animationStep: 4,
            icon: '❌',
            heading: 'Error boundaries for forms',
            text: 'If a form action throws, wrapping the form in an ErrorBoundary (from react-error-boundary) catches the error and renders a fallback. The fallback receives resetErrorBoundary to let the user retry. Best for unexpected server failures — not per-field validation.',
            codeExample: `import { ErrorBoundary } from 'react-error-boundary'\n\nfunction FormError({ error, resetErrorBoundary }) {\n  return (\n    <div role="alert">\n      <p>Something went wrong: {error.message}</p>\n      <button onClick={resetErrorBoundary}>Try again</button>\n    </div>\n  )\n}\n\nfunction ContactPage() {\n  return (\n    <ErrorBoundary FallbackComponent={FormError}>\n      <ContactForm />\n    </ErrorBoundary>\n  )\n}\n\nasync function submitContact(formData) {\n  const res = await fetch('/api/contact', { method: 'POST', body: formData })\n  if (!res.ok) throw new Error('Server error — please try again')\n}`,
            language: 'jsx',
          },
          {
            animationStep: 5,
            icon: '🎛️',
            heading: 'useActionState',
            text: 'useActionState(action, initialState) wraps a form action and returns the latest result as state — perfect for per-field validation errors. Your action receives (previousState, formData) and returns the new state (e.g. { errors: { email: \'Required\' } }).',
            codeExample: `import { useActionState } from 'react'\n\nasync function signupAction(previousState, formData) {\n  const email = formData.get('email')\n  if (!email) return { errors: { email: 'Email is required' } }\n  await createUser({ email })\n  return { errors: {}, success: true }\n}\n\nfunction SignupForm() {\n  const [state, action] = useActionState(signupAction, { errors: {} })\n\n  return (\n    <form action={action}>\n      <input name="email" type="email" />\n      {state.errors.email && (\n        <p className="text-red-500">{state.errors.email}</p>\n      )}\n      <SubmitButton />\n      {state.success && <p>Account created!</p>}\n    </form>\n  )\n}`,
            language: 'jsx',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'form action (React 19)', code: '<form action={asyncFn}>', note: 'asyncFn receives FormData — no onSubmit / preventDefault needed' },
        { label: 'formData.get()', code: 'const value = formData.get(\'fieldName\')', note: 'Returns the value of the named input' },
        { label: 'formData.getAll()', code: 'const values = formData.getAll(\'tags\')', note: 'Returns array — for checkboxes and multi-select' },
        { label: 'useFormStatus', code: 'const { pending } = useFormStatus()', note: 'Must be inside a child component of the form' },
        { label: 'useActionState', code: 'const [state, action] = useActionState(fn, initialState)', note: 'fn signature: async (previousState, formData) => newState' },
      ],
      patterns: [
        { title: 'Form with validation via useActionState', code: 'async function loginAction(prev, formData) {\n  const email    = formData.get(\'email\')\n  const password = formData.get(\'password\')\n  const errors = {}\n  if (!email)    errors.email    = \'Required\'\n  if (!password) errors.password = \'Required\'\n  if (Object.keys(errors).length) return { errors }\n  await signIn(email, password)\n  return { errors: {}, success: true }\n}\n\nfunction LoginForm() {\n  const [state, action] = useActionState(loginAction, { errors: {} })\n  return (\n    <form action={action}>\n      <input name="email" />\n      {state.errors.email && <p>{state.errors.email}</p>}\n      <input name="password" type="password" />\n      {state.errors.password && <p>{state.errors.password}</p>}\n      <SubmitButton />\n    </form>\n  )\n}', language: 'jsx' },
      ],
      whenToUse: 'Use form actions for any form that mutates data. Add useFormStatus for pending UI. Add useActionState when you need per-field error messages. Fall back to onSubmit only in environments that do not support React 19.',
      commonMistakes: [
        'Calling useFormStatus outside the form — it always returns pending: false; it must be inside a descendant component of the form',
        'Forgetting the previousState argument in the action when using useActionState — the signature is (previousState, formData), not just (formData)',
        'Using ErrorBoundary for expected validation errors — use useActionState for per-field feedback and ErrorBoundary only for unexpected failures',
      ],
    },
  },
```

- [x] **Step 4: Add react-tanstack-query topic**

```typescript
  {
    id: 'react-tanstack-query',
    title: 'TanStack Query',
    description: 'Add smart client-side caching to your React app — stale-while-revalidate, background refetch, and mutations without the boilerplate',
    category: 'react-ecosystem',
    color: '#f43f5e',
    estimatedMinutes: 12,
    animationComponent: undefined,
    bannerComponent: 'TanStackQueryBanner',
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
            icon: '💾',
            heading: 'The caching problem',
            text: 'Every time a user navigates back to a route, a plain useEffect fetch fires again — even if the data has not changed. This wastes network requests, causes loading flickers, and makes apps feel slow. Client-side caching stores fetch results keyed by query, so subsequent visits are instant.',
            codeExample: `// Without caching — every navigation triggers a new request:\n// User visits /posts      → fetches posts (500ms)\n// User visits /posts/1    → fetches post (500ms)\n// User goes back to /posts → fetches posts AGAIN (500ms) 😩\n\n// With TanStack Query — cached results returned instantly:\n// User visits /posts      → fetches posts, stores in cache\n// User visits /posts/1    → fetches post\n// User goes back to /posts → returns cached posts instantly ⚡\n//                           (refetches in background if stale)`,
            language: 'javascript',
          },
          {
            animationStep: 1,
            icon: '🏷️',
            heading: 'Stale vs fresh data',
            text: 'TanStack Query tracks whether cached data is "fresh" (recently fetched — serve as-is) or "stale" (old enough that a background refetch should happen). staleTime controls the window — 0 means always stale, Infinity means never auto-refetch. Default is 0.',
            codeExample: `import { QueryClient, QueryClientProvider } from '@tanstack/react-query'\n\nconst queryClient = new QueryClient({\n  defaultOptions: {\n    queries: {\n      staleTime: 60_000,  // data stays fresh for 60 seconds globally\n    },\n  },\n})\n\n// Override per query:\nuseQuery({\n  queryKey: ['user', userId],\n  queryFn:  () => fetchUser(userId),\n  staleTime: Infinity,   // user profile — rarely changes\n})\n\nuseQuery({\n  queryKey: ['feed'],\n  queryFn:  fetchFeed,\n  staleTime: 10_000,     // news feed — refresh every 10 seconds\n})`,
            language: 'javascript',
          },
          {
            animationStep: 2,
            icon: '🔍',
            heading: 'useQuery',
            text: 'useQuery({ queryKey, queryFn }) fetches and caches data. queryKey is an array that uniquely identifies the query — include all variables the result depends on. queryFn is the async function. Returns { data, isLoading, isError, error }.',
            codeExample: `import { useQuery } from '@tanstack/react-query'\n\nfunction Post({ id }) {\n  const { data: post, isLoading, isError, error } = useQuery({\n    queryKey: ['post', id],         // id is part of key — different ids = different cache entries\n    queryFn:  () => fetchPost(id),  // async function\n  })\n\n  if (isLoading) return <Spinner />\n  if (isError)   return <p>Error: {error.message}</p>\n\n  return (\n    <article>\n      <h1>{post.title}</h1>\n      <p>{post.body}</p>\n    </article>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 3,
            icon: '🔄',
            heading: 'Background refetch',
            text: 'When a stale query mounts again, TanStack Query shows the cached data immediately and refetches in the background. If new data arrives, the UI updates automatically. Users see content instantly — no spinner on return visits.',
            codeExample: `// TanStack Query refetches stale data automatically:\n// - On component mount (if stale)\n// - On window focus (refetchOnWindowFocus: true by default)\n// - On network reconnection\n// - On a timer (refetchInterval)\n\nuseQuery({\n  queryKey: ['notifications'],\n  queryFn:  fetchNotifications,\n  refetchInterval: 30_000,    // poll every 30 seconds\n})\n\n// Show a subtle indicator during background refetch:\nfunction Posts() {\n  const { data, isFetching } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts })\n  return (\n    <div>\n      {isFetching && <span className="text-sm opacity-50">Refreshing…</span>}\n      {data?.map(p => <PostCard key={p.id} post={p} />)}\n    </div>\n  )\n}`,
            language: 'javascript',
          },
          {
            animationStep: 4,
            icon: '✏️',
            heading: 'useMutation',
            text: 'useMutation({ mutationFn }) handles write operations. Call mutate(variables) to trigger it. Use onSuccess to invalidate related queries — queryClient.invalidateQueries() marks matching queries stale and triggers a refetch, keeping the UI in sync with the server.',
            codeExample: `import { useMutation, useQueryClient } from '@tanstack/react-query'\n\nfunction NewPostForm() {\n  const queryClient = useQueryClient()\n\n  const { mutate, isPending } = useMutation({\n    mutationFn: (postData) => createPost(postData),\n    onSuccess: () => {\n      // Invalidate posts list so it refetches with the new post:\n      queryClient.invalidateQueries({ queryKey: ['posts'] })\n    },\n  })\n\n  function handleSubmit(e) {\n    e.preventDefault()\n    const form = new FormData(e.target)\n    mutate({ title: form.get('title'), body: form.get('body') })\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name="title" />\n      <textarea name="body" />\n      <button disabled={isPending}>\n        {isPending ? 'Saving…' : 'Publish'}\n      </button>\n    </form>\n  )\n}`,
            language: 'jsx',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'QueryClientProvider', code: '<QueryClientProvider client={queryClient}>\n  <App />\n</QueryClientProvider>', note: 'Wraps the app — add in main.tsx / index.tsx' },
        { label: 'useQuery', code: 'const { data, isLoading, isError } = useQuery({\n  queryKey: [\'items\', id],\n  queryFn:  () => fetchItem(id),\n})', note: 'Include all variables that affect the result in queryKey' },
        { label: 'useMutation', code: 'const { mutate, isPending } = useMutation({\n  mutationFn: createItem,\n  onSuccess: () => queryClient.invalidateQueries({ queryKey: [\'items\'] }),\n})', note: 'Call mutate(vars) to fire; invalidateQueries keeps cache in sync' },
        { label: 'useQueryClient', code: 'const queryClient = useQueryClient()', note: 'Access the QueryClient inside components' },
        { label: 'invalidateQueries', code: 'queryClient.invalidateQueries({ queryKey: [\'posts\'] })', note: 'Marks matching queries stale and triggers a refetch' },
      ],
      patterns: [
        { title: 'QueryClient setup in main.tsx', code: 'import { QueryClient, QueryClientProvider } from \'@tanstack/react-query\'\n\nconst queryClient = new QueryClient({\n  defaultOptions: { queries: { staleTime: 60_000 } },\n})\n\nReactDOM.createRoot(document.getElementById(\'root\')!).render(\n  <QueryClientProvider client={queryClient}>\n    <App />\n  </QueryClientProvider>\n)', language: 'tsx' },
      ],
      whenToUse: 'Add TanStack Query when your app navigates between routes that share data, when you want background refetch without writing polling logic, or when you need a clean mutation + cache-invalidation pattern. Skip it for single-page apps with one data source that is always fresh.',
      commonMistakes: [
        'Not including variables in queryKey — different ids sharing the same key cause cache collisions and return wrong cached results',
        'Forgetting to invalidate queries after a mutation — the UI shows stale data until the next natural refetch',
        'Setting staleTime: Infinity globally and then wondering why data never updates when it changes on the server',
      ],
    },
  },
```

- [x] **Step 5: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [x] **Step 6: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add 4 react-ecosystem topics to topics.ts"
```

---

## Chunk 2: Locale Files

### Task 3: Add EN locale for all 4 topics

**Files:**
- Modify: `src/i18n/locales/en/topics-other.json`

Add the following entries to the JSON object (before the closing `}`). Each entry has `title`, `description`, and `steps` (animationStep + heading + text only — no icon or codeExample).

- [x] **Step 1: Add react-router-advanced EN locale**

```json
  "react-router-advanced": {
    "title": "React Router as a Framework",
    "description": "Go beyond the library — use React Router v7's framework mode with route modules, loaders, and actions for full-stack data handling",
    "steps": [
      { "animationStep": 0, "heading": "Library vs Framework mode", "text": "React Router started as a client-side routing library. In v7, it can also run as a full framework — handling file-based routes, server-side rendering, and data loading out of the box. In library mode you configure BrowserRouter yourself; in framework mode you scaffold with create-react-router and React Router owns the entry point." },
      { "animationStep": 1, "heading": "routes.js config", "text": "Framework mode uses a routes.js file to declare your route tree. The index() helper declares the index route; route() declares named routes with a URL pattern and a file path to the route module." },
      { "animationStep": 2, "heading": "Route modules", "text": "A route module is a file that exports named functions React Router understands: default (the component), loader/clientLoader (data fetching), action/clientAction (mutations), and ErrorBoundary (error UI). React Router wires these automatically — no manual prop passing needed." },
      { "animationStep": 3, "heading": "clientLoader — CSR data loading", "text": "clientLoader fetches data in the browser before the component renders. It receives { params } for URL parameters. Export HydrateFallback to show a loading UI while it runs on the first visit." },
      { "animationStep": 4, "heading": "loader — SSR data loading", "text": "loader runs on the server — before the HTML is sent to the browser. It can safely access databases or server-only APIs without exposing them to the client bundle. The component receives the same loaderData prop — no changes needed." },
      { "animationStep": 5, "heading": "Form & actions", "text": "clientAction and action handle form mutations. React Router's Form component serialises the submission and calls the matching action. The result is available as actionData. After the action runs, loaders automatically revalidate — no manual refetch." },
      { "animationStep": 6, "heading": "Rendering strategies", "text": "React Router v7 supports three rendering strategies in react-router.config.js. CSR (SPA mode) renders everything in the browser; SSR renders HTML on every server request; SSG pre-renders pages at build time. Your choice determines when loaders run." }
    ]
  },
  "react-data-fetching": {
    "title": "Data Fetching Strategies",
    "description": "Understand the fetch-on-render waterfall and how render-as-you-fetch with Suspense eliminates it",
    "steps": [
      { "animationStep": 0, "heading": "The waterfall problem", "text": "When a parent component fetches data and only renders a child after its data arrives, and that child fetches its own data, you get a waterfall — each request waits for the previous one. Total wait time equals the sum of all requests." },
      { "animationStep": 1, "heading": "Fetch-on-render (useEffect pattern)", "text": "The classic pattern puts fetching inside useEffect. The component renders first with a spinner, then the effect fires, then state updates cause a re-render with data. It forces sequential rendering: a child cannot start fetching until its parent has finished and rendered it." },
      { "animationStep": 2, "heading": "Render-as-you-fetch", "text": "Render-as-you-fetch starts all fetches before the component tree renders — then renders components that suspend until their data arrives. Fetches run in parallel so total time equals the slowest single request, not the sum." },
      { "animationStep": 3, "heading": "Suspense + use()", "text": "React's use() hook unwraps a promise inside a component. If the promise is not resolved yet, the component suspends and React shows the nearest Suspense fallback. Once resolved, the component renders with the data. ErrorBoundary catches rejections." },
      { "animationStep": 4, "heading": "Loaders as the solution", "text": "The cleanest render-as-you-fetch implementation delegates fetching to your router. React Router's loader runs the moment a navigation starts — before any component renders — and returns the data the route needs. No useEffect, no manual promise management." }
    ]
  },
  "react-mutations": {
    "title": "Data Mutations",
    "description": "Send data back to the server — from classic onSubmit patterns to React 19 form actions and useFormStatus",
    "steps": [
      { "animationStep": 0, "heading": "onSubmit + preventDefault", "text": "The classic React form pattern intercepts the native submit event, calls preventDefault() to stop the page from reloading, then manually sends the data with fetch. You manage loading, error, and success state yourself with useState." },
      { "animationStep": 1, "heading": "Form actions (React 19)", "text": "React 19 introduces the action prop on form elements. Pass an async function directly — React calls it with a FormData object when the form submits. No onSubmit, no preventDefault needed." },
      { "animationStep": 2, "heading": "FormData", "text": "FormData is the browser's built-in way to collect form field values. Each input's name attribute becomes a key. formData.get() retrieves a single value; formData.getAll() retrieves multiple values for checkboxes and multi-select inputs." },
      { "animationStep": 3, "heading": "useFormStatus — pending state", "text": "useFormStatus() from react-dom reads the pending state of the nearest parent form action. Use it inside a submit button component to disable the button while the action runs. The component must be inside the form — it reads context, not props." },
      { "animationStep": 4, "heading": "Error boundaries for forms", "text": "If a form action throws, wrapping the form in an ErrorBoundary catches the error and renders a fallback UI. The fallback receives resetErrorBoundary so the user can retry. Best for unexpected server failures — not per-field validation." },
      { "animationStep": 5, "heading": "useActionState", "text": "useActionState(action, initialState) wraps a form action and returns the latest result as state — perfect for per-field validation errors. Your action receives (previousState, formData) and returns the new state with validation errors or a success flag." }
    ]
  },
  "react-tanstack-query": {
    "title": "TanStack Query",
    "description": "Add smart client-side caching to your React app — stale-while-revalidate, background refetch, and mutations without the boilerplate",
    "steps": [
      { "animationStep": 0, "heading": "The caching problem", "text": "Every time a user navigates back to a route, a plain useEffect fetch fires again — even if the data has not changed. Client-side caching stores fetch results keyed by query, so subsequent visits are instant and the network is only hit when data is stale." },
      { "animationStep": 1, "heading": "Stale vs fresh data", "text": "TanStack Query tracks whether cached data is fresh (recently fetched — serve as-is) or stale (old enough that a background refetch should happen). staleTime controls the window — 0 means always stale, Infinity means never auto-refetch. Default is 0." },
      { "animationStep": 2, "heading": "useQuery", "text": "useQuery takes a queryKey and a queryFn. queryKey is an array that uniquely identifies the query — include all variables the fetch depends on. queryFn is the async function. Returns data, isLoading, isError, and error." },
      { "animationStep": 3, "heading": "Background refetch", "text": "When a stale query mounts again, TanStack Query shows the cached data immediately and refetches in the background. If new data arrives, the UI updates automatically. Users see content instantly on return visits — no full spinner." },
      { "animationStep": 4, "heading": "useMutation", "text": "useMutation handles write operations. Call mutate with your variables to trigger it. Use onSuccess to invalidate related queries — queryClient.invalidateQueries() marks matching queries stale and triggers a refetch, keeping the UI in sync after mutations." }
    ]
  }
```

- [x] **Step 2: Validate JSON**

```bash
python3 -c "import json; json.load(open('src/i18n/locales/en/topics-other.json')); print('valid')"
```
Expected: `valid`

- [x] **Step 3: Commit**

```bash
git add src/i18n/locales/en/topics-other.json
git commit -m "feat: add EN locale for 4 react-ecosystem topics"
```

---

### Task 4: Add DE locale for all 4 topics

**Files:**
- Modify: `src/i18n/locales/de/topics-other.json`

- [x] **Step 1: Add DE locale entries**

```json
  "react-router-advanced": {
    "title": "React Router als Framework",
    "description": "Über die Bibliothek hinaus — React Router v7 im Framework-Modus mit Route-Modulen, Loadern und Actions",
    "steps": [
      { "animationStep": 0, "heading": "Bibliothek vs. Framework-Modus", "text": "React Router begann als clientseitige Routing-Bibliothek. In v7 kann es auch als vollständiges Framework betrieben werden — mit dateibasiertem Routing, serverseitigem Rendering und integriertem Datenladen. Im Bibliotheksmodus konfigurierst du BrowserRouter selbst; im Framework-Modus übernimmt React Router den Einstiegspunkt." },
      { "animationStep": 1, "heading": "routes.js Konfiguration", "text": "Der Framework-Modus verwendet eine routes.js-Datei zur Deklaration der Route-Struktur. Der index()-Helfer deklariert die Index-Route; route() deklariert benannte Routen mit URL-Muster und Dateipfad zum Route-Modul." },
      { "animationStep": 2, "heading": "Route-Module", "text": "Ein Route-Modul exportiert benannte Funktionen, die React Router kennt: default (die Komponente), loader/clientLoader (Datenabruf), action/clientAction (Mutationen) und ErrorBoundary (Fehler-UI). React Router verbindet diese automatisch." },
      { "animationStep": 3, "heading": "clientLoader — CSR-Datenladen", "text": "clientLoader lädt Daten im Browser, bevor die Komponente rendert. Er empfängt { params } für URL-Parameter. Exportiere HydrateFallback, um eine Lade-UI beim ersten Besuch anzuzeigen." },
      { "animationStep": 4, "heading": "loader — SSR-Datenladen", "text": "loader wird auf dem Server ausgeführt — bevor HTML an den Browser gesendet wird. Er kann sicher auf Datenbanken oder serverseitige APIs zugreifen, ohne diese im Client-Bundle zu exponieren. Die Komponente empfängt dieselbe loaderData-Prop." },
      { "animationStep": 5, "heading": "Form & Actions", "text": "clientAction und action verarbeiten Formularmutationen. Die Form-Komponente von React Router serialisiert das Formular und ruft die passende Action auf. Nach der Action werden Loader automatisch neu validiert." },
      { "animationStep": 6, "heading": "Rendering-Strategien", "text": "React Router v7 unterstützt drei Rendering-Strategien in react-router.config.js. CSR rendert alles im Browser; SSR rendert HTML bei jeder Anfrage auf dem Server; SSG rendert Seiten zur Build-Zeit vor." }
    ]
  },
  "react-data-fetching": {
    "title": "Datenabruf-Strategien",
    "description": "Das Fetch-on-Render-Wasserfall-Problem verstehen und wie Render-as-you-Fetch mit Suspense es löst",
    "steps": [
      { "animationStep": 0, "heading": "Das Wasserfall-Problem", "text": "Wenn eine Elternkomponente Daten lädt und das Kind erst nach dem Datenabruf rendert, entsteht ein Wasserfall — jede Anfrage wartet auf die vorherige. Die Gesamtwartezeit ist die Summe aller Anfragen, nicht die längste." },
      { "animationStep": 1, "heading": "Fetch-on-Render (useEffect-Muster)", "text": "Das klassische Muster platziert den Datenabruf in useEffect. Die Komponente rendert zuerst mit einem Spinner, dann wird der Effekt ausgeführt. Es erzwingt sequentielles Rendering: ein Kind kann erst laden, wenn das Elternteil fertig gerendert hat." },
      { "animationStep": 2, "heading": "Render-as-you-Fetch", "text": "Render-as-you-Fetch startet alle Abrufe vor dem Rendern des Komponentenbaums. Abrufe laufen parallel, daher ist die Gesamtzeit gleich der langsamsten Anfrage — nicht der Summe." },
      { "animationStep": 3, "heading": "Suspense + use()", "text": "Reacts use()-Hook löst ein Promise in einer Komponente auf. Ist das Promise noch nicht erfüllt, wird die Komponente suspendiert und React zeigt den nächsten Suspense-Fallback. ErrorBoundary fängt abgelehnte Promises ab." },
      { "animationStep": 4, "heading": "Loader als Lösung", "text": "Die sauberste Implementierung delegiert den Datenabruf an den Router. Der React-Router-Loader wird beim Start einer Navigation ausgeführt — bevor Komponenten rendern. Kein useEffect, keine manuelle Promise-Verwaltung." }
    ]
  },
  "react-mutations": {
    "title": "Datenmutationen",
    "description": "Daten an den Server senden — vom klassischen onSubmit-Muster zu React 19 Formular-Actions und useFormStatus",
    "steps": [
      { "animationStep": 0, "heading": "onSubmit + preventDefault", "text": "Das klassische React-Formularmuster fängt das Submit-Event ab, ruft preventDefault() auf und sendet die Daten manuell mit fetch. Lade-, Fehler- und Erfolgszustand werden manuell mit useState verwaltet." },
      { "animationStep": 1, "heading": "Formular-Actions (React 19)", "text": "React 19 führt die action-Prop für Formularelemente ein. Übergib eine async-Funktion direkt — React ruft sie mit einem FormData-Objekt auf. Kein onSubmit, kein preventDefault nötig." },
      { "animationStep": 2, "heading": "FormData", "text": "FormData ist die integrierte Browser-Methode zum Sammeln von Formularfeldern. Das name-Attribut eines Inputs wird zum Schlüssel. formData.get() gibt einen einzelnen Wert zurück; formData.getAll() gibt mehrere Werte für Checkboxen zurück." },
      { "animationStep": 3, "heading": "useFormStatus — Ladezustand", "text": "useFormStatus() aus react-dom liest den Ausstehend-Zustand der nächsten übergeordneten Formular-Action. Es muss in einer Kindkomponente innerhalb des Formulars aufgerufen werden — es liest Kontext, keine Props." },
      { "animationStep": 4, "heading": "ErrorBoundary für Formulare", "text": "Wenn eine Formular-Action einen Fehler wirft, fängt ein ErrorBoundary ihn ab und zeigt eine Fallback-UI. Die Fallback-Komponente erhält resetErrorBoundary für einen Wiederholungsversuch. Geeignet für unerwartete Serverfehler." },
      { "animationStep": 5, "heading": "useActionState", "text": "useActionState(action, initialState) umhüllt eine Formular-Action und gibt das letzte Ergebnis als State zurück — ideal für feldweise Validierungsfehler. Die Action erhält (previousState, formData) und gibt den neuen State zurück." }
    ]
  },
  "react-tanstack-query": {
    "title": "TanStack Query",
    "description": "Intelligentes clientseitiges Caching für React-Apps — Stale-while-Revalidate, Hintergrund-Refetch und Mutationen ohne Boilerplate",
    "steps": [
      { "animationStep": 0, "heading": "Das Caching-Problem", "text": "Jedes Mal wenn ein Nutzer zu einer Route zurücknavigiert, wird ein useEffect-Fetch erneut ausgelöst — auch ohne Datenänderung. Clientseitiges Caching speichert Abrufergebnisse nach Schlüssel, sodass Folgebesuche sofort angezeigt werden." },
      { "animationStep": 1, "heading": "Stale vs. Fresh-Daten", "text": "TanStack Query verfolgt, ob gecachte Daten frisch (kürzlich abgerufen) oder veraltet (alt genug für einen Hintergrund-Refetch) sind. staleTime steuert das Zeitfenster — 0 bedeutet immer veraltet, Infinity bedeutet kein automatischer Refetch. Standard ist 0." },
      { "animationStep": 2, "heading": "useQuery", "text": "useQuery nimmt einen queryKey und eine queryFn. Der queryKey ist ein Array, das die Abfrage eindeutig identifiziert — alle Variablen einschließen, die den Abruf beeinflussen. queryFn ist die async-Funktion. Gibt data, isLoading, isError und error zurück." },
      { "animationStep": 3, "heading": "Hintergrund-Refetch", "text": "Wenn eine veraltete Abfrage erneut gemountet wird, zeigt TanStack Query sofort die gecachten Daten und führt im Hintergrund einen Refetch durch. Nutzer sehen Inhalte sofort — kein Spinner bei Rückkehr." },
      { "animationStep": 4, "heading": "useMutation", "text": "useMutation verarbeitet Schreiboperationen. Rufe mutate mit deinen Variablen auf. Verwende onSuccess, um verwandte Queries zu invalidieren — so bleibt der Cache nach Erstell-, Aktualisierungs- oder Löschoperationen synchron." }
    ]
  }
```

- [x] **Step 2: Validate JSON**

```bash
python3 -c "import json; json.load(open('src/i18n/locales/de/topics-other.json')); print('valid')"
```

- [x] **Step 3: Commit**

```bash
git add src/i18n/locales/de/topics-other.json
git commit -m "feat: add DE locale for 4 react-ecosystem topics"
```

---

### Task 5: Update categories.json (EN + DE)

**Files:**
- Modify: `src/i18n/locales/en/categories.json`
- Modify: `src/i18n/locales/de/categories.json`

- [x] **Step 1: Add EN entries**

In `src/i18n/locales/en/categories.json`:

1. After the `"git-collab"` category entry, add:
```json
  "react-ecosystem": {
    "title": "React Ecosystem",
    "description": "Advanced patterns, data strategies, and ecosystem tools",
    "cardLabel": "Ecosystem"
  },
```

2. In the `"topicLabels"` object, after `"react-context": "Context & useReducer",` add:
```json
    "react-router-advanced": "Router Advanced",
    "react-data-fetching": "Data Fetching",
    "react-mutations": "Data Mutations",
    "react-tanstack-query": "TanStack Query",
```

3. In the `"techMeta"` object, after the `"react"` entry, add:
```json
    "react-ecosystem": {
      "title": "React",
      "subtitle": "Ecosystem & Patterns"
    },
```

- [x] **Step 2: Add DE entries**

In `src/i18n/locales/de/categories.json`:

1. After the `"git-collab"` category entry, add:
```json
  "react-ecosystem": {
    "title": "React-Ökosystem",
    "description": "Fortgeschrittene Muster, Datenstrategien und Ökosystem-Tools",
    "cardLabel": "Ökosystem"
  },
```

2. In `"topicLabels"` after `"react-context"`, add:
```json
    "react-router-advanced": "Router Advanced",
    "react-data-fetching": "Datenabruf",
    "react-mutations": "Datenmutationen",
    "react-tanstack-query": "TanStack Query",
```

3. In `"techMeta"` after the `"react"` entry, add:
```json
    "react-ecosystem": {
      "title": "React",
      "subtitle": "Ökosystem & Muster"
    },
```

- [x] **Step 3: Validate both JSON files**

```bash
python3 -c "import json; json.load(open('src/i18n/locales/en/categories.json')); json.load(open('src/i18n/locales/de/categories.json')); print('both valid')"
```

- [x] **Step 4: Commit**

```bash
git add src/i18n/locales/en/categories.json src/i18n/locales/de/categories.json
git commit -m "feat: add react-ecosystem entries to EN + DE categories.json"
```

---

## Chunk 3: Banners

All banners go in `src/topics/banners/react-ecosystem/`. Create the directory — it does not exist yet. All banners: 780×220px, `background: '#07101a'`, dot pattern + radial glow (follow the NpmBundlersBanner pattern in `src/topics/banners/javascript/NpmBundlersBanner.tsx`).

### Task 6: RouterAdvancedBanner

**Files:**
- Create: `src/topics/banners/react-ecosystem/RouterAdvancedBanner.tsx`

- [x] **Step 1: Create the banner**

```tsx
export default function RouterAdvancedBanner() {
  const C = '#38bdf8'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ra" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ra" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ra)" />
      <rect width="780" height="220" fill="url(#glow-ra)" />

      {/* LEFT: Library mode */}
      <text x="20" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" fontWeight="700">LIBRARY MODE</text>
      <rect x="20" y="26" width="180" height="22" rx="4" fill={`${C}10`} stroke={`${C}30`} strokeWidth="1" />
      <text x="30" y="41" fontSize="10" fontFamily="monospace" fill="rgba(255,255,255,0.7)">&lt;BrowserRouter&gt;</text>
      <rect x="36" y="54" width="148" height="20" rx="3" fill={`${C}08`} stroke={`${C}20`} strokeWidth="1" />
      <text x="46" y="68" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.55)">&lt;Routes&gt;&lt;Route /&gt;&lt;/Routes&gt;</text>
      <rect x="52" y="80" width="116" height="20" rx="3" fill={`${C}06`} stroke={`${C}18`} strokeWidth="1" />
      <text x="62" y="94" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.4)">element={`{<Page />}`}</text>
      <text x="20" y="120" fontSize="8" fontFamily="monospace" fill={`${C}50`}>Manual wiring</text>
      <text x="20" y="132" fontSize="8" fontFamily="monospace" fill={`${C}40`}>No SSR · No loaders</text>

      {/* Divider */}
      <line x1="220" y1="10" x2="220" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* CENTER: Framework mode — routes.js → module */}
      <text x="390" y="18" fill={`${C}80`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">FRAMEWORK MODE</text>

      {/* routes.js box */}
      <rect x="240" y="28" width="120" height="60" rx="5" fill={`${C}12`} stroke={`${C}40`} strokeWidth="1.2" />
      <text x="300" y="44" fill={C} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">routes.js</text>
      {["index('home.jsx')", "route('/about',...)", "route('/p/:id',...)" ].map((line, i) => (
        <text key={i} x="250" y={58 + i * 12} fontSize="8" fontFamily="monospace" fill={`${C}80`}>{line}</text>
      ))}

      {/* Arrow */}
      <line x1="362" y1="58" x2="392" y2="58" stroke={`${C}60`} strokeWidth="1.5" />
      <polygon points="392,54 400,58 392,62" fill={`${C}60`} />

      {/* Route module box */}
      <rect x="402" y="28" width="148" height="80" rx="5" fill="rgba(0,0,0,0.3)" stroke={`${C}25`} strokeWidth="1" />
      <text x="476" y="44" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">route module</text>
      {[
        { label: 'clientLoader', color: '#34d399' },
        { label: 'action',       color: '#f97316' },
        { label: 'ErrorBoundary',color: '#f43f5e' },
        { label: 'default',      color: C },
      ].map(({ label, color }, i) => (
        <g key={label}>
          <rect x="412" y={50 + i * 14} width="128" height="11" rx="2" fill={`${color}12`} stroke={`${color}30`} strokeWidth="0.8" />
          <text x="420" y={59 + i * 14} fontSize="8" fontFamily="monospace" fill={color}>{label}</text>
        </g>
      ))}

      {/* Bottom note */}
      <text x="390" y="126" fill={`${C}60`} fontSize="8" fontFamily="monospace" textAnchor="middle">loaderData · actionData injected automatically</text>

      {/* Divider */}
      <line x1="560" y1="10" x2="560" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* RIGHT: Rendering strategy pills */}
      <text x="670" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">STRATEGIES</text>
      {[
        { label: 'CSR', sub: 'SPA · client', color: '#60a5fa' },
        { label: 'SSR', sub: 'server · each req', color: '#34d399' },
        { label: 'SSG', sub: 'build time · static', color: '#fbbf24' },
      ].map(({ label, sub, color }, i) => (
        <g key={label}>
          <rect x="578" y={30 + i * 50} width="184" height="38" rx="6" fill={`${color}10`} stroke={`${color}35`} strokeWidth="1.2" />
          <text x="596" y={54 + i * 50} fontFamily="monospace" fontSize="14" fill={color} fontWeight="700">{label}</text>
          <text x="650" y={54 + i * 50} fontFamily="monospace" fontSize="9" fill={`${color}70`}>{sub}</text>
        </g>
      ))}

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">routes.js · route modules · loader · action · CSR · SSR · SSG</text>
    </svg>
  )
}
```

- [x] **Step 2: Commit**

```bash
git add src/topics/banners/react-ecosystem/RouterAdvancedBanner.tsx
git commit -m "feat: add RouterAdvancedBanner"
```

---

### Task 7: DataFetchingBanner

**Files:**
- Create: `src/topics/banners/react-ecosystem/DataFetchingBanner.tsx`

- [x] **Step 1: Create the banner**

```tsx
export default function DataFetchingBanner() {
  const C = '#34d399'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-df" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-df" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-df)" />
      <rect width="780" height="220" fill="url(#glow-df)" />

      {/* LEFT: Fetch-on-render waterfall */}
      <text x="20" y="18" fill="#f43f5e90" fontSize="9" fontFamily="monospace" fontWeight="700">FETCH-ON-RENDER  🌊 waterfall</text>
      {[
        { label: 'fetch posts',    t: 0,   w: 160, color: '#60a5fa' },
        { label: 'fetch comments', t: 54,  w: 160, color: '#a78bfa' },
        { label: 'fetch likes',    t: 108, w: 160, color: '#f472b6' },
      ].map(({ label, t, w, color }, i) => (
        <g key={label}>
          <rect x="20" y={26 + i * 46} width={w} height="28" rx="4" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1" />
          <text x="28" y={45 + i * 46} fontSize="9" fontFamily="monospace" fill={color}>{label}</text>
          {i < 2 && (
            <line x1="100" y1={54 + i * 46} x2="100" y2={58 + i * 46} stroke={`${color}40`} strokeWidth="1" strokeDasharray="2 2" />
          )}
        </g>
      ))}
      <rect x="20" y="172" width="160" height="18" rx="3" fill="rgba(244,63,94,0.12)" stroke="rgba(244,63,94,0.3)" strokeWidth="1" />
      <text x="100" y="184" fontSize="8" fontFamily="monospace" fill="#f43f5e" textAnchor="middle">total = 3 × 500ms = 1500ms</text>

      {/* Time axis */}
      <line x1="20" y1="200" x2="186" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="20" y="212" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)">t=0</text>
      <text x="186" y="212" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)" textAnchor="end">t=1500ms</text>

      {/* CENTER divider + label */}
      <line x1="210" y1="10" x2="210" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="390" y="110" fill="rgba(255,255,255,0.12)" fontSize="28" fontFamily="monospace" textAnchor="middle" fontWeight="700">vs</text>

      {/* RIGHT: Render-as-you-fetch */}
      <text x="420" y="18" fill={`${C}90`} fontSize="9" fontFamily="monospace" fontWeight="700">RENDER-AS-YOU-FETCH  ⚡ parallel</text>
      {[
        { label: 'fetch posts',    color: '#60a5fa' },
        { label: 'fetch comments', color: '#a78bfa' },
        { label: 'fetch likes',    color: '#f472b6' },
      ].map(({ label, color }, i) => (
        <g key={label}>
          {/* All bars start at same x — parallel */}
          <rect x="420" y={26 + i * 38} width="160" height="24" rx="4" fill={`${color}15`} stroke={`${color}40`} strokeWidth="1" />
          <text x="428" y={42 + i * 38} fontSize="9" fontFamily="monospace" fill={color}>{label}</text>
        </g>
      ))}
      <rect x="420" y="142" width="160" height="18" rx="3" fill={`${C}12`} stroke={`${C}35`} strokeWidth="1" />
      <text x="500" y="154" fontSize="8" fontFamily="monospace" fill={C} textAnchor="middle">total = max(500ms) = 500ms</text>

      {/* Time axis right */}
      <line x1="420" y1="200" x2="586" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="420" y="212" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)">t=0</text>
      <text x="586" y="212" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)" textAnchor="end">t=500ms</text>

      {/* Divider */}
      <line x1="600" y1="10" x2="600" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* FAR RIGHT: Suspense + use */}
      <text x="690" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">SUSPENSE</text>
      <rect x="612" y="26" width="156" height="52" rx="5" fill={`${C}08`} stroke={`${C}25`} strokeWidth="1" />
      <text x="690" y="42" fontSize="9" fontFamily="monospace" fill={`${C}80`} textAnchor="middle">&lt;Suspense fallback=…&gt;</text>
      <rect x="628" y="48" width="124" height="22" rx="3" fill={`${C}12`} stroke={`${C}30`} strokeWidth="0.8" />
      <text x="690" y="63" fontSize="9" fontFamily="monospace" fill={C} textAnchor="middle">use(promise)</text>

      <rect x="612" y="90" width="156" height="30" rx="4" fill="rgba(244,63,94,0.08)" stroke="rgba(244,63,94,0.2)" strokeWidth="1" />
      <text x="690" y="108" fontSize="9" fontFamily="monospace" fill="#f43f5e80" textAnchor="middle">&lt;ErrorBoundary&gt;</text>

      <text x="690" y="145" fontSize="8" fontFamily="monospace" fill={`${C}50`} textAnchor="middle">Suspends until</text>
      <text x="690" y="157" fontSize="8" fontFamily="monospace" fill={`${C}50`} textAnchor="middle">promise resolves</text>

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">fetch-on-render · render-as-you-fetch · Suspense · use() · loaders</text>
    </svg>
  )
}
```

- [x] **Step 2: Commit**

```bash
git add src/topics/banners/react-ecosystem/DataFetchingBanner.tsx
git commit -m "feat: add DataFetchingBanner"
```

---

### Task 8: MutationsBanner

**Files:**
- Create: `src/topics/banners/react-ecosystem/MutationsBanner.tsx`

- [x] **Step 1: Create the banner**

```tsx
export default function MutationsBanner() {
  const C = '#f97316'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-mu" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-mu" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.07" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-mu)" />
      <rect width="780" height="220" fill="url(#glow-mu)" />

      {/* LEFT: Classic onSubmit */}
      <text x="20" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" fontWeight="700">CLASSIC PATTERN</text>
      {[
        { label: '<form onSubmit={fn}>', color: 'rgba(255,255,255,0.6)' },
        { label: 'e.preventDefault()', color: '#f43f5e80' },
        { label: 'fetch("/api", {...})', color: '#60a5fa80' },
        { label: 'setState(result)', color: '#a78bfa80' },
      ].map(({ label, color }, i) => (
        <g key={i}>
          <rect x="20" y={26 + i * 36} width="174" height="26" rx="4" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x="30" y={43 + i * 36} fontSize="9" fontFamily="monospace" fill={color}>{label}</text>
          {i < 3 && (
            <line x1="107" y1={52 + i * 36} x2="107" y2={56 + i * 36} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />
          )}
        </g>
      ))}
      <text x="107" y="192" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.3)" textAnchor="middle">manual boilerplate</text>

      {/* Divider */}
      <line x1="208" y1="10" x2="208" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* CENTER: React 19 form action */}
      <text x="390" y="18" fill={`${C}90`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">REACT 19  ACTION</text>

      <rect x="224" y="28" width="330" height="40" rx="5" fill={`${C}10`} stroke={`${C}35`} strokeWidth="1.2" />
      <text x="389" y="43" fontSize="10" fontFamily="monospace" fill={C} textAnchor="middle" fontWeight="700">&lt;form action={'{asyncFn}'}›</text>
      <text x="389" y="58" fontSize="9" fontFamily="monospace" fill={`${C}70`} textAnchor="middle">receives FormData automatically</text>

      {/* Arrows down */}
      <line x1="389" y1="70" x2="389" y2="86" stroke={`${C}50`} strokeWidth="1.5" />
      <polygon points="385,86 389,92 393,86" fill={`${C}50`} />

      <rect x="250" y="92" width="280" height="34" rx="4" fill="rgba(0,0,0,0.3)" stroke={`${C}20`} strokeWidth="1" />
      <text x="390" y="105" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.7)" textAnchor="middle">async function action(formData) {'{'}</text>
      <text x="390" y="118" fontSize="9" fontFamily="monospace" fill={`${C}70`} textAnchor="middle">  const email = formData.get('email')</text>

      <line x1="389" y1="128" x2="389" y2="142" stroke={`${C}50`} strokeWidth="1.5" />
      <polygon points="385,142 389,148 393,142" fill={`${C}50`} />

      {/* useFormStatus */}
      <rect x="270" y="148" width="238" height="32" rx="4" fill={`${C}12`} stroke={`${C}30`} strokeWidth="1" />
      <text x="389" y="162" fontSize="9" fontFamily="monospace" fill={C} textAnchor="middle" fontWeight="700">useFormStatus()</text>
      <text x="389" y="174" fontSize="8" fontFamily="monospace" fill={`${C}60`} textAnchor="middle">{'{ pending } — disable button while running'}</text>

      {/* Divider */}
      <line x1="570" y1="10" x2="570" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* RIGHT: useActionState */}
      <text x="675" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">ERRORS</text>
      <rect x="580" y="26" width="186" height="54" rx="5" fill="rgba(0,0,0,0.3)" stroke={`${C}20`} strokeWidth="1" />
      <text x="673" y="42" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.6)" textAnchor="middle">useActionState(fn, init)</text>
      <text x="673" y="56" fontSize="8" fontFamily="monospace" fill={`${C}60`} textAnchor="middle">(previousState, formData)</text>
      <text x="673" y="68" fontSize="8" fontFamily="monospace" fill={`${C}40`} textAnchor="middle">→ {'{ errors: { email: … } }'}</text>

      {[
        { label: 'state.errors.email', note: 'per-field error' },
        { label: 'state.success',      note: 'success flag' },
      ].map(({ label, note }, i) => (
        <g key={label}>
          <rect x="580" y={92 + i * 34} width="186" height="26" rx="3" fill={`${C}08`} stroke={`${C}20`} strokeWidth="0.8" />
          <text x="590" y={106 + i * 34} fontSize="8" fontFamily="monospace" fill={`${C}80`}>{label}</text>
          <text x="590" y={116 + i * 34} fontSize="7" fontFamily="monospace" fill={`${C}45`}>{note}</text>
        </g>
      ))}

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">onSubmit · form action · FormData · useFormStatus · useActionState</text>
    </svg>
  )
}
```

- [x] **Step 2: Commit**

```bash
git add src/topics/banners/react-ecosystem/MutationsBanner.tsx
git commit -m "feat: add MutationsBanner"
```

---

### Task 9: TanStackQueryBanner

**Files:**
- Create: `src/topics/banners/react-ecosystem/TanStackQueryBanner.tsx`

- [x] **Step 1: Create the banner**

```tsx
export default function TanStackQueryBanner() {
  const C = '#f43f5e'

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-tq" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-tq" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.07" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-tq)" />
      <rect width="780" height="220" fill="url(#glow-tq)" />

      {/* LEFT: No cache — repeated fetches */}
      <text x="20" y="18" fill="#f43f5e80" fontSize="9" fontFamily="monospace" fontWeight="700">WITHOUT CACHE</text>
      {[
        { label: 'visit /posts', arrow: '→ fetch' },
        { label: 'visit /posts/1', arrow: '→ fetch' },
        { label: 'back to /posts', arrow: '→ fetch AGAIN 😩' },
      ].map(({ label, arrow }, i) => (
        <g key={i}>
          <rect x="20" y={26 + i * 48} width="174" height="34" rx="4" fill="rgba(244,63,94,0.06)" stroke="rgba(244,63,94,0.2)" strokeWidth="1" />
          <text x="30" y={42 + i * 48} fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.55)">{label}</text>
          <text x="30" y={54 + i * 48} fontSize="8" fontFamily="monospace" fill="#f43f5e70">{arrow}</text>
        </g>
      ))}

      {/* Divider */}
      <line x1="208" y1="10" x2="208" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* CENTER: QueryClient cache diagram */}
      <text x="390" y="18" fill={`${C}90`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">TANSTACK QUERY CACHE</text>

      {/* QueryClient box */}
      <rect x="240" y="26" width="300" height="32" rx="5" fill={`${C}12`} stroke={`${C}40`} strokeWidth="1.5" />
      <text x="390" y="46" fontSize="11" fontFamily="monospace" fill={C} textAnchor="middle" fontWeight="700">QueryClient</text>

      {/* Cache entries */}
      {[
        { key: "['posts']",      status: 'fresh',  color: '#34d399' },
        { key: "['post', 1]",    status: 'fresh',  color: '#34d399' },
        { key: "['user', 'me']", status: 'stale',  color: '#fbbf24' },
      ].map(({ key, status, color }, i) => (
        <g key={key}>
          <rect x="240" y={68 + i * 32} width="300" height="24" rx="3" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x="252" y={84 + i * 32} fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.65)">{key}</text>
          <rect x="484" y={70 + i * 32} width="48" height="18" rx="9" fill={`${color}20`} />
          <text x="508" y={82 + i * 32} fontSize="8" fontFamily="monospace" fill={color} textAnchor="middle">{status}</text>
        </g>
      ))}

      {/* staleTime note */}
      <rect x="240" y="172" width="300" height="22" rx="4" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="390" y="186" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.4)" textAnchor="middle">staleTime — controls fresh → stale transition</text>

      {/* Divider */}
      <line x1="558" y1="10" x2="558" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* RIGHT: mutation + invalidate cycle */}
      <text x="670" y="18" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">MUTATION CYCLE</text>

      {[
        { label: 'mutate(data)',          color: C },
        { label: 'onSuccess callback',    color: '#fbbf24' },
        { label: 'invalidateQueries()',   color: '#a78bfa' },
        { label: 'auto refetch ⚡',       color: '#34d399' },
      ].map(({ label, color }, i) => (
        <g key={label}>
          <rect x="572" y={26 + i * 44} width="196" height="30" rx="4" fill={`${color}10`} stroke={`${color}30`} strokeWidth="1" />
          <text x="670" y={45 + i * 44} fontSize="9" fontFamily="monospace" fill={color} textAnchor="middle">{label}</text>
          {i < 3 && (
            <polygon points={`666,${58 + i * 44} 670,${64 + i * 44} 674,${58 + i * 44}`} fill={`${color}50`} />
          )}
        </g>
      ))}

      <text x="390" y="210" fill={`${C}30`} fontSize="9" fontFamily="monospace" textAnchor="middle">QueryClient · useQuery · staleTime · background refetch · useMutation · invalidateQueries</text>
    </svg>
  )
}
```

- [x] **Step 2: Commit**

```bash
git add src/topics/banners/react-ecosystem/TanStackQueryBanner.tsx
git commit -m "feat: add TanStackQueryBanner"
```

---

## Chunk 4: Registry + Final Check

### Task 10: Wire registry.ts

**Files:**
- Modify: `src/topics/registry.ts`

- [x] **Step 1: Add 4 banners to bannerLazyRegistry**

In `src/topics/registry.ts`, after the `ContextBanner` entry in the React section:

```typescript
  // React Ecosystem
  RouterAdvancedBanner:  () => import('./banners/react-ecosystem/RouterAdvancedBanner'),
  DataFetchingBanner:    () => import('./banners/react-ecosystem/DataFetchingBanner'),
  MutationsBanner:       () => import('./banners/react-ecosystem/MutationsBanner'),
  TanStackQueryBanner:   () => import('./banners/react-ecosystem/TanStackQueryBanner'),
```

- [x] **Step 2: Commit**

```bash
git add src/topics/registry.ts
git commit -m "feat: register 4 react-ecosystem banners in registry.ts"
```

---

### Task 11: Final TypeScript check + push

- [x] **Step 1: Run TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: no errors

- [x] **Step 2: Verify topics count**

```bash
grep -c "id: 'react-" src/data/topics.ts
```
Expected: count includes react-components, react-state, react-useeffect, react-router, react-context, react-router-advanced, react-data-fetching, react-mutations, react-tanstack-query (9 topics)

- [x] **Step 3: Verify banners exist**

```bash
ls src/topics/banners/react-ecosystem/
```
Expected: `DataFetchingBanner.tsx  MutationsBanner.tsx  RouterAdvancedBanner.tsx  TanStackQueryBanner.tsx`

- [x] **Step 4: Push**

```bash
git push
```
