# React Ecosystem Category — Design Spec

**Date:** 2026-03-16
**Sub-project:** C of 4 (wbs-sources/new/ integration)
**Status:** Approved

---

## Goal

Create a new `react-ecosystem` category with 4 topics covering advanced React patterns: React Router v7 framework mode, data fetching strategies, React 19 data mutations, and TanStack Query client-side caching. Source: `wbs-sources/new/ReactRouter Advanced/`, `wbs-sources/new/Data Fetching Strategies/`, `wbs-sources/new/Data Mutations/`, `wbs-sources/new/TanStack Query/`.

---

## Category Definition

```
id:         react-ecosystem
title:      React Ecosystem
description: Advanced patterns, data strategies, and ecosystem tools
color:      #a78bfa
icon:       Layers
cardLabel:  Ecosystem
cardEmoji:  🌐
```

topicIds (in order): `react-router-advanced`, `react-data-fetching`, `react-mutations`, `react-tanstack-query`

**CATEGORY_GROUPS:** Add `react-ecosystem` to the `frameworks-web` group in `CATEGORY_GROUPS` (after `react`).

**TECH_SECTION_META:** Add entry `'react-ecosystem': { title: 'React', subtitle: 'Ecosystem & Patterns', color: '#a78bfa' }`. No change needed to `getTechKey()` — the default `return categoryId` branch already returns `'react-ecosystem'`, which will resolve to the new TECH_SECTION_META entry.

---

## Topic 1: react-router-advanced

```
id:               react-router-advanced
title:            React Router as a Framework
description:      Go beyond the library — use React Router v7's framework mode with route modules, loaders, and actions for full-stack data handling
category:         react-ecosystem
color:            #38bdf8
estimatedMinutes: 14
animationComponent: undefined
bannerComponent:  RouterAdvancedBanner
playgroundType:   monaco
nextTopicId:      react-data-fetching
```

### Explanation Steps

| Step | Icon | Heading | Language |
|------|------|---------|----------|
| 0 | 🔄 | Library vs Framework mode | jsx |
| 1 | 📁 | routes.js config | javascript |
| 2 | 📦 | Route modules | jsx |
| 3 | 🌐 | clientLoader — CSR data loading | jsx |
| 4 | 🖥️ | loader — SSR data loading | jsx |
| 5 | 📤 | Form & actions | jsx |
| 6 | 🗂️ | Rendering strategies | javascript |

**Step 0 — Library vs Framework mode**
Text: React Router started as a client-side routing library. In v7, it can also run as a full framework — handling file-based routes, server-side rendering, and data loading out of the box. In library mode you configure `<BrowserRouter>` yourself; in framework mode you scaffold with `create-react-router` and React Router owns the entry point.
Code: Side-by-side: library mode (`BrowserRouter` + `Routes`) vs framework mode (scaffold with `npx create-react-router@latest`).

**Step 1 — routes.js config**
Text: Framework mode uses a `routes.js` file to declare your route tree. Each entry maps a URL pattern to a route module file. The `index()` helper declares the index route; `route()` declares named routes.
Code: `app/routes.js` with `index`, `route('/about', ...)`, `route('/products/:pid', ...)`.

**Step 2 — Route modules**
Text: A route module is a regular file that exports named functions React Router understands: `default` (the component), `loader`/`clientLoader` (data), `action`/`clientAction` (mutations), `ErrorBoundary` (errors). React Router automatically wires these — no manual prop passing.
Code: Route module skeleton showing `export async function clientLoader()`, `export function ErrorBoundary()`, `export default function Page({ loaderData })`.

**Step 3 — clientLoader (CSR data loading)**
Text: `clientLoader` fetches data in the browser before the component renders. The result is injected as `loaderData` prop (or via `useLoaderData()`). Export `HydrateFallback` to show a loading UI while the loader runs on first visit.
Code: `clientLoader({ params })` fetching from an API, `HydrateFallback`, component receiving `loaderData`.

**Step 4 — loader (SSR data loading)**
Text: `loader` runs on the server — before the HTML is sent to the browser. It can safely access databases or server-only APIs without exposing them to the client bundle. On client-side navigations React Router calls it via a fetch request to the server. Same `loaderData` prop, zero changes in the component.
Code: `loader({ params })` — identical signature to `clientLoader`, but runs server-side. Note: network tab shows no API request from browser.

**Step 5 — Form & actions**
Text: `clientAction` / `action` handle form mutations. React Router's `<Form>` component (not the native `<form>`) serialises the submission and calls the matching action. The result is available as `actionData`. After the action runs, loaders automatically revalidate.
Code: `clientAction({ request })` reading `formData`, `<Form method="post">` in the component, `actionData` display.

**Step 6 — Rendering strategies**
Text: React Router v7 supports CSR (SPA, `ssr: false`), SSR (server-rendered on every request, `ssr: true`), and SSG (pre-rendered at build time via `prerender()`). The choice lives in `react-router.config.js` and determines when and where your loaders run. Most apps start with CSR or SSR; SSG suits static marketing pages.
Code: `react-router.config.js` showing each mode (`ssr: false` / `ssr: true` / `prerender()`). Table: CSR → loader runs in browser; SSR → loader runs on server; SSG → loader runs at build time.

### cheatSheet

**Syntax entries:**
- routes.js — `route('/path', 'routes/file.jsx')`
- clientLoader — `export async function clientLoader({ params }) { return fetch(...) }`
- loader — `export async function loader({ params }) { /* server-only */ }`
- HydrateFallback — `export function HydrateFallback() { return <div>Loading...</div> }`
- clientAction — `export async function clientAction({ request }) { const fd = await request.formData() }`
- Form — `<Form method="post">` (from 'react-router')
- useLoaderData — `const data = useLoaderData()`

**Patterns:**
- Route module with loader + ErrorBoundary
- Form + clientAction for client mutations

**whenToUse:** Use framework mode when you want SSR, SSG, or co-located data loading without setting up your own server. Stick to library mode for pure SPAs where a Vite + BrowserRouter setup is already working well.

**commonMistakes:**
- Using native `<form>` instead of React Router's `<Form>` (action won't be called)
- Accessing server-only resources in `clientLoader` (they'll be bundled into the client)
- Forgetting that after an action runs, loaders revalidate automatically — don't manually refetch

---

## Topic 2: react-data-fetching

```
id:               react-data-fetching
title:            Data Fetching Strategies
description:      Understand the fetch-on-render waterfall and how render-as-you-fetch with Suspense eliminates it
category:         react-ecosystem
color:            #34d399
estimatedMinutes: 10
animationComponent: undefined
bannerComponent:  DataFetchingBanner
playgroundType:   monaco
nextTopicId:      react-mutations
```

### Explanation Steps

| Step | Icon | Heading | Language |
|------|------|---------|----------|
| 0 | 🌊 | The waterfall problem | javascript |
| 1 | 🔁 | Fetch-on-render (useEffect pattern) | jsx |
| 2 | ⚡ | Render-as-you-fetch | jsx |
| 3 | 🎯 | Suspense + use() | jsx |
| 4 | 🛣️ | Loaders as the solution | jsx |

**Step 0 — The waterfall problem**
Text: When a parent component fetches data and only renders a child after its data arrives, and that child then fetches its own data, you have a waterfall — each request waits for the previous one to finish. Total time = sum of all requests. For 3 sequential 500ms fetches: 1.5s wait before the user sees anything.
Code: Timeline diagram as comments — `// App renders → fetch posts (500ms) → PostList renders → fetch comments (500ms) → Comments renders → fetch user (500ms)`. Total: 1500ms.

**Step 1 — Fetch-on-render (useEffect pattern)**
Text: The classic fetch-on-render pattern puts data fetching inside `useEffect`. The component renders first (usually showing a spinner), then the effect fires, then state updates trigger a re-render with data. It's easy to understand but forces sequential rendering: a child can't start fetching until its parent has finished and rendered it.
Code: `Post` component with `useState` (null/loading/error) + `useEffect` fetch. `Comments` component nested inside — only mounts after `post` is available.

**Step 2 — Render-as-you-fetch**
Text: Render-as-you-fetch flips the order: kick off all fetches *before* rendering begins, then render components that suspend until their data arrives. Because fetches run in parallel outside the component tree, total time = slowest single request — not the sum. The key is starting fetches as early as possible (at navigation time, not at render time).
Code: Orchestrator pattern — start both `fetchPost(id)` and `fetchComments(id)` immediately (store the promises, don't await), pass promises to child components.

**Step 3 — Suspense + use()**
Text: React's `use()` hook unwraps a promise inside a component. If the promise isn't resolved yet, the component suspends — React shows the nearest `<Suspense>` fallback. Once resolved, the component renders with the data. `ErrorBoundary` catches rejections. No `useState`, no `useEffect`, no loading flags.
Code: `<Suspense fallback={<Spinner />}><Post promise={postPromise} /></Suspense>` — `Post` calling `const post = use(promise)`.

**Step 4 — Loaders as the solution**
Text: The cleanest render-as-you-fetch implementation is delegating fetching to your router. React Router's `loader` runs the moment a navigation starts — before any component renders. You get the waterfall-free benefit of render-as-you-fetch without manually managing promises and caches in your components.
Code: Route with `loader={loadPostWithComments}` — loader fires both fetches in parallel, component uses `useLoaderData()`.

### cheatSheet

**Syntax entries:**
- Fetch-on-render — `useEffect(() => { fetch(url).then(...) }, [id])`
- use() — `const data = use(promise)` (suspends if unresolved)
- Suspense — `<Suspense fallback={<Spinner />}>{children}</Suspense>`
- Loader — `async function loader({ params }) { return fetchData(params.id) }`

**Patterns:**
- Parallel promise initiation before render
- Suspense boundaries per independent data slice

**whenToUse:** Fetch-on-render is fine for simple cases with one data dependency. Switch to render-as-you-fetch (via loaders or manual promise orchestration) when you have parallel data requirements or deep component trees that create visible cascades.

**commonMistakes:**
- Awaiting promises before passing to Suspense (defeats the purpose — the component never suspends)
- Putting fetch logic inside render without useEffect (triggers an infinite refetch loop)
- Using a single Suspense boundary for independent data (one slow request blocks all)

---

## Topic 3: react-mutations

```
id:               react-mutations
title:            Data Mutations
description:      Send data back to the server — from classic onSubmit patterns to React 19 form actions and useFormStatus
category:         react-ecosystem
color:            #f97316
estimatedMinutes: 12
animationComponent: undefined
bannerComponent:  MutationsBanner
playgroundType:   monaco
nextTopicId:      react-tanstack-query
```

### Explanation Steps

| Step | Icon | Heading | Language |
|------|------|---------|----------|
| 0 | 📝 | onSubmit + preventDefault | jsx |
| 1 | ⚡ | Form actions (React 19) | jsx |
| 2 | 📋 | FormData | javascript |
| 3 | ⏳ | useFormStatus — pending state | jsx |
| 4 | ❌ | Error boundaries for forms | jsx |
| 5 | 🎛️ | useActionState | jsx |

**Step 0 — onSubmit + preventDefault**
Text: The classical React form pattern: intercept the native submit event, call `preventDefault()` to stop the page from reloading, then manually send the data with `fetch`. You manage loading state, error state, and success state yourself with `useState`. Works everywhere but requires a lot of boilerplate.
Code: `<form onSubmit={async (e) => { e.preventDefault(); setLoading(true); await fetch(...) }}>` with manual state management.

**Step 1 — Form actions (React 19)**
Text: React 19 introduces the `action` prop on `<form>`. Pass an async function directly — React calls it with a `FormData` object when the form submits. No `onSubmit`, no `preventDefault`. The function is the action; the form is the trigger.
Code: `async function submitContact(formData) { const name = formData.get('name'); await saveContact(name) }` — `<form action={submitContact}>`.

**Step 2 — FormData**
Text: `FormData` is the browser's built-in way to collect form field values. Each input's `name` attribute becomes a key. `formData.get('fieldName')` retrieves a single value; `formData.getAll('fieldName')` retrieves multiple (e.g. checkboxes). No manual `event.target.value` — just name your inputs.
Code: Form with `name="email"`, `name="role"`, `name="tags"` (multiple). Action reading each with `.get()` and `.getAll()`.

**Step 3 — useFormStatus**
Text: `useFormStatus()` (from `react-dom`) reads the pending state of the nearest parent `<form>` action. Use it inside a submit button component to disable the button and show feedback while the action runs. The component must be *inside* the form — it reads context, not props.
Code: `SubmitButton` component using `const { pending } = useFormStatus()` — `<button disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>`.

**Step 4 — Error boundaries for forms**
Text: If a form action throws, wrapping the form in an `ErrorBoundary` (from `react-error-boundary`) catches the error and renders a fallback. The fallback receives `resetErrorBoundary` — call it to let the user retry. Good for unexpected failures; not ideal for per-field validation errors.
Code: `<ErrorBoundary FallbackComponent={FormError}>` wrapping the form. `FormError` receiving `error` + `resetErrorBoundary`.

**Step 5 — useActionState**
Text: `useActionState(action, initialState)` wraps a form action and gives you the latest result back as state — perfect for per-field validation errors. Your action receives `(previousState, formData)` and returns the new state (e.g. `{ errors: { email: 'Required' } }`). Replaces manual `useState` for form feedback.
Code: Action returning `{ errors }` object. `useActionState` destructuring `[state, formAction]`. Form using `action={formAction}`, errors rendered below each field.

### cheatSheet

**Syntax entries:**
- form action — `<form action={asyncFn}>` (React 19)
- FormData — `const value = formData.get('fieldName')`
- useFormStatus — `const { pending } = useFormStatus()` (inside the form)
- useActionState — `const [state, action] = useActionState(fn, initialState)`
- Action signature — `async (previousState, formData) => newState`

**Patterns:**
- `SubmitButton` component with `useFormStatus`
- Validation errors via `useActionState`

**whenToUse:** Use form actions for any form that mutates data. `useFormStatus` for pending UI. `useActionState` when you need per-field feedback or want to persist the action result. Fall back to `onSubmit` only when working in environments that don't yet support React 19.

**commonMistakes:**
- Calling `useFormStatus` outside the form (returns `pending: false` always — must be a descendant)
- Forgetting `previousState` in the action signature when using `useActionState` (causes subtle bugs)
- Using `ErrorBoundary` for expected validation errors (use `useActionState` instead)

---

## Topic 4: react-tanstack-query

```
id:               react-tanstack-query
title:            TanStack Query
description:      Add smart client-side caching to your React app — stale-while-revalidate, background refetch, and mutations without the boilerplate
category:         react-ecosystem
color:            #f43f5e
estimatedMinutes: 12
animationComponent: undefined
bannerComponent:  TanStackQueryBanner
playgroundType:   monaco
nextTopicId:      undefined
```

### Explanation Steps

| Step | Icon | Heading | Language |
|------|------|---------|----------|
| 0 | 💾 | The caching problem | javascript |
| 1 | 🏷️ | Stale vs fresh data | javascript |
| 2 | 🔍 | useQuery | jsx |
| 3 | 🔄 | Background refetch | javascript |
| 4 | ✏️ | useMutation | jsx |

**Step 0 — The caching problem**
Text: Every time a user navigates back to a route, a plain `useEffect` fetch fires again — even if the data hasn't changed. This wastes network requests, causes loading flickers, and makes your app feel slow. Client-side caching stores the result of a fetch keyed by its query, so subsequent visits are instant.
Code: Navigation diagram as comments — user visits `/posts` (fetches), goes to `/posts/1` (fetches), goes back to `/posts` (fetches again). With cache: third navigation returns instantly.

**Step 1 — Stale vs fresh data**
Text: TanStack Query tracks whether cached data is "fresh" (recently fetched, safe to use as-is) or "stale" (old enough that a background refetch should happen). `staleTime` controls the fresh window — `0` means always stale (refetch on every mount), `Infinity` means never refetch automatically. The default is `0`.
Code: `QueryClient` with `defaultOptions: { queries: { staleTime: 60_000 } }`. Inline `staleTime` override on a single query.

**Step 2 — useQuery**
Text: `useQuery({ queryKey, queryFn })` fetches and caches data. `queryKey` is an array that uniquely identifies this query — include any variables the fetch depends on (like an id). `queryFn` is the async function that does the fetch. Returns `{ data, isLoading, isError, error }`.
Code: `useQuery({ queryKey: ['posts', id], queryFn: () => fetchPost(id) })` — component rendering loading/error/data states.

**Step 3 — Background refetch**
Text: When a stale query is mounted again (e.g. the user returns to a tab), TanStack Query shows the cached data immediately and refetches in the background. If the server returns new data, the UI updates automatically. Users see content instantly — no spinner — and get fresh data a moment later.
Code: `refetchOnWindowFocus: true` (default). `refetchInterval: 30_000` for polling. `isFetching` flag to show a subtle background-refresh indicator.

**Step 4 — useMutation**
Text: `useMutation({ mutationFn })` handles write operations. Call `mutate(variables)` to trigger it. Use `onSuccess` to invalidate related queries so the cache stays in sync — `queryClient.invalidateQueries({ queryKey: ['posts'] })` causes all `posts` queries to refetch.
Code: `useMutation({ mutationFn: createPost, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }) })` — `mutate({ title, body })` called from a form submit.

### cheatSheet

**Syntax entries:**
- QueryClient — `new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } })`
- Provider — `<QueryClientProvider client={queryClient}>`
- useQuery — `const { data, isLoading } = useQuery({ queryKey: ['key', id], queryFn })`
- useMutation — `const { mutate } = useMutation({ mutationFn, onSuccess })`
- Invalidate — `queryClient.invalidateQueries({ queryKey: ['key'] })`
- useQueryClient — `const queryClient = useQueryClient()`

**Patterns:**
- Invalidate queries `onSuccess` to keep cache in sync after mutations
- `staleTime` tuning per query type (user profile: long; live feed: short)

**whenToUse:** Add TanStack Query when your app navigates between routes that share data (avoiding redundant fetches), when you want background refetch without writing polling logic, or when you need a clean mutation + cache-invalidation pattern. Don't add it for apps with a single data source that's always fresh.

**commonMistakes:**
- Not including variables in `queryKey` (cache collision — different ids return the same cached result)
- Forgetting to invalidate after a mutation (UI shows stale data)
- Setting `staleTime: Infinity` globally and wondering why data never updates

---

## Banners

| Topic | File | Theme color |
|---|---|---|
| react-router-advanced | `src/topics/banners/react-ecosystem/RouterAdvancedBanner.tsx` | `#38bdf8` |
| react-data-fetching | `src/topics/banners/react-ecosystem/DataFetchingBanner.tsx` | `#34d399` |
| react-mutations | `src/topics/banners/react-ecosystem/MutationsBanner.tsx` | `#f97316` |
| react-tanstack-query | `src/topics/banners/react-ecosystem/TanStackQueryBanner.tsx` | `#f43f5e` |

All banners: 780×220px inline SVG, same pattern as existing banners.

**RouterAdvancedBanner:** Left panel — library mode (BrowserRouter + Routes JSX tree); Center — framework mode (routes.js file icon → route module icon with loader/action/ErrorBoundary labels); Right — rendering strategy pills (CSR / SSR / SSG with brief descriptors).

**DataFetchingBanner:** Left panel — waterfall timeline (3 sequential bars, total = sum); Right panel — parallel timeline (3 bars starting simultaneously, total = longest). Center divider labelled "fetch-on-render vs render-as-you-fetch".

**MutationsBanner:** Left panel — classic onSubmit flow (form → preventDefault → fetch → setState); Right panel — React 19 action flow (form → action(FormData) → result). Center — useFormStatus pending indicator diagram.

**TanStackQueryBanner:** Left panel — no cache (repeated fetch arrows on each navigation); Center — QueryClient cache diagram (query key → cached result, stale/fresh indicator); Right — mutation + invalidate cycle (mutate → onSuccess → invalidateQueries → refetch).

---

## TOPIC_ICONS and TOPIC_LABELS

```
TOPIC_ICONS:
  'react-router-advanced': 'Network'
  'react-data-fetching':   'Download'
  'react-mutations':       'Send'
  'react-tanstack-query':  'Database'

TOPIC_LABELS:
  'react-router-advanced': 'Router Advanced'
  'react-data-fetching':   'Data Fetching'
  'react-mutations':       'Data Mutations'
  'react-tanstack-query':  'TanStack Query'
```

---

## Files Modified / Created

| File | Change |
|------|--------|
| `src/data/topics.ts` | Add 4 topic blocks |
| `src/data/categories.ts` | Add `react-ecosystem` to `CATEGORIES`; add to `CATEGORY_GROUPS` (frameworks-web); add to `TECH_SECTION_META`; add 4 topics to `TOPIC_ICONS` and `TOPIC_LABELS` (see values below) |
| `src/i18n/locales/en/topics-other.json` | Add 4 topics with all steps |
| `src/i18n/locales/de/topics-other.json` | Add 4 topics with all steps (DE) |
| `src/i18n/locales/en/categories.json` | Add `react-ecosystem` + 4 `topicLabels` |
| `src/i18n/locales/de/categories.json` | Add `react-ecosystem` + 4 `topicLabels` |
| `src/topics/banners/react-ecosystem/RouterAdvancedBanner.tsx` | New SVG banner |
| `src/topics/banners/react-ecosystem/DataFetchingBanner.tsx` | New SVG banner |
| `src/topics/banners/react-ecosystem/MutationsBanner.tsx` | New SVG banner |
| `src/topics/banners/react-ecosystem/TanStackQueryBanner.tsx` | New SVG banner |
| `src/topics/registry.ts` | Add 4 banners to `bannerLazyRegistry` |
