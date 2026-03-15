# WBS Curriculum Integration — Design Spec

**Date:** 2026-03-15
**Status:** Approved

**Goal:** Integrate WBS Coding School curriculum materials into the Web Dev Visual Guide by deepening existing topics with new explanation steps and adding 3 new topics within existing categories — without adding new main categories or cluttering the home page.

**Source material:** `wbs-sources/JavaScript/`, `wbs-sources/Web APIs/`, `wbs-sources/JavaScript Modules/`, `wbs-sources/FigmaTailwindCSS/`, `wbs-sources/sql/`
(`wbs-sources/Web Development with Flask/` explicitly excluded — Flask is out of scope)

---

## Architecture

**No new infrastructure.** All changes use existing patterns:

- `src/data/topics.ts` — new explanation steps added to existing topics; 3 new topic entries
- `src/i18n/locales/en/topics-js.json` — EN content for JS changes
- `src/i18n/locales/en/topics-css.json` — EN content for CSS changes
- `src/i18n/locales/en/topics-other.json` — EN content for HTTP/DB changes
- `src/i18n/locales/de/topics-js.json` — DE translations for JS changes
- `src/i18n/locales/de/topics-css.json` — DE translations for CSS changes
- `src/i18n/locales/de/topics-other.json` — DE translations for HTTP/DB changes

**No new components. No new categories on the home page.**

---

## Delivery: 3 Independent Batches

Each batch is its own git branch, implemented and merged independently.

---

## Batch 1 — JavaScript

### Enrich: `js-variables` (+3 explanation steps)

**New Step: Data Types**
- 7 primitive types: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- `typeof` operator to inspect types at runtime
- Dynamic typing: variables can hold any type, can change

**New Step: Scope**
- Global scope, function scope, block scope
- `var` is function-scoped — leaks out of `if`/`for` blocks
- `let`/`const` respect block scope — preferred
- Temporal dead zone for `let`/`const` before declaration

**New Step: Hoisting**
- `var` declarations hoisted and initialized as `undefined`
- `let`/`const` hoisted but NOT initialized (temporal dead zone)
- Function declarations fully hoisted (callable before declaration)

**Cheat Sheet additions:** `typeof` results table, var vs let vs const scope comparison

---

### Enrich: `js-functions` (+3 explanation steps)

**New Step: Arrow Functions**
- Syntax: `(params) => expression` or `(params) => { statements }`
- Implicit return for single-expression body
- No own `this` — lexically inherits from surrounding context
- Do NOT use for object methods or constructors

**New Step: Default & Rest Parameters**
- Default: `function greet(name = 'World')` — fallback when argument omitted
- Rest: `function sum(...nums)` — collects all remaining args as array
- Spread `...arr` vs Rest `...nums`: spread expands, rest collects

**New Step: First-Class Functions**
- Functions are values: assignable to variables, passable as arguments, returnable
- Callback pattern: `arr.forEach(fn)` — passing function as argument
- Higher-order functions: functions that take or return other functions

**Cheat Sheet additions:** Arrow function syntax variants, rest/spread examples

---

### Enrich: `js-arrays` (+5 explanation steps)

**New Step: forEach & map**
- `forEach(fn)`: iterates for side effects, returns `undefined`
- `map(fn)`: transforms each element, returns new array of same length
- Rule: need a new array → use `map`; only side effects → use `forEach`

**New Step: filter & find**
- `filter(predicate)`: returns new array of all elements where predicate is true
- `find(predicate)`: returns first matching element, or `undefined`
- Both take a predicate function `(element) => boolean`

**New Step: some & every**
- `some(predicate)`: `true` if at least one element passes
- `every(predicate)`: `true` only if ALL elements pass
- Both short-circuit: stop iterating as soon as result is determined

**New Step: reduce**
- `reduce((accumulator, current) => newAcc, initialValue)`
- Accumulates all elements into a single value
- Use cases: sum, count, flatten array, group by key

**New Step: Method Chaining**
- `array.filter(...).map(...).reduce(...)` — each returns new array
- Readability pattern: one method per line with indentation
- Performance note: each method iterates the array once — avoid unnecessary chains

**Cheat Sheet additions:** All 7 iterator methods side-by-side (signature + return type + use case)

---

### Enrich: `js-oop` (+4 explanation steps)

**New Step: Constructor Functions**
- `function Person(name) { this.name = name }` — factory pattern
- `new` keyword: creates empty object, sets `this`, links prototype, returns object
- Convention: capitalize constructor names (`Person`, `Car`)

**New Step: Prototype Chain**
- Every object has a `[[Prototype]]` link to another object (or `null`)
- Property lookup: own properties first → prototype → prototype's prototype → `null`
- `Object.prototype` is the root of all chains
- `Object.create(proto)` for explicit prototype setting

**New Step: The `this` Keyword**
- Implicit binding: method call `obj.method()` → `this` = `obj`
- Explicit binding: `fn.call(ctx)`, `fn.apply(ctx)`, `fn.bind(ctx)`
- Arrow functions: no own `this` — use surrounding context's `this`
- `new` binding: `this` = the newly created object

**New Step: Classes (ES6+)**
- Syntactic sugar over prototype-based inheritance — same mechanism underneath
- `class Person { constructor(name) { this.name = name } }`
- `extends` for inheritance, `super()` to call parent constructor
- `static` methods belong to the class, not instances

**Cheat Sheet additions:** `this` binding rules table, prototype chain vs class syntax comparison

---

### Enrich: `js-modules` (+2 explanation steps)

**New Step: Module History**
- Pre-modules era: everything global, naming collisions, script order fragile
- CommonJS (2009): `module.exports` / `require()` — Node.js standard, synchronous
- AMD: async loading for browsers via `define()` / RequireJS — now obsolete
- ESM (ES2015): `import` / `export` — official standard, static analysis, tree-shakeable

**New Step: Named vs Default Exports**
- Named: `export const fn = ...` → `import { fn } from './module'` — multiple per file
- Default: `export default fn` → `import fn from './module'` — one per file, any name
- Re-exporting (barrel files): `export { fn } from './module'` for central index
- Prefer named exports: explicit, easier to refactor, better tree-shaking

---

### New Topic: `js-npm-bundlers`

**Category:** JavaScript (existing)
**Position:** After `js-modules`
**Title:** "npm & Bundlers"
**nextTopicId:** whatever `js-modules` currently points to

**Step 1 — The npm Registry**
- npm = Node Package Manager + registry of 2M+ open-source packages
- `npm install <pkg>`: downloads to `node_modules`, adds to `dependencies`
- `npm install -D <pkg>`: adds to `devDependencies` (build tools, testing)
- `npm uninstall <pkg>`, `npm run <script>`
- Evaluating packages: weekly downloads, last publish date, bundle size, security audits

**Step 2 — package.json & package-lock.json**
- `package.json`: project metadata + `scripts` + `dependencies` + `devDependencies`
- `package-lock.json`: exact versions for reproducible installs — commit this
- `node_modules`: never commit — always in `.gitignore`
- `npm ci`: clean install from lockfile (CI/CD use)

**Step 3 — What is Bundling?**
- Problem: 100 JS files = 100 HTTP requests in old browsers
- Bundler: resolves import graph, combines files, optimizes for production
- Tasks: dependency resolution, code splitting, asset handling, minification

**Step 4 — Bundlers Compared**
- **Webpack**: most mature, highly configurable, complex `webpack.config.js`
- **Rollup**: optimal for libraries, excellent tree-shaking, ESM-native
- **Parcel**: zero-config, auto dev server, great for beginners
- **Vite**: ESM-native dev server (instant HMR), Rollup for production builds

**Step 5 — Dev Server & Hot Module Replacement**
- Dev server serves unbundled files via native ESM — no full build needed
- HMR: replaces only changed module in browser without full page reload
- `npm run dev` vs `npm run build`: dev = fast iteration, build = optimized output

**Cheat Sheet:** npm commands table, bundler comparison table (config, speed, best for)

---

## Batch 2 — CSS + Web APIs

### Enrich: `css-tailwind` (+5 explanation steps)

**New Step: Why CSS Frameworks?**
- Raw CSS problems: repetitive rules, naming conventions (BEM), media query maintenance
- Utility-first approach: single-purpose classes applied directly in HTML
- Trade-offs: verbose markup vs. zero naming decisions, no context switching

**New Step: Responsive Breakpoints**
- Mobile-first: unprefixed class applies to all sizes; prefix applies from that breakpoint up
- Breakpoints: `sm:` 640px · `md:` 768px · `lg:` 1024px · `xl:` 1280px · `2xl:` 1536px
- Example: `class="text-sm md:text-base lg:text-xl font-medium"`

**New Step: Dark Mode**
- Add `darkMode: 'class'` to Tailwind config
- Toggle `dark` class on `<html>` element to activate dark variants
- `dark:` prefix: `class="bg-white dark:bg-gray-900 text-black dark:text-white"`

**New Step: Arbitrary Values**
- Escape hatch for exact values not in the design system
- Syntax: square brackets — `w-[347px]`, `bg-[#1da1f2]`, `mt-[calc(100vh-4rem)]`
- Works with any utility property
- Use sparingly — prefer design tokens for consistency

**New Step: @layer & @apply**
- `@layer base`: global HTML element defaults (typography, resets)
- `@layer components`: reusable component classes using `@apply`
- `@layer utilities`: custom single-purpose classes
- `@apply` example: `@apply flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500`

**Cheat Sheet additions:** Breakpoint reference table, dark mode pattern snippet, @apply example

---

### Enrich: `webapi-dom` (+3 explanation steps)

**New Step: DOM Interfaces**
- `Document`: entry point — `querySelector`, `getElementById`, `createElement`, `createTextNode`
- `Node`: base for all DOM nodes — `parentNode`, `childNodes`, `textContent`, `nodeType`
- `Element` extends `Node`: `getAttribute/setAttribute`, `classList`, `innerHTML`, `addEventListener`
- `NodeList`: array-like collection returned by `querySelectorAll`

**New Step: Advanced Querying**
- `getElementById(id)`: fastest, returns single element or `null`
- `querySelector(selector)`: first match for any CSS selector
- `querySelectorAll(selector)`: all matches as static `NodeList`
- `element.closest(selector)`: nearest ancestor matching selector (walks up the tree)
- `element.matches(selector)`: boolean — does this element match the selector?

**New Step: NodeList vs Array**
- `NodeList` is array-like but NOT an Array — no `map`, `filter`, `reduce` methods
- Convert to Array: `Array.from(nodeList)` or spread `[...nodeList]`
- Live NodeList (`getElementsBy*`): updates automatically when DOM changes
- Static NodeList (`querySelectorAll`): snapshot at time of call — does not update

**Cheat Sheet additions:** DOM interface hierarchy diagram, query method comparison table

---

## Batch 3 — HTTP + Databases

### New Topic: `db-intro`

**Category:** PostgreSQL/DB (existing)
**Position:** Before `postgres-queries` — new entry point for the DB category
**Title:** "Databases & SQL Intro"
**nextTopicId:** `postgres-queries`

**Step 1 — What is a Database?**
- Components: Data, Schema (structure definition), DBMS (software engine), Queries, Users
- Why not just files? Concurrent access, complex queries, referential integrity, transactions
- DBMS examples: PostgreSQL, MySQL, SQLite (relational); MongoDB, Redis (NoSQL)

**Step 2 — Relational Databases**
- Structure: tables (relations) with rows (records) and columns (typed attributes)
- Primary key: unique identifier per row (often `SERIAL` / `AUTO_INCREMENT`)
- ACID guarantees: Atomicity (all or nothing), Consistency (valid state always), Isolation (concurrent safe), Durability (committed = permanent)
- Strengths: data accuracy, normalization, complex JOIN queries, mature tooling

**Step 3 — NoSQL Databases**
- Document stores (MongoDB): JSON-like documents, flexible schema, nested data
- Key-Value (Redis): ultra-fast in-memory, ideal for caching and sessions
- Graph (Neo4j): nodes + edges, optimized for relationship-heavy queries
- Column-oriented (Cassandra): time-series, high write throughput, analytics
- Strengths: horizontal scaling, schema flexibility, specific workload performance

**Step 4 — SQL vs NoSQL: When to Use Which**
- Use SQL when: structured data with clear relationships, ACID required, complex queries/reporting
- Use NoSQL when: unstructured/variable data, massive horizontal scale, high write throughput
- Not either/or: many production systems use both (e.g., PostgreSQL + Redis cache)

**Step 5 — SQL Syntax Primer**
- `CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL)`
- Constraints: `PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `DEFAULT`, `FOREIGN KEY`
- Data types: `SERIAL`, `VARCHAR(n)`, `INT`, `BOOLEAN`, `TIMESTAMP`, `TEXT`, `DECIMAL`
- Bridges directly into `postgres-crud` next topic

**Cheat Sheet:** SQL vs NoSQL comparison table, ACID definitions, common SQL data types

---

### New Topic: `http-ssr-csr`

**Category:** HTTP (existing)
**Position:** After `http-rest`
**Title:** "SSR vs CSR"
**nextTopicId:** whatever `http-rest` currently points to

**Step 1 — Server-Side Rendering (SSR)**
- Server generates complete HTML per request, sends ready-to-display page
- Browser receives full markup — minimal JS needed to display content
- Examples: PHP, Django templates, Ruby on Rails, Next.js (pages router with `getServerSideProps`)
- Pros: fast first paint, excellent SEO, works without JS enabled
- Cons: full server hit per navigation, slower subsequent page transitions

**Step 2 — Client-Side Rendering (CSR)**
- Server sends minimal HTML shell + JS bundle
- Browser downloads JS, executes it, then renders the full UI
- Examples: Create React App, Vue SPA, Angular — any single-page application
- Pros: fast navigation after initial load, rich interactions, cheap static hosting
- Cons: slow initial load (JS must download + parse + execute), SEO requires extra config

**Step 3 — Direct Comparison**

| Metric | SSR | CSR |
|---|---|---|
| First Contentful Paint | Fast | Slow |
| SEO out of the box | Excellent | Needs config |
| Subsequent navigation | Full page reload | Instant (no server) |
| Server costs | Higher (compute per request) | Lower (static files) |
| Interactivity richness | Lower | Higher |
| JS required | No | Yes |

**Step 4 — Hybrid Approaches**
- **SSG (Static Site Generation)**: HTML pre-built at build time — fastest, no server (Astro, Next.js)
- **ISR (Incremental Static Regeneration)**: SSG pages rebuilt on demand or on schedule
- **Islands Architecture**: SSR shell with selective CSR hydration for interactive islands
- Modern meta-frameworks (Next.js, Nuxt, SvelteKit) let you choose SSR/CSR/SSG per route

**Cheat Sheet:** SSR vs CSR table, when to choose each, hybrid patterns overview

---

### Enrich: `postgres-queries` (+2 explanation steps)

**New Step: HAVING vs WHERE**
- `WHERE` filters individual rows **before** grouping
- `HAVING` filters groups **after** `GROUP BY` — can reference aggregate functions
- Rule of thumb: if your filter uses `COUNT`, `SUM`, `AVG` → use `HAVING`
- Example: `SELECT category, COUNT(*) FROM products GROUP BY category HAVING COUNT(*) > 5`

**New Step: Subqueries**
- Nested `SELECT` inside another query — evaluated first, result used by outer query
- Scalar subquery: returns single value — `WHERE price > (SELECT AVG(price) FROM products)`
- `IN` subquery: `WHERE id IN (SELECT user_id FROM orders WHERE total > 100)`
- Correlated subquery: references outer query columns — powerful but runs once per row

---

## i18n Requirements

All text content goes into locale files — no hardcoded strings in `topics.ts`:

| Batch | EN file | DE file |
|---|---|---|
| Batch 1 (JS) | `src/i18n/locales/en/topics-js.json` | `src/i18n/locales/de/topics-js.json` |
| Batch 2 (CSS + WebAPIs) | `src/i18n/locales/en/topics-css.json` + `topics-other.json` | same in `de/` |
| Batch 3 (HTTP + DB) | `src/i18n/locales/en/topics-other.json` | `src/i18n/locales/de/topics-other.json` |

**topics.ts structural requirements:** Each explanation step must be written in `topics.ts` with its full structural fields:
- `animationStep`: sequential index (0, 1, 2, …)
- `icon`: emoji string
- `codeExample`: code snippet string
- `language`: `'javascript'` | `'sql'` | `'html'` | `'css'` | `'bash'`

The locale JSON carries only `heading` and `text` per step — everything else lives in `topics.ts`. The `useTopic()` hook in `src/i18n/hooks.ts` merges locale text onto the structural base by index.

## categories.ts Changes

Three new topics must be registered in `src/data/categories.ts`:

**1. `js-npm-bundlers`** — add to `javascript-async` category:
- Insert into `topicIds` after `'js-modules'`
- `TOPIC_ICONS['js-npm-bundlers']` = `'Package'` (Lucide icon)
- `TOPIC_LABELS['js-npm-bundlers']` = `'npm & Bundlers'`

**2. `db-intro`** — add to `postgresql` category:
- Insert into `topicIds` at position 0 (before `'postgres-queries'`)
- `TOPIC_ICONS['db-intro']` = `'Database'` (Lucide icon)
- `TOPIC_LABELS['db-intro']` = `'Databases & SQL Intro'`

**3. `http-ssr-csr`** — add to `http` category:
- Insert into `topicIds` after `'http-rest'` (before `'http-status'`)
- `TOPIC_ICONS['http-ssr-csr']` = `'Monitor'` (Lucide icon)
- `TOPIC_LABELS['http-ssr-csr']` = `'SSR vs CSR'`

Also add entries for all 3 new topics to `src/i18n/locales/en/categories.json` and `src/i18n/locales/de/categories.json` under the `topicLabels` key:
```json
{
  "topicLabels": {
    "js-npm-bundlers": "npm & Bundlers",
    "db-intro": "Databases & SQL Intro",
    "http-ssr-csr": "SSR vs CSR"
  }
}
```
DE equivalents: `"npm & Bundler"`, `"Datenbanken & SQL Intro"`, `"SSR vs CSR"` (unchanged).

## nextTopicId Chains

- `js-modules` → **`js-npm-bundlers`** → `null` (end of javascript-async category)
- **`db-intro`** → `postgres-queries` (db-intro is the new entry point; postgres-queries is second)
- `http-rest` → **`http-ssr-csr`** → `http-status` (http-ssr-csr inserts between rest and status)

## Out of Scope

- Flask / Python backend (`wbs-sources/Web Development with Flask/`) — explicitly excluded
- Figma design tool content
- New main categories on the home page
- New animation or banner components for new topics (stub `undefined` — added separately)
