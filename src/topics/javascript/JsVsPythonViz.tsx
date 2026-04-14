import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const PY  = '#3b82f6'   // blue — Python
const JS  = '#fbbf24'   // yellow — JavaScript
const GREEN  = '#4ade80'
const PURPLE = '#a78bfa'
const MUTED  = '#94a3b8'

const stepLabels = [
  'Variables — Python needs no keyword, JS uses let / const',
  'Functions — def vs function / arrow syntax',
  'Control flow — indentation vs curly braces',
  'Data types — similarities and key differences',
  'Loops — for-in (Python) vs for-of (JS)',
  'Dicts vs Objects — dict["key"] vs obj.key',
  'Async/await — similar syntax, same concept',
  'String methods — .upper() vs .toUpperCase(), f-strings vs template literals',
  'List / Array methods — append/len vs push/length, map/filter',
  'Error handling — try/except/else vs try/catch/finally',
  'Functional methods — map/filter/find/some/every/reduce vs comprehensions & any/all',
]

interface SidePair {
  py: string[]
  js: string[]
}

const steps: SidePair[] = [
  {
    py: [
      '# No keyword needed',
      'name = "Alice"',
      'age  = 25',
      'active = True',
      '',
      '# Reassign freely',
      'age = 26',
    ],
    js: [
      '// const for fixed, let for changing',
      'const name = "Alice"',
      'let   age  = 25',
      'let   active = true',
      '',
      '// let can be reassigned',
      'age = 26',
    ],
  },
  {
    py: [
      'def greet(name):',
      '    return f"Hello, {name}"',
      '',
      '# Lambda (simple only)',
      'double = lambda x: x * 2',
    ],
    js: [
      'function greet(name) {',
      '  return `Hello, ${name}`',
      '}',
      '',
      '// Arrow function',
      'const double = x => x * 2',
    ],
  },
  {
    py: [
      'if age >= 18:',
      '    print("adult")',
      'elif age >= 13:',
      '    print("teen")',
      'else:',
      '    print("child")',
    ],
    js: [
      'if (age >= 18) {',
      '  console.log("adult")',
      '} else if (age >= 13) {',
      '  console.log("teen")',
      '} else {',
      '  console.log("child")',
      '}',
    ],
  },
  {
    py: [
      'None       # null equivalent',
      'True/False # capitals!',
      '[1, 2, 3]  # list',
      '"hello"    # string',
      '42         # int / float',
    ],
    js: [
      'null        // no value',
      'true/false  // lowercase!',
      '[1, 2, 3]   // Array',
      '"hello"     // string',
      '42          // number (all floats)',
    ],
  },
  {
    py: [
      'fruits = ["apple", "banana"]',
      '',
      'for fruit in fruits:',
      '    print(fruit)',
      '',
      'for i in range(3):',
      '    print(i)   # 0, 1, 2',
    ],
    js: [
      'const fruits = ["apple", "banana"]',
      '',
      'for (const fruit of fruits) {',
      '  console.log(fruit)',
      '}',
      '',
      'for (let i = 0; i < 3; i++) {',
      '  console.log(i)  // 0, 1, 2',
      '}',
    ],
  },
  {
    py: [
      'user = {',
      '    "name": "Alice",',
      '    "age": 25,',
      '}',
      '',
      'user["name"]   # bracket access',
      'user.get("x")  # safe access',
    ],
    js: [
      'const user = {',
      '  name: "Alice",',
      '  age: 25,',
      '}',
      '',
      'user.name      // dot access',
      'user?.x        // optional chain',
    ],
  },
  {
    py: [
      'import asyncio',
      '',
      'async def fetch_data():',
      '    data = await get_json(url)',
      '    return data',
      '',
      'asyncio.run(fetch_data())',
    ],
    js: [
      '// Built-in in the browser',
      '',
      'async function fetchData() {',
      '  const data = await fetch(url)',
      '  return data.json()',
      '}',
      '',
      'fetchData()',
    ],
  },
  // Step 7 — String methods
  {
    py: [
      '"hello".upper()     # "HELLO"',
      '"  hi  ".strip()    # "hi"',
      '"a,b,c".split(",")  # ["a","b","c"]',
      '",".join(["a","b"]) # "a,b"',
      '"hello".replace("l","r") # "herro"',
      '',
      'f"Hi {name}, age {age}"',
    ],
    js: [
      '"hello".toUpperCase()    // "HELLO"',
      '"  hi  ".trim()          // "hi"',
      '"a,b,c".split(",")       // ["a","b","c"]',
      '["a","b"].join(",")      // "a,b"',
      '"hello".replace("l","r") // "herro"',
      '',
      '`Hi ${name}, age ${age}`',
    ],
  },
  // Step 8 — List / Array methods
  {
    py: [
      'nums = [3, 1, 2]',
      'nums.append(4)  # [3,1,2,4]',
      'nums.pop()      # removes last',
      'nums.sort()     # in-place!',
      'len(nums)       # 3',
      '',
      '# List comprehension',
      '[x*2 for x in nums if x>1]',
    ],
    js: [
      'const nums = [3, 1, 2]',
      'nums.push(4)    // [3,1,2,4]',
      'nums.pop()      // removes last',
      'nums.sort((a,b)=>a-b) // needs fn!',
      'nums.length     // 3',
      '',
      '// Array methods (return new array)',
      'nums.filter(x=>x>1).map(x=>x*2)',
    ],
  },
  // Step 9 — Functional array methods
  {
    py: [
      '# map → list comprehension',
      '[x*2 for x in nums]',
      '',
      '# filter → comprehension with if',
      '[x for x in nums if x > 1]',
      '',
      '# find → next() with default',
      'next((u for u in users',
      '      if u["id"]==1), None)',
      '',
      '# some / every → any / all',
      'any(x > 10 for x in scores)',
      'all(x > 0  for x in scores)',
      '',
      '# reduce → functools.reduce / sum',
      'from functools import reduce',
      'reduce(lambda a,b: a+b, nums)',
    ],
    js: [
      '// map',
      'nums.map(x => x * 2)',
      '',
      '// filter',
      'nums.filter(x => x > 1)',
      '',
      '// find — undefined if not found',
      'users.find(u => u.id === 1)',
      '',
      '// some / every',
      'scores.some(x => x > 10)',
      'scores.every(x => x > 0)',
      '',
      '// reduce',
      'nums.reduce((acc, x) => acc + x, 0)',
    ],
  },
  // Step 10 — Error handling
  {
    py: [
      'try:',
      '    result = 10 / 0',
      'except ZeroDivisionError as e:',
      '    print("Error:", e)',
      'else:',
      '    print("OK:", result)',
      'finally:',
      '    print("always runs")',
    ],
    js: [
      'try {',
      '  const result = riskyFn()',
      '} catch (e) {',
      '  console.error("Error:", e)',
      '} finally {',
      '  console.log("always runs")',
      '}',
      '// JS has no "else" clause',
    ],
  },
]

const DIFF_NOTES: string[] = [
  'Python: no keyword. JS: use const for fixed values, let for mutable.',
  'Python: def + colon. JS: function keyword or arrow =>. Both support defaults.',
  'Python: indentation defines blocks. JS: curly braces + parentheses around conditions.',
  'Python: None/True/False. JS: null/true/false. Python has int vs float; JS has just number.',
  'Python: for x in list. JS: for (const x of arr). JS also has forEach and .map().',
  'Python: dict["key"] or .get(). JS: obj.key or obj?.key (optional chaining).',
  'Python needs asyncio. JS async/await is built-in to the runtime — same keywords, same idea.',
  'Most string method names differ slightly. f-strings (Python) ↔ template literals JS. Strings are immutable in both.',
  'JS .sort() sorts lexicographically by default — always pass a comparator for numbers! Python .sort() is in-place; JS methods like .map()/.filter() return new arrays.',
  '.map() transforms, .filter() keeps, .find() returns first match. some()=any(), every()=all(). reduce() accumulates — Python uses functools.reduce() or sum().',
  'Python has a unique else clause on try (runs only if no exception). JS has no equivalent — just put the code after the try/catch block.',
]

function CodePanel({
  lang,
  color,
  lines,
  compact,
}: {
  lang: string
  color: string
  lines: string[]
  compact: boolean
}) {
  return (
    <div style={{
      flex: 1,
      border: `1.5px solid ${color}44`,
      borderRadius: 8,
      background: 'rgba(0,0,0,0.3)',
      overflow: 'hidden',
      minWidth: 0,
    }}>
      <div style={{
        background: `${color}22`,
        padding: compact ? '3px 8px' : '4px 10px',
        fontFamily: 'var(--font-mono)',
        fontSize: compact ? 9 : 10,
        color,
        fontWeight: 700,
        letterSpacing: '0.3px',
        borderBottom: `1px solid ${color}33`,
      }}>
        {lang}
      </div>
      <div style={{ padding: compact ? '6px 8px' : '8px 12px' }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? 9 : 11,
            color: line === '' ? 'transparent' : line.startsWith('#') || line.startsWith('//') ? MUTED : '#e2e8f0',
            lineHeight: compact ? 1.55 : 1.65,
            whiteSpace: 'pre',
          }}>
            {line || ' '}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function JsVsPythonViz({ step, compact = false }: Props) {
  const s = Math.min(step, stepLabels.length - 1)
  const labelColor = [JS, PY, PURPLE, GREEN, JS, PY, PURPLE, GREEN, JS, PY, JS][s] ?? JS
  const pair = steps[s]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: compact ? 8 : 12, width: '100%' }}>
      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.div key={s}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
          style={{
            background: `${labelColor}22`, border: `1px solid ${labelColor}55`,
            borderRadius: 6, padding: compact ? '4px 10px' : '5px 14px',
            fontSize: compact ? 9 : 10, fontFamily: 'var(--font-mono)',
            fontWeight: 700, color: labelColor, letterSpacing: '0.2px',
            textAlign: 'center', maxWidth: compact ? 260 : 380,
          }}>
          {stepLabels[s]}
        </motion.div>
      </AnimatePresence>

      {/* Language pills */}
      <div style={{ display: 'flex', gap: compact ? 6 : 10 }}>
        {[{ label: '🐍 Python', color: PY }, { label: '⚡ JavaScript', color: JS }].map(l => (
          <div key={l.label} style={{
            fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9,
            color: l.color, background: `${l.color}14`,
            border: `1px solid ${l.color}33`, borderRadius: 4,
            padding: compact ? '2px 6px' : '2px 8px', fontWeight: 700,
          }}>
            {l.label}
          </div>
        ))}
      </div>

      {/* Side-by-side panels */}
      <AnimatePresence mode="wait">
        <motion.div key={s}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', gap: compact ? 6 : 10, width: '100%', maxWidth: compact ? 320 : 480 }}>
          <CodePanel lang="Python" color={PY} lines={pair.py} compact={compact} />
          <CodePanel lang="JavaScript" color={JS} lines={pair.js} compact={compact} />
        </motion.div>
      </AnimatePresence>

      {/* Diff note */}
      <AnimatePresence mode="wait">
        <motion.div key={`note-${s}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: compact ? 8 : 9,
            color: MUTED, textAlign: 'center',
            maxWidth: compact ? 280 : 420, lineHeight: 1.5,
          }}>
          {DIFF_NOTES[s]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
