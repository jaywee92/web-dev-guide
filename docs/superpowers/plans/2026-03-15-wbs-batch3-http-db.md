# WBS Integration: Batch 3 — HTTP + Databases Implementation Plan

> ✅ **COMPLETED** — implemented and deployed to main

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 2 new topics (`db-intro` and `http-ssr-csr`) to `topics.ts` and `categories.ts`, enrich `postgres-queries` with 2 new steps (HAVING vs WHERE, Subqueries), update the `http-rest` nextTopicId chain, and add matching EN + DE locale entries.

**Architecture:** Edit `src/data/topics.ts` (new topic objects + steps), `src/data/categories.ts` (register new topics in categories, TOPIC_ICONS, TOPIC_LABELS), and locale JSON files. No new components — `animationComponent` and `bannerComponent` are set to `undefined` (stubs added separately).

**Tech Stack:** TypeScript, React, i18next. All text via i18n locale JSON; structural fields in topics.ts only.

**Spec:** `docs/superpowers/specs/2026-03-15-wbs-curriculum-integration.md`

---

## Pre-flight Audit (READ FIRST)

Before implementing, verify:

- `http-rest` at line ~3006 in `src/data/topics.ts`: `nextTopicId: 'http-status'` — this will change to `'http-ssr-csr'`.
- `http-status` at line ~3086 in `src/data/topics.ts` — `http-ssr-csr` will be inserted between http-rest and http-status.
- `postgres-queries` at line ~3164 in `src/data/topics.ts`: currently 8 steps (0–7). Steps 8 (HAVING vs WHERE) and 9 (Subqueries) are missing.
- `categories.ts`: `postgresql` topicIds starts with `'postgres-queries'`; `http` topicIds: `['http-request-cycle', 'http-rest', 'http-status']`. Neither `db-intro` nor `http-ssr-csr` are registered yet.

---

## Chunk 1: Add new topics to topics.ts

### Task 1: Add `db-intro` topic to topics.ts

**Files:**
- Modify: `src/data/topics.ts` (insert before `postgres-queries` at line ~3164)

- [x] **Step 1: Find the insertion point**

  Read `src/data/topics.ts` lines 3140–3170. Find the closing `},` of the topic immediately before `postgres-queries`. The new `db-intro` object goes between that closing brace and the `postgres-queries` object.

- [x] **Step 2: Insert db-intro topic object**

  Insert the following topic object at that position:

  ```typescript
  {
    id: 'db-intro',
    category: 'postgresql',
    animationComponent: undefined,
    bannerComponent: undefined,
    nextTopicId: 'postgres-queries',
    title: 'Databases & SQL Intro',
    description: 'What databases are, why we use them, and how relational and NoSQL databases differ.',
    color: '#60a5fa',
    estimatedMinutes: 12,
    playgroundType: 'none',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            icon: '🗄️',
            heading: 'What is a Database?',
            text: 'A database is an organised collection of structured data managed by a Database Management System (DBMS). Key components: the data itself, a schema (structure definition), the DBMS engine, queries, and users. Unlike plain files, databases support concurrent access, complex queries, referential integrity, and transactions.',
            codeExample: `-- Without a database: flat file chaos\n-- users.txt: Alice,alice@example.com,1990-01-01\n-- orders.txt: 1,Alice,widget,49.99\n-- Updating Alice's email means editing every file that references her.\n\n-- With a database: single source of truth\nSELECT u.name, o.total\nFROM users u JOIN orders o ON o.user_id = u.id\nWHERE u.email = 'alice@example.com';`,
            language: 'sql',
          },
          {
            animationStep: 1,
            icon: '📋',
            heading: 'Relational Databases',
            text: 'Relational databases store data in tables — rows are records, columns are typed attributes. A primary key uniquely identifies each row (often SERIAL or AUTO_INCREMENT). ACID guarantees ensure data integrity: Atomicity (all-or-nothing), Consistency (always valid state), Isolation (concurrent-safe), Durability (committed = permanent). Examples: PostgreSQL, MySQL, SQLite.',
            codeExample: `-- Tables relate to each other via foreign keys\nCREATE TABLE users (\n  id    SERIAL PRIMARY KEY,\n  name  VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL\n);\n\nCREATE TABLE orders (\n  id      SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id),  -- foreign key\n  total   DECIMAL(10, 2) NOT NULL,\n  created_at TIMESTAMP DEFAULT NOW()\n);`,
            language: 'sql',
          },
          {
            animationStep: 2,
            icon: '📄',
            heading: 'NoSQL Databases',
            text: 'NoSQL databases trade rigid schemas for flexibility and scale. Four main types: Document stores (MongoDB) — JSON-like documents with nested data. Key-Value (Redis) — ultra-fast in-memory, ideal for caching. Graph (Neo4j) — nodes and edges for relationship-heavy queries. Column-oriented (Cassandra) — high write throughput for time-series and analytics.',
            codeExample: `// MongoDB document store — flexible schema\ndb.users.insertOne({\n  name: "Alice",\n  email: "alice@example.com",\n  preferences: { theme: "dark", lang: "en" },\n  tags: ["admin", "beta-tester"]\n});\n\n// Redis key-value — caching a session\nSET session:abc123 '{"userId":1,"role":"admin"}' EX 3600\nGET session:abc123`,
            language: 'javascript',
          },
          {
            animationStep: 3,
            icon: '⚖️',
            heading: 'SQL vs NoSQL: When to Use Which',
            text: 'Use SQL when: data has clear relationships, you need ACID guarantees, or you run complex JOIN queries and reports. Use NoSQL when: data structure is variable or nested, you need massive horizontal scale, or your workload is write-heavy. In practice, many systems use both — PostgreSQL for persistent data, Redis for caching.',
            codeExample: `-- SQL: structured, relational data\nSELECT u.name, COUNT(o.id) AS order_count\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.name\nHAVING COUNT(o.id) > 5;\n\n// NoSQL (Redis): ephemeral, fast key-value\nawait redis.setEx(\`user:${id}:cart\`, 1800, JSON.stringify(cart));\nconst cart = JSON.parse(await redis.get(\`user:${id}:cart\`));`,
            language: 'sql',
          },
          {
            animationStep: 4,
            icon: '🔤',
            heading: 'SQL Syntax Primer',
            text: 'SQL (Structured Query Language) is the standard for relational databases. CREATE TABLE defines a table\'s schema with column names, types, and constraints. Common data types: SERIAL (auto-increment integer), VARCHAR(n) (string up to n chars), INT, BOOLEAN, TIMESTAMP, TEXT (unlimited string), DECIMAL(p,s). Constraints: PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, FOREIGN KEY.',
            codeExample: `-- Create a table with common data types + constraints\nCREATE TABLE products (\n  id          SERIAL PRIMARY KEY,\n  name        VARCHAR(200) NOT NULL,\n  description TEXT,\n  price       DECIMAL(10, 2) NOT NULL DEFAULT 0.00,\n  in_stock    BOOLEAN NOT NULL DEFAULT true,\n  category    VARCHAR(50),\n  created_at  TIMESTAMP DEFAULT NOW()\n);\n\n-- Insert a row\nINSERT INTO products (name, price, category)\nVALUES ('Widget Pro', 29.99, 'gadgets');`,
            language: 'sql',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'CREATE TABLE', code: 'CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n);', note: 'Define schema with types and constraints' },
        { label: 'Common data types', code: 'SERIAL  VARCHAR(n)  INT\nBOOLEAN  TIMESTAMP  TEXT\nDECIMAL(10,2)', note: 'Most-used PostgreSQL types' },
        { label: 'Constraints', code: 'PRIMARY KEY  NOT NULL  UNIQUE\nDEFAULT value  REFERENCES table(col)', note: 'Enforce data integrity' },
      ],
      patterns: [
        { title: 'Table with FK', code: 'CREATE TABLE orders (\n  id      SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id),\n  total   DECIMAL(10,2)\n);', language: 'sql' },
      ],
      whenToUse: 'Use a relational database (PostgreSQL) when your data has relationships, you need ACID guarantees, or you run complex queries. Add a key-value store (Redis) for caching or sessions.',
      commonMistakes: [
        'Using TEXT for everything — choosing the right data type enables better validation and index performance.',
        'Skipping NOT NULL — allow NULL only when absence of a value is genuinely meaningful.',
        'Forgetting REFERENCES (foreign keys) — without them the database cannot enforce referential integrity.',
      ],
    },
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
  git commit -m "feat: add db-intro topic to topics.ts (5 steps: databases, relational, NoSQL, SQL vs NoSQL, SQL primer)"
  ```

---

### Task 2: Add `http-ssr-csr` topic to topics.ts and update http-rest chain

**Files:**
- Modify: `src/data/topics.ts` (insert after http-rest ends, before http-status; update http-rest nextTopicId)

- [x] **Step 1: Update http-rest nextTopicId**

  In `src/data/topics.ts`, find the `http-rest` topic (line ~3006). Change:
  ```typescript
  nextTopicId: 'http-status',
  ```
  to:
  ```typescript
  nextTopicId: 'http-ssr-csr',
  ```

- [x] **Step 2: Find the insertion point for http-ssr-csr**

  Read `src/data/topics.ts` lines 3060–3095. Find the closing `},` of the `http-rest` topic object. The new `http-ssr-csr` object goes right after that closing brace, before `http-status`.

- [x] **Step 3: Insert http-ssr-csr topic object**

  Insert the following topic object at that position:

  ```typescript
  {
    id: 'http-ssr-csr',
    category: 'http',
    animationComponent: undefined,
    bannerComponent: undefined,
    nextTopicId: 'http-status',
    title: 'SSR vs CSR',
    description: 'Server-Side Rendering vs Client-Side Rendering — how web pages are built and delivered.',
    color: '#fb923c',
    estimatedMinutes: 10,
    playgroundType: 'none',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            icon: '🖥️',
            heading: 'Server-Side Rendering (SSR)',
            text: 'In SSR, the server generates the complete HTML for each request and sends a ready-to-display page to the browser. The browser receives full markup immediately — minimal JavaScript needed to show content. Examples: PHP, Django templates, Ruby on Rails, Next.js with getServerSideProps. Pros: fast first paint, excellent SEO, works without JS. Cons: full server hit per navigation, slower subsequent transitions.',
            codeExample: `<!-- SSR: server sends complete HTML -->\n<!-- Browser receives this from the server: -->\n<!DOCTYPE html>\n<html>\n  <head><title>Products</title></head>\n  <body>\n    <h1>Products</h1>\n    <ul>\n      <li>Widget — $9.99</li>\n      <li>Gadget — $24.99</li>\n    </ul>\n  </body>\n</html>\n<!-- Content is immediately visible — no JS needed to render -->`,
            language: 'html',
          },
          {
            animationStep: 1,
            icon: '💻',
            heading: 'Client-Side Rendering (CSR)',
            text: 'In CSR, the server sends a minimal HTML shell plus a JavaScript bundle. The browser downloads, parses, and executes the JS, which then renders the full UI. Examples: Create React App, Vue SPA, Angular — any single-page application. Pros: fast navigation after initial load, rich interactions, cheap static hosting. Cons: slow initial load (JS bundle must download+parse+execute), SEO requires extra configuration.',
            codeExample: `<!-- CSR: server sends minimal shell -->\n<!-- Browser receives this: -->\n<!DOCTYPE html>\n<html>\n  <body>\n    <div id="root"></div>\n    <script src="/bundle.js"></script>\n    <!-- bundle.js fetches data + renders UI in the browser -->\n  </body>\n</html>\n\n// React then fetches data and renders:\nfetch('/api/products')\n  .then(res => res.json())\n  .then(products => renderProductList(products));`,
            language: 'html',
          },
          {
            animationStep: 2,
            icon: '⚖️',
            heading: 'Direct Comparison',
            text: 'SSR and CSR make different trade-offs. SSR wins on first paint speed and SEO but requires a server for every page view. CSR wins on subsequent navigation speed and hosting cost but struggles with initial load time and search engine crawling. Neither is universally better — choose based on your app\'s priorities.',
            codeExample: `// SSR trade-offs:\n// ✅ Fast First Contentful Paint (FCP)\n// ✅ SEO out of the box\n// ✅ Works without JavaScript\n// ❌ Full server round-trip per navigation\n// ❌ Higher server compute costs\n\n// CSR trade-offs:\n// ✅ Instant navigation after initial load\n// ✅ Rich, app-like interactions\n// ✅ Static hosting (low cost)\n// ❌ Slow initial load (JS bundle)\n// ❌ SEO needs configuration or prerendering`,
            language: 'javascript',
          },
          {
            animationStep: 3,
            icon: '🔀',
            heading: 'Hybrid Approaches',
            text: 'Modern meta-frameworks blend SSR and CSR per route. SSG (Static Site Generation) pre-builds HTML at build time — fastest possible, no server needed (Astro, Next.js). ISR (Incremental Static Regeneration) rebuilds pages on demand or on a schedule. Islands Architecture uses SSR for the shell with selective CSR hydration for interactive parts. Next.js, Nuxt, and SvelteKit let you choose SSR/CSR/SSG per route.',
            codeExample: `// Next.js: choose rendering per route\n\n// SSG — built at build time (fastest)\nexport async function generateStaticParams() { ... }\nexport default async function Page() {\n  const data = await fetchData(); // runs at build time\n  return <ProductList data={data} />;\n}\n\n// SSR — runs on every request\nexport const dynamic = 'force-dynamic';\nexport default async function Page() {\n  const data = await fetchData(); // runs per request\n  return <ProductList data={data} />;\n}`,
            language: 'javascript',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'SSR', code: '// Server builds HTML per request\n// Next.js: export const dynamic = "force-dynamic"', note: 'Fast first paint, good SEO' },
        { label: 'CSR', code: '// Client JS fetches data and renders\n// <div id="root"></div> + bundle.js', note: 'Fast navigation, slow initial load' },
        { label: 'SSG', code: '// HTML pre-built at build time\n// Next.js: generateStaticParams()', note: 'Fastest, no server needed' },
      ],
      patterns: [
        { title: 'Choose per route (Next.js)', code: '// Force SSR:\nexport const dynamic = "force-dynamic";\n// Force SSG:\nexport const dynamic = "force-static";', language: 'javascript' },
      ],
      whenToUse: 'Use SSR for content that must be fresh per request and SEO-critical (product pages, news). Use CSR for dashboards and app UIs behind a login. Use SSG for marketing pages, docs, and blogs.',
      commonMistakes: [
        'Assuming CSR is always faster — for first-time visitors on slow connections, SSR often wins.',
        'Using SSR for everything in Next.js — SSG pages are served from CDN and are much faster.',
        'Ignoring hydration — React SSR sends HTML, then "hydrates" it with JS; mismatches cause flicker.',
      ],
    },
  },
  ```

- [x] **Step 4: Verify the file still compiles**

  ```bash
  npx tsc --noEmit 2>&1 | grep -v supabase
  ```

  Expected: no errors.

- [x] **Step 5: Commit**

  ```bash
  git add src/data/topics.ts
  git commit -m "feat: add http-ssr-csr topic + update http-rest nextTopicId chain"
  ```

---

### Task 3: Add steps 8–9 to postgres-queries in topics.ts

**Files:**
- Modify: `src/data/topics.ts` (around line 3244, after animationStep 7 of postgres-queries)

- [x] **Step 1: Open topics.ts and find postgres-queries explanation steps**

  Read `src/data/topics.ts` lines 3164–3250. Confirm the last step is `animationStep: 7` ("GROUP BY and HAVING").

- [x] **Step 2: Add steps 8–9 after animationStep 7**

  In `src/data/topics.ts`, inside the `postgres-queries` topic's `sections[1].steps` array, add these 2 objects after the last step:

  ```typescript
  {
    animationStep: 8,
    icon: '🔀',
    heading: 'HAVING vs WHERE',
    text: 'WHERE filters individual rows before GROUP BY runs. HAVING filters groups after GROUP BY — it can reference aggregate functions. Rule of thumb: if your condition uses COUNT, SUM, or AVG, use HAVING; otherwise use WHERE. Both can appear in the same query.',
    codeExample: `-- WHERE filters rows BEFORE grouping\n-- HAVING filters groups AFTER grouping\n\nSELECT category, COUNT(*) AS total, AVG(price) AS avg_price\nFROM products\nWHERE in_stock = true           -- filter rows first\nGROUP BY category\nHAVING COUNT(*) > 5             -- then filter groups\n  AND AVG(price) < 100\nORDER BY total DESC;`,
    language: 'sql',
  },
  {
    animationStep: 9,
    icon: '🔲',
    heading: 'Subqueries',
    text: 'A subquery is a SELECT nested inside another query. The inner query runs first; its result is used by the outer query. Scalar subqueries return a single value (usable in WHERE). IN subqueries return a list of values. Correlated subqueries reference the outer query\'s columns — powerful but run once per outer row, so prefer JOINs for performance on large datasets.',
    codeExample: `-- Scalar subquery: single value in WHERE\nSELECT name, price\nFROM products\nWHERE price > (SELECT AVG(price) FROM products);\n\n-- IN subquery: list of values\nSELECT name, email\nFROM users\nWHERE id IN (\n  SELECT user_id FROM orders\n  WHERE total > 100\n);\n\n-- Correlated subquery (runs once per row — use carefully)\nSELECT name,\n  (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count\nFROM users u;`,
    language: 'sql',
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
  git commit -m "feat: add HAVING vs WHERE and Subqueries steps to postgres-queries"
  ```

---

## Chunk 2: Update categories.ts

### Task 4: Register new topics in categories.ts

**Files:**
- Modify: `src/data/categories.ts`

- [x] **Step 1: Read categories.ts**

  Read `src/data/categories.ts` to confirm current state of `postgresql` topicIds (line ~177) and `http` topicIds (line ~167), plus the `TOPIC_ICONS` and `TOPIC_LABELS` records.

- [x] **Step 2: Add `db-intro` to postgresql topicIds**

  In `src/data/categories.ts`, inside the `postgresql` category, change:
  ```typescript
  topicIds: ['postgres-queries', 'postgres-joins', 'postgres-crud'],
  ```
  to:
  ```typescript
  topicIds: ['db-intro', 'postgres-queries', 'postgres-joins', 'postgres-crud'],
  ```

- [x] **Step 3: Add `http-ssr-csr` to http topicIds**

  In `src/data/categories.ts`, inside the `http` category, change:
  ```typescript
  topicIds: ['http-request-cycle', 'http-rest', 'http-status'],
  ```
  to:
  ```typescript
  topicIds: ['http-request-cycle', 'http-rest', 'http-ssr-csr', 'http-status'],
  ```

- [x] **Step 4: Add TOPIC_ICONS entries**

  In `src/data/categories.ts`, inside the `TOPIC_ICONS` record, add after the `'http-status'` line:
  ```typescript
  'http-ssr-csr':              'Monitor',
  ```

  And after the `'postgres-crud'` line:
  ```typescript
  'db-intro':                  'BookOpen',
  ```

- [x] **Step 5: Add TOPIC_LABELS entries**

  In `src/data/categories.ts`, inside the `TOPIC_LABELS` record, add after the `'http-status'` line:
  ```typescript
  'http-ssr-csr':              'SSR vs CSR',
  ```

  And after the `'postgres-crud'` line:
  ```typescript
  'db-intro':                  'Databases & SQL Intro',
  ```

- [x] **Step 6: Verify the file still compiles**

  ```bash
  npx tsc --noEmit 2>&1 | grep -v supabase
  ```

  Expected: no errors.

- [x] **Step 7: Commit**

  ```bash
  git add src/data/categories.ts
  git commit -m "feat: register db-intro and http-ssr-csr in categories.ts"
  ```

---

## Chunk 3: EN locale entries

### Task 5: Add EN locale entries for db-intro and http-ssr-csr

**Files:**
- Modify: `src/i18n/locales/en/topics-other.json`

- [x] **Step 1: Read current topics-other.json structure**

  Read `src/i18n/locales/en/topics-other.json`. Identify the end of the file (it closes with `}`) and the `"postgres-queries"` entry (around line 87).

- [x] **Step 2: Add db-intro entry before postgres-queries**

  In `src/i18n/locales/en/topics-other.json`, add the following entry before `"postgres-queries"`:

  ```json
  "db-intro": {
    "title": "Databases & SQL Intro",
    "description": "What databases are, why we use them, and how relational and NoSQL databases differ.",
    "steps": [
      {
        "animationStep": 0,
        "heading": "What is a Database?",
        "text": "A database is an organised collection of structured data managed by a Database Management System (DBMS). Key components: the data itself, a schema (structure definition), the DBMS engine, queries, and users. Unlike plain files, databases support concurrent access, complex queries, referential integrity, and transactions."
      },
      {
        "animationStep": 1,
        "heading": "Relational Databases",
        "text": "Relational databases store data in tables — rows are records, columns are typed attributes. A primary key uniquely identifies each row (often SERIAL or AUTO_INCREMENT). ACID guarantees ensure data integrity: Atomicity (all-or-nothing), Consistency (always valid state), Isolation (concurrent-safe), Durability (committed = permanent). Examples: PostgreSQL, MySQL, SQLite."
      },
      {
        "animationStep": 2,
        "heading": "NoSQL Databases",
        "text": "NoSQL databases trade rigid schemas for flexibility and scale. Four main types: Document stores (MongoDB) — JSON-like documents with nested data. Key-Value (Redis) — ultra-fast in-memory, ideal for caching. Graph (Neo4j) — nodes and edges for relationship-heavy queries. Column-oriented (Cassandra) — high write throughput for time-series and analytics."
      },
      {
        "animationStep": 3,
        "heading": "SQL vs NoSQL: When to Use Which",
        "text": "Use SQL when: data has clear relationships, you need ACID guarantees, or you run complex JOIN queries and reports. Use NoSQL when: data structure is variable or nested, you need massive horizontal scale, or your workload is write-heavy. In practice, many systems use both — PostgreSQL for persistent data, Redis for caching."
      },
      {
        "animationStep": 4,
        "heading": "SQL Syntax Primer",
        "text": "SQL (Structured Query Language) is the standard for relational databases. CREATE TABLE defines a table's schema with column names, types, and constraints. Common data types: SERIAL (auto-increment integer), VARCHAR(n) (string up to n chars), INT, BOOLEAN, TIMESTAMP, TEXT (unlimited string), DECIMAL(p,s). Constraints: PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, FOREIGN KEY."
      }
    ],
    "cheatSheet": {
      "syntax": [
        { "label": "CREATE TABLE", "note": "Define schema with types and constraints" },
        { "label": "Common data types", "note": "Most-used PostgreSQL types" },
        { "label": "Constraints", "note": "Enforce data integrity" }
      ],
      "patterns": [
        { "title": "Table with FK" }
      ],
      "whenToUse": "Use a relational database (PostgreSQL) when your data has relationships, you need ACID guarantees, or you run complex queries. Add a key-value store (Redis) for caching or sessions.",
      "commonMistakes": [
        "Using TEXT for everything — choosing the right data type enables better validation and index performance.",
        "Skipping NOT NULL — allow NULL only when absence of a value is genuinely meaningful.",
        "Forgetting REFERENCES (foreign keys) — without them the database cannot enforce referential integrity."
      ]
    }
  },
  ```

- [x] **Step 3: Add http-ssr-csr entry**

  In `src/i18n/locales/en/topics-other.json`, add the following entry (for example after the `"http-rest"` or `"http-status"` entry, but before the closing `}`):

  ```json
  "http-ssr-csr": {
    "title": "SSR vs CSR",
    "description": "Server-Side Rendering vs Client-Side Rendering — how web pages are built and delivered.",
    "steps": [
      {
        "animationStep": 0,
        "heading": "Server-Side Rendering (SSR)",
        "text": "In SSR, the server generates the complete HTML for each request and sends a ready-to-display page to the browser. The browser receives full markup immediately — minimal JavaScript needed to show content. Examples: PHP, Django templates, Ruby on Rails, Next.js with getServerSideProps. Pros: fast first paint, excellent SEO, works without JS. Cons: full server hit per navigation, slower subsequent transitions."
      },
      {
        "animationStep": 1,
        "heading": "Client-Side Rendering (CSR)",
        "text": "In CSR, the server sends a minimal HTML shell plus a JavaScript bundle. The browser downloads, parses, and executes the JS, which then renders the full UI. Examples: Create React App, Vue SPA, Angular — any single-page application. Pros: fast navigation after initial load, rich interactions, cheap static hosting. Cons: slow initial load (JS bundle must download+parse+execute), SEO requires extra configuration."
      },
      {
        "animationStep": 2,
        "heading": "Direct Comparison",
        "text": "SSR and CSR make different trade-offs. SSR wins on first paint speed and SEO but requires a server for every page view. CSR wins on subsequent navigation speed and hosting cost but struggles with initial load time and search engine crawling. Neither is universally better — choose based on your app's priorities."
      },
      {
        "animationStep": 3,
        "heading": "Hybrid Approaches",
        "text": "Modern meta-frameworks blend SSR and CSR per route. SSG (Static Site Generation) pre-builds HTML at build time — fastest possible, no server needed (Astro, Next.js). ISR (Incremental Static Regeneration) rebuilds pages on demand or on a schedule. Islands Architecture uses SSR for the shell with selective CSR hydration for interactive parts. Next.js, Nuxt, and SvelteKit let you choose SSR/CSR/SSG per route."
      }
    ],
    "cheatSheet": {
      "syntax": [
        { "label": "SSR", "note": "Fast first paint, good SEO" },
        { "label": "CSR", "note": "Fast navigation, slow initial load" },
        { "label": "SSG", "note": "Fastest, no server needed" }
      ],
      "patterns": [
        { "title": "Choose per route (Next.js)" }
      ],
      "whenToUse": "Use SSR for content that must be fresh per request and SEO-critical (product pages, news). Use CSR for dashboards and app UIs behind a login. Use SSG for marketing pages, docs, and blogs.",
      "commonMistakes": [
        "Assuming CSR is always faster — for first-time visitors on slow connections, SSR often wins.",
        "Using SSR for everything in Next.js — SSG pages are served from CDN and are much faster.",
        "Ignoring hydration — React SSR sends HTML, then 'hydrates' it with JS; mismatches cause flicker."
      ]
    }
  },
  ```

- [x] **Step 4: Add postgres-queries steps 8–9 to EN locale**

  In `src/i18n/locales/en/topics-other.json`, find `"postgres-queries" > "steps"`. Add after the last step (animationStep 7):

  ```json
  {
    "animationStep": 8,
    "heading": "HAVING vs WHERE",
    "text": "WHERE filters individual rows before GROUP BY runs. HAVING filters groups after GROUP BY — it can reference aggregate functions. Rule of thumb: if your condition uses COUNT, SUM, or AVG, use HAVING; otherwise use WHERE. Both can appear in the same query."
  },
  {
    "animationStep": 9,
    "heading": "Subqueries",
    "text": "A subquery is a SELECT nested inside another query. The inner query runs first; its result is used by the outer query. Scalar subqueries return a single value (usable in WHERE). IN subqueries return a list of values. Correlated subqueries reference the outer query's columns — powerful but run once per outer row, so prefer JOINs for performance on large datasets."
  }
  ```

- [x] **Step 5: Commit**

  ```bash
  git add src/i18n/locales/en/topics-other.json
  git commit -m "feat: add EN locale for db-intro, http-ssr-csr, and postgres-queries steps 8-9"
  ```

---

### Task 6: Add EN locale entries for categories

**Files:**
- Modify: `src/i18n/locales/en/categories.json`

- [x] **Step 1: Read current categories.json**

  Read `src/i18n/locales/en/categories.json`. Find the `"topicLabels"` key.

- [x] **Step 2: Add new topic label entries**

  Inside `"topicLabels"`, add:
  ```json
  "db-intro": "Databases & SQL Intro",
  "http-ssr-csr": "SSR vs CSR"
  ```

- [x] **Step 3: Commit**

  ```bash
  git add src/i18n/locales/en/categories.json
  git commit -m "feat: add EN categories locale for db-intro and http-ssr-csr"
  ```

---

## Chunk 4: DE locale entries

### Task 7: Add DE locale entries for db-intro and http-ssr-csr

**Files:**
- Modify: `src/i18n/locales/de/topics-other.json`

- [x] **Step 1: Read current DE topics-other.json**

  Read `src/i18n/locales/de/topics-other.json`. Find the `"postgres-queries"` entry and any existing http entries.

- [x] **Step 2: Add db-intro DE entry before postgres-queries**

  In `src/i18n/locales/de/topics-other.json`, add the following entry before `"postgres-queries"`:

  ```json
  "db-intro": {
    "title": "Datenbanken & SQL Intro",
    "description": "Was Datenbanken sind, warum wir sie nutzen und wie sich relationale und NoSQL-Datenbanken unterscheiden.",
    "steps": [
      {
        "animationStep": 0,
        "heading": "Was ist eine Datenbank?",
        "text": "Eine Datenbank ist eine organisierte Sammlung strukturierter Daten, die von einem Datenbankmanagementsystem (DBMS) verwaltet wird. Kernkomponenten: die Daten selbst, ein Schema (Strukturdefinition), die DBMS-Engine, Abfragen und Benutzer. Im Gegensatz zu einfachen Dateien unterstützen Datenbanken gleichzeitigen Zugriff, komplexe Abfragen, referenzielle Integrität und Transaktionen."
      },
      {
        "animationStep": 1,
        "heading": "Relationale Datenbanken",
        "text": "Relationale Datenbanken speichern Daten in Tabellen — Zeilen sind Datensätze, Spalten sind typisierte Attribute. Ein Primärschlüssel identifiziert jede Zeile eindeutig (oft SERIAL oder AUTO_INCREMENT). ACID-Garantien sichern die Datenintegrität: Atomizität (alles oder nichts), Konsistenz (immer gültiger Zustand), Isolation (konkurrenzsicher), Dauerhaftigkeit (Committed = permanent). Beispiele: PostgreSQL, MySQL, SQLite."
      },
      {
        "animationStep": 2,
        "heading": "NoSQL-Datenbanken",
        "text": "NoSQL-Datenbanken tauschen starre Schemata gegen Flexibilität und Skalierbarkeit. Vier Haupttypen: Document Stores (MongoDB) — JSON-ähnliche Dokumente mit verschachtelten Daten. Key-Value (Redis) — ultraschneller In-Memory-Speicher, ideal für Caching. Graph (Neo4j) — Knoten und Kanten für beziehungsintensive Abfragen. Column-oriented (Cassandra) — hoher Schreibdurchsatz für Zeitreihendaten und Analysen."
      },
      {
        "animationStep": 3,
        "heading": "SQL vs. NoSQL: Wann was nutzen?",
        "text": "Verwende SQL, wenn: Daten klare Beziehungen haben, ACID-Garantien erforderlich sind oder komplexe JOIN-Abfragen und Reports benötigt werden. Verwende NoSQL, wenn: die Datenstruktur variabel oder verschachtelt ist, massive horizontale Skalierung nötig ist oder der Workload schreibintensiv ist. In der Praxis nutzen viele Systeme beides — PostgreSQL für persistente Daten, Redis für Caching."
      },
      {
        "animationStep": 4,
        "heading": "SQL-Syntax-Primer",
        "text": "SQL (Structured Query Language) ist der Standard für relationale Datenbanken. CREATE TABLE definiert das Schema einer Tabelle mit Spaltennamen, Typen und Constraints. Häufige Datentypen: SERIAL (Auto-Increment-Integer), VARCHAR(n) (Zeichenkette bis n Zeichen), INT, BOOLEAN, TIMESTAMP, TEXT (unbegrenzte Zeichenkette), DECIMAL(p,s). Constraints: PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, FOREIGN KEY."
      }
    ],
    "cheatSheet": {
      "syntax": [
        { "label": "CREATE TABLE", "note": "Schema mit Typen und Constraints definieren" },
        { "label": "Häufige Datentypen", "note": "Meist verwendete PostgreSQL-Typen" },
        { "label": "Constraints", "note": "Datenintegrität erzwingen" }
      ],
      "patterns": [
        { "title": "Tabelle mit FK" }
      ],
      "whenToUse": "Verwende eine relationale Datenbank (PostgreSQL), wenn deine Daten Beziehungen haben, ACID-Garantien benötigt werden oder komplexe Abfragen erforderlich sind. Füge einen Key-Value-Store (Redis) für Caching oder Sessions hinzu.",
      "commonMistakes": [
        "TEXT für alles verwenden — der richtige Datentyp ermöglicht bessere Validierung und Index-Performance.",
        "NOT NULL weglassen — erlaube NULL nur, wenn das Fehlen eines Wertes wirklich sinnvoll ist.",
        "REFERENCES (Foreign Keys) vergessen — ohne sie kann die Datenbank referenzielle Integrität nicht erzwingen."
      ]
    }
  },
  ```

- [x] **Step 3: Add http-ssr-csr DE entry**

  In `src/i18n/locales/de/topics-other.json`, add:

  ```json
  "http-ssr-csr": {
    "title": "SSR vs. CSR",
    "description": "Server-Side Rendering vs. Client-Side Rendering — wie Webseiten aufgebaut und ausgeliefert werden.",
    "steps": [
      {
        "animationStep": 0,
        "heading": "Server-Side Rendering (SSR)",
        "text": "Bei SSR generiert der Server für jede Anfrage vollständiges HTML und sendet eine sofort darstellbare Seite an den Browser. Der Browser empfängt das vollständige Markup sofort — es wird kaum JavaScript benötigt, um Inhalte anzuzeigen. Beispiele: PHP, Django-Templates, Ruby on Rails, Next.js mit getServerSideProps. Vorteile: schneller First Paint, hervorragendes SEO, funktioniert ohne JS. Nachteile: vollständiger Server-Aufruf pro Navigation, langsamere Folgeübergänge."
      },
      {
        "animationStep": 1,
        "heading": "Client-Side Rendering (CSR)",
        "text": "Bei CSR sendet der Server eine minimale HTML-Hülle plus ein JavaScript-Bundle. Der Browser lädt das JS herunter, parst und führt es aus, woraufhin die vollständige Benutzeroberfläche gerendert wird. Beispiele: Create React App, Vue SPA, Angular — jede Single-Page-Applikation. Vorteile: schnelle Navigation nach dem ersten Laden, reichhaltige Interaktionen, günstiges statisches Hosting. Nachteile: langsames erstes Laden, SEO erfordert zusätzliche Konfiguration."
      },
      {
        "animationStep": 2,
        "heading": "Direkter Vergleich",
        "text": "SSR und CSR treffen unterschiedliche Kompromisse. SSR gewinnt bei der Geschwindigkeit des ersten Seitenaufbaus und SEO, benötigt aber für jede Seitenanfrage einen Server. CSR gewinnt bei der Navigationsgeschwindigkeit nach dem ersten Laden und den Hosting-Kosten, hat aber Probleme bei der Ladezeit und der Suchmaschinenindexierung. Keines ist universell besser — wähle basierend auf den Prioritäten deiner App."
      },
      {
        "animationStep": 3,
        "heading": "Hybride Ansätze",
        "text": "Moderne Meta-Frameworks kombinieren SSR und CSR pro Route. SSG (Static Site Generation) erstellt HTML zur Build-Zeit — schnellstmöglich, kein Server nötig (Astro, Next.js). ISR (Incremental Static Regeneration) erstellt Seiten auf Abruf oder nach Zeitplan neu. Islands Architecture verwendet SSR für die Hülle mit selektiver CSR-Hydration für interaktive Teile. Next.js, Nuxt und SvelteKit ermöglichen die Wahl von SSR/CSR/SSG pro Route."
      }
    ],
    "cheatSheet": {
      "syntax": [
        { "label": "SSR", "note": "Schneller First Paint, gutes SEO" },
        { "label": "CSR", "note": "Schnelle Navigation, langsames erstes Laden" },
        { "label": "SSG", "note": "Am schnellsten, kein Server nötig" }
      ],
      "patterns": [
        { "title": "Pro Route wählen (Next.js)" }
      ],
      "whenToUse": "Verwende SSR für inhaltlich aktuelle, SEO-kritische Seiten (Produktseiten, Nachrichten). CSR für Dashboards und App-UIs hinter einem Login. SSG für Marketing-Seiten, Dokumentationen und Blogs.",
      "commonMistakes": [
        "Davon ausgehen, CSR sei immer schneller — für Erstbesucher mit langsamer Verbindung gewinnt SSR oft.",
        "In Next.js alles auf SSR setzen — SSG-Seiten werden vom CDN ausgeliefert und sind deutlich schneller.",
        "Hydration ignorieren — React SSR sendet HTML, dann wird es mit JS 'hydratisiert'; Abweichungen verursachen Flackern."
      ]
    }
  },
  ```

- [x] **Step 4: Add postgres-queries DE steps 8–9**

  In `src/i18n/locales/de/topics-other.json`, find `"postgres-queries" > "steps"`. Add after the last step (animationStep 7):

  ```json
  {
    "animationStep": 8,
    "heading": "HAVING vs. WHERE",
    "text": "WHERE filtert einzelne Zeilen, bevor GROUP BY ausgeführt wird. HAVING filtert Gruppen nach GROUP BY — es kann auf Aggregatfunktionen verweisen. Faustregel: Wenn deine Bedingung COUNT, SUM oder AVG verwendet, nutze HAVING; andernfalls WHERE. Beide können in derselben Abfrage vorkommen."
  },
  {
    "animationStep": 9,
    "heading": "Subqueries",
    "text": "Eine Subquery ist ein SELECT, das innerhalb einer anderen Abfrage verschachtelt ist. Die innere Abfrage wird zuerst ausgeführt; ihr Ergebnis wird von der äußeren Abfrage verwendet. Skalare Subqueries geben einen einzelnen Wert zurück (verwendbar in WHERE). IN-Subqueries geben eine Werteliste zurück. Korrelierte Subqueries referenzieren Spalten der äußeren Abfrage — mächtig, aber sie laufen einmal pro äußerer Zeile; bevorzuge JOINs für große Datensätze."
  }
  ```

- [x] **Step 5: Commit**

  ```bash
  git add src/i18n/locales/de/topics-other.json
  git commit -m "feat: add DE locale for db-intro, http-ssr-csr, and postgres-queries steps 8-9"
  ```

---

### Task 8: Add DE locale entries for categories

**Files:**
- Modify: `src/i18n/locales/de/categories.json`

- [x] **Step 1: Read current DE categories.json**

  Read `src/i18n/locales/de/categories.json`. Find the `"topicLabels"` key.

- [x] **Step 2: Add new topic label entries**

  Inside `"topicLabels"`, add:
  ```json
  "db-intro": "Datenbanken & SQL Intro",
  "http-ssr-csr": "SSR vs. CSR"
  ```

- [x] **Step 3: Commit**

  ```bash
  git add src/i18n/locales/de/categories.json
  git commit -m "feat: add DE categories locale for db-intro and http-ssr-csr"
  ```

---

## Chunk 5: Final Verification

### Task 9: Final TypeScript check and dev verification

**Files:** None (verification only)

- [x] **Step 1: Full TypeScript check**

  ```bash
  npx tsc --noEmit 2>&1 | grep -v supabase
  ```

  Expected: no output (clean build).

- [x] **Step 2: Verify new topics appear in dev server**

  ```bash
  npm run dev
  ```

  Navigate to `/category/postgresql` — confirm `db-intro` now appears as the first topic in the category list.

  Navigate to `/topic/db-intro` — confirm 5 explanation steps render (0–4).

  Navigate to `/category/http` — confirm `http-ssr-csr` appears between REST and Status Codes.

  Navigate to `/topic/http-ssr-csr` — confirm 4 explanation steps render (0–3).

  Navigate to `/topic/postgres-queries` — confirm 10 steps render (0–9), with the last two being HAVING vs WHERE and Subqueries.

- [x] **Step 3: Final commit if any fixes needed**

  ```bash
  git add -u
  git commit -m "fix: batch3 HTTP+DB typescript fixes"
  ```
