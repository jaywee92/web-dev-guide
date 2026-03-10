# CSS Topics + Gradient Playground Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 6 new CSS topic pages (each with viz animation + cheat sheet + playground) and a custom interactive gradient generator playground for the "Backgrounds & Gradients" topic.

**Architecture:** Each topic follows the existing pattern: a viz component (`src/topics/css/`), topic data entry in `topics.ts`, and lazy registration in `registry.ts`. The gradient generator is a new standalone playground component `GradientPlayground.tsx` activated via a new `'gradient'` playground type. No new routes, no nav changes.

**Tech Stack:** React 19, TypeScript 5.9, Framer Motion 12, Vite 7, Tailwind 4 (CSS vars for theming: `var(--text)`, `var(--surface)`, `var(--border)`, `var(--blue)`, `var(--green)` etc.)

---

## Chunk 1: Foundation — types, routing, data, registry

### Task 1: Add `'gradient'` to PlaygroundType + extend categories

**Files:**
- Modify: `src/types/index.ts:3`
- Modify: `src/data/categories.ts:18`

- [ ] **Step 1: Update PlaygroundType union**

In `src/types/index.ts`, change line 3:
```ts
export type PlaygroundType = 'visual-controls' | 'monaco' | 'none' | 'gradient'
```

- [ ] **Step 2: Add 6 new topic IDs to css category**

In `src/data/categories.ts`, change the `topicIds` array for the css category:
```ts
topicIds: [
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

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors (only the new `'gradient'` type is used in PlaygroundSection next task).

- [ ] **Step 4: Commit**

```bash
git add src/types/index.ts src/data/categories.ts
git commit -m "feat: add gradient PlaygroundType, register 6 css topic IDs in category"
```

---

### Task 2: Wire gradient playground in PlaygroundSection

**Files:**
- Modify: `src/pages/TopicPage/PlaygroundSection.tsx`

- [ ] **Step 1: Update PlaygroundSection to handle gradient type**

Replace the file content:
```tsx
import type { Topic } from '@/types'
import VisualPlayground from '@/playgrounds/VisualPlayground'
import MonacoPlayground from '@/playgrounds/MonacoPlayground'
import { lazy, Suspense } from 'react'

const GradientPlayground = lazy(() => import('@/playgrounds/GradientPlayground'))

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
        <Suspense fallback={<div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading...</div>}>
          <GradientPlayground />
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

- [ ] **Step 2: Verify TypeScript compiles** (GradientPlayground doesn't exist yet, expect one import error only)

```bash
npx tsc --noEmit 2>&1 | grep -v GradientPlayground | head -10
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/TopicPage/PlaygroundSection.tsx
git commit -m "feat: PlaygroundSection handles gradient playground type"
```

---

### Task 3: Register 6 viz components in registry

**Files:**
- Modify: `src/topics/registry.ts`

- [ ] **Step 1: Add 6 new entries to lazyRegistry**

Add after the `SelectorsViz` line:
```ts
ColorsUnitsViz: () => import('./css/ColorsUnitsViz'),
TypographyViz: () => import('./css/TypographyViz'),
BackgroundsViz: () => import('./css/BackgroundsViz'),
DisplayPositioningViz: () => import('./css/DisplayPositioningViz'),
ResponsiveViz: () => import('./css/ResponsiveViz'),
ImagesViz: () => import('./css/ImagesViz'),
```

- [ ] **Step 2: Commit** (files don't exist yet; TS will warn but not break)

```bash
git add src/topics/registry.ts
git commit -m "feat: register 6 new CSS viz components in lazy registry"
```

---

### Task 4: Add 6 topic definitions to topics.ts

**Files:**
- Modify: `src/data/topics.ts` — append after the last CSS topic (`css-selectors` ends around line 470)

Find the end of the `css-selectors` topic entry, then append the following 6 topic objects into the `TOPICS` array.

- [ ] **Step 1: Add `css-colors-units` topic**

```ts
{
  id: 'css-colors-units',
  title: 'Colors & Units',
  description: 'Color formats (hex, rgb, hsl) and CSS units (px, em, rem, %)',
  level: 1,
  category: 'css',
  color: '#5b9cf5',
  estimatedMinutes: 10,
  animationComponent: 'ColorsUnitsViz',
  playgroundType: 'visual-controls',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        {
          animationStep: 0,
          heading: 'Named colors',
          text: 'CSS has 140+ named colors like red, blue, tomato, and cornflowerblue. Simple but limited — you can\'t fine-tune them.',
          codeExample: 'color: tomato;\nbackground-color: cornflowerblue;',
          language: 'css',
        },
        {
          animationStep: 1,
          heading: 'HEX codes',
          text: 'Six hex digits encode red, green, and blue channels (#RRGGBB). The most common format you\'ll see in designs. Shorthand: #RGB when each pair repeats.',
          codeExample: 'color: #ef4444;       /* red */\ncolor: #3b82f6;       /* blue */\ncolor: #fff;          /* white shorthand */',
          language: 'css',
        },
        {
          animationStep: 2,
          heading: 'RGB & RGBA',
          text: 'rgb() takes three 0–255 values for red, green, blue. rgba() adds a fourth value (0–1) for transparency — great for overlays.',
          codeExample: 'color: rgb(239, 68, 68);\nbackground: rgba(0, 0, 0, 0.5); /* 50% black overlay */',
          language: 'css',
        },
        {
          animationStep: 3,
          heading: 'HSL & HSLA',
          text: 'hsl() uses Hue (0–360°), Saturation (%), and Lightness (%). Much more intuitive for creating color palettes — just shift the hue.',
          codeExample: 'color: hsl(0, 84%, 60%);     /* red */\ncolor: hsl(217, 91%, 60%);   /* blue — same sat/light */\ncolor: hsla(0, 84%, 60%, 0.5);',
          language: 'css',
        },
        {
          animationStep: 4,
          heading: 'CSS Units',
          text: 'px is absolute. em is relative to the parent\'s font-size. rem is relative to the root <html> font-size (usually 16px). % is relative to the parent\'s size. Use rem for font sizes, px for borders, % for widths.',
          codeExample: 'font-size: 16px;    /* absolute */\npadding: 1rem;      /* 16px if root = 16px */\nwidth: 50%;         /* half of parent */\nmargin: 0.5em;      /* half of parent font-size */',
          language: 'css',
        },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'HEX', code: 'color: #3b82f6;\ncolor: #fff; /* shorthand for #ffffff */', note: 'Most common format' },
      { label: 'RGB / RGBA', code: 'color: rgb(59, 130, 246);\nbackground: rgba(0, 0, 0, 0.5);', note: 'Use rgba for transparency' },
      { label: 'HSL / HSLA', code: 'color: hsl(217, 91%, 60%);\ncolor: hsla(217, 91%, 60%, 0.8);', note: 'Best for palettes' },
      { label: 'px', code: 'border: 1px solid;\nfont-size: 16px;', note: 'Absolute, pixel-precise' },
      { label: 'rem', code: 'font-size: 1rem;    /* 16px */\npadding: 1.5rem;    /* 24px */', note: 'Relative to root — use for font & spacing' },
      { label: 'em', code: 'padding: 0.5em; /* relative to this element\'s font-size */', note: 'Relative to parent font-size' },
      { label: '%', code: 'width: 100%;\nmax-width: 80%;', note: 'Relative to parent dimension' },
    ],
    patterns: [
      { title: 'CSS custom properties for a color palette', code: ':root {\n  --color-primary: hsl(217, 91%, 60%);\n  --color-primary-dark: hsl(217, 91%, 45%);\n  --color-surface: hsl(217, 20%, 10%);\n}\n\n.btn { background: var(--color-primary); }', language: 'css' },
      { title: 'Responsive typography scale', code: ':root { font-size: 16px; }\n\nh1 { font-size: 2rem; }   /* 32px */\nh2 { font-size: 1.5rem; } /* 24px */\np  { font-size: 1rem; }   /* 16px */\nsmall { font-size: 0.875rem; }', language: 'css' },
    ],
    whenToUse: 'Use rem for font sizes and spacing (scales with user preferences), px for borders and fine details, % for layout widths. Prefer HSL when building color systems — it\'s easy to create tints and shades by adjusting lightness.',
    commonMistakes: [
      'Mixing em and rem unpredictably — em compounds through nested elements, rem doesn\'t. Use rem by default.',
      'Using px for font sizes — it ignores user browser font-size preferences. Use rem instead.',
      'Forgetting rgba for overlays — use rgba(0,0,0,0.5) not a semi-transparent gray hex.',
    ],
  },
},
```

- [ ] **Step 2: Add `css-typography` topic**

```ts
{
  id: 'css-typography',
  title: 'Text & Typography',
  description: 'Font families, sizes, weights, and text styling',
  level: 1,
  category: 'css',
  color: '#5b9cf5',
  estimatedMinutes: 10,
  animationComponent: 'TypographyViz',
  playgroundType: 'visual-controls',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        {
          animationStep: 0,
          heading: 'Default browser text',
          text: 'Without CSS, browsers apply their own default styles — usually Times New Roman at 16px. Every CSS reset or stylesheet you write is overriding these defaults.',
          codeExample: '/* Browser default — no CSS applied */\nbody { font: 16px serif; }',
          language: 'css',
        },
        {
          animationStep: 1,
          heading: 'font-family, font-size, font-weight',
          text: 'font-family sets the typeface — always end with a generic fallback. font-size controls how big text appears. font-weight ranges from 100 (thin) to 900 (black), with 400 = normal and 700 = bold.',
          codeExample: 'body {\n  font-family: "Inter", sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n}',
          language: 'css',
        },
        {
          animationStep: 2,
          heading: 'text-align & text-decoration',
          text: 'text-align positions text horizontally (left, center, right, justify). text-decoration controls underlines, strikethroughs, and their style.',
          codeExample: 'h1 { text-align: center; }\na  { text-decoration: none; }   /* removes link underline */\n.strike { text-decoration: line-through; }',
          language: 'css',
        },
        {
          animationStep: 3,
          heading: 'Spacing: letter-spacing & line-height',
          text: 'letter-spacing adjusts space between characters. line-height controls the height of each line — use a unitless value like 1.6 so it scales with font size.',
          codeExample: 'p {\n  line-height: 1.6;       /* 1.6× font-size */\n  letter-spacing: 0.01em;\n}\n\n.heading { letter-spacing: -0.02em; }',
          language: 'css',
        },
        {
          animationStep: 4,
          heading: 'Google Fonts & @import',
          text: 'Load custom fonts with @import inside your CSS. Google Fonts generates the URL for you. @font-face works the same way but for locally hosted font files.',
          codeExample: '/* At top of CSS file */\n@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");\n\nbody { font-family: "Inter", sans-serif; }',
          language: 'css',
        },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'font-family', code: 'font-family: "Inter", sans-serif;\n/* Always end with generic: serif, sans-serif, monospace */', note: 'Always add fallback' },
      { label: 'font shorthand', code: 'font: 700 1.25rem/1.6 "Inter", sans-serif;\n/*    wt  size/lh  family */', note: 'weight size/line-height family' },
      { label: 'text-align', code: 'text-align: left | center | right | justify;', note: 'Horizontal alignment' },
      { label: 'text-decoration', code: 'text-decoration: none;\ntext-decoration: underline dotted #f00;\n/* line style color */', note: 'Underline / strikethrough' },
      { label: 'text-transform', code: 'text-transform: uppercase;\ntext-transform: capitalize;', note: 'Case transformation' },
      { label: 'line-height', code: 'line-height: 1.5;  /* unitless — best practice */\nline-height: 24px;', note: 'Line spacing' },
      { label: 'letter-spacing', code: 'letter-spacing: 0.05em;  /* loose */\nletter-spacing: -0.02em; /* tight headings */', note: 'Character spacing' },
    ],
    patterns: [
      { title: 'Import and use a Google Font', code: '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");\n\nbody {\n  font-family: "Inter", sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n}', language: 'css' },
      { title: 'Link states — remove underline, add on hover', code: 'a {\n  color: #3b82f6;\n  text-decoration: none;\n}\na:hover {\n  text-decoration: underline;\n}\na:visited {\n  color: #8b5cf6;\n}', language: 'css' },
    ],
    whenToUse: 'Set font-family, font-size, and line-height on body as a baseline — everything inherits from it. Use rem for font sizes. Set line-height to 1.5–1.7 for body text, tighter (1.1–1.3) for headings.',
    commonMistakes: [
      'No generic fallback in font-family — if the custom font fails to load, the browser picks an ugly default',
      'Using px for line-height — it doesn\'t scale if font-size changes. Use unitless values like 1.5',
      'Overusing text-align: justify — creates uneven spacing between words, hurts readability',
    ],
  },
},
```

- [ ] **Step 3: Add `css-backgrounds-gradients` topic**

```ts
{
  id: 'css-backgrounds-gradients',
  title: 'Backgrounds & Gradients',
  description: 'Background colors, images, and CSS gradient functions',
  level: 1,
  category: 'css',
  color: '#5b9cf5',
  estimatedMinutes: 15,
  animationComponent: 'BackgroundsViz',
  playgroundType: 'gradient',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        {
          animationStep: 0,
          heading: 'background-color',
          text: 'The simplest background — a solid color fill. Accepts any CSS color value: named, hex, rgb, hsl.',
          codeExample: '.box {\n  background-color: #3b82f6;\n  /* or: background: #3b82f6; (shorthand) */\n}',
          language: 'css',
        },
        {
          animationStep: 1,
          heading: 'background-image',
          text: 'Load an image as a background using url(). The image doesn\'t affect the document flow — it\'s purely decorative. Always pair with a fallback background-color.',
          codeExample: '.hero {\n  background-image: url("photo.jpg");\n  background-color: #1e293b; /* fallback */\n}',
          language: 'css',
        },
        {
          animationStep: 2,
          heading: 'repeat, position & size',
          text: 'background-repeat controls tiling. background-position sets origin. background-size: cover fills the container, contain fits within it.',
          codeExample: '.hero {\n  background-image: url("photo.jpg");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n}',
          language: 'css',
        },
        {
          animationStep: 3,
          heading: 'linear-gradient()',
          text: 'Gradients are generated images — no image file needed. linear-gradient() transitions between colors in a straight line. Specify the angle and two or more color stops.',
          codeExample: 'background: linear-gradient(135deg, #6366f1, #ec4899);\nbackground: linear-gradient(to right, #1e293b, #3b82f6 50%, #6366f1);',
          language: 'css',
        },
        {
          animationStep: 4,
          heading: 'radial-gradient()',
          text: 'radial-gradient() radiates from a center point outward. Great for spotlight effects and subtle depth. Combine with transparency for overlays.',
          codeExample: 'background: radial-gradient(circle, #6366f1, #0f172a);\nbackground: radial-gradient(ellipse at top left, #6366f1 0%, transparent 60%);',
          language: 'css',
        },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'background shorthand', code: 'background: #1e293b url("bg.jpg") no-repeat center / cover;', note: 'color image repeat position / size' },
      { label: 'background-size', code: 'background-size: cover;   /* fill, may crop */\nbackground-size: contain; /* fit, may letterbox */\nbackground-size: 100% auto;', note: 'cover vs contain' },
      { label: 'linear-gradient', code: 'background: linear-gradient(135deg, #6366f1, #ec4899);\nbackground: linear-gradient(to bottom, #1e293b 0%, transparent 100%);', note: 'angle, color stops' },
      { label: 'radial-gradient', code: 'background: radial-gradient(circle at center, #6366f1, #0f172a);\nbackground: radial-gradient(ellipse at top, #fff 0%, transparent 70%);', note: 'shape at position' },
      { label: 'conic-gradient', code: 'background: conic-gradient(from 0deg, red, yellow, green, red);', note: 'Sweeps around a center point' },
      { label: 'multiple backgrounds', code: 'background:\n  linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),\n  url("photo.jpg") center / cover;', note: 'Stack: first on top' },
    ],
    patterns: [
      { title: 'Hero with image + dark overlay', code: '.hero {\n  background:\n    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),\n    url("hero.jpg") center / cover no-repeat;\n  color: white;\n}', language: 'css' },
      { title: 'Gradient button', code: '.btn {\n  background: linear-gradient(135deg, #6366f1, #ec4899);\n  border: none;\n  color: white;\n  padding: 12px 24px;\n  border-radius: 8px;\n}', language: 'css' },
    ],
    whenToUse: 'Use background-color for solid fills, linear-gradient for directional transitions (buttons, hero sections), radial-gradient for spotlight/glow effects. Always add background-color as a fallback when using background-image.',
    commonMistakes: [
      'Forgetting background-size: cover for full-bleed images — without it, the image tiles or leaves gaps',
      'No fallback background-color with background-image — if the image fails to load, the element is blank',
      'Using an image when a gradient would do — gradients load instantly and are resolution-independent',
    ],
  },
},
```

- [ ] **Step 4: Add `css-display-positioning` topic**

```ts
{
  id: 'css-display-positioning',
  title: 'Display & Positioning',
  description: 'How elements flow, stack, and position relative to each other',
  level: 1,
  category: 'css',
  color: '#5b9cf5',
  estimatedMinutes: 12,
  animationComponent: 'DisplayPositioningViz',
  playgroundType: 'visual-controls',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        {
          animationStep: 0,
          heading: 'Block flow',
          text: 'Block elements stack vertically — each one starts on a new line and stretches to fill available width. div, p, h1–h6, and section are block elements by default.',
          codeExample: 'div { display: block; } /* default */\n/* Each div starts on its own line */',
          language: 'css',
        },
        {
          animationStep: 1,
          heading: 'display: inline',
          text: 'Inline elements sit side by side in the text flow. They only take up as much width as their content. You can\'t set width or height on inline elements.',
          codeExample: 'span { display: inline; } /* default */\na, strong, em { display: inline; }',
          language: 'css',
        },
        {
          animationStep: 2,
          heading: 'display: inline-block',
          text: 'The best of both worlds — sits inline like text, but accepts width, height, padding, and margin like a block.',
          codeExample: '.badge {\n  display: inline-block;\n  width: 80px;\n  padding: 4px 12px;\n}',
          language: 'css',
        },
        {
          animationStep: 3,
          heading: 'position: relative',
          text: 'The element stays in the normal flow but can be nudged using top, right, bottom, left. The space it would have occupied is preserved. Commonly used as a positioning anchor for absolute children.',
          codeExample: '.nudged {\n  position: relative;\n  top: 10px;   /* moves down 10px */\n  left: 20px;  /* moves right 20px */\n}',
          language: 'css',
        },
        {
          animationStep: 4,
          heading: 'position: absolute',
          text: 'Removes the element from the normal flow — other elements ignore it. Positions relative to the nearest ancestor with position: relative (or the viewport if none). Essential for tooltips, dropdowns, and overlays.',
          codeExample: '.parent { position: relative; }\n\n.tooltip {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  /* anchored to .parent corner */\n}',
          language: 'css',
        },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'display values', code: 'display: block;\ndisplay: inline;\ndisplay: inline-block;\ndisplay: none; /* removes from flow */\ndisplay: flex;\ndisplay: grid;', note: 'Core display values' },
      { label: 'position: relative', code: '.parent {\n  position: relative; /* anchor for abs children */\n}', note: 'Anchor + nudge' },
      { label: 'position: absolute', code: '.overlay {\n  position: absolute;\n  top: 0; right: 0; bottom: 0; left: 0;\n  /* covers entire relative parent */\n}', note: 'Out of flow' },
      { label: 'position: fixed', code: '.navbar {\n  position: fixed;\n  top: 0; left: 0; right: 0;\n  z-index: 100;\n}', note: 'Relative to viewport' },
      { label: 'position: sticky', code: '.sidebar {\n  position: sticky;\n  top: 24px; /* sticks when scrolled to this offset */\n}', note: 'Scroll then stick' },
      { label: 'z-index', code: '.modal    { z-index: 300; }\n.overlay  { z-index: 200; }\n.dropdown { z-index: 100; }', note: 'Stacking order (higher = on top)' },
    ],
    patterns: [
      { title: 'Badge / tooltip anchored to a card', code: '.card {\n  position: relative;\n}\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}', language: 'css' },
      { title: 'Full-cover overlay', code: '.overlay {\n  position: absolute;\n  inset: 0; /* top/right/bottom/left: 0 */\n  background: rgba(0,0,0,0.5);\n}', language: 'css' },
    ],
    whenToUse: 'Use block/inline-block for document flow, flexbox for 1D layouts, grid for 2D layouts. Use relative + absolute together for overlays, badges, and tooltips. Use fixed for navbars and modals. Use sticky for sidebars.',
    commonMistakes: [
      'position: absolute without a positioned ancestor — it anchors to the viewport instead of the intended parent',
      'Using position when flexbox/grid is simpler — absolute positioning is for overlapping elements, not general layout',
      'z-index not working — it only applies to positioned elements (relative, absolute, fixed, sticky)',
    ],
  },
},
```

- [ ] **Step 5: Add `css-responsive` topic**

```ts
{
  id: 'css-responsive',
  title: 'Responsive Design',
  description: 'Media queries, mobile-first CSS, and fluid layouts',
  level: 2,
  category: 'css',
  color: '#5b9cf5',
  estimatedMinutes: 15,
  animationComponent: 'ResponsiveViz',
  playgroundType: 'visual-controls',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        {
          animationStep: 0,
          heading: 'One layout, all screens',
          text: 'Without media queries, your layout is fixed. On mobile, content may overflow or look cramped. Responsive design makes your CSS adapt to the viewport.',
          codeExample: '/* No media queries — same layout everywhere */\n.container { width: 1200px; }',
          language: 'css',
        },
        {
          animationStep: 1,
          heading: 'Media query — tablet breakpoint',
          text: '@media applies styles only when a condition is true. min-width: 768px means "apply these styles on screens 768px wide or wider" — the tablet breakpoint.',
          codeExample: '@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr 1fr;\n  }\n}',
          language: 'css',
        },
        {
          animationStep: 2,
          heading: 'Desktop breakpoint',
          text: 'Stack media queries from smallest to largest. The 1024px breakpoint unlocks a 3-column layout for wider screens.',
          codeExample: '@media (min-width: 1024px) {\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}',
          language: 'css',
        },
        {
          animationStep: 3,
          heading: 'Mobile-first approach',
          text: 'Write base styles for mobile, then add complexity at larger sizes using min-width queries. This is the opposite of "desktop-first" (max-width). Mobile-first is the industry standard — it forces simpler defaults.',
          codeExample: '/* Mobile first: base styles = mobile */\n.grid { display: block; }\n\n/* Enhance for larger screens */\n@media (min-width: 768px) {\n  .grid { display: grid; grid-template-columns: 1fr 1fr; }\n}',
          language: 'css',
        },
        {
          animationStep: 4,
          heading: 'Fluid units',
          text: 'Use %, vw, vh, and rem instead of fixed px for layouts that scale naturally. clamp() is powerful: it sets a minimum, a fluid value, and a maximum.',
          codeExample: '.container {\n  width: min(100%, 1100px);\n  padding: 0 clamp(16px, 4vw, 48px);\n}\n\nh1 { font-size: clamp(1.5rem, 5vw, 3rem); }',
          language: 'css',
        },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'media query', code: '@media (min-width: 768px) { /* tablet+ */ }\n@media (min-width: 1024px) { /* desktop+ */ }\n@media (max-width: 767px) { /* mobile only — avoid in mobile-first */ }', note: 'Common breakpoints' },
      { label: 'clamp()', code: 'font-size: clamp(1rem, 2.5vw, 1.5rem);\n/*          min   fluid   max */', note: 'Fluid with limits' },
      { label: 'min() / max()', code: 'width: min(100%, 1100px);\n/* = width: 100%; max-width: 1100px */', note: 'Shorthand for constrained widths' },
      { label: 'viewport units', code: 'height: 100vh;  /* full viewport height */\nwidth: 50vw;    /* half viewport width */\nfont-size: 2vw; /* scales with width */', note: 'vw, vh, vmin, vmax' },
    ],
    patterns: [
      { title: 'Mobile-first responsive grid', code: '.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n@media (min-width: 640px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}', language: 'css' },
      { title: 'Fluid container', code: '.container {\n  width: 100%;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 clamp(16px, 4vw, 48px);\n}', language: 'css' },
    ],
    whenToUse: 'Always build mobile-first — write base styles for small screens, enhance with min-width media queries. Common breakpoints: 480px (large phone), 768px (tablet), 1024px (laptop), 1280px (desktop). Use clamp() for fluid typography.',
    commonMistakes: [
      'Desktop-first (max-width queries) — leads to complex CSS that\'s hard to maintain. Switch to min-width.',
      'Hardcoding px widths for layouts — use % or grid with fr units so they scale automatically',
      'Too many custom breakpoints — stick to 3–4 consistent breakpoints across the project',
    ],
  },
},
```

- [ ] **Step 6: Add `css-images` topic**

```ts
{
  id: 'css-images',
  title: 'Images',
  description: 'Responsive images, object-fit, and visual styling',
  level: 1,
  category: 'css',
  color: '#5b9cf5',
  estimatedMinutes: 8,
  animationComponent: 'ImagesViz',
  playgroundType: 'visual-controls',
  sections: [
    { id: 'intro', type: 'intro', steps: [] },
    {
      id: 'explanation',
      type: 'explanation',
      steps: [
        {
          animationStep: 0,
          heading: 'Unstyled images overflow',
          text: 'By default, images render at their natural (intrinsic) size. A 1200px photo in a 400px container will overflow — breaking your layout.',
          codeExample: '/* No CSS — image renders at full size */\n<img src="photo.jpg">',
          language: 'html',
        },
        {
          animationStep: 1,
          heading: 'max-width: 100%',
          text: 'The simplest responsive image fix. The image will never be wider than its container, and scales down proportionally if the container is smaller.',
          codeExample: 'img {\n  max-width: 100%;\n  height: auto; /* maintain aspect ratio */\n  display: block; /* remove inline gap below image */\n}',
          language: 'css',
        },
        {
          animationStep: 2,
          heading: 'object-fit: cover',
          text: 'When you need an image to fill a fixed-size container without distortion. cover scales and crops the image to fill. Use object-position to control the crop anchor.',
          codeExample: '.thumbnail {\n  width: 300px;\n  height: 200px;\n  object-fit: cover;           /* fill, crop to fit */\n  object-position: center top; /* anchor crop */\n}',
          language: 'css',
        },
        {
          animationStep: 3,
          heading: 'border-radius',
          text: 'Round any element\'s corners with border-radius. 50% on a square element creates a perfect circle — great for avatars.',
          codeExample: '.card-image { border-radius: 12px; }\n.avatar {\n  border-radius: 50%;\n  width: 64px;\n  height: 64px;\n  object-fit: cover;\n}',
          language: 'css',
        },
        {
          animationStep: 4,
          heading: 'aspect-ratio',
          text: 'aspect-ratio locks a container\'s proportions. The image fills it with object-fit: cover. This prevents layout shift while images load.',
          codeExample: '.card-image {\n  aspect-ratio: 16 / 9; /* widescreen */\n  width: 100%;\n  object-fit: cover;\n}\n\n.square { aspect-ratio: 1; }',
          language: 'css',
        },
      ],
    },
    { id: 'playground', type: 'playground', steps: [] },
  ],
  cheatSheet: {
    syntax: [
      { label: 'responsive image', code: 'img {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}', note: 'Always include this reset' },
      { label: 'object-fit', code: 'object-fit: cover;    /* fill, crops */\nobject-fit: contain;  /* fit, letterboxes */\nobject-fit: fill;     /* stretch — usually wrong */', note: 'How image fills container' },
      { label: 'object-position', code: 'object-position: center;    /* default */\nobject-position: top;\nobject-position: 20% 80%;', note: 'Crop anchor point' },
      { label: 'aspect-ratio', code: 'aspect-ratio: 16 / 9;\naspect-ratio: 1;      /* square */\naspect-ratio: 4 / 3;', note: 'Lock proportions' },
      { label: 'border-radius', code: 'border-radius: 8px;   /* rounded corners */\nborder-radius: 50%;   /* circle */\nborder-radius: 8px 0; /* top-left, top-right */', note: 'Rounding' },
    ],
    patterns: [
      { title: 'Avatar with circle crop', code: '.avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  object-fit: cover;\n  object-position: center;\n}', language: 'css' },
      { title: 'Card image with fixed ratio', code: '.card-img {\n  aspect-ratio: 16 / 9;\n  width: 100%;\n  object-fit: cover;\n  border-radius: 8px 8px 0 0;\n}', language: 'css' },
    ],
    whenToUse: 'Always add max-width: 100% and height: auto to images globally. Use object-fit: cover + aspect-ratio for thumbnails and cards. Use border-radius: 50% for avatars. Add display: block to remove the inline gap below images.',
    commonMistakes: [
      'Forgetting height: auto with max-width: 100% — image squishes if height is set in HTML attributes',
      'object-fit without a fixed height — the container must have a defined height for object-fit to work',
      'Using border-radius on the img element inside a container — also set overflow: hidden on the container',
    ],
  },
},
```

- [ ] **Step 7: Verify TypeScript and run dev server to check topics appear**

```bash
npx tsc --noEmit 2>&1 | head -20
npm run dev
# Open http://localhost:5173/css — you should see 10 topic cards (4 existing + 6 new)
# New topics will show an error when clicked (viz components don't exist yet)
```

- [ ] **Step 8: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add 6 CSS topic definitions (colors, typography, backgrounds, display, responsive, images)"
```

---

## Chunk 2: GradientPlayground component

### Task 5: Build GradientPlayground.tsx

**Files:**
- Create: `src/playgrounds/GradientPlayground.tsx`

The gradient playground has its own internal state (no `usePlayground` hook needed — gradient state is complex and doesn't need persistence).

- [ ] **Step 1: Create the component**

```tsx
// src/playgrounds/GradientPlayground.tsx
import { useState, useCallback } from 'react'
import { Copy, Plus, Trash2, Check } from 'lucide-react'

type GradientType = 'linear' | 'radial' | 'conic'

interface ColorStop {
  id: number
  color: string
  position: number // 0-100
}

interface State {
  type: GradientType
  angle: number
  stops: ColorStop[]
  copied: boolean
}

let nextId = 3

const DEFAULT_STOPS: ColorStop[] = [
  { id: 1, color: '#6366f1', position: 0 },
  { id: 2, color: '#ec4899', position: 100 },
]

function buildGradientCSS(type: GradientType, angle: number, stops: ColorStop[]): string {
  const sortedStops = [...stops].sort((a, b) => a.position - b.position)
  const stopStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ')

  if (type === 'linear') return `linear-gradient(${angle}deg, ${stopStr})`
  if (type === 'radial') return `radial-gradient(circle, ${stopStr})`
  return `conic-gradient(from 0deg, ${stopStr})`
}

export default function GradientPlayground() {
  const [state, setState] = useState<State>({
    type: 'linear',
    angle: 135,
    stops: DEFAULT_STOPS,
    copied: false,
  })

  const gradientValue = buildGradientCSS(state.type, state.angle, state.stops)
  const cssOutput = `background: ${gradientValue};`

  const setType = (type: GradientType) => setState(s => ({ ...s, type }))
  const setAngle = (angle: number) => setState(s => ({ ...s, angle }))

  const updateStop = useCallback((id: number, field: 'color' | 'position', value: string | number) => {
    setState(s => ({
      ...s,
      stops: s.stops.map(stop => stop.id === id ? { ...stop, [field]: value } : stop),
    }))
  }, [])

  const addStop = () => {
    setState(s => ({
      ...s,
      stops: [...s.stops, { id: nextId++, color: '#a855f7', position: 50 }],
    }))
  }

  const removeStop = (id: number) => {
    setState(s => ({
      ...s,
      stops: s.stops.length > 2 ? s.stops.filter(stop => stop.id !== id) : s.stops,
    }))
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(cssOutput).then(() => {
      setState(s => ({ ...s, copied: true }))
      setTimeout(() => setState(s => ({ ...s, copied: false })), 1800)
    })
  }

  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
      {/* Controls */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: 24, display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Controls</h3>

        {/* Type selector */}
        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
            gradient type
          </label>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['linear', 'radial', 'conic'] as GradientType[]).map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  background: state.type === t ? 'var(--blue)' : 'var(--surface)',
                  color: state.type === t ? '#fff' : 'var(--text-muted)',
                  transition: 'all 0.15s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Angle slider — linear only */}
        {state.type === 'linear' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>angle</label>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--blue)' }}>{state.angle}deg</span>
            </div>
            <input
              type="range" min={0} max={360}
              value={state.angle}
              onChange={e => setAngle(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--blue)' }}
            />
          </div>
        )}

        {/* Color stops */}
        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: 10 }}>
            color stops
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sortedStops.map(stop => (
              <div key={stop.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="color"
                  value={stop.color}
                  onChange={e => updateStop(stop.id, 'color', e.target.value)}
                  style={{ width: 32, height: 32, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="range" min={0} max={100}
                  value={stop.position}
                  onChange={e => updateStop(stop.id, 'position', Number(e.target.value))}
                  style={{ flex: 1, accentColor: stop.color }}
                />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', width: 32, textAlign: 'right' }}>
                  {stop.position}%
                </span>
                <button
                  onClick={() => removeStop(stop.id)}
                  disabled={state.stops.length <= 2}
                  style={{
                    background: 'none', border: 'none', cursor: state.stops.length <= 2 ? 'default' : 'pointer',
                    color: state.stops.length <= 2 ? 'var(--border)' : 'var(--text-muted)',
                    padding: 2,
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addStop}
            style={{
              marginTop: 10, display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: '1px dashed var(--border)', borderRadius: 6,
              padding: '6px 12px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 12,
              width: '100%', justifyContent: 'center',
            }}
          >
            <Plus size={12} /> Add stop
          </button>
        </div>
      </div>

      {/* Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Gradient preview box */}
        <div style={{
          height: 200,
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          background: gradientValue,
          transition: 'background 0.2s',
        }} />

        {/* CSS output */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <pre style={{
              margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--blue)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1,
            }}>
              {cssOutput}
            </pre>
            <button
              onClick={copyCSS}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: state.copied ? 'var(--green)' : 'var(--blue)',
                color: '#fff', border: 'none', borderRadius: 6,
                padding: '6px 12px', cursor: 'pointer', fontSize: 12,
                fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              {state.copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy CSS</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Start dev server and navigate to `/topic/css-backgrounds-gradients`**

```bash
npm run dev
# Verify: gradient playground renders, type buttons work, angle slider changes gradient,
# color pickers update stops, position sliders work, Copy CSS copies to clipboard
```

- [ ] **Step 3: Commit**

```bash
git add src/playgrounds/GradientPlayground.tsx
git commit -m "feat: GradientPlayground — linear/radial/conic with color stops and copy CSS"
```

---

## Chunk 3: Viz components — ColorsUnits, Typography, Backgrounds

### Task 6: ColorsUnitsViz.tsx

**Files:**
- Create: `src/topics/css/ColorsUnitsViz.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/topics/css/ColorsUnitsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#22c55e'
const PURPLE = '#a855f7'
const ORANGE = '#f97316'
const CYAN = '#22d3ee'

const COLOR_STEPS = [
  { label: 'Named', value: 'tomato', display: 'tomato', color: '#ff6347' },
  { label: 'HEX', value: '#3b82f6', display: '#3b82f6', color: '#3b82f6' },
  { label: 'RGB', value: 'rgb(34,197,94)', display: 'rgb(34, 197, 94)', color: '#22c55e' },
  { label: 'HSL', value: 'hsl(270,80%,60%)', display: 'hsl(270, 80%, 60%)', color: '#a855f7' },
]

const UNITS = [
  { label: 'px', value: '16px', description: 'Absolute', color: BLUE },
  { label: 'rem', value: '1rem', description: 'Relative to root', color: GREEN },
  { label: 'em', value: '1em', description: 'Relative to parent', color: PURPLE },
  { label: '%', value: '50%', description: 'Relative to parent', color: ORANGE },
]

const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }

export default function ColorsUnitsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)

  if (s <= 3) {
    const cfg = COLOR_STEPS[s]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
        {/* Color swatch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={s}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={spring}
            style={{
              width: compact ? 80 : 120,
              height: compact ? 80 : 120,
              borderRadius: 16,
              background: cfg.color,
              boxShadow: `0 0 32px ${cfg.color}66`,
            }}
          />
        </AnimatePresence>

        {/* Format badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              display: 'inline-block',
              background: `${cfg.color}20`,
              border: `1px solid ${cfg.color}55`,
              borderRadius: 6,
              padding: compact ? '4px 10px' : '6px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 11 : 14,
              color: cfg.color,
              fontWeight: 600,
              marginBottom: 6,
            }}>
              {cfg.display}
            </div>
            <div style={{
              fontSize: compact ? 10 : 12,
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}>
              {cfg.label} format
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Format selector dots */}
        <div style={{ display: 'flex', gap: 8 }}>
          {COLOR_STEPS.map((c, i) => (
            <motion.div
              key={c.label}
              animate={{
                scale: i === s ? 1.3 : 1,
                background: i <= s ? c.color : 'var(--border)',
              }}
              transition={spring}
              style={{
                width: compact ? 8 : 10,
                height: compact ? 8 : 10,
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  // Step 4 — Units comparison
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      <div style={{ display: 'flex', gap: compact ? 8 : 12, alignItems: 'flex-end' }}>
        {UNITS.map((unit, i) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, ...spring }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 9 : 10,
              color: unit.color,
              textAlign: 'center',
            }}>
              {unit.description}
            </div>
            <div style={{
              background: `${unit.color}20`,
              border: `2px solid ${unit.color}`,
              borderRadius: 8,
              padding: compact ? '8px 10px' : '12px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 11 : 13,
              color: unit.color,
              fontWeight: 700,
              textAlign: 'center',
              minWidth: compact ? 48 : 64,
            }}>
              {unit.value}
            </div>
            <div style={{
              fontSize: compact ? 10 : 12,
              fontFamily: 'var(--font-mono)',
              color: unit.color,
              fontWeight: 700,
            }}>
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{
        fontSize: compact ? 10 : 12,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        textAlign: 'center',
      }}>
        px · rem · em · %
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser** — navigate to `/topic/css-colors-units`, step through all 5 steps.

- [ ] **Step 3: Commit**

```bash
git add src/topics/css/ColorsUnitsViz.tsx
git commit -m "feat: ColorsUnitsViz — color format swatches + units comparison"
```

---

### Task 7: TypographyViz.tsx

**Files:**
- Create: `src/topics/css/TypographyViz.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/topics/css/TypographyViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const PURPLE = '#a855f7'

const STEP_CONFIGS = [
  {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'left' as const,
    textDecoration: 'none',
    letterSpacing: 0,
    lineHeight: 1.2,
    color: 'var(--text-muted)',
    label: 'Browser default — serif, 16px',
    labelColor: 'var(--text-muted)',
  },
  {
    fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'left' as const,
    textDecoration: 'none',
    letterSpacing: 0,
    lineHeight: 1.3,
    color: BLUE,
    label: 'font-family: sans-serif · font-size: 20px · font-weight: 700',
    labelColor: BLUE,
  },
  {
    fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center' as const,
    textDecoration: 'underline',
    letterSpacing: 0,
    lineHeight: 1.3,
    color: BLUE,
    label: 'text-align: center · text-decoration: underline',
    labelColor: BLUE,
  },
  {
    fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'left' as const,
    textDecoration: 'none',
    letterSpacing: '0.05em',
    lineHeight: 1.8,
    color: PURPLE,
    label: 'letter-spacing: 0.05em · line-height: 1.8',
    labelColor: PURPLE,
  },
  {
    fontFamily: 'Georgia, serif',
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center' as const,
    textDecoration: 'none',
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
    color: '#f59e0b',
    label: '@import Google Font · applied via font-family',
    labelColor: '#f59e0b',
  },
]

export default function TypographyViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEP_CONFIGS[s]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20, width: '100%' }}>
      {/* Text preview box */}
      <div style={{
        width: '100%',
        maxWidth: compact ? 260 : 340,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: compact ? '16px 18px' : '24px 28px',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              animate={{
                fontFamily: cfg.fontFamily,
                fontSize: cfg.fontSize,
                fontWeight: cfg.fontWeight,
                textAlign: cfg.textAlign,
                textDecoration: cfg.textDecoration,
                letterSpacing: cfg.letterSpacing,
                lineHeight: cfg.lineHeight,
                color: cfg.color,
              }}
              transition={{ duration: 0.4 }}
              style={{ margin: 0 }}
            >
              The quick brown fox jumps over the lazy dog.
            </motion.p>
          </motion.div>
        </AnimatePresence>
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
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: cfg.labelColor,
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

- [ ] **Step 2: Verify in browser** — navigate to `/topic/css-typography`.

- [ ] **Step 3: Commit**

```bash
git add src/topics/css/TypographyViz.tsx
git commit -m "feat: TypographyViz — live text style evolution across 5 steps"
```

---

### Task 8: BackgroundsViz.tsx

**Files:**
- Create: `src/topics/css/BackgroundsViz.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/topics/css/BackgroundsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const STEPS = [
  {
    label: 'background-color: #3b82f6',
    background: '#3b82f6',
    color: '#3b82f6',
  },
  {
    label: 'background-image: url(...)',
    // Simulate image with repeating pattern
    background: 'repeating-linear-gradient(45deg, #1e293b 0px, #1e293b 10px, #2d3f55 10px, #2d3f55 20px)',
    color: '#60a5fa',
  },
  {
    label: 'background-size: cover · background-position: center',
    background: 'repeating-linear-gradient(45deg, #1e293b 0px, #1e293b 10px, #2d3f55 10px, #2d3f55 20px) center / cover',
    color: '#60a5fa',
  },
  {
    label: 'linear-gradient(135deg, #6366f1, #ec4899)',
    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
    color: '#818cf8',
  },
  {
    label: 'radial-gradient(circle, #6366f1, #0f172a)',
    background: 'radial-gradient(circle at 40% 40%, #6366f1 0%, #0f172a 70%)',
    color: '#818cf8',
  },
]

const spring = { type: 'spring' as const, stiffness: 200, damping: 25 }

export default function BackgroundsViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEPS[s]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      {/* Background preview box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={spring}
          style={{
            width: compact ? 160 : 220,
            height: compact ? 100 : 140,
            borderRadius: 12,
            border: '1px solid var(--border)',
            background: cfg.background,
          }}
        />
      </AnimatePresence>

      {/* CSS label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={s}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: cfg.color,
            textAlign: 'center',
          }}
        >
          {cfg.label}
        </motion.p>
      </AnimatePresence>

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 6 }}>
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === s ? 1.4 : 1,
              background: i <= s ? step.color : 'var(--border)',
            }}
            transition={spring}
            style={{ width: compact ? 7 : 8, height: compact ? 7 : 8, borderRadius: '50%' }}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser** — navigate to `/topic/css-backgrounds-gradients`, check viz + gradient playground.

- [ ] **Step 3: Commit**

```bash
git add src/topics/css/BackgroundsViz.tsx
git commit -m "feat: BackgroundsViz — background-color → image → gradient evolution"
```

---

## Chunk 4: Viz components — Display, Responsive, Images

### Task 9: DisplayPositioningViz.tsx

**Files:**
- Create: `src/topics/css/DisplayPositioningViz.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/topics/css/DisplayPositioningViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#22c55e'
const PURPLE = '#a855f7'

const BLOCKS = [
  { label: 'div.one', color: BLUE },
  { label: 'div.two', color: GREEN },
  { label: 'div.three', color: PURPLE },
]

const STEP_LABELS = [
  'display: block — each element starts on a new line',
  'display: inline — elements flow with text',
  'display: inline-block — inline flow, block sizing',
  'position: relative — nudged from original position',
  'position: absolute — removed from flow, overlaps others',
]

const spring = { type: 'spring' as const, stiffness: 260, damping: 28 }

export default function DisplayPositioningViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const size = compact ? 32 : 44
  const gap = compact ? 4 : 6
  const fontSize = compact ? 9 : 10

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      {/* Demo area */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: compact ? 12 : 20,
        width: compact ? 200 : 280,
        minHeight: compact ? 80 : 120,
        position: 'relative',
        display: s === 0 ? 'flex' : 'flex',
        flexDirection: s === 0 ? 'column' : s === 1 || s === 2 ? 'row' : 'row',
        flexWrap: 'wrap',
        gap,
        alignItems: 'flex-start',
      }}>
        {BLOCKS.map((block, i) => {
          const isAbsoluteStep = s === 4
          const isRelativeStep = s === 3

          return (
            <motion.div
              key={block.label}
              layout
              animate={{
                x: isRelativeStep && i === 1 ? (compact ? 8 : 14) : isAbsoluteStep && i === 1 ? (compact ? 20 : 32) : 0,
                y: isAbsoluteStep && i === 1 ? (compact ? -16 : -24) : 0,
                zIndex: isAbsoluteStep && i === 1 ? 2 : 1,
                width: s === 0 ? '100%' : s === 1 ? 'auto' : size,
              }}
              transition={spring}
              style={{
                height: s === 1 ? 'auto' : size,
                background: `${block.color}20`,
                border: `2px solid ${block.color}`,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize,
                color: block.color,
                fontWeight: 600,
                position: isAbsoluteStep && i === 1 ? 'absolute' : 'relative',
                padding: s === 1 ? `2px ${compact ? 6 : 8}px` : 0,
                flexShrink: 0,
              }}
            >
              {s === 1 ? block.label.split('.')[1] : `${i + 1}`}
            </motion.div>
          )
        })}
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
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: BLUE,
            textAlign: 'center',
          }}
        >
          {STEP_LABELS[s]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser** — navigate to `/topic/css-display-positioning`.

- [ ] **Step 3: Commit**

```bash
git add src/topics/css/DisplayPositioningViz.tsx
git commit -m "feat: DisplayPositioningViz — block/inline/inline-block/relative/absolute"
```

---

### Task 10: ResponsiveViz.tsx

**Files:**
- Create: `src/topics/css/ResponsiveViz.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/topics/css/ResponsiveViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#22c55e'
const ORANGE = '#f97316'

// Simulated cards that reflow based on step
const CARDS = ['Card A', 'Card B', 'Card C']
const CARD_COLOR = [BLUE, GREEN, ORANGE]

const STEPS = [
  { cols: 1, label: 'Mobile — 1 column, no media query', breakpoint: null, color: BLUE },
  { cols: 2, label: '@media (min-width: 768px) — tablet, 2 columns', breakpoint: '768px', color: GREEN },
  { cols: 3, label: '@media (min-width: 1024px) — desktop, 3 columns', breakpoint: '1024px', color: ORANGE },
  { cols: 1, label: 'Mobile-first: base = mobile, scale up with min-width', breakpoint: null, color: BLUE },
  { cols: 3, label: 'Fluid units — %, rem, vw scale naturally', breakpoint: null, color: '#a855f7' },
]

const spring = { type: 'spring' as const, stiffness: 260, damping: 28 }

export default function ResponsiveViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEPS[s]

  const cardW = cfg.cols === 1
    ? '100%'
    : cfg.cols === 2
      ? 'calc(50% - 4px)'
      : 'calc(33.33% - 6px)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      {/* Simulated viewport frame */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        overflow: 'hidden',
        width: compact ? 200 : 280,
      }}>
        {/* Fake browser bar */}
        <div style={{
          background: 'var(--border)',
          padding: compact ? '4px 8px' : '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
            <div key={c} style={{ width: compact ? 5 : 7, height: compact ? 5 : 7, borderRadius: '50%', background: c }} />
          ))}
          {cfg.breakpoint && (
            <span style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? 8 : 9,
              color: cfg.color,
            }}>
              ≥ {cfg.breakpoint}
            </span>
          )}
        </div>

        {/* Card grid */}
        <div style={{ padding: compact ? 8 : 12, display: 'flex', flexWrap: 'wrap', gap: compact ? 4 : 8 }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={card}
              layout
              animate={{ width: cardW }}
              transition={spring}
              style={{
                background: `${CARD_COLOR[i]}18`,
                border: `1.5px solid ${CARD_COLOR[i]}55`,
                borderRadius: 6,
                padding: compact ? '6px 4px' : '10px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: compact ? 8 : 10,
                color: CARD_COLOR[i],
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              {card}
            </motion.div>
          ))}
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
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: cfg.color,
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

- [ ] **Step 2: Verify in browser** — navigate to `/topic/css-responsive`.

- [ ] **Step 3: Commit**

```bash
git add src/topics/css/ResponsiveViz.tsx
git commit -m "feat: ResponsiveViz — responsive grid with breakpoint simulation"
```

---

### Task 11: ImagesViz.tsx

**Files:**
- Create: `src/topics/css/ImagesViz.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/topics/css/ImagesViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const BLUE = '#3b82f6'
const GREEN = '#22c55e'
const PURPLE = '#a855f7'
const ORANGE = '#f97316'

// Simulated image using a gradient placeholder
const IMG_BG = 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)'

const STEP_CONFIGS = [
  {
    containerW: '100%',
    containerH: undefined as number | undefined,
    imgW: 280,
    imgH: 140,
    objectFit: 'fill' as const,
    borderRadius: 0,
    overflow: 'visible',
    label: 'No CSS — image overflows its container',
    color: 'var(--text-muted)',
  },
  {
    containerW: '100%',
    containerH: undefined,
    imgW: undefined as number | undefined,
    imgH: undefined as number | undefined,
    objectFit: 'fill' as const,
    borderRadius: 0,
    overflow: 'hidden',
    label: 'max-width: 100% · height: auto — scales to fit',
    color: BLUE,
  },
  {
    containerW: '100%',
    containerH: 100,
    imgW: undefined,
    imgH: undefined,
    objectFit: 'cover' as const,
    borderRadius: 0,
    overflow: 'hidden',
    label: 'object-fit: cover — fills container, crops to fit',
    color: GREEN,
  },
  {
    containerW: 120,
    containerH: 120,
    imgW: undefined,
    imgH: undefined,
    objectFit: 'cover' as const,
    borderRadius: '50%',
    overflow: 'hidden',
    label: 'border-radius: 50% — circle avatar crop',
    color: PURPLE,
  },
  {
    containerW: '100%',
    containerH: undefined,
    imgW: undefined,
    imgH: undefined,
    objectFit: 'cover' as const,
    borderRadius: 10,
    overflow: 'hidden',
    label: 'aspect-ratio: 16 / 9 — locks proportions',
    color: ORANGE,
  },
]

const spring = { type: 'spring' as const, stiffness: 240, damping: 28 }

export default function ImagesViz({ step, compact = false }: Props) {
  const s = Math.min(step, 4)
  const cfg = STEP_CONFIGS[s]

  const outerW = compact ? 200 : 260
  const scaledContainerW = cfg.containerW === '100%' ? '100%' : (typeof cfg.containerW === 'number' ? (compact ? cfg.containerW * 0.7 : cfg.containerW) : cfg.containerW)
  const scaledContainerH = cfg.containerH ? (compact ? cfg.containerH * 0.7 : cfg.containerH) : undefined

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 20 }}>
      {/* Container frame */}
      <div style={{
        width: outerW,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: compact ? 10 : 16,
        overflow: 'hidden',
      }}>
        <div style={{
          fontSize: compact ? 8 : 9,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          marginBottom: compact ? 6 : 10,
        }}>
          .container
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: scaledContainerW,
              height: s === 4 ? undefined : scaledContainerH,
              aspectRatio: s === 4 ? '16 / 9' : undefined,
              overflow: cfg.overflow as 'hidden' | 'visible',
              borderRadius: cfg.borderRadius,
              margin: s === 3 ? '0 auto' : 0,
            }}
          >
            <motion.div
              animate={{
                width: cfg.imgW ? (compact ? cfg.imgW * 0.7 : cfg.imgW) : '100%',
                height: cfg.imgH ? (compact ? cfg.imgH * 0.7 : cfg.imgH) : '100%',
                borderRadius: cfg.borderRadius,
              }}
              transition={spring}
              style={{
                background: IMG_BG,
                objectFit: cfg.objectFit,
                display: 'block',
                minHeight: (cfg.containerH || scaledContainerH) ? undefined : (compact ? 60 : 90),
              }}
            />
          </motion.div>
        </AnimatePresence>
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
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 10 : 11,
            color: cfg.color,
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

- [ ] **Step 2: Verify in browser** — navigate to `/topic/css-images`, step through all 5 steps.

- [ ] **Step 3: Commit**

```bash
git add src/topics/css/ImagesViz.tsx
git commit -m "feat: ImagesViz — overflow → max-width → object-fit → border-radius → aspect-ratio"
```

---

## Chunk 5: Final verification and push

### Task 12: Full CSS category review and push

- [ ] **Step 1: TypeScript clean build**

```bash
npx tsc --noEmit 2>&1
```
Expected: 0 errors.

- [ ] **Step 2: Dev server walkthrough**

```bash
npm run dev
```
Visit each new topic and verify:
- `/css` — 10 topic cards visible (4 existing + 6 new)
- `/topic/css-colors-units` — 5 steps animate correctly
- `/topic/css-typography` — text style transitions work
- `/topic/css-backgrounds-gradients` — viz + gradient playground renders, copy CSS works
- `/topic/css-display-positioning` — blocks reflow across 5 steps
- `/topic/css-responsive` — grid reflows from 1→2→3 columns
- `/topic/css-images` — image container transitions work
- All topics have cheat sheets visible

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | tail -20
```
Expected: build succeeds with no errors.

- [ ] **Step 4: Push to GitHub**

```bash
git push origin main
```
