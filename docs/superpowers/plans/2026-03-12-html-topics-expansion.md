# HTML Topics Expansion — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the HTML category from 3 topics to 8, sourced from WBS school materials and MDN, each with an animated Viz component, topic definition, and registry entry.

**Architecture:** Each new topic follows the existing pattern: a `*Viz.tsx` in `src/topics/html/`, a `Topic` object in `src/data/topics.ts`, a lazy-import entry in `src/topics/registry.ts`, and label/id additions in `src/data/categories.ts`. No new data types needed.

**Tech Stack:** React 19, TypeScript, Framer Motion (`motion`, `AnimatePresence`), existing CSS variables (`--font-mono`, `--border`, `--text`, `--text-muted`)

**Final topic ordering in category:**
`html-basics` → `html-text` → `html-links-images` → `html-lists` → `html-semantic` → `html-dom` → `html-media` → `html-forms`

---

## Chunk 1: Data layer + registry

### Task 1: Update categories.ts

**Files:**
- Modify: `src/data/categories.ts`

- [ ] **Step 1: Update html topicIds array and add TOPIC_LABELS entries**

In `src/data/categories.ts`, change the `html` category's `topicIds` from:
```ts
topicIds: ['html-dom', 'html-semantic', 'html-forms'],
```
to:
```ts
topicIds: ['html-basics', 'html-text', 'html-links-images', 'html-lists', 'html-semantic', 'html-dom', 'html-media', 'html-forms'],
```

Also update the `cardLabel` and `cardEmoji` for the html category:
```ts
cardLabel: 'Foundation to Forms',
cardEmoji: '🏗',
```

- [ ] **Step 2: Add new labels to TOPIC_LABELS**

In the `TOPIC_LABELS` export, add after the existing html entries:
```ts
'html-basics':        'Elements & Attributes',
'html-text':          'Text & Headings',
'html-links-images':  'Links & Images',
'html-lists':         'Lists & Structure',
'html-media':         'Media & Embeds',
```

---

### Task 2: Add 5 topic definitions to topics.ts

**Files:**
- Modify: `src/data/topics.ts`

Insert the following 5 topic objects **before** the existing `html-dom` entry (at line 4, right after `export const TOPICS: Topic[] = [`).

- [ ] **Step 1: Insert `html-basics` topic**

```ts
  {
    id: 'html-basics',
    title: 'Elements & Attributes',
    description: 'Anatomy of HTML elements — tags, content, closing tags, and how attributes configure them',
    level: 1,
    category: 'html',
    color: '#4ade80',
    estimatedMinutes: 8,
    animationComponent: 'ElementsViz',
    playgroundType: 'visual-controls',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'HTML is made of elements',
            text: 'Every visible thing on a webpage is an HTML element — a heading, a paragraph, a link, an image. Elements tell the browser what the content means, not just how it looks.',
            codeExample: '<p>Hello, world!</p>',
            language: 'html',
          },
          {
            animationStep: 1,
            heading: 'Opening tag',
            text: 'The opening tag names the element. <p> means paragraph. <h1> means main heading. <a> means anchor (link). The name determines how the browser renders the content.',
            codeExample: '<p>Hello, world!</p>\n ↑ opening tag',
            language: 'html',
          },
          {
            animationStep: 2,
            heading: 'Content',
            text: 'Content lives between the tags. It can be text, other elements, or a mix of both. Nesting elements inside each other builds the tree structure of the page.',
            codeExample: '<p>Hello, <strong>world</strong>!</p>',
            language: 'html',
          },
          {
            animationStep: 3,
            heading: 'Closing tag',
            text: 'The closing tag has a slash before the name. It ends the element. Some elements — like <img>, <br>, <hr>, <input> — are void elements with no content and no closing tag.',
            codeExample: '<p>Hello, world!</p>\n               ↑ closing tag',
            language: 'html',
          },
          {
            animationStep: 4,
            heading: 'Attributes',
            text: 'Attributes go inside the opening tag and provide extra information. They come in name="value" pairs. Common ones: href (link URL), src (image source), alt (alt text), id (unique name), class (styling group).',
            codeExample: '<a href="/about" class="nav-link" target="_blank">About</a>',
            language: 'html',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'Basic element', code: '<tagname>content</tagname>', note: 'Opening tag · content · closing tag' },
        { label: 'Void element', code: '<img src="photo.jpg" alt="A photo">\n<br>\n<hr>\n<input type="text">', note: 'No closing tag — no content' },
        { label: 'id', code: '<div id="hero">...</div>', note: 'Unique per page — used for JS & anchor links' },
        { label: 'class', code: '<p class="intro large">...</p>', note: 'Multiple classes separated by spaces' },
        { label: 'href', code: '<a href="https://example.com">External</a>\n<a href="/about">Relative</a>\n<a href="#section">Anchor</a>', note: 'Link destination' },
        { label: 'src + alt', code: '<img src="photo.jpg" alt="A sunset over mountains">', note: 'alt is required for accessibility & SEO' },
      ],
      patterns: [
        { title: 'Linked image', code: '<a href="https://example.com">\n  <img src="logo.png" alt="Example logo">\n</a>', language: 'html' },
        { title: 'Input with label', code: '<label for="email">Email</label>\n<input type="email" id="email" name="email">', language: 'html' },
      ],
      whenToUse: 'Use the most specific semantic element for each job. Choose <button> over <div onclick>, <a> over <span onclick>, <strong> over <b> for importance.',
      commonMistakes: [
        'Forgetting the closing tag — most elements need </tagname> or rendering breaks',
        'Missing alt= on images — required for accessibility and fails HTML validation',
        'Duplicating an id — id must be unique per page or querySelector returns wrong element',
      ],
    },
  },
```

- [ ] **Step 2: Insert `html-text` topic**

```ts
  {
    id: 'html-text',
    title: 'Text & Headings',
    description: 'Structure text with heading levels, paragraphs, and semantic inline formatting',
    level: 1,
    category: 'html',
    color: '#4ade80',
    estimatedMinutes: 8,
    animationComponent: 'TextHeadingsViz',
    playgroundType: 'visual-controls',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'Heading hierarchy',
            text: 'HTML has six heading levels: <h1> through <h6>. <h1> is the most important — used once per page for the main title. Subsequent headings create a document outline that browsers, search engines, and screen readers all use.',
            codeExample: '<h1>Main Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>',
            language: 'html',
          },
          {
            animationStep: 1,
            heading: 'Paragraphs',
            text: 'The <p> tag defines a paragraph. Browsers automatically add space above and below each paragraph. Never use <br> tags just to add vertical spacing — use CSS margins instead.',
            codeExample: '<p>First paragraph of text here.</p>\n<p>Second paragraph starts here.</p>',
            language: 'html',
          },
          {
            animationStep: 2,
            heading: 'Semantic vs presentational',
            text: '<strong> and <em> carry meaning: importance and emphasis. Screen readers announce them differently. <b> and <i> are purely visual with no semantic weight. Prefer <strong>/<em> when the meaning matters.',
            codeExample: '<strong>Important</strong> vs <b>Bold</b>\n<em>Emphasis</em> vs <i>Italic</i>',
            language: 'html',
          },
          {
            animationStep: 3,
            heading: 'Inline text elements',
            text: 'HTML has many inline elements for rich text. <mark> highlights. <del> shows deleted text. <ins> shows inserted text. <small> reduces size. <sub> and <sup> create subscript and superscript.',
            codeExample: 'Price: <del>€99</del> <ins>€49</ins>\nH<sub>2</sub>O  ·  E = mc<sup>2</sup>\n<mark>highlighted</mark>  ·  <small>fine print</small>',
            language: 'html',
          },
          {
            animationStep: 4,
            heading: 'Block quotes and code',
            text: '<blockquote> wraps content quoted from another source. <code> displays inline code in monospace. <pre> preserves whitespace and line breaks — combined with <code> for multi-line snippets.',
            codeExample: '<blockquote cite="https://example.com">\n  <p>The best way to learn is by doing.</p>\n</blockquote>\n\n<pre><code>const x = 1\nconst y = 2</code></pre>',
            language: 'html',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: 'Headings', code: '<h1>Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>', note: 'h1 once per page; never skip levels' },
        { label: 'Paragraph', code: '<p>Text content here.</p>', note: 'Block element — adds vertical spacing' },
        { label: '<strong> / <em>', code: '<strong>Important</strong>\n<em>Emphasized</em>', note: 'Semantic: importance / emphasis' },
        { label: '<mark> / <del> / <ins>', code: '<mark>highlighted</mark>\n<del>removed</del>\n<ins>added</ins>', note: 'Annotation and revision markers' },
        { label: '<sub> / <sup>', code: 'H<sub>2</sub>O\nE = mc<sup>2</sup>', note: 'Subscript / superscript' },
        { label: '<pre><code>', code: '<pre><code>const x = 1\nconst y = 2</code></pre>', note: 'Multi-line code block preserving whitespace' },
      ],
      patterns: [
        { title: 'Article with headings', code: '<article>\n  <h1>Article Title</h1>\n  <p>Intro paragraph.</p>\n  <h2>First Section</h2>\n  <p>Section content.</p>\n</article>', language: 'html' },
      ],
      whenToUse: 'Use headings to create a logical document outline, not to control font size (use CSS for that). Always prefer semantic elements: <strong> over <b>, <em> over <i>.',
      commonMistakes: [
        'Using <h1> multiple times — one per page for SEO and accessibility',
        'Skipping heading levels (h1 → h3) — headings must be sequential',
        'Using <br> for paragraph spacing — use <p> tags and CSS margin instead',
      ],
    },
  },
```

- [ ] **Step 3: Insert `html-links-images` topic**

```ts
  {
    id: 'html-links-images',
    title: 'Links & Images',
    description: 'Navigate with anchor links and embed images with meaningful alt text',
    level: 1,
    category: 'html',
    color: '#4ade80',
    estimatedMinutes: 8,
    animationComponent: 'LinksImagesViz',
    playgroundType: 'visual-controls',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'The anchor element',
            text: 'The <a> (anchor) tag creates a link. The href attribute holds the destination — a URL, a path, or even an email address. Without href, it\'s not a link.',
            codeExample: '<a href="https://developer.mozilla.org">MDN Docs</a>\n<a href="/about">About page</a>\n<a href="mailto:hi@example.com">Email us</a>',
            language: 'html',
          },
          {
            animationStep: 1,
            heading: 'Absolute vs relative URLs',
            text: 'Absolute URLs start with https:// — they work from anywhere. Relative URLs describe a path from the current page. Use relative links for internal navigation so the site works in any environment.',
            codeExample: '<!-- Absolute: works from anywhere -->\n<a href="https://example.com/page">...</a>\n\n<!-- Relative: path from current page -->\n<a href="/about">About</a>\n<a href="../images/logo.png">Logo</a>',
            language: 'html',
          },
          {
            animationStep: 2,
            heading: 'target and download',
            text: 'target="_blank" opens the link in a new tab. Always add rel="noopener" with it for security. The download attribute tells the browser to download the file instead of navigating to it.',
            codeExample: '<a href="https://example.com" target="_blank" rel="noopener">\n  Opens in new tab\n</a>\n\n<a href="/report.pdf" download>Download PDF</a>',
            language: 'html',
          },
          {
            animationStep: 3,
            heading: 'The <img> element',
            text: '<img> is a void element — no closing tag. src points to the image file. alt provides text for screen readers and when the image fails to load. width and height prevent layout shift.',
            codeExample: '<img\n  src="photo.jpg"\n  alt="A sunset over mountain peaks"\n  width="800"\n  height="600"\n>',
            language: 'html',
          },
          {
            animationStep: 4,
            heading: 'Why alt text matters',
            text: 'Alt text is read aloud by screen readers for blind users. It also appears when the image fails to load. Describe what is in the image, not just its file name. For decorative images, use an empty alt="" so screen readers skip it.',
            codeExample: '<!-- Good: describes content -->\n<img src="team.jpg" alt="The four-person dev team at a whiteboard">\n\n<!-- Decorative: skip it -->\n<img src="divider.svg" alt="">',
            language: 'html',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: '<a href>', code: '<a href="/page">Text</a>', note: 'href is required for a real link' },
        { label: 'New tab', code: '<a href="https://x.com" target="_blank" rel="noopener">X</a>', note: 'rel="noopener" prevents tab-jacking' },
        { label: 'Anchor link', code: '<a href="#section-id">Jump to section</a>\n<section id="section-id">...</section>', note: 'In-page navigation' },
        { label: '<img>', code: '<img src="path.jpg" alt="Description" width="400" height="300">', note: 'width/height prevent layout shift' },
        { label: 'Linked image', code: '<a href="/gallery">\n  <img src="thumb.jpg" alt="Open gallery">\n</a>', note: 'Wrap img in a to make it clickable' },
        { label: 'HTML comment', code: '<!-- This is a comment, not rendered -->', note: 'Invisible to users, visible in source' },
      ],
      patterns: [
        { title: 'Navigation list', code: '<nav>\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/about">About</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>', language: 'html' },
      ],
      whenToUse: 'Use <a> for all navigation. Use alt="" (empty) for purely decorative images. Set width/height on every <img> to prevent content layout shift (CLS).',
      commonMistakes: [
        'Missing rel="noopener" on target="_blank" links — security vulnerability',
        'alt="image.jpg" or alt="image" — describe the content, not the filename',
        'Omitting width/height on images — causes layout shift as page loads',
      ],
    },
  },
```

- [ ] **Step 4: Insert `html-lists` topic**

```ts
  {
    id: 'html-lists',
    title: 'Lists & Structure',
    description: 'Organize content with ordered and unordered lists, and understand block vs inline layout',
    level: 1,
    category: 'html',
    color: '#4ade80',
    estimatedMinutes: 8,
    animationComponent: 'ListsViz',
    playgroundType: 'visual-controls',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'Unordered lists',
            text: '<ul> creates a bulleted list. Each item is wrapped in <li>. Use unordered lists when the order doesn\'t matter — a navigation menu, a feature list, a set of tags.',
            codeExample: '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>',
            language: 'html',
          },
          {
            animationStep: 1,
            heading: 'Ordered lists',
            text: '<ol> creates a numbered list. Items are still <li>. Use ordered lists when sequence matters — steps in a tutorial, rankings, a recipe. The browser handles the numbering automatically.',
            codeExample: '<ol>\n  <li>Boil water</li>\n  <li>Add pasta</li>\n  <li>Cook 8 minutes</li>\n</ol>',
            language: 'html',
          },
          {
            animationStep: 2,
            heading: 'Nested lists',
            text: 'Lists can be nested inside list items. An <li> can contain another <ul> or <ol>. This creates hierarchical structures — like a table of contents or an outline.',
            codeExample: '<ul>\n  <li>Frontend\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n    </ul>\n  </li>\n  <li>Backend</li>\n</ul>',
            language: 'html',
          },
          {
            animationStep: 3,
            heading: 'Block vs inline elements',
            text: 'Block elements (<div>, <p>, <h1>, <ul>) start on a new line and take full width. Inline elements (<span>, <a>, <strong>, <img>) flow within text. This determines how elements stack and wrap.',
            codeExample: '<!-- Block: each on its own line -->\n<div>Section A</div>\n<div>Section B</div>\n\n<!-- Inline: side by side in text -->\n<span>red</span> and <span>blue</span>',
            language: 'html',
          },
          {
            animationStep: 4,
            heading: '<div> and <span>',
            text: '<div> is a generic block container — no semantic meaning, just grouping. <span> is a generic inline container. Use them for styling hooks or JavaScript targets when no semantic element fits. Prefer semantic elements when possible.',
            codeExample: '<div class="card">\n  <h2>Title</h2>\n  <p>Price: <span class="price">€49</span></p>\n</div>',
            language: 'html',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: '<ul>', code: '<ul>\n  <li>Item one</li>\n  <li>Item two</li>\n</ul>', note: 'Unordered (bullets) — order irrelevant' },
        { label: '<ol>', code: '<ol>\n  <li>First step</li>\n  <li>Second step</li>\n</ol>', note: 'Ordered (numbers) — sequence matters' },
        { label: 'Nested list', code: '<ul>\n  <li>Parent\n    <ul>\n      <li>Child</li>\n    </ul>\n  </li>\n</ul>', note: 'Nested <ul>/<ol> inside <li>' },
        { label: '<div>', code: '<div class="card">...</div>', note: 'Generic block container, no meaning' },
        { label: '<span>', code: '<p>Price: <span class="price">€49</span></p>', note: 'Generic inline container, no meaning' },
        { label: 'Description list', code: '<dl>\n  <dt>HTML</dt>\n  <dd>Markup language</dd>\n  <dt>CSS</dt>\n  <dd>Style language</dd>\n</dl>', note: '<dl>/<dt>/<dd> for term-definition pairs' },
      ],
      patterns: [
        { title: 'Navigation menu', code: '<nav>\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/about">About</a></li>\n  </ul>\n</nav>', language: 'html' },
      ],
      whenToUse: 'Navigation menus should always be <ul> lists. Steps and procedures use <ol>. Use <div> and <span> only when no semantic element fits — they carry zero meaning.',
      commonMistakes: [
        'Putting block elements (<div>, <p>) inside inline elements (<span>, <a>) — invalid HTML',
        'Using <br> to separate items — use a proper list instead',
        'Skipping <li> inside <ul>/<ol> — direct children of lists must be <li>',
      ],
    },
  },
```

- [ ] **Step 5: Insert `html-media` topic**

Add this after the `html-forms` topic (at the end of the html topics block):

```ts
  {
    id: 'html-media',
    title: 'Media & Embeds',
    description: 'Embed video, audio, iframes, and responsive images with native HTML elements',
    level: 2,
    category: 'html',
    color: '#4ade80',
    estimatedMinutes: 10,
    animationComponent: 'MediaEmbedsViz',
    playgroundType: 'visual-controls',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: '<iframe> — page within a page',
            text: 'An <iframe> embeds another HTML document inside your page. YouTube embeds, Google Maps, and CodePen previews all use iframes. The embedded content runs in its own isolated browsing context.',
            codeExample: '<iframe\n  src="https://www.youtube.com/embed/dQw4w9WgXcQ"\n  width="560"\n  height="315"\n  title="Video title"\n  allowfullscreen\n></iframe>',
            language: 'html',
          },
          {
            animationStep: 1,
            heading: '<video>',
            text: 'The <video> element embeds video natively. The controls attribute adds play/pause/volume UI. Include multiple <source> elements for browser compatibility — the browser picks the first format it supports.',
            codeExample: '<video controls width="640" height="360">\n  <source src="video.mp4" type="video/mp4">\n  <source src="video.webm" type="video/webm">\n  Your browser does not support video.\n</video>',
            language: 'html',
          },
          {
            animationStep: 2,
            heading: '<audio>',
            text: '<audio> works the same as <video> but for sound. The controls attribute adds a player. Without controls, the audio is invisible and plays only with JavaScript.',
            codeExample: '<audio controls>\n  <source src="podcast.mp3" type="audio/mpeg">\n  <source src="podcast.ogg" type="audio/ogg">\n  Your browser does not support audio.\n</audio>',
            language: 'html',
          },
          {
            animationStep: 3,
            heading: '<picture> — responsive images',
            text: '<picture> serves different images based on screen size or format support. The browser picks the first matching <source>. The <img> fallback is always required — it\'s what actually renders the image.',
            codeExample: '<picture>\n  <source media="(min-width: 800px)" srcset="large.webp" type="image/webp">\n  <source media="(min-width: 400px)" srcset="medium.jpg">\n  <img src="small.jpg" alt="A mountain landscape">\n</picture>',
            language: 'html',
          },
          {
            animationStep: 4,
            heading: '<code> and <pre>',
            text: '<code> displays inline code in monospace font. Wrap it in <pre> to preserve whitespace and newlines for multi-line snippets. This is how documentation sites, READMEs, and tech blogs show code examples.',
            codeExample: '<p>Use the <code>console.log()</code> function.</p>\n\n<pre><code>function greet(name) {\n  return `Hello, ${name}!`\n}</code></pre>',
            language: 'html',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
    cheatSheet: {
      syntax: [
        { label: '<iframe>', code: '<iframe src="url" width="560" height="315"\n  title="Description" allowfullscreen></iframe>', note: 'Always set title for accessibility' },
        { label: '<video>', code: '<video controls width="640" height="360">\n  <source src="v.mp4" type="video/mp4">\n</video>', note: 'controls attribute shows UI' },
        { label: '<audio>', code: '<audio controls>\n  <source src="a.mp3" type="audio/mpeg">\n</audio>', note: 'Multiple sources for browser compat' },
        { label: '<picture>', code: '<picture>\n  <source srcset="large.webp" media="(min-width:800px)">\n  <img src="fallback.jpg" alt="...">\n</picture>', note: '<img> fallback is required' },
        { label: '<pre><code>', code: '<pre><code>const x = 1</code></pre>', note: 'Preserves whitespace + line breaks' },
        { label: 'Video autoplay', code: '<video autoplay muted loop playsinline>\n  <source src="bg.mp4" type="video/mp4">\n</video>', note: 'muted required for autoplay in browsers' },
      ],
      patterns: [
        { title: 'Responsive video wrapper', code: '<div style="position:relative; padding-bottom:56.25%; height:0;">\n  <iframe src="..." style="position:absolute; top:0; left:0; width:100%; height:100%;" allowfullscreen></iframe>\n</div>', language: 'html' },
      ],
      whenToUse: 'Use <video>/<audio> for self-hosted media. Use <iframe> for third-party embeds (YouTube, Maps). Use <picture> when you need different images for different screen sizes or format support.',
      commonMistakes: [
        'Missing title on <iframe> — required for screen readers',
        'Autoplay video without muted — browsers block autoplay with sound by default',
        'Omitting the <img> fallback in <picture> — the img is required, source elements are optional',
      ],
    },
  },
```

- [ ] **Step 6: Commit data layer changes**

```bash
cd /home/jaywee92/web-dev-guide
git add src/data/categories.ts src/data/topics.ts
git commit -m "feat: add 5 HTML topics to data layer (basics, text, links, lists, media)"
```

---

## Chunk 2: Viz components (part 1 — ElementsViz + TextHeadingsViz)

### Task 3: ElementsViz

**Files:**
- Create: `src/topics/html/ElementsViz.tsx`

- [ ] **Step 1: Create ElementsViz.tsx**

```tsx
// src/topics/html/ElementsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const YELLOW = '#f5c542'
const BLUE = '#5b9cf5'
const PURPLE = '#a78bfa'

const stepLabels = [
  'HTML elements are the building blocks of every webpage',
  'The opening tag names the element',
  'Content lives between the tags — text, or other elements',
  'The closing tag (with /) marks the end',
  'Attributes go inside the opening tag to configure the element',
]

// Anatomy animation: shows <a href="/about" class="link">About</a>
// broken into coloured parts

interface Part {
  text: string
  color: string
  label: string
  show: number  // visible from this step
  highlight: number[]  // highlighted (bright) during these steps
}

const PARTS: Part[] = [
  { text: '<a',         color: GREEN,  label: 'opening tag', show: 0, highlight: [0, 1] },
  { text: ' href',      color: YELLOW, label: 'attribute name', show: 4, highlight: [4] },
  { text: '="',         color: YELLOW, label: '',            show: 4, highlight: [4] },
  { text: '/about',     color: PURPLE, label: 'attribute value', show: 4, highlight: [4] },
  { text: '"',          color: YELLOW, label: '',            show: 4, highlight: [4] },
  { text: '>',          color: GREEN,  label: '',            show: 0, highlight: [0, 1] },
  { text: 'About',      color: BLUE,   label: 'content',     show: 2, highlight: [2] },
  { text: '</a>',       color: GREEN,  label: 'closing tag', show: 3, highlight: [3] },
]

export default function ElementsViz({ step, compact = false }: Props) {
  const fs = compact ? 11 : 15
  const labelFs = compact ? 8 : 10
  const px = compact ? 5 : 8
  const py = compact ? 3 : 5

  // Which parts are focused on this step
  const focusParts = PARTS.filter(p => p.highlight.includes(step))
  const hasFocus = focusParts.length > 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${GREEN}22`,
            border: `1px solid ${GREEN}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 9 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: GREEN,
            letterSpacing: '0.3px',
            textAlign: 'center',
            maxWidth: compact ? 200 : 340,
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Code anatomy */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: fs,
        fontWeight: 700,
        lineHeight: 1.5,
      }}>
        {PARTS.map((part, i) => {
          const visible = step >= part.show
          const isHighlighted = part.highlight.includes(step)
          const isDimmed = hasFocus && !isHighlighted && visible

          return (
            <AnimatePresence key={i}>
              {visible && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.85 }}
                  animate={{
                    opacity: isDimmed ? 0.25 : 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  style={{ position: 'relative', display: 'inline-block' }}
                >
                  <span style={{
                    color: part.color,
                    background: isHighlighted ? `${part.color}22` : 'transparent',
                    borderRadius: 4,
                    padding: `${py}px ${px}px`,
                    transition: 'background 0.25s',
                  }}>
                    {part.text}
                  </span>
                  {/* Label below */}
                  {isHighlighted && part.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        position: 'absolute',
                        bottom: compact ? -14 : -18,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: labelFs,
                        color: part.color,
                        whiteSpace: 'nowrap',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        letterSpacing: '0.3px',
                      }}
                    >
                      ↑ {part.label}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>

      {/* Void element note at step 3 */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: compact ? 9 : 10,
              color: YELLOW,
              fontFamily: 'var(--font-mono)',
              textAlign: 'center',
              opacity: 0.8,
            }}
          >
            {'<img>, <br>, <input> — void elements have no closing tag'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

---

### Task 4: TextHeadingsViz

**Files:**
- Create: `src/topics/html/TextHeadingsViz.tsx`

- [ ] **Step 1: Create TextHeadingsViz.tsx**

```tsx
// src/topics/html/TextHeadingsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const YELLOW = '#f5c542'
const PURPLE = '#a78bfa'
const PINK = '#ec4899'

const stepLabels = [
  'h1–h6 create a hierarchy — h1 is the most important',
  'Paragraphs separate blocks of text',
  '<strong> and <em> carry semantic meaning; <b> and <i> are purely visual',
  'Inline elements annotate text in-place',
  '<blockquote> and <pre><code> structure quoted and code content',
]

const HEADINGS = [
  { tag: 'h1', size: 22, label: 'Main title — one per page' },
  { tag: 'h2', size: 17, label: 'Section heading' },
  { tag: 'h3', size: 14, label: 'Subsection' },
  { tag: 'h4', size: 12, label: 'Sub-subsection' },
  { tag: 'h5', size: 10, label: '' },
  { tag: 'h6', size: 9,  label: '' },
]

export default function TextHeadingsViz({ step, compact = false }: Props) {
  const scale = compact ? 0.78 : 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${GREEN}22`,
            border: `1px solid ${GREEN}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 9 : 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: GREEN,
            textAlign: 'center',
            maxWidth: compact ? 200 : 340,
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Step 0: heading hierarchy */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, width: '100%', maxWidth: compact ? 180 : 280 }}
        >
          {HEADINGS.map((h, i) => (
            <motion.div
              key={h.tag}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: Math.round(h.size * scale),
                fontWeight: 800,
                color: GREEN,
                minWidth: compact ? 22 : 28,
              }}>
                {`<${h.tag}>`}
              </span>
              {h.label && (
                <span style={{
                  fontSize: Math.round(9 * scale),
                  color: 'var(--text-faint)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {h.label}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 1: paragraph */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: compact ? 180 : 280, textAlign: 'left' }}
        >
          <div style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: BLUE, marginBottom: 6 }}>
            {'<p>'}
          </div>
          <div style={{ fontSize: compact ? 10 : 12, color: 'var(--text-muted)', lineHeight: 1.5, padding: '0 8px' }}>
            Paragraphs create vertical breathing room. Browsers add margin above and below automatically.
          </div>
          <div style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: BLUE, marginTop: 6 }}>
            {'</p>'}
          </div>
          <div style={{ marginTop: 6, height: 1, background: 'var(--border)' }} />
          <div style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: BLUE, marginTop: 6 }}>
            {'<p>'}
          </div>
          <div style={{ fontSize: compact ? 10 : 12, color: 'var(--text-muted)', lineHeight: 1.5, padding: '0 8px', opacity: 0.6 }}>
            Next paragraph here…
          </div>
          <div style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: BLUE }}>
            {'</p>'}
          </div>
        </motion.div>
      )}

      {/* Step 2: strong/em vs b/i */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 200 : 300 }}
        >
          {[
            { tag: '<strong>', label: 'Semantic importance', color: GREEN, render: (s: number) => <strong style={{ color: GREEN, fontSize: s }}>Important</strong> },
            { tag: '<b>', label: 'Visual bold only', color: 'var(--text-muted)', render: (s: number) => <b style={{ color: 'var(--text-muted)', fontSize: s }}>Bold</b> },
            { tag: '<em>', label: 'Semantic emphasis', color: BLUE, render: (s: number) => <em style={{ color: BLUE, fontStyle: 'italic', fontSize: s }}>Emphasis</em> },
            { tag: '<i>', label: 'Visual italic only', color: 'var(--text-muted)', render: (s: number) => <i style={{ color: 'var(--text-muted)', fontSize: s }}>Italic</i> },
          ].map((row, i) => (
            <motion.div
              key={row.tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10 }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 9 : 11, color: row.color, minWidth: compact ? 60 : 80 }}>
                {row.tag}
              </span>
              <span style={{ fontSize: compact ? 9 : 11, color: 'var(--text-faint)', flex: 1 }}>
                {row.label}
              </span>
              {row.render(compact ? 11 : 13)}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 3: inline annotations */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? 6 : 8, justifyContent: 'center', maxWidth: compact ? 180 : 280 }}
        >
          {[
            { tag: 'mark', display: <mark>highlighted</mark>, color: YELLOW },
            { tag: 'del', display: <del>deleted</del>, color: '#f87171' },
            { tag: 'ins', display: <ins>inserted</ins>, color: GREEN },
            { tag: 'small', display: <small>small</small>, color: 'var(--text-muted)' },
            { tag: 'sub', display: <span>H<sub>2</sub>O</span>, color: BLUE },
            { tag: 'sup', display: <span>x<sup>2</sup></span>, color: PURPLE },
          ].map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              style={{
                border: `1px solid var(--border)`,
                borderRadius: 6,
                padding: compact ? '4px 8px' : '5px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <span style={{ fontSize: compact ? 9 : 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
                {`<${item.tag}>`}
              </span>
              <span style={{ fontSize: compact ? 11 : 13 }}>
                {item.display}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 4: blockquote + pre/code */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 180 : 280 }}
        >
          <div style={{
            borderLeft: `3px solid ${PINK}`,
            paddingLeft: compact ? 8 : 12,
            color: PINK,
            fontSize: compact ? 10 : 12,
            fontStyle: 'italic',
          }}>
            <div style={{ fontSize: compact ? 8 : 10, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginBottom: 4 }}>
              {'<blockquote>'}
            </div>
            "The best way to learn is by doing."
          </div>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 6,
            padding: compact ? '6px 10px' : '8px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 9 : 11,
            color: GREEN,
          }}>
            <div style={{ color: 'var(--text-faint)', marginBottom: 4 }}>{'<pre><code>'}</div>
            {'const x = 1'}<br />
            {'const y = 2'}
          </div>
        </motion.div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/topics/html/ElementsViz.tsx src/topics/html/TextHeadingsViz.tsx
git commit -m "feat: ElementsViz and TextHeadingsViz animation components"
```

---

## Chunk 3: Viz components (part 2 — LinksImagesViz + ListsViz)

### Task 5: LinksImagesViz

**Files:**
- Create: `src/topics/html/LinksImagesViz.tsx`

- [ ] **Step 1: Create LinksImagesViz.tsx**

```tsx
// src/topics/html/LinksImagesViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const YELLOW = '#f5c542'
const PURPLE = '#a78bfa'
const RED = '#f87171'

const stepLabels = [
  '<a> creates a link — href holds the destination',
  'Absolute URLs work from anywhere; relative URLs are for internal links',
  'target="_blank" opens in new tab — always add rel="noopener"',
  '<img> embeds images — src points to the file, alt describes it',
  'Alt text is read aloud by screen readers and shows when image fails',
]

export default function LinksImagesViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const fs = (n: number) => compact ? Math.round(n * 0.8) : n

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 12 : 18 }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${GREEN}22`,
            border: `1px solid ${GREEN}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: fs(10),
            fontFamily: mono,
            fontWeight: 700,
            color: GREEN,
            textAlign: 'center',
            maxWidth: compact ? 200 : 340,
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Step 0: <a> anatomy */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'center' }}
        >
          <div style={{ fontFamily: mono, fontSize: fs(13), fontWeight: 700, display: 'flex', gap: 0 }}>
            <span style={{ color: GREEN }}>{'<a '}</span>
            <span style={{ color: YELLOW, background: `${YELLOW}22`, borderRadius: 4, padding: '0 4px' }}>href</span>
            <span style={{ color: YELLOW }}>{'="'}</span>
            <span style={{ color: PURPLE, background: `${PURPLE}22`, borderRadius: 4, padding: '0 4px' }}>/about</span>
            <span style={{ color: YELLOW }}>{'"> '}</span>
            <span style={{ color: BLUE, background: `${BLUE}22`, borderRadius: 4, padding: '0 4px' }}>About</span>
            <span style={{ color: GREEN }}>{' </a>'}</span>
          </div>
          <div style={{ display: 'flex', gap: compact ? 12 : 20 }}>
            {[
              { color: GREEN, label: 'tag' },
              { color: YELLOW, label: 'attribute' },
              { color: PURPLE, label: 'destination' },
              { color: BLUE, label: 'link text' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: fs(9), fontFamily: mono }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
                <span style={{ color: item.color }}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 1: absolute vs relative */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 200 : 300 }}
        >
          {[
            {
              type: 'Absolute',
              color: BLUE,
              code: 'href="https://example.com/page"',
              note: 'Works from anywhere on the web',
            },
            {
              type: 'Relative',
              color: GREEN,
              code: 'href="/about"',
              note: 'Internal links — shorter, portable',
            },
            {
              type: 'Anchor',
              color: PURPLE,
              code: 'href="#section-id"',
              note: 'In-page jump navigation',
            },
          ].map((item, i) => (
            <motion.div key={item.type}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ borderLeft: `3px solid ${item.color}`, paddingLeft: compact ? 8 : 12 }}
            >
              <div style={{ fontSize: fs(9), color: item.color, fontFamily: mono, fontWeight: 700, marginBottom: 2 }}>
                {item.type}
              </div>
              <div style={{ fontSize: fs(10), color: 'var(--text)', fontFamily: mono }}>{item.code}</div>
              <div style={{ fontSize: fs(9), color: 'var(--text-faint)' }}>{item.note}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 2: target="_blank" + rel */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, maxWidth: compact ? 190 : 290 }}
        >
          <div style={{ fontFamily: mono, fontSize: fs(10), color: 'var(--text)' }}>
            {'<a href="url"'}
          </div>
          <div style={{ paddingLeft: compact ? 12 : 16, fontFamily: mono, fontSize: fs(10) }}>
            <span style={{ color: YELLOW }}>target</span>
            <span style={{ color: 'var(--text)' }}>{'="_blank"'}</span>
            <span style={{ fontSize: fs(9), color: GREEN, marginLeft: 8 }}>← opens new tab</span>
          </div>
          <div style={{ paddingLeft: compact ? 12 : 16, fontFamily: mono, fontSize: fs(10) }}>
            <span style={{ color: YELLOW }}>rel</span>
            <span style={{ color: 'var(--text)' }}>{'="noopener"'}</span>
            <span style={{ fontSize: fs(9), color: RED, marginLeft: 8 }}>← security!</span>
          </div>
          <div style={{ fontFamily: mono, fontSize: fs(10), color: 'var(--text)' }}>
            {'> External Link</a>'}
          </div>
          <div style={{
            marginTop: compact ? 4 : 6,
            background: `${YELLOW}14`,
            border: `1px solid ${YELLOW}33`,
            borderRadius: 6,
            padding: compact ? '4px 8px' : '6px 10px',
            fontSize: fs(9),
            color: YELLOW,
            fontFamily: mono,
          }}>
            Without rel="noopener", the new tab can access window.opener — a security risk
          </div>
        </motion.div>
      )}

      {/* Step 3: img anatomy */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'center' }}
        >
          <div style={{ fontFamily: mono, fontSize: fs(11), fontWeight: 700, textAlign: 'center' }}>
            <span style={{ color: GREEN }}>{'<img '}</span>
            <span style={{ color: YELLOW }}>src</span>
            <span style={{ color: 'var(--text)' }}>{'="'}</span>
            <span style={{ color: PURPLE }}>photo.jpg</span>
            <span style={{ color: 'var(--text)' }}>{"\" "}</span>
            <span style={{ color: YELLOW }}>alt</span>
            <span style={{ color: 'var(--text)' }}>{'="'}</span>
            <span style={{ color: BLUE }}>A sunset</span>
            <span style={{ color: 'var(--text)' }}>{"\" "}</span>
            <span style={{ color: GREEN }}>{'>'}</span>
          </div>
          {/* Visual image placeholder */}
          <div style={{
            width: compact ? 100 : 140,
            height: compact ? 60 : 80,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${PURPLE}33, ${BLUE}22)`,
            border: `2px solid ${PURPLE}55`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: compact ? 22 : 32,
          }}>
            🌅
          </div>
          <div style={{ fontSize: fs(9), color: 'var(--text-faint)', fontFamily: mono }}>
            Self-closing — no content, no closing tag
          </div>
        </motion.div>
      )}

      {/* Step 4: alt text importance */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 190 : 290 }}
        >
          {/* Good alt */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}
            style={{ borderLeft: `3px solid ${GREEN}`, paddingLeft: compact ? 8 : 12 }}
          >
            <div style={{ fontSize: fs(8), color: GREEN, fontFamily: mono, marginBottom: 3 }}>✓ Good</div>
            <div style={{
              fontFamily: mono, fontSize: fs(9), color: 'var(--text)',
              background: `${GREEN}11`, borderRadius: 4, padding: '3px 6px',
            }}>
              {'alt="A sunset over mountain peaks"'}
            </div>
            <div style={{ fontSize: fs(9), color: 'var(--text-faint)', marginTop: 2 }}>
              Describes the actual content
            </div>
          </motion.div>
          {/* Bad alt */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            style={{ borderLeft: `3px solid ${RED}`, paddingLeft: compact ? 8 : 12 }}
          >
            <div style={{ fontSize: fs(8), color: RED, fontFamily: mono, marginBottom: 3 }}>✗ Bad</div>
            <div style={{
              fontFamily: mono, fontSize: fs(9), color: 'var(--text)',
              background: `${RED}11`, borderRadius: 4, padding: '3px 6px',
            }}>
              {'alt="image" or alt="photo.jpg"'}
            </div>
            <div style={{ fontSize: fs(9), color: 'var(--text-faint)', marginTop: 2 }}>
              Useless to screen readers
            </div>
          </motion.div>
          {/* Decorative */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: compact ? 8 : 12 }}
          >
            <div style={{ fontSize: fs(8), color: BLUE, fontFamily: mono, marginBottom: 3 }}>Decorative</div>
            <div style={{
              fontFamily: mono, fontSize: fs(9), color: 'var(--text)',
              background: `${BLUE}11`, borderRadius: 4, padding: '3px 6px',
            }}>
              {'alt=""  (empty string)'}
            </div>
            <div style={{ fontSize: fs(9), color: 'var(--text-faint)', marginTop: 2 }}>
              Screen reader skips it entirely
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
```

---

### Task 6: ListsViz

**Files:**
- Create: `src/topics/html/ListsViz.tsx`

- [ ] **Step 1: Create ListsViz.tsx**

```tsx
// src/topics/html/ListsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const YELLOW = '#f5c542'
const PURPLE = '#a78bfa'
const PINK = '#ec4899'

const stepLabels = [
  '<ul> creates a bulleted list — use when order doesn\'t matter',
  '<ol> creates a numbered list — use when sequence matters',
  'Lists can nest: an <li> can contain another list',
  'Block elements fill full width; inline elements flow with text',
  '<div> groups block content; <span> groups inline content',
]

const UL_ITEMS = ['HTML', 'CSS', 'JavaScript']
const OL_ITEMS = ['Boil water', 'Add pasta', 'Cook 8 min']

export default function ListsViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const fs = (n: number) => compact ? Math.round(n * 0.82) : n

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${GREEN}22`,
            border: `1px solid ${GREEN}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: fs(10),
            fontFamily: mono,
            fontWeight: 700,
            color: GREEN,
            textAlign: 'center',
            maxWidth: compact ? 200 : 340,
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Step 0: ul */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}
        >
          <div style={{ fontFamily: mono, fontSize: fs(10), color: GREEN }}>{'<ul>'}</div>
          {UL_ITEMS.map((item, i) => (
            <motion.div key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 + 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10, paddingLeft: compact ? 14 : 20 }}
            >
              <div style={{ width: compact ? 5 : 6, height: compact ? 5 : 6, borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
              <span style={{ fontFamily: mono, fontSize: fs(10), color: BLUE }}>{'<li>'}</span>
              <span style={{ fontSize: fs(11), color: 'var(--text)' }}>{item}</span>
              <span style={{ fontFamily: mono, fontSize: fs(10), color: BLUE }}>{'</li>'}</span>
            </motion.div>
          ))}
          <div style={{ fontFamily: mono, fontSize: fs(10), color: GREEN }}>{'</ul>'}</div>
        </motion.div>
      )}

      {/* Step 1: ol */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}
        >
          <div style={{ fontFamily: mono, fontSize: fs(10), color: YELLOW }}>{'<ol>'}</div>
          {OL_ITEMS.map((item, i) => (
            <motion.div key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 + 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: compact ? 6 : 10, paddingLeft: compact ? 14 : 20 }}
            >
              <span style={{ fontFamily: mono, fontSize: fs(10), color: YELLOW, minWidth: compact ? 14 : 16 }}>{i + 1}.</span>
              <span style={{ fontFamily: mono, fontSize: fs(10), color: YELLOW }}>{'<li>'}</span>
              <span style={{ fontSize: fs(11), color: 'var(--text)' }}>{item}</span>
              <span style={{ fontFamily: mono, fontSize: fs(10), color: YELLOW }}>{'</li>'}</span>
            </motion.div>
          ))}
          <div style={{ fontFamily: mono, fontSize: fs(10), color: YELLOW }}>{'</ol>'}</div>
        </motion.div>
      )}

      {/* Step 2: nested list */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontFamily: mono, fontSize: fs(10), display: 'flex', flexDirection: 'column', gap: compact ? 2 : 3 }}
        >
          <div style={{ color: GREEN }}>{'<ul>'}</div>
          <div style={{ paddingLeft: compact ? 12 : 16 }}>
            <span style={{ color: BLUE }}>{'<li>'}</span>
            <span style={{ color: 'var(--text)' }}> Frontend</span>
            <div style={{ paddingLeft: compact ? 12 : 16 }}>
              <div style={{ color: PURPLE }}>{'<ul>'}</div>
              {['HTML', 'CSS'].map((item, i) => (
                <motion.div key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  style={{ paddingLeft: compact ? 10 : 14, color: PURPLE }}
                >
                  {`<li>${item}</li>`}
                </motion.div>
              ))}
              <div style={{ color: PURPLE }}>{'</ul>'}</div>
            </div>
            <span style={{ color: BLUE }}>{'</li>'}</span>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            style={{ paddingLeft: compact ? 12 : 16, color: BLUE }}
          >
            {'<li>Backend</li>'}
          </motion.div>
          <div style={{ color: GREEN }}>{'</ul>'}</div>
        </motion.div>
      )}

      {/* Step 3: block vs inline */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 190 : 290 }}
        >
          {/* Block */}
          <div>
            <div style={{ fontSize: fs(9), color: GREEN, fontFamily: mono, marginBottom: 4, fontWeight: 700 }}>
              Block — fills full width, new line
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 3 : 4 }}>
              {['<div>', '<p>', '<h2>'].map((tag, i) => (
                <motion.div key={tag}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: `${GREEN}18`,
                    border: `1px solid ${GREEN}44`,
                    borderRadius: 4,
                    padding: compact ? '3px 8px' : '4px 10px',
                    fontFamily: mono,
                    fontSize: fs(10),
                    color: GREEN,
                  }}
                >
                  {tag} <span style={{ color: 'var(--text-faint)', fontSize: fs(9) }}>fills full width</span>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Inline */}
          <div>
            <div style={{ fontSize: fs(9), color: BLUE, fontFamily: mono, marginBottom: 4, fontWeight: 700 }}>
              Inline — flows with text
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? 3 : 4 }}>
              {['<span>', '<a>', '<strong>'].map((tag, i) => (
                <motion.div key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: `${BLUE}18`,
                    border: `1px solid ${BLUE}44`,
                    borderRadius: 4,
                    padding: compact ? '3px 8px' : '4px 10px',
                    fontFamily: mono,
                    fontSize: fs(10),
                    color: BLUE,
                  }}
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 4: div vs span */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontFamily: mono, fontSize: fs(10), display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, maxWidth: compact ? 190 : 290 }}
        >
          <span style={{ color: GREEN }}>{'<div class="card">'}</span>
          <div style={{ paddingLeft: compact ? 12 : 18 }}>
            <span style={{ color: BLUE }}>{'<h2>'}</span>
            <span style={{ color: 'var(--text)' }}>Product</span>
            <span style={{ color: BLUE }}>{'</h2>'}</span>
          </div>
          <div style={{ paddingLeft: compact ? 12 : 18 }}>
            <span style={{ color: BLUE }}>{'<p>'}</span>
            <span style={{ color: 'var(--text)' }}> Price: </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ color: PINK }}
            >
              {'<span class="price">€49</span>'}
            </motion.span>
            <span style={{ color: BLUE }}>{'</p>'}</span>
          </div>
          <span style={{ color: GREEN }}>{'</div>'}</span>
          <div style={{
            marginTop: compact ? 4 : 6,
            fontSize: fs(9),
            color: 'var(--text-faint)',
            borderTop: '1px solid var(--border)',
            paddingTop: compact ? 4 : 6,
          }}>
            {'<div> = block container  ·  <span> = inline container'}
          </div>
        </motion.div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/topics/html/LinksImagesViz.tsx src/topics/html/ListsViz.tsx
git commit -m "feat: LinksImagesViz and ListsViz animation components"
```

---

## Chunk 4: MediaEmbedsViz + registry + build check

### Task 7: MediaEmbedsViz

**Files:**
- Create: `src/topics/html/MediaEmbedsViz.tsx`

- [ ] **Step 1: Create MediaEmbedsViz.tsx**

```tsx
// src/topics/html/MediaEmbedsViz.tsx
import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const GREEN = '#4ade80'
const BLUE = '#5b9cf5'
const YELLOW = '#f5c542'
const PURPLE = '#a78bfa'
const PINK = '#ec4899'
const CYAN = '#22d3ee'

const stepLabels = [
  '<iframe> embeds another HTML document inside your page',
  '<video> plays video natively — controls attribute adds the UI',
  '<audio> works the same as video, but for sound',
  '<picture> serves the right image for the right screen size',
  '<code> for inline code, <pre><code> for multi-line blocks',
]

export default function MediaEmbedsViz({ step, compact = false }: Props) {
  const mono = 'var(--font-mono)'
  const fs = (n: number) => compact ? Math.round(n * 0.8) : n

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 10 : 16 }}>
      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${GREEN}22`,
            border: `1px solid ${GREEN}55`,
            borderRadius: 6,
            padding: compact ? '4px 10px' : '5px 14px',
            fontSize: fs(10),
            fontFamily: mono,
            fontWeight: 700,
            color: GREEN,
            textAlign: 'center',
            maxWidth: compact ? 200 : 340,
          }}
        >
          {stepLabels[Math.min(step, 4)]}
        </motion.div>
      </AnimatePresence>

      {/* Step 0: iframe — page within a page */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 6 : 10 }}
        >
          {/* Outer page */}
          <div style={{
            width: compact ? 150 : 220,
            height: compact ? 100 : 140,
            border: `2px solid ${BLUE}`,
            borderRadius: 8,
            position: 'relative',
            background: 'rgba(91,156,245,0.06)',
            overflow: 'hidden',
          }}>
            <div style={{ fontSize: fs(8), color: BLUE, fontFamily: mono, padding: compact ? '4px 6px' : '6px 8px' }}>
              your-page.html
            </div>
            {/* iframe inside */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                position: 'absolute',
                left: compact ? 20 : 28,
                right: compact ? 8 : 12,
                bottom: compact ? 8 : 12,
                top: compact ? 26 : 32,
                border: `2px solid ${PURPLE}`,
                borderRadius: 5,
                background: `${PURPLE}12`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: compact ? 2 : 4,
              }}
            >
              <div style={{ fontSize: fs(7), color: PURPLE, fontFamily: mono }}>{'<iframe>'}</div>
              <div style={{ fontSize: fs(18) }}>🎬</div>
              <div style={{ fontSize: fs(7), color: 'var(--text-faint)' }}>embedded content</div>
            </motion.div>
          </div>
          <div style={{ fontFamily: mono, fontSize: fs(9), color: PURPLE, textAlign: 'center' }}>
            {'src="https://youtube.com/embed/..."'}
          </div>
        </motion.div>
      )}

      {/* Step 1: video */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, alignItems: 'center' }}
        >
          {/* Video player mockup */}
          <div style={{
            width: compact ? 160 : 220,
            background: '#000',
            borderRadius: 8,
            border: `2px solid ${BLUE}55`,
            overflow: 'hidden',
          }}>
            <div style={{
              height: compact ? 70 : 100,
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: compact ? 28 : 40,
            }}>🎬</div>
            {/* Controls bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                height: compact ? 22 : 30,
                background: 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: compact ? 6 : 8,
                padding: '0 8px',
              }}
            >
              {['▶', '🔊', '⛶'].map((icon, i) => (
                <span key={i} style={{ fontSize: compact ? 10 : 12, opacity: 0.8 }}>{icon}</span>
              ))}
              <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                <div style={{ width: '30%', height: '100%', background: BLUE, borderRadius: 2 }} />
              </div>
            </motion.div>
          </div>
          <div style={{ fontFamily: mono, fontSize: fs(9), color: BLUE, textAlign: 'center' }}>
            {'<video controls width="640" height="360">'}
          </div>
        </motion.div>
      )}

      {/* Step 2: audio */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, alignItems: 'center' }}
        >
          {/* Audio player mockup */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            style={{
              width: compact ? 160 : 220,
              height: compact ? 40 : 50,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              border: `2px solid ${GREEN}55`,
              display: 'flex',
              alignItems: 'center',
              gap: compact ? 6 : 8,
              padding: `0 ${compact ? 8 : 12}px`,
            }}
          >
            <span style={{ fontSize: compact ? 14 : 18 }}>▶</span>
            <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
              <div style={{ width: '45%', height: '100%', background: GREEN, borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: compact ? 8 : 10, color: 'var(--text-muted)', fontFamily: mono }}>2:34</span>
            <span style={{ fontSize: compact ? 12 : 16 }}>🔊</span>
          </motion.div>
          <div style={{ fontFamily: mono, fontSize: fs(9), color: GREEN, textAlign: 'center' }}>
            {'<audio controls>'}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: compact ? 3 : 4,
            maxWidth: compact ? 170 : 240,
          }}>
            {[
              { src: 'podcast.mp3', type: 'audio/mpeg', note: 'Chrome, Firefox, Safari' },
              { src: 'podcast.ogg', type: 'audio/ogg', note: 'Firefox fallback' },
            ].map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 + 0.2 }}
                style={{ fontFamily: mono, fontSize: fs(9), color: 'var(--text-faint)' }}
              >
                {`<source src="${item.src}" type="${item.type}">`}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 3: picture / responsive images */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10, maxWidth: compact ? 190 : 280 }}
        >
          {[
            { media: '(min-width: 800px)', src: 'large.webp', note: 'Desktop', color: PURPLE },
            { media: '(min-width: 400px)', src: 'medium.jpg', note: 'Tablet', color: BLUE },
            { media: null, src: 'small.jpg', note: 'Fallback <img>', color: GREEN },
          ].map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              style={{
                borderLeft: `3px solid ${item.color}`,
                paddingLeft: compact ? 8 : 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <div style={{ fontSize: fs(8), color: item.color, fontFamily: mono, fontWeight: 700 }}>
                {item.note}
              </div>
              {item.media ? (
                <div style={{ fontFamily: mono, fontSize: fs(9), color: 'var(--text)' }}>
                  {`<source media="${item.media}" srcset="${item.src}">`}
                </div>
              ) : (
                <div style={{ fontFamily: mono, fontSize: fs(9), color: item.color }}>
                  {`<img src="${item.src}" alt="...">`}
                </div>
              )}
            </motion.div>
          ))}
          <div style={{ fontSize: fs(9), color: 'var(--text-faint)', fontFamily: mono }}>
            Browser picks first matching source
          </div>
        </motion.div>
      )}

      {/* Step 4: code + pre/code */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, maxWidth: compact ? 190 : 280 }}
        >
          {/* Inline code */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <div style={{ fontSize: fs(9), color: 'var(--text-faint)', fontFamily: mono, marginBottom: 3 }}>
              Inline code:
            </div>
            <div style={{ fontSize: fs(11), color: 'var(--text)' }}>
              Use the{' '}
              <span style={{
                fontFamily: mono,
                fontSize: fs(10),
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 4,
                padding: '1px 5px',
                color: CYAN,
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                console.log()
              </span>
              {' '}function.
            </div>
          </motion.div>
          {/* Block code */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontSize: fs(9), color: 'var(--text-faint)', fontFamily: mono, marginBottom: 3 }}>
              {'<pre><code>:'}
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.35)',
              borderRadius: 6,
              padding: compact ? '6px 10px' : '8px 12px',
              fontFamily: mono,
              fontSize: fs(10),
              color: CYAN,
              lineHeight: 1.6,
            }}>
              {'function greet(name) {'}<br />
              {'  return `Hello, ${name}!`'}<br />
              {'}'}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
```

---

### Task 8: Register all 5 new viz components

**Files:**
- Modify: `src/topics/registry.ts`

- [ ] **Step 1: Add 5 imports to registry**

In `src/topics/registry.ts`, add after the existing html imports:
```ts
  ElementsViz:     () => import('./html/ElementsViz'),
  TextHeadingsViz: () => import('./html/TextHeadingsViz'),
  LinksImagesViz:  () => import('./html/LinksImagesViz'),
  ListsViz:        () => import('./html/ListsViz'),
  MediaEmbedsViz:  () => import('./html/MediaEmbedsViz'),
```

The full `lazyRegistry` block should have these html entries together:
```ts
  DomTreeBuilder:  () => import('./html/DomTreeBuilder'),
  SemanticViz:     () => import('./html/SemanticViz'),
  FormsViz:        () => import('./html/FormsViz'),
  ElementsViz:     () => import('./html/ElementsViz'),
  TextHeadingsViz: () => import('./html/TextHeadingsViz'),
  LinksImagesViz:  () => import('./html/LinksImagesViz'),
  ListsViz:        () => import('./html/ListsViz'),
  MediaEmbedsViz:  () => import('./html/MediaEmbedsViz'),
```

---

### Task 9: Build check and commit

**Files:**
- Modified: `src/topics/registry.ts`

- [ ] **Step 1: Run TypeScript build check**

```bash
cd /home/jaywee92/web-dev-guide
npm run build 2>&1 | tail -30
```

Expected: build succeeds with no TypeScript errors. If there are errors, fix them before proceeding.

- [ ] **Step 2: Commit remaining files**

```bash
git add src/topics/html/MediaEmbedsViz.tsx src/topics/registry.ts
git commit -m "feat: MediaEmbedsViz and registry — all 5 HTML viz components complete"
```

- [ ] **Step 3: Push and verify deploy**

```bash
git push origin main
```

Then confirm the GitHub Actions workflow deploys successfully. The homepage HTML category should now show 8 subcategory cards.

---

## Summary of changes

| File | Action |
|---|---|
| `src/data/categories.ts` | html.topicIds → 8 items; TOPIC_LABELS += 5 entries |
| `src/data/topics.ts` | +5 Topic objects (html-basics, html-text, html-links-images, html-lists, html-media) |
| `src/topics/html/ElementsViz.tsx` | NEW — element anatomy animation |
| `src/topics/html/TextHeadingsViz.tsx` | NEW — headings hierarchy + formatting tags |
| `src/topics/html/LinksImagesViz.tsx` | NEW — anchor + image anatomy |
| `src/topics/html/ListsViz.tsx` | NEW — ul/ol build-up + block vs inline |
| `src/topics/html/MediaEmbedsViz.tsx` | NEW — iframe/video/audio/picture visualizations |
| `src/topics/registry.ts` | +5 lazy import entries |
