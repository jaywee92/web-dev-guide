# WBS React Enrichment Implementation Plan

> ✅ **COMPLETED** — implemented and deployed to main

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 10 new explanation steps across 4 existing React topics from WBS `wbs-sources/new/React/` and `wbs-sources/new/React Router/` source material.

**Architecture:** Edit `src/data/topics.ts` to add structural explanation steps, then add matching translatable entries to `src/i18n/locales/en/topics-other.json` and `src/i18n/locales/de/topics-other.json`. No new files, no new components. Pattern is identical to WBS Batch 1–3.

**Tech Stack:** TypeScript, React, i18next. All text via i18n locale JSON; code examples in topics.ts only.

---

## Pre-flight Audit (READ FIRST)

Confirm current step counts by running:

```bash
python3 -c "
import re
topics = ['react-components', 'react-state', 'react-useeffect', 'react-router']
with open('src/data/topics.ts') as f:
    content = f.read()
for tid in topics:
    match = re.search(rf\"id: '{tid}'\", content)
    if match:
        chunk = content[match.start():match.start()+6000]
        steps = re.findall(r'animationStep: (\d+)', chunk)
        print(f'{tid}: {len(steps)} steps (0-{max(int(s) for s in steps)})')
"
```

Expected output:
```
react-components: 5 steps (0-4)
react-state: 5 steps (0-4)
react-useeffect: 5 steps (0-4)
react-router: 5 steps (0-4)
```

**Topic locations in `src/data/topics.ts`:**
- `react-components`: ~line 4157
- `react-state`: ~line 4238
- `react-useeffect`: ~line 4318
- `react-router`: ~line 4644

**Locale file:** All 4 React topics live in `src/i18n/locales/en/topics-other.json` and `src/i18n/locales/de/topics-other.json`.

---

## Chunk 1: topics.ts — react-components & react-state

### Task 1: Add steps 5–7 to react-components

**Files:**
- Modify: `src/data/topics.ts` (inside `react-components` > `sections[1].steps` array, after animationStep 4)

Find the `react-components` topic (search for `id: 'react-components'`). Inside the `explanation` section's `steps` array, the last step is:

```typescript
          {
            animationStep: 4,
            icon: '📨',
            heading: 'Props — data flows down',
            ...
          },
```

- [x] **Step 1: Add steps 5–7 after animationStep 4 in react-components**

Insert the following 3 objects after the animationStep 4 object (before the closing `],` of the steps array):

```typescript
          {
            animationStep: 5,
            icon: '🖱️',
            heading: 'Events',
            text: 'React uses camelCase event props (onClick, onChange, onSubmit). You pass a function reference — not a call. React wraps the native event in a SyntheticEvent that works the same across all browsers.',
            codeExample: `function Form() {\n  function handleSubmit(e) {\n    e.preventDefault()   // stop page reload\n    console.log('submitted')\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input onChange={e => console.log(e.target.value)} />\n      <button onClick={() => alert('clicked!')}>Send</button>\n    </form>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 6,
            icon: '🔀',
            heading: 'Conditional Rendering',
            text: 'Use plain JavaScript inside JSX to conditionally show UI. Ternary for either/or, && for show-or-nothing, early return for complex branches.',
            codeExample: `function Status({ isLoggedIn, isLoading }) {\n  if (isLoading) return <Spinner />          // early return\n\n  return (\n    <div>\n      {isLoggedIn ? <Dashboard /> : <Login />}  {/* ternary */}\n      {isLoggedIn && <Logout />}               {/* && */}\n    </div>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 7,
            icon: '📋',
            heading: 'Rendering Lists',
            text: 'Use .map() to turn an array into JSX elements. Every sibling in a list needs a stable key prop — React uses it to track which items changed. Use a unique ID from your data, never the array index.',
            codeExample: `const products = [\n  { id: 1, name: 'Keyboard', price: 79 },\n  { id: 2, name: 'Mouse',    price: 39 },\n]\n\nfunction ProductList() {\n  return (\n    <ul>\n      {products.map(p => (\n        <li key={p.id}>               {/* stable ID as key */}\n          {p.name} — €{p.price}\n        </li>\n      ))}\n    </ul>\n  )\n}`,
            language: 'jsx',
          },
```

- [x] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit 2>&1 | grep "error TS" | grep -v supabase; echo "done"
```

Expected: only `done` (no errors).

- [x] **Step 3: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add Events, Conditional Rendering, Rendering Lists steps to react-components"
```

---

### Task 2: Add steps 5–7 to react-state

**Files:**
- Modify: `src/data/topics.ts` (inside `react-state` > `sections[1].steps` array, after animationStep 4)

Find `id: 'react-state'`. The last step is:

```typescript
          {
            animationStep: 4,
            icon: '📏',
            heading: 'Rules of Hooks',
            ...
          },
```

- [x] **Step 1: Add steps 5–7 after animationStep 4 in react-state**

```typescript
          {
            animationStep: 5,
            icon: '⏮️',
            heading: 'Updater functions',
            text: 'When the new state depends on the previous value, pass a function to the setter instead of a value. React calls it with the most recent state — even if multiple updates were batched.',
            codeExample: `// ❌ Unreliable when batched:\nsetCount(count + 1)\nsetCount(count + 1)  // both read the same stale 'count'\n\n// ✅ Always correct:\nsetCount(prev => prev + 1)\nsetCount(prev => prev + 1)  // each sees the latest value\n\n// Common use-cases:\nsetItems(prev => [...prev, newItem])          // add to array\nsetItems(prev => prev.filter(i => i.id !== id)) // remove`,
            language: 'javascript',
          },
          {
            animationStep: 6,
            icon: '📦',
            heading: 'State with objects & arrays',
            text: 'Never mutate state directly — React won\'t detect the change. Always create a new object or array using spread. For objects: spread and override. For arrays: use map, filter, or spread.',
            codeExample: `const [form, setForm] = useState({ name: '', email: '' })\n\n// ✅ Spread creates a new object:\nsetForm(prev => ({ ...prev, email: e.target.value }))\n\n// ❌ Direct mutation — React ignores this:\nform.email = e.target.value  // never!\n\n// Controlled input wired to object state:\n<input\n  value={form.email}\n  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}\n/>`,
            language: 'javascript',
          },
          {
            animationStep: 7,
            icon: '⬆️',
            heading: 'Lifting state up',
            text: 'Siblings cannot share state directly. Lift state to their closest common parent. The parent owns the state and passes it down via props — along with the setter so children can trigger updates.',
            codeExample: `// Parent owns the state:\nfunction App() {\n  const [theme, setTheme] = useState('light')\n  return (\n    <>\n      <Toggle theme={theme} onToggle={() =>\n        setTheme(t => t === 'light' ? 'dark' : 'light')\n      } />\n      <Page theme={theme} />   {/* receives value */}\n      <Footer theme={theme} /> {/* receives value */}\n    </>\n  )\n}`,
            language: 'javascript',
          },
```

- [x] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit 2>&1 | grep "error TS" | grep -v supabase; echo "done"
```

Expected: only `done`.

- [x] **Step 3: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add Updater functions, Object/Array state, Lifting state steps to react-state"
```

---

## Chunk 2: topics.ts — react-useeffect & react-router

### Task 3: Add steps 5–6 to react-useeffect

**Files:**
- Modify: `src/data/topics.ts` (inside `react-useeffect` > `sections[1].steps` array, after animationStep 4)

Find `id: 'react-useeffect'`. Last step is animationStep 4 "Common use cases".

- [x] **Step 1: Add steps 5–6 after animationStep 4 in react-useeffect**

```typescript
          {
            animationStep: 5,
            icon: '🏁',
            heading: 'Fetching & race conditions',
            text: 'When fetching inside useEffect, a fast second request can resolve before a slow first one — causing stale data to win. Fix it: set an ignore flag in the cleanup function so only the latest request updates state.',
            codeExample: `useEffect(() => {\n  let ignore = false          // reset each time effect runs\n\n  async function fetchUser() {\n    const res = await fetch(\`/api/users/\${userId}\`)\n    const data = await res.json()\n    if (!ignore) setUser(data) // skip if already cleaned up\n  }\n\n  fetchUser()\n  return () => { ignore = true } // cleanup: ignore stale response\n}, [userId])`,
            language: 'javascript',
          },
          {
            animationStep: 6,
            icon: '🚫',
            heading: 'When NOT to use useEffect',
            text: 'useEffect is for syncing with external systems. Avoid it for: (1) derived values — compute them during render instead; (2) event-triggered side effects — put them in the handler; (3) chained state updates — they cause double renders.',
            codeExample: `// ❌ Don't use useEffect to derive values:\nuseEffect(() => {\n  setFullName(firstName + ' ' + lastName)\n}, [firstName, lastName])\n\n// ✅ Just compute during render:\nconst fullName = firstName + ' ' + lastName\n\n// ❌ Don't use useEffect for event side effects:\nuseEffect(() => { sendAnalytics(page) }, [page])\n\n// ✅ Put it in the event handler:\nfunction handleNavClick() {\n  navigate(page)\n  sendAnalytics(page)  // side effect belongs here\n}`,
            language: 'javascript',
          },
```

- [x] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit 2>&1 | grep "error TS" | grep -v supabase; echo "done"
```

- [x] **Step 3: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add Fetch race conditions and When NOT to use useEffect steps to react-useeffect"
```

---

### Task 4: Add steps 5–6 to react-router

**Files:**
- Modify: `src/data/topics.ts` (inside `react-router` > `sections[1].steps` array, after animationStep 4)

Find `id: 'react-router'` (~line 4644). Last step is animationStep 4 "useParams — dynamic segments".

- [x] **Step 1: Add steps 5–6 after animationStep 4 in react-router**

```typescript
          {
            animationStep: 5,
            icon: '🏗️',
            heading: 'Layout routes & Outlet',
            text: 'Nest child routes inside a parent Route that renders shared UI (navbar, sidebar). The parent component uses <Outlet /> as a placeholder — React Router renders the matched child route there.',
            codeExample: `// Route config — children nested inside layout:\n<Routes>\n  <Route path="/app" element={<AppLayout />}>\n    <Route index element={<Dashboard />} />\n    <Route path="settings" element={<Settings />} />\n  </Route>\n</Routes>\n\n// AppLayout.tsx:\nfunction AppLayout() {\n  return (\n    <div>\n      <Navbar />        {/* shared across all children */}\n      <Outlet />        {/* child route renders here */}\n    </div>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 6,
            icon: '🧭',
            heading: 'Index routes & useNavigate',
            text: 'An index route is the default child — it renders when the parent path matches exactly. useNavigate lets you navigate programmatically: after form submission, login, or any event.',
            codeExample: `// Index route = default child at /app:\n<Route path="/app" element={<AppLayout />}>\n  <Route index element={<Dashboard />} />     {/* /app */}\n  <Route path="settings" element={<Settings />} /> {/* /app/settings */}\n</Route>\n\n// Programmatic navigation:\nfunction LoginForm() {\n  const navigate = useNavigate()\n\n  async function handleSubmit(e) {\n    e.preventDefault()\n    await login(credentials)\n    navigate('/app', { replace: true })  // replace history entry\n  }\n}`,
            language: 'jsx',
          },
```

- [x] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit 2>&1 | grep "error TS" | grep -v supabase; echo "done"
```

- [x] **Step 3: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add Layout routes/Outlet and Index routes/useNavigate steps to react-router"
```

---

## Chunk 3: EN Locale

### Task 5: Add EN locale entries for all 10 new steps

**Files:**
- Modify: `src/i18n/locales/en/topics-other.json`

The React topic keys live in this file. Each topic has a `"steps"` array. Add new step objects at the END of each steps array (after the existing animationStep 4 object).

**Pattern:** Only `animationStep`, `heading`, and `text` fields. No `icon`, no `codeExample` (those live in topics.ts only).

- [x] **Step 1: Add steps 5–7 to react-components steps array**

Find `"react-components"` key (~line 436). Add after animationStep 4:

```json
      {
        "animationStep": 5,
        "heading": "Events",
        "text": "React uses camelCase event props (onClick, onChange, onSubmit). You pass a function reference — not a call. React wraps the native event in a SyntheticEvent that works the same across all browsers."
      },
      {
        "animationStep": 6,
        "heading": "Conditional Rendering",
        "text": "Use plain JavaScript inside JSX to conditionally show UI. Ternary for either/or, && for show-or-nothing, early return for complex branches."
      },
      {
        "animationStep": 7,
        "heading": "Rendering Lists",
        "text": "Use .map() to turn an array into JSX elements. Every sibling in a list needs a stable key prop — React uses it to track which items changed. Use a unique ID from your data, never the array index."
      }
```

- [x] **Step 2: Add steps 5–7 to react-state steps array**

Find `"react-state"` key (~line 466). Add after animationStep 4:

```json
      {
        "animationStep": 5,
        "heading": "Updater functions",
        "text": "When the new state depends on the previous value, pass a function to the setter instead of a value. React calls it with the most recent state — even if multiple updates were batched."
      },
      {
        "animationStep": 6,
        "heading": "State with objects & arrays",
        "text": "Never mutate state directly — React won't detect the change. Always create a new object or array using spread. For objects: spread and override. For arrays: use map, filter, or spread."
      },
      {
        "animationStep": 7,
        "heading": "Lifting state up",
        "text": "Siblings cannot share state directly. Lift state to their closest common parent. The parent owns the state and passes it down via props — along with the setter so children can trigger updates."
      }
```

- [x] **Step 3: Add steps 5–6 to react-useeffect steps array**

Find `"react-useeffect"` key (~line 495). Add after animationStep 4:

```json
      {
        "animationStep": 5,
        "heading": "Fetching & race conditions",
        "text": "When fetching inside useEffect, a fast second request can resolve before a slow first one — causing stale data to win. Fix it: set an ignore flag in the cleanup function so only the latest request updates state."
      },
      {
        "animationStep": 6,
        "heading": "When NOT to use useEffect",
        "text": "useEffect is for syncing with external systems. Avoid it for: (1) derived values — compute them during render instead; (2) event-triggered side effects — put them in the handler; (3) chained state updates — they cause double renders."
      }
```

- [x] **Step 4: Add steps 5–6 to react-router steps array**

Find `"react-router"` key (~line 524). Add after animationStep 4:

```json
      {
        "animationStep": 5,
        "heading": "Layout routes & Outlet",
        "text": "Nest child routes inside a parent Route that renders shared UI (navbar, sidebar). The parent component uses <Outlet /> as a placeholder — React Router renders the matched child route there."
      },
      {
        "animationStep": 6,
        "heading": "Index routes & useNavigate",
        "text": "An index route is the default child — it renders when the parent path matches exactly. useNavigate lets you navigate programmatically: after form submission, login, or any event."
      }
```

- [x] **Step 5: Validate JSON is valid**

```bash
python3 -m json.tool src/i18n/locales/en/topics-other.json > /dev/null && echo "valid JSON"
```

Expected: `valid JSON`

- [x] **Step 6: Commit**

```bash
git add src/i18n/locales/en/topics-other.json
git commit -m "feat: add EN locale for 10 new React explanation steps"
```

---

## Chunk 4: DE Locale

### Task 6: Add DE locale entries for all 10 new steps

**Files:**
- Modify: `src/i18n/locales/de/topics-other.json`

Same structure as EN. React topic keys at ~line 440 (react-components), ~470 (react-state), ~499 (react-useeffect), ~528 (react-router).

- [x] **Step 1: Add steps 5–7 to react-components (DE)**

Find `"react-components"` (~line 440). Add after animationStep 4:

```json
      {
        "animationStep": 5,
        "heading": "Events",
        "text": "React verwendet camelCase-Event-Props (onClick, onChange, onSubmit). Du übergibst eine Funktionsreferenz – keinen Aufruf. React kapselt das native Event in ein SyntheticEvent, das in allen Browsern gleich funktioniert."
      },
      {
        "animationStep": 6,
        "heading": "Conditional Rendering",
        "text": "Verwende einfaches JavaScript innerhalb von JSX, um UI bedingt anzuzeigen. Ternary für entweder/oder, && für zeigen-oder-nichts, Early Return für komplexe Verzweigungen."
      },
      {
        "animationStep": 7,
        "heading": "Listen rendern",
        "text": "Verwende .map(), um ein Array in JSX-Elemente umzuwandeln. Jedes Element in einer Liste benötigt eine stabile key-Prop – React nutzt sie, um Änderungen zu verfolgen. Verwende eine eindeutige ID aus deinen Daten, nie den Array-Index."
      }
```

- [x] **Step 2: Add steps 5–7 to react-state (DE)**

Find `"react-state"` (~line 470). Add after animationStep 4:

```json
      {
        "animationStep": 5,
        "heading": "Updater-Funktionen",
        "text": "Wenn der neue State vom vorherigen Wert abhängt, übergib dem Setter eine Funktion statt eines Wertes. React ruft sie mit dem aktuellsten State auf – selbst wenn mehrere Updates gebatcht wurden."
      },
      {
        "animationStep": 6,
        "heading": "State mit Objekten & Arrays",
        "text": "State niemals direkt mutieren – React erkennt die Änderung nicht. Erstelle immer ein neues Objekt oder Array mit dem Spread-Operator. Für Objekte: spreaden und überschreiben. Für Arrays: map, filter oder spread verwenden."
      },
      {
        "animationStep": 7,
        "heading": "State hochheben",
        "text": "Geschwisterkomponenten können State nicht direkt teilen. Hebe den State zum nächsten gemeinsamen Elternteil hoch. Der Elternteil besitzt den State und gibt ihn über Props weiter – zusammen mit dem Setter, damit Kinder Updates auslösen können."
      }
```

- [x] **Step 3: Add steps 5–6 to react-useeffect (DE)**

Find `"react-useeffect"` (~line 499). Add after animationStep 4:

```json
      {
        "animationStep": 5,
        "heading": "Fetching & Race Conditions",
        "text": "Beim Fetching innerhalb von useEffect kann eine schnelle zweite Anfrage vor einer langsamen ersten abgeschlossen werden – und veraltete Daten gewinnen. Lösung: Setze ein ignore-Flag in der Cleanup-Funktion, damit nur die neueste Anfrage den State aktualisiert."
      },
      {
        "animationStep": 6,
        "heading": "Wann useEffect NICHT verwendet werden sollte",
        "text": "useEffect ist zum Synchronisieren mit externen Systemen gedacht. Vermeide es für: (1) abgeleitete Werte – berechne sie stattdessen beim Rendern; (2) event-gesteuerte Seiteneffekte – platziere sie im Handler; (3) verkettete State-Updates – sie verursachen doppelte Renders."
      }
```

- [x] **Step 4: Add steps 5–6 to react-router (DE)**

Find `"react-router"` (~line 528). Add after animationStep 4:

```json
      {
        "animationStep": 5,
        "heading": "Layout-Routen & Outlet",
        "text": "Verschachtle Kind-Routen innerhalb einer Eltern-Route, die gemeinsame UI rendert (Navbar, Sidebar). Die Elternkomponente verwendet <Outlet /> als Platzhalter – React Router rendert die passende Kind-Route dort."
      },
      {
        "animationStep": 6,
        "heading": "Index-Routen & useNavigate",
        "text": "Eine Index-Route ist das Standard-Kind – sie rendert, wenn der Elternpfad genau übereinstimmt. useNavigate ermöglicht programmatische Navigation: nach dem Absenden eines Formulars, Login oder anderen Events."
      }
```

- [x] **Step 5: Validate JSON**

```bash
python3 -m json.tool src/i18n/locales/de/topics-other.json > /dev/null && echo "valid JSON"
```

Expected: `valid JSON`

- [x] **Step 6: Commit**

```bash
git add src/i18n/locales/de/topics-other.json
git commit -m "feat: add DE locale for 10 new React explanation steps"
```

---

## Chunk 5: Final Check

### Task 7: TypeScript check & push

**Files:** None (verification only)

- [x] **Step 1: Full TypeScript check**

```bash
npx tsc --noEmit 2>&1 | grep "error TS" | grep -v supabase; echo "done"
```

Expected: only `done`.

- [x] **Step 2: Verify step counts**

```bash
python3 -c "
import re
topics = ['react-components', 'react-state', 'react-useeffect', 'react-router']
with open('src/data/topics.ts') as f:
    content = f.read()
for tid in topics:
    match = re.search(rf\"id: '{tid}'\", content)
    if match:
        chunk = content[match.start():match.start()+8000]
        steps = re.findall(r'animationStep: (\d+)', chunk)
        print(f'{tid}: {len(steps)} steps (0-{max(int(s) for s in steps)})')
"
```

Expected:
```
react-components: 8 steps (0-7)
react-state: 8 steps (0-7)
react-useeffect: 7 steps (0-6)
react-router: 7 steps (0-6)
```

- [x] **Step 3: Push**

```bash
git push origin main
```
