# React Context & useReducer Implementation Plan

> ✅ **COMPLETED** — implemented and deployed to main

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `react-context` topic (Context API + useReducer, 7 steps) to the React category, complete with banner, EN/DE locale, and category wiring.

**Architecture:** New topic block in `src/data/topics.ts` after `react-router`, wired into `categories.ts`, locale JSON files, and the banner registry. No new visualisation component — banner only (same pattern as `js-npm-bundlers`). All heading/text copy lives in locale JSON; code examples stay in topics.ts.

**Tech Stack:** TypeScript, React, i18next, inline SVG (TSX banner).

---

## Pre-flight

Verify current state before starting:

```bash
cd /home/jaywee92/web-dev-guide
python3 -c "
import re
with open('src/data/topics.ts') as f: c = f.read()
m = re.search(r\"id: 'react-router'\", c)
chunk = c[m.start():m.start()+200]
print('nextTopicId in router:', 'nextTopicId' in chunk)
"
# Expected: nextTopicId in router: False
```

---

## Chunk 1: topics.ts

### Task 1: Add react-context topic block + patch react-router.nextTopicId

**Files:**
- Modify: `src/data/topics.ts`

The `react-router` topic starts at ~line 4708. It currently has NO `nextTopicId` field.
Insert `react-context` block between the closing `},` of `react-router` and the `// ─── Git` comment.

- [x] **Step 1: Patch react-router — add nextTopicId**

Find the line `id: 'react-router',` and add `nextTopicId: 'react-context',` on the next line.

The block currently starts:
```typescript
    id: 'react-router',
    title: 'React Router',
```

Change to:
```typescript
    id: 'react-router',
    nextTopicId: 'react-context',
    title: 'React Router',
```

- [x] **Step 2: Insert react-context topic block before `// ─── Git`**

Insert the following block immediately before `  // ─── Git ──────` (which follows the closing `},` of react-router):

```typescript
  // ─── React Context ────────────────────────────────────────────────────────
  {
    id: 'react-context',
    title: 'Context & useReducer',
    description: 'Share state across the component tree without prop drilling — and manage complex state with useReducer',
    category: 'react',
    color: '#f472b6',
    estimatedMinutes: 14,
    animationComponent: undefined,
    bannerComponent: 'ContextBanner',
    playgroundType: 'monaco',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            icon: '🔗',
            heading: 'Prop drilling',
            text: 'Prop drilling is passing data through intermediate components that don\'t use it — just so a deeply nested child can receive it. As trees grow, every layer must declare and forward props it doesn\'t care about.',
            codeExample: `// 😩 Every layer forwards 'user' even though only Avatar uses it:\nfunction App() {\n  const user = { name: 'Ana' }\n  return <Layout user={user} />       // doesn't need user\n}\nfunction Layout({ user }) {\n  return <Sidebar user={user} />     // doesn't need user\n}\nfunction Sidebar({ user }) {\n  return <Avatar user={user} />      // finally used here!\n}`,
            language: 'jsx',
          },
          {
            animationStep: 1,
            icon: '🏭',
            heading: 'createContext & Provider',
            text: 'createContext() creates the context object. Wrap the subtree that needs access with <XContext.Provider value={...}>. Every component inside can read that value directly — no matter how deep.',
            codeExample: `import { createContext, useState } from 'react'\n\n// 1. Create context (default used when no Provider exists above)\nconst UserContext = createContext(null)\n\n// 2. Wrap the tree — value is available to all descendants\nfunction App() {\n  const [user] = useState({ name: 'Ana', avatar: '/ana.jpg' })\n  return (\n    <UserContext.Provider value={user}>\n      <Layout />    {/* no user prop needed */}\n    </UserContext.Provider>\n  )\n}`,
            language: 'jsx',
          },
          {
            animationStep: 2,
            icon: '🪝',
            heading: 'useContext',
            text: 'useContext(MyContext) reads the nearest Provider above and returns its value. The component re-renders automatically when the value changes. Any component can consume — no prop passing required.',
            codeExample: `import { useContext } from 'react'\n\n// Anywhere in the tree — no props received:\nfunction Avatar() {\n  const user = useContext(UserContext)\n  return <img src={user.avatar} alt={user.name} />\n}\n\n// Middle layers stay completely clean:\nfunction Layout()  { return <Sidebar /> }\nfunction Sidebar() { return <Avatar /> }`,
            language: 'jsx',
          },
          {
            animationStep: 3,
            icon: '✅',
            heading: 'When to use Context',
            text: 'Context works best for data that is truly global or shared across many components. Avoid it for frequently-changing data — every context value change re-renders all its consumers.',
            codeExample: `// ✅ Good candidates for Context:\n// - Auth state (current user, login / logout)\n// - Theme (dark / light mode)\n// - Locale / language\n// - User preferences\n\n// ❌ Avoid Context for:\n// - Data needed by only 1–2 siblings → lift state instead\n// - High-frequency updates (mouse position, scroll)\n//   → causes unnecessary re-renders in all consumers\n// - Complex app-wide state in large apps → Zustand / Redux`,
            language: 'javascript',
          },
          {
            animationStep: 4,
            icon: '⚙️',
            heading: 'useReducer — what & why',
            text: 'When useState manages multiple interrelated fields — like a cart with items, total, and count — every update must touch all of them consistently. useReducer centralises all transitions into one pure function: (state, action) => newState.',
            codeExample: `// ❌ useState: every action manually syncs multiple fields\nfunction addToCart(product) {\n  setCart(prev => ({\n    items: recalcItems(prev.items, product),\n    total: recalcTotal(...),   // easy to forget\n    count: recalcCount(...),   // easy to get wrong\n  }))\n}\n\n// ✅ useReducer: one function owns all transitions\ndispatch({ type: 'ADD_ITEM', payload: product })\n// cartReducer updates items + total + count atomically`,
            language: 'javascript',
          },
          {
            animationStep: 5,
            icon: '📨',
            heading: 'dispatch & actions',
            text: 'useReducer returns [state, dispatch]. Actions are plain objects with a type string and optional payload. The reducer switches on type and returns a new state object — never mutate existing state directly.',
            codeExample: `const initialState = { items: [], total: '€0.00', count: 0 }\n\nfunction cartReducer(state, action) {\n  switch (action.type) {\n    case 'ADD_ITEM':    return addItem(state, action.payload)\n    case 'REMOVE_ITEM': return removeItem(state, action.payload)\n    case 'CLEAR_CART':  return initialState\n    default:            return state\n  }\n}\n\nconst [cart, dispatch] = useReducer(cartReducer, initialState)\n\n// Trigger a state transition:\ndispatch({ type: 'ADD_ITEM', payload: { id: 1, name: 'Keyboard', price: 79 } })\ndispatch({ type: 'CLEAR_CART' })`,
            language: 'javascript',
          },
          {
            animationStep: 6,
            icon: '🔄',
            heading: 'Reducer + Context together',
            text: 'Combine both patterns: put useReducer inside a Provider and expose [state, dispatch] through context. Any child can read state or fire actions without prop drilling. A custom hook gives consumers a clean, error-safe API.',
            codeExample: `const CartContext = createContext(null)\n\nexport function CartProvider({ children }) {\n  const [state, dispatch] = useReducer(cartReducer, initialState)\n  return (\n    <CartContext.Provider value={{ state, dispatch }}>\n      {children}\n    </CartContext.Provider>\n  )\n}\n\n// Custom hook — throws if used outside CartProvider:\nexport function useCart() {\n  const ctx = useContext(CartContext)\n  if (!ctx) throw new Error('useCart must be inside CartProvider')\n  return ctx\n}\n\n// Usage anywhere in the tree:\nfunction ProductCard({ product }) {\n  const { dispatch } = useCart()\n  return (\n    <button onClick={() =>\n      dispatch({ type: 'ADD_ITEM', payload: product })\n    }>Add to cart</button>\n  )\n}`,
            language: 'jsx',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'createContext', code: 'const MyContext = createContext(defaultValue)', note: 'defaultValue is used only when no Provider exists above' },
        { label: 'Provider', code: '<MyContext.Provider value={data}>\n  <ChildTree />\n</MyContext.Provider>', note: 'All descendants can read value' },
        { label: 'useContext', code: 'const value = useContext(MyContext)', note: 'Re-renders when value changes' },
        { label: 'Custom context hook', code: 'export function useMyCtx() {\n  const ctx = useContext(MyContext)\n  if (!ctx) throw new Error("Must be inside MyProvider")\n  return ctx\n}', note: 'Throws early — avoids silent null errors' },
        { label: 'useReducer', code: 'const [state, dispatch] = useReducer(reducer, initialState)', note: 'dispatch has a stable identity across renders' },
        { label: 'Action object', code: 'dispatch({ type: "ADD_ITEM", payload: item })\ndispatch({ type: "CLEAR_CART" })', note: 'type is required; payload is optional' },
        { label: 'Reducer + Context Provider', code: 'export function CartProvider({ children }) {\n  const [state, dispatch] = useReducer(cartReducer, initial)\n  return (\n    <CartContext.Provider value={{ state, dispatch }}>\n      {children}\n    </CartContext.Provider>\n  )\n}', note: 'Standard pattern for app-level state without a library' },
      ],
      patterns: [
        { title: 'Full reducer + context setup', code: '// 1. Create context\nconst CartContext = createContext(null)\n\n// 2. Reducer\nfunction cartReducer(state, action) {\n  switch (action.type) {\n    case "ADD_ITEM":   return { ...state, items: [...state.items, action.payload] }\n    case "CLEAR_CART": return { items: [] }\n    default:           return state\n  }\n}\n\n// 3. Provider wraps the app\nexport function CartProvider({ children }) {\n  const [state, dispatch] = useReducer(cartReducer, { items: [] })\n  return (\n    <CartContext.Provider value={{ state, dispatch }}>\n      {children}\n    </CartContext.Provider>\n  )\n}\n\n// 4. Custom hook for clean consumption\nexport const useCart = () => {\n  const ctx = useContext(CartContext)\n  if (!ctx) throw new Error("useCart outside CartProvider")\n  return ctx\n}', language: 'tsx' },
      ],
      whenToUse: 'Use Context when state needs to be accessible by many components at different nesting levels. Combine with useReducer when that shared state involves complex transitions — multiple fields updated together, or many distinct action types.',
      commonMistakes: [
        'Putting fast-changing values in context (every change re-renders all consumers — split into separate contexts or use a state library)',
        'Forgetting to throw in the custom hook when context is null — silent undefined errors are hard to debug; always guard with an early throw',
        'Using one giant context for unrelated state — split into focused contexts (CartContext, AuthContext, ThemeContext) so unrelated updates don\'t trigger unnecessary re-renders',
      ],
    },
  },
```

- [x] **Step 3: Verify TypeScript compiles cleanly**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep "error TS" | grep -v supabase; echo "done"
```

Expected: only `done`.

- [x] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide && git add src/data/topics.ts && git commit -m "feat: add react-context topic and patch react-router nextTopicId"
```

---

## Chunk 2: categories.ts

### Task 2: Wire react-context in categories.ts

**Files:**
- Modify: `src/data/categories.ts`

Three edits in the same file:

- [x] **Step 1: Add react-context to react.topicIds**

Find `topicIds: ['react-components', 'react-state', 'react-useeffect', 'react-router'],` (line ~147).

Change to:
```typescript
    topicIds: ['react-components', 'react-state', 'react-useeffect', 'react-router', 'react-context'],
```

- [x] **Step 2: Add react-context to TOPIC_ICONS**

Find `'react-router':              'Route',` in the `TOPIC_ICONS` object. Add after it:
```typescript
  'react-context':             'Share2',
```

- [x] **Step 3: Add react-context to TOPIC_LABELS**

Find `'react-router':                'Router',` in the `TOPIC_LABELS` object. Add after it:
```typescript
  'react-context':               'Context & useReducer',
```

- [x] **Step 4: Verify TypeScript compiles cleanly**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep "error TS" | grep -v supabase; echo "done"
```

Expected: only `done`.

- [x] **Step 5: Commit**

```bash
cd /home/jaywee92/web-dev-guide && git add src/data/categories.ts && git commit -m "feat: wire react-context in categories.ts"
```

---

## Chunk 3: Locale JSON

### Task 3: Add EN locale for react-context (7 steps)

**Files:**
- Modify: `src/i18n/locales/en/topics-other.json`

The React topics end at the `react-router` key (~line 532). Add `react-context` after the closing `}` of `react-router` (and before whatever comes next).

**Pattern:** Only `animationStep`, `heading`, `text` — no `icon`, no `codeExample`.

- [x] **Step 1: Add react-context entry to EN topics-other.json**

Find the `"react-router"` key and its closing `}`. Insert after it:

```json
  "react-context": {
    "steps": [
      {
        "animationStep": 0,
        "heading": "Prop drilling",
        "text": "Prop drilling is passing data through intermediate components that don't use it — just so a deeply nested child can receive it. As trees grow, every layer must declare and forward props it doesn't care about."
      },
      {
        "animationStep": 1,
        "heading": "createContext & Provider",
        "text": "createContext() creates the context object. Wrap the subtree that needs access with <XContext.Provider value={...}>. Every component inside can read that value directly — no matter how deep."
      },
      {
        "animationStep": 2,
        "heading": "useContext",
        "text": "useContext(MyContext) reads the nearest Provider above and returns its value. The component re-renders automatically when the value changes. Any component can consume — no prop passing required."
      },
      {
        "animationStep": 3,
        "heading": "When to use Context",
        "text": "Context works best for data that is truly global or shared across many components. Avoid it for frequently-changing data — every context value change re-renders all its consumers."
      },
      {
        "animationStep": 4,
        "heading": "useReducer — what & why",
        "text": "When useState manages multiple interrelated fields — like a cart with items, total, and count — every update must touch all of them consistently. useReducer centralises all transitions into one pure function: (state, action) => newState."
      },
      {
        "animationStep": 5,
        "heading": "dispatch & actions",
        "text": "useReducer returns [state, dispatch]. Actions are plain objects with a type string and optional payload. The reducer switches on type and returns a new state object — never mutate existing state directly."
      },
      {
        "animationStep": 6,
        "heading": "Reducer + Context together",
        "text": "Combine both patterns: put useReducer inside a Provider and expose [state, dispatch] through context. Any child can read state or fire actions without prop drilling. A custom hook gives consumers a clean, error-safe API."
      }
    ]
  },
```

- [x] **Step 2: Validate JSON**

```bash
cd /home/jaywee92/web-dev-guide && python3 -m json.tool src/i18n/locales/en/topics-other.json > /dev/null && echo "valid JSON"
```

Expected: `valid JSON`

- [x] **Step 3: Commit**

```bash
cd /home/jaywee92/web-dev-guide && git add src/i18n/locales/en/topics-other.json && git commit -m "feat: add EN locale for react-context (7 steps)"
```

---

### Task 4: Add DE locale for react-context (7 steps)

**Files:**
- Modify: `src/i18n/locales/de/topics-other.json`

Same structure as EN. React topics end at `react-router` (~line 528).

- [x] **Step 1: Add react-context entry to DE topics-other.json**

Find `"react-router"` and its closing `}`. Insert after it:

```json
  "react-context": {
    "steps": [
      {
        "animationStep": 0,
        "heading": "Prop Drilling",
        "text": "Prop Drilling bedeutet, Daten durch Zwischenkomponenten weiterzureichen, die sie gar nicht brauchen – nur damit ein tief verschachteltes Kind sie erhält. Mit wachsenden Bäumen muss jede Schicht Props deklarieren und weiterleiten, die sie selbst nicht verwendet."
      },
      {
        "animationStep": 1,
        "heading": "createContext & Provider",
        "text": "createContext() erstellt das Context-Objekt. Umschließe den Teilbaum, der Zugriff benötigt, mit <XContext.Provider value={...}>. Alle Komponenten darin können diesen Wert direkt lesen – egal wie tief sie verschachtelt sind."
      },
      {
        "animationStep": 2,
        "heading": "useContext",
        "text": "useContext(MyContext) liest den nächsten Provider darüber im Baum und gibt seinen Wert zurück. Die Komponente rendert automatisch neu, wenn sich der Wert ändert. Jede Komponente kann konsumieren – kein Prop-Passing erforderlich."
      },
      {
        "animationStep": 3,
        "heading": "Wann Context verwenden",
        "text": "Context eignet sich am besten für Daten, die wirklich global sind oder von vielen Komponenten geteilt werden. Vermeide ihn für häufig ändernde Daten – jede Context-Wert-Änderung rendert alle Konsumenten neu."
      },
      {
        "animationStep": 4,
        "heading": "useReducer – was & warum",
        "text": "Wenn useState mehrere zusammenhängende Felder verwaltet – z. B. einen Warenkorb mit Items, Gesamtpreis und Anzahl – muss jedes Update alle konsistent anfassen. useReducer zentralisiert alle Übergänge in einer reinen Funktion: (state, action) => newState."
      },
      {
        "animationStep": 5,
        "heading": "dispatch & Actions",
        "text": "useReducer gibt [state, dispatch] zurück. Actions sind einfache Objekte mit einem type-String und optionalem payload. Der Reducer switcht auf type und gibt ein neues State-Objekt zurück – den bestehenden State niemals direkt mutieren."
      },
      {
        "animationStep": 6,
        "heading": "Reducer + Context kombiniert",
        "text": "Beide Muster kombinieren: useReducer in einem Provider platzieren und [state, dispatch] über Context bereitstellen. Jedes Kind kann State lesen oder Actions auslösen – ohne Prop Drilling. Ein Custom Hook gibt Konsumenten eine saubere, fehlersichere API."
      }
    ]
  },
```

- [x] **Step 2: Validate JSON**

```bash
cd /home/jaywee92/web-dev-guide && python3 -m json.tool src/i18n/locales/de/topics-other.json > /dev/null && echo "valid JSON"
```

Expected: `valid JSON`

- [x] **Step 3: Commit**

```bash
cd /home/jaywee92/web-dev-guide && git add src/i18n/locales/de/topics-other.json && git commit -m "feat: add DE locale for react-context (7 steps)"
```

---

### Task 5: Add topicLabels to EN + DE categories.json

**Files:**
- Modify: `src/i18n/locales/en/categories.json`
- Modify: `src/i18n/locales/de/categories.json`

- [x] **Step 1: Add react-context to EN topicLabels**

In `src/i18n/locales/en/categories.json`, find `"react-router": "Router"` inside `topicLabels`. Add after it:

```json
    "react-context":             "Context & useReducer",
```

- [x] **Step 2: Add react-context to DE topicLabels**

In `src/i18n/locales/de/categories.json`, find `"react-router": "Router"` inside `topicLabels`. Add after it:

```json
    "react-context":             "Context & useReducer",
```

- [x] **Step 3: Validate both JSON files**

```bash
cd /home/jaywee92/web-dev-guide && python3 -m json.tool src/i18n/locales/en/categories.json > /dev/null && python3 -m json.tool src/i18n/locales/de/categories.json > /dev/null && echo "both valid"
```

Expected: `both valid`

- [x] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide && git add src/i18n/locales/en/categories.json src/i18n/locales/de/categories.json && git commit -m "feat: add react-context topicLabel to EN and DE categories.json"
```

---

## Chunk 4: Banner + Registry

### Task 6: Create ContextBanner.tsx

**Files:**
- Create: `src/topics/banners/react/ContextBanner.tsx`

Three-panel 780×220px SVG, pink theme `#f472b6`. Panels:
1. **Left** — prop drilling: 4-node tree, middle nodes greyed, "user" label on every connector
2. **Center** — context solution: same tree, Provider bracket on the left, `useContext()` arc bypassing middle nodes
3. **Right** — useReducer cycle: three boxes (state → dispatch → reducer) with arrows cycling back

- [x] **Step 1: Create ContextBanner.tsx**

```tsx
export default function ContextBanner() {
  const C = '#f472b6'

  const nodes = [
    { label: 'App',     y: 26 },
    { label: 'Layout',  y: 76 },
    { label: 'Sidebar', y: 126 },
    { label: 'Avatar',  y: 176 },
  ]

  return (
    <svg width="100%" viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', background: '#07101a' }}>
      <defs>
        <pattern id="dots-ctx" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="0.75" fill={`${C}18`} />
        </pattern>
        <radialGradient id="glow-ctx" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={C} stopOpacity="0.06" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="780" height="220" fill="url(#dots-ctx)" />
      <rect width="780" height="220" fill="url(#glow-ctx)" />

      {/* ── LEFT: Prop drilling ── */}
      <text x="110" y="14" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">PROP DRILLING</text>

      {nodes.map(({ label, y }, i) => {
        const isEndpoint = i === 0 || i === 3
        return (
          <g key={label}>
            <rect x="48" y={y} width="124" height="30" rx="5"
              fill={isEndpoint ? `${C}15` : 'rgba(255,255,255,0.03)'}
              stroke={isEndpoint ? `${C}50` : 'rgba(255,255,255,0.1)'}
              strokeWidth="1.2" />
            <text x="110" y={y + 19} fontSize="10" fontFamily="monospace" textAnchor="middle"
              fill={isEndpoint ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)'}>
              {label}
            </text>
          </g>
        )
      })}

      {/* Connectors with "user" labels */}
      {[56, 106, 156].map((y, i) => (
        <g key={y}>
          <line x1="110" y1={y} x2="110" y2={y + 18} stroke={i === 0 ? `${C}60` : 'rgba(255,255,255,0.15)'} strokeWidth="1.5" strokeDasharray={i > 0 ? '3 2' : '0'} />
          <polygon points={`106,${y + 18} 110,${y + 20} 114,${y + 18}`} fill={i === 0 ? `${C}60` : 'rgba(255,255,255,0.15)'} />
          <text x="120" y={y + 12} fontSize="8" fontFamily="monospace" fill={i === 0 ? `${C}55` : 'rgba(255,255,255,0.2)'}>user</text>
        </g>
      ))}

      <text x="110" y="213" fill={`${C}35`} fontSize="8" fontFamily="monospace" textAnchor="middle">middle layers pass props they don't use</text>

      {/* Divider */}
      <line x1="218" y1="8" x2="218" y2="212" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* ── CENTER: Context solution ── */}
      <text x="392" y="14" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">CONTEXT SOLUTION</text>

      {/* Provider bracket */}
      <rect x="232" y="20" width="10" height="190" rx="3" fill={`${C}10`} stroke={`${C}40`} strokeWidth="1" />
      <text x="228" y="118" fontSize="8" fontFamily="monospace" fill={`${C}60`}
        transform="rotate(-90 228 118)" textAnchor="middle">Provider</text>

      {nodes.map(({ label, y }, i) => {
        const isEndpoint = i === 0 || i === 3
        return (
          <g key={label}>
            <rect x="252" y={y} width="124" height="30" rx="5"
              fill={isEndpoint ? `${C}15` : 'rgba(255,255,255,0.03)'}
              stroke={isEndpoint ? `${C}50` : 'rgba(255,255,255,0.06)'}
              strokeWidth="1.2" />
            <text x="314" y={y + 19} fontSize="10" fontFamily="monospace" textAnchor="middle"
              fill={isEndpoint ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.22)'}>
              {label}
            </text>
          </g>
        )
      })}

      {/* Clean connectors — no labels */}
      {[56, 106, 156].map((y) => (
        <line key={y} x1="314" y1={y} x2="314" y2={y + 18} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      ))}

      {/* useContext arc: Provider → Avatar */}
      <path d="M 242 35 C 430 35, 430 191, 378 191"
        stroke={C} strokeWidth="1.8" fill="none" strokeDasharray="5 3" opacity="0.75" />
      <polygon points="374,187 378,195 382,187" fill={C} opacity="0.75" />
      <text x="418" y="110" fontSize="8" fontFamily="monospace" fill={C} textAnchor="middle">useContext()</text>
      <text x="418" y="121" fontSize="7" fontFamily="monospace" fill={`${C}60`} textAnchor="middle">jumps directly</text>

      <text x="314" y="213" fill={`${C}35`} fontSize="8" fontFamily="monospace" textAnchor="middle">middle layers untouched ✅</text>

      {/* Divider */}
      <line x1="566" y1="8" x2="566" y2="212" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* ── RIGHT: useReducer cycle ── */}
      <text x="673" y="14" fill={`${C}70`} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="700">useREDUCER</text>

      {[
        { label: 'state',    sub: 'current value',    y: 28 },
        { label: 'dispatch', sub: '{ type, payload }', y: 98 },
        { label: 'reducer',  sub: '(state, action)',   y: 158 },
      ].map(({ label, sub, y }) => (
        <g key={label}>
          <rect x="617" y={y} width="112" height="38" rx="6"
            fill={`${C}12`} stroke={`${C}45`} strokeWidth="1.3" />
          <text x="673" y={y + 16} fontSize="11" fontFamily="monospace" fill={C} textAnchor="middle" fontWeight="700">{label}</text>
          <text x="673" y={y + 28} fontSize="8" fontFamily="monospace" fill={`${C}65`} textAnchor="middle">{sub}</text>
        </g>
      ))}

      {/* state → dispatch */}
      <line x1="673" y1="66" x2="673" y2="96" stroke={`${C}55`} strokeWidth="1.5" />
      <polygon points="669,94 673,98 677,94" fill={`${C}55`} />
      {/* dispatch → reducer */}
      <line x1="673" y1="136" x2="673" y2="156" stroke={`${C}55`} strokeWidth="1.5" />
      <polygon points="669,154 673,158 677,154" fill={`${C}55`} />
      {/* reducer → state (right arc) */}
      <path d="M 729 177 Q 762 113 729 46" stroke={`${C}55`} strokeWidth="1.5" fill="none" />
      <polygon points="725,48 729,42 733,48" fill={`${C}55`} />
      <text x="750" y="112" fontSize="8" fontFamily="monospace" fill={`${C}55`}>new state</text>
    </svg>
  )
}
```

- [x] **Step 2: Verify file exists**

```bash
ls /home/jaywee92/web-dev-guide/src/topics/banners/react/ContextBanner.tsx && echo "exists"
```

Expected: path printed + `exists`

- [x] **Step 3: Commit**

```bash
cd /home/jaywee92/web-dev-guide && git add src/topics/banners/react/ContextBanner.tsx && git commit -m "feat: add ContextBanner SVG for react-context topic"
```

---

### Task 7: Wire ContextBanner in registry.ts

**Files:**
- Modify: `src/topics/registry.ts`

The React section of `bannerLazyRegistry` currently ends at:
```typescript
  RouterBanner:     () => import('./banners/react/RouterBanner'),
```

- [x] **Step 1: Add ContextBanner to bannerLazyRegistry**

Find `RouterBanner:     () => import('./banners/react/RouterBanner'),` and add after it:

```typescript
  ContextBanner:    () => import('./banners/react/ContextBanner'),
```

- [x] **Step 2: Verify TypeScript compiles cleanly**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep "error TS" | grep -v supabase; echo "done"
```

Expected: only `done`.

- [x] **Step 3: Commit**

```bash
cd /home/jaywee92/web-dev-guide && git add src/topics/registry.ts && git commit -m "feat: wire ContextBanner in registry.ts"
```

---

## Chunk 5: Final check

### Task 8: Final TypeScript check + push

**Files:** None (verification + push only)

- [x] **Step 1: Full TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | grep "error TS" | grep -v supabase; echo "done"
```

Expected: only `done`.

- [x] **Step 2: Verify react-context step count**

```bash
cd /home/jaywee92/web-dev-guide && python3 -c "
import re
with open('src/data/topics.ts') as f: c = f.read()
m = re.search(r\"id: 'react-context'\", c)
chunk = c[m.start():m.start()+5000]
steps = re.findall(r'animationStep: (\d+)', chunk)
print(f'react-context: {len(steps)} steps (0-{max(int(s) for s in steps)})')
"
```

Expected: `react-context: 7 steps (0-6)`

- [x] **Step 3: Verify react-router nextTopicId**

```bash
cd /home/jaywee92/web-dev-guide && python3 -c "
import re
with open('src/data/topics.ts') as f: c = f.read()
m = re.search(r\"id: 'react-router'\", c)
chunk = c[m.start():m.start()+300]
print('nextTopicId found:', 'react-context' in chunk)
"
```

Expected: `nextTopicId found: True`

- [x] **Step 4: Push**

```bash
cd /home/jaywee92/web-dev-guide && git push origin main
```
