# Reference Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `/reference/html` and `/reference/css` pages showing curated HTML elements and CSS properties by category, each linking to htmlreference.io / cssreference.io.

**Architecture:** Static curated data in two TypeScript files (`htmlReference.ts`, `cssReference.ts`). A single generic `ReferencePage` shell renders either dataset based on a `type` prop. Cards show name, description, code example, and an external deep-link. Navigation added to Navbar, Level Overview, and HTML/CSS topic headers.

**Tech Stack:** React 18, TypeScript, Framer Motion, Lucide React, existing CSS variables (`var(--green)`, `var(--blue)`, etc.), `@/components/ui/CodeBlock`, HashRouter.

---

## Task 1: Add types to src/types/index.ts

**Files:**
- Modify: `src/types/index.ts`

**Step 1: Append these two interfaces at the end of the file**

```typescript
export interface ReferenceEntry {
  name: string
  description: string
  example: string
  link: string
  tags?: string[]
}

export interface ReferenceCategory {
  id: string
  title: string
  color: string
  entries: ReferenceEntry[]
}
```

**Step 2: Verify TypeScript**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: no errors.

**Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add ReferenceEntry and ReferenceCategory types"
```

---

## Task 2: Create src/data/htmlReference.ts

**Files:**
- Create: `src/data/htmlReference.ts`

**Step 1: Create the file with full content**

```typescript
import type { ReferenceCategory } from '@/types'

export const HTML_REFERENCE: ReferenceCategory[] = [
  {
    id: 'structure',
    title: 'Structure',
    color: '#4ade80',
    entries: [
      {
        name: '<html>',
        description: 'Root element of every HTML document.',
        example: '<html lang="en">\n  <head>…</head>\n  <body>…</body>\n</html>',
        link: 'https://htmlreference.io/element/html/',
      },
      {
        name: '<head>',
        description: 'Contains metadata: title, links, scripts — nothing visible.',
        example: '<head>\n  <meta charset="UTF-8">\n  <title>Page</title>\n</head>',
        link: 'https://htmlreference.io/element/head/',
      },
      {
        name: '<body>',
        description: 'All visible page content lives here.',
        example: '<body>\n  <h1>Hello</h1>\n  <p>World</p>\n</body>',
        link: 'https://htmlreference.io/element/body/',
      },
      {
        name: '<main>',
        description: 'The primary content of the document. One per page.',
        example: '<main>\n  <h1>Article title</h1>\n  <p>Content…</p>\n</main>',
        link: 'https://htmlreference.io/element/main/',
      },
      {
        name: '<section>',
        description: 'A thematic grouping of content, usually with a heading.',
        example: '<section>\n  <h2>Features</h2>\n  <p>…</p>\n</section>',
        link: 'https://htmlreference.io/element/section/',
      },
      {
        name: '<article>',
        description: 'Self-contained content that makes sense on its own (blog post, card).',
        example: '<article>\n  <h2>Post title</h2>\n  <p>Body text…</p>\n</article>',
        link: 'https://htmlreference.io/element/article/',
      },
      {
        name: '<aside>',
        description: 'Content tangentially related to the main content (sidebar, callout).',
        example: '<aside>\n  <p>Related links…</p>\n</aside>',
        link: 'https://htmlreference.io/element/aside/',
      },
      {
        name: '<nav>',
        description: 'A section of navigation links.',
        example: '<nav>\n  <a href="/">Home</a>\n  <a href="/about">About</a>\n</nav>',
        link: 'https://htmlreference.io/element/nav/',
      },
      {
        name: '<header>',
        description: 'Introductory content or navigational aids for a page or section.',
        example: '<header>\n  <h1>Site Name</h1>\n  <nav>…</nav>\n</header>',
        link: 'https://htmlreference.io/element/header/',
      },
      {
        name: '<footer>',
        description: 'Footer for a page or section — copyright, links, contact.',
        example: '<footer>\n  <p>© 2026 My Site</p>\n</footer>',
        link: 'https://htmlreference.io/element/footer/',
      },
      {
        name: '<div>',
        description: 'Generic block-level container with no semantic meaning.',
        example: '<div class="card">\n  <p>Content</p>\n</div>',
        link: 'https://htmlreference.io/element/div/',
      },
    ],
  },
  {
    id: 'text',
    title: 'Text',
    color: '#5b9cf5',
    entries: [
      {
        name: '<h1> – <h6>',
        description: 'Section headings. h1 is the most important, h6 the least.',
        example: '<h1>Page Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>',
        link: 'https://htmlreference.io/element/h1/',
      },
      {
        name: '<p>',
        description: 'A paragraph of text.',
        example: '<p>This is a paragraph of body text.</p>',
        link: 'https://htmlreference.io/element/p/',
      },
      {
        name: '<a>',
        description: 'Hyperlink — navigates to a URL or anchor.',
        example: '<a href="https://example.com" target="_blank">\n  Visit site\n</a>',
        link: 'https://htmlreference.io/element/a/',
      },
      {
        name: '<strong>',
        description: 'Important text, rendered bold by default.',
        example: '<p>This is <strong>very important</strong>.</p>',
        link: 'https://htmlreference.io/element/strong/',
      },
      {
        name: '<em>',
        description: 'Emphasized text, rendered italic by default.',
        example: '<p>This is <em>emphasized</em> text.</p>',
        link: 'https://htmlreference.io/element/em/',
      },
      {
        name: '<span>',
        description: 'Generic inline container — no semantic meaning, used for styling.',
        example: '<p>Color: <span class="green">green</span></p>',
        link: 'https://htmlreference.io/element/span/',
      },
      {
        name: '<code>',
        description: 'Inline code snippet.',
        example: '<p>Use <code>npm install</code> to install.</p>',
        link: 'https://htmlreference.io/element/code/',
      },
      {
        name: '<pre>',
        description: 'Preformatted text — preserves whitespace and line breaks.',
        example: '<pre><code>function hello() {\n  return "hi"\n}</code></pre>',
        link: 'https://htmlreference.io/element/pre/',
      },
      {
        name: '<blockquote>',
        description: 'A block of quoted content from another source.',
        example: '<blockquote cite="https://example.com">\n  <p>Quote text here.</p>\n</blockquote>',
        link: 'https://htmlreference.io/element/blockquote/',
      },
      {
        name: '<br>',
        description: 'Line break — use sparingly, prefer CSS margins.',
        example: '<p>Line one<br>Line two</p>',
        link: 'https://htmlreference.io/element/br/',
      },
    ],
  },
  {
    id: 'lists',
    title: 'Lists',
    color: '#a78bfa',
    entries: [
      {
        name: '<ul>',
        description: 'Unordered (bulleted) list.',
        example: '<ul>\n  <li>Apples</li>\n  <li>Oranges</li>\n</ul>',
        link: 'https://htmlreference.io/element/ul/',
      },
      {
        name: '<ol>',
        description: 'Ordered (numbered) list.',
        example: '<ol>\n  <li>First step</li>\n  <li>Second step</li>\n</ol>',
        link: 'https://htmlreference.io/element/ol/',
      },
      {
        name: '<li>',
        description: 'A list item inside ul, ol, or menu.',
        example: '<ul>\n  <li>Item one</li>\n  <li>Item two</li>\n</ul>',
        link: 'https://htmlreference.io/element/li/',
      },
      {
        name: '<dl>',
        description: 'Description list — pairs of terms and definitions.',
        example: '<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language</dd>\n</dl>',
        link: 'https://htmlreference.io/element/dl/',
      },
      {
        name: '<dt>',
        description: 'The term in a description list.',
        example: '<dl>\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets</dd>\n</dl>',
        link: 'https://htmlreference.io/element/dt/',
      },
      {
        name: '<dd>',
        description: 'The definition/description paired with a dt term.',
        example: '<dl>\n  <dt>JS</dt>\n  <dd>JavaScript — the language of the web.</dd>\n</dl>',
        link: 'https://htmlreference.io/element/dd/',
      },
    ],
  },
  {
    id: 'media',
    title: 'Media',
    color: '#22d3ee',
    entries: [
      {
        name: '<img>',
        description: 'Embeds an image. Always include alt for accessibility.',
        example: '<img src="photo.jpg" alt="A mountain landscape" width="800">',
        link: 'https://htmlreference.io/element/img/',
      },
      {
        name: '<video>',
        description: 'Embeds a video with optional controls.',
        example: '<video src="clip.mp4" controls width="640">\n  Not supported.\n</video>',
        link: 'https://htmlreference.io/element/video/',
      },
      {
        name: '<audio>',
        description: 'Embeds an audio player.',
        example: '<audio src="song.mp3" controls>\n  Not supported.\n</audio>',
        link: 'https://htmlreference.io/element/audio/',
      },
      {
        name: '<figure>',
        description: 'Self-contained media content, often with a caption.',
        example: '<figure>\n  <img src="chart.png" alt="Sales chart">\n  <figcaption>Q1 Sales</figcaption>\n</figure>',
        link: 'https://htmlreference.io/element/figure/',
      },
      {
        name: '<figcaption>',
        description: 'Caption for a figure element.',
        example: '<figure>\n  <img src="photo.jpg" alt="Sunset">\n  <figcaption>Sunset over the Alps</figcaption>\n</figure>',
        link: 'https://htmlreference.io/element/figcaption/',
      },
      {
        name: '<picture>',
        description: 'Container for responsive images with multiple sources.',
        example: '<picture>\n  <source media="(min-width:800px)" srcset="large.jpg">\n  <img src="small.jpg" alt="Hero">\n</picture>',
        link: 'https://htmlreference.io/element/picture/',
      },
    ],
  },
  {
    id: 'forms',
    title: 'Forms',
    color: '#f5c542',
    entries: [
      {
        name: '<form>',
        description: 'A collection of inputs that submit data to a server.',
        example: '<form action="/submit" method="post">\n  …\n  <button type="submit">Send</button>\n</form>',
        link: 'https://htmlreference.io/element/form/',
      },
      {
        name: '<input>',
        description: 'Interactive control — text, email, checkbox, radio, file, and more.',
        example: '<input type="email" name="email" placeholder="you@example.com" required>',
        link: 'https://htmlreference.io/element/input/',
      },
      {
        name: '<label>',
        description: 'Associates a text label with a form control.',
        example: '<label for="name">Full name</label>\n<input id="name" type="text">',
        link: 'https://htmlreference.io/element/label/',
      },
      {
        name: '<button>',
        description: 'A clickable button — submit, reset, or generic.',
        example: '<button type="submit">Save changes</button>\n<button type="button">Cancel</button>',
        link: 'https://htmlreference.io/element/button/',
      },
      {
        name: '<select>',
        description: 'A dropdown list of options.',
        example: '<select name="level">\n  <option value="1">Beginner</option>\n  <option value="2">Advanced</option>\n</select>',
        link: 'https://htmlreference.io/element/select/',
      },
      {
        name: '<textarea>',
        description: 'Multi-line text input.',
        example: '<textarea name="bio" rows="4" cols="40">\nWrite something…\n</textarea>',
        link: 'https://htmlreference.io/element/textarea/',
      },
      {
        name: '<fieldset>',
        description: 'Groups related form controls with an optional legend.',
        example: '<fieldset>\n  <legend>Account type</legend>\n  <input type="radio" name="type" value="free"> Free\n  <input type="radio" name="type" value="pro"> Pro\n</fieldset>',
        link: 'https://htmlreference.io/element/fieldset/',
      },
    ],
  },
  {
    id: 'tables',
    title: 'Tables',
    color: '#f59e42',
    entries: [
      {
        name: '<table>',
        description: 'Displays tabular data in rows and columns.',
        example: '<table>\n  <thead>…</thead>\n  <tbody>…</tbody>\n</table>',
        link: 'https://htmlreference.io/element/table/',
      },
      {
        name: '<thead>',
        description: 'Groups the header rows of a table.',
        example: '<thead>\n  <tr>\n    <th>Name</th>\n    <th>Score</th>\n  </tr>\n</thead>',
        link: 'https://htmlreference.io/element/thead/',
      },
      {
        name: '<tbody>',
        description: 'Groups the body rows of a table.',
        example: '<tbody>\n  <tr>\n    <td>Alice</td>\n    <td>95</td>\n  </tr>\n</tbody>',
        link: 'https://htmlreference.io/element/tbody/',
      },
      {
        name: '<tr>',
        description: 'A table row containing th or td cells.',
        example: '<tr>\n  <td>Row 1, Col 1</td>\n  <td>Row 1, Col 2</td>\n</tr>',
        link: 'https://htmlreference.io/element/tr/',
      },
      {
        name: '<th>',
        description: 'A header cell — bold and centered by default.',
        example: '<tr>\n  <th scope="col">Name</th>\n  <th scope="col">Age</th>\n</tr>',
        link: 'https://htmlreference.io/element/th/',
      },
      {
        name: '<td>',
        description: 'A data cell in a table row.',
        example: '<tr>\n  <td>Alice</td>\n  <td>30</td>\n</tr>',
        link: 'https://htmlreference.io/element/td/',
      },
    ],
  },
]
```

**Step 2: Verify TypeScript**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: no errors.

**Step 3: Commit**

```bash
git add src/data/htmlReference.ts
git commit -m "feat: HTML reference data (6 categories, ~50 entries)"
```

---

## Task 3: Create src/data/cssReference.ts

**Files:**
- Create: `src/data/cssReference.ts`

**Step 1: Create the file with full content**

```typescript
import type { ReferenceCategory } from '@/types'

export const CSS_REFERENCE: ReferenceCategory[] = [
  {
    id: 'typography',
    title: 'Typography',
    color: '#4ade80',
    entries: [
      {
        name: 'font-size',
        description: 'Sets the size of the font.',
        example: 'p {\n  font-size: 16px;\n  /* also: 1rem, 1.2em, clamp(14px,2vw,18px) */\n}',
        link: 'https://cssreference.io/property/font-size/',
      },
      {
        name: 'font-weight',
        description: 'Sets the boldness of the font.',
        example: 'h1 { font-weight: 700; }\np  { font-weight: 400; } /* normal */\n.light { font-weight: 300; }',
        link: 'https://cssreference.io/property/font-weight/',
      },
      {
        name: 'font-family',
        description: 'Sets the typeface. List fallbacks separated by commas.',
        example: 'body {\n  font-family: "DM Sans", system-ui, sans-serif;\n}',
        link: 'https://cssreference.io/property/font-family/',
      },
      {
        name: 'line-height',
        description: 'Sets the height of a line of text. Unitless values are recommended.',
        example: 'p {\n  line-height: 1.6;\n  /* 1.6× the font-size */\n}',
        link: 'https://cssreference.io/property/line-height/',
      },
      {
        name: 'letter-spacing',
        description: 'Sets space between characters.',
        example: '.label {\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}',
        link: 'https://cssreference.io/property/letter-spacing/',
      },
      {
        name: 'text-align',
        description: 'Aligns inline content horizontally within a block.',
        example: '.center { text-align: center; }\n.right  { text-align: right; }\n.left   { text-align: left; }',
        link: 'https://cssreference.io/property/text-align/',
      },
      {
        name: 'text-decoration',
        description: 'Adds underline, overline, or line-through to text.',
        example: 'a             { text-decoration: underline; }\n.no-underline { text-decoration: none; }',
        link: 'https://cssreference.io/property/text-decoration/',
      },
      {
        name: 'color',
        description: 'Sets the foreground (text) color.',
        example: 'p {\n  color: #e2e4ed;\n  /* hex, rgb(), hsl(), named color */\n}',
        link: 'https://cssreference.io/property/color/',
      },
    ],
  },
  {
    id: 'box-model',
    title: 'Box Model',
    color: '#5b9cf5',
    entries: [
      {
        name: 'width / height',
        description: 'Sets the size of an element\'s content box.',
        example: '.box {\n  width: 300px;\n  height: 200px;\n  /* also: %, vw, vh, auto */\n}',
        link: 'https://cssreference.io/property/width/',
      },
      {
        name: 'max-width',
        description: 'Caps the maximum width — essential for readable text columns.',
        example: '.container {\n  max-width: 1100px;\n  margin: 0 auto;\n}',
        link: 'https://cssreference.io/property/max-width/',
      },
      {
        name: 'padding',
        description: 'Inner space between content and border. Shares the background.',
        example: '.card {\n  padding: 24px;\n  /* shorthand: top right bottom left */\n}',
        link: 'https://cssreference.io/property/padding/',
      },
      {
        name: 'margin',
        description: 'Outer space between element and its neighbors.',
        example: '.section {\n  margin: 0 auto;     /* center horizontally */\n  margin-bottom: 48px;\n}',
        link: 'https://cssreference.io/property/margin/',
      },
      {
        name: 'border',
        description: 'Shorthand for border-width, border-style, border-color.',
        example: '.input {\n  border: 1px solid #2e3348;\n  border-radius: 8px;\n}',
        link: 'https://cssreference.io/property/border/',
      },
      {
        name: 'box-sizing',
        description: 'Controls whether padding/border are included in width/height.',
        example: '* {\n  box-sizing: border-box;\n  /* padding no longer adds to width */\n}',
        link: 'https://cssreference.io/property/box-sizing/',
      },
      {
        name: 'overflow',
        description: 'What happens when content exceeds the element\'s box.',
        example: '.scroll {\n  overflow: auto;   /* scrollbar when needed */\n}\n.clip {\n  overflow: hidden; /* cut off */\n}',
        link: 'https://cssreference.io/property/overflow/',
      },
    ],
  },
  {
    id: 'flexbox',
    title: 'Flexbox',
    color: '#a78bfa',
    entries: [
      {
        name: 'display: flex',
        description: 'Turns an element into a flex container. Children become flex items.',
        example: '.container {\n  display: flex;\n}',
        link: 'https://cssreference.io/property/display/',
      },
      {
        name: 'flex-direction',
        description: 'Sets the main axis — row (horizontal) or column (vertical).',
        example: '.row    { flex-direction: row; }\n.column { flex-direction: column; }',
        link: 'https://cssreference.io/property/flex-direction/',
      },
      {
        name: 'justify-content',
        description: 'Aligns items along the main axis.',
        example: '.spread  { justify-content: space-between; }\n.center  { justify-content: center; }\n.start   { justify-content: flex-start; }',
        link: 'https://cssreference.io/property/justify-content/',
      },
      {
        name: 'align-items',
        description: 'Aligns items along the cross axis (perpendicular to main).',
        example: '.centered {\n  display: flex;\n  align-items: center; /* vertical center */\n}',
        link: 'https://cssreference.io/property/align-items/',
      },
      {
        name: 'flex-wrap',
        description: 'Allows flex items to wrap onto multiple lines.',
        example: '.grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}',
        link: 'https://cssreference.io/property/flex-wrap/',
      },
      {
        name: 'gap',
        description: 'Sets spacing between flex (or grid) items.',
        example: '.container {\n  display: flex;\n  gap: 16px;        /* row and column gap */\n  gap: 8px 16px;   /* row-gap column-gap */\n}',
        link: 'https://cssreference.io/property/gap/',
      },
      {
        name: 'flex',
        description: 'Shorthand for flex-grow, flex-shrink, flex-basis.',
        example: '.item         { flex: 1; }    /* grow to fill */\n.fixed-item   { flex: 0 0 200px; } /* fixed 200px */\n.no-shrink    { flex-shrink: 0; }',
        link: 'https://cssreference.io/property/flex/',
      },
      {
        name: 'align-self',
        description: 'Overrides align-items for a single flex item.',
        example: '.container { display: flex; align-items: center; }\n.top-item  { align-self: flex-start; }',
        link: 'https://cssreference.io/property/align-self/',
      },
    ],
  },
  {
    id: 'grid',
    title: 'Grid',
    color: '#22d3ee',
    entries: [
      {
        name: 'display: grid',
        description: 'Turns an element into a grid container.',
        example: '.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}',
        link: 'https://cssreference.io/property/display/',
      },
      {
        name: 'grid-template-columns',
        description: 'Defines the number and size of columns.',
        example: '.three-col {\n  grid-template-columns: 1fr 1fr 1fr;\n}\n.auto-fill {\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n}',
        link: 'https://cssreference.io/property/grid-template-columns/',
      },
      {
        name: 'grid-template-rows',
        description: 'Defines the number and size of rows.',
        example: '.layout {\n  grid-template-rows: 60px 1fr 80px;\n  /* header, content, footer */\n}',
        link: 'https://cssreference.io/property/grid-template-rows/',
      },
      {
        name: 'grid-column',
        description: 'Sets which columns a grid item spans.',
        example: '.full-width {\n  grid-column: 1 / -1; /* span all columns */\n}\n.two-span {\n  grid-column: span 2;\n}',
        link: 'https://cssreference.io/property/grid-column/',
      },
      {
        name: 'grid-row',
        description: 'Sets which rows a grid item spans.',
        example: '.tall {\n  grid-row: 1 / 3; /* span rows 1 and 2 */\n}',
        link: 'https://cssreference.io/property/grid-row/',
      },
      {
        name: 'place-items',
        description: 'Shorthand for align-items + justify-items — centers grid children.',
        example: '.centered-grid {\n  display: grid;\n  place-items: center;\n}',
        link: 'https://cssreference.io/property/place-items/',
      },
    ],
  },
  {
    id: 'visual',
    title: 'Visual',
    color: '#f5c542',
    entries: [
      {
        name: 'background',
        description: 'Shorthand for all background properties — color, image, position, size.',
        example: '.hero {\n  background: #0f1117;\n  background: linear-gradient(135deg, #4ade80, #5b9cf5);\n}',
        link: 'https://cssreference.io/property/background/',
      },
      {
        name: 'border-radius',
        description: 'Rounds the corners of an element\'s border.',
        example: '.pill   { border-radius: 999px; }\n.card   { border-radius: 12px; }\n.circle { border-radius: 50%; }',
        link: 'https://cssreference.io/property/border-radius/',
      },
      {
        name: 'box-shadow',
        description: 'Adds shadow effects around an element\'s frame.',
        example: '.card {\n  box-shadow: 0 4px 24px rgba(0,0,0,0.3);\n  /* x y blur spread color */\n}',
        link: 'https://cssreference.io/property/box-shadow/',
      },
      {
        name: 'opacity',
        description: 'Sets the transparency of an element (0 = invisible, 1 = full).',
        example: '.disabled { opacity: 0.4; }\n.hover:hover { opacity: 0.8; }',
        link: 'https://cssreference.io/property/opacity/',
      },
      {
        name: 'transform',
        description: 'Applies 2D/3D transformations — translate, rotate, scale, skew.',
        example: '.hover:hover {\n  transform: translateY(-4px) scale(1.02);\n}',
        link: 'https://cssreference.io/property/transform/',
      },
      {
        name: 'transition',
        description: 'Animates property changes over time.',
        example: '.button {\n  transition: background 0.2s ease, transform 0.2s ease;\n}',
        link: 'https://cssreference.io/property/transition/',
      },
      {
        name: 'cursor',
        description: 'Changes the mouse cursor appearance over an element.',
        example: '.clickable { cursor: pointer; }\n.disabled  { cursor: not-allowed; }',
        link: 'https://cssreference.io/property/cursor/',
      },
    ],
  },
  {
    id: 'position',
    title: 'Position',
    color: '#ec4899',
    entries: [
      {
        name: 'position',
        description: 'Sets the positioning scheme for an element.',
        example: '.fixed-nav { position: fixed; top: 0; }\n.relative  { position: relative; }\n.overlay   { position: absolute; inset: 0; }',
        link: 'https://cssreference.io/property/position/',
      },
      {
        name: 'top / right / bottom / left',
        description: 'Offsets a positioned element from its containing block.',
        example: '.tooltip {\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n}',
        link: 'https://cssreference.io/property/top/',
      },
      {
        name: 'z-index',
        description: 'Controls the stacking order. Higher values appear on top.',
        example: '.modal   { z-index: 100; }\n.overlay { z-index: 99; }\n.navbar  { z-index: 50; }',
        link: 'https://cssreference.io/property/z-index/',
      },
      {
        name: 'inset',
        description: 'Shorthand for top + right + bottom + left. Sets all four at once.',
        example: '.fullscreen {\n  position: fixed;\n  inset: 0; /* fills entire viewport */\n}',
        link: 'https://cssreference.io/property/inset/',
      },
    ],
  },
]
```

**Step 2: Verify TypeScript**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: no errors.

**Step 3: Commit**

```bash
git add src/data/cssReference.ts
git commit -m "feat: CSS reference data (6 categories, ~50 entries)"
```

---

## Task 4: Create ReferenceCard component

**Files:**
- Create: `src/pages/ReferencePage/ReferenceCard.tsx`

**Step 1: Create the directory and file**

```typescript
import { ExternalLink } from 'lucide-react'
import type { ReferenceEntry } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'

interface Props {
  entry: ReferenceEntry
  accentColor: string
}

export default function ReferenceCard({ entry, accentColor }: Props) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 8,
          padding: '14px 16px 10px',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              fontWeight: 700,
              color: accentColor,
              marginBottom: 4,
            }}
          >
            {entry.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {entry.description}
          </div>
        </div>
        <a
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--text-faint)',
            flexShrink: 0,
            padding: '2px 4px',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = accentColor)}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-faint)')}
          title={`Open on ${entry.link.includes('htmlreference') ? 'htmlreference.io' : 'cssreference.io'}`}
        >
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Code example */}
      <div style={{ padding: '0 0 0 0', borderTop: '1px solid var(--border)' }}>
        <CodeBlock code={entry.example} />
      </div>
    </div>
  )
}
```

**Step 2: Verify TypeScript**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: no errors.

---

## Task 5: Create CategorySection component

**Files:**
- Create: `src/pages/ReferencePage/CategorySection.tsx`

**Step 1: Create the file**

```typescript
import { motion } from 'framer-motion'
import type { ReferenceCategory } from '@/types'
import ReferenceCard from './ReferenceCard'

interface Props {
  category: ReferenceCategory
  id: string
}

export default function CategorySection({ category, id }: Props) {
  return (
    <section id={id} style={{ marginBottom: 64 }}>
      {/* Category header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 24,
          paddingBottom: 12,
          borderBottom: `1px solid ${category.color}33`,
        }}
      >
        <div
          style={{
            width: 4,
            height: 20,
            borderRadius: 2,
            background: category.color,
            flexShrink: 0,
          }}
        />
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--text)',
          }}
        >
          {category.title}
        </h2>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-faint)',
            background: 'var(--surface-bright)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: '2px 8px',
          }}
        >
          {category.entries.length}
        </span>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}
      >
        {category.entries.map((entry, i) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <ReferenceCard entry={entry} accentColor={category.color} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

**Step 2: Verify TypeScript**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: no errors.

---

## Task 6: Create ReferencePage shell

**Files:**
- Create: `src/pages/ReferencePage/index.tsx`

**Step 1: Create the file**

```typescript
import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { HTML_REFERENCE } from '@/data/htmlReference'
import { CSS_REFERENCE } from '@/data/cssReference'
import PageWrapper from '@/components/layout/PageWrapper'
import CategorySection from './CategorySection'

interface Props {
  type: 'html' | 'css'
}

const META = {
  html: {
    title: 'HTML Reference',
    subtitle: 'Essential elements organized by category',
    siteUrl: 'https://htmlreference.io',
    siteName: 'htmlreference.io',
    color: '#4ade80',
    data: HTML_REFERENCE,
  },
  css: {
    title: 'CSS Reference',
    subtitle: 'Essential properties organized by category',
    siteUrl: 'https://cssreference.io',
    siteName: 'cssreference.io',
    color: '#5b9cf5',
    data: CSS_REFERENCE,
  },
}

export default function ReferencePage({ type }: Props) {
  const meta = META[type]
  const [activeCategory, setActiveCategory] = useState(meta.data[0]?.id ?? '')

  // Update active tab on scroll using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    meta.data.forEach(cat => {
      const el = document.getElementById(`cat-${cat.id}`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveCategory(cat.id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [meta.data])

  const scrollToCategory = (id: string) => {
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageWrapper>
      {/* Header */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '48px 24px 32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
          <div>
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                color: 'var(--text)',
                marginBottom: 8,
              }}
            >
              {meta.title}
            </h1>
            <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>{meta.subtitle}</p>
          </div>
          <a
            href={meta.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              background: `${meta.color}18`,
              border: `1px solid ${meta.color}44`,
              color: meta.color,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <ExternalLink size={12} />
            {meta.siteName}
          </a>
        </div>
      </div>

      {/* Sticky category tabs */}
      <div
        style={{
          position: 'sticky',
          top: 56,
          zIndex: 40,
          background: 'rgba(15,17,23,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          marginBottom: 0,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            gap: 0,
            overflowX: 'auto',
          }}
        >
          {meta.data.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              style={{
                padding: '12px 16px',
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeCategory === cat.id ? cat.color : 'transparent'}`,
                color: activeCategory === cat.id ? cat.color : 'var(--text-muted)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
        {meta.data.map(cat => (
          <CategorySection key={cat.id} id={`cat-${cat.id}`} category={cat} />
        ))}
      </div>
    </PageWrapper>
  )
}
```

**Step 2: Verify TypeScript**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: no errors.

**Step 3: Commit**

```bash
git add src/pages/ReferencePage/ src/data/htmlReference.ts src/data/cssReference.ts
git commit -m "feat: ReferenceCard, CategorySection, ReferencePage shell"
```

---

## Task 7: Wire routes in App.tsx

**Files:**
- Modify: `src/App.tsx`

**Step 1: Read current App.tsx**

Read `/home/jaywee92/web-dev-guide/src/App.tsx` to see the current imports and routes.

**Step 2: Add import for ReferencePage**

Add after the existing page imports:

```typescript
import ReferencePage from '@/pages/ReferencePage'
```

**Step 3: Add two routes inside `<Routes>`**

Add after the existing `/search` route:

```typescript
<Route path="/reference/html" element={<ReferencePage type="html" />} />
<Route path="/reference/css" element={<ReferencePage type="css" />} />
```

**Step 4: Verify TypeScript**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: no errors.

**Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add /reference/html and /reference/css routes"
```

---

## Task 8: Add Reference dropdown to Navbar

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

**Step 1: Read current Navbar.tsx**

Read `/home/jaywee92/web-dev-guide/src/components/layout/Navbar.tsx` to see the current structure.

**Step 2: Replace the entire file with this updated version**

```typescript
import { Link, useNavigate } from 'react-router-dom'
import { Search, Sun, Moon, Code2, BookOpen, ChevronDown } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useEffect, useState, useRef } from 'react'

export default function Navbar() {
  const { theme, toggleTheme, setSearchOpen } = useAppStore()
  const [refOpen, setRefOpen] = useState(false)
  const refRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Cmd+K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setSearchOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (refRef.current && !refRef.current.contains(e.target as Node)) {
        setRefOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const goRef = (path: string) => {
    navigate(path)
    setRefOpen(false)
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b flex items-center justify-between px-6 h-14"
      style={{
        background: 'rgba(15,17,23,0.8)',
        backdropFilter: 'blur(20px)',
        borderColor: 'var(--border)',
      }}
    >
      <Link to="/" className="flex items-center gap-2 font-semibold" style={{ color: 'var(--text)', textDecoration: 'none' }}>
        <Code2 size={20} style={{ color: 'var(--green)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>web-dev-guide</span>
      </Link>

      <div className="flex items-center gap-2">
        {/* Reference dropdown */}
        <div ref={refRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setRefOpen(o => !o)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
            style={{
              background: refOpen ? 'var(--surface-bright)' : 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            <BookOpen size={13} />
            <span>Reference</span>
            <ChevronDown size={12} style={{ transform: refOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          {refOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: 6,
                minWidth: 160,
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                zIndex: 60,
              }}
            >
              {[
                { label: 'HTML Reference', path: '/reference/html', color: '#4ade80' },
                { label: 'CSS Reference', path: '/reference/css', color: '#5b9cf5' },
              ].map(item => (
                <button
                  key={item.path}
                  onClick={() => goRef(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '8px 10px',
                    background: 'none',
                    border: 'none',
                    borderRadius: 6,
                    color: 'var(--text)',
                    fontSize: 13,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-bright)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <Search size={14} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>⌘K</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-all"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  )
}
```

**Step 5: Verify TypeScript**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: no errors.

**Step 6: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: Reference dropdown in Navbar"
```

---

## Task 9: Add Quick Reference row to Level 1 overview + reference links to HTML/CSS topic headers

**Files:**
- Modify: `src/pages/LevelOverview/index.tsx`
- Modify: `src/pages/TopicPage/index.tsx`

**Step 1: Read both files**

Read:
- `/home/jaywee92/web-dev-guide/src/pages/LevelOverview/index.tsx`
- `/home/jaywee92/web-dev-guide/src/pages/TopicPage/index.tsx`

**Step 2: Update LevelOverview — add Quick Reference row for Level 1**

In `src/pages/LevelOverview/index.tsx`, add this import:

```typescript
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
```

After the `<p style={{ color: 'var(--text-muted)', marginBottom: 48 }}>` paragraph and before `<StaggerChildren>`, add this block (only shown when `level.id === 1`):

```typescript
{level.id === 1 && (
  <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
    {[
      { label: 'HTML Reference', path: '/reference/html', color: '#4ade80' },
      { label: 'CSS Reference', path: '/reference/css', color: '#5b9cf5' },
    ].map(ref => (
      <Link
        key={ref.path}
        to={ref.path}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          borderRadius: 8,
          background: `${ref.color}12`,
          border: `1px solid ${ref.color}33`,
          color: ref.color,
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        <ExternalLink size={11} />
        {ref.label}
      </Link>
    ))}
  </div>
)}
```

**Step 3: Update TopicPage — add reference link for HTML/CSS topics**

In `src/pages/TopicPage/index.tsx`, add this import:

```typescript
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
```

After the description `<p>` tag and before the closing `</div>` of the header block, add:

```typescript
{(topic.id.startsWith('html') || topic.id.startsWith('css')) && (
  <Link
    to={topic.id.startsWith('html') ? '/reference/html' : '/reference/css'}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 12,
      color: 'var(--text-faint)',
      textDecoration: 'none',
      fontFamily: 'var(--font-mono)',
    }}
    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-faint)')}
  >
    <ExternalLink size={11} />
    {topic.id.startsWith('html') ? 'HTML Reference' : 'CSS Reference'} →
  </Link>
)}
```

**Step 4: Verify TypeScript and build**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1
```
Expected: no errors.

```bash
cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -5
```
Expected: `✓ built in X.XXs`

**Step 5: Commit and push**

```bash
git add src/pages/LevelOverview/index.tsx src/pages/TopicPage/index.tsx
git commit -m "feat: quick reference links on level overview and topic pages"
git push origin main
```

---

## Quick Reference

```bash
npm run dev      # local dev
npm run build    # production build → dist/
npx tsc --noEmit # type-check only
```

**Key files:**
- `src/data/htmlReference.ts` — add/edit HTML entries
- `src/data/cssReference.ts` — add/edit CSS entries
- `src/pages/ReferencePage/ReferenceCard.tsx` — card layout
- `src/pages/ReferencePage/index.tsx` — page shell + sticky tabs
