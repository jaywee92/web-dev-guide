# WBS Curriculum Integration Implementation Plan

> ✅ **COMPLETED** — implemented and deployed to main

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate 62 WBS Coding School curriculum files into the web-dev-guide by extending 10 existing topics with new explanation steps and creating 6 new topics, while splitting the `javascript` category into 3 subcategories.

**Architecture:** Extend `src/data/categories.ts` (category split + new categories), then `src/data/topics.ts` (6 new topic stubs + explanation steps added to 10 existing topics). No component changes needed — existing `SyncExplanation` renders all explanation steps uniformly.

**Tech Stack:** TypeScript, existing `Topic` / `Category` / `ExplanationStep` types in `src/types/`

**Spec:** `docs/superpowers/specs/2026-03-15-wbs-curriculum-integration.md`

---

## Chunk 1: Category Restructure

### Task 1: Split `javascript` category and add new categories in `categories.ts`

**Files:**
- Modify: `src/data/categories.ts`

- [x] **Step 1: Replace the `javascript` category object with 3 subcategory objects**

In `CATEGORIES` array, replace:
```ts
{
  id: 'javascript',
  title: 'JavaScript',
  description: 'Language of the browser',
  color: '#fbbf24',
  icon: 'Zap',
  topicIds: ['js-variables', 'js-arrays', 'js-event-loop', 'js-closures', 'js-functions', 'js-promises', 'js-destructuring'],
  cardLabel: 'Basics',
  cardEmoji: '📖',
},
```
With:
```ts
{
  id: 'javascript',
  title: 'JavaScript Basics',
  description: 'Variables · Arrays · Functions · Control Flow',
  color: '#fbbf24',
  icon: 'Zap',
  topicIds: ['js-variables', 'js-control-flow', 'js-arrays', 'js-functions', 'js-destructuring'],
  cardLabel: 'Basics',
  cardEmoji: '📖',
},
{
  id: 'javascript-oop',
  title: 'Objects & Classes',
  description: 'OOP · Classes · Prototypes · Timers',
  color: '#fbbf24',
  icon: 'Box',
  topicIds: ['js-oop', 'js-timers', 'js-event-loop', 'js-closures'],
  cardLabel: 'OOP',
  cardEmoji: '🧱',
},
{
  id: 'javascript-async',
  title: 'Async & Modules',
  description: 'Promises · Async/Await · ESM · npm',
  color: '#fbbf24',
  icon: 'Layers',
  topicIds: ['js-promises', 'js-modules'],
  cardLabel: 'Async',
  cardEmoji: '⚡',
},
```

- [x] **Step 2: Add `webapi-dom` to the `webapis` category topicIds**

Change `topicIds: ['webapi-fetch', 'webapi-events', 'webapi-storage']`
to `topicIds: ['webapi-fetch', 'webapi-dom', 'webapi-events', 'webapi-storage']`

- [x] **Step 3: Add `css-frameworks` category after `css-modern`**

Insert after the `css-modern` object:
```ts
{
  id: 'css-frameworks',
  title: 'CSS Frameworks',
  description: 'Tailwind · Utility-first CSS',
  color: '#06b6d4',
  icon: 'Wind',
  topicIds: ['css-tailwind'],
  cardLabel: 'Frameworks',
  cardEmoji: '🌊',
},
```

- [x] **Step 4: Update `CATEGORY_GROUPS`**

In `programmierung` group, replace `'javascript'` with `'javascript', 'javascript-oop', 'javascript-async'`:
```ts
{ key: 'programmierung', label: 'PROGRAMMING', categoryIds: ['javascript', 'javascript-oop', 'javascript-async', 'typescript'] },
```

In `markup-style` group, add `'css-frameworks'` after `'css-modern'`:
```ts
{ key: 'markup-style', label: 'MARKUP & STYLE', categoryIds: ['html-core', 'html-structure', 'html-interactive', 'css-basics', 'css-layout', 'css-modern', 'css-frameworks'] },
```

- [x] **Step 5: Add entries to `TECH_SECTION_META`**

Add after the `javascript` entry:
```ts
'javascript-oop':   { title: 'JavaScript', subtitle: 'Objects & Classes',  color: '#fbbf24' },
'javascript-async': { title: 'JavaScript', subtitle: 'Async & Modules',    color: '#fbbf24' },
'css-frameworks':   { title: 'CSS',         subtitle: 'Utility Frameworks', color: '#06b6d4' },
```

- [x] **Step 6: Update `getTechKey` for new JS subcategories**

Add before the final `return categoryId`:
```ts
if (categoryId === 'javascript-oop' || categoryId === 'javascript-async') return 'javascript'
if (categoryId === 'css-frameworks') return 'css'
```

- [x] **Step 7: Add new topic IDs to `TOPIC_ICONS`**

```ts
'js-control-flow': 'GitBranch',
'js-oop':          'Box',
'js-timers':       'Timer',
'js-modules':      'Package',
'webapi-dom':      'Layout',
'css-tailwind':    'Wind',
```

- [x] **Step 8: Add new topic IDs to `TOPIC_LABELS`**

```ts
'js-control-flow': 'Control Flow',
'js-oop':          'Objects & Classes',
'js-timers':       'Timers & Globals',
'js-modules':      'Modules & Bundlers',
'webapi-dom':      'DOM API',
'css-tailwind':    'Tailwind CSS',
```

- [x] **Step 9: Type-check**

Run: `cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -30`
Expected: no errors related to `CategoryId` or `categories.ts`

- [x] **Step 10: Commit**

```bash
git add src/data/categories.ts
git commit -m "feat: split javascript category into 3 subcategories, add css-frameworks"
```

---

## Chunk 2: New Topic Stubs

### Task 2: Create 6 new topic stubs in `topics.ts`

**Files:**
- Modify: `src/data/topics.ts`

All 6 new topics get `animationComponent: undefined` and `bannerComponent: undefined` as per spec.

- [x] **Step 1: Read the top of `topics.ts` to understand the file structure**

Run: `head -60 src/data/topics.ts` to see imports and first topic shape.

- [x] **Step 2: Add `js-control-flow` stub after `js-variables` topic**

Find the `js-variables` topic object and after its closing `}` insert:
```ts
{
  id: 'js-control-flow',
  category: 'javascript',
  animationComponent: undefined,
  bannerComponent: undefined,
  nextTopicId: 'js-arrays',
  sections: {
    intro: {
      title: 'Control Flow',
      subtitle: 'Direct the path your code takes',
      description: 'Control flow statements let you make decisions and repeat actions. if/else branches on conditions, switch handles multiple cases, and loops repeat code until a condition is met.',
      icon: '🔀',
    },
    explanation: {
      title: 'How it works',
      steps: [],
    },
    playground: {
      title: 'Try it',
      description: 'Practice writing if/else, switch, and loops.',
      defaultCode: `// if / else
const score = 75;
if (score >= 90) {
  console.log('A');
} else if (score >= 70) {
  console.log('B');
} else {
  console.log('C');
}`,
      defaultLanguage: 'javascript',
    },
  },
  cheatSheet: {
    title: 'Control Flow Cheatsheet',
    whenToUse: 'Use if/else for binary decisions, switch for many discrete values, for loops for counted iterations, and while for condition-driven loops.',
    syntax: [
      { label: 'if / else if / else', code: 'if (x > 0) { ... } else if (x < 0) { ... } else { ... }' },
      { label: 'switch', code: "switch (day) { case 'Mon': ...; break; default: ... }" },
      { label: 'for loop', code: 'for (let i = 0; i < 5; i++) { console.log(i); }' },
      { label: 'while loop', code: 'while (condition) { ... }' },
      { label: 'break / continue', code: 'for (...) { if (skip) continue; if (stop) break; }' },
    ],
    patterns: [
      { label: 'Early return guard', code: 'if (!input) return;\n// safe to use input here' },
      { label: 'Loop with index', code: 'for (let i = 0; i < arr.length; i++) { console.log(i, arr[i]); }' },
    ],
    commonMistakes: [
      'Forgetting `break` in switch cases causes fall-through to the next case.',
      'Using `=` (assignment) instead of `===` (comparison) inside an if condition.',
      'Infinite loop: forgetting to update the loop variable so the condition never becomes false.',
    ],
  },
},
```

- [x] **Step 3: Add `js-oop` stub in `javascript-oop` category**

Insert after the last topic in the original `javascript` group (or logically near `js-destructuring`):
```ts
{
  id: 'js-oop',
  category: 'javascript-oop',
  animationComponent: undefined,
  bannerComponent: undefined,
  nextTopicId: 'js-timers',
  sections: {
    intro: {
      title: 'Objects & Classes',
      subtitle: 'Blueprints for creating structured objects',
      description: 'Object-Oriented Programming models real-world entities as objects. JavaScript classes are syntactic sugar over prototype-based inheritance, giving you constructors, methods, and inheritance chains.',
      icon: '🧱',
    },
    explanation: {
      title: 'How it works',
      steps: [],
    },
    playground: {
      title: 'Try it',
      description: 'Create a class and instantiate it.',
      defaultCode: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(\`\${this.name} makes a sound.\`);
  }
}
const dog = new Animal('Rex');
dog.speak();`,
      defaultLanguage: 'javascript',
    },
  },
  cheatSheet: {
    title: 'Objects & Classes Cheatsheet',
    whenToUse: 'Use classes when you need multiple instances that share behavior, and inheritance when one type extends another.',
    syntax: [
      { label: 'Class definition', code: 'class Car { constructor(make) { this.make = make; } }' },
      { label: 'Instantiation', code: 'const myCar = new Car("Toyota");' },
      { label: 'Inheritance', code: 'class ElectricCar extends Car { charge() { ... } }' },
      { label: 'Static method', code: 'class MathHelper { static double(n) { return n * 2; } }' },
      { label: 'Prototype chain', code: 'Object.getPrototypeOf(myCar) === Car.prototype; // true' },
    ],
    patterns: [
      { label: 'Factory pattern via class', code: 'class User { constructor(name, role) { this.name = name; this.role = role; } }' },
      { label: 'super() call', code: 'class Admin extends User { constructor(name) { super(name, "admin"); } }' },
    ],
    commonMistakes: [
      'Forgetting `new` — calling a class without `new` throws a TypeError.',
      'Accessing `this` before `super()` in a subclass constructor.',
      'Mutating inherited prototype properties directly instead of using instance properties.',
    ],
  },
},
```

- [x] **Step 4: Add `js-timers` stub**

```ts
{
  id: 'js-timers',
  category: 'javascript-oop',
  animationComponent: undefined,
  bannerComponent: undefined,
  nextTopicId: 'js-event-loop',
  sections: {
    intro: {
      title: 'Timers & Async Globals',
      subtitle: 'Schedule code to run later',
      description: 'setTimeout and setInterval let you delay and repeat code execution. They are Web API functions, not part of the JavaScript language itself — they hand off to the browser and return a timer ID you can use to cancel them.',
      icon: '⏱️',
    },
    explanation: {
      title: 'How it works',
      steps: [],
    },
    playground: {
      title: 'Try it',
      description: 'Schedule a delayed log and a repeating counter.',
      defaultCode: `// Runs once after 1 second
const timeoutId = setTimeout(() => {
  console.log('Hello after 1s');
}, 1000);

// Runs every 500ms — clear after 3 runs
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log('Tick', count);
  if (count >= 3) clearInterval(intervalId);
}, 500);`,
      defaultLanguage: 'javascript',
    },
  },
  cheatSheet: {
    title: 'Timers Cheatsheet',
    whenToUse: 'Use setTimeout for one-off delays, setInterval for repeating actions, and always store the ID so you can cancel with clearTimeout/clearInterval.',
    syntax: [
      { label: 'setTimeout', code: 'const id = setTimeout(() => { ... }, delayMs);' },
      { label: 'clearTimeout', code: 'clearTimeout(id);' },
      { label: 'setInterval', code: 'const id = setInterval(() => { ... }, intervalMs);' },
      { label: 'clearInterval', code: 'clearInterval(id);' },
    ],
    patterns: [
      { label: 'Debounce pattern', code: 'let timer;\nfunction debounce(fn, ms) {\n  clearTimeout(timer);\n  timer = setTimeout(fn, ms);\n}' },
      { label: 'Self-clearing interval', code: 'let n = 0;\nconst id = setInterval(() => { if (++n >= 5) clearInterval(id); }, 200);' },
    ],
    commonMistakes: [
      'Using setInterval without clearing it — causes memory leaks in SPAs.',
      'Passing a string to setTimeout instead of a function: setTimeout("doSomething()", 500) — avoid this.',
      'Expecting exact timing — timer callbacks are queued; actual delay can be longer than specified.',
    ],
  },
},
```

- [x] **Step 5: Add `js-modules` stub**

```ts
{
  id: 'js-modules',
  category: 'javascript-async',
  animationComponent: undefined,
  bannerComponent: undefined,
  nextTopicId: undefined,
  sections: {
    intro: {
      title: 'Modules & Bundlers',
      subtitle: 'Split code into reusable files',
      description: 'ES Modules let you export values from one file and import them in another. Bundlers like Parcel and Vite take many module files and produce optimized output for the browser. npm is the registry where you install third-party packages.',
      icon: '📦',
    },
    explanation: {
      title: 'How it works',
      steps: [],
    },
    playground: {
      title: 'Try it',
      description: 'Practice named and default exports.',
      defaultCode: `// math.js (named exports)
export function add(a, b) { return a + b; }
export const PI = 3.14159;

// main.js (named import)
import { add, PI } from './math.js';
console.log(add(2, 3)); // 5

// greet.js (default export)
export default function greet(name) {
  return \`Hello, \${name}!\`;
}

// usage
import greet from './greet.js';
console.log(greet('World'));`,
      defaultLanguage: 'javascript',
    },
  },
  cheatSheet: {
    title: 'Modules Cheatsheet',
    whenToUse: 'Use ESM (import/export) for all new projects. Use npm to install packages, then import them the same way.',
    syntax: [
      { label: 'Named export', code: 'export function greet(name) { return `Hi ${name}`; }' },
      { label: 'Default export', code: 'export default function main() { ... }' },
      { label: 'Named import', code: "import { greet } from './greet.js';" },
      { label: 'Default import', code: "import main from './main.js';" },
      { label: 'npm install', code: 'npm install lodash' },
    ],
    patterns: [
      { label: 'Re-export barrel', code: "export { greet } from './greet.js';\nexport { add } from './math.js';" },
      { label: 'Dynamic import', code: "const { greet } = await import('./greet.js');" },
    ],
    commonMistakes: [
      'Mixing CommonJS (require) and ESM (import) in the same project without a bundler config.',
      'Omitting the file extension in import paths — browsers require the full path including `.js`.',
      'Circular imports — module A imports from B which imports from A, causing undefined references.',
    ],
  },
},
```

- [x] **Step 6: Add `webapi-dom` stub**

```ts
{
  id: 'webapi-dom',
  category: 'webapis',
  animationComponent: undefined,
  bannerComponent: undefined,
  nextTopicId: 'webapi-events',
  sections: {
    intro: {
      title: 'DOM API',
      subtitle: 'Read and change the live HTML document',
      description: 'The Document Object Model represents your HTML as a tree of nodes. JavaScript can traverse this tree, select elements, create new ones, and change their content or styles — all reflected instantly in the browser.',
      icon: '🌳',
    },
    explanation: {
      title: 'How it works',
      steps: [],
    },
    playground: {
      title: 'Try it',
      description: 'Select an element and change its content.',
      defaultCode: `// Select existing element
const heading = document.querySelector('h1');
heading.textContent = 'Hello from JS!';

// Create and append a new element
const para = document.createElement('p');
para.textContent = 'Dynamically added paragraph.';
document.body.appendChild(para);

// Read element attribute
console.log(heading.getAttribute('id'));`,
      defaultLanguage: 'javascript',
    },
  },
  cheatSheet: {
    title: 'DOM API Cheatsheet',
    whenToUse: 'Use the DOM API to read, create, and modify page content from JavaScript without a framework.',
    syntax: [
      { label: 'querySelector', code: "const btn = document.querySelector('#submit');" },
      { label: 'querySelectorAll', code: "const items = document.querySelectorAll('.item');" },
      { label: 'createElement', code: "const div = document.createElement('div');" },
      { label: 'appendChild', code: 'parent.appendChild(child);' },
      { label: 'textContent', code: "el.textContent = 'New text';" },
    ],
    patterns: [
      { label: 'Create and insert', code: "const li = document.createElement('li');\nli.textContent = 'Item';\nlist.appendChild(li);" },
      { label: 'Remove element', code: 'el.remove();' },
    ],
    commonMistakes: [
      'Running DOM queries before the document is ready — wrap in DOMContentLoaded or place script at end of body.',
      'Using getElementById when the element has a class, not an id.',
      'querySelectorAll returns a NodeList, not an Array — use Array.from() to use array methods on it.',
    ],
  },
},
```

- [x] **Step 7: Add `css-tailwind` stub**

```ts
{
  id: 'css-tailwind',
  category: 'css-frameworks',
  animationComponent: undefined,
  bannerComponent: undefined,
  nextTopicId: undefined,
  sections: {
    intro: {
      title: 'Tailwind CSS',
      subtitle: 'Style with utility classes directly in HTML',
      description: 'Tailwind CSS is a utility-first framework: instead of writing custom CSS, you apply small single-purpose classes like `flex`, `p-4`, or `text-blue-500` directly on elements. Responsive and state variants are built in.',
      icon: '🌊',
    },
    explanation: {
      title: 'How it works',
      steps: [],
    },
    playground: {
      title: 'Try it',
      description: 'Write Tailwind markup.',
      defaultCode: `<!-- Card with Tailwind utilities -->
<div class="max-w-sm rounded-xl shadow-lg p-6 bg-white">
  <h2 class="text-xl font-bold text-gray-800 mb-2">Hello Tailwind</h2>
  <p class="text-gray-500 text-sm">Styled with utility classes only.</p>
  <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
    Click me
  </button>
</div>`,
      defaultLanguage: 'html',
    },
  },
  cheatSheet: {
    title: 'Tailwind CSS Cheatsheet',
    whenToUse: 'Use Tailwind when you want fast iteration without switching between HTML and CSS files. Great for component-based projects.',
    syntax: [
      { label: 'Padding / Margin', code: 'p-4  px-2  py-3  m-auto  mt-6' },
      { label: 'Flex layout', code: 'flex items-center justify-between gap-4' },
      { label: 'Responsive prefix', code: 'text-sm md:text-base lg:text-lg' },
      { label: 'Hover state', code: 'hover:bg-blue-600 hover:text-white' },
      { label: 'Text & Color', code: 'text-gray-700 font-semibold bg-indigo-500' },
    ],
    patterns: [
      { label: 'Button', code: 'class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"' },
      { label: 'Card', code: 'class="rounded-xl shadow p-6 bg-white max-w-md"' },
    ],
    commonMistakes: [
      'Trying to write dynamic class strings that Tailwind cannot detect at build time — use safelist for dynamic values.',
      'Forgetting the responsive prefix order — mobile-first means base styles apply to all sizes.',
      'Using arbitrary values too often (`w-[347px]`) — prefer spacing scale values for consistency.',
    ],
  },
},
```

- [x] **Step 8: Type-check**

Run: `cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1 | head -40`

- [x] **Step 9: Commit**

```bash
git add src/data/topics.ts
git commit -m "feat: add 6 new topic stubs (js-control-flow, js-oop, js-timers, js-modules, webapi-dom, css-tailwind)"
```

---

## Chunk 3: Extend JS Basics Topics

Source files in `wbs-sources/JavaScript/`

### Task 3: Extend `js-variables`

**Files:**
- Modify: `src/data/topics.ts` — find `id: 'js-variables'`, add to `sections.explanation.steps`

New steps to append (WBS sources: Arithmetic, Comparisons, TryCatch Block):

```ts
{
  icon: '➕',
  heading: 'Arithmetic Operators',
  text: 'JavaScript supports the standard arithmetic operators: + (add), - (subtract), * (multiply), / (divide), % (modulo), and ** (exponentiation). The modulo operator is especially useful for checking if a number is even or odd.',
  codeExample: `const a = 10, b = 3;
console.log(a + b);   // 13
console.log(a % b);   // 1 (remainder)
console.log(a ** b);  // 1000 (10 to the power 3)`,
  language: 'javascript',
},
{
  icon: '⚖️',
  heading: 'Comparison & Logical Operators',
  text: 'Comparison operators (===, !==, >, <, >=, <=) return true or false. Always prefer === (strict equality) over == to avoid type coercion surprises. Logical operators && (AND), || (OR), and ! (NOT) combine boolean expressions.',
  codeExample: `console.log(5 === '5');  // false (strict)
console.log(5 == '5');   // true (loose — avoid)
console.log(true && false); // false
console.log(false || true); // true
console.log(!true);         // false`,
  language: 'javascript',
},
{
  icon: '🛡️',
  heading: 'try / catch / finally',
  text: 'Wrap risky code in a try block. If an error is thrown, execution jumps to the catch block where you can handle it gracefully. The optional finally block always runs, regardless of whether an error occurred.',
  codeExample: `try {
  const result = JSON.parse('invalid json');
  console.log(result);
} catch (error) {
  console.error('Parse failed:', error.message);
} finally {
  console.log('Always runs');
}`,
  language: 'javascript',
},
```

- [x] Add the 3 steps above to `js-variables` explanation steps array
- [x] Type-check: `npx tsc --noEmit 2>&1 | head -20`
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: extend js-variables with arithmetic, comparison, try/catch steps"`

### Task 4: Extend `js-arrays`

**Files:**
- Modify: `src/data/topics.ts` — find `id: 'js-arrays'`, extend `sections.explanation.steps`

New steps (WBS sources: Arrays I push/pop/shift/unshift, slice/join, splice, reverse; Arrays II forEach/map, find/filter, reduce, some/every):

```ts
{
  icon: '📥',
  heading: 'push / pop / shift / unshift',
  text: 'These four methods mutate the array in place. push/pop work at the end; shift/unshift at the start. push and unshift return the new length; pop and shift return the removed element.',
  codeExample: `const arr = [1, 2, 3];
arr.push(4);        // [1,2,3,4]
arr.pop();          // [1,2,3]
arr.unshift(0);     // [0,1,2,3]
arr.shift();        // [1,2,3]`,
  language: 'javascript',
},
{
  icon: '✂️',
  heading: 'slice and join',
  text: 'slice(start, end) returns a new array from index start up to (but not including) end — the original is unchanged. join(separator) converts all elements to a string separated by the given character.',
  codeExample: `const fruits = ['apple', 'banana', 'cherry', 'date'];
const mid = fruits.slice(1, 3); // ['banana', 'cherry']
console.log(fruits.join(', ')); // 'apple, banana, cherry, date'`,
  language: 'javascript',
},
{
  icon: '🔪',
  heading: 'splice — insert and remove in place',
  text: 'splice(start, deleteCount, ...items) mutates the array: removes deleteCount elements at start, then inserts any provided items. It returns the removed elements.',
  codeExample: `const colors = ['red', 'green', 'blue'];
const removed = colors.splice(1, 1, 'yellow', 'purple');
// removed: ['green']
// colors: ['red', 'yellow', 'purple', 'blue']`,
  language: 'javascript',
},
{
  icon: '🔄',
  heading: 'reverse',
  text: 'reverse() reverses the array in place and returns the same array (mutates the original). To reverse without mutation, spread into a new array first.',
  codeExample: `const nums = [1, 2, 3, 4];
nums.reverse(); // [4, 3, 2, 1] — mutates original

// Non-mutating version:
const reversed = [...nums].reverse();`,
  language: 'javascript',
},
{
  icon: '🔁',
  heading: 'forEach and map',
  text: 'forEach runs a function for every element — useful for side effects but returns nothing. map returns a new array of transformed values. Use map when you need the result; forEach when you just need to act.',
  codeExample: `const prices = [10, 20, 30];
prices.forEach(p => console.log('$' + p));

const doubled = prices.map(p => p * 2);
// [20, 40, 60]`,
  language: 'javascript',
},
{
  icon: '🔍',
  heading: 'find and filter',
  text: 'find returns the first element that matches the predicate (or undefined). filter returns a new array of all matching elements. Both are non-mutating.',
  codeExample: `const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob',   age: 17 },
  { name: 'Carol', age: 30 },
];
const first = users.find(u => u.age >= 18);    // Alice
const adults = users.filter(u => u.age >= 18); // [Alice, Carol]`,
  language: 'javascript',
},
{
  icon: '📊',
  heading: 'reduce',
  text: 'reduce(callback, initialValue) processes every element sequentially, accumulating a single result. The callback receives the accumulator and current element. Great for sums, counts, and data transformations.',
  codeExample: `const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((acc, n) => acc + n, 0); // 15

const counts = ['a','b','a','c','b','a'].reduce((acc, letter) => {
  acc[letter] = (acc[letter] || 0) + 1;
  return acc;
}, {});
// { a: 3, b: 2, c: 1 }`,
  language: 'javascript',
},
{
  icon: '✅',
  heading: 'some and every',
  text: 'some returns true if at least one element passes the test. every returns true only if all elements pass. Both short-circuit: they stop as soon as the result is determined.',
  codeExample: `const scores = [80, 55, 92, 70];
console.log(scores.some(s => s >= 90));  // true (92 qualifies)
console.log(scores.every(s => s >= 50)); // true (all pass)
console.log(scores.every(s => s >= 80)); // false (55 fails)`,
  language: 'javascript',
},
```

- [x] Add the 8 steps above to `js-arrays` explanation steps array
- [x] Type-check: `npx tsc --noEmit 2>&1 | head -20`
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: extend js-arrays with mutation methods, HOFs (map/filter/reduce/some/every)"`

### Task 5: Extend `js-functions`

New steps (WBS sources: Arrow Functions 3 files):

```ts
{
  icon: '➡️',
  heading: 'Arrow Function Syntax',
  text: 'Arrow functions are a compact alternative to function expressions. When the body is a single expression, you can omit the curly braces and return keyword — the value is returned implicitly.',
  codeExample: `// Traditional
const double = function(n) { return n * 2; };

// Arrow — explicit return
const double2 = (n) => { return n * 2; };

// Arrow — implicit return
const double3 = n => n * 2;

console.log(double3(5)); // 10`,
  language: 'javascript',
},
{
  icon: '🔗',
  heading: 'Lexical this in Arrow Functions',
  text: "Arrow functions do not have their own `this`. They inherit `this` from the enclosing scope where they were defined. This makes them ideal for callbacks inside methods, but unsuitable for defining object methods themselves.",
  codeExample: `class Timer {
  constructor() { this.seconds = 0; }
  start() {
    // Arrow keeps 'this' from the class instance
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}`,
  language: 'javascript',
},
```

- [x] Add 2 steps to `js-functions` explanation steps
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: extend js-functions with arrow function syntax and lexical this"`

### Task 6: Extend `js-destructuring`

New step (WBS source: Built-in Objects: Math, Date, String):

```ts
{
  icon: '🔧',
  heading: 'Built-in Objects: Math, Date, String',
  text: 'JavaScript ships with built-in global objects. Math provides static methods for math operations. Date creates date/time objects. String methods like split, trim, and includes operate on string primitives via auto-boxing.',
  codeExample: `// Math
console.log(Math.round(4.6));  // 5
console.log(Math.max(1,5,3));  // 5
console.log(Math.random());    // 0–0.999...

// Date
const now = new Date();
console.log(now.getFullYear()); // e.g. 2026

// String
const s = '  Hello World  ';
console.log(s.trim().toLowerCase()); // 'hello world'
console.log(s.includes('World'));    // true`,
  language: 'javascript',
},
```

- [x] Add 1 step to `js-destructuring` explanation steps
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: extend js-destructuring with built-in objects (Math, Date, String)"`

---

## Chunk 4: Extend Async + Web API Topics

### Task 7: Extend `js-promises`

New steps (WBS sources: Fetch API async/await, error handling):

```ts
{
  icon: '🔄',
  heading: 'async / await Syntax',
  text: 'async/await is syntactic sugar over Promises. Mark a function async and use await to pause execution until a Promise resolves. The result is assigned like a regular value — no .then() chains needed.',
  codeExample: `async function getUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();
  return user;
}

// Call it — returns a Promise
getUser(1).then(u => console.log(u));`,
  language: 'javascript',
},
{
  icon: '🛡️',
  heading: 'Error Handling in async Functions',
  text: 'Use try/catch inside async functions to handle both network errors and non-2xx responses. Check response.ok before parsing the body — fetch only rejects on network failure, not on 404 or 500 status codes.',
  codeExample: `async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error('Fetch failed:', err.message);
    return null;
  }
}`,
  language: 'javascript',
},
```

- [x] Add 2 steps to `js-promises` explanation steps
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: extend js-promises with async/await syntax and error handling"`

### Task 8: Extend `js-event-loop`

New steps (WBS source: JavaScript Runtime Environment):

```ts
{
  icon: '📚',
  heading: 'The Call Stack',
  text: 'JavaScript is single-threaded. All synchronous code runs on the call stack — a LIFO structure. When a function is called it is pushed onto the stack; when it returns it is popped off. Long-running code blocks the stack and freezes the UI.',
  codeExample: `function a() { b(); }
function b() { c(); }
function c() { console.log('deepest'); }

a();
// Stack: a → b → c → (c returns) → (b returns) → (a returns)`,
  language: 'javascript',
},
{
  icon: '🔬',
  heading: 'Microtask Queue',
  text: 'Promise callbacks (.then, .catch, .finally) and queueMicrotask() callbacks go into the microtask queue — which is drained completely before the next macrotask (setTimeout, setInterval) runs. Microtasks always run before the next render.',
  codeExample: `console.log('1 - sync');
setTimeout(() => console.log('3 - macrotask'), 0);
Promise.resolve().then(() => console.log('2 - microtask'));

// Output order: 1 → 2 → 3`,
  language: 'javascript',
},
{
  icon: '🔁',
  heading: 'Event Loop Phases',
  text: 'The event loop picks one macrotask from the queue, runs it to completion on the call stack, then drains the microtask queue fully, then the browser may render, then the loop picks the next macrotask. This cycle is called a "tick".',
  codeExample: `// Each loop iteration (tick):
// 1. Run one macrotask (e.g. a setTimeout callback)
// 2. Drain all microtasks (Promises)
// 3. Browser renders if needed
// 4. Repeat

// This is why heavy sync work freezes rendering`,
  language: 'javascript',
},
```

- [x] Add 3 steps to `js-event-loop` explanation steps
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: extend js-event-loop with call stack, microtask queue, event loop phases"`

### Task 9: Extend `webapi-fetch`

New steps (WBS sources: Fetch API Getting Data, Sending Data, RESTful APIs):

```ts
{
  icon: '📨',
  heading: 'GET — Reading a Response',
  text: 'fetch() returns a Promise that resolves to a Response object. Call response.json() to parse the body as JSON (also async). Always check response.ok or response.status before trusting the data.',
  codeExample: `const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
if (!res.ok) throw new Error(\`Status: \${res.status}\`);
const post = await res.json();
console.log(post.title);`,
  language: 'javascript',
},
{
  icon: '📤',
  heading: 'POST / PUT / DELETE with a Body',
  text: 'To send data, pass an options object as the second argument to fetch. Set the method, a Content-Type header, and serialize the body to JSON with JSON.stringify.',
  codeExample: `const res = await fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New Post', body: 'Content' }),
});
const created = await res.json();
console.log(created.id);`,
  language: 'javascript',
},
{
  icon: '📋',
  heading: 'RESTful API Principles',
  text: 'REST uses HTTP methods semantically: GET reads, POST creates, PUT/PATCH updates, DELETE removes. Each endpoint represents a resource (e.g. /posts, /posts/1). Responses carry HTTP status codes — 2xx for success, 4xx for client errors, 5xx for server errors.',
  codeExample: `// Conventional REST endpoints for a "posts" resource:
// GET    /posts      → list all posts
// POST   /posts      → create a new post
// GET    /posts/1    → get post with id 1
// PUT    /posts/1    → replace post 1 entirely
// PATCH  /posts/1    → update part of post 1
// DELETE /posts/1    → remove post 1`,
  language: 'javascript',
},
```

- [x] Add 3 steps to `webapi-fetch` explanation steps
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: extend webapi-fetch with GET/POST/DELETE patterns and REST principles"`

### Task 10: Extend `webapi-storage`

New steps (WBS sources: Web Storage API 2 files):

```ts
{
  icon: '💾',
  heading: 'localStorage vs sessionStorage',
  text: 'Both store key/value string pairs in the browser, but localStorage persists across browser sessions while sessionStorage is cleared when the tab closes. Neither should store sensitive data — they are accessible to any script on the page.',
  codeExample: `// localStorage — survives page refresh and browser close
localStorage.setItem('theme', 'dark');

// sessionStorage — cleared on tab close
sessionStorage.setItem('draft', 'Hello...');`,
  language: 'javascript',
},
{
  icon: '🔑',
  heading: 'setItem / getItem / removeItem / clear',
  text: 'The Web Storage API is a simple key/value store. All values are stored as strings — use JSON.stringify and JSON.parse to store and retrieve objects.',
  codeExample: `// Store
localStorage.setItem('user', JSON.stringify({ name: 'Alice', age: 25 }));

// Retrieve
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.name); // 'Alice'

// Remove one key
localStorage.removeItem('user');

// Wipe all keys
localStorage.clear();`,
  language: 'javascript',
},
```

- [x] Add 2 steps to `webapi-storage` explanation steps
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: extend webapi-storage with localStorage vs sessionStorage and CRUD methods"`

### Task 11: Extend `webapi-events`

New steps (WBS source: DOM API — The Event and EventTarget Interfaces):

```ts
{
  icon: '🎯',
  heading: 'EventTarget and addEventListener',
  text: 'Any DOM element implements the EventTarget interface, giving it addEventListener(type, handler, options). You can attach multiple listeners to the same event type. Always use addEventListener instead of inline handlers for better separation of concerns.',
  codeExample: `const btn = document.querySelector('#myBtn');

btn.addEventListener('click', (event) => {
  console.log('Clicked!', event.target);
});

// Multiple listeners on the same element are fine
btn.addEventListener('click', () => console.log('Second listener'));`,
  language: 'javascript',
},
{
  icon: '🌊',
  heading: 'Event Propagation: Bubbling and Capturing',
  text: 'Events first travel down the DOM tree from root to target (capture phase), then bubble back up from target to root (bubble phase). By default, listeners run in the bubble phase. Call event.stopPropagation() to prevent the event from traveling further.',
  codeExample: `document.querySelector('#parent').addEventListener('click', () => {
  console.log('Parent clicked (bubble)');
});

document.querySelector('#child').addEventListener('click', (e) => {
  console.log('Child clicked');
  e.stopPropagation(); // prevents parent listener from running
});`,
  language: 'javascript',
},
```

- [x] Add 2 steps to `webapi-events` explanation steps
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: extend webapi-events with EventTarget interface and event propagation"`

### Task 12: Extend `postgres-queries`

New steps (WBS sources: Intro to SQL, SQL Relationships):

```ts
{
  icon: '🔎',
  heading: 'SELECT with WHERE and ORDER BY',
  text: 'WHERE filters rows that match a condition. You can combine multiple conditions with AND and OR. ORDER BY sorts results — ASC (default) for ascending, DESC for descending. Always alias ambiguous columns in multi-table queries.',
  codeExample: `-- Get active users sorted by name
SELECT id, name, email
FROM users
WHERE active = true
  AND age >= 18
ORDER BY name ASC;`,
  language: 'sql',
},
{
  icon: '📊',
  heading: 'Aggregate Functions: COUNT, SUM, AVG',
  text: 'Aggregate functions compute a single result from a set of rows. COUNT(*) counts rows, SUM adds numeric values, AVG computes the mean, MIN/MAX find extremes. They are typically combined with GROUP BY.',
  codeExample: `SELECT
  category,
  COUNT(*)       AS total_products,
  AVG(price)     AS avg_price,
  SUM(quantity)  AS total_stock
FROM products
GROUP BY category;`,
  language: 'sql',
},
{
  icon: '🗂️',
  heading: 'GROUP BY and HAVING',
  text: 'GROUP BY collapses rows that share the same value in a column into a single row, letting aggregates operate per group. HAVING filters groups after aggregation — like WHERE, but for groups.',
  codeExample: `-- Categories with more than 5 products
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 5
ORDER BY count DESC;`,
  language: 'sql',
},
```

- [x] Add 3 steps to `postgres-queries` explanation steps
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: extend postgres-queries with WHERE/ORDER BY, aggregate functions, GROUP BY/HAVING"`

---

## Chunk 5: Fill New JS Topic Content

### Task 13: Fill `js-control-flow` explanation steps

```ts
{
  icon: '🔀',
  heading: 'if / else if / else',
  text: 'The if statement runs a block only when its condition is truthy. else if chains additional conditions. else is the fallback when no condition matches. Conditions are coerced to boolean — any value can be used, not just true/false.',
  codeExample: `const temp = 22;
if (temp > 30) {
  console.log('Hot');
} else if (temp > 20) {
  console.log('Warm'); // runs
} else {
  console.log('Cool');
}`,
  language: 'javascript',
},
{
  icon: '🔁',
  heading: 'switch Statement',
  text: 'switch compares a value against a list of cases using strict equality. Each case needs a break to prevent fall-through into the next case. The default case is the fallback, similar to else.',
  codeExample: `const day = 'Mon';
switch (day) {
  case 'Sat':
  case 'Sun':
    console.log('Weekend');
    break;
  case 'Mon':
    console.log('Monday'); // runs
    break;
  default:
    console.log('Weekday');
}`,
  language: 'javascript',
},
{
  icon: '🔄',
  heading: 'for Loop',
  text: 'The classic for loop has three parts: initialization (let i = 0), condition (i < 10), and update (i++). It is ideal when you know how many iterations you need, especially for arrays.',
  codeExample: `const fruits = ['apple', 'banana', 'cherry'];
for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]);
}
// 0 apple / 1 banana / 2 cherry`,
  language: 'javascript',
},
{
  icon: '🔃',
  heading: 'while and do-while',
  text: 'while repeats as long as its condition is truthy — the condition is checked before each iteration. do-while always runs the body at least once because the check comes after. Use these when the number of iterations is unknown.',
  codeExample: `let attempts = 0;
while (attempts < 3) {
  console.log('Attempt', attempts + 1);
  attempts++;
}

// do-while: body always runs at least once
let n = 5;
do {
  console.log(n--);
} while (n > 0);`,
  language: 'javascript',
},
{
  icon: '⛔',
  heading: 'break and continue',
  text: 'break exits the nearest enclosing loop immediately. continue skips the rest of the current iteration and moves to the next. Both make loops more expressive without needing extra boolean flags.',
  codeExample: `for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // skip 3
  if (i === 7) break;    // stop at 7
  console.log(i);
}
// Output: 0 1 2 4 5 6`,
  language: 'javascript',
},
```

- [x] Set `sections.explanation.steps` for `js-control-flow` to the 5 steps above
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: fill js-control-flow explanation steps (if/else, switch, for, while, break/continue)"`

### Task 14: Fill `js-oop` explanation steps

```ts
{
  icon: '🏗️',
  heading: 'OOP Concepts',
  text: 'Object-Oriented Programming organizes code around objects that combine state (properties) and behavior (methods). The four pillars are: encapsulation (hiding internal details), abstraction (exposing only what is needed), inheritance (extending existing types), and polymorphism (same interface, different behavior).',
  codeExample: `// Objects bundle data + behavior
const car = {
  make: 'Toyota',
  speed: 0,
  accelerate(amount) { this.speed += amount; },
};
car.accelerate(30);
console.log(car.speed); // 30`,
  language: 'javascript',
},
{
  icon: '🧱',
  heading: 'Classes and Constructors',
  text: 'A class is a blueprint for creating objects. The constructor method runs when you call new ClassName(). Properties set with this inside the constructor belong to each instance. Methods defined in the class body are shared via the prototype.',
  codeExample: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return \`Hi, I'm \${this.name}, \${this.age} years old.\`;
  }
}
const alice = new Person('Alice', 28);
console.log(alice.greet());`,
  language: 'javascript',
},
{
  icon: '🔗',
  heading: 'Inheritance with extends',
  text: 'A subclass extends a parent class and inherits all its methods. Call super() in the subclass constructor to invoke the parent constructor. You can override parent methods by redefining them in the subclass.',
  codeExample: `class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound.\`; }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks!\`; }
}
const dog = new Dog('Rex');
console.log(dog.speak()); // Rex barks!`,
  language: 'javascript',
},
{
  icon: '⛓️',
  heading: 'Prototype Chain',
  text: 'Every JavaScript object has a hidden [[Prototype]] link. When you access a property, JS looks on the object itself first, then walks up the prototype chain until it finds the property or reaches null. Class methods live on the prototype, not on each instance.',
  codeExample: `class Cat {}
const c = new Cat();

// Method lives on the prototype, not the instance
console.log(c.hasOwnProperty('constructor')); // false
console.log(Object.getPrototypeOf(c) === Cat.prototype); // true`,
  language: 'javascript',
},
{
  icon: '👆',
  heading: 'The this Keyword',
  text: '`this` refers to the object a method was called on. In a class method it points to the instance. In a standalone function it depends on how the function is called. Arrow functions inherit `this` from their outer scope instead of defining their own.',
  codeExample: `class Counter {
  constructor() { this.count = 0; }
  increment() { this.count++; }
}
const c = new Counter();
c.increment();
console.log(c.count); // 1

// this is lost when method is detached:
const inc = c.increment;
// inc(); // TypeError — this is undefined in strict mode`,
  language: 'javascript',
},
```

- [x] Set `sections.explanation.steps` for `js-oop` to the 5 steps above
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: fill js-oop explanation steps (OOP concepts, classes, inheritance, prototype, this)"`

### Task 15: Fill `js-timers` explanation steps

```ts
{
  icon: '⏳',
  heading: 'setTimeout — Run Once After a Delay',
  text: 'setTimeout(callback, delayMs) schedules callback to run after at least delayMs milliseconds. It returns a timer ID. The actual delay may be slightly longer because the callback enters the macrotask queue and must wait for the call stack to be clear.',
  codeExample: `console.log('start');
const id = setTimeout(() => {
  console.log('runs after 1 second');
}, 1000);
console.log('end'); // prints before the timeout callback`,
  language: 'javascript',
},
{
  icon: '🔁',
  heading: 'setInterval — Repeat on a Schedule',
  text: 'setInterval(callback, intervalMs) calls callback repeatedly every intervalMs milliseconds. It returns an ID you must use to cancel it with clearInterval. Always cancel intervals when they are no longer needed to avoid memory leaks.',
  codeExample: `let tick = 0;
const id = setInterval(() => {
  tick++;
  console.log('tick', tick);
  if (tick >= 5) clearInterval(id); // stop after 5
}, 500);`,
  language: 'javascript',
},
{
  icon: '🚫',
  heading: 'clearTimeout and clearInterval',
  text: 'Pass the timer ID returned by setTimeout or setInterval to the corresponding clear function to cancel the pending execution. This is essential in components that mount/unmount — always clean up timers on teardown.',
  codeExample: `const id = setTimeout(() => console.log('never runs'), 5000);
clearTimeout(id); // cancels before it fires

// React pattern:
// useEffect(() => {
//   const id = setInterval(() => ..., 1000);
//   return () => clearInterval(id); // cleanup
// }, []);`,
  language: 'javascript',
},
```

- [x] Set `sections.explanation.steps` for `js-timers` to the 3 steps above
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: fill js-timers explanation steps (setTimeout, setInterval, clear functions)"`

### Task 16: Fill `js-modules` explanation steps

```ts
{
  icon: '📜',
  heading: 'CommonJS vs ES Modules',
  text: 'Older Node.js code uses CommonJS: require() to import and module.exports to export. Modern JavaScript uses ES Modules (ESM): import and export statements. ESM is statically analyzable (better tree-shaking) and is now the standard for both browsers and Node.js.',
  codeExample: `// CommonJS (older)
const fs = require('fs');
module.exports = { readFile: fs.readFile };

// ESM (modern)
import { readFile } from 'fs/promises';
export { readFile };`,
  language: 'javascript',
},
{
  icon: '📤',
  heading: 'Named and Default Exports',
  text: 'A file can export multiple named values and one default value. Named imports must use the exact exported name (or be aliased). Default imports can use any name. Prefer named exports for better refactoring and IDE support.',
  codeExample: `// utils.js
export const PI = 3.14159;
export function square(n) { return n * n; }
export default function main() { console.log('main'); }

// app.js
import main, { PI, square } from './utils.js';
import { square as sq } from './utils.js'; // alias`,
  language: 'javascript',
},
{
  icon: '📦',
  heading: 'npm and Installing Packages',
  text: 'npm (Node Package Manager) is the registry for JavaScript packages. npm install saves the package to node_modules and lists it in package.json. Import the package the same way as your own modules — bundlers resolve node_modules automatically.',
  codeExample: `# Install a package
npm install date-fns

# Import in your code
import { format } from 'date-fns';
console.log(format(new Date(), 'yyyy-MM-dd')); // e.g. 2026-03-15`,
  language: 'javascript',
},
{
  icon: '🔧',
  heading: 'Bundlers: Parcel and Vite',
  text: 'Bundlers take many ES Module files and produce optimized browser-ready output. Parcel is zero-config; Vite is fast with Hot Module Replacement for development. Both handle importing CSS, images, and npm packages out of the box.',
  codeExample: `# Vite project setup
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install
npm run dev   # dev server with HMR
npm run build # production bundle in dist/`,
  language: 'javascript',
},
```

- [x] Set `sections.explanation.steps` for `js-modules` to the 4 steps above
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: fill js-modules explanation steps (CommonJS/ESM, exports, npm, bundlers)"`

---

## Chunk 6: Fill New Web API + CSS Topic Content

### Task 17: Fill `webapi-dom` explanation steps

```ts
{
  icon: '🌳',
  heading: 'DOM Tree Structure',
  text: 'The DOM represents your HTML as a tree of nodes. The document object is the root. HTML elements are Element nodes; text inside them are Text nodes. JavaScript can traverse this tree using parent, child, and sibling relationships.',
  codeExample: `// document is the root
console.log(document.documentElement); // <html>
console.log(document.body);            // <body>

// Navigate the tree
const first = document.body.firstElementChild;
console.log(first.tagName);           // e.g. 'HEADER'`,
  language: 'javascript',
},
{
  icon: '🔍',
  heading: 'Selecting Elements',
  text: 'querySelector returns the first element matching a CSS selector. querySelectorAll returns a NodeList of all matches. getElementById and getElementsByClassName are older alternatives — querySelector is more flexible and preferred.',
  codeExample: `// Single element
const title = document.querySelector('h1');
const btn   = document.querySelector('#submit');

// All matching elements
const items = document.querySelectorAll('.menu-item');
items.forEach(item => console.log(item.textContent));`,
  language: 'javascript',
},
{
  icon: '🛠️',
  heading: 'Creating and Inserting Elements',
  text: 'createElement(tag) creates a detached element. Set its properties (textContent, className, etc.) then attach it to the DOM with appendChild, prepend, or insertBefore. The element appears in the page only after attachment.',
  codeExample: `const li = document.createElement('li');
li.textContent = 'New item';
li.className = 'menu-item';

const list = document.querySelector('ul');
list.appendChild(li); // adds at the end

// Or insert before a specific node:
list.insertBefore(li, list.firstChild);`,
  language: 'javascript',
},
{
  icon: '✏️',
  heading: 'Reading and Changing Element Properties',
  text: 'Use textContent to read or set text safely. classList provides add, remove, toggle, and contains for CSS class management. setAttribute / getAttribute read and write HTML attributes. style lets you set inline CSS directly.',
  codeExample: `const el = document.querySelector('.card');

el.textContent = 'Updated text';
el.classList.add('active');
el.classList.toggle('hidden');

el.setAttribute('data-id', '42');
console.log(el.getAttribute('data-id')); // '42'

el.style.color = 'red';`,
  language: 'javascript',
},
```

- [x] Set `sections.explanation.steps` for `webapi-dom` to the 4 steps above
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: fill webapi-dom explanation steps (tree, selecting, creating, properties)"`

### Task 18: Fill `css-tailwind` explanation steps

```ts
{
  icon: '🧩',
  heading: 'Utility-First Approach',
  text: 'In Tailwind, you style elements by composing small single-purpose classes directly on the element rather than writing custom CSS. Each class does exactly one thing: p-4 adds padding, text-blue-500 sets color, flex enables flexbox. No naming of CSS classes required.',
  codeExample: `<!-- Traditional CSS approach -->
<div class="card">...</div>
<style>.card { padding: 1rem; background: white; border-radius: 0.5rem; }</style>

<!-- Tailwind utility approach -->
<div class="p-4 bg-white rounded-lg shadow">...</div>`,
  language: 'html',
},
{
  icon: '📱',
  heading: 'Responsive Prefixes',
  text: 'Tailwind is mobile-first. Unprefixed classes apply to all screen sizes. Responsive prefixes (sm:, md:, lg:, xl:) apply the class only at that breakpoint and above. Stack them to build fully responsive layouts without media query boilerplate.',
  codeExample: `<!-- 1 column on mobile, 2 on md+, 3 on lg+ -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="p-4 bg-white rounded">Card 1</div>
  <div class="p-4 bg-white rounded">Card 2</div>
  <div class="p-4 bg-white rounded">Card 3</div>
</div>`,
  language: 'html',
},
{
  icon: '🎨',
  heading: 'Common Utility Classes',
  text: 'Tailwind covers spacing (p-, m-), sizing (w-, h-), typography (text-, font-), colors (bg-, text-, border-), flexbox/grid (flex, grid, items-, justify-), borders (rounded-, border-), and effects (shadow-, opacity-). The full list is in the official docs.',
  codeExample: `<button class="
  px-6 py-3
  bg-indigo-600 text-white
  font-semibold text-sm
  rounded-lg shadow
  hover:bg-indigo-700
  focus:outline-none focus:ring-2 focus:ring-indigo-400
  transition-colors duration-200
">
  Save changes
</button>`,
  language: 'html',
},
{
  icon: '⚙️',
  heading: 'Setup: CDN and npm',
  text: 'For quick prototyping, add the CDN Play script to your HTML. For production, install via npm and use a PostCSS plugin or the Vite/CLI integration — this enables purging unused styles and customizing the design system via tailwind.config.js.',
  codeExample: `<!-- CDN (prototyping only) -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- npm setup -->
<!-- npm install -D tailwindcss -->
<!-- npx tailwindcss init -->
<!-- Add @tailwind directives to CSS:
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
-->`,
  language: 'html',
},
```

- [x] Set `sections.explanation.steps` for `css-tailwind` to the 4 steps above
- [x] Commit: `git add src/data/topics.ts && git commit -m "feat: fill css-tailwind explanation steps (utility-first, responsive, common classes, setup)"`

---

## Chunk 7: Wire nextTopicId Chains + Final Check

### Task 19: Update nextTopicId chains and run TypeScript check

**Files:**
- Modify: `src/data/topics.ts`

- [x] **Step 1: Set `js-variables` nextTopicId to `js-control-flow`**

Find the `js-variables` topic and set `nextTopicId: 'js-control-flow'`

- [x] **Step 2: Set `js-control-flow` nextTopicId to `js-arrays`** (already set in stub — verify)

- [x] **Step 3: Set `js-arrays` nextTopicId to `js-functions`** (update if currently different)

- [x] **Step 4: Set `js-functions` nextTopicId to `js-destructuring`**

- [x] **Step 5: Set `js-closures` nextTopicId to `js-promises`**

- [x] **Step 6: Set `js-timers` nextTopicId to `js-event-loop`**

- [x] **Step 7: Set `js-event-loop` nextTopicId to `js-closures`**

- [x] **Step 8: Set `js-promises` nextTopicId to `js-modules`**

- [x] **Step 9: Set `webapi-fetch` nextTopicId to `webapi-dom`**

- [x] **Step 10: Set `webapi-dom` nextTopicId to `webapi-events`** (already in stub — verify)

- [x] **Step 11: Set `webapi-events` nextTopicId to `webapi-storage`** (verify existing value)

- [x] **Step 12: Run TypeScript check**

Run: `cd /home/jaywee92/web-dev-guide && npx tsc --noEmit 2>&1`
Expected: 0 errors

- [x] **Step 13: Run dev server smoke test**

Run: `cd /home/jaywee92/web-dev-guide && npm run build 2>&1 | tail -20`
Expected: successful build, no type errors

- [x] **Step 14: Final commit**

```bash
git add src/data/topics.ts
git commit -m "feat: wire nextTopicId chains for new topics (control-flow, oop, timers, modules, dom)"
```
