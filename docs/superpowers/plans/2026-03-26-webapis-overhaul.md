# Web APIs Section Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul all 4 Web API topics with per-step analogies, 2 new steps each, commonErrors, and realWorldExamples; create a dedicated DomViz component to replace the mismatched DomEventsViz on the webapi-dom topic.

**Architecture:** New `DomViz.tsx` follows the existing viz pattern (framer-motion, AnimatePresence mode="wait", stepLabels array, compact prop). Content changes follow the established `analogy`/`commonErrors`/`realWorldExamples` fields already present on JS topics. Locale files are append-only. Note: webapi-dom, webapi-events, and webapi-storage each add `animationStep: 7` and `animationStep: 8`; webapi-fetch already has 8 steps (0–7), so its new entries are `animationStep: 8` and `animationStep: 9`. No type changes needed — `CommonError`, `RealWorldExample`, and `analogy` already exist in `src/types/index.ts`.

**Tech Stack:** React 18, TypeScript, framer-motion, react-i18next

**Spec:** `docs/superpowers/specs/2026-03-26-webapis-overhaul-design.md`

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `src/topics/webapis/DomViz.tsx` | 9-step DOM tree animation component |
| Modify | `src/topics/registry.ts` | Register DomViz in lazyRegistry |
| Modify | `src/data/topics.ts` (lines 6675–6792) | webapi-fetch: analogies, 2 new steps, commonErrors, realWorldExamples |
| Modify | `src/data/topics.ts` (lines 6564–6674) | webapi-dom: animationComponent → `'DomViz'` (line 6566); analogies, 2 new steps, commonErrors, realWorldExamples |
| Modify | `src/data/topics.ts` (lines 6793–6902) | webapi-events: analogies, 2 new steps, commonErrors, realWorldExamples |
| Modify | `src/data/topics.ts` (lines 6903+) | webapi-storage: analogies, 2 new steps, commonErrors, realWorldExamples |
| Modify | `src/i18n/locales/en/topics-other.json` | Append animationStep 7 + 8 for all 4 topics |
| Modify | `src/i18n/locales/de/topics-other.json` | German translations of all new steps |

---

## Task 1: Create DomViz.tsx

**Files:**
- Create: `src/topics/webapis/DomViz.tsx`

- [ ] **Step 1: Create the full component**

Create `src/topics/webapis/DomViz.tsx`. Follow the established viz pattern from `FetchViz.tsx` and `DomEventsViz.tsx`:

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const NODE_COLOR  = '#5b9cf5'   // blue   — document / Node
const EL_COLOR    = '#4ade80'   // green  — HTML elements
const TEXT_COLOR  = '#f5c542'   // yellow — text nodes
const SEL_COLOR   = '#67e8f9'   // cyan   — selected / highlighted element
const BADGE_COLOR = '#a78bfa'   // purple — method badges

const mono = 'var(--font-mono)'

const stepLabels = [
  'DOM Tree Structure — HTML becomes a tree of nodes',
  'Selecting Elements — querySelector finds the element you need',
  'Creating Elements — createElement builds a new node',
  'Reading & Changing Properties — textContent, classList, style',
  'DOM Interfaces — Node, Element, HTMLElement hierarchy',
  'closest() & matches() — traversal and filtering',
  'NodeList vs Array — querySelectorAll does not return an Array',
  'classList Advanced — toggle, replace, force parameter',
  'data-* Attributes — store state directly on HTML elements',
]

function NodeBox({ label, color, glow, compact, style: extra }: {
  label: string; color: string; glow?: boolean; compact: boolean; style?: React.CSSProperties
}) {
  return (
    <motion.div
      animate={glow
        ? { boxShadow: [`0 0 0px ${color}00`, `0 0 16px ${color}bb`, `0 0 0px ${color}00`] }
        : { boxShadow: `0 0 6px ${color}33` }
      }
      transition={glow ? { repeat: Infinity, duration: 0.9, ease: 'easeInOut' } : { duration: 0.3 }}
      style={{
        border: `2px solid ${color}`, background: `${color}18`, borderRadius: 6,
        padding: compact ? '4px 9px' : '6px 12px', fontFamily: mono,
        fontSize: compact ? 9 : 11, fontWeight: 700, color, textAlign: 'center' as const,
        ...extra,
      }}
    >
      {label}
    </motion.div>
  )
}

function Badge({ label, color = BADGE_COLOR, compact }: { label: string; color?: string; compact: boolean }) {
  return (
    <div style={{
      display: 'inline-block', padding: compact ? '2px 7px' : '3px 10px',
      background: `${color}18`, border: `1px solid ${color}66`,
      borderRadius: 5, fontFamily: mono, fontSize: compact ? 9 : 11, color, fontWeight: 600,
    }}>
      {label}
    </div>
  )
}

export default function DomViz({ step, compact = false }: Props) {
  const s = Math.min(step, 8)
  const panelW = compact ? 220 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 14, width: panelW }}>
      <AnimatePresence mode="wait">

        {/* Step 0: DOM tree building — nodes appear one by one */}
        {s === 0 && (
          <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}
          >
            {[
              { label: 'document', color: NODE_COLOR, indent: 0 },
              { label: '<html>', color: EL_COLOR, indent: 1 },
              { label: '<body>', color: EL_COLOR, indent: 2 },
              { label: '<h1>', color: EL_COLOR, indent: 3 },
              { label: '"Hello"', color: TEXT_COLOR, indent: 4 },
              { label: '<ul>', color: EL_COLOR, indent: 3 },
              { label: '<li>', color: EL_COLOR, indent: 4 },
            ].map(({ label, color, indent }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ paddingLeft: indent * (compact ? 12 : 18), display: 'flex' }}
              >
                <NodeBox label={label} color={color} compact={compact} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 1: querySelector — matching element lights up cyan */}
        {s === 1 && (
          <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}
          >
            {[
              { label: 'document', color: NODE_COLOR, sel: false, indent: 0 },
              { label: '<body>', color: EL_COLOR, sel: false, indent: 1 },
              { label: '<ul class="menu">', color: EL_COLOR, sel: false, indent: 2 },
              { label: '<li class="item">', color: SEL_COLOR, sel: true, indent: 3 },
            ].map(({ label, color, sel, indent }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{ paddingLeft: indent * (compact ? 12 : 18), display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <NodeBox label={label} color={color} glow={sel} compact={compact} />
                {sel && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    style={{ fontFamily: mono, fontSize: compact ? 9 : 10, color: SEL_COLOR }}
                  >
                    ← querySelector('.item')
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 2: createElement — new node snaps into tree */}
        {s === 2 && (
          <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
              <NodeBox label="<ul>" color={EL_COLOR} compact={compact} />
              <div style={{ paddingLeft: compact ? 16 : 22, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <NodeBox label="<li>Item 1</li>" color={EL_COLOR} compact={compact} />
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <NodeBox label="<li>Item 2</li>" color={SEL_COLOR} compact={compact} />
                </motion.div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              style={{ fontFamily: mono, fontSize: compact ? 9 : 10, color: SEL_COLOR, textAlign: 'center' as const }}
            >
              createElement + appendChild
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: textContent & classList live updates */}
        {s === 3 && (
          <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 14, alignItems: 'center', width: '100%' }}
          >
            {[
              { label: 'el.textContent = "New Title"', color: TEXT_COLOR },
              { label: 'el.classList.add("active")', color: EL_COLOR },
              { label: 'el.classList.remove("hidden")', color: '#f87171' },
              { label: 'el.style.color = "red"', color: '#fb923c' },
            ].map(({ label, color }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ width: '100%' }}
              >
                <Badge label={label} color={color} compact={compact} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 4: DOM Interfaces inheritance hierarchy */}
        {s === 4 && (
          <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}
          >
            {[
              { label: 'Node', color: NODE_COLOR, indent: 0, note: 'nodeType, childNodes, parentNode' },
              { label: 'Element', color: EL_COLOR, indent: 1, note: 'tagName, className, setAttribute' },
              { label: 'HTMLElement', color: BADGE_COLOR, indent: 2, note: 'style, dataset, offsetWidth' },
              { label: 'HTMLButtonElement', color: SEL_COLOR, indent: 3, note: 'disabled, type, click()' },
            ].map(({ label, color, indent, note }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ paddingLeft: indent * (compact ? 14 : 20) }}
              >
                <NodeBox label={label} color={color} compact={compact} />
                {!compact && (
                  <div style={{ fontFamily: mono, fontSize: 9, color: '#64748b', paddingLeft: 6, marginTop: 2 }}>
                    {note}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 5: closest() traversal upward */}
        {s === 5 && (
          <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}
          >
            {[
              { label: '<section class="card">', color: SEL_COLOR, glow: true, indent: 0, note: "← closest('.card') ✓" },
              { label: '<div class="wrapper">', color: EL_COLOR, glow: false, indent: 1, note: '' },
              { label: '<span>', color: EL_COLOR, glow: false, indent: 2, note: '' },
              { label: '<button>', color: BADGE_COLOR, glow: false, indent: 3, note: '← start here' },
            ].map(({ label, color, glow, indent, note }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ paddingLeft: indent * (compact ? 12 : 18), display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <NodeBox label={label} color={color} glow={glow} compact={compact} />
                {note && (
                  <span style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: glow ? SEL_COLOR : '#64748b' }}>
                    {note}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 6: NodeList vs Array */}
        {s === 6 && (
          <motion.div key="s6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 14, width: '100%', justifyContent: 'center' }}
          >
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              style={{ border: '1px solid #334155', borderRadius: 8, padding: compact ? '8px 10px' : '12px 16px', textAlign: 'center' as const }}
            >
              <div style={{ fontFamily: mono, fontSize: compact ? 10 : 12, color: '#94a3b8', fontWeight: 700 }}>NodeList</div>
              <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: '#64748b', marginTop: 4 }}>
                .forEach() ✓<br />.map() ✗<br />.filter() ✗
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
              style={{ fontFamily: mono, fontSize: compact ? 11 : 16, color: SEL_COLOR, fontWeight: 700 }}
            >→</motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
              style={{ border: `1px solid ${EL_COLOR}66`, borderRadius: 8, padding: compact ? '8px 10px' : '12px 16px', textAlign: 'center' as const, background: `${EL_COLOR}08` }}
            >
              <div style={{ fontFamily: mono, fontSize: compact ? 10 : 12, color: EL_COLOR, fontWeight: 700 }}>Array</div>
              <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: EL_COLOR, marginTop: 4, opacity: 0.8 }}>
                .forEach() ✓<br />.map() ✓<br />.filter() ✓
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 7: classList advanced methods */}
        {s === 7 && (
          <motion.div key="s7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, width: '100%' }}
          >
            {[
              { label: '.toggle("dark")', note: 'add if absent, remove if present', color: EL_COLOR },
              { label: '.toggle("dark", true)', note: 'force = always add', color: BADGE_COLOR },
              { label: '.replace("old", "new")', note: 'atomic swap — no flash', color: SEL_COLOR },
              { label: '.add("a", "b", "c")', note: 'multiple classes at once', color: TEXT_COLOR },
            ].map(({ label, note, color }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <Badge label={`classList${label}`} color={color} compact={compact} />
                {!compact && <div style={{ fontFamily: mono, fontSize: 9, color: '#64748b', paddingLeft: 4 }}>{note}</div>}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Step 8: data-* attributes */}
        {s === 8 && (
          <motion.div key="s8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: compact ? 10 : 16, alignItems: 'center', width: '100%' }}
          >
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{
                fontFamily: mono, fontSize: compact ? 10 : 12,
                background: 'rgba(0,0,0,0.3)', border: `1px solid ${NODE_COLOR}44`,
                borderRadius: 7, padding: compact ? '8px 12px' : '10px 16px',
                color: NODE_COLOR, width: '100%', textAlign: 'center' as const,
              }}
            >
              {'<div data-user-id="42" data-role="admin">'}
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
              style={{ fontFamily: mono, fontSize: compact ? 14 : 20, color: SEL_COLOR }}
            >↓</motion.div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}
            >
              {[
                { code: 'el.dataset.userId', result: '"42"', color: EL_COLOR },
                { code: 'el.dataset.role', result: '"admin"', color: BADGE_COLOR },
                { code: 'el.dataset.newKey = "x"', result: 'sets data-new-key', color: TEXT_COLOR },
              ].map(({ code, result, color }) => (
                <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: mono, fontSize: compact ? 9 : 11 }}>
                  <span style={{ color }}>{code}</span>
                  <span style={{ color: '#64748b' }}>→</span>
                  <span style={{ color: '#94a3b8' }}>{result}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Step label */}
      <motion.div
        key={`label-${s}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: '#64748b', textAlign: 'center' as const, maxWidth: panelW, lineHeight: 1.4 }}
      >
        {stepLabels[s]}
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 2: Register DomViz in registry.ts**

In `src/topics/registry.ts`, find the webapis entries (around line 59):
```ts
  FetchViz: () => import('./webapis/FetchViz'),
  DomEventsViz: () => import('./webapis/DomEventsViz'),
```

Insert DomViz between them:
```ts
  FetchViz: () => import('./webapis/FetchViz'),
  DomViz: () => import('./webapis/DomViz'),
  DomEventsViz: () => import('./webapis/DomEventsViz'),
```

- [ ] **Step 3: Wire webapi-dom to DomViz**

In `src/data/topics.ts` line 6566, change:
```ts
    animationComponent: 'DomEventsViz',
```
to:
```ts
    animationComponent: 'DomViz',
```

- [ ] **Step 4: TypeScript check + commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add src/topics/webapis/DomViz.tsx src/topics/registry.ts src/data/topics.ts
git commit -m "feat: add DomViz component and wire to webapi-dom topic"
```

---

## Task 2: webapi-fetch content

**Files:**
- Modify: `src/data/topics.ts` (lines 6675–6792)

- [ ] **Step 1: Add analogies to all steps (0–7)**

For each ExplanationStep in the webapi-fetch `explanation` section, add an `analogy` field:

**Step 0** (The Fetch API):
```ts
analogy: {
  icon: '✉️',
  title: 'Sending a letter',
  text: [
    "Imagine sending a letter and waiting for a reply. You write the address (URL), seal the envelope (request), and drop it in the postbox (call fetch()). You don't stand at the postbox waiting — you go about your day.",
    "When the reply arrives (Promise resolves), you open it and read the data.",
  ],
},
```

**Step 1** (fetch() returns a Promise):
```ts
analogy: {
  icon: '🧾',
  title: 'The restaurant receipt',
  text: [
    "When you order at a restaurant, you get a receipt immediately — but the food comes later. The receipt is the Promise. It's not the data, but proof your request was accepted.",
    "The kitchen is busy (server processing). When the food is ready (data fetched), the waiter brings it to your table (Promise resolves).",
  ],
},
```

**Step 2** (The Response object):
```ts
analogy: {
  icon: '📦',
  title: 'A sealed envelope',
  text: [
    "The Response object is like a sealed envelope. Before you open it, you can already see the sender's address (URL), when it was sent (headers), and whether it was delivered successfully (status code).",
    "Only when you call .json() or .text() do you actually open the envelope and read the contents.",
  ],
},
```

**Step 3** (Parsing the response body):
```ts
analogy: {
  icon: '📖',
  title: 'Opening the envelope',
  text: [
    ".json() is like unfolding the letter inside the envelope. The raw body is a stream of bytes — .json() reads it all and converts it to a JavaScript object.",
    "You can only read it once. Calling .json() twice on the same Response throws an error — like trying to unfold a letter that has already been read.",
  ],
},
```

**Step 4** (async/await):
```ts
analogy: {
  icon: '⏳',
  title: 'Waiting in line',
  text: [
    "Instead of saying 'call me back when my order is ready' (then/catch), async/await lets you say 'I'll wait right here'. The code pauses at await until the Promise resolves.",
    "The line behind you doesn't stop — only your async function waits. Everything else in JavaScript keeps running.",
  ],
},
```

**Step 5** (GET — Reading a Response):
```ts
analogy: {
  icon: '🧑‍🍳',
  title: 'Check before serving',
  text: [
    "A good chef checks the dish before bringing it to the table. res.ok is that check — it's true only for 2xx responses. A 404 or 500 still resolves the Promise, but res.ok is false.",
    "Always guard with if (!res.ok) throw new Error(res.statusText) before calling res.json() — otherwise you try to parse an error page as JSON.",
  ],
},
```

**Step 6** (POST / PUT / DELETE with a Body):
```ts
analogy: {
  icon: '📬',
  title: 'Sending a package',
  text: [
    "A GET request is like asking for a catalog. A POST is like mailing a package — you send something, not just request it. The method is the shipping label, Content-Type is what you're sending, and the body is the contents.",
    "JSON.stringify converts your JavaScript object into a string that can travel over the network — like putting a document in an envelope before mailing.",
  ],
},
```

**Step 7** (RESTful API Principles):
```ts
analogy: {
  icon: '🗂️',
  title: 'Standard filing cabinet',
  text: [
    "REST is like agreeing on standard drawer labels for a filing cabinet. GET = read a file, POST = add a file, PUT = replace a file, DELETE = remove a file.",
    "Every team uses the same labels, so anyone can open the cabinet and know what to do — no custom instructions needed.",
  ],
},
```

- [ ] **Step 2: Add new steps 8 and 9**

Append to the end of the `explanation` steps array:

```ts
{
  animationStep: 8,
  icon: '🚨',
  heading: 'Error Handling Patterns',
  text: '`fetch()` only rejects its Promise on **network failures** (no connection, DNS error). It does **not** throw on 4xx or 5xx HTTP responses — those still resolve. Check `res.ok` manually. Use `try/catch` for network errors and `if (!res.ok)` for HTTP errors.',
  codeExample: `async function getData(url: string) {\n  try {\n    const res = await fetch(url)\n    if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`)\n    return await res.json()\n  } catch (err) {\n    console.error('Fetch failed:', err)\n    throw err\n  }\n}`,
  language: 'typescript',
  analogy: {
    icon: '🚚',
    title: 'Two types of failure',
    text: [
      "Imagine two ways a delivery can fail: the truck breaks down before leaving (network error — Promise rejects), or the package arrives but is refused at the door (4xx/5xx — Promise resolves, but res.ok is false).",
      "fetch() only tells you about the truck. You have to check the door yourself with res.ok.",
    ],
  },
},
{
  animationStep: 9,
  icon: '🛑',
  heading: 'AbortController — Cancel a Request',
  text: 'Use `AbortController` to cancel an in-flight fetch. Create a controller, pass `signal` to fetch, and call `abort()` to cancel. In React `useEffect`, call `abort()` in the cleanup function to prevent state updates after unmount.',
  codeExample: `useEffect(() => {\n  const controller = new AbortController()\n\n  fetch('/api/data', { signal: controller.signal })\n    .then(res => res.json())\n    .then(setData)\n    .catch(err => {\n      if (err.name !== 'AbortError') console.error(err)\n    })\n\n  return () => controller.abort()\n}, [])`,
  language: 'typescript',
  analogy: {
    icon: '📵',
    title: 'The cancel button',
    text: [
      "AbortController is a cancel button you hand to fetch before pressing Send. If you press cancel before the response arrives, fetch stops and throws an AbortError.",
      "In React, the component unmounting is the cancel button being pressed — always clean up in-flight requests to avoid setState calls after unmount.",
    ],
  },
},
```

- [ ] **Step 3: Add commonErrors and realWorldExamples**

Add these fields to the webapi-fetch topic object (alongside `cheatSheet`, `sections`, etc.):

```ts
commonErrors: [
  {
    title: 'Forgetting await on res.json()',
    why: 'res.json() returns a Promise. Without await, you get a Promise object instead of the parsed data — no error is thrown, the bug is silent.',
    fixLabel: 'Always await res.json()',
    fixCode: 'const data = await res.json()',
  },
  {
    title: 'Not checking res.ok',
    why: 'fetch() resolves even on 404 and 500 responses. Only network failures cause the Promise to reject. You must check res.ok yourself.',
    fixLabel: 'Guard with res.ok before parsing',
    fixCode: 'if (!res.ok) throw new Error(res.statusText)',
  },
  {
    title: "Missing Content-Type header on POST",
    why: "When sending JSON, the server needs to know the format. Without 'Content-Type': 'application/json', many servers won't parse the body.",
    fixLabel: 'Set the header explicitly',
    fixCode: `headers: { 'Content-Type': 'application/json' }`,
  },
],
realWorldExamples: [
  {
    context: 'Weather dashboard',
    heading: 'Fetch weather data from a public API',
    description: 'Async data fetch with a loading state, error state, and res.ok guard — the pattern for any data-fetching component.',
    code: `async function getWeather(city: string) {\n  const res = await fetch(\`https://api.example.com/weather?q=\${city}\`)\n  if (!res.ok) throw new Error(\`Failed: \${res.status}\`)\n  return res.json() as Promise<WeatherData>\n}\n\nconst [data, setData] = useState<WeatherData | null>(null)\nconst [loading, setLoading] = useState(false)\n\nasync function load() {\n  setLoading(true)\n  try { setData(await getWeather('Berlin')) }\n  catch (e) { console.error(e) }\n  finally { setLoading(false) }\n}`,
  },
  {
    context: 'Contact page',
    heading: 'Submit a form via POST',
    description: 'Collect form data, send as JSON with POST, handle success and error responses.',
    code: `async function submitForm(data: FormData) {\n  const res = await fetch('/api/contact', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({\n      name: data.get('name'),\n      email: data.get('email'),\n    }),\n  })\n  if (!res.ok) throw new Error('Submission failed')\n  return res.json()\n}`,
  },
],
```

- [ ] **Step 4: TypeScript check + commit**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
git add src/data/topics.ts
git commit -m "feat: add analogies, new steps, commonErrors and realWorldExamples to webapi-fetch"
```

---

## Task 3: webapi-dom content

**Files:**
- Modify: `src/data/topics.ts` (lines 6564–6674)

- [ ] **Step 1: Add analogies to all 7 existing steps of webapi-dom**

**Step 0** (DOM Tree Structure):
```ts
analogy: {
  icon: '🧱',
  title: 'LEGO from instructions',
  text: [
    "HTML is the instruction booklet. The DOM is the finished LEGO model built from those instructions. You can take the model apart, add pieces, move them around — without touching the original booklet.",
    "The DOM lives in memory. Changes to it update what you see instantly. Refreshing the page rebuilds the model from the HTML instructions.",
  ],
},
```

**Step 1** (Selecting Elements):
```ts
analogy: {
  icon: '🔍',
  title: 'Ctrl+F — but returns the object',
  text: [
    "querySelector works like Ctrl+F in your browser — you describe what you're looking for with a CSS selector, and it finds the first match. But instead of highlighting text, it hands you the actual element object.",
    "querySelectorAll is like 'Find All' — it returns every match as a NodeList you can loop over.",
  ],
},
```

**Step 2** (Creating and Inserting Elements):
```ts
analogy: {
  icon: '🧩',
  title: 'LEGO bricks',
  text: [
    "createElement is like taking a new LEGO brick out of the box — it exists but isn't attached to anything yet. appendChild is snapping it into place. insertBefore places it above another piece.",
    "The element must be inserted into the DOM to become visible. Just creating it is not enough.",
  ],
},
```

**Step 3** (Reading and Changing Properties):
```ts
analogy: {
  icon: '📝',
  title: 'Editing a Word document',
  text: [
    "Changing textContent is like selecting all text and retyping it. classList operations are like applying bold, italic, or a heading style. style changes are inline formatting overrides.",
    "All changes are live — the page updates instantly, no reload needed.",
  ],
},
```

**Step 4** (DOM Interfaces):
```ts
analogy: {
  icon: '🏛️',
  title: 'Class hierarchy',
  text: [
    "Every DOM element inherits from a chain: Node → Element → HTMLElement → specific (HTMLButtonElement, HTMLInputElement, etc.). Each level adds more properties.",
    "A button is an HTMLButtonElement, but also an HTMLElement, also an Element, also a Node. All those methods are available on it.",
  ],
},
```

**Step 5** (Advanced Querying):
```ts
analogy: {
  icon: '👔',
  title: 'Find nearest manager',
  text: [
    "closest() is like an employee asking 'find my nearest ancestor with the title manager.' It walks up the DOM tree and returns the first ancestor matching the selector.",
    "matches() is simpler — it just asks 'does this element match this selector?' — a yes/no check without traversal.",
  ],
},
```

**Step 6** (NodeList vs Array):
```ts
analogy: {
  icon: '📋',
  title: "Someone else's shopping list",
  text: [
    "A NodeList is like a shopping list written by someone else — you can read it and iterate with forEach, but you can't use Array methods like .map() or .filter().",
    "Array.from(nodeList) photocopies the list into your own format, giving you a real Array with all methods.",
  ],
},
```

- [ ] **Step 2: Add new steps 7 and 8 to webapi-dom**

Append to the end of the explanation steps array:

```ts
{
  animationStep: 7,
  icon: '🎛️',
  heading: 'classList Advanced Methods',
  text: '`classList.toggle(class, force)` adds the class when `force` is `true`, removes it when `false` — no if/else needed. `classList.replace(old, new)` swaps classes atomically. `.add()` and `.remove()` accept multiple class names separated by commas.',
  codeExample: `const btn = document.querySelector('button')!\n\n// Toggle dark mode\ndocument.body.classList.toggle('dark')\n\n// Force-enable: always add, never remove\nbtn.classList.toggle('active', isActive)\n\n// Atomic swap — no flash of intermediate state\nbtn.classList.replace('loading', 'success')\n\n// Add multiple classes at once\nel.classList.add('visible', 'animated', 'fade-in')`,
  language: 'javascript',
  analogy: {
    icon: '📺',
    title: 'Remote control for CSS classes',
    text: [
      "classList is a remote control where each button does something to the class list. toggle flips the switch. toggle(class, force) locks it on or off. replace changes the channel in one press.",
      "The force parameter in toggle is the most underused DOM feature: it makes 'add if condition' a one-liner without if/else.",
    ],
  },
},
{
  animationStep: 8,
  icon: '🏷️',
  heading: 'data-* Attributes',
  text: '`data-*` attributes store custom data on HTML elements without misusing class names. JavaScript reads them through the `dataset` property, which converts kebab-case to camelCase: `data-user-id` becomes `el.dataset.userId`. Writing to dataset sets the attribute.',
  codeExample: `<!-- HTML -->\n<button data-product-id="42" data-action="buy">Buy</button>\n\n// JavaScript\nconst btn = document.querySelector('[data-action="buy"]')!\nconsole.log(btn.dataset.productId)  // "42"\nconsole.log(btn.dataset.action)     // "buy"\n\n// Writing\nbtn.dataset.status = 'loading'      // sets data-status="loading"\n\n// Event delegation with data attributes\ndocument.addEventListener('click', e => {\n  const action = (e.target as HTMLElement).dataset.action\n  if (action === 'buy') addToCart((e.target as HTMLElement).dataset.productId)\n})`,
  language: 'typescript',
  analogy: {
    icon: '🗒️',
    title: 'Sticky notes on elements',
    text: [
      "data-* attributes are sticky notes attached directly to HTML elements. Instead of storing state in a separate JavaScript Map keyed by element, you put it right on the element where it belongs.",
      "They're perfect for event delegation — the click handler reads which element was clicked and what to do from the element's own data attributes.",
    ],
  },
},
```

- [ ] **Step 3: Add commonErrors and realWorldExamples to webapi-dom**

```ts
commonErrors: [
  {
    title: 'querySelector before DOM is loaded',
    why: "A script in <head> runs before the browser has parsed the body. querySelector returns null and you get 'Cannot read property of null'.",
    fixLabel: 'Add defer to the script tag',
    fixCode: '<script src="app.js" defer></script>',
  },
  {
    title: 'innerHTML with user content',
    why: "innerHTML parses the string as HTML — user input containing script tags or event handler attributes executes as code (XSS).",
    fixLabel: 'Use textContent for text — it never parses HTML',
    fixCode: 'el.textContent = userInput  // safe — treated as plain text',
  },
  {
    title: 'Treating NodeList as an Array',
    why: 'querySelectorAll returns a NodeList, not an Array. Calling .map(), .filter(), or .reduce() on it throws "is not a function".',
    fixLabel: 'Convert with Array.from()',
    fixCode: 'const items = Array.from(document.querySelectorAll("li"))',
  },
],
realWorldExamples: [
  {
    context: 'Settings page',
    heading: 'Dark mode toggle',
    description: 'A single button that toggles a CSS class on document.body. classList.toggle returns a boolean to sync button label.',
    code: `const btn = document.querySelector('#theme-btn')!\n\nbtn.addEventListener('click', () => {\n  const isDark = document.body.classList.toggle('dark')\n  btn.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode'\n  localStorage.setItem('theme', isDark ? 'dark' : 'light')\n})`,
  },
  {
    context: 'Todo app',
    heading: 'Render a list from data',
    description: 'Loop over an array, create a li for each item using createElement and textContent, append to a ul.',
    code: `const list = document.querySelector('#todo-list')!\n\nfunction renderTodos(todos: string[]) {\n  list.textContent = ''  // clear safely — no markup parsed\n  todos.forEach(todo => {\n    const li = document.createElement('li')\n    li.textContent = todo          // safe — no XSS\n    li.dataset.done = 'false'\n    list.appendChild(li)\n  })\n}`,
  },
],
```

- [ ] **Step 4: TypeScript check + commit**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
git add src/data/topics.ts
git commit -m "feat: add analogies, new steps, commonErrors and realWorldExamples to webapi-dom"
```

---

## Task 4: webapi-events content

**Files:**
- Modify: `src/data/topics.ts` (lines 6793–6902)

- [ ] **Step 1: Add analogies to all 7 existing steps of webapi-events**

**Step 0** (Events are user actions):
```ts
analogy: {
  icon: '🔥',
  title: 'Smoke detector',
  text: [
    "A smoke detector is always on, always listening, but does nothing most of the time. When something specific happens (smoke), it reacts. DOM events work the same — your listener is always registered, fires only on the specific event.",
    "You don't poll ('is there smoke yet?'). You register a listener and let the browser call you when the event happens.",
  ],
},
```

**Step 1** (addEventListener):
```ts
analogy: {
  icon: '📰',
  title: 'Newsletter subscription',
  text: [
    "addEventListener is like subscribing to a newsletter. You sign up once and the publisher sends you every new issue. You don't have to ask — they notify you.",
    "removeEventListener is unsubscribing. If you never unsubscribe, the newsletter keeps coming — even after you've moved.",
  ],
},
```

**Step 2** (The Event object):
```ts
analogy: {
  icon: '📦',
  title: 'A parcel with metadata',
  text: [
    "When an event fires, the browser wraps it in an Event object and delivers it to your handler. The object carries metadata: what type of event (type), which element triggered it (target), where the mouse was (clientX/clientY), which key was pressed (key).",
    "Your handler receives this parcel automatically as its first argument.",
  ],
},
```

**Step 3** (Event bubbling):
```ts
analogy: {
  icon: '🏢',
  title: 'Shouting in a building',
  text: [
    "When you shout in an office, the person in the same room hears first, then the floor above, then the whole building. DOM event bubbling works the same — the event fires on the target element first, then bubbles up through every ancestor.",
    "This is why clicking a button inside a div also triggers click handlers on the div, its parent, and all the way up.",
  ],
},
```

**Step 4** (stopPropagation and preventDefault):
```ts
analogy: {
  icon: '🚷',
  title: 'Bouncer at the door',
  text: [
    "stopPropagation is like a bouncer who stops the shout from echoing upward — the event fires on the target but doesn't bubble to parent elements.",
    "preventDefault is different — it stops the browser's default behavior for the event (following a link, submitting a form) without stopping propagation.",
  ],
},
```

**Step 5** (EventTarget):
```ts
analogy: {
  icon: '📡',
  title: 'Multiple cameras on one door',
  text: [
    "You can attach multiple event listeners to the same element for the same event. Each listener fires independently — one might log analytics, another updates the UI, another saves state.",
    "Each listener has a single responsibility, which is much cleaner than one giant handler doing everything.",
  ],
},
```

**Step 6** (Event propagation phases):
```ts
analogy: {
  icon: '📭',
  title: 'Sorting station',
  text: [
    "Events travel in three phases: capture (from document down to target), target (at the element itself), bubble (back up to document). By default, addEventListener uses the bubble phase.",
    "The capture phase is like intercepting a package at the sorting station before delivery. Rarely needed, but useful for global interceptors.",
  ],
},
```

- [ ] **Step 2: Add new steps 7 and 8 to webapi-events**

```ts
{
  animationStep: 7,
  icon: '📻',
  heading: 'Custom Events',
  text: 'Create your own events with `new CustomEvent(name, { detail })`. Dispatch them with `element.dispatchEvent(event)` and listen with `addEventListener`. Custom events are ideal for loosely-coupled communication between components — no shared state or imports needed.',
  codeExample: `// Dispatch from one part of the page\nconst event = new CustomEvent('cart:add', {\n  detail: { productId: 42, qty: 1 },\n  bubbles: true,\n})\ndocument.querySelector('#add-btn')!.dispatchEvent(event)\n\n// Listen anywhere in the tree\ndocument.addEventListener('cart:add', (e: CustomEvent) => {\n  console.log(e.detail.productId)  // 42\n  updateCartCount(e.detail.qty)\n})`,
  language: 'typescript',
  analogy: {
    icon: '📡',
    title: 'Walkie-talkies',
    text: [
      "Custom events are like walkie-talkies. One component broadcasts on a channel (dispatchEvent). Any component can tune in (addEventListener) without the broadcaster knowing who is listening.",
      "This decoupling is powerful: the cart button doesn't need to import the cart panel. It just broadcasts — the panel reacts.",
    ],
  },
},
{
  animationStep: 8,
  icon: '🎯',
  heading: 'Event Delegation',
  text: "Instead of attaching listeners to every child element, attach one listener to the parent. Use `event.target.closest(selector)` to identify which child triggered the event. Event delegation works even for elements added **after** the listener is attached — essential for dynamic lists.",
  codeExample: `// One listener on the parent handles all children\ndocument.querySelector('ul')!.addEventListener('click', e => {\n  const li = (e.target as Element).closest('li')\n  if (!li) return  // click was outside any li\n  handleItemClick(li)\n})`,
  language: 'typescript',
  analogy: {
    icon: '🏨',
    title: 'One receptionist for the whole building',
    text: [
      "Instead of hiring a receptionist for every floor, you hire one at the main entrance. Everyone who enters passes the receptionist — they check who you are and direct you.",
      "Event delegation is the same: one listener at the parent catches all events from children. New children added later are automatically covered.",
    ],
  },
},
```

- [ ] **Step 3: Add commonErrors and realWorldExamples to webapi-events**

Note: `commonErrors` is a separate field from `cheatSheet.commonMistakes`. They coexist — commonMistakes are brief cheat sheet one-liners; commonErrors are full entries with fix code shown in a dedicated panel.

```ts
commonErrors: [
  {
    title: 'Event listener not removed on cleanup',
    why: "In SPAs, components unmount but listeners stay attached. The callback fires after unmount and may reference stale state.",
    fixLabel: 'Return a cleanup function in useEffect',
    fixCode: `useEffect(() => {\n  const handler = () => setSomething(true)\n  el.addEventListener('click', handler)\n  return () => el.removeEventListener('click', handler)\n}, [])`,
  },
  {
    title: 'Arrow function prevents removeEventListener',
    why: "An arrow function creates a new reference each time. removeEventListener requires the exact same reference as addEventListener.",
    fixLabel: 'Store the handler in a named variable',
    fixCode: `const handler = () => console.log('clicked')\nel.addEventListener('click', handler)\nel.removeEventListener('click', handler)  // works`,
  },
  {
    title: 'Calling the handler instead of passing it',
    why: "el.addEventListener('click', handleClick()) calls handleClick immediately and passes its return value as the listener — usually undefined.",
    fixLabel: 'Pass the function reference, no parentheses',
    fixCode: `el.addEventListener('click', handleClick)   // correct\nel.addEventListener('click', handleClick())  // wrong`,
  },
],
realWorldExamples: [
  {
    context: 'Registration form',
    heading: 'Validate a form before submit',
    description: 'Attach a submit listener, call preventDefault, validate fields, and only submit programmatically if valid.',
    code: `form.addEventListener('submit', (e: SubmitEvent) => {\n  e.preventDefault()\n  const email = (form.querySelector('#email') as HTMLInputElement).value\n  if (!email.includes('@')) {\n    showError('Please enter a valid email')\n    return\n  }\n  submitForm({ email })\n})`,
  },
  {
    context: 'Productivity app',
    heading: 'Global keyboard shortcut',
    description: 'Listen for keydown on document. Match key and modifier to trigger actions from anywhere in the app.',
    code: `document.addEventListener('keydown', (e: KeyboardEvent) => {\n  const isMac = navigator.platform.includes('Mac')\n  const modifier = isMac ? e.metaKey : e.ctrlKey\n\n  if (modifier && e.key === 'k') {\n    e.preventDefault()\n    openSearchPalette()\n  }\n})`,
  },
],
```

- [ ] **Step 4: TypeScript check + commit**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
git add src/data/topics.ts
git commit -m "feat: add analogies, new steps, commonErrors and realWorldExamples to webapi-events"
```

---

## Task 5: webapi-storage content

**Files:**
- Modify: `src/data/topics.ts` (lines 6903+)

- [ ] **Step 1: Add analogies to all 7 existing steps of webapi-storage**

**Step 0** (Browser storage intro):
```ts
analogy: {
  icon: '📌',
  title: 'Sticky note vs whiteboard',
  text: [
    "localStorage is a sticky note on your monitor — it stays there when you close your laptop, when you restart the browser, when you come back a week later.",
    "sessionStorage is a whiteboard in a meeting room — everything is wiped when the meeting (browser tab) ends.",
  ],
},
```

**Step 1** (setItem):
```ts
analogy: {
  icon: '📓',
  title: 'Writing in a notebook',
  text: [
    "setItem is like writing a note: key is the label, value is the content. But localStorage only accepts plain text — even if you write a number, it's stored as the string '42'.",
    "That's why JSON.stringify is essential — it converts objects and arrays to a string before storing.",
  ],
},
```

**Step 2** (getItem):
```ts
analogy: {
  icon: '🔎',
  title: 'Looking something up',
  text: [
    "getItem is like flipping to a page by label. If the page exists, you get the content. If not — if you've never written to that key, or it was cleared — you get null.",
    "Always check for null before parsing. A null check protects you from calling JSON.parse on a value that was never written.",
  ],
},
```

**Step 3** (localStorage persists):
```ts
analogy: {
  icon: '💾',
  title: 'Survives a power cut',
  text: [
    "Unlike variables in memory, localStorage survives browser restarts, computer restarts, and sleep. It's persisted to disk.",
    "The only ways it disappears: the user clears browser data, you call localStorage.clear(), or the user is in private/incognito mode (cleared on tab close).",
  ],
},
```

**Step 4** (sessionStorage):
```ts
analogy: {
  icon: '🏢',
  title: 'Conference room whiteboard',
  text: [
    "sessionStorage is scoped to the browser tab. Open a new tab — empty storage. Close the tab — everything gone. Perfect for wizard forms, multi-step flows, or temporary state.",
    "Unlike localStorage, sessionStorage is also tab-isolated: two tabs to the same origin cannot read each other's sessionStorage.",
  ],
},
```

**Step 5** (localStorage vs sessionStorage):
```ts
analogy: {
  icon: '🗄️',
  title: 'Two different drawers',
  text: [
    "localStorage is your personal desk drawer — it's yours across all sessions, persists forever, shared between all tabs to the same origin.",
    "sessionStorage is a locker that gets cleared when you leave the building (tab closes). Each tab has its own locker.",
  ],
},
```

**Step 6** (Full API):
```ts
analogy: {
  icon: '🗝️',
  title: 'The full keycard',
  text: [
    "setItem and getItem are the most common operations. removeItem deletes a specific key. clear() nukes everything — use with caution.",
    "The API is synchronous — it blocks the main thread. For large amounts of data, consider IndexedDB instead.",
  ],
},
```

- [ ] **Step 2: Add new steps 7 and 8 to webapi-storage**

```ts
{
  animationStep: 7,
  icon: '🛡️',
  heading: 'Safe Read with Fallback',
  text: '`JSON.parse` throws a `SyntaxError` if the stored string is not valid JSON — from corrupted data, manual DevTools edits, or a previous bug. Always wrap reads in `try/catch` with a typed fallback value.',
  codeExample: `function getStored<T>(key: string, fallback: T): T {\n  try {\n    const raw = localStorage.getItem(key)\n    if (raw === null) return fallback\n    return JSON.parse(raw) as T\n  } catch {\n    return fallback\n  }\n}\n\n// Usage\nconst prefs = getStored('userPrefs', { theme: 'light', lang: 'en' })\nconst cart  = getStored<string[]>('cart', [])`,
  language: 'typescript',
  analogy: {
    icon: '⛑️',
    title: 'Reading without a safety net',
    text: [
      "JSON.parse is like reading a note that could be in any language. Usually it's valid JSON, but sometimes a previous bug wrote gibberish. Without a try/catch, your whole app crashes on one bad note.",
      "The fallback is what you'd use if the note was never written. The try/catch handles both missing and corrupted data in one pattern.",
    ],
  },
},
{
  animationStep: 8,
  icon: '⚠️',
  heading: 'What NOT to Store',
  text: 'Never store **passwords**, **auth tokens**, **session IDs**, or sensitive personal data in `localStorage` or `sessionStorage`. Any XSS vulnerability on your page exposes all storage instantly. Use **`httpOnly` cookies** for authentication — they are inaccessible to JavaScript by design.',
  codeExample: `// Never store credentials in localStorage\n// localStorage.setItem('authToken', token)   <- do not do this\n\n// Auth tokens belong in httpOnly cookies (set by server):\n// Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Strict\n\n// Safe to store in localStorage:\nlocalStorage.setItem('theme', 'dark')\nlocalStorage.setItem('language', 'de')\nlocalStorage.setItem('cart', JSON.stringify(cartItems))`,
  language: 'typescript',
  analogy: {
    icon: '🔑',
    title: 'House keys under the doormat',
    text: [
      "Storing an auth token in localStorage is like hiding your house keys under the doormat. Anyone who finds an XSS vulnerability on your page can read it with one line of JavaScript.",
      "httpOnly cookies are the bank vault. They're set by the server, invisible to JavaScript, and automatically sent with every request. If you build auth, use httpOnly cookies.",
    ],
  },
},
```

- [ ] **Step 3: Add commonErrors and realWorldExamples to webapi-storage**

```ts
commonErrors: [
  {
    title: 'Storing auth tokens in localStorage',
    why: 'localStorage is readable by any JavaScript on the page. A single XSS vulnerability exposes all tokens — a critical security breach.',
    fixLabel: 'Use httpOnly cookies for authentication',
    fixCode: `// Server sets this — JS cannot read it\n// Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict`,
  },
  {
    title: 'JSON.parse without try/catch',
    why: 'Corrupted data, manual DevTools edits, or a previous bug can leave invalid JSON in storage. JSON.parse throws a SyntaxError that crashes your app.',
    fixLabel: 'Always wrap JSON.parse in try/catch',
    fixCode: `try {\n  return JSON.parse(localStorage.getItem(key) ?? 'null')\n} catch {\n  return fallback\n}`,
  },
  {
    title: 'Ignoring QuotaExceededError',
    why: 'Browsers limit localStorage to ~5MB. Writing beyond this throws QuotaExceededError synchronously. Uncaught, it silently crashes setItem.',
    fixLabel: 'Catch the error on setItem',
    fixCode: `try {\n  localStorage.setItem(key, value)\n} catch (e) {\n  console.warn('Storage quota exceeded', e)\n}`,
  },
],
realWorldExamples: [
  {
    context: 'App settings',
    heading: 'Persist user preferences',
    description: 'Read preferences on app load with a safe fallback. Write on every change. Use JSON for structured data.',
    code: `const prefs = getStored('prefs', { theme: 'light', lang: 'en' })\napplyTheme(prefs.theme)\n\nfunction updatePref(key: string, value: string) {\n  const current = getStored('prefs', { theme: 'light', lang: 'en' })\n  const updated = { ...current, [key]: value }\n  localStorage.setItem('prefs', JSON.stringify(updated))\n}`,
  },
  {
    context: 'E-commerce',
    heading: 'Cart that survives page refresh',
    description: 'Load cart from localStorage on mount. Write on every add/remove. Parse safely with try/catch, default to empty array.',
    code: `const [cart, setCart] = useState<CartItem[]>(\n  () => getStored<CartItem[]>('cart', [])\n)\n\nuseEffect(() => {\n  try {\n    localStorage.setItem('cart', JSON.stringify(cart))\n  } catch { /* quota exceeded — degrade gracefully */ }\n}, [cart])`,
  },
],
```

- [ ] **Step 4: TypeScript check + commit**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
git add src/data/topics.ts
git commit -m "feat: add analogies, new steps, commonErrors and realWorldExamples to webapi-storage"
```

---

## Task 6: EN locale — append new steps

**Files:**
- Modify: `src/i18n/locales/en/topics-other.json`

For each topic, append to the `steps` array. Do NOT modify existing steps 0–6.

- [ ] **Step 1: Append to webapi-fetch steps**

Find the last step object in webapi-fetch (animationStep: 7). Append after it:

```json
{
  "animationStep": 8,
  "heading": "Error Handling Patterns",
  "text": "`fetch()` only rejects on **network failure**. A `404` or `500` still resolves — `res.ok` is `false`. Use `try/catch` for network errors and `if (!res.ok) throw` for HTTP errors."
},
{
  "animationStep": 9,
  "heading": "AbortController",
  "text": "Pass `{ signal: controller.signal }` to `fetch()`. Call `controller.abort()` to cancel. In React `useEffect`, `abort()` in the cleanup function prevents state updates after unmount."
}
```

- [ ] **Step 2: Append to webapi-dom steps**

Find the last step in webapi-dom (animationStep: 6). Append:

```json
{
  "animationStep": 7,
  "heading": "classList Advanced Methods",
  "text": "`classList.toggle(class, force)` forces the class on (`true`) or off (`false`) without an `if/else`. `classList.replace('old', 'new')` swaps atomically. `.add()` and `.remove()` accept multiple class names."
},
{
  "animationStep": 8,
  "heading": "data-* Attributes",
  "text": "`data-*` attributes store custom data on HTML elements. Access via `el.dataset` — kebab-case converts to camelCase: `data-user-id` → `el.dataset.userId`. Writing to `dataset` sets the HTML attribute."
}
```

- [ ] **Step 3: Append to webapi-events steps**

Find the last step in webapi-events (animationStep: 6). Append:

```json
{
  "animationStep": 7,
  "heading": "Custom Events",
  "text": "`new CustomEvent(name, { detail })` creates a custom event. `element.dispatchEvent(event)` fires it. Set `bubbles: true` so parent elements can catch it. Any ancestor with `addEventListener(name, handler)` receives it."
},
{
  "animationStep": 8,
  "heading": "Event Delegation",
  "text": "Attach one listener to the parent instead of N listeners to children. Use `event.target.closest(selector)` to identify which child triggered the event. Works for elements added after the listener is attached."
}
```

- [ ] **Step 4: Append to webapi-storage steps**

Find the last step in webapi-storage (animationStep: 6). Append:

```json
{
  "animationStep": 7,
  "heading": "Safe Read with Fallback",
  "text": "Wrap `localStorage.getItem` + `JSON.parse` in `try/catch`. Return a typed fallback if the key is `null` or the JSON is invalid. Prevents crashes from corrupted or missing data."
},
{
  "animationStep": 8,
  "heading": "What NOT to Store",
  "text": "Never store passwords, auth tokens, or session IDs in `localStorage`. Any XSS vulnerability exposes all storage. Use `httpOnly` cookies for auth — they are inaccessible to JavaScript by design."
}
```

- [ ] **Step 5: Validate JSON + commit**

```bash
cd /home/jaywee92/web-dev-guide
node -e "require('./src/i18n/locales/en/topics-other.json'); console.log('EN JSON valid')"
git add src/i18n/locales/en/topics-other.json
git commit -m "feat: append new step entries (animationStep 7+8) for all 4 webapi topics to EN locale"
```

---

## Task 7: DE locale — German translations

**Files:**
- Modify: `src/i18n/locales/de/topics-other.json`

Mirror every addition from Task 6 with German translations.

- [ ] **Step 1: Append to webapi-fetch steps DE**

```json
{
  "animationStep": 8,
  "heading": "Fehlerbehandlungs-Muster",
  "text": "`fetch()` lehnt nur bei **Netzwerkfehlern** ab. Eine `404` oder `500` löst trotzdem auf — `res.ok` ist `false`. `try/catch` für Netzwerkfehler, `if (!res.ok) throw` für HTTP-Fehler verwenden."
},
{
  "animationStep": 9,
  "heading": "AbortController",
  "text": "`{ signal: controller.signal }` an `fetch()` übergeben. `controller.abort()` bricht die Anfrage ab. In React `useEffect` im Cleanup `abort()` aufrufen, um State-Updates nach dem Unmount zu verhindern."
}
```

- [ ] **Step 2: Append to webapi-dom steps DE**

```json
{
  "animationStep": 7,
  "heading": "classList Erweiterte Methoden",
  "text": "`classList.toggle(class, force)` erzwingt das Hinzufügen (`true`) oder Entfernen (`false`) ohne `if/else`. `classList.replace('alt', 'neu')` tauscht atomisch. `.add()` und `.remove()` akzeptieren mehrere Klassen."
},
{
  "animationStep": 8,
  "heading": "data-* Attribute",
  "text": "`data-*` Attribute speichern benutzerdefinierte Daten auf HTML-Elementen. Zugriff über `el.dataset` — Kebab-Case wird zu CamelCase: `data-user-id` → `el.dataset.userId`. Schreiben auf `dataset` setzt das HTML-Attribut."
}
```

- [ ] **Step 3: Append to webapi-events steps DE**

```json
{
  "animationStep": 7,
  "heading": "Custom Events",
  "text": "`new CustomEvent(name, { detail })` erstellt ein benutzerdefiniertes Event. `element.dispatchEvent(event)` feuert es ab. `bubbles: true` setzen, damit Elternelemente es abfangen können."
},
{
  "animationStep": 8,
  "heading": "Event Delegation",
  "text": "Einen Listener am Elternelement statt N Listener an Kindelementen anbringen. `event.target.closest(selector)` nutzen, um zu erkennen welches Kind das Event ausgelöst hat. Funktioniert auch für nachträglich hinzugefügte Elemente."
}
```

- [ ] **Step 4: Append to webapi-storage steps DE**

```json
{
  "animationStep": 7,
  "heading": "Sicheres Lesen mit Fallback",
  "text": "`localStorage.getItem` + `JSON.parse` in `try/catch` einwickeln. Einen typisierten Fallback zurückgeben, wenn der Key `null` oder das JSON ungültig ist. Verhindert Abstürze durch beschädigte oder fehlende Daten."
},
{
  "animationStep": 8,
  "heading": "Was NICHT gespeichert werden sollte",
  "text": "Niemals Passwörter, Auth-Tokens oder Session-IDs in `localStorage` speichern. Jede XSS-Lücke legt alle Daten offen. Für Authentifizierung `httpOnly`-Cookies verwenden — diese sind für JavaScript unzugänglich."
}
```

- [ ] **Step 5: Validate JSON + commit**

```bash
cd /home/jaywee92/web-dev-guide
node -e "require('./src/i18n/locales/de/topics-other.json'); console.log('DE JSON valid')"
git add src/i18n/locales/de/topics-other.json
git commit -m "feat: append German translations for new webapi step entries (animationStep 7+8)"
```

---

## Task 8: Final Verification

- [ ] **Step 1: Full TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```

Expected: no output (zero errors).

- [ ] **Step 2: Verify webapi-dom uses DomViz**

```bash
grep -n "animationComponent" /home/jaywee92/web-dev-guide/src/data/topics.ts | grep -E "webapi|DomViz" | head -5
grep "DomViz" /home/jaywee92/web-dev-guide/src/topics/registry.ts
```

Expected: webapi-dom shows `DomViz`, not `DomEventsViz`. Registry shows `DomViz` registered.

- [ ] **Step 3: Verify all locale JSON valid**

```bash
cd /home/jaywee92/web-dev-guide
node -e "
  require('./src/i18n/locales/en/topics-other.json')
  require('./src/i18n/locales/de/topics-other.json')
  console.log('Both locale files valid JSON')
"
```

- [ ] **Step 4: Spot-check commonErrors structure**

```bash
grep -c "fixLabel" /home/jaywee92/web-dev-guide/src/data/topics.ts
```

Expected: ≥ 12 (3 commonErrors × 4 topics, plus any existing ones from JS/HTML topics).

- [ ] **Step 5: Commit if any loose changes remain**

```bash
cd /home/jaywee92/web-dev-guide
git status
# If clean: done
# If changes: stage and commit with appropriate message
```
