# WBS Integration: Batch 1 — JavaScript Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Default & Rest Parameters step to `js-functions` topic (only remaining JS gap after audit — all other JS topics already fully populated).

**Architecture:** Edit `src/data/topics.ts` to add one explanation step (structural fields), then add the matching translatable entry to EN and DE locale JSON files. No new files, no new components.

**Tech Stack:** TypeScript, React, i18next. All text via i18n locale JSON; code examples in topics.ts only.

**Spec:** `docs/superpowers/specs/2026-03-15-wbs-curriculum-integration.md`

---

## Pre-flight Audit (READ FIRST)

Before implementing, verify the current step count in `js-functions` by reading `src/data/topics.ts` around line 2699. Current steps (0–4): function declarations, scope chain, higher-order functions, arrow functions, lexical this. Step 5 (Default & Rest Parameters) is missing — that is the only gap.

Also confirm: `js-variables` (line ~2365), `js-arrays` (line ~2551), `js-oop` (line ~2041), `js-modules` (line ~2864) are already fully populated and require no changes.

---

## Chunk 1: Add Step to js-functions

### Task 1: Add Default & Rest Parameters step to topics.ts

**Files:**
- Modify: `src/data/topics.ts` (around line 2751, after the last step of js-functions)

- [ ] **Step 1: Open topics.ts and find js-functions explanation steps**

  Read `src/data/topics.ts` lines 2699–2760 to find the explanation steps array for `js-functions`. Confirm the last step is `animationStep: 4` ("Lexical this in Arrow Functions").

- [ ] **Step 2: Add step 5 after animationStep 4**

  In `src/data/topics.ts`, inside the `js-functions` topic's `sections[1].steps` array (the explanation section), add this object after the last step (animationStep 4):

  ```typescript
  {
    animationStep: 5,
    icon: '🎛️',
    heading: 'Default & Rest Parameters',
    text: 'Default parameters provide a fallback value when an argument is omitted or undefined. Rest parameters collect all remaining arguments into an array — they must be last in the parameter list.',
    codeExample: `// Default parameter — fallback when arg is omitted\nfunction greet(name = 'World') {\n  return \`Hello, \${name}!\`;\n}\ngreet();        // "Hello, World!"\ngreet('Alice'); // "Hello, Alice!"\n\n// Rest parameters — collect remaining args as array\nfunction sum(...nums) {\n  return nums.reduce((total, n) => total + n, 0);\n}\nsum(1, 2, 3, 4); // 10`,
    language: 'javascript',
  },
  ```

- [ ] **Step 3: Verify the file still compiles**

  ```bash
  npx tsc --noEmit 2>&1 | grep -v supabase
  ```

  Expected: no errors (the supabase.ts ImportMeta error is pre-existing and unrelated).

- [ ] **Step 4: Commit**

  ```bash
  git add src/data/topics.ts
  git commit -m "feat: add Default & Rest Parameters step to js-functions"
  ```

---

### Task 2: Add EN locale entry

**Files:**
- Modify: `src/i18n/locales/en/topics-js.json`

- [ ] **Step 1: Read current js-functions locale entry**

  Read `src/i18n/locales/en/topics-js.json`. Find the `"js-functions"` key. Its `"steps"` array currently has entries for animationSteps 0–4.

- [ ] **Step 2: Add step 5 to the steps array**

  In `src/i18n/locales/en/topics-js.json`, inside `"js-functions" > "steps"`, add this object as the last element:

  ```json
  {
    "animationStep": 5,
    "heading": "Default & Rest Parameters",
    "text": "Default parameters provide a fallback value when an argument is omitted or undefined. Rest parameters collect all remaining arguments into an array — they must be last in the parameter list."
  }
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add src/i18n/locales/en/topics-js.json
  git commit -m "feat: add EN locale for js-functions step 5 (default & rest params)"
  ```

---

### Task 3: Add DE locale entry

**Files:**
- Modify: `src/i18n/locales/de/topics-js.json`

- [ ] **Step 1: Read current js-functions DE locale entry**

  Read `src/i18n/locales/de/topics-js.json`. Find `"js-functions" > "steps"`. Confirm steps 0–4 exist.

- [ ] **Step 2: Add step 5 to DE steps array**

  In `src/i18n/locales/de/topics-js.json`, inside `"js-functions" > "steps"`, add:

  ```json
  {
    "animationStep": 5,
    "heading": "Standard- & Rest-Parameter",
    "text": "Standardparameter bieten einen Fallback-Wert, wenn ein Argument fehlt oder undefined ist. Rest-Parameter sammeln alle verbleibenden Argumente in einem Array — sie müssen immer am Ende der Parameterliste stehen."
  }
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add src/i18n/locales/de/topics-js.json
  git commit -m "feat: add DE locale for js-functions step 5 (standard & rest parameter)"
  ```

---

### Task 4: Final TypeScript check

**Files:** None (verification only)

- [ ] **Step 1: Full TypeScript check**

  ```bash
  npx tsc --noEmit 2>&1 | grep -v supabase
  ```

  Expected: no output (clean build).

- [ ] **Step 2: Verify step renders in dev server**

  ```bash
  npm run dev
  ```

  Navigate to the `js-functions` topic page. Confirm the explanation section now shows 6 steps (0–5), with the last step showing "Default & Rest Parameters" content.

- [ ] **Step 3: Final commit if any fixes needed**

  ```bash
  git add -u
  git commit -m "fix: batch1 JS typescript fixes"
  ```
