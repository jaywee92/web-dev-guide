# Web APIs Section Overhaul — Design Spec

**Date:** 2026-03-26

## Overview

Improve the Web APIs section of the web-dev-guide to lower the barrier of entry for learners who know JavaScript basics but have never used browser APIs. The two identified pain points are:

- **DOM concept** — learners cannot visualize HTML as a manipulable object tree
- **"When to use what"** — learners don't know which API to reach for which problem

The approach mirrors what was done for the JavaScript and HTML sections: add analogies to every step, add two new steps per topic, add `commonErrors` and `realWorldExamples`, and fix the structural gap in `webapi-dom` which currently has no dedicated viz.

## Target Learner

Level B: knows JavaScript basics (variables, functions, arrays, control flow) but has not yet used `fetch()`, `document.querySelector`, or any browser API in a real project.

## Scope

### In scope

- New `DomViz.tsx` animation component for `webapi-dom`
- Analogies on every step for all 4 topics
- 2 new steps per topic
- `commonErrors` (3 items per topic, with all required fields)
- `realWorldExamples` (2 items per topic, with all required fields)
- `en/topics-other.json` and `de/topics-other.json` updated for all new steps (append only — existing `animationStep` entries unchanged)

### Out of scope

- No new overview/navigation topic
- No changes to `FetchViz`, `DomEventsViz`, or `StorageViz`
- No structural changes to categories or routing

## Files Changed

| File | Change |
|---|---|
| `src/topics/webapis/DomViz.tsx` | New file — 9-step DOM tree animation |
| `src/topics/registry.ts` | Register `DomViz` in `lazyRegistry` |
| `src/data/topics.ts` | Analogies, new steps, commonErrors, realWorldExamples for all 4 topics; `webapi-dom` animationComponent → `DomViz` |
| `src/i18n/locales/en/topics-other.json` | Append new step entries (animationStep 7 and 8) + improved cheatSheet fields |
| `src/i18n/locales/de/topics-other.json` | German translations of all new content, same append strategy |

## DomViz Component

**File:** `src/topics/webapis/DomViz.tsx`
**Props:** `{ step: number; compact?: boolean }`
**Steps:** 9 total (0–8)

| Step | English Title | Visual |
|---|---|---|
| 0 | DOM Tree Structure | HTML → animated node tree, nodes appear one by one |
| 1 | Selecting Elements | Search beam through tree, matching node lights up with cyan highlight (distinct from base green) |
| 2 | Creating Elements | Floating new node snaps into position in the tree |
| 3 | Reading & Changing Properties | Element box shows live update: text swap, class badge add/remove |
| 4 | DOM Interfaces | Inheritance hierarchy: Node → Element → HTMLElement → specific |
| 5 | closest() & matches() | Traversal upward — ancestors light up in sequence |
| 6 | NodeList vs Array | Two boxes side by side, Array.from() arrow connecting them |
| 7 *(new)* | classList Advanced | `toggle(class, force)`, `replace(old, new)`, multiple classes — the 4 methods live |
| 8 *(new)* | data-* Attributes | HTML attribute left, dataset object right, access animated |

**Color scheme:** Blue = document/Node · Green = HTML elements · Yellow = text nodes · **Cyan (#67e8f9) = selected/highlighted element** (distinct from base green)

**Pattern:** Follows existing viz conventions — `const s = Math.min(step, 8)`, `panelW = compact ? 220 : 300`, `motion.div` with `AnimatePresence mode="wait"`.

**Note on step 7 vs step 3:** Step 3 covers `textContent` and basic `classList.add/remove`. Step 7 focuses on `classList.toggle(class, force)`, `classList.replace(oldClass, newClass)`, and passing multiple class names — the advanced usage not covered in step 3.

## Topic Content Plan

### webapi-fetch

**Core analogy:** Ordering at a restaurant — place an order (request), kitchen prepares it (server), waiter brings it back (response). You never go into the kitchen yourself.

**Step analogies (all 10 steps):**
- Step 0 — "Like sending a letter and waiting for a reply"
- Step 1 — "Restaurant receipt — you get a ticket immediately, food comes later"
- Step 2 — "A sealed envelope — you see sender and date before opening it"
- Step 3 — "Opening the envelope — `.json()` is unfolding the letter"
- Step 4 — "Instead of 'call me back when ready', you say 'I'll wait here'"
- Step 5 — "The recipe says 'check the dish is cooked' before you serve — always check `res.ok`"
- Step 6 — "Sending a package with a label, contents, and a return address"
- Step 7 — "REST is like a filing cabinet with standard drawer labels: GET = read, POST = add, PUT = replace, DELETE = remove"
- Step 8 *(new)* — "Two types of failure: the delivery truck broke down (network error) vs the package was refused at the door (4xx/5xx)"
- Step 9 *(new)* — "AbortController is a cancel button — you hand it to fetch, press it anytime"

**New steps:**
- Step 8: Error handling patterns — network error vs `res.ok` false. `fetch()` only rejects on network failure. A 404 or 500 still resolves — `res.ok` is the gate. Show both cases and their fixes.
- Step 9: AbortController — `const controller = new AbortController()`, pass `signal` to fetch, call `controller.abort()`. Cleanup in React `useEffect` return.

**commonErrors** (type: `CommonError` — fields: `title`, `why`, `fixLabel`, `fixCode`):
1. `title`: "Forgetting await on res.json()" · `why`: "`res.json()` returns a Promise. Without `await`, you get a Promise object, not the data." · `fixLabel`: "Always await res.json()" · `fixCode`: `const data = await res.json()`
2. `title`: "Not checking res.ok" · `why`: "fetch() does not throw on 4xx or 5xx — it resolves. Only network failures reject." · `fixLabel`: "Guard with res.ok" · `fixCode`: `if (!res.ok) throw new Error(res.statusText)`
3. `title`: "Missing Content-Type on POST" · `why`: "Without the header, the server may not parse the body correctly." · `fixLabel`: "Set the header explicitly" · `fixCode`: `headers: { 'Content-Type': 'application/json' }`

**realWorldExamples** (type: `RealWorldExample` — fields: `context`, `heading`, `description`, `code`):
1. `context`: "Weather dashboard" · `heading`: "Fetch weather data from a public API" · `description`: "Async data fetch with loading state, error state, and res.ok guard" · `code`: async function with try/catch, loading flag, res.ok check, state update
2. `context`: "Contact page" · `heading`: "Submit a form via POST" · `description`: "Collect form data, POST as JSON, handle success and error responses" · `code`: fetch with method POST, headers, JSON.stringify body, res.ok check

---

### webapi-dom

**Core analogy:** The DOM is like a LEGO model built from HTML instructions — HTML is the instruction booklet, the DOM is the finished model you can take apart and reassemble at any time.

**Step analogies (all 9 steps):**
- Step 0 — "Family tree — every element has parents, children, and siblings"
- Step 1 — "Ctrl+F in your browser — but returns the element, not a highlight"
- Step 2 — "Creating a LEGO brick — first make it, then snap it into place"
- Step 3 — "Editing a Word document — change text, add formatting, restyle"
- Step 4 — "Class hierarchy: every element inherits from Node, like every Animal is also a LivingThing"
- Step 5 — "Find the nearest ancestor who works in marketing"
- Step 6 — "Someone else's shopping list — you can read it but can't use all Array methods until you copy it"
- Step 7 *(new)* — "classList is a remote control for CSS classes — toggle flips the switch, replace swaps channels"
- Step 8 *(new)* — "data attributes are sticky notes attached directly to HTML elements — JavaScript reads them via dataset"

**New steps:**
- Step 7: `classList` advanced methods — `toggle(class, force)` (force parameter makes it one-directional), `replace(oldClass, newClass)` (atomic swap), passing multiple classes in modern browsers. Distinct from step 3 which covers basic `add`/`remove`/`toggle` without force.
- Step 8: `data-*` attributes — `data-user-id="42"` → `el.dataset.userId`. The naming convention (kebab → camelCase). Setting via `el.dataset.key = value`. Use case: storing state in HTML without misusing class names.

**commonErrors** (type: `CommonError`):
1. `title`: "querySelector runs before DOM is loaded" · `why`: "Script in `<head>` runs before the browser has parsed the body. querySelector returns null." · `fixLabel`: "Add defer to your script tag" · `fixCode`: `<script src="app.js" defer></script>`
2. `title`: "innerHTML with user content" · `why`: "innerHTML parses the string as HTML — user input can inject scripts (XSS)." · `fixLabel`: "Use textContent for text" · `fixCode`: `el.textContent = userInput`
3. `title`: "Treating NodeList as an Array" · `why`: "`querySelectorAll` returns a NodeList, not an Array. `.map()`, `.filter()` etc. don't exist on it." · `fixLabel`: "Convert with Array.from()" · `fixCode`: `const items = Array.from(document.querySelectorAll('li'))`

**realWorldExamples** (type: `RealWorldExample`):
1. `context`: "Settings page" · `heading`: "Dark mode toggle" · `description`: "Single button that toggles a CSS class on `document.body` to switch themes. Reads current state with classList.contains." · `code`: `document.body.classList.toggle('dark')` with button click listener
2. `context`: "Todo app" · `heading`: "Render a list from data" · `description`: "Loop over an array, create a `<li>` for each item with createElement and textContent, append to a `<ul>`." · `code`: data.forEach loop with createElement, textContent, appendChild

---

### webapi-events

**Core analogy:** Like a smoke detector — always listening, fires only when something specific happens.

**Step analogies (all 9 steps):**
- Step 0 — "Smoke detector — passive, always on, reacts to a specific trigger"
- Step 1 — "Subscribing to a newsletter — sign up once, notified every time"
- Step 2 — "The event is a parcel with metadata — who sent it, when, from where"
- Step 3 — "Shouting in a building — the nearest person hears first, then it echoes upward"
- Step 4 — "Bouncer at the door — stops the default browser behavior before it happens"
- Step 5 — "One door, multiple cameras — each listener hears the same event independently"
- Step 6 — "Sorting station before a package reaches its final destination"
- Step 7 *(new)* — "Custom events are walkie-talkies — one component broadcasts, others listen without being wired together"
- Step 8 *(new)* — "Event delegation is hiring one receptionist for the whole building instead of one per floor"

**New steps:**
- Step 7: Custom Events — `new CustomEvent('cart:add', { detail: { id, qty } })` + `dispatchEvent`. Listening with `addEventListener('cart:add', handler)`. When to use: cross-component communication in vanilla JS without a framework.
- Step 8: Event Delegation — single listener on a parent element, use `event.target.closest('[data-action]')` to identify which child was clicked. Why: dynamic content (elements added after page load), performance (one listener vs N).

**commonErrors** (type: `CommonError`):

Note: The `commonErrors` array is a separate field from `cheatSheet.commonMistakes`. They coexist — `cheatSheet.commonMistakes` are brief one-liners in the cheat sheet panel; `commonErrors` are full entries with fix code in the Common Errors panel. Content may overlap in theme but should not be verbatim copies.

1. `title`: "Event listener not removed on cleanup" · `why`: "In SPAs, components unmount but listeners remain attached — the callback still fires and may reference stale state." · `fixLabel`: "Remove listener on cleanup" · `fixCode`: `return () => el.removeEventListener('click', handler)`
2. `title`: "Arrow function prevents removeEventListener" · `why`: "Arrow functions create a new reference each time. `removeEventListener` needs the exact same function reference." · `fixLabel`: "Store the handler in a variable" · `fixCode`: `const handler = () => {}; el.addEventListener('click', handler); el.removeEventListener('click', handler)`
3. `title`: "Calling the handler instead of passing it" · `why`: "`onClick={handleClick()}` calls the function immediately and passes its return value. `onClick={handleClick}` passes the function." · `fixLabel`: "Pass the function reference" · `fixCode`: `button.addEventListener('click', handleClick)`

**realWorldExamples** (type: `RealWorldExample`):
1. `context`: "Registration form" · `heading`: "Validate a form before submit" · `description`: "Attach a submit listener, call preventDefault, check required fields, show error messages on failure." · `code`: addEventListener submit, e.preventDefault(), field checks, conditional error display
2. `context`: "Productivity app" · `heading`: "Global keyboard shortcut" · `description`: "Listen for keydown on document. Match `event.key` and `event.metaKey`/`event.ctrlKey` to trigger an action." · `code`: `document.addEventListener('keydown', e => { if (e.key === 'k' && e.metaKey) openSearch() })`

---

### webapi-storage

**Core analogy:** Sticky note on your monitor (localStorage) vs whiteboard in a meeting room (sessionStorage) — one stays forever, the other is wiped when the meeting ends.

**Step analogies (all 9 steps):**
- Step 0 — "Sticky note on the monitor — still there when you close your laptop"
- Step 1 — "Writing in a notebook — but everything must be a string, even numbers"
- Step 2 — "Looking something up in that notebook — returns null if the page is blank"
- Step 3 — "Unlike RAM, it survives a power cut — your notes are still there next morning"
- Step 4 — "Whiteboard in a meeting room — wiped clean when the meeting ends"
- Step 5 — "Two storage drawers: one in your office (permanent), one in the conference room (gone after the meeting)"
- Step 6 — "The full keycard — all four methods in one place"
- Step 7 *(new)* — "JSON.parse without a safety net — one bad read and your app crashes"
- Step 8 *(new)* — "Leaving your house keys under the doormat — localStorage is readable by any script on the page"

**New steps:**
- Step 7: Safe read with fallback — `JSON.parse` in a `try/catch` with a typed default value. Pattern: `function getStored<T>(key: string, fallback: T): T`. Real scenario: corrupted data, missing key, null from first load.
- Step 8: What NOT to store — passwords, auth tokens, session IDs, sensitive PII. Why: any XSS vulnerability exposes all localStorage. Rule: if it grants access, use `httpOnly` cookies instead.

**commonErrors** (type: `CommonError`):
1. `title`: "Storing auth tokens in localStorage" · `why`: "localStorage is readable by any JavaScript on the page. An XSS attack extracts it instantly." · `fixLabel`: "Use httpOnly cookies for auth" · `fixCode`: `// Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict`
2. `title`: "JSON.parse without try/catch" · `why`: "Corrupted data, manual edits, or a previous bug can leave invalid JSON. `JSON.parse` throws a SyntaxError." · `fixLabel`: "Wrap in try/catch with a fallback" · `fixCode`: `try { return JSON.parse(stored) } catch { return fallback }`
3. `title`: "Ignoring QuotaExceededError" · `why`: "Browsers limit localStorage to ~5MB. Writing beyond the limit throws synchronously." · `fixLabel`: "Catch the error on setItem" · `fixCode`: `try { localStorage.setItem(key, val) } catch (e) { console.warn('Storage full', e) }`

**realWorldExamples** (type: `RealWorldExample`):
1. `context`: "App settings" · `heading`: "Persist user preferences" · `description`: "Read dark mode preference on app load, apply CSS class. Write on toggle. Use safe JSON read with fallback to default." · `code`: read with fallback on mount, write on change with JSON.stringify
2. `context`: "E-commerce" · `heading`: "Cart that survives page refresh" · `description`: "Load cart from localStorage on mount. Write updated cart on every add/remove. Parse with try/catch, default to empty array." · `code`: JSON.parse with try/catch on load, JSON.stringify on every mutation

## i18n Strategy

- **Append only** — new `animationStep: 7` and `animationStep: 8` objects are appended to the existing `steps` arrays in each topic entry
- Existing `animationStep` 0–6 entries are not modified unless improving `whenToUse` or adding `commonMistakes`
- German file mirrors all structural additions with translated `heading` and `text` values

## Success Criteria

- `webapi-dom` displays `DomViz` (not `DomEventsViz`)
- All 4 topics have `analogy` on every step
- All 4 topics have `commonErrors` with `title`, `why`, `fixLabel`, `fixCode` on each entry
- All 4 topics have `realWorldExamples` with `context`, `heading`, `description`, `code` on each entry
- TypeScript check passes (`npx tsc --noEmit`)
- EN and DE locale files have `animationStep: 7` and `animationStep: 8` entries for all 4 topics
