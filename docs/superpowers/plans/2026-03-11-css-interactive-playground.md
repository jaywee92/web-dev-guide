# CSS Interactive Playground Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a live CSS playground (Monaco editor + iframe preview), One Dark Pro syntax highlighting on code blocks, 4 new CSS topics, and reorder all CSS topics into 4 logical groups.

**Architecture:** New `CSSLivePlayground` component in `src/playgrounds/` uses Monaco Editor for CSS input and an iframe sandbox for live preview. Shiki (client-side singleton) upgrades `CodeBlock.tsx`. Four new Viz components follow the existing `{ step: number; compact?: boolean }` pattern. Topic data gains `defaultCSS`/`previewHTML` optional fields consumed only by the `css-live` playground.

**Tech Stack:** React 19, TypeScript, Vite, @monaco-editor/react (existing), shiki (new), Framer Motion (existing)

**Security note:** The `CSSLivePlayground` iframe uses `sandbox="allow-scripts"` and `srcDoc` — CSS entered by the user is scoped to the iframe and cannot escape to the parent page. The Shiki `CodeBlock` uses `dangerouslySetInnerHTML` only with Shiki output, which is generated from our own static topic data strings (not user input) — this is safe.

---

## Chunk 1: Types + Category Reorder

### Task 1: Extend types and reorder CSS categories

**Files:**
- Modify: `src/types/index.ts` (lines 1-5 PlaygroundType, lines 43-55 Topic)
- Modify: `src/data/categories.ts` (lines 18-30 CSS topicIds)

- [ ] **Step 1: Add `'css-live'` to PlaygroundType and `defaultCSS`/`previewHTML` to Topic**

Open `src/types/index.ts` and make these exact changes:

Line 2 — change PlaygroundType to:
```ts
export type PlaygroundType = 'visual-controls' | 'monaco' | 'none' | 'gradient' | 'css-live'
```

Inside the Topic interface, after the `playgroundType` line, add two optional fields:
```ts
  defaultCSS?: string      // pre-filled CSS for css-live playground
  previewHTML?: string     // fixed HTML template for css-live preview
```

- [ ] **Step 2: Reorder CSS topicIds in categories.ts**

Replace the CSS `topicIds` array in `src/data/categories.ts`:
```ts
topicIds: [
  // GRUNDLAGEN
  'css-basics',
  'css-selectors',
  'css-colors-units',
  'css-box-model',
  // STYLING
  'css-typography',
  'css-backgrounds-gradients',
  'css-images',
  // LAYOUT
  'css-display-positioning',
  'css-flexbox',
  'css-grid',
  'css-responsive',
  // MODERNE CSS / EFFEKTE
  'css-custom-properties',
  'css-transforms',
  'css-transitions',
  'css-animations',
],
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/types/index.ts src/data/categories.ts
git commit -m "feat: add css-live PlaygroundType, defaultCSS/previewHTML to Topic, reorder CSS topics"
```

---

## Chunk 2: CSSLivePlayground Component

### Task 2: Create CSSLivePlayground and wire it in PlaygroundSection

**Files:**
- Create: `src/playgrounds/CSSLivePlayground.tsx`
- Modify: `src/pages/TopicPage/PlaygroundSection.tsx`

Security: User CSS is injected into an iframe with `sandbox="allow-scripts"`. The CSS is scoped to the iframe — it cannot affect the parent document. This is the standard safe pattern for live code editors.

- [ ] **Step 1: Create `src/playgrounds/CSSLivePlayground.tsx`**

```tsx
import { useState, useCallback, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { useAppStore } from '@/store/useAppStore'

interface Props {
  defaultCSS: string
  previewHTML: string
  topicId: string
}

const IFRAME_BASE_STYLE = `
  body {
    margin: 0;
    padding: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #e2e8f0;
    background: #0f172a;
    box-sizing: border-box;
  }
  * { box-sizing: inherit; }
`

function buildSrcDoc(html: string, css: string): string {
  return [
    '<!DOCTYPE html><html><head><style>',
    IFRAME_BASE_STYLE,
    css,
    '</style></head><body>',
    html,
    '</body></html>',
  ].join('')
}

export default function CSSLivePlayground({ defaultCSS, previewHTML, topicId }: Props) {
  const { theme } = useAppStore()
  const [css, setCss] = useState(defaultCSS)
  const [showHTML, setShowHTML] = useState(false)
  const editorRef = useRef<{ setValue: (v: string) => void } | null>(null)

  const handleReset = useCallback(() => {
    setCss(defaultCSS)
    editorRef.current?.setValue(defaultCSS)
  }, [defaultCSS])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: 'var(--surface-bright)',
        border: '1px solid var(--border)',
        borderBottom: 'none',
        borderRadius: 'var(--radius) var(--radius) 0 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {(['#f87171', '#f5c542', '#4ade80'] as const).map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
          <span style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            marginLeft: 6,
          }}>
            style.css — {topicId}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setShowHTML(v => !v)}
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: showHTML ? 'var(--text)' : 'var(--text-muted)',
              background: showHTML ? 'var(--border)' : 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '2px 8px',
              cursor: 'pointer',
            }}
          >
            {showHTML ? 'Hide HTML' : 'Show HTML'}
          </button>
          <button
            onClick={handleReset}
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '2px 8px',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        border: '1px solid var(--border)',
        borderRadius: '0 0 var(--radius) var(--radius)',
        overflow: 'hidden',
        minHeight: 380,
      }}>
        {/* Editor pane */}
        <div style={{ borderRight: '1px solid var(--border)' }}>
          {showHTML ? (
            <Editor
              height="380px"
              language="html"
              value={previewHTML}
              options={{
                readOnly: true,
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 12 },
              }}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
            />
          ) : (
            <Editor
              height="380px"
              language="css"
              value={css}
              onChange={v => setCss(v ?? '')}
              onMount={editor => { editorRef.current = editor as { setValue: (v: string) => void } }}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 12 },
                wordWrap: 'on',
              }}
            />
          )}
        </div>

        {/* Preview pane — sandboxed iframe, CSS cannot escape to parent */}
        <iframe
          title="CSS preview"
          srcDoc={buildSrcDoc(previewHTML, css)}
          sandbox="allow-scripts"
          style={{ width: '100%', height: 380, border: 'none', background: '#0f172a' }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Wire `css-live` in PlaygroundSection**

Replace `src/pages/TopicPage/PlaygroundSection.tsx` with:

```tsx
import type { Topic } from '@/types'
import VisualPlayground from '@/playgrounds/VisualPlayground'
import MonacoPlayground from '@/playgrounds/MonacoPlayground'
import { lazy, Suspense } from 'react'

const GradientPlayground = lazy(() => import('@/playgrounds/GradientPlayground'))
const CSSLivePlayground  = lazy(() => import('@/playgrounds/CSSLivePlayground'))

const LOADING = <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading...</div>

interface Props { topic: Topic }

export default function PlaygroundSection({ topic }: Props) {
  if (topic.playgroundType === 'none') return null

  return (
    <section style={{
      maxWidth: 1100, margin: '0 auto',
      padding: '64px 24px 80px',
      borderTop: '1px solid var(--border)',
    }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
        Playground
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
        Experiment directly — changes apply in real time.
      </p>
      {topic.playgroundType === 'gradient' ? (
        <Suspense fallback={LOADING}><GradientPlayground /></Suspense>
      ) : topic.playgroundType === 'css-live' ? (
        <Suspense fallback={LOADING}>
          <CSSLivePlayground
            topicId={topic.id}
            defaultCSS={topic.defaultCSS ?? '/* Write your CSS here */'}
            previewHTML={topic.previewHTML ?? '<div class="box">Hello</div>'}
          />
        </Suspense>
      ) : topic.playgroundType === 'visual-controls' ? (
        <VisualPlayground topicId={topic.id} />
      ) : (
        <MonacoPlayground topicId={topic.id} />
      )}
    </section>
  )
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/playgrounds/CSSLivePlayground.tsx src/pages/TopicPage/PlaygroundSection.tsx
git commit -m "feat: CSSLivePlayground — Monaco editor + sandboxed iframe, reset + show HTML toggle"
```

---

## Chunk 3: Shiki Syntax Highlighting

### Task 3: Install Shiki and upgrade CodeBlock

**Files:**
- Create: `src/lib/shiki.ts`
- Modify: `src/components/ui/CodeBlock.tsx`

Security note: `dangerouslySetInnerHTML` is used only with Shiki output. Shiki receives the `code` prop which comes from static topic data in `topics.ts` — it is not user input and cannot contain malicious content.

- [ ] **Step 1: Install shiki**

```bash
pnpm add shiki
```

Expected: shiki added to package.json dependencies.

- [ ] **Step 2: Create `src/lib/shiki.ts`**

```ts
import { createHighlighter, type Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['one-dark-pro'],
      langs: ['css', 'html', 'javascript', 'typescript', 'python', 'sql', 'bash'],
    })
  }
  return highlighterPromise
}

export const SUPPORTED_LANGS = new Set(['css', 'html', 'javascript', 'typescript', 'python', 'sql', 'bash'])
```

- [ ] **Step 3: Update `src/components/ui/CodeBlock.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { getHighlighter, SUPPORTED_LANGS } from '@/lib/shiki'

interface Props {
  code: string
  language?: string
  label?: string
}

export default function CodeBlock({ code, language = 'code', label }: Props) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)

  useEffect(() => {
    const lang = SUPPORTED_LANGS.has(language) ? language : null
    if (!lang) {
      setHighlightedHtml(null)
      return
    }
    let cancelled = false
    getHighlighter().then(hl => {
      if (cancelled) return
      // Input is static topic data, not user input — safe for dangerouslySetInnerHTML
      setHighlightedHtml(hl.codeToHtml(code, { lang, theme: 'one-dark-pro' }))
    })
    return () => { cancelled = true }
  }, [code, language])

  return (
    <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {label && (
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ background: 'var(--surface-bright)', borderBottom: '1px solid var(--border)' }}
        >
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {label}
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
            {language}
          </span>
        </div>
      )}
      {highlightedHtml ? (
        // Shiki output is from our own static topic data — not user input
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          style={{ fontSize: 13, lineHeight: 1.6, overflowX: 'auto' }}
        />
      ) : (
        <pre style={{
          background: 'var(--surface)',
          padding: '16px',
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text)',
          overflowX: 'auto',
          margin: 0,
        }}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 5: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/lib/shiki.ts src/components/ui/CodeBlock.tsx package.json pnpm-lock.yaml
git commit -m "feat: Shiki One Dark Pro syntax highlighting for CodeBlock"
```

---

## Chunk 4: Four New Viz Components

### Task 4: CustomPropertiesViz

**Files:**
- Create: `src/topics/css/CustomPropertiesViz.tsx`

- [ ] **Step 1: Create `src/topics/css/CustomPropertiesViz.tsx`**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE   = '#3b82f6'
const PURPLE = '#a855f7'
const GREEN  = '#22c55e'

const STEPS = [
  { color: '#71717a', badge: 'No variables',  label: 'Hardcoded values repeated in every rule — hard to maintain' },
  { color: BLUE,      badge: 'Declare',       label: 'Declare --color-primary on :root — one source of truth' },
  { color: GREEN,     badge: 'Use var()',      label: 'var() reads the custom property everywhere it\'s needed' },
  { color: PURPLE,    badge: 'Override',      label: 'Override in a child scope — no need to touch every rule' },
  { color: '#f97316', badge: 'Token system',  label: 'Design token system — a small set of variables drives the whole UI' },
] as const

const mono = 'var(--font-mono)'

export default function CustomPropertiesViz({ step, compact = false }: Props) {
  const s = Math.max(0, Math.min(step, 4))
  const cfg = STEPS[s]
  const fs = compact ? 8 : 11
  const panelW = compact ? 210 : 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      <div style={{
        width: panelW,
        background: '#1e1e2e',
        border: `1px solid ${cfg.color}44`,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        <div style={{ background: `${cfg.color}18`, borderBottom: `1px solid ${cfg.color}33`, padding: compact ? '3px 8px' : '4px 12px' }}>
          <span style={{ fontFamily: mono, fontSize: compact ? 7 : 9, color: cfg.color, fontWeight: 600 }}>{cfg.badge}</span>
        </div>
        <div style={{ padding: compact ? 8 : 14, fontFamily: mono, fontSize: fs, lineHeight: 1.8 }}>
          <AnimatePresence mode="wait">
            {s === 0 && (
              <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div><span style={{ color: '#61afef' }}>.btn</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: '#98c379' }}>background</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>#3b82f6</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
                <div style={{ marginTop: 6 }}><span style={{ color: '#61afef' }}>.link</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: '#98c379' }}>color</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>#3b82f6</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
              </motion.div>
            )}
            {s === 1 && (
              <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div><span style={{ color: '#61afef' }}>:root</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: BLUE, fontWeight: 700 }}>--color-primary</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>#3b82f6</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
              </motion.div>
            )}
            {s === 2 && (
              <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div><span style={{ color: '#61afef' }}>:root</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: BLUE }}>--color-primary</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>#3b82f6</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
                <div style={{ marginTop: 6 }}><span style={{ color: '#61afef' }}>.btn</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: '#98c379' }}>background</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: GREEN, fontWeight: 700 }}>var(--color-primary)</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
              </motion.div>
            )}
            {s === 3 && (
              <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div style={{ color: '#e06c75', fontSize: compact ? 7 : 9 }}>{'/* Override in child */'}</div>
                <div><span style={{ color: '#61afef' }}>.dark-section</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: PURPLE, fontWeight: 700 }}>--color-primary</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>#1d4ed8</span><span style={{ color: '#abb2bf' }}>;</span></div>
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
              </motion.div>
            )}
            {s === 4 && (
              <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div><span style={{ color: '#61afef' }}>:root</span><span style={{ color: '#abb2bf' }}> {'{'}</span></div>
                {[['--color-primary','#3b82f6'],['--color-surface','#1e293b'],['--radius','8px'],['--spacing-md','16px']].map(([n,v])=>(
                  <div key={n} style={{ paddingLeft: 12 }}>
                    <span style={{ color: '#f97316' }}>{n}</span><span style={{ color: '#abb2bf' }}>: </span><span style={{ color: '#e5c07b' }}>{v}</span><span style={{ color: '#abb2bf' }}>;</span>
                  </div>
                ))}
                <div><span style={{ color: '#abb2bf' }}>{'}'}</span></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
          style={{ margin: 0, fontFamily: mono, fontSize: compact ? 10 : 11, color: cfg.color, textAlign: 'center', maxWidth: panelW }}>
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

### Task 5: TransformsViz

**Files:**
- Create: `src/topics/css/TransformsViz.tsx`

- [ ] **Step 1: Create `src/topics/css/TransformsViz.tsx`**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const STEPS = [
  { color: '#71717a', label: 'No transform — element in its normal flow position',           transformStr: 'none',                                              code: '/* no transform */' },
  { color: '#3b82f6', label: 'translate() — move without affecting surrounding elements',    transformStr: 'translate(40px, 20px)',                             code: 'transform: translate(40px, 20px);' },
  { color: '#a855f7', label: 'rotate() — spin around the element\'s center point',           transformStr: 'rotate(45deg)',                                     code: 'transform: rotate(45deg);' },
  { color: '#22c55e', label: 'scale() — grow or shrink; 1 = original size',                 transformStr: 'scale(1.5)',                                        code: 'transform: scale(1.5);' },
  { color: '#f97316', label: 'Combined — transforms stack left-to-right (order matters)',   transformStr: 'translate(20px, -10px) rotate(20deg) scale(1.2)',  code: 'transform: translate(20px, -10px)\n         rotate(20deg) scale(1.2);' },
] as const

const mono = 'var(--font-mono)'

export default function TransformsViz({ step, compact = false }: Props) {
  const s = Math.max(0, Math.min(step, 4))
  const cfg = STEPS[s]
  const boxSize = compact ? 48 : 64

  const animateTarget =
    cfg.transformStr === 'none'
      ? { x: 0, y: 0, rotate: 0, scale: 1 }
      : cfg.transformStr === 'translate(40px, 20px)'
        ? { x: 40, y: 20, rotate: 0, scale: 1 }
        : cfg.transformStr === 'rotate(45deg)'
          ? { x: 0, y: 0, rotate: 45, scale: 1 }
          : cfg.transformStr === 'scale(1.5)'
            ? { x: 0, y: 0, rotate: 0, scale: 1.5 }
            : { x: 20, y: -10, rotate: 20, scale: 1.2 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      <div style={{
        width: compact ? 200 : 280,
        height: compact ? 140 : 180,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ width: boxSize, height: boxSize, border: '1px dashed var(--border)', borderRadius: 6, position: 'absolute', opacity: s === 0 ? 0 : 0.35 }} />
        <motion.div
          animate={animateTarget}
          transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          style={{
            width: boxSize, height: boxSize,
            background: `${cfg.color}33`,
            border: `2px solid ${cfg.color}`,
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: mono, fontSize: compact ? 9 : 11, color: cfg.color, fontWeight: 700,
          }}
        >
          .box
        </motion.div>
      </div>
      <div style={{ fontFamily: mono, fontSize: compact ? 8 : 10, color: '#98c379', background: '#1e1e2e', padding: compact ? '4px 8px' : '6px 12px', borderRadius: 6, whiteSpace: 'pre' }}>
        {cfg.code}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
          style={{ margin: 0, fontFamily: mono, fontSize: compact ? 10 : 11, color: cfg.color, textAlign: 'center', maxWidth: compact ? 200 : 280 }}>
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

### Task 6: TransitionsViz

**Files:**
- Create: `src/topics/css/TransitionsViz.tsx`

- [ ] **Step 1: Create `src/topics/css/TransitionsViz.tsx`**

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Props { step: number; compact?: boolean }

const STEPS = [
  { color: '#71717a', label: 'No transition — state changes snap instantly',            code: '/* no transition */',                        duration: 0,   ease: 'linear' as const },
  { color: '#3b82f6', label: 'transition: color 0.3s — color animates smoothly',       code: 'transition: color 0.3s;',                   duration: 0.3, ease: 'linear' as const },
  { color: '#22c55e', label: 'transition: all 0.5s — every changing property animates', code: 'transition: all 0.5s;',                    duration: 0.5, ease: 'linear' as const },
  { color: '#a855f7', label: 'ease-in-out — slow start + slow end = natural feel',     code: 'transition: all 0.4s ease-in-out;',         duration: 0.4, ease: 'easeInOut' as const },
  { color: '#f97316', label: 'Multiple: each property gets its own duration',          code: 'transition: color 0.3s,\n           transform 0.2s;', duration: 0.3, ease: 'easeOut' as const },
] as const

const mono = 'var(--font-mono)'

export default function TransitionsViz({ step, compact = false }: Props) {
  const s = Math.max(0, Math.min(step, 4))
  const cfg = STEPS[s]
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      <motion.button
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          backgroundColor: hovered ? cfg.color + '33' : '#47556922',
          scale: hovered && s >= 4 ? 1.08 : 1,
          color: hovered ? cfg.color : '#475569',
        }}
        transition={{ duration: cfg.duration, ease: cfg.ease }}
        style={{
          padding: compact ? '10px 20px' : '14px 28px',
          border: `2px solid ${hovered ? cfg.color : '#475569'}`,
          borderRadius: 8,
          fontFamily: mono,
          fontSize: compact ? 11 : 13,
          cursor: 'pointer',
        }}
      >
        Hover me
      </motion.button>
      <div style={{ fontFamily: mono, fontSize: compact ? 8 : 9, color: '#64748b' }}>hover to trigger</div>
      <div style={{ fontFamily: mono, fontSize: compact ? 8 : 10, color: '#98c379', background: '#1e1e2e', padding: compact ? '4px 8px' : '6px 12px', borderRadius: 6, whiteSpace: 'pre' }}>
        {cfg.code}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
          style={{ margin: 0, fontFamily: mono, fontSize: compact ? 10 : 11, color: cfg.color, textAlign: 'center', maxWidth: compact ? 200 : 280 }}>
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

### Task 7: AnimationsViz

**Files:**
- Create: `src/topics/css/AnimationsViz.tsx`

- [ ] **Step 1: Create `src/topics/css/AnimationsViz.tsx`**

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const STEPS = [
  { color: '#71717a', label: 'Static element — no animation',                          animate: false, infinite: false, fillFwd: false, code: '/* no animation */' },
  { color: '#3b82f6', label: '@keyframes defined but not applied — nothing moves yet', animate: false, infinite: false, fillFwd: false, code: '@keyframes bounce {\n  from { transform: translateY(0); }\n  to   { transform: translateY(-60px); }\n}' },
  { color: '#22c55e', label: 'animation-name + animation-duration — animates once',    animate: true,  infinite: false, fillFwd: false, code: 'animation: bounce 0.8s;' },
  { color: '#a855f7', label: 'animation-iteration-count: infinite — repeats forever',  animate: true,  infinite: true,  fillFwd: false, code: 'animation: bounce 0.8s infinite alternate;' },
  { color: '#f97316', label: 'animation-fill-mode: forwards — holds the end state',    animate: true,  infinite: false, fillFwd: true,  code: 'animation: bounce 0.8s forwards;' },
] as const

const mono = 'var(--font-mono)'

function ballTransition(cfg: typeof STEPS[number]) {
  if (!cfg.animate) return {}
  if (cfg.infinite)  return { y: [0, -60, 0], transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' as const } }
  if (cfg.fillFwd)   return { y: -60,          transition: { duration: 0.8, ease: 'easeOut' as const } }
  return               { y: [0, -60, 0],    transition: { duration: 0.8, ease: 'easeInOut' as const } }
}

export default function AnimationsViz({ step, compact = false }: Props) {
  const s = Math.max(0, Math.min(step, 4))
  const cfg = STEPS[s]
  const ballSize = compact ? 36 : 48

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      <div style={{
        width: compact ? 180 : 240,
        height: compact ? 140 : 180,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: compact ? 16 : 24,
        overflow: 'hidden',
      }}>
        <motion.div
          key={s}
          animate={ballTransition(cfg)}
          style={{
            width: ballSize, height: ballSize,
            borderRadius: '50%',
            background: `${cfg.color}33`,
            border: `2px solid ${cfg.color}`,
          }}
        />
      </div>
      <div style={{ fontFamily: mono, fontSize: compact ? 8 : 10, color: '#98c379', background: '#1e1e2e', padding: compact ? '4px 8px' : '6px 12px', borderRadius: 6, whiteSpace: 'pre' }}>
        {cfg.code}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={s} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
          style={{ margin: 0, fontFamily: mono, fontSize: compact ? 10 : 11, color: cfg.color, textAlign: 'center', maxWidth: compact ? 200 : 280 }}>
          {cfg.label}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

### Task 8: Register all 4 new viz components

**Files:**
- Modify: `src/topics/registry.ts`

- [ ] **Step 1: Add 4 entries to lazyRegistry after the `ImagesViz` line**

```ts
  CustomPropertiesViz: () => import('./css/CustomPropertiesViz'),
  TransformsViz: () => import('./css/TransformsViz'),
  TransitionsViz: () => import('./css/TransitionsViz'),
  AnimationsViz: () => import('./css/AnimationsViz'),
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/topics/css/CustomPropertiesViz.tsx src/topics/css/TransformsViz.tsx \
        src/topics/css/TransitionsViz.tsx src/topics/css/AnimationsViz.tsx \
        src/topics/registry.ts
git commit -m "feat: CustomPropertiesViz, TransformsViz, TransitionsViz, AnimationsViz + registry"
```

---

## Chunk 5: Topic Data

### Task 9: Add defaultCSS/previewHTML to all existing CSS topics + change playgroundType to css-live

**Files:**
- Modify: `src/data/topics.ts`

For each topic below: find the topic by its `id`, change `playgroundType` to `'css-live'`, and add `defaultCSS` and `previewHTML` fields on the next two lines.

**css-basics** (line ~233 in topics.ts):
- Change `playgroundType: 'none'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: '.text {\n  color: #3b82f6;\n  font-size: 1.5rem;\n  font-weight: bold;\n}',
previewHTML: '<p class="text">Hello, CSS!</p>',
```

**css-box-model** (line ~306):
- Change `playgroundType: 'visual-controls'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: '.card {\n  padding: 24px;\n  margin: 16px auto;\n  max-width: 300px;\n  border: 3px solid #3b82f6;\n  border-radius: 12px;\n  background: #1e293b;\n  color: #e2e8f0;\n}',
previewHTML: '<div class="card"><strong>Card Title</strong><p style="margin:8px 0 0;color:#94a3b8;font-size:13px">Card content goes here.</p></div>',
```

**css-flexbox** (line ~375):
- Change `playgroundType: 'visual-controls'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: 'nav {\n  display: flex;\n  gap: 24px;\n  justify-content: center;\n  padding: 16px;\n  background: #1e293b;\n  border-radius: 8px;\n}\nnav a {\n  color: #e2e8f0;\n  text-decoration: none;\n  font-size: 14px;\n}',
previewHTML: '<nav><a href="#">Home</a><a href="#">About</a><a href="#">Contact</a></nav>',
```

**css-grid** (line ~445):
- Change `playgroundType: 'visual-controls'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.grid div {\n  padding: 20px;\n  background: #1e293b;\n  border-radius: 8px;\n  color: #94a3b8;\n  font-size: 13px;\n  text-align: center;\n}',
previewHTML: '<div class="grid"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>',
```

**css-selectors** (line ~521):
- Change `playgroundType: 'none'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: 'p { color: #94a3b8; }\n.highlight { color: #f97316; font-weight: bold; }\na { color: #3b82f6; }\na:hover { color: #60a5fa; text-decoration: underline; }',
previewHTML: '<p>Normal paragraph</p><p class="highlight">Selected paragraph</p><a href="#">Hover over this link</a>',
```

**css-colors-units** (line ~611):
- Change `playgroundType: 'visual-controls'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: '.box {\n  width: 10rem;\n  height: 10rem;\n  background: hsl(220, 80%, 60%);\n  border-radius: 50%;\n  margin: 0 auto;\n}',
previewHTML: '<div class="box"></div>',
```

**css-typography** (line ~688):
- Change `playgroundType: 'visual-controls'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: 'h1 {\n  font-family: Georgia, serif;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #f1f5f9;\n  letter-spacing: -0.02em;\n}\np {\n  font-size: 1rem;\n  line-height: 1.7;\n  color: #94a3b8;\n  max-width: 480px;\n}',
previewHTML: '<article><h1>Article Title</h1><p>Body text goes here. Good typography makes reading comfortable and establishes visual hierarchy.</p></article>',
```

**css-backgrounds-gradients** (line ~766):
- Change `playgroundType: 'gradient'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: '.hero {\n  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);\n  padding: 60px 40px;\n  border-radius: 12px;\n  color: white;\n  text-align: center;\n}\n.hero h2 { margin: 0; font-size: 1.8rem; }\n.hero p  { margin: 8px 0 0; opacity: 0.8; }',
previewHTML: '<div class="hero"><h2>Hero Section</h2><p>Gradient backgrounds set the mood.</p></div>',
```

**css-display-positioning** (line ~842):
- Change `playgroundType: 'visual-controls'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: '.container {\n  display: flex;\n  gap: 16px;\n  padding: 16px;\n}\n.box {\n  position: relative;\n  padding: 20px 24px;\n  background: #1e293b;\n  border-radius: 8px;\n  color: #94a3b8;\n}\n.badge {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  background: #3b82f6;\n  color: white;\n  font-size: 11px;\n  padding: 2px 6px;\n  border-radius: 99px;\n}',
previewHTML: '<div class="container"><div class="box">Block A</div><div class="box">Block B<span class="badge">new</span></div></div>',
```

**css-responsive** (line ~918):
- Change `playgroundType: 'visual-controls'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: '.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n@media (min-width: 600px) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}\n@media (min-width: 900px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n.card {\n  padding: 20px;\n  background: #1e293b;\n  border-radius: 8px;\n  color: #94a3b8;\n}',
previewHTML: '<div class="grid"><div class="card">Card 1</div><div class="card">Card 2</div><div class="card">Card 3</div></div>',
```

**css-images** (line ~992):
- Change `playgroundType: 'visual-controls'` to `playgroundType: 'css-live'`
- Add after:
```ts
defaultCSS: '.avatar {\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 3px solid #3b82f6;\n  display: block;\n  margin: 0 auto;\n}',
previewHTML: '<img class="avatar" src="https://picsum.photos/200/200" alt="avatar">',
```

- [ ] **Step 1: Apply all 11 edits to src/data/topics.ts** (using Edit tool per topic)

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/data/topics.ts
git commit -m "feat: css-live playground data for all 11 existing CSS topics"
```

---

### Task 10: Add 4 new CSS topic definitions

**Files:**
- Modify: `src/data/topics.ts` — insert after the closing `},` of the `css-images` topic block

Find the `id: 'css-images'` topic. After its closing `},`, insert all four topic objects. Each is complete below.

**css-custom-properties:**
```ts
{
  id: 'css-custom-properties',
  title: 'CSS Custom Properties',
  description: 'Variables in CSS — declare once, reuse everywhere, override in child scopes',
  level: 2,
  category: 'css',
  color: '#5b9cf5',
  estimatedMinutes: 10,
  animationComponent: 'CustomPropertiesViz',
  playgroundType: 'css-live',
  defaultCSS: ':root {\n  --color-primary: #3b82f6;\n  --radius: 8px;\n}\n\n.btn {\n  background: var(--color-primary);\n  border-radius: var(--radius);\n  padding: 10px 20px;\n  color: white;\n  border: none;\n  cursor: pointer;\n}\n\n.card {\n  border: 2px solid var(--color-primary);\n  border-radius: var(--radius);\n  padding: 16px;\n}',
  previewHTML: '<div class="card"><p style="margin:0 0 12px;color:#94a3b8">A card with border</p><button class="btn">Click me</button></div>',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        { animationStep: 0, heading: 'The problem: hardcoded values', text: 'Without variables, you repeat the same color hex in dozens of rules. Change the brand color? Find and replace across every file.', codeExample: '.btn { background: #3b82f6; }\n.link { color: #3b82f6; }\n/* Change brand = edit many places */', language: 'css' },
        { animationStep: 1, heading: 'Declare with --name', text: 'Custom properties start with --. Declare them on :root to make them globally available. They cascade just like any CSS property.', codeExample: ':root {\n  --color-primary: #3b82f6;\n  --radius: 8px;\n}', language: 'css' },
        { animationStep: 2, heading: 'Use with var()', text: 'The var() function reads the custom property value. Change --color-primary in one place and every rule using var(--color-primary) updates automatically.', codeExample: '.btn  { background: var(--color-primary); }\n.link { color: var(--color-primary); }\n/* Change brand = edit :root only */', language: 'css' },
        { animationStep: 3, heading: 'Override in child scope', text: 'Re-declare the variable inside a selector to override it for that subtree. Child elements see the new value; elements outside are unaffected.', codeExample: ':root { --color-primary: #3b82f6; }\n\n.dark-section {\n  --color-primary: #1d4ed8;\n}\n/* .btn inside .dark-section → #1d4ed8 */\n/* .btn outside still → #3b82f6 */', language: 'css' },
        { animationStep: 4, heading: 'Design token system', text: 'A small set of custom properties (colors, spacing, radii) becomes your design system. Components reference tokens — change a token and the whole UI updates.', codeExample: ':root {\n  --color-primary:  #3b82f6;\n  --color-surface:  #1e293b;\n  --radius:         8px;\n  --spacing-md:     16px;\n}', language: 'css' },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'Declare variable', code: ':root {\n  --color-primary: #3b82f6;\n}', note: ':root = global scope' },
      { label: 'Use variable', code: '.btn {\n  background: var(--color-primary);\n}' },
      { label: 'Fallback value', code: 'color: var(--text, #e2e8f0);', note: 'Second arg = fallback if not set' },
      { label: 'Override in scope', code: '.dark {\n  --color-primary: #1d4ed8;\n}', note: 'Only affects children of .dark' },
    ],
    whenToUse: 'Use custom properties for any value repeated 3+ times, or any value that changes between themes or contexts.',
    commonMistakes: [
      'Forgetting the -- prefix — --my-var is valid, my-var is just a plain attribute',
      'Using var() without a fallback in critical properties — if undefined, the property is invalid',
      'Overusing custom properties for one-off values — they are for shared, reusable tokens',
    ],
  },
},
```

**css-transforms:**
```ts
{
  id: 'css-transforms',
  title: 'CSS Transforms',
  description: 'Move, rotate, scale, and skew elements without affecting document flow',
  level: 2,
  category: 'css',
  color: '#5b9cf5',
  estimatedMinutes: 10,
  animationComponent: 'TransformsViz',
  playgroundType: 'css-live',
  defaultCSS: '.box {\n  width: 100px;\n  height: 100px;\n  background: #3b82f6;\n  border-radius: 8px;\n  margin: 40px auto;\n  transform: rotate(15deg) scale(1.1);\n  transition: transform 0.3s ease;\n}\n\n.box:hover {\n  transform: rotate(0deg) scale(1.2);\n}',
  previewHTML: '<div class="box"></div>',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        { animationStep: 0, heading: 'No transform', text: 'Without transform, the element sits in its normal document flow. Transforms apply visually — they do not push other elements around.', codeExample: '.box {\n  width: 100px;\n  height: 100px;\n  background: #3b82f6;\n}', language: 'css' },
        { animationStep: 1, heading: 'translate()', text: 'translate(x, y) moves the element from its normal position. Unlike margin, it does not affect surrounding layout — other elements stay put.', codeExample: '.box {\n  transform: translate(40px, 20px);\n  /* Moves right 40px, down 20px */\n}', language: 'css' },
        { animationStep: 2, heading: 'rotate()', text: 'rotate(angle) spins the element around its transform-origin (default: center). Positive values = clockwise.', codeExample: '.box {\n  transform: rotate(45deg);\n  /* Rotate 45° clockwise */\n}', language: 'css' },
        { animationStep: 3, heading: 'scale()', text: 'scale(n) resizes the element visually. 1 = original size, 1.5 = 50% larger, 0.5 = half size.', codeExample: '.box {\n  transform: scale(1.5);\n  /* 150% of original size */\n}', language: 'css' },
        { animationStep: 4, heading: 'Combining transforms', text: 'Multiple transform functions stack left-to-right. Order matters — rotate then translate is different from translate then rotate.', codeExample: '.box {\n  transform: translate(20px, -10px)\n             rotate(20deg)\n             scale(1.2);\n}', language: 'css' },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'Translate', code: 'transform: translate(40px, 20px);', note: 'translateX() / translateY() also work' },
      { label: 'Rotate', code: 'transform: rotate(45deg);', note: 'Positive = clockwise' },
      { label: 'Scale', code: 'transform: scale(1.5);', note: 'scaleX() / scaleY() for one axis' },
      { label: 'Combined', code: 'transform: translate(20px, -10px) rotate(20deg) scale(1.2);', note: 'Order matters!' },
      { label: 'Transform origin', code: 'transform-origin: top left;', note: 'Default is center center' },
    ],
    whenToUse: 'Use transforms for hover effects, animations, and positioning UI elements. Prefer transform over margin/top/left for animated movement — it is GPU-accelerated.',
    commonMistakes: [
      'Confusing transform with position — transform is visual-only, does not affect flow',
      'Forgetting order matters — rotate then translate != translate then rotate',
      'Using px for translate on fluid layouts — use % to translate relative to the element itself',
    ],
  },
},
```

**css-transitions:**
```ts
{
  id: 'css-transitions',
  title: 'CSS Transitions',
  description: 'Smoothly animate property changes between states',
  level: 2,
  category: 'css',
  color: '#5b9cf5',
  estimatedMinutes: 10,
  animationComponent: 'TransitionsViz',
  playgroundType: 'css-live',
  defaultCSS: '.btn {\n  background: #3b82f6;\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  cursor: pointer;\n  transition: background 0.3s ease, transform 0.2s ease;\n}\n\n.btn:hover {\n  background: #1d4ed8;\n  transform: translateY(-2px);\n}',
  previewHTML: '<button class="btn">Hover me</button>',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        { animationStep: 0, heading: 'Without transition', text: 'Without transition, any property change (on :hover, :focus, class toggle) snaps instantly. It works, but feels abrupt.', codeExample: '.btn:hover {\n  background: #1d4ed8; /* snaps instantly */\n}', language: 'css' },
        { animationStep: 1, heading: 'Add transition: property duration', text: 'transition tells the browser to animate the named property over a given duration whenever it changes. The animation plays in both directions automatically.', codeExample: '.btn {\n  transition: background 0.3s;\n}\n.btn:hover {\n  background: #1d4ed8;\n}', language: 'css' },
        { animationStep: 2, heading: 'transition: all', text: 'all animates every changing property. Convenient but can be slow — prefer listing specific properties for performance.', codeExample: '.btn {\n  transition: all 0.5s;\n}', language: 'css' },
        { animationStep: 3, heading: 'Timing functions', text: 'The timing function controls the pace. ease-in-out starts slow, speeds up, then slows down — the most natural feel for UI.', codeExample: 'transition: all 0.4s ease-in-out;\n\n/* ease | linear | ease-in | ease-out | ease-in-out */', language: 'css' },
        { animationStep: 4, heading: 'Multiple transitions', text: 'Comma-separate to give each property a different duration. Common pattern: color transitions slower than transform.', codeExample: '.btn {\n  transition:\n    background 0.3s ease,\n    transform  0.2s ease;\n}', language: 'css' },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'Single property', code: 'transition: background 0.3s ease;', note: 'property duration timing' },
      { label: 'Multiple', code: 'transition: background 0.3s, transform 0.2s;' },
      { label: 'All properties', code: 'transition: all 0.3s ease;', note: 'Convenient but avoid for performance' },
      { label: 'With delay', code: 'transition: opacity 0.3s ease 0.1s;', note: 'Last value = delay before starting' },
    ],
    whenToUse: 'Use transitions for state changes driven by CSS pseudo-classes (:hover, :focus, :checked) or class toggles. For complex timed sequences use animation instead.',
    commonMistakes: [
      'Putting transition on :hover — it only plays on hover-in, not hover-out. Always put transition on the base element',
      'Using transition: all in performance-sensitive components — list specific properties instead',
      'Animating layout properties (width, height) — animate transform and opacity; they are GPU-accelerated',
    ],
  },
},
```

**css-animations:**
```ts
{
  id: 'css-animations',
  title: 'CSS Animations',
  description: '@keyframes animations that run automatically, repeat, and fill',
  level: 2,
  category: 'css',
  color: '#5b9cf5',
  estimatedMinutes: 12,
  animationComponent: 'AnimationsViz',
  playgroundType: 'css-live',
  defaultCSS: '.ball {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: #3b82f6;\n  margin: 60px auto 0;\n  animation: bounce 1s ease-in-out infinite alternate;\n}\n\n@keyframes bounce {\n  from { transform: translateY(0); }\n  to   { transform: translateY(-80px); }\n}',
  previewHTML: '<div class="ball"></div>',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        { animationStep: 0, heading: 'Animations vs transitions', text: 'Transitions react to state changes. Animations run on their own — no user interaction needed. They have defined keyframes, can loop, and can pause.', codeExample: '/* Transition: needs a trigger */\n.btn:hover { background: blue; }\n\n/* Animation: runs on its own */\n.spinner { animation: spin 1s linear infinite; }', language: 'css' },
        { animationStep: 1, heading: '@keyframes', text: 'Define the animation with @keyframes + a name. Use from/to for two states, or percentages (0%, 50%, 100%) for multiple stops.', codeExample: '@keyframes bounce {\n  from { transform: translateY(0); }\n  to   { transform: translateY(-60px); }\n}\n\n/* Not applied yet — just defined */', language: 'css' },
        { animationStep: 2, heading: 'Apply with animation shorthand', text: 'The animation shorthand takes name, duration, timing, and more. Without a duration the animation plays in 0 seconds and is invisible.', codeExample: '.ball {\n  animation: bounce 0.8s;\n  /* name  duration */\n}', language: 'css' },
        { animationStep: 3, heading: 'Repeat with iteration-count', text: 'animation-iteration-count: infinite loops forever. Use alternate to play forward then backward — creates smooth bounce without abrupt jumps.', codeExample: '.ball {\n  animation: bounce 0.8s ease-in-out infinite alternate;\n}', language: 'css' },
        { animationStep: 4, heading: 'animation-fill-mode', text: "fill-mode controls the element's state before and after the animation. forwards holds the final keyframe — the element stays where the animation ended.", codeExample: ".ball {\n  animation: bounce 0.8s ease-out forwards;\n  /* 'forwards' = stay at the final keyframe */\n}", language: 'css' },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: '@keyframes', code: '@keyframes name {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}' },
      { label: 'Apply shorthand', code: 'animation: name 0.5s ease-out forwards;', note: 'name duration timing fill-mode' },
      { label: 'Loop forever', code: 'animation: spin 1s linear infinite;' },
      { label: 'Bounce (alternate)', code: 'animation: bounce 0.8s ease-in-out infinite alternate;', note: 'Plays fwd then backward' },
      { label: 'With delay', code: 'animation: fade 0.3s ease 0.5s both;', note: 'Fourth value = delay' },
    ],
    whenToUse: 'Use @keyframes for looping effects (spinners, pulses), entrance animations (fade-in, slide-in), or multi-step sequences. Use transitions for simple two-state changes.',
    commonMistakes: [
      'Animating layout properties (width, height) — always animate transform and opacity instead',
      'Forgetting animation-fill-mode: forwards when you want the final state to persist',
      'Not setting animation-iteration-count when you want it to loop (default is 1)',
    ],
  },
},
```

- [ ] **Step 1: Apply all 4 new topic insertions to src/data/topics.ts**

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 3: Build check**

Run: `pnpm build`
Expected: successful build, 0 errors

- [ ] **Step 4: Commit**

```bash
cd /home/jaywee92/web-dev-guide
git add src/data/topics.ts
git commit -m "feat: add css-custom-properties, css-transforms, css-transitions, css-animations topics"
```

---

## Final: Commit docs

- [ ] **Step 1: Commit design and plan docs**

```bash
cd /home/jaywee92/web-dev-guide
git add docs/superpowers/specs/2026-03-11-css-interactive-playground-design.md \
        docs/superpowers/plans/2026-03-11-css-interactive-playground.md
git commit -m "docs: CSS interactive playground design spec and implementation plan"
```

---

## Verification Checklist

After all tasks complete, verify in browser (`pnpm dev`):

- [ ] CSS category shows 15 topics in correct order (4 groups: Grundlagen, Styling, Layout, Moderne CSS)
- [ ] All CSS topics show a live playground with Monaco editor + iframe split
- [ ] Typing CSS in editor updates iframe in real time
- [ ] Reset button restores the original pre-filled CSS
- [ ] Show HTML toggles to read-only HTML view
- [ ] Code blocks in explanation steps show One Dark Pro colors
- [ ] New topics (css-custom-properties, css-transforms, css-transitions, css-animations) are accessible and their viz components animate through all 5 steps
- [ ] `pnpm build` completes with 0 errors

