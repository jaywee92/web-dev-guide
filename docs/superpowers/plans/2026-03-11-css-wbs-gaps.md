# CSS WBS Gap-Fill Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill the four gaps identified between WBS course materials and the current CSS topic pages: a new `css-basics` topic ("How CSS Works"), expanded `SelectorsViz` with pseudo-class/pseudo-element steps, `text-shadow` in the Typography cheat sheet, and `display: none` in the Display & Positioning explanation.

**Architecture:** All changes follow existing patterns. `css-basics` gets a new viz component (`CSSBasicsViz.tsx`) + topic entry in `topics.ts` + registry + category. `SelectorsViz.tsx` gets 2 new steps (pseudo-class, pseudo-element) via a minor interface refactor (add `property`/`value` fields). Two small `topics.ts` edits for the quickfixes.

**Tech Stack:** React 19, TypeScript 5.9, Framer Motion 12, Vite 7, CSS variables for theming (`var(--surface)`, `var(--border)`, `var(--font-mono)`, `var(--text-muted)`)

---

## Chunk 1: Quick fixes

### Task 1: Add `text-shadow` to Typography cheat sheet

**Files:**
- Modify: `src/data/topics.ts` — css-typography cheatSheet.syntax array

- [ ] **Step 1: Edit topics.ts**

In `src/data/topics.ts`, find the `css-typography` cheatSheet syntax array (around line 648). Add a new entry **after** the `letter-spacing` entry:

```ts
{ label: 'text-shadow', code: 'text-shadow: 2px 2px 4px rgba(0,0,0,0.4);\ntext-shadow: 0 0 8px #3b82f6; /* glow effect */', note: 'Offset-x offset-y blur color' },
```

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add text-shadow to css-typography cheat sheet"
```

---

### Task 2: Add `display: none` to Display & Positioning explanation

**Files:**
- Modify: `src/data/topics.ts` — css-display-positioning explanation steps

- [ ] **Step 1: Edit topics.ts**

In `src/data/topics.ts`, find the `css-display-positioning` explanation step 1 (`heading: 'display: inline'`, animationStep 1, around line 769). Update its `text` to mention `display: none`:

```ts
{
  animationStep: 1,
  heading: 'display: inline',
  text: 'Inline elements sit side by side in the text flow. They only take up as much width as their content. You can\'t set width or height on inline elements. Use display: none to remove an element from the flow entirely — it becomes invisible and takes no space.',
  codeExample: 'span { display: inline; } /* default */\na, strong, em { display: inline; }\n\n.hidden { display: none; } /* removed from flow + invisible */',
  language: 'css',
},
```

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: mention display:none in css-display-positioning explanation"
```

---

## Chunk 2: SelectorsViz — pseudo-class + pseudo-element steps

### Task 3: Update `SelectorsViz.tsx` — add steps 5 and 6

**Files:**
- Modify: `src/topics/css/SelectorsViz.tsx`

The current viz has 5 steps (0–4): intro, universal `*`, type, class, ID/specificity.

Changes:
1. Rename `colorName` → `property` + `value` in `SelectorStep` interface (allows showing any CSS property, not just `color`)
2. Add `ORANGE` and `TEAL` color constants
3. Add step 5: `a:hover` (pseudo-class, targets `<a>`)
4. Add step 6: `p::first-line` (pseudo-element, targets `<p>`)
5. Add `{ tag: 'a', attrs: 'href="#"' }` to `htmlElements`
6. Update `Math.min(step, 4)` → `Math.min(step, 6)`
7. Update `stepLabels` with 2 new entries
8. Update the render: `cfg.colorName` → `cfg.property` + `cfg.value`

- [ ] **Step 1: Replace the file with the complete updated version**

```tsx
// src/topics/css/SelectorsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN  = '#4ade80'
const BLUE   = '#5b9cf5'
const PURPLE = '#a78bfa'
const YELLOW = '#f5c542'
const ORANGE = '#f97316'
const TEAL   = '#14b8a6'

interface SelectorStep {
  selector: string | null
  rule: string | null
  color: string
  property: string | null
  value: string | null
  targets: string[]
  specificity: string | null
  specLabel: string | null
}

const STEPS: SelectorStep[] = [
  { selector: null,            rule: null,                                  color: '#52525b', property: null,              value: null,        targets: [],                specificity: null,    specLabel: null             },
  { selector: '*',             rule: '* { color: yellow }',                 color: YELLOW,   property: 'color',            value: 'yellow',    targets: ['h1','p','div','a'], specificity: '0,0,0', specLabel: 'universal'      },
  { selector: 'h1',            rule: 'h1 { color: green }',                 color: GREEN,    property: 'color',            value: 'green',     targets: ['h1'],             specificity: '0,0,1', specLabel: 'type'           },
  { selector: '.title',        rule: '.title { color: blue }',              color: BLUE,     property: 'color',            value: 'blue',      targets: ['h1'],             specificity: '0,1,0', specLabel: 'class'          },
  { selector: '#box',          rule: '#box { color: purple }',              color: PURPLE,   property: 'color',            value: 'purple',    targets: ['div'],            specificity: '1,0,0', specLabel: 'ID'             },
  { selector: 'a:hover',       rule: 'a:hover { text-decoration: ... }',    color: ORANGE,   property: 'text-decoration',  value: 'underline', targets: ['a'],              specificity: '0,1,1', specLabel: 'pseudo-class'   },
  { selector: 'p::first-line', rule: 'p::first-line { font-weight: ... }',  color: TEAL,     property: 'font-weight',      value: 'bold',      targets: ['p'],              specificity: '0,0,2', specLabel: 'pseudo-element' },
]

const stepLabels = [
  'CSS selectors target HTML elements',
  '* selects every element on the page',
  'Type selector — matches by tag name',
  'Class selector — reusable, matches many elements',
  'ID selector — unique, highest specificity',
  'Pseudo-class — targets elements based on state or position',
  'Pseudo-element — styles a virtual sub-part of an element',
]

const htmlElements = [
  { tag: 'h1',  attrs: 'class="title"' },
  { tag: 'p',   attrs: 'class="lead"' },
  { tag: 'div', attrs: 'id="box"' },
  { tag: 'a',   attrs: 'href="#"' },
]

export default function SelectorsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 6)
  const cfg = STEPS[s]
  const mono = 'var(--font-mono)'
  const fontSize = compact ? 9 : 11
  const panelW = compact ? 96 : 130

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 14 }}>
      <div style={{ display: 'flex', gap: compact ? 8 : 12, alignItems: 'stretch' }}>

        {/* Left: CSS rule panel */}
        <div style={{
          width: panelW,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: compact ? '6px 8px' : '8px 10px',
          fontFamily: mono,
          fontSize,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}>
          <span style={{ color: '#52525b', fontSize: compact ? 7 : 9 }}>style.css</span>

          <AnimatePresence mode="wait">
            {cfg.rule ? (
              <motion.div
                key={cfg.rule}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ color: cfg.color, fontWeight: 700 }}>{cfg.selector}</span>
                <span style={{ color: '#71717a' }}>{' {'}</span>
                <div style={{ paddingLeft: 8, color: cfg.color, opacity: 0.85 }}>
                  {cfg.property ?? 'color'}{': '}{cfg.value ?? '...'}{';'}
                </div>
                <span style={{ color: '#71717a' }}>{'}'}</span>
              </motion.div>
            ) : (
              <motion.span
                key="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                style={{ color: '#52525b', fontSize: compact ? 8 : 9 }}
              >
                {'/* no rule */'}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Specificity badge */}
          <AnimatePresence>
            {cfg.specificity && (
              <motion.div
                key={cfg.specificity + cfg.specLabel}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: compact ? 7 : 9,
                  color: cfg.color,
                  background: `${cfg.color}18`,
                  border: `1px solid ${cfg.color}44`,
                  borderRadius: 3,
                  padding: '2px 5px',
                  textAlign: 'center',
                }}
              >
                ({cfg.specificity}) {cfg.specLabel}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ color: s > 0 ? cfg.color : '#71717a' }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', fontSize: compact ? 16 : 20 }}
        >
          →
        </motion.div>

        {/* Right: HTML elements panel */}
        <div style={{
          width: panelW,
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: compact ? '6px 8px' : '8px 10px',
          fontFamily: mono,
          fontSize,
          display: 'flex',
          flexDirection: 'column',
          gap: compact ? 4 : 6,
        }}>
          <span style={{ color: '#52525b', fontSize: compact ? 7 : 9 }}>index.html</span>

          {htmlElements.map(el => {
            const targeted = cfg.targets.includes(el.tag)
            return (
              <motion.div
                key={el.tag}
                animate={{
                  color: targeted ? cfg.color : '#52525b',
                  background: targeted ? `${cfg.color}14` : 'transparent',
                  boxShadow: targeted ? `0 0 8px ${cfg.color}44` : 'none',
                }}
                transition={{ duration: 0.35 }}
                style={{ borderRadius: 3, padding: '2px 4px', fontSize }}
              >
                <span style={{ opacity: 0.5 }}>&lt;</span>
                <span style={{ fontWeight: 700 }}>{el.tag}</span>
                {!compact && (
                  <span style={{ opacity: 0.6 }}> {el.attrs}</span>
                )}
                <span style={{ opacity: 0.5 }}>&gt;</span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: mono,
            fontSize: compact ? 11 : 12,
            textAlign: 'center',
            color: s === 0 ? '#71717a' : cfg.color,
            margin: 0,
          }}
        >
          {stepLabels[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/topics/css/SelectorsViz.tsx
git commit -m "feat: SelectorsViz — add pseudo-class (a:hover) and pseudo-element (p::first-line) steps"
```

---

### Task 4: Update `css-selectors` topic in `topics.ts` — add explanation steps 5 and 6

**Files:**
- Modify: `src/data/topics.ts` — css-selectors explanation steps array

- [ ] **Step 1: Add 2 new explanation steps**

In `src/data/topics.ts`, find the css-selectors explanation steps array. After the last step (animationStep 4, heading 'Specificity — which rule wins'), add these two steps:

```ts
{
  animationStep: 5,
  heading: 'Pseudo-classes — state-based targeting',
  text: 'Pseudo-classes target elements based on their state or position. :hover fires when the mouse is over the element. :focus activates when a form field is focused. :nth-child(n) matches by position in a list.',
  codeExample: 'a:hover  { text-decoration: underline; }\ninput:focus { outline: 2px solid #3b82f6; }\nli:nth-child(odd)  { background: rgba(255,255,255,0.05); }\nli:first-child { font-weight: bold; }',
  language: 'css',
},
{
  animationStep: 6,
  heading: 'Pseudo-elements — virtual sub-parts',
  text: 'Pseudo-elements style a part of an element that doesn\'t exist in the HTML. ::before and ::after inject generated content. ::first-line and ::first-letter target text. Always use content: "" with ::before/::after.',
  codeExample: 'p::first-line { font-weight: bold; }\n\n.card::before {\n  content: "";\n  display: block;\n  width: 4px;\n  background: #3b82f6;\n}\n\na::after { content: " →"; }',
  language: 'css',
},
```

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: css-selectors — add pseudo-class and pseudo-element explanation steps"
```

---

## Chunk 3: New `css-basics` topic — "How CSS Works"

### Task 5: Create `CSSBasicsViz.tsx`

**Files:**
- Create: `src/topics/css/CSSBasicsViz.tsx`

5-step viz showing the 3 ways to apply CSS and the cascade:
- Step 0: No CSS — browser defaults
- Step 1: Inline `style="..."` — highest specificity
- Step 2: Internal `<style>` in `<head>`
- Step 3: External `<link rel="stylesheet">`
- Step 4: The Cascade — competing rules, specificity winner highlighted

- [ ] **Step 1: Create the file**

```tsx
// src/topics/css/CSSBasicsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const ORANGE = '#f97316'
const BLUE   = '#3b82f6'
const GREEN  = '#22c55e'
const PURPLE = '#a855f7'

type Method = 'none' | 'inline' | 'internal' | 'external' | 'cascade'

interface StepCfg {
  method: Method
  color: string
  badge: string
  label: string
}

const STEPS: StepCfg[] = [
  { method: 'none',     color: '#71717a', badge: 'No CSS',   label: 'Without CSS — browsers apply their own default styles' },
  { method: 'inline',   color: ORANGE,    badge: 'Inline',   label: 'Inline style= — directly on the element, highest specificity' },
  { method: 'internal', color: BLUE,      badge: 'Internal', label: 'Internal <style> — in the <head>, scoped to one HTML file' },
  { method: 'external', color: GREEN,     badge: 'External', label: 'External <link> — one .css file for the whole site (best practice)' },
  { method: 'cascade',  color: PURPLE,    badge: 'Cascade',  label: 'Cascade — specificity decides which rule wins' },
]

const CASCADE_RULES = [
  { spec: '(0,0,1)', sel: 'p',     prop: 'color: grey',  wins: false },
  { spec: '(0,1,0)', sel: '.text', prop: 'color: blue',  wins: true  },
  { spec: '(0,0,1)', sel: 'p',     prop: 'color: red',   wins: false },
]

export default function CSSBasicsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEPS[s]
  const mono = 'var(--font-mono)'
  const fs = compact ? 8 : 10
  const panelW = compact ? 200 : 280

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      <div style={{
        width: panelW,
        background: 'var(--surface)',
        border: `1px solid ${s === 0 ? 'var(--border)' : cfg.color + '44'}`,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        {/* Method badge bar */}
        <div style={{
          background: s === 0 ? 'var(--border)' : `${cfg.color}18`,
          borderBottom: `1px solid ${s === 0 ? 'var(--border)' : cfg.color + '33'}`,
          padding: compact ? '3px 8px' : '4px 12px',
        }}>
          <span style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: s === 0 ? '#52525b' : cfg.color, fontWeight: 600 }}>
            {cfg.badge}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: compact ? 10 : 14, minHeight: compact ? 60 : 80 }}>
          <AnimatePresence mode="wait">
            {s === 0 && (
              <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: compact ? 11 : 14, color: '#a1a1aa' }}>
                  Default text — no CSS applied
                </span>
              </motion.div>
            )}
            {s === 1 && (
              <motion.div key="inline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ fontFamily: mono, fontSize: fs, color: '#71717a', lineHeight: 1.7 }}>
                  {'<p '}
                  <span style={{ color: ORANGE, fontWeight: 700 }}>{'style="color: blue; font-weight: bold;"'}</span>
                  {'>'}
                </div>
                <div style={{ marginTop: compact ? 4 : 6, color: BLUE, fontWeight: 700, fontSize: compact ? 11 : 14, fontFamily: 'sans-serif' }}>Hello</div>
              </motion.div>
            )}
            {s === 2 && (
              <motion.div key="internal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ fontFamily: mono, fontSize: fs, color: '#71717a', lineHeight: 1.7 }}>
                  {'<head>'}<br />
                  {'  '}<span style={{ color: BLUE, fontWeight: 700 }}>{'<style>'}</span><br />
                  {'    '}<span style={{ color: BLUE }}>{'p { color: blue; }'}</span><br />
                  {'  '}<span style={{ color: BLUE, fontWeight: 700 }}>{'</style>'}</span><br />
                  {'</head>'}
                </div>
              </motion.div>
            )}
            {s === 3 && (
              <motion.div key="external" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ fontFamily: mono, fontSize: fs, color: '#71717a', lineHeight: 1.7 }}>
                  {'<head>'}<br />
                  {'  '}<span style={{ color: GREEN, fontWeight: 700 }}>{'<link rel="stylesheet" href="style.css">'}</span><br />
                  {'</head>'}
                </div>
                <div style={{ marginTop: compact ? 5 : 8, fontFamily: mono, fontSize: compact ? 7 : 9, color: GREEN, border: `1px solid ${GREEN}44`, borderRadius: 4, padding: '2px 6px', display: 'inline-block' }}>
                  style.css
                </div>
              </motion.div>
            )}
            {s === 4 && (
              <motion.div key="cascade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 5 }}>
                {CASCADE_RULES.map((rule, i) => (
                  <div key={i} style={{
                    fontFamily: mono,
                    fontSize: compact ? 7 : 9,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: rule.wins ? `${PURPLE}18` : 'transparent',
                    border: rule.wins ? `1px solid ${PURPLE}55` : '1px solid transparent',
                    color: rule.wins ? PURPLE : '#52525b',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <span>
                      <span style={{ opacity: 0.6 }}>{rule.spec} </span>
                      <span>{rule.sel}</span>
                      <span style={{ opacity: 0.6 }}>{' { '}</span>
                      <span>{rule.prop}</span>
                      <span style={{ opacity: 0.6 }}>{' }'}</span>
                    </span>
                    {rule.wins && <span style={{ fontWeight: 700 }}>wins</span>}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          style={{
            margin: 0,
            fontFamily: mono,
            fontSize: compact ? 10 : 11,
            color: s === 0 ? '#71717a' : cfg.color,
            textAlign: 'center',
          }}
        >
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: 0 errors (the viz file exists but isn't registered yet — no error since registry uses dynamic imports).

- [ ] **Step 3: Commit**

```bash
git add src/topics/css/CSSBasicsViz.tsx
git commit -m "feat: CSSBasicsViz — no CSS / inline / internal / external / cascade"
```

---

### Task 6: Add `css-basics` topic definition to `topics.ts`

**Files:**
- Modify: `src/data/topics.ts`

Add the new topic **before** `css-box-model` (the first CSS topic, currently around line 1). The new topic should be the first in the CSS section.

- [ ] **Step 1: Locate the start of CSS topics in topics.ts**

```bash
grep -n "id: 'css-box-model'" /home/jaywee92/web-dev-guide/src/data/topics.ts
```

Note the line number. The new topic goes **immediately before** that line.

- [ ] **Step 2: Insert the topic definition**

Insert this topic definition before `css-box-model`:

```ts
  {
    id: 'css-basics',
    title: 'How CSS Works',
    description: 'Three ways to apply CSS and how the cascade resolves conflicts',
    level: 1,
    category: 'css',
    color: '#5b9cf5',
    estimatedMinutes: 8,
    animationComponent: 'CSSBasicsViz',
    playgroundType: 'none',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'Browser defaults',
            text: 'Without any CSS, browsers apply their own built-in styles — serif fonts, margins on headings, blue underlined links. Every stylesheet you write overrides these defaults.',
            codeExample: '/* No CSS needed to see browser defaults */\n/* h1 → bold + margin, p → margin, a → blue + underline */',
            language: 'css',
          },
          {
            animationStep: 1,
            heading: 'Inline styles',
            text: 'Apply CSS directly on a single element using the style attribute. Inline styles have the highest specificity — they override external and internal stylesheets. Use only for truly one-off dynamic values (e.g. set by JavaScript).',
            codeExample: '<p style="color: blue; font-weight: bold;">\n  This paragraph is styled inline.\n</p>',
            language: 'html',
          },
          {
            animationStep: 2,
            heading: 'Internal <style> tag',
            text: 'Write CSS inside a <style> element in the <head>. Useful for single-page prototypes or HTML email templates. Not ideal for multi-page sites — styles must be duplicated in every file.',
            codeExample: '<head>\n  <style>\n    p { color: blue; font-weight: bold; }\n  </style>\n</head>',
            language: 'html',
          },
          {
            animationStep: 3,
            heading: 'External stylesheet',
            text: 'Link a .css file using <link> in the <head>. Best practice for real projects — one file applies to every page. Change one file, every page updates.',
            codeExample: '<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n\n/* style.css */\np { color: blue; font-weight: bold; }',
            language: 'html',
          },
          {
            animationStep: 4,
            heading: 'The Cascade',
            text: 'When multiple rules target the same element, the browser uses specificity to decide the winner. Higher specificity always wins. Equal specificity? The later rule in the source wins.',
            codeExample: '/* (0,0,1) type */\np { color: grey; }\n\n/* (0,1,0) class — WINS (higher spec) */\n.text { color: blue; }\n\n/* (0,0,1) same as first, later but loses */\np { color: red; }',
            language: 'css',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'Inline style', code: '<p style="color: red; font-weight: bold;">', note: 'Highest specificity — avoid for general styling' },
        { label: 'Internal <style>', code: '<head>\n  <style>\n    p { color: red; }\n  </style>\n</head>', note: 'Single-file use only' },
        { label: 'External <link>', code: '<head>\n  <link rel="stylesheet" href="style.css">\n</head>', note: 'Best practice — use this' },
        { label: 'Specificity order', code: '/* lowest → highest */\ntype         /* (0,0,1)  p, h1, a */\nclass        /* (0,1,0)  .card, :hover */\n#id          /* (1,0,0)  #hero */\nstyle="..."  /* inline   */\n!important   /* nuclear — avoid */', note: 'Higher wins; equal spec → later wins' },
      ],
      patterns: [
        { title: 'CSS reset at top of external stylesheet', code: '/* style.css */\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: "Inter", sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n}', language: 'css' },
      ],
      whenToUse: 'Always use an external stylesheet for real projects. Inline styles only for values set dynamically by JavaScript. Internal <style> for HTML email or single-file demos.',
      commonMistakes: [
        'Overusing inline styles — highest specificity makes them hard to override later',
        'Forgetting the cascade — if a style "isn\'t working", check specificity: a class rule beats a type rule',
        '!important breaks the cascade and leads to specificity wars — it\'s a last resort, not a default',
      ],
    },
  },
```

- [ ] **Step 3: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: 0 errors (CSSBasicsViz not yet in registry — dynamic import, no compile-time error).

- [ ] **Step 4: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add css-basics topic — How CSS Works (inline/internal/external/cascade)"
```

---

### Task 7: Register `CSSBasicsViz` + update category

**Files:**
- Modify: `src/topics/registry.ts`
- Modify: `src/data/categories.ts`

- [ ] **Step 1: Add to registry.ts**

In `src/topics/registry.ts`, add `CSSBasicsViz` to the `lazyRegistry`. It should be placed near the other CSS viz entries. Find the line with `ColorsUnitsViz:` and add before it:

```ts
CSSBasicsViz: () => import('./css/CSSBasicsViz'),
```

- [ ] **Step 2: Add `css-basics` as first CSS topic in categories.ts**

In `src/data/categories.ts`, update the CSS `topicIds` array to include `'css-basics'` as the **first entry**:

```ts
topicIds: [
  'css-basics',
  'css-box-model',
  'css-flexbox',
  'css-grid',
  'css-selectors',
  'css-colors-units',
  'css-typography',
  'css-backgrounds-gradients',
  'css-display-positioning',
  'css-responsive',
  'css-images',
],
```

- [ ] **Step 3: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/topics/registry.ts src/data/categories.ts
git commit -m "feat: register CSSBasicsViz, add css-basics as first CSS topic"
```

---

## Chunk 4: Final verification and push

### Task 8: Build check + push

- [ ] **Step 1: Full TypeScript build**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: 0 errors.

- [ ] **Step 2: Production build**

```bash
npm run build 2>&1 | tail -10
```
Expected: `✓ built in X.XXs` — no errors.

- [ ] **Step 3: Verify CSS category count**

```bash
grep "css-" /home/jaywee92/web-dev-guide/src/data/categories.ts | wc -l
```
Expected: 11 (css-basics + 10 existing topics).

- [ ] **Step 4: Git log to confirm all commits**

```bash
git log --oneline -12
```
Expected: 7 new commits on top of the last sprint's commits.

- [ ] **Step 5: Push**

```bash
git push origin main
```
