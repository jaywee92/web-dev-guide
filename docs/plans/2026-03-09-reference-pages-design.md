# Reference Pages Design
**Date:** 2026-03-09
**Status:** Approved

---

## Goal

Add `/reference/html` and `/reference/css` pages that show the most important HTML elements and CSS properties, organized by category, with direct deep-links to htmlreference.io and cssreference.io.

---

## Approach

Curated static data — ~50 HTML elements and ~60 CSS properties hardcoded as TypeScript objects. Each entry links directly to the authoritative reference page. No network requests, no external API dependency.

---

## Data Model

```typescript
interface ReferenceEntry {
  name: string        // e.g. "<article>", "flex-direction"
  description: string // one sentence
  example: string     // minimal code snippet
  link: string        // direct URL to htmlreference.io or cssreference.io
  tags?: string[]
}

interface ReferenceCategory {
  id: string
  title: string
  color: string       // accent color from design system CSS vars
  entries: ReferenceEntry[]
}
```

---

## Content Scope

### HTML categories (htmlreference.io)
- **Structure** — `<html>`, `<head>`, `<body>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<nav>`, `<header>`, `<footer>`
- **Text** — `<h1>`–`<h6>`, `<p>`, `<strong>`, `<em>`, `<span>`, `<br>`, `<code>`, `<pre>`, `<blockquote>`, `<a>`
- **Lists** — `<ul>`, `<ol>`, `<li>`, `<dl>`, `<dt>`, `<dd>`
- **Media** — `<img>`, `<video>`, `<audio>`, `<figure>`, `<picture>`, `<source>`
- **Forms** — `<form>`, `<input>`, `<label>`, `<button>`, `<select>`, `<textarea>`, `<fieldset>`
- **Tables** — `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`

### CSS categories (cssreference.io)
- **Typography** — `font-size`, `font-weight`, `line-height`, `letter-spacing`, `text-align`, `color`, `font-family`
- **Box Model** — `width`, `height`, `padding`, `margin`, `border`, `box-sizing`, `overflow`
- **Flexbox** — `display`, `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `gap`, `flex`
- **Grid** — `grid-template-columns`, `grid-template-rows`, `grid-column`, `grid-row`, `place-items`
- **Visual** — `background`, `box-shadow`, `border-radius`, `opacity`, `transform`, `transition`
- **Position** — `position`, `top/right/bottom/left`, `z-index`

---

## Routes

```
/#/reference/html    HTML Reference
/#/reference/css     CSS Reference
```

---

## Components

```
src/data/htmlReference.ts
src/data/cssReference.ts
src/pages/ReferencePage/
  index.tsx           — shared shell (type: 'html' | 'css'), header, sticky tabs, category sections
  ReferenceCard.tsx   — name + external link icon, description, CodeBlock, left accent border
  CategorySection.tsx — category title + responsive card grid
```

Modified:
- `src/App.tsx` — 2 new routes
- `src/components/layout/Navbar.tsx` — Reference dropdown (HTML / CSS)
- `src/pages/LevelOverview/index.tsx` — "Quick Reference" row above topic cards (Level 1 only)
- `src/pages/TopicPage/index.tsx` — small reference link in header for HTML/CSS topics
- `src/types/index.ts` — add ReferenceEntry + ReferenceCategory interfaces

---

## Card Layout

```
┌─────────────────────────────┐
│ <article>             [↗]   │  name + external link (opens new tab)
│ Semantic container for      │  one-line description
│ self-contained content.     │
│─────────────────────────────│
│  <article>                  │  CodeBlock (read-only, no label)
│    <h2>Title</h2>           │
│  </article>                 │
└─────────────────────────────┘
```

Left border: 3px solid in category accent color.
`[↗]` icon: `ExternalLink` from lucide-react.

---

## Navigation

- **Navbar**: "Reference" button → dropdown with "HTML Reference" and "CSS Reference" links
- **Level 1 overview**: row above topic cards with two "Quick Reference →" buttons
- **Topic pages** (HTML/CSS topics only): small `→ HTML Reference` link in the page header

---

*Design approved. Next: implementation plan.*
