# Analogy Animation Design — js-variables Prototype

**Date:** 2026-03-23
**Status:** Approved
**Scope:** Replace text-only AnalogyPanel with animated visual (hybrid geometric style) — prototype on `js-variables` topic, system designed to extend to other topics.

---

## Background

The `AnalogyPanel` component currently renders a static block of text (icon + title + 2–3 paragraphs) for each explanation step. The goal is to replace this with animated SVG/Framer Motion visuals that communicate the analogy through motion rather than words.

**Layout chosen (Option B):** Animation at top, single-sentence caption below. Replaces the emoji icon and verbose text. The header (amber badge + title) is preserved.

**Animation style chosen (Option C — Hybrid):** Code-like labeled boxes representing scope/structure, combined with a clear visual action (arrows, locks, color shifts). Matches the existing viz aesthetic.

---

## Architecture

### New file: `src/topics/javascript/VariablesAnalogyViz.tsx`

A step-driven component (`{ step: number }`) with 8 branches — one per explanation step in `js-variables`. Each branch renders a Framer Motion animated panel.

**Step → animation mapping:**

| Step | Analogy | Visual |
|------|---------|--------|
| 0 | var — leaky bucket | `if` block inside `function` scope; arrow escaping upward with animated pulse |
| 1 | let — sealed room | Thick-bordered block with 🔒; attempted outside access → red `ReferenceError` |
| 2 | const — name tag | Box with pinned label; label reassignment ✗ (red); property change ✓ (green) |
| 3 | Primitives — atoms | 6 colored chips (string/number/boolean/null/undefined/symbol) with type labels |
| 4 | typeof — shipping label | Value box → scan arrow → label output; `null → "object" ⚠️` highlighted |
| 5 | Arithmetic — calculator | Expression chips with animated result appearing |
| 6 | Comparison — courtroom | Two values on a scale; `===` strict label vs `==` lenient label |
| 7 | try/catch — safety net | Flow arrow: `try` block → error → diverts to `catch`; `finally` always runs |

Transitions: `AnimatePresence mode="wait"` on a wrapper keyed by `step`. Each branch fades/slides in.

---

### Modified: `AnalogyPanel.tsx`

New optional props:
```tsx
interface Props {
  analogy: ExplanationStep['analogy'] | undefined
  color: string
  AnalogyComp?: ComponentType<{ step: number }> | null
  step?: number  // required in practice when AnalogyComp is provided; safe to default to 0
}
```

Render logic:
- If `AnalogyComp` is provided: render `<AnalogyComp step={step ?? 0} />` + `analogy?.text[analogy.text.length - 1]` as caption (omit caption if `analogy` is undefined — no crash).
- If not provided: existing behavior (emoji icon + all text paragraphs). Fully backwards-compatible.
- If both `analogy` and `AnalogyComp` are absent, return `null` as before.

Note: the `"Analogie"` badge label is hardcoded (pre-existing, not in scope for this spec).

---

### Modified: `registry.ts`

New analogy registry parallel to existing `lazyRegistry`. Includes a synchronous `loadedAnalogyRegistry` cache:

```ts
type AnalogyComp = ComponentType<{ step: number }>

const analogyLazyRegistry: Record<string, () => Promise<{ default: AnalogyComp }>> = {
  VariablesAnalogyViz: () => import('./javascript/VariablesAnalogyViz'),
}

const loadedAnalogyRegistry: Record<string, AnalogyComp> = {}

export function getAnalogyComponent(name: string | undefined): AnalogyComp | null {
  if (!name) return null
  return loadedAnalogyRegistry[name] ?? null
}

export async function preloadAnalogyAnimation(name: string | undefined): Promise<void> {
  if (!name || loadedAnalogyRegistry[name] || !analogyLazyRegistry[name]) return
  const mod = await analogyLazyRegistry[name]()
  loadedAnalogyRegistry[name] = mod.default
}
```

---

### Modified: `SyncExplanation.tsx`

**Deliberate divergence from `AnimComp` pattern:** Unlike `AnimComp` (which is loaded in `TopicPage/index.tsx` and passed down as a prop), `AnalogyComp` is loaded directly inside `SyncExplanation` using `useState` + `useEffect`. This is intentional — `SyncExplanation` already owns `ctrl.step` and the topic data, so co-locating the analogy component loading here avoids threading extra props through `TopicPage`.

The Props interface is **unchanged** — no new props needed:

```tsx
interface Props {
  topic: Topic
  AnimComp: ComponentType<{ step: number; compact?: boolean }> | null
  animLoading?: boolean
}
```

Inside `SyncExplanation`, add:

```tsx
const [AnalogyComp, setAnalogyComp] = useState<ComponentType<{step:number}> | null>(
  () => topic ? getAnalogyComponent(topic.analogyComponent) : null
)

useEffect(() => {
  if (!topic?.analogyComponent) return
  preloadAnalogyAnimation(topic.analogyComponent).then(() => {
    setAnalogyComp(() => getAnalogyComponent(topic.analogyComponent))
  })
}, [topic?.analogyComponent])
```

Pass to `AnalogyPanel`:
```tsx
<AnalogyPanel
  analogy={steps[ctrl.step]?.analogy}
  color={topic.color}
  AnalogyComp={AnalogyComp}
  step={ctrl.step}
/>
```

---

### Modified: `src/data/topics.ts`

```ts
// js-variables topic:
analogyComponent: 'VariablesAnalogyViz',
```

---

### Modified: `src/types/index.ts`

```ts
interface Topic {
  // ... existing fields
  analogyComponent?: string  // optional — topics without it keep text-only analogies
}
```

---

## Non-goals

- No i18n for the animation visuals (code labels are in English — consistent with existing viz components).
- No changes to other topics — this is a prototype on `js-variables` only.
- No removal of `analogy.text` data — still used as caption source and as fallback.
- No fix for hardcoded `"Analogie"` badge label — pre-existing i18n gap, out of scope.

---

## File Checklist

- [ ] `src/topics/javascript/VariablesAnalogyViz.tsx` — new
- [ ] `src/pages/TopicPage/AnalogyPanel.tsx` — extend props + conditional render
- [ ] `src/topics/registry.ts` — add analogy registry + cache
- [ ] `src/pages/TopicPage/SyncExplanation.tsx` — load AnalogyComp + pass to AnalogyPanel
- [ ] `src/data/topics.ts` — add `analogyComponent` to js-variables
- [ ] `src/types/index.ts` — add optional `analogyComponent` to Topic type
