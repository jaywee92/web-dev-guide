# Step Content Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Visually upgrade all step cards — add thematic emoji icons to every step header, and give each `expandedText` paragraph a colour-coded type card (📜 context, 💡 tip, ⚠️ warning, 🔬 deep-dive, ✅ pattern) — improving scannability and visual hierarchy across all 97 topics in both EN and DE.

**Architecture:** Three layers of change:
1. **Renderer** (`SyncExplanation.tsx`) — detect leading emoji prefix in each expandedText paragraph and map it to a colour-coded card style; slightly increase step-text size/brightness.
2. **Step icons** (`src/data/topics.ts`) — populate the existing `icon?: string` field on every `ExplanationStep` (453 steps) with a thematic emoji. The `...step` spread in `hooks.ts` already passes `icon` through — no hook change needed.
3. **Paragraph type prefixes** — prepend one emoji (`📖 / 💡 / ⚠️ / 🔬 / ✅ / 📜`) to each paragraph in every `expandedText` field in `topics.ts` (EN, 782 paragraphs) and all four DE locale JSON files.

**Tech Stack:** TypeScript/React (renderer), Python (data scripts), JSON (DE locale files)

---

## File Map

| File | Change |
|---|---|
| `src/pages/TopicPage/SyncExplanation.tsx` | Add `CARD_STYLES` map, `detectCardEmoji()`, rewrite expanded card JSX, brighten step text |
| `src/data/topics.ts` | Add `icon` field to all 453 `ExplanationStep` objects; add emoji prefix to all 782 `expandedText` paragraphs |
| `src/i18n/locales/de/topics-js.json` | Add emoji prefix to all expandedText paragraphs |
| `src/i18n/locales/de/topics-css.json` | Add emoji prefix to all expandedText paragraphs |
| `src/i18n/locales/de/topics-html.json` | Add emoji prefix to all expandedText paragraphs |
| `src/i18n/locales/de/topics-other.json` | Add emoji prefix to all expandedText paragraphs |

---

## Task 1: Renderer — emoji-typed cards + step text upgrade

**Files:**
- Modify: `src/pages/TopicPage/SyncExplanation.tsx`

- [ ] **Step 1: Add CARD_STYLES map and detectCardEmoji helper**

Insert directly above the `renderInlineText` function (before line 144):

```tsx
// ── Expanded card type system ──────────────────────────────────────────────
const CARD_STYLES: Record<string, { bg: string; border: string; accent: string }> = {
  '📜': { bg: '#141319', border: '#a78bfa28', accent: '#a78bfa' },
  '💡': { bg: '#1b1a0e', border: '#fbbf2428', accent: '#fbbf24' },
  '⚠️': { bg: '#1b120a', border: '#f9731628', accent: '#f97316' },
  '🔬': { bg: '#0f1420', border: '#7c8cf828', accent: '#7c8cf8' },
  '✅': { bg: '#0d1a12', border: '#22c55e28', accent: '#22c55e' },
  '📖': { bg: 'var(--surface-bright)', border: 'var(--border)', accent: '' },
}

function detectCardEmoji(text: string): string | null {
  return Object.keys(CARD_STYLES).find(e => text.startsWith(e)) ?? null
}
```

- [ ] **Step 2: Upgrade step text styling**

In `StepBlock`, find the step text `<p>` (currently around line 257–259):

```tsx
<p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>
  {renderInlineText(step.text, color)}
</p>
```

Replace with:

```tsx
<p style={{ fontSize: 13.5, color: '#c5c8d8', lineHeight: 1.8, margin: 0, letterSpacing: '-0.01em' }}>
  {renderInlineText(step.text, color)}
</p>
```

- [ ] **Step 3: Replace expanded card rendering block**

Find the current expanded cards block (lines 262–291) — the entire `{step.expandedText && expanded && (...)}` block:

```tsx
{step.expandedText && expanded && (
  <div style={{ borderTop: `1px solid ${color}18`, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 7 }}>
    {step.expandedText.split(/\n\n+/).map((para, i) => {
      const trimmed = para.trim()
      // Only use label if bold appears early (first 40 chars) — avoids mid-sentence extractions
      const earlyBoldMatch = trimmed.match(/^\*\*([^*]+)\*\*|^.{0,40}\*\*([^*]+)\*\*/)
      const label = earlyBoldMatch ? (earlyBoldMatch[1] ?? earlyBoldMatch[2]) : null
      return (
        <div key={i} style={{
          borderRadius: 8,
          border: `1px solid var(--border)`,
          background: 'var(--surface-bright)',
          padding: '9px 12px',
        }}>
          {label && (
            <div style={{
              fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
              letterSpacing: '0.1em', color: `${color}99`,
              textTransform: 'uppercase', marginBottom: 4,
            }}>
              {label}
            </div>
          )}
          <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
            {renderInlineText(trimmed, color)}
          </p>
        </div>
      )
    })}
  </div>
)}
```

Replace the entire block with:

```tsx
{step.expandedText && expanded && (
  <div style={{
    borderTop: `1px solid ${color}18`,
    paddingTop: 10,
    display: 'flex', flexDirection: 'column', gap: 8,
  }}>
    {step.expandedText.split(/\n\n+/).map((para, i) => {
      const trimmed = para.trim()
      const emoji = detectCardEmoji(trimmed)
      const bodyText = emoji ? trimmed.slice(emoji.length).trimStart() : trimmed
      const cardStyle = emoji ? CARD_STYLES[emoji] : CARD_STYLES['📖']
      const accent = emoji ? cardStyle.accent : color
      const boldMatch = bodyText.match(/^\*\*([^*]+)\*\*|^.{0,40}\*\*([^*]+)\*\*/)
      const label = boldMatch ? (boldMatch[1] ?? boldMatch[2]) : null
      return (
        <div key={i} style={{
          borderRadius: 10,
          border: `1px solid ${cardStyle.border}`,
          background: cardStyle.bg,
          padding: '11px 14px',
          display: 'flex', gap: 11, alignItems: 'flex-start',
        }}>
          {emoji && (
            <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>
              {emoji}
            </span>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            {label && (
              <div style={{
                fontSize: 8.5, fontFamily: 'var(--font-mono)', fontWeight: 800,
                letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 5,
                color: accent ? `${accent}aa` : `${color}99`,
              }}>
                {label}
              </div>
            )}
            <p style={{ fontSize: 12.5, lineHeight: 1.68, margin: 0, color: 'var(--text-muted)' }}>
              {renderInlineText(bodyText, accent || color)}
            </p>
          </div>
        </div>
      )
    })}
  </div>
)}
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: no output (0 errors).

- [ ] **Step 5: Commit**

```bash
git add src/pages/TopicPage/SyncExplanation.tsx
git commit -m "feat: emoji-typed expanded cards + step text upgrade in SyncExplanation"
```

---

## Task 2: Add step icons to all ExplanationStep objects in topics.ts

**Files:**
- Modify: `src/data/topics.ts`

The `icon?: string` field already exists on `ExplanationStep` and is already rendered in `StepBlock`. It just hasn't been populated. This task fills in all 453 steps.

- [ ] **Step 1: Create and run the icons script**

Save as `add_step_icons.py` and run with `python3 add_step_icons.py`:

```python
import re

ICONS = {
  # ── HTML ──────────────────────────────────────────────────────────────────
  ('html-basics', 0): '🧩', ('html-basics', 1): '🔓', ('html-basics', 2): '📝',
  ('html-basics', 3): '🔐', ('html-basics', 4): '🏷️', ('html-basics', 5): '🌍',
  ('html-basics', 6): '✔️',
  ('html-text', 0): '📑', ('html-text', 1): '📄', ('html-text', 2): '🎭',
  ('html-text', 3): '✨', ('html-text', 4): '💬', ('html-text', 5): '🔖',
  ('html-text', 6): '🔤',
  ('html-links-images', 0): '🔗', ('html-links-images', 1): '📍',
  ('html-links-images', 2): '↗️', ('html-links-images', 3): '🖼️',
  ('html-links-images', 4): '♿', ('html-links-images', 5): '📐',
  ('html-links-images', 6): '😴',
  ('html-lists', 0): '📋', ('html-lists', 1): '🔢', ('html-lists', 2): '🪆',
  ('html-lists', 3): '🧱', ('html-lists', 4): '📦', ('html-lists', 5): '📖',
  ('html-lists', 6): '🎨',
  ('html-dom', 0): '📜', ('html-dom', 1): '⬇️', ('html-dom', 2): '🌳',
  ('html-dom', 3): '🍃', ('html-dom', 4): '🎯', ('html-dom', 5): '✏️',
  ('html-dom', 6): '➕', ('html-dom', 7): '⚡',
  ('html-semantic', 0): '🍲', ('html-semantic', 1): '🗺️', ('html-semantic', 2): '🧭',
  ('html-semantic', 3): '📰', ('html-semantic', 4): '🖼️', ('html-semantic', 5): '📐',
  ('html-semantic', 6): '🕐',
  ('html-forms', 0): '📋', ('html-forms', 1): '🏷️', ('html-forms', 2): '📂',
  ('html-forms', 3): '☑️', ('html-forms', 4): '🚀', ('html-forms', 5): '🛡️',
  ('html-forms', 6): '⚙️', ('html-forms', 7): '🗂️', ('html-forms', 8): '🔧',
  ('html-media', 0): '🪟', ('html-media', 1): '🎬', ('html-media', 2): '🔊',
  ('html-media', 3): '🖼️', ('html-media', 4): '💻', ('html-media', 5): '😴',
  ('html-media', 6): '▶️',
  # ── CSS ──────────────────────────────────────────────────────────────────
  ('css-basics', 0): '🌐', ('css-basics', 1): '✏️', ('css-basics', 2): '📋',
  ('css-basics', 3): '📁', ('css-basics', 4): '⛲',
  ('css-box-model', 0): '📦', ('css-box-model', 1): '🔲', ('css-box-model', 2): '🖼️',
  ('css-box-model', 3): '↔️',
  ('css-flexbox', 0): '🧭', ('css-flexbox', 1): '🃏', ('css-flexbox', 2): '🎯',
  ('css-flexbox', 3): '📖',
  ('css-grid', 0): '🗺️', ('css-grid', 1): '🧩', ('css-grid', 2): '📐',
  ('css-grid', 3): '♾️',
  ('css-selectors', 0): '🎯', ('css-selectors', 1): '🌐', ('css-selectors', 2): '🔠',
  ('css-selectors', 3): '🏷️', ('css-selectors', 4): '⚖️', ('css-selectors', 5): '🎭',
  ('css-selectors', 6): '✨',
  ('css-colors-units', 0): '🎨', ('css-colors-units', 1): '🔢', ('css-colors-units', 2): '🔴',
  ('css-colors-units', 3): '🌈', ('css-colors-units', 4): '📏',
  ('css-typography', 0): '🌐', ('css-typography', 1): '🔤', ('css-typography', 2): '📐',
  ('css-typography', 3): '↔️', ('css-typography', 4): '🌍',
  ('css-backgrounds-gradients', 0): '🎨', ('css-backgrounds-gradients', 1): '🖼️',
  ('css-backgrounds-gradients', 2): '📐', ('css-backgrounds-gradients', 3): '🌅',
  ('css-backgrounds-gradients', 4): '🌟',
  ('css-shadows', 0): '🧬', ('css-shadows', 1): '💧', ('css-shadows', 2): '🌫️',
  ('css-shadows', 3): '🕳️', ('css-shadows', 4): '✨',
  ('css-overflow', 0): '💦', ('css-overflow', 1): '✂️', ('css-overflow', 2): '📜',
  ('css-overflow', 3): '💬',
  ('css-display-positioning', 0): '⬇️', ('css-display-positioning', 1): '➡️',
  ('css-display-positioning', 2): '🧩', ('css-display-positioning', 3): '📍',
  ('css-display-positioning', 4): '📌',
  ('css-responsive', 0): '📱', ('css-responsive', 1): '💻', ('css-responsive', 2): '🖥️',
  ('css-responsive', 3): '📲', ('css-responsive', 4): '♻️',
  ('css-images', 0): '💦', ('css-images', 1): '📏', ('css-images', 2): '🖼️',
  ('css-images', 3): '⭕', ('css-images', 4): '📐',
  ('css-custom-properties', 0): '🔒', ('css-custom-properties', 1): '🏷️',
  ('css-custom-properties', 2): '🔑', ('css-custom-properties', 3): '🎯',
  ('css-custom-properties', 4): '🎨',
  ('css-variables-theming', 0): '🔒', ('css-variables-theming', 1): '🌱',
  ('css-variables-theming', 2): '🌙', ('css-variables-theming', 3): '🌓',
  ('css-transforms', 0): '⬜', ('css-transforms', 1): '↔️', ('css-transforms', 2): '🔄',
  ('css-transforms', 3): '🔍', ('css-transforms', 4): '✨',
  ('css-transitions', 0): '⚡', ('css-transitions', 1): '⏱️', ('css-transitions', 2): '🔀',
  ('css-transitions', 3): '📈', ('css-transitions', 4): '🎬', ('css-transitions', 5): '🎯',
  ('css-animations', 0): '⚖️', ('css-animations', 1): '🎬', ('css-animations', 2): '⚡',
  ('css-animations', 3): '🔁', ('css-animations', 4): '⏮️', ('css-animations', 5): '⏭️',
  ('css-tailwind', 0): '🎯', ('css-tailwind', 1): '🏗️', ('css-tailwind', 2): '⚙️',
  ('css-tailwind', 3): '🛠️', ('css-tailwind', 4): '📱',
  ('css-tailwind-layout', 0): '📏', ('css-tailwind-layout', 1): '🎯',
  ('css-tailwind-layout', 2): '🔲', ('css-tailwind-layout', 3): '🔳',
  ('css-tailwind-states', 0): '🎭', ('css-tailwind-states', 1): '🌙',
  ('css-tailwind-advanced', 0): '🔧', ('css-tailwind-advanced', 1): '📚',
  ('css-tailwind-advanced', 2): '🎨', ('css-tailwind-advanced', 3): '📦',
  # ── JS ───────────────────────────────────────────────────────────────────
  ('js-variables', 0): '⏮️', ('js-variables', 1): '📦', ('js-variables', 2): '🔒',
  ('js-variables', 3): '🧬', ('js-variables', 4): '🔍', ('js-variables', 5): '➕',
  ('js-variables', 6): '⚖️', ('js-variables', 7): '🛡️',
  ('js-control-flow', 0): '🔀', ('js-control-flow', 1): '🎚️', ('js-control-flow', 2): '🔁',
  ('js-control-flow', 3): '♻️', ('js-control-flow', 4): '✂️',
  ('js-arrays', 0): '📋', ('js-arrays', 1): '📥', ('js-arrays', 2): '🔄',
  ('js-arrays', 3): '🔽', ('js-arrays', 4): '🗂️', ('js-arrays', 5): '📥',
  ('js-arrays', 6): '✂️', ('js-arrays', 7): '🔧', ('js-arrays', 8): '↩️',
  ('js-arrays', 9): '🔄', ('js-arrays', 10): '🔎', ('js-arrays', 11): '⚡',
  ('js-arrays', 12): '✅',
  ('js-functions', 0): '🏷️', ('js-functions', 1): '🗺️', ('js-functions', 2): '🔝',
  ('js-functions', 3): '➡️', ('js-functions', 4): '🎯', ('js-functions', 5): '🛠️',
  ('js-oop', 0): '🏗️', ('js-oop', 1): '🔨', ('js-oop', 2): '🧬',
  ('js-oop', 3): '🔗', ('js-oop', 4): '👆',
  ('js-timers', 0): '⏱️', ('js-timers', 1): '🔁', ('js-timers', 2): '⛔',
  ('js-event-loop', 0): '🧵', ('js-event-loop', 1): '⚡', ('js-event-loop', 2): '🌐',
  ('js-event-loop', 3): '📭', ('js-event-loop', 4): '🔄', ('js-event-loop', 5): '📚',
  ('js-event-loop', 6): '⚡', ('js-event-loop', 7): '🎡',
  ('js-closures', 0): '📦', ('js-closures', 1): '↩️', ('js-closures', 2): '🚪',
  ('js-closures', 3): '💡', ('js-closures', 4): '🔒',
  ('js-modules', 0): '⚔️', ('js-modules', 1): '📤', ('js-modules', 2): '📦',
  ('js-modules', 3): '🎁',
  ('js-npm-bundlers', 0): '🗄️', ('js-npm-bundlers', 1): '📋', ('js-npm-bundlers', 2): '🎁',
  ('js-npm-bundlers', 3): '⚖️', ('js-npm-bundlers', 4): '🔥',
  ('js-vs-python', 0): '📦', ('js-vs-python', 1): '🔧', ('js-vs-python', 2): '🔀',
  ('js-vs-python', 3): '🧬', ('js-vs-python', 4): '🔁', ('js-vs-python', 5): '🗂️',
  ('js-vs-python', 6): '⏳', ('js-vs-python', 7): '🔤', ('js-vs-python', 8): '📋',
  ('js-vs-python', 9): '🔄', ('js-vs-python', 10): '🛡️',
  # ── HTTP / DB / WebAPI ───────────────────────────────────────────────────
  ('http-request-cycle', 0): '📤', ('http-request-cycle', 1): '🌐',
  ('http-request-cycle', 2): '⚙️', ('http-request-cycle', 3): '🗄️',
  ('http-request-cycle', 4): '📨',
  ('http-rest', 0): '🌐', ('http-rest', 1): '📥', ('http-rest', 2): '➕',
  ('http-rest', 3): '✏️', ('http-rest', 4): '🗑️',
  ('http-ssr-csr', 0): '🖥️', ('http-ssr-csr', 1): '💻', ('http-ssr-csr', 2): '⚖️',
  ('http-ssr-csr', 3): '📦', ('http-ssr-csr', 4): '🔬',
  ('http-status', 0): '🔢', ('http-status', 1): '✅', ('http-status', 2): '↩️',
  ('http-status', 3): '🚫', ('http-status', 4): '💥',
  ('db-intro', 0): '🗄️', ('db-intro', 1): '📊', ('db-intro', 2): '📂',
  ('db-intro', 3): '⚖️', ('db-intro', 4): '📝',
  ('postgres-queries', 0): '📊', ('postgres-queries', 1): '🔍',
  ('postgres-queries', 2): '🔽', ('postgres-queries', 3): '🔀',
  ('postgres-queries', 4): '✂️', ('postgres-queries', 5): '🔗',
  ('postgres-queries', 6): '📈', ('postgres-queries', 7): '📦',
  ('postgres-queries', 8): '⚖️', ('postgres-queries', 9): '🪆',
  ('postgres-joins', 0): '📊', ('postgres-joins', 1): '🔗', ('postgres-joins', 2): '🤝',
  ('postgres-joins', 3): '↩️', ('postgres-joins', 4): '🔀',
  ('postgres-crud', 0): '🏗️', ('postgres-crud', 1): '➕', ('postgres-crud', 2): '✏️',
  ('postgres-crud', 3): '🗑️', ('postgres-crud', 4): '🛡️',
  ('ts-basics', 0): '🌊', ('ts-basics', 1): '🏷️', ('ts-basics', 2): '🔍',
  ('ts-basics', 3): '📋', ('ts-basics', 4): '🔄', ('ts-basics', 5): '📖',
  ('webapi-dom', 0): '🌳', ('webapi-dom', 1): '🎯', ('webapi-dom', 2): '➕',
  ('webapi-dom', 3): '✏️', ('webapi-dom', 4): '🔗', ('webapi-dom', 5): '🔎',
  ('webapi-dom', 6): '📋', ('webapi-dom', 7): '🏷️', ('webapi-dom', 8): '💾',
  ('webapi-fetch', 0): '🌐', ('webapi-fetch', 1): '🔮', ('webapi-fetch', 2): '📨',
  ('webapi-fetch', 3): '📦', ('webapi-fetch', 4): '⏳', ('webapi-fetch', 5): '📥',
  ('webapi-fetch', 6): '📤', ('webapi-fetch', 7): '🌐', ('webapi-fetch', 8): '🛡️',
  ('webapi-fetch', 9): '⛔',
  ('webapi-events', 0): '⚡', ('webapi-events', 1): '👂', ('webapi-events', 2): '📦',
  ('webapi-events', 3): '🫧', ('webapi-events', 4): '🛑', ('webapi-events', 5): '🎯',
  ('webapi-events', 6): '📡', ('webapi-events', 7): '✉️', ('webapi-events', 8): '🗂️',
  ('webapi-storage', 0): '💾', ('webapi-storage', 1): '📥', ('webapi-storage', 2): '📤',
  ('webapi-storage', 3): '♾️', ('webapi-storage', 4): '🕐', ('webapi-storage', 5): '⚖️',
  ('webapi-storage', 6): '🔧', ('webapi-storage', 7): '🛡️', ('webapi-storage', 8): '🚫',
  # ── TypeScript ──────────────────────────────────────────────────────────
  ('ts-interfaces', 0): '📋', ('ts-interfaces', 1): '❓', ('ts-interfaces', 2): '🧬',
  ('ts-interfaces', 3): '✅', ('ts-interfaces', 4): '🗂️',
  ('ts-generics', 0): '🔒', ('ts-generics', 1): '🔄', ('ts-generics', 2): '🧠',
  ('ts-generics', 3): '📋', ('ts-generics', 4): '⛓️',
  ('ts-utility-types', 0): '🔧', ('ts-utility-types', 1): '✂️',
  ('ts-utility-types', 2): '🗂️', ('ts-utility-types', 3): '🔽',
  ('ts-arrays', 0): '📋', ('ts-arrays', 1): '🗂️', ('ts-arrays', 2): '📏',
  ('ts-arrays', 3): '🏷️',
  ('ts-classes', 0): '🏗️', ('ts-classes', 1): '🔒', ('ts-classes', 2): '🔐',
  ('ts-classes', 3): '🧬', ('ts-classes', 4): '🎭',
  ('ts-enums', 0): '🔢', ('ts-enums', 1): '🔤', ('ts-enums', 2): '🛡️',
  ('ts-enums', 3): '🔑',
  ('ts-type-assertion', 0): '🏷️', ('ts-type-assertion', 1): '📨',
  ('ts-type-assertion', 2): '⚠️',
  ('ts-react', 0): '🏷️', ('ts-react', 1): '🔄', ('ts-react', 2): '🔗',
  ('ts-react', 3): '⚡',
  ('ts-zod', 0): '📋', ('ts-zod', 1): '🛡️',
  # ── React ────────────────────────────────────────────────────────────────
  ('react-components', 0): '📄', ('react-components', 1): '🔀',
  ('react-components', 2): '🧩', ('react-components', 3): '🪆',
  ('react-components', 4): '🔽', ('react-components', 5): '⚡',
  ('react-components', 6): '❓', ('react-components', 7): '📋',
  ('react-state', 0): '🔄', ('react-state', 1): '🪝', ('react-state', 2): '🔁',
  ('react-state', 3): '🔒', ('react-state', 4): '📏', ('react-state', 5): '🔧',
  ('react-state', 6): '🗂️',
  ('react-useeffect', 0): '🌊', ('react-useeffect', 1): '1️⃣',
  ('react-useeffect', 2): '👁️', ('react-useeffect', 3): '🧹',
  ('react-useeffect', 4): '📋', ('react-useeffect', 5): '⏳',
  ('react-useeffect', 6): '🚫',
  ('react-router', 0): '🧭', ('react-router', 1): '🌍', ('react-router', 2): '🗺️',
  ('react-router', 3): '🔗', ('react-router', 4): '📍', ('react-router', 5): '📐',
  ('react-router', 6): '🏠',
  ('react-context', 0): '💧', ('react-context', 1): '🌱', ('react-context', 2): '🔌',
  ('react-context', 3): '🤔', ('react-context', 4): '⚡', ('react-context', 5): '📤',
  ('react-context', 6): '🔗',
  ('react-router-advanced', 0): '⚖️', ('react-router-advanced', 1): '🗺️',
  ('react-data-fetching', 0): '💧', ('react-data-fetching', 1): '🔄',
  ('react-data-fetching', 2): '🚀', ('react-data-fetching', 3): '⏸️',
  ('react-data-fetching', 4): '⚡',
  ('react-mutations', 0): '📤', ('react-mutations', 1): '⚡',
  ('react-mutations', 2): '📋', ('react-mutations', 3): '⏳',
  ('react-mutations', 4): '🛡️', ('react-mutations', 5): '🔄',
  ('react-tanstack-query', 0): '💾', ('react-tanstack-query', 1): '🕐',
  ('react-tanstack-query', 2): '🔍',
  # ── Next.js ──────────────────────────────────────────────────────────────
  ('nextjs-basics', 0): '🏗️', ('nextjs-basics', 1): '📁', ('nextjs-basics', 2): '⚖️',
  ('nextjs-basics', 3): '🌊', ('nextjs-basics', 4): '⚡',
  ('nextjs-routing', 0): '📁', ('nextjs-routing', 1): '🔀', ('nextjs-routing', 2): '📦',
  ('nextjs-routing', 3): '🌊',
  ('nextjs-layouts', 0): '🪆', ('nextjs-layouts', 1): '📄', ('nextjs-layouts', 2): '🏷️',
  ('nextjs-navigation', 0): '🔗', ('nextjs-navigation', 1): '🧭',
  ('nextjs-navigation', 2): '📍', ('nextjs-navigation', 3): '↩️',
  ('nextjs-server-components', 0): '🖥️', ('nextjs-server-components', 1): '🗄️',
  ('nextjs-server-components', 2): '🚫', ('nextjs-server-components', 3): '🧩',
  ('nextjs-client-components', 0): '🎛️', ('nextjs-client-components', 1): '💧',
  ('nextjs-client-components', 2): '🍃',
  ('nextjs-suspense', 0): '⏳', ('nextjs-suspense', 1): '🌊', ('nextjs-suspense', 2): '🛡️',
  ('nextjs-data-fetching', 0): '🌐', ('nextjs-data-fetching', 1): '⏱️',
  ('nextjs-server-actions', 0): '📤', ('nextjs-server-actions', 1): '⏳',
  ('nextjs-server-actions', 2): '🔌',
  ('nextjs-route-handlers', 0): '📄', ('nextjs-route-handlers', 1): '📨',
  ('nextjs-route-handlers', 2): '⚖️',
  # ── Testing/CI ───────────────────────────────────────────────────────────
  ('testing-ci', 0): '📊', ('testing-ci', 1): '📖',
  ('testing-ci', 2): '🔄', ('testing-ci', 3): '🚀',
}

# ── Insert icons into topics.ts ────────────────────────────────────────────

with open('src/data/topics.ts') as f:
    content = f.read()

topic_matches = list(re.finditer(r"^  \{\n    id: '([^']+)'", content, re.MULTILINE))

# Work in reverse to keep offsets valid
replacements = []

for i, tm in enumerate(topic_matches):
    tid = tm.group(1)
    t_start = tm.start()
    t_end = topic_matches[i+1].start() if i+1 < len(topic_matches) else len(content)
    t_block = content[t_start:t_end]

    expl_m = re.search(r"type: 'explanation'.*?steps: \[(.*?)\]\s*\}", t_block, re.DOTALL)
    if not expl_m:
        continue

    # Find step blocks by animationStep number
    for step_m in re.finditer(r'animationStep:\s*(\d+)', t_block[expl_m.start():expl_m.end()]):
        step_num = int(step_m.group(1))
        key = (tid, step_num)
        if key not in ICONS:
            continue

        # Position in file
        abs_pos = t_start + expl_m.start() + step_m.start()

        # Find the end of this step's animationStep line to insert icon after heading
        # Strategy: find 'heading:' after this animationStep
        block_start = t_start + expl_m.start() + step_m.start()
        # Find next 'heading:' in remaining content
        heading_m = re.search(r"(heading:\s*'[^']*')", content[block_start:block_start + 500])
        if not heading_m:
            continue

        # Check if icon already present between animationStep and heading
        between = content[block_start: block_start + heading_m.end()]
        if 'icon:' in between:
            continue

        # Insert after heading line
        insert_pos = block_start + heading_m.end()
        icon_str = f",\n          icon: '{ICONS[key]}'"
        replacements.append((insert_pos, icon_str))

# Apply in reverse order
replacements.sort(key=lambda x: x[0], reverse=True)
result = content
for pos, text in replacements:
    result = result[:pos] + text + result[pos:]

with open('src/data/topics.ts', 'w') as f:
    f.write(result)

print(f'Applied {len(replacements)} icon insertions')
```

- [ ] **Step 2: Verify icon count**

```bash
python3 -c "
import re
with open('src/data/topics.ts') as f: c = f.read()
count = len(re.findall(r\"icon: '[^']+'\", c))
print(f'icon fields in topics.ts: {count} (expected ~453)')
"
```

Expected: `icon fields in topics.ts: 453` (or close — some steps may already have icons).

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add thematic emoji icons to all 453 explanation steps"
```

---

## Task 3: Add emoji type prefixes to EN expandedText paragraphs in topics.ts

**Files:**
- Modify: `src/data/topics.ts`

Each `expandedText` paragraph is prefixed with one of: `📖 ` (default/explanation), `💡 ` (tip/best practice), `⚠️ ` (warning/gotcha), `🔬 ` (deep dive/technical), `✅ ` (pattern/rule), `📜 ` (historical context).

The renderer (Task 1) strips the prefix before display and uses it to choose the card colour.

- [ ] **Step 1: Create and run the classification + insertion script**

Save as `add_expandedtext_prefixes.py` and run:

```python
import re

# ── Classification heuristic ──────────────────────────────────────────────
# Classify each paragraph by reading its first bold label + content keywords.
# Emoji selection logic (checked in order):
#   📜  label/content contains: histor|legacy|old way|before|replaced|originally|introduced|stammt|früher|ursprünglich
#   ⚠️  label/content contains: mistake|avoid|never|gotcha|trap|warning|pitfall|watch|don't|fehler|falle|achtung|niemals|vorsicht
#   💡  label/content contains: tip|best practice|prefer|recommend|rule of thumb|merkhilfe|tipp|empfehlung|faustregel
#   🔬  label/content contains: under the hood|internally|technically|mechanism|engine|deep dive|intern|technisch
#   ✅  label/content contains: pattern|convention|always use|should use|muster|konvention
#   📖  (default — general explanation)

KEYWORD_MAP = [
    ('📜', re.compile(r'histor|legacy|old way|before |replaced|originally|introduced|stammt|früher|ursprünglich', re.I)),
    ('⚠️', re.compile(r'mistake|avoid|never |gotcha|trap|warning|pitfall|watch out|don\'t|fehler|falle|achtung|niemals|vorsicht', re.I)),
    ('💡', re.compile(r'tip\b|best practice|prefer|recommend|rule of thumb|merkhilfe|tipp\b|empfehlung|faustregel', re.I)),
    ('🔬', re.compile(r'under the hood|internally|technically|mechanism|engine\b|deep dive|intern\b|technisch', re.I)),
    ('✅', re.compile(r'pattern\b|convention|always use|should use|muster\b|konvention', re.I)),
]

def classify(para: str) -> str:
    bold_m = re.match(r'\*\*([^*]+)\*\*', para)
    label = bold_m.group(1).lower() if bold_m else ''
    combined = (label + ' ' + para[:200]).lower()
    for emoji, pattern in KEYWORD_MAP:
        if pattern.search(combined):
            return emoji
    return '📖'

# ── Read and process topics.ts ────────────────────────────────────────────

with open('src/data/topics.ts') as f:
    content = f.read()

def add_prefixes_to_et(et_value: str) -> str:
    """Add emoji prefix to each paragraph of an expandedText value."""
    paras = et_value.split('\\n\\n')
    result = []
    for para in paras:
        stripped = para.strip()
        if not stripped:
            continue
        # Skip if already has an emoji prefix
        if re.match(r'^[📖💡⚠️🔬✅📜]', stripped):
            result.append(para)
            continue
        emoji = classify(stripped)
        result.append(emoji + ' ' + stripped)
    return '\\n\\n'.join(result)

# Replace all expandedText values
def replace_et(m):
    raw = m.group(1)
    updated = add_prefixes_to_et(raw)
    if updated == raw:
        return m.group(0)
    return f"expandedText: '{updated}'"

new_content = re.sub(
    r"expandedText: '((?:[^'\\]|\\.)*?)'",
    replace_et,
    content,
    flags=re.DOTALL
)

with open('src/data/topics.ts', 'w') as f:
    f.write(new_content)

# Count applied prefixes
count = len(re.findall(r"[📖💡⚠️🔬✅📜] ", new_content))
print(f'Emoji prefixes in topics.ts expandedText: {count}')
```

- [ ] **Step 2: Verify prefix count**

```bash
python3 -c "
import re
with open('src/data/topics.ts') as f: c = f.read()
for e in ['📖','💡','⚠️','🔬','✅','📜']:
    n = c.count(e + ' ')
    print(f'{e}: {n}')
"
```

Expected: all 6 emoji appear, total across all ~782 paragraphs.

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add emoji type prefixes to all EN expandedText paragraphs (782 paragraphs)"
```

---

## Task 4: Mirror emoji prefixes to DE locale JSON files

**Files:**
- Modify: `src/i18n/locales/de/topics-js.json`
- Modify: `src/i18n/locales/de/topics-css.json`
- Modify: `src/i18n/locales/de/topics-html.json`
- Modify: `src/i18n/locales/de/topics-other.json`

The **same heuristic** is applied to the German `expandedText` values. German keyword set is already included in the classifier above (stammt, früher, fehler, falle, achtung, niemals, vorsicht, tipp, merkhilfe, faustregel, intern, technisch, muster, konvention).

- [ ] **Step 1: Create and run the DE prefix script**

Save as `add_de_expandedtext_prefixes.py` and run:

```python
import json, re

KEYWORD_MAP = [
    ('📜', re.compile(r'histor|legacy|old way|before |replaced|originally|introduced|stammt|früher|ursprünglich', re.I)),
    ('⚠️', re.compile(r'mistake|avoid|never |gotcha|trap|warning|pitfall|watch out|fehler|falle|achtung|niemals|vorsicht', re.I)),
    ('💡', re.compile(r'tip\b|best practice|prefer|recommend|rule of thumb|merkhilfe|tipp\b|empfehlung|faustregel', re.I)),
    ('🔬', re.compile(r'under the hood|internally|technically|mechanism|engine\b|deep dive|intern\b|technisch', re.I)),
    ('✅', re.compile(r'pattern\b|convention|always use|should use|muster\b|konvention', re.I)),
]

def classify(para: str) -> str:
    bold_m = re.match(r'\*\*([^*]+)\*\*', para)
    label = bold_m.group(1).lower() if bold_m else ''
    combined = (label + ' ' + para[:200]).lower()
    for emoji, pattern in KEYWORD_MAP:
        if pattern.search(combined):
            return emoji
    return '📖'

def add_prefixes(et: str) -> str:
    paras = et.split('\n\n')
    result = []
    for para in paras:
        s = para.strip()
        if not s:
            continue
        if re.match(r'^[📖💡⚠️🔬✅📜]', s):
            result.append(para)
            continue
        result.append(classify(s) + ' ' + s)
    return '\n\n'.join(result)

FILES = [
    'src/i18n/locales/de/topics-js.json',
    'src/i18n/locales/de/topics-css.json',
    'src/i18n/locales/de/topics-html.json',
    'src/i18n/locales/de/topics-other.json',
]

for path in FILES:
    with open(path) as f:
        data = json.load(f)
    changed = 0
    for topic in data.values():
        for step in topic.get('steps', []):
            if 'expandedText' in step:
                original = step['expandedText']
                updated = add_prefixes(original)
                if updated != original:
                    step['expandedText'] = updated
                    changed += 1
    with open(path, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f'{path.split("/")[-1]}: {changed} steps updated')
```

- [ ] **Step 2: Verify DE prefix coverage**

```bash
python3 -c "
import json

for path in [
    'src/i18n/locales/de/topics-js.json',
    'src/i18n/locales/de/topics-css.json',
    'src/i18n/locales/de/topics-html.json',
    'src/i18n/locales/de/topics-other.json',
]:
    with open(path) as f: d = json.load(f)
    import re
    total = 0
    prefixed = 0
    for t in d.values():
        for s in t.get('steps', []):
            if 'expandedText' not in s: continue
            paras = [p.strip() for p in s['expandedText'].split('\n\n') if p.strip()]
            total += len(paras)
            prefixed += sum(1 for p in paras if re.match(r'^[📖💡⚠️🔬✅📜]', p))
    print(f'{path.split(\"/\")[-1]}: {prefixed}/{total} paragraphs prefixed')
"
```

Expected: all paragraphs prefixed in all 4 files.

- [ ] **Step 3: Commit**

```bash
git add src/i18n/locales/de/topics-js.json src/i18n/locales/de/topics-css.json \
        src/i18n/locales/de/topics-html.json src/i18n/locales/de/topics-other.json
git commit -m "feat: add emoji type prefixes to all DE expandedText paragraphs"
```

---

## Task 5: Final verification + push

- [ ] **Step 1: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: no output (0 errors).

- [ ] **Step 2: Full summary check**

```bash
python3 - << 'EOF'
import re, json

# EN: icons
with open('src/data/topics.ts') as f: c = f.read()
icons = len(re.findall(r"icon: '[^']+',?\n", c))
print(f'Step icons in topics.ts: {icons}')

# EN: prefixed paragraphs
en_prefixed = sum(c.count(e + ' ') for e in ['📖','💡','⚠️','🔬','✅','📜'])
print(f'EN expandedText prefixed paragraphs: {en_prefixed}')

# DE: prefixed paragraphs
de_total = 0
for path in [
    'src/i18n/locales/de/topics-js.json',
    'src/i18n/locales/de/topics-css.json',
    'src/i18n/locales/de/topics-html.json',
    'src/i18n/locales/de/topics-other.json',
]:
    with open(path) as f: d = json.load(f)
    for t in d.values():
        for s in t.get('steps', []):
            if 'expandedText' in s:
                import re as r2
                de_total += sum(1 for p in s['expandedText'].split('\n\n')
                                if p.strip() and r2.match(r'^[📖💡⚠️🔬✅📜]', p.strip()))
print(f'DE expandedText prefixed paragraphs: {de_total}')
EOF
```

- [ ] **Step 3: Push**

```bash
git push
```
