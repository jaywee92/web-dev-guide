# Web APIs Section Overhaul — Design Spec

**Date:** 2026-03-26
**Status:** Approved

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
- `commonErrors` (3 items) per topic
- `realWorldExamples` (2 items) per topic
- `en/topics-other.json` and `de/topics-other.json` updated for all new steps

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
| `src/i18n/locales/en/topics-other.json` | New step entries + improved cheatSheet fields |
| `src/i18n/locales/de/topics-other.json` | German translations of all new content |

## DomViz Component

**File:** `src/topics/webapis/DomViz.tsx`
**Props:** `{ step: number; compact?: boolean }`
**Steps:** 9 total (0–8)

| Step | Title | Visual |
|---|---|---|
| 0 | DOM Tree aufbauen | HTML → animated node tree, nodes appear one by one |
| 1 | querySelector | Search beam through tree, matching node lights up green |
| 2 | createElement | Floating new node snaps into position in the tree |
| 3 | textContent & classList | Element box shows live update: text swap, class badge add/remove |
| 4 | DOM Interfaces | Inheritance hierarchy: Node → Element → HTMLElement → specific |
| 5 | closest() & matches() | Traversal upward — ancestors light up in sequence |
| 6 | NodeList vs Array | Two boxes side by side, Array.from() arrow connecting them |
| 7 *(new)* | classList deep-dive | 4 method badges animated: add / remove / toggle / contains |
| 8 *(new)* | data-* Attribute | HTML attribute left, dataset object right, access animated |

**Color scheme:** Blue = document/Node · Green = HTML elements · Yellow = text nodes · Green highlight = currently selected element

**Pattern:** Follows existing viz conventions — `const s = Math.min(step, 8)`, `panelW = compact ? 220 : 300`, `motion.div` with `AnimatePresence mode="wait"`.

## Topic Content Plan

### webapi-fetch

**Core analogy:** Ordering at a restaurant — place an order (request), kitchen prepares it (server), waiter brings it back (response). You never go into the kitchen yourself.

**Step analogies:**
- Step 0 — "Like sending a letter and waiting for a reply"
- Step 1 — "Restaurant receipt — you get a ticket immediately, food comes later"
- Step 2 — "A sealed envelope — you see sender and date before opening it"
- Step 3 — "Opening the envelope — `.json()` is unfolding the letter"
- Step 4 — "Instead of 'call me back when ready', you say 'I'll wait here'"
- Steps 5–7 — practical, short icon

**New steps:**
- Step 8: Error handling patterns — network error vs `res.ok` false (the most common conceptual mistake: fetch only rejects on network failure, not on 4xx/5xx)
- Step 9: AbortController — cancelling in-flight requests, cleanup in React useEffect

**commonErrors:**
1. Forgetting `await` on `res.json()` — common silent bug
2. Not checking `res.ok` — fetch resolves on 404/500, does not throw
3. Missing `Content-Type: application/json` header on POST with JSON body

**realWorldExamples:**
1. Fetching weather data from a public API — async component, error state, loading state
2. Submitting a contact form via POST — method, headers, body, redirect on success

---

### webapi-dom

**Core analogy:** The DOM is like a LEGO model built from HTML instructions — HTML is the instruction booklet, the DOM is the finished model you can take apart and reassemble at any time.

**Step analogies:**
- Step 0 — "Family tree — every element has parents, children, and siblings"
- Step 1 — "Ctrl+F in your browser — but returns the element, not a highlight"
- Step 2 — "Creating a LEGO brick — first make it, then snap it into place"
- Step 3 — "Editing a Word document — change text, add formatting, restyle"
- Step 4 — "Class hierarchy: every element inherits from Node, like every Animal is also a LivingThing"
- Step 5 — "Find the nearest ancestor who works in marketing"
- Step 6 — "Someone else's shopping list — you can read it but can't use all Array methods until you copy it"

**New steps:**
- Step 7: `classList` deep-dive — `add`, `remove`, `toggle`, `contains` with real examples; the methods used in 90% of DOM manipulation
- Step 8: `data-*` attributes — `data-user-id="42"` → `el.dataset.userId`; bridge between HTML and JS without class abuse

**commonErrors:**
1. Running `querySelector` before the DOM is loaded — script in `<head>` without `defer`
2. Using `innerHTML` instead of `textContent` — XSS vulnerability when inserting user content
3. Expecting `querySelectorAll` to return an Array — it returns a NodeList

**realWorldExamples:**
1. Dark mode toggle with `classList.toggle('dark')` — single button, body class
2. Rendering a list from data — `createElement` + `textContent` in a loop, `appendChild`

---

### webapi-events

**Core analogy:** Like a smoke detector — always listening, fires only when something specific happens.

**Step analogies:**
- Step 0 — "Smoke detector — passive, always on, reacts to a specific trigger"
- Step 1 — "Subscribing to a newsletter — sign up once, notified every time"
- Step 2 — "The event is a parcel with metadata — who sent it, when, from where"
- Step 3 — "Shouting in a building — the nearest person hears first, then it echoes upward"
- Step 4 — "Bouncer at the door — stops the default browser behavior before it happens"
- Step 5 — "One door, multiple cameras — each listener hears the same event independently"
- Step 6 — "Sorting station before a package reaches its final destination"

**New steps:**
- Step 7: Custom Events — `new CustomEvent('cart:add', { detail: { id } })` + `dispatchEvent`; component-to-component communication without a framework
- Step 8: Event Delegation deep-dive — attach one listener to the parent instead of N listeners to children; why it's better for dynamic content and performance

**commonErrors:**
1. Not removing event listeners — memory leak, especially in SPAs
2. Using an arrow function as listener when you need `removeEventListener` later — arrow functions can't be referenced for removal
3. `onClick={handleClick()}` — calling the function instead of passing it

**realWorldExamples:**
1. Form validation before submit — `preventDefault`, validate fields, show error messages
2. Keyboard shortcut handler — `keydown` on `document`, `event.key` check

---

### webapi-storage

**Core analogy:** Sticky note on your monitor (localStorage) vs whiteboard in a meeting room (sessionStorage) — one stays forever, the other is wiped when the meeting ends.

**Step analogies:**
- Step 0 — "Sticky note on the monitor — still there when you close your laptop"
- Step 1 — "Writing in a notebook — but everything must be a string, even numbers"
- Step 2 — "Looking something up in that notebook — returns null if the page is blank"
- Step 3 — "Unlike RAM, it survives a power cut — your notes are still there next morning"
- Step 4 — "Whiteboard in a meeting room — wiped clean when the meeting ends"
- Step 5 — "Two storage drawers: one in your office (permanent), one in the conference room (gone after the meeting)"
- Step 6 — full API reference

**New steps:**
- Step 7: Safe read with fallback — `JSON.parse` wrapped in `try/catch` with a typed default value; production-ready pattern
- Step 8: What NOT to store — passwords, auth tokens, sensitive PII; `httpOnly` cookies are the right tool for auth

**commonErrors:**
1. Storing sensitive data (passwords, tokens) in localStorage — accessible via XSS
2. `JSON.parse` without `try/catch` — throws on corrupted/invalid data
3. Not handling `QuotaExceededError` — storage is limited (~5MB)

**realWorldExamples:**
1. Saving user preferences (dark mode, language) — read on mount, write on change
2. Cart persistence — items survive page refresh; read on load, write on every cart mutation

## i18n

All new step `heading` + `text` entries added to:
- `src/i18n/locales/en/topics-other.json`
- `src/i18n/locales/de/topics-other.json`

Improved `whenToUse` and new `commonMistakes` entries in cheatSheet for all 4 topics in both languages.

## Success Criteria

- `webapi-dom` displays `DomViz` (not `DomEventsViz`)
- All 4 topics have `analogy` on every step
- All 4 topics have `commonErrors` and `realWorldExamples`
- TypeScript check passes (`npx tsc --noEmit`)
- EN and DE locale files have entries for all new steps
