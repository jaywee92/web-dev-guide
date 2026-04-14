# WBS Integration: Batch 2 — CSS + Web APIs Implementation Plan

> ✅ **COMPLETED** — implemented and deployed to main

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 5 new explanation steps to `css-tailwind` (steps 4–8) and 3 new steps to `webapi-dom` (steps 4–6), plus matching EN and DE locale entries.

**Architecture:** Edit `src/data/topics.ts` to add structural step objects, then add matching translatable entries to EN and DE locale JSON files. No new files, no new components.

**Tech Stack:** TypeScript, React, i18next. All text via i18n locale JSON; code examples in topics.ts only.

**Spec:** `docs/superpowers/specs/2026-03-15-wbs-curriculum-integration.md`

---

## Pre-flight Audit (READ FIRST)

Before implementing, verify step counts:

- `css-tailwind` (line ~4922 in `src/data/topics.ts`): currently 4 steps (0–3) — Utility-First, Responsive Prefixes, Common Utilities, Setup. Steps 4–8 are missing.
- `webapi-dom` (line ~3511 in `src/data/topics.ts`): currently 4 steps (0–3) — DOM Tree, Selecting Elements, Creating/Inserting, Reading/Changing. Steps 4–6 are missing.

---

## Chunk 1: Enrich css-tailwind in topics.ts

### Task 1: Add steps 4–8 to css-tailwind in topics.ts

**Files:**
- Modify: `src/data/topics.ts` (around line 4969, after the last step of css-tailwind)

- [x] **Step 1: Open topics.ts and find css-tailwind explanation steps**

  Read `src/data/topics.ts` lines 4922–4975. Confirm the last step is `animationStep: 3` ("Setup: CDN and npm").

- [x] **Step 2: Add steps 4–8 after animationStep 3**

  In `src/data/topics.ts`, inside the `css-tailwind` topic's `sections[1].steps` array (explanation section), add these 5 objects after the last step:

  ```typescript
  {
    animationStep: 4,
    icon: '🏗️',
    heading: 'Why CSS Frameworks?',
    text: 'Raw CSS has pain points: repetitive rules, naming conventions (BEM), and maintaining media queries across a large codebase. Utility-first frameworks solve this by applying single-purpose classes directly in HTML — no naming decisions, no context switching between files.',
    codeExample: `<!-- BEM approach: lots of CSS context switching -->\n<div class="card card--featured">\n  <h2 class="card__title card__title--large">Title</h2>\n</div>\n\n<!-- Tailwind approach: everything in HTML -->\n<div class="rounded-xl shadow-lg border border-gray-100 p-6">\n  <h2 class="text-2xl font-bold text-gray-900">Title</h2>\n</div>`,
    language: 'html',
  },
  {
    animationStep: 5,
    icon: '📏',
    heading: 'Responsive Breakpoints',
    text: 'Tailwind is mobile-first. Unprefixed classes apply to all screen sizes; breakpoint prefixes apply from that width upward. Breakpoints: sm: 640px · md: 768px · lg: 1024px · xl: 1280px · 2xl: 1536px. Stack prefixes to build fully responsive layouts without writing a single media query.',
    codeExample: `<!-- 1 col on mobile, 2 on md, 3 on lg -->\n<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n  <div class="p-4 bg-white rounded">Card</div>\n</div>\n\n<!-- Text grows at each breakpoint -->\n<p class="text-sm md:text-base lg:text-xl font-medium text-gray-700">\n  Responsive text\n</p>`,
    language: 'html',
  },
  {
    animationStep: 6,
    icon: '🌙',
    heading: 'Dark Mode',
    text: 'Enable dark mode by adding `darkMode: \'class\'` to tailwind.config.js. Then toggle the `dark` class on the `<html>` element (via JavaScript). Any class prefixed with `dark:` activates only when the dark class is present on a parent — letting you theme your entire app with a single toggle.',
    codeExample: `// tailwind.config.js\nmodule.exports = { darkMode: 'class', content: ['./src/**/*.{html,js}'] }\n\n// Toggle dark mode\ndocument.documentElement.classList.toggle('dark');\n\n<!-- In your HTML -->\n<div class="bg-white dark:bg-gray-900 text-black dark:text-white p-6">\n  <p class="text-gray-700 dark:text-gray-300">Content</p>\n</div>`,
    language: 'html',
  },
  {
    animationStep: 7,
    icon: '🎯',
    heading: 'Arbitrary Values',
    text: 'When you need an exact value outside the design system, use square bracket syntax. Works on any utility property: widths, colors, spacing, grid templates, even CSS calc() expressions. Use sparingly — prefer design tokens for consistency across the project.',
    codeExample: `<!-- Arbitrary pixel value -->\n<div class="w-[347px] h-[200px]">\n\n<!-- Arbitrary hex color -->\n<div class="bg-[#1da1f2] text-[#ffffff]">\n\n<!-- Arbitrary calc -->\n<div class="mt-[calc(100vh-4rem)]">\n\n<!-- Arbitrary grid template -->\n<div class="grid grid-cols-[1fr_2fr_1fr]">`,
    language: 'html',
  },
  {
    animationStep: 8,
    icon: '🔧',
    heading: '@layer & @apply',
    text: '@layer organises your CSS into three buckets: base (global resets), components (reusable UI patterns), utilities (single-purpose custom classes). @apply lets you compose Tailwind utilities into a custom class — useful when a pattern repeats across many elements but you still want Tailwind\'s design tokens.',
    codeExample: `/* In your main CSS file */\n@layer base {\n  h1 { @apply text-3xl font-bold text-gray-900; }\n  a  { @apply text-blue-600 hover:underline; }\n}\n\n@layer components {\n  .btn-primary {\n    @apply flex items-center gap-2 px-4 py-2\n           rounded-lg bg-blue-500 text-white\n           hover:bg-blue-600 transition-colors;\n  }\n}\n\n@layer utilities {\n  .scrollbar-hidden { scrollbar-width: none; }\n}`,
    language: 'css',
  },
  ```

- [x] **Step 3: Verify the file still compiles**

  ```bash
  npx tsc --noEmit 2>&1 | grep -v supabase
  ```

  Expected: no errors.

- [x] **Step 4: Commit**

  ```bash
  git add src/data/topics.ts
  git commit -m "feat: add steps 4-8 to css-tailwind (frameworks, breakpoints, dark mode, arbitrary values, @layer)"
  ```

---

## Chunk 2: Enrich webapi-dom in topics.ts

### Task 2: Add steps 4–6 to webapi-dom in topics.ts

**Files:**
- Modify: `src/data/topics.ts` (around line 3558, after the last step of webapi-dom)

- [x] **Step 1: Open topics.ts and find webapi-dom explanation steps**

  Read `src/data/topics.ts` lines 3511–3565. Confirm the last step is `animationStep: 3` ("Reading and Changing Element Properties").

- [x] **Step 2: Add steps 4–6 after animationStep 3**

  In `src/data/topics.ts`, inside the `webapi-dom` topic's `sections[1].steps` array (explanation section), add these 3 objects after the last step:

  ```typescript
  {
    animationStep: 4,
    icon: '🗂️',
    heading: 'DOM Interfaces',
    text: 'The DOM is structured as a hierarchy of interfaces. Document is the entry point. Node is the base for all DOM nodes (elements, text, comments). Element extends Node and adds HTML-specific methods. Understanding this hierarchy explains which methods are available on which objects.',
    codeExample: `// Document — entry point\ndocument.querySelector('#btn');    // Element | null\ndocument.createElement('div');     // HTMLElement\ndocument.createTextNode('hello'); // Text node\n\n// Node — base interface (on all nodes)\nel.parentNode;       // Node | null\nel.childNodes;       // NodeList (all child nodes)\nel.nodeType;         // 1=Element, 3=Text, 9=Document\nel.textContent;      // text of node + all descendants\n\n// Element — extends Node (on element nodes only)\nel.getAttribute('href');           // read attribute\nel.setAttribute('data-id', '42'); // write attribute\nel.classList.add('active');       // CSS class list\nel.innerHTML;                      // HTML string (use carefully)`,
    language: 'javascript',
  },
  {
    animationStep: 5,
    icon: '🔎',
    heading: 'Advanced Querying',
    text: 'Beyond querySelector, two traversal methods are especially useful: closest() walks up the ancestor chain and returns the first element matching a selector — perfect for event delegation. matches() checks whether an element matches a selector without traversing anywhere — useful in event handlers to filter targets.',
    codeExample: `// closest — walks UP the tree\ndocument.addEventListener('click', (e) => {\n  // Find nearest ancestor <li> from the clicked element\n  const item = e.target.closest('li');\n  if (item) console.log('Clicked item:', item.textContent);\n});\n\n// matches — does this element match?\nconst el = document.querySelector('.card');\nconsole.log(el.matches('.card.active')); // false\nconsole.log(el.matches('[data-id]'));    // depends on attrs\n\n// Combined — event delegation pattern\nlist.addEventListener('click', (e) => {\n  if (e.target.matches('.delete-btn')) {\n    e.target.closest('li').remove();\n  }\n});`,
    language: 'javascript',
  },
  {
    animationStep: 6,
    icon: '📋',
    heading: 'NodeList vs Array',
    text: 'querySelectorAll returns a NodeList, which looks like an array but lacks array methods (map, filter, reduce). Convert it with Array.from() or spread syntax. Also note: getElementsByClassName and getElementsByTagName return live HTMLCollections that update automatically when the DOM changes; querySelectorAll returns a static snapshot.',
    codeExample: `// NodeList — no map/filter/reduce!\nconst items = document.querySelectorAll('.item');\n// items.map(...)    ❌ TypeError\nitems.forEach(...)  // ✅ forEach works directly\n\n// Convert to Array for full methods\nconst arr = Array.from(items);\nconst texts = arr.map(el => el.textContent);\n\n// Spread also works\nconst arr2 = [...document.querySelectorAll('li')];\n\n// Live vs Static\nconst live   = document.getElementsByClassName('item'); // updates\nconst static_ = document.querySelectorAll('.item');     // snapshot`,
    language: 'javascript',
  },
  ```

- [x] **Step 3: Verify the file still compiles**

  ```bash
  npx tsc --noEmit 2>&1 | grep -v supabase
  ```

  Expected: no errors.

- [x] **Step 4: Commit**

  ```bash
  git add src/data/topics.ts
  git commit -m "feat: add steps 4-6 to webapi-dom (DOM interfaces, closest/matches, NodeList vs Array)"
  ```

---

## Chunk 3: EN locale entries

### Task 3: Add EN locale entries for css-tailwind (steps 4–8)

**Files:**
- Modify: `src/i18n/locales/en/topics-css.json`

- [x] **Step 1: Read current css-tailwind locale entry**

  Read `src/i18n/locales/en/topics-css.json` around line 886. Find `"css-tailwind" > "steps"` — currently has entries for animationSteps 0–3.

- [x] **Step 2: Add steps 4–8 to the steps array**

  In `src/i18n/locales/en/topics-css.json`, inside `"css-tailwind" > "steps"`, add these 5 objects after animationStep 3:

  ```json
  {
    "animationStep": 4,
    "heading": "Why CSS Frameworks?",
    "text": "Raw CSS has pain points: repetitive rules, naming conventions (BEM), and maintaining media queries across a large codebase. Utility-first frameworks solve this by applying single-purpose classes directly in HTML — no naming decisions, no context switching between files."
  },
  {
    "animationStep": 5,
    "heading": "Responsive Breakpoints",
    "text": "Tailwind is mobile-first. Unprefixed classes apply to all screen sizes; breakpoint prefixes apply from that width upward. Breakpoints: sm: 640px · md: 768px · lg: 1024px · xl: 1280px · 2xl: 1536px. Stack prefixes to build fully responsive layouts without writing a single media query."
  },
  {
    "animationStep": 6,
    "heading": "Dark Mode",
    "text": "Enable dark mode by adding darkMode: 'class' to tailwind.config.js. Then toggle the dark class on the <html> element (via JavaScript). Any class prefixed with dark: activates only when the dark class is present on a parent — letting you theme your entire app with a single toggle."
  },
  {
    "animationStep": 7,
    "heading": "Arbitrary Values",
    "text": "When you need an exact value outside the design system, use square bracket syntax. Works on any utility property: widths, colors, spacing, grid templates, even CSS calc() expressions. Use sparingly — prefer design tokens for consistency across the project."
  },
  {
    "animationStep": 8,
    "heading": "@layer & @apply",
    "text": "@layer organises your CSS into three buckets: base (global resets), components (reusable UI patterns), utilities (single-purpose custom classes). @apply lets you compose Tailwind utilities into a custom class — useful when a pattern repeats across many elements but you still want Tailwind's design tokens."
  }
  ```

- [x] **Step 3: Commit**

  ```bash
  git add src/i18n/locales/en/topics-css.json
  git commit -m "feat: add EN locale for css-tailwind steps 4-8"
  ```

---

### Task 4: Add EN locale entries for webapi-dom (steps 4–6)

**Files:**
- Modify: `src/i18n/locales/en/topics-other.json`

- [x] **Step 1: Read current webapi-dom locale entry**

  Read `src/i18n/locales/en/topics-other.json` around line 210. Find `"webapi-dom" > "steps"` — currently has entries for animationSteps 0–3.

- [x] **Step 2: Add steps 4–6 to the steps array**

  In `src/i18n/locales/en/topics-other.json`, inside `"webapi-dom" > "steps"`, add these 3 objects after animationStep 3:

  ```json
  {
    "animationStep": 4,
    "heading": "DOM Interfaces",
    "text": "The DOM is structured as a hierarchy of interfaces. Document is the entry point. Node is the base for all DOM nodes (elements, text, comments). Element extends Node and adds HTML-specific methods. Understanding this hierarchy explains which methods are available on which objects."
  },
  {
    "animationStep": 5,
    "heading": "Advanced Querying",
    "text": "Beyond querySelector, two traversal methods are especially useful: closest() walks up the ancestor chain and returns the first element matching a selector — perfect for event delegation. matches() checks whether an element matches a selector without traversing anywhere — useful in event handlers to filter targets."
  },
  {
    "animationStep": 6,
    "heading": "NodeList vs Array",
    "text": "querySelectorAll returns a NodeList, which looks like an array but lacks array methods (map, filter, reduce). Convert it with Array.from() or spread syntax. Also note: getElementsByClassName and getElementsByTagName return live HTMLCollections that update automatically when the DOM changes; querySelectorAll returns a static snapshot."
  }
  ```

- [x] **Step 3: Commit**

  ```bash
  git add src/i18n/locales/en/topics-other.json
  git commit -m "feat: add EN locale for webapi-dom steps 4-6"
  ```

---

## Chunk 4: DE locale entries

### Task 5: Add DE locale entries for css-tailwind (steps 4–8)

**Files:**
- Modify: `src/i18n/locales/de/topics-css.json`

- [x] **Step 1: Read current css-tailwind DE locale entry**

  Read `src/i18n/locales/de/topics-css.json`. Find `"css-tailwind" > "steps"` — confirm steps 0–3 exist.

- [x] **Step 2: Add steps 4–8 to DE steps array**

  In `src/i18n/locales/de/topics-css.json`, inside `"css-tailwind" > "steps"`, add:

  ```json
  {
    "animationStep": 4,
    "heading": "Warum CSS-Frameworks?",
    "text": "Reines CSS hat Schwächen: repetitive Regeln, Namenskonventionen (BEM) und die Pflege von Media Queries in großen Codebasen. Utility-first-Frameworks lösen dies, indem sie Single-Purpose-Klassen direkt im HTML anwenden — keine Benennungsentscheidungen, kein Kontextwechsel zwischen Dateien."
  },
  {
    "animationStep": 5,
    "heading": "Responsive Breakpoints",
    "text": "Tailwind ist Mobile-first. Klassen ohne Präfix gelten für alle Bildschirmgrößen; Breakpoint-Präfixe gelten ab dieser Breite aufwärts. Breakpoints: sm: 640px · md: 768px · lg: 1024px · xl: 1280px · 2xl: 1536px. Kombiniere Präfixe für vollständig responsive Layouts — ganz ohne Media Queries."
  },
  {
    "animationStep": 6,
    "heading": "Dark Mode",
    "text": "Aktiviere den Dark Mode, indem du darkMode: 'class' in tailwind.config.js setzt. Dann wird die Klasse dark am <html>-Element per JavaScript umgeschaltet. Jede Klasse mit dem Präfix dark: ist nur aktiv, wenn ein übergeordnetes Element die dark-Klasse trägt — so kannst du das gesamte Erscheinungsbild mit einem einzigen Schalter ändern."
  },
  {
    "animationStep": 7,
    "heading": "Beliebige Werte",
    "text": "Wenn du einen exakten Wert außerhalb des Design-Systems benötigst, nutze die eckige-Klammer-Syntax. Funktioniert mit jeder Utility-Eigenschaft: Breiten, Farben, Abstände, Grid-Templates, sogar CSS calc()-Ausdrücke. Sparsam einsetzen — bevorzuge Design-Tokens für konsistente Gestaltung."
  },
  {
    "animationStep": 8,
    "heading": "@layer & @apply",
    "text": "@layer teilt dein CSS in drei Ebenen auf: base (globale Resets), components (wiederverwendbare UI-Muster) und utilities (benutzerdefinierte Single-Purpose-Klassen). @apply ermöglicht es, Tailwind-Utilities in einer eigenen Klasse zusammenzufassen — nützlich, wenn sich ein Muster häufig wiederholt, aber die Design-Tokens erhalten bleiben sollen."
  }
  ```

- [x] **Step 3: Commit**

  ```bash
  git add src/i18n/locales/de/topics-css.json
  git commit -m "feat: add DE locale for css-tailwind steps 4-8"
  ```

---

### Task 6: Add DE locale entries for webapi-dom (steps 4–6)

**Files:**
- Modify: `src/i18n/locales/de/topics-other.json`

- [x] **Step 1: Read current webapi-dom DE locale entry**

  Read `src/i18n/locales/de/topics-other.json`. Find `"webapi-dom" > "steps"` — confirm steps 0–3 exist.

- [x] **Step 2: Add steps 4–6 to DE steps array**

  In `src/i18n/locales/de/topics-other.json`, inside `"webapi-dom" > "steps"`, add:

  ```json
  {
    "animationStep": 4,
    "heading": "DOM-Interfaces",
    "text": "Das DOM ist als Hierarchie von Interfaces aufgebaut. Document ist der Einstiegspunkt. Node ist die Basis für alle DOM-Knoten (Elemente, Text, Kommentare). Element erweitert Node und fügt HTML-spezifische Methoden hinzu. Dieses Hierarchieverständnis erklärt, welche Methoden auf welchen Objekten verfügbar sind."
  },
  {
    "animationStep": 5,
    "heading": "Erweiterte Abfragen",
    "text": "Neben querySelector sind zwei Traversal-Methoden besonders nützlich: closest() durchläuft die Vorfahrenkette nach oben und gibt das erste passende Element zurück — ideal für Event-Delegation. matches() prüft, ob ein Element einem Selektor entspricht — nützlich in Event-Handlern zum Filtern von Zielelementen."
  },
  {
    "animationStep": 6,
    "heading": "NodeList vs. Array",
    "text": "querySelectorAll gibt eine NodeList zurück, die einem Array ähnelt, aber keine Array-Methoden (map, filter, reduce) besitzt. Konvertiere sie mit Array.from() oder Spread-Syntax. Außerdem: getElementsByClassName und getElementsByTagName geben live HTMLCollections zurück, die sich automatisch aktualisieren; querySelectorAll gibt einen statischen Snapshot zurück."
  }
  ```

- [x] **Step 3: Commit**

  ```bash
  git add src/i18n/locales/de/topics-other.json
  git commit -m "feat: add DE locale for webapi-dom steps 4-6"
  ```

---

## Chunk 5: Final Verification

### Task 7: Final TypeScript check and dev verification

**Files:** None (verification only)

- [x] **Step 1: Full TypeScript check**

  ```bash
  npx tsc --noEmit 2>&1 | grep -v supabase
  ```

  Expected: no output (clean build).

- [x] **Step 2: Verify steps render in dev server**

  ```bash
  npm run dev
  ```

  Navigate to the `css-tailwind` topic page. Confirm explanation section now shows 9 steps (0–8), with the last step showing "@layer & @apply" content.

  Navigate to the `webapi-dom` topic page. Confirm explanation section now shows 7 steps (0–6), with the last step showing "NodeList vs Array" content.

- [x] **Step 3: Final commit if any fixes needed**

  ```bash
  git add -u
  git commit -m "fix: batch2 CSS+WebAPIs typescript fixes"
  ```
