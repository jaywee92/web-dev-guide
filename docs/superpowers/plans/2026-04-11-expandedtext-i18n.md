# expandedText i18n Implementation Plan

> ✅ **COMPLETED** — implemented and deployed to main

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate all 472 `expandedText` fields (the "Learn more" deeper explanations) into German so the app is fully localised when DE is active.

**Architecture:** `expandedText` lives in `topics.ts` (English baseline). The i18n merge hook (`src/i18n/hooks.ts`) already merges `heading`, `text`, and `analogy` from the DE JSON files — it just never included `expandedText`. The fix is: (1) add `expandedText` to the `StepTranslation` interface and the merge, (2) add German `expandedText` values to the four DE JSON translation files.

**Tech Stack:** TypeScript (hooks.ts interface + merge), JSON (i18n locale files), Python (data-generation scripts already established in this project)

---

## File map

| File | Change |
|---|---|
| `src/i18n/hooks.ts` | Add `expandedText?: string` to `StepTranslation`; merge it in `useTopic` + `useTopics` |
| `src/i18n/locales/de/topics-js.json` | Add `expandedText` to 77 step objects across 13 topics |
| `src/i18n/locales/de/topics-css.json` | Add `expandedText` to 78 step objects across 19 topics |
| `src/i18n/locales/de/topics-html.json` | Add `expandedText` to 37 step objects across 6 topics |
| `src/i18n/locales/de/topics-other.json` | Add `expandedText` to 280 step objects across 51 topics |

EN files are intentionally **not** changed — EN falls back to `topics.ts` baseline which is already English.

---

## Task 1: Wire expandedText into the i18n merge hook

**Files:**
- Modify: `src/i18n/hooks.ts`

- [x] **Step 1: Add expandedText to StepTranslation interface**

In `src/i18n/hooks.ts`, update the `StepTranslation` interface (currently line 63–68):

```ts
interface StepTranslation {
  animationStep: number
  heading: string
  text: string
  expandedText?: string                                    // ← add this
  analogy?: { title: string; text: string[] }
}
```

- [x] **Step 2: Merge expandedText in useTopic**

In the `useTopic` function (step merge, currently lines 125–135), add `expandedText`:

```ts
return {
  ...step,
  heading:      txStep?.heading      ?? step.heading,
  text:         txStep?.text         ?? step.text,
  expandedText: txStep?.expandedText ?? step.expandedText,   // ← add this
  analogy: step.analogy && txAnalogy
    ? { ...step.analogy, title: txAnalogy.title, text: txAnalogy.text }
    : step.analogy,
}
```

- [x] **Step 3: Merge expandedText in useTopics**

Same change in the `useTopics` function (same pattern, currently lines 188–198):

```ts
return {
  ...step,
  heading:      txStep?.heading      ?? step.heading,
  text:         txStep?.text         ?? step.text,
  expandedText: txStep?.expandedText ?? step.expandedText,   // ← add this
  analogy: step.analogy && txAnalogy
    ? { ...step.analogy, title: txAnalogy.title, text: txAnalogy.text }
    : step.analogy,
}
```

- [x] **Step 4: Verify TypeScript compiles clean**

```bash
npx tsc --noEmit
```
Expected: no output (0 errors).

- [x] **Step 5: Commit**

```bash
git add src/i18n/hooks.ts
git commit -m "feat: wire expandedText into i18n merge hook (DE support)"
```

---

## Task 2: DE translations — topics-js (77 fields, 13 topics)

**Files:**
- Modify: `src/i18n/locales/de/topics-js.json`

Topics and step counts:
- `js-variables` (8), `js-arrays` (13), `js-functions` (6), `js-control-flow` (5)
- `js-destructuring` (4), `js-oop` (5), `js-timers` (3), `js-event-loop` (8)
- `js-closures` (5), `js-promises` (4), `js-modules` (4), `js-npm-bundlers` (5), `js-vs-python` (7)

- [x] **Step 1: Extract source expandedText for all JS topics**

```bash
python3 - << 'EOF'
import re, json

with open('src/data/topics.ts') as f:
    content = f.read()

topic_matches = list(re.finditer(r"^  \{\n    id: '([^']+)'", content, re.MULTILINE))
js_ids = ['js-variables','js-arrays','js-functions','js-control-flow','js-destructuring',
          'js-oop','js-timers','js-event-loop','js-closures','js-promises',
          'js-modules','js-npm-bundlers','js-vs-python']

for i, tm in enumerate(topic_matches):
    tid = tm.group(1)
    if tid not in js_ids:
        continue
    t_start = tm.start()
    t_end = topic_matches[i+1].start() if i+1 < len(topic_matches) else len(content)
    t_block = content[t_start:t_end]
    expl_m = re.search(r"type: 'explanation'.*?steps: \[(.*?)\]\s*\}", t_block, re.DOTALL)
    if not expl_m:
        continue
    expl = expl_m.group(1)
    steps = re.findall(
        r"animationStep:\s*(\d+).*?heading:\s*'([^']+)'.*?expandedText:\s*'((?:[^'\\]|\\.)*)'",
        expl, re.DOTALL
    )
    print(f"\n=== {tid} ===")
    for num, heading, text in steps:
        print(f"[{num}] {heading}")
        print(repr(text.replace('\\n', '\n').replace("\\'", "'"))[:200])
EOF
```

- [x] **Step 2: Write a Python update script with all German translations and run it**

Create and run a script that loads `src/i18n/locales/de/topics-js.json`, adds `expandedText` to each matching step, and writes it back. Pattern from previous sessions:

```python
import json, re

EXPANDED = {
  # ('topic-id', animationStep): 'German text...'
  # --- js-variables ---
  ('js-variables', 0): '`var` ist **funktionsgebunden**: Es „leckt" aus `if`-Blöcken und `for`-Schleifen in die nächste umgebende Funktion. Der Interpreter **hoistet** `var`-Deklarationen an den Anfang der Funktion und initialisiert sie mit `undefined` — das Lesen einer `var` vor ihrer Zeile ergibt lautlos `undefined` statt eines Fehlers.',
  # ... (alle 77 Felder)
}

with open('src/i18n/locales/de/topics-js.json') as f:
    data = json.load(f)

for tid, entry in data.items():
    for step in entry.get('steps', []):
        key = (tid, step['animationStep'])
        if key in EXPANDED:
            step['expandedText'] = EXPANDED[key]

with open('src/i18n/locales/de/topics-js.json', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')
```

- [x] **Step 3: Verify all 77 expandedText present**

```bash
python3 -c "
import json
with open('src/i18n/locales/de/topics-js.json') as f: d = json.load(f)
count = sum(1 for t in d.values() for s in t.get('steps',[]) if 'expandedText' in s)
print(f'expandedText in topics-js DE: {count}/77')
"
```

Expected: `expandedText in topics-js DE: 77/77`

- [x] **Step 4: Commit**

```bash
git add src/i18n/locales/de/topics-js.json
git commit -m "feat: add DE expandedText translations for JS topics (77 fields)"
```

---

## Task 3: DE translations — topics-css (78 fields, 19 topics)

**Files:**
- Modify: `src/i18n/locales/de/topics-css.json`

Topics and step counts:
- `css-basics` (5), `css-box-model` (4), `css-flexbox` (2), `css-grid` (2)
- `css-selectors` (6), `css-colors-units` (2), `css-typography` (5), `css-shadows` (5)
- `css-overflow` (4), `css-responsive` (5), `css-images` (3), `css-custom-properties` (5)
- `css-variables-theming` (3), `css-transforms` (5), `css-transitions` (6), `css-animations` (6)
- `css-tailwind` (5), `css-tailwind-layout` (4), `css-tailwind-states` (1)

- [x] **Step 1: Extract source expandedText for all CSS topics** (same pattern as Task 2 Step 1)

- [x] **Step 2: Write and run DE update script for topics-css.json** (same pattern as Task 2 Step 2)

- [x] **Step 3: Verify all 78 expandedText present**

```bash
python3 -c "
import json
with open('src/i18n/locales/de/topics-css.json') as f: d = json.load(f)
count = sum(1 for t in d.values() for s in t.get('steps',[]) if 'expandedText' in s)
print(f'expandedText in topics-css DE: {count}/78')
"
```

- [x] **Step 4: Commit**

```bash
git add src/i18n/locales/de/topics-css.json
git commit -m "feat: add DE expandedText translations for CSS topics (78 fields)"
```

---

## Task 4: DE translations — topics-html (37 fields, 6 topics)

**Files:**
- Modify: `src/i18n/locales/de/topics-html.json`

Topics and step counts:
- `html-basics` (7), `html-text` (7), `html-links-images` (7), `html-lists` (7)
- `html-semantic` (6), `html-accessibility` (3)

- [x] **Step 1: Extract + translate + write for topics-html.json** (same pattern)

- [x] **Step 2: Verify all 37 expandedText present**

```bash
python3 -c "
import json
with open('src/i18n/locales/de/topics-html.json') as f: d = json.load(f)
count = sum(1 for t in d.values() for s in t.get('steps',[]) if 'expandedText' in s)
print(f'expandedText in topics-html DE: {count}/37')
"
```

- [x] **Step 3: Commit**

```bash
git add src/i18n/locales/de/topics-html.json
git commit -m "feat: add DE expandedText translations for HTML topics (37 fields)"
```

---

## Task 5: DE translations — topics-other part A: HTTP + DB + WebAPI (51 fields)

**Files:**
- Modify: `src/i18n/locales/de/topics-other.json`

Topics in this batch:
- `http-request-cycle` (5), `http-rest` (4), `http-ssr-csr` (3), `http-status` (5)
- `db-intro` (5), `postgres-queries` (10), `postgres-joins` (5), `postgres-crud` (5)
- `webapi-dom` (9), `webapi-fetch` (10), `webapi-events` (9), `webapi-storage` (9)

- [x] **Step 1: Extract + translate + write for topics-other.json** (HTTP+DB+WebAPI keys only)
- [x] **Step 2: Verify step count for these topics**
- [x] **Step 3: Commit**

```bash
git add src/i18n/locales/de/topics-other.json
git commit -m "feat: add DE expandedText translations for HTTP/DB/WebAPI topics (51 fields)"
```

---

## Task 6: DE translations — topics-other part B: TypeScript (43 fields)

Topics: `ts-basics` (6), `ts-interfaces` (5), `ts-generics` (5), `ts-narrowing` (6), `ts-utility-types` (4), `ts-arrays` (4), `ts-classes` (5), `ts-enums` (4), `ts-type-assertion` (3), `ts-react` (6)

- [x] **Step 1: Extract + translate + write for topics-other.json** (TS keys)
- [x] **Step 2: Verify step count**
- [x] **Step 3: Commit**

```bash
git commit -m "feat: add DE expandedText translations for TypeScript topics (43 fields)"
```

---

## Task 7: DE translations — topics-other part C: React + Next.js (93 fields)

Topics:
- `react-intro` (5), `react-components` (8), `react-state` (8), `react-useeffect` (7)
- `react-router` (7), `react-context` (6), `react-router-advanced` (7), `react-data-fetching` (5)
- `react-mutations` (6), `react-tanstack-query` (6)
- `nextjs-basics` (6), `nextjs-routing` (4), `nextjs-layouts` (4), `nextjs-navigation` (4)
- `nextjs-server-components` (4), `nextjs-client-components` (4), `nextjs-suspense` (3)
- `nextjs-data-fetching` (4), `nextjs-server-actions` (4), `nextjs-route-handlers` (3)

- [x] **Step 1: Extract + translate + write for topics-other.json** (React+Next.js keys)
- [x] **Step 2: Verify step count**
- [x] **Step 3: Commit**

```bash
git commit -m "feat: add DE expandedText translations for React/Next.js topics (93 fields)"
```

---

## Task 8: DE translations — topics-other part D: Git + Testing (46 fields)

Topics:
- `git-intro` (5), `git-workflow` (5), `git-gitignore` (4), `git-github` (4)
- `git-collab-setup` (4), `git-merge-conflicts` (4), `git-undo-stash` (4)
- `testing-basics` (5), `testing-react` (5), `testing-ci` (4)
- `ts-zod` (4) ← in topics-other

- [x] **Step 1: Extract + translate + write for topics-other.json** (Git+Testing+Zod keys)
- [x] **Step 2: Verify all 280 fields for topics-other total**

```bash
python3 -c "
import json
with open('src/i18n/locales/de/topics-other.json') as f: d = json.load(f)
count = sum(1 for t in d.values() for s in t.get('steps',[]) if 'expandedText' in s)
print(f'expandedText in topics-other DE: {count}/280')
"
```

- [x] **Step 3: Commit**

```bash
git commit -m "feat: add DE expandedText translations for Git/Testing topics (46 fields)"
```

---

## Task 9: Final verification + push

- [x] **Step 1: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: no output.

- [x] **Step 2: Full coverage check**

```bash
python3 - << 'EOF'
import json

total = 0
for path in [
    'src/i18n/locales/de/topics-js.json',
    'src/i18n/locales/de/topics-css.json',
    'src/i18n/locales/de/topics-html.json',
    'src/i18n/locales/de/topics-other.json',
]:
    with open(path) as f: d = json.load(f)
    count = sum(1 for t in d.values() for s in t.get('steps',[]) if 'expandedText' in s)
    total += count
    print(f"{path.split('/')[-1]}: {count}")
print(f"Total: {total}/472")
EOF
```
Expected: `Total: 472/472`

- [x] **Step 3: Push**

```bash
git push
```
