import type { ReferenceCategory } from '@/types'

export const REACT_REFERENCE: ReferenceCategory[] = [
  {
    id: 'components',
    title: 'Components',
    color: '#61dafb',
    entries: [
      {
        name: 'Function component',
        description: 'A React component defined as a JavaScript function that accepts props and returns JSX. The modern standard — class components are rarely used in new code.',
        example: 'interface Props {\n  name: string;\n  age?: number;\n  children?: React.ReactNode;\n}\n\nexport function UserCard({ name, age = 0, children }: Props) {\n  return (\n    <div className="card">\n      <h2>{name}</h2>\n      {age > 0 && <p>Age: {age}</p>}\n      {children}\n    </div>\n  );\n}\n\n// Usage:\n<UserCard name="Alice" age={30}>\n  <p>Additional content</p>\n</UserCard>',
        link: 'https://react.dev/learn/your-first-component',
      },
      {
        name: 'JSX',
        description: 'A syntax extension that looks like HTML but is transformed into React.createElement() calls. Expressions go in {}, class becomes className, and for becomes htmlFor.',
        example: 'function Greeting({ name }: { name: string }) {\n  const isLoggedIn = true;\n  const items = ["HTML", "CSS", "JS"];\n\n  return (\n    <div className="container">        {/* class → className */}\n      <h1>Hello, {name}!</h1>          {/* expression */}\n      {isLoggedIn && <p>Welcome back</p>}  {/* conditional */}\n      <ul>\n        {items.map(item => (             {/* list */}\n          <li key={item}>{item}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}',
        link: 'https://react.dev/learn/writing-markup-with-jsx',
      },
      {
        name: 'key prop',
        description: 'A special prop that helps React identify which items in a list have changed. Use a stable, unique identifier — never use the array index when items can reorder.',
        example: 'const users = [\n  { id: 1, name: "Alice" },\n  { id: 2, name: "Bob" },\n];\n\n// Correct: use a stable unique ID:\nusers.map(user => (\n  <UserCard key={user.id} name={user.name} />\n))\n\n// Avoid: index causes bugs when items reorder/remove:\nusers.map((user, index) => (\n  <UserCard key={index} name={user.name} />  // bug-prone\n))',
        link: 'https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key',
      },
      {
        name: 'React.memo',
        description: 'Wraps a component so it only re-renders when its props change. A performance optimization — use when a component renders the same output for the same props and is expensive to render.',
        example: 'interface Props { name: string; score: number; }\n\n// Without memo: re-renders every time parent renders\nconst Row = ({ name, score }: Props) => (\n  <tr><td>{name}</td><td>{score}</td></tr>\n);\n\n// With memo: skips re-render if name and score unchanged\nconst MemoRow = React.memo(({ name, score }: Props) => (\n  <tr><td>{name}</td><td>{score}</td></tr>\n));\n\n// Custom comparator:\nconst OptimizedRow = React.memo(Row,\n  (prev, next) => prev.score === next.score\n);',
        link: 'https://react.dev/reference/react/memo',
      },
      {
        name: 'Fragments (<>)',
        description: 'Wrap multiple elements without adding an extra DOM node. Use <></> shorthand or <React.Fragment> when you need a key.',
        example: '// Shorthand (no extra DOM node):\nfunction UserInfo() {\n  return (\n    <>\n      <h1>Alice</h1>\n      <p>Developer</p>\n      <p>Berlin</p>\n    </>\n  );\n}\n\n// With key (required in lists):\nfunction Items({ items }) {\n  return items.map(item => (\n    <React.Fragment key={item.id}>\n      <dt>{item.name}</dt>\n      <dd>{item.description}</dd>\n    </React.Fragment>\n  ));\n}',
        link: 'https://react.dev/reference/react/Fragment',
      },
      {
        name: 'forwardRef',
        description: 'Allows a component to expose a DOM element ref to its parent. Essential when parent needs to focus, measure, or control a DOM element inside a child component.',
        example: 'import { forwardRef } from "react";\n\nconst Input = forwardRef<HTMLInputElement, InputProps>(\n  function Input({ label, ...props }, ref) {\n    return (\n      <label>\n        {label}\n        <input ref={ref} {...props} />\n      </label>\n    );\n  }\n);\n\n// Parent can now control the input directly:\nfunction Form() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  return (\n    <>\n      <Input ref={inputRef} label="Email" />\n      <button onClick={() => inputRef.current?.focus()}>\n        Focus input\n      </button>\n    </>\n  );\n}',
        link: 'https://react.dev/reference/react/forwardRef',
      },
    ],
  },
  {
    id: 'hooks-state',
    title: 'State Hooks',
    color: '#4ade80',
    entries: [
      {
        name: 'useState',
        description: 'Declares a state variable. Returns the current value and a setter function. Re-renders the component when state changes.',
        example: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const [name, setName] = useState("");\n\n  return (\n    <>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>+1</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n      <input value={name} onChange={e => setName(e.target.value)} />\n    </>\n  );\n}\n\n// Expensive initial value — use lazy initializer:\nconst [data, setData] = useState(() => heavyCompute());',
        link: 'https://react.dev/reference/react/useState',
      },
      {
        name: 'useReducer',
        description: 'An alternative to useState for complex state logic with multiple related values or next state that depends on previous state.',
        example: 'type State = { count: number; status: "idle" | "loading" };\ntype Action =\n  | { type: "increment" }\n  | { type: "set_loading"; loading: boolean };\n\nfunction reducer(state: State, action: Action): State {\n  switch (action.type) {\n    case "increment":\n      return { ...state, count: state.count + 1 };\n    case "set_loading":\n      return { ...state, status: action.loading ? "loading" : "idle" };\n    default:\n      return state;\n  }\n}\n\nconst [state, dispatch] = useReducer(reducer, { count: 0, status: "idle" });\ndispatch({ type: "increment" });',
        link: 'https://react.dev/reference/react/useReducer',
      },
      {
        name: 'useRef',
        description: 'Returns a mutable ref object that persists across renders. Used for DOM references and storing mutable values that should not trigger re-renders.',
        example: 'import { useRef } from "react";\n\nfunction VideoPlayer() {\n  // DOM ref:\n  const videoRef = useRef<HTMLVideoElement>(null);\n\n  // Mutable value (no re-render on change):\n  const renderCount = useRef(0);\n  renderCount.current++;\n\n  return (\n    <>\n      <video ref={videoRef} src="/video.mp4" />\n      <button onClick={() => videoRef.current?.play()}>Play</button>\n      <button onClick={() => videoRef.current?.pause()}>Pause</button>\n    </>\n  );\n}',
        link: 'https://react.dev/reference/react/useRef',
      },
      {
        name: 'useId',
        description: 'Generates a unique ID that is stable between server and client renders. Use for accessibility attributes like aria-describedby and form label associations.',
        example: 'import { useId } from "react";\n\nfunction PasswordInput() {\n  const id = useId();           // ":r1:" or similar\n  const descId = `${id}-desc`;\n\n  return (\n    <div>\n      <label htmlFor={id}>Password</label>\n      <input\n        type="password"\n        id={id}\n        aria-describedby={descId}\n      />\n      <p id={descId}>Must be at least 8 characters.</p>\n    </div>\n  );\n}',
        link: 'https://react.dev/reference/react/useId',
      },
    ],
  },
  {
    id: 'hooks-effects',
    title: 'Effect Hooks',
    color: '#f59e0b',
    entries: [
      {
        name: 'useEffect',
        description: 'Runs side effects after render. The cleanup function runs before the next effect and on unmount. The dependency array controls when the effect re-runs.',
        example: 'import { useEffect, useState } from "react";\n\nfunction UserProfile({ userId }: { userId: number }) {\n  const [user, setUser] = useState<User | null>(null);\n\n  useEffect(() => {\n    const controller = new AbortController();\n\n    fetch(`/api/users/${userId}`, { signal: controller.signal })\n      .then(r => r.json())\n      .then(setUser)\n      .catch(err => { if (err.name !== "AbortError") throw err; });\n\n    // Cleanup: cancel request on unmount / userId change\n    return () => controller.abort();\n  }, [userId]);  // re-runs when userId changes\n\n  return user ? <p>{user.name}</p> : <p>Loading...</p>;\n}',
        link: 'https://react.dev/reference/react/useEffect',
      },
      {
        name: 'useEffect deps array',
        description: 'Controls when the effect runs. Empty array [] runs once on mount. Specified deps run when those values change. No array runs after every render.',
        example: 'useEffect(() => {\n  // Runs after EVERY render (no array)\n});\n\nuseEffect(() => {\n  // Runs ONCE on mount (empty array)\n  document.title = "App loaded";\n}, []);\n\nuseEffect(() => {\n  // Runs when count or userId changes:\n  console.log(count, userId);\n}, [count, userId]);\n\n// Caution: don\'t lie about dependencies.\n// ESLint exhaustive-deps rule helps.',
        link: 'https://react.dev/reference/react/useEffect#specifying-reactive-dependencies',
      },
      {
        name: 'useLayoutEffect',
        description: 'Like useEffect but fires synchronously after all DOM mutations and before the browser paints. Use for reading DOM layout or preventing visual flicker.',
        example: 'import { useLayoutEffect, useRef, useState } from "react";\n\nfunction Tooltip({ text }: { text: string }) {\n  const ref = useRef<HTMLDivElement>(null);\n  const [pos, setPos] = useState({ top: 0, left: 0 });\n\n  useLayoutEffect(() => {\n    // Read DOM dimensions before paint — prevents flicker\n    const rect = ref.current!.getBoundingClientRect();\n    setPos({ top: rect.top - 32, left: rect.left });\n  }, []);\n\n  return <div ref={ref} style={pos}>{text}</div>;\n}',
        link: 'https://react.dev/reference/react/useLayoutEffect',
      },
      {
        name: 'Custom hooks',
        description: 'Functions starting with "use" that call other hooks. Extract reusable stateful logic from components into shareable hooks.',
        example: '// Custom hook: useLocalStorage\nfunction useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initial;\n  });\n\n  const set = (newValue: T) => {\n    setValue(newValue);\n    localStorage.setItem(key, JSON.stringify(newValue));\n  };\n\n  return [value, set] as const;\n}\n\n// Usage:\nconst [theme, setTheme] = useLocalStorage("theme", "dark");',
        link: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
      },
    ],
  },
  {
    id: 'hooks-context',
    title: 'Context & Performance',
    color: '#a78bfa',
    entries: [
      {
        name: 'createContext / useContext',
        description: 'Passes data through the component tree without prop drilling. Every consumer re-renders when the context value changes.',
        example: 'import { createContext, useContext, useState } from "react";\n\ninterface ThemeCtx { theme: string; toggle: () => void; }\nconst ThemeContext = createContext<ThemeCtx | null>(null);\n\nexport function ThemeProvider({ children }: { children: React.ReactNode }) {\n  const [theme, setTheme] = useState("dark");\n  return (\n    <ThemeContext.Provider value={{ theme, toggle: () =>\n      setTheme(t => t === "dark" ? "light" : "dark")\n    }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nexport function useTheme() {\n  const ctx = useContext(ThemeContext);\n  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");\n  return ctx;\n}',
        link: 'https://react.dev/reference/react/createContext',
      },
      {
        name: 'useCallback',
        description: 'Memoizes a function so its reference stays stable between renders. Use when passing callbacks to memo-wrapped components or as effect dependencies.',
        example: 'import { useCallback, memo } from "react";\n\nconst Button = memo(function Button({ onClick, label }) {\n  console.log("Button renders");\n  return <button onClick={onClick}>{label}</button>;\n});\n\nfunction Parent() {\n  const [count, setCount] = useState(0);\n\n  // Without useCallback: new function on every render → Button re-renders\n  // With useCallback: same function reference → Button skips re-render\n  const handleClick = useCallback(() => {\n    setCount(c => c + 1);\n  }, []);  // no deps — function never changes\n\n  return <Button onClick={handleClick} label="Increment" />;\n}',
        link: 'https://react.dev/reference/react/useCallback',
      },
      {
        name: 'useMemo',
        description: 'Memoizes the result of an expensive calculation — only recomputes when dependencies change.',
        example: 'import { useMemo } from "react";\n\nfunction FilteredList({ items, filter }: Props) {\n  // Without useMemo: recalculates on every render\n  // With useMemo: only recalculates when items or filter change\n  const filtered = useMemo(\n    () => items\n      .filter(i => i.name.includes(filter))\n      .sort((a, b) => a.name.localeCompare(b.name)),\n    [items, filter]  // deps\n  );\n\n  return filtered.map(item => <Item key={item.id} {...item} />);\n}\n\n// Also used for stable object references:\nconst options = useMemo(() => ({ limit: 10, page }), [page]);',
        link: 'https://react.dev/reference/react/useMemo',
      },
      {
        name: 'Suspense / lazy()',
        description: 'React.lazy() dynamically imports a component; Suspense shows a fallback while it loads. Used for code splitting.',
        example: 'import { lazy, Suspense } from "react";\n\n// Code-split: only loaded when rendered\nconst Dashboard = lazy(() => import("./Dashboard"));\nconst Settings = lazy(() => import("./Settings"));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      {page === "dashboard" ? <Dashboard /> : <Settings />}\n    </Suspense>\n  );\n}\n\n// Nested Suspense for granular loading:\n<Suspense fallback={<PageSkeleton />}>\n  <Layout>\n    <Suspense fallback={<SpinnerSmall />}>\n      <Comments postId={id} />\n    </Suspense>\n  </Layout>\n</Suspense>',
        link: 'https://react.dev/reference/react/lazy',
      },
    ],
  },
  {
    id: 'events',
    title: 'Events & Forms',
    color: '#fb923c',
    entries: [
      {
        name: 'Event handlers',
        description: 'React uses synthetic events that wrap native DOM events. Handler names are camelCase (onClick vs onclick). Always receive a typed SyntheticEvent.',
        example: 'function App() {\n  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {\n    e.preventDefault();\n    console.log("Clicked at", e.clientX, e.clientY);\n  }\n\n  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {\n    console.log("Value:", e.target.value);\n  }\n\n  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {\n    e.preventDefault();\n    // process form\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input onChange={handleChange} />\n      <button onClick={handleClick}>Submit</button>\n    </form>\n  );\n}',
        link: 'https://react.dev/learn/responding-to-events',
      },
      {
        name: 'Controlled input',
        description: 'An input whose value is controlled by React state. The state is the single source of truth — the input always shows the current state.',
        example: 'function SearchInput() {\n  const [query, setQuery] = useState("");\n\n  return (\n    <input\n      type="text"\n      value={query}               // controlled\n      onChange={e => setQuery(e.target.value)}\n      placeholder="Search..."\n    />\n  );\n}\n\n// Controlled form:\nfunction LoginForm() {\n  const [form, setForm] = useState({ email: "", password: "" });\n\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));\n  };\n\n  return (\n    <form>\n      <input name="email" value={form.email} onChange={handleChange} />\n      <input name="password" value={form.password} onChange={handleChange} />\n    </form>\n  );\n}',
        link: 'https://react.dev/reference/react-dom/components/input',
      },
    ],
  },
  {
    id: 'patterns',
    title: 'Patterns',
    color: '#f472b6',
    entries: [
      {
        name: 'Conditional rendering',
        description: 'Render different JSX based on conditions. Use && for optional content, ternary for one-or-the-other, and variables for complex logic.',
        example: 'function Status({ isLoading, error, data }) {\n  // Early return for complex cases:\n  if (isLoading) return <Spinner />;\n  if (error) return <Error message={error.message} />;\n\n  return (\n    <div>\n      {/* && — render if truthy: */}\n      {data.items.length > 0 && <p>{data.items.length} items</p>}\n\n      {/* Ternary — one or the other: */}\n      {data.premium ? <PremiumBadge /> : <UpgradeBanner />}\n    </div>\n  );\n}',
        link: 'https://react.dev/learn/conditional-rendering',
      },
      {
        name: 'Lifting state up',
        description: 'When two sibling components need to share state, lift it to their common ancestor. The parent owns the state and passes it down as props.',
        example: '// Parent owns the state:\nfunction FilteredList() {\n  const [filter, setFilter] = useState("");\n  const [items] = useState(["Apple", "Banana", "Cherry"]);\n\n  const filtered = items.filter(i =>\n    i.toLowerCase().includes(filter.toLowerCase())\n  );\n\n  return (\n    <>\n      {/* Sibling 1: controls the filter */}\n      <SearchInput value={filter} onChange={setFilter} />\n      {/* Sibling 2: displays filtered results */}\n      <ItemList items={filtered} />\n    </>\n  );\n}',
        link: 'https://react.dev/learn/sharing-state-between-components',
      },
      {
        name: 'createPortal',
        description: 'Renders children into a DOM node outside the parent component\'s DOM hierarchy. Used for modals, tooltips, and notifications.',
        example: 'import { createPortal } from "react-dom";\n\nfunction Modal({ isOpen, onClose, children }) {\n  if (!isOpen) return null;\n\n  return createPortal(\n    <div className="modal-overlay" onClick={onClose}>\n      <div className="modal-content" onClick={e => e.stopPropagation()}>\n        {children}\n        <button onClick={onClose}>Close</button>\n      </div>\n    </div>,\n    document.getElementById("modal-root")!  // render outside app root\n  );\n}',
        link: 'https://react.dev/reference/react-dom/createPortal',
      },
      {
        name: 'useOptimistic',
        description: 'Updates the UI optimistically before a server action completes. Rolls back to the actual state if the action fails. Part of React 19.',
        example: 'import { useOptimistic } from "react";\n\nfunction LikeButton({ post }) {\n  const [optimisticLikes, addOptimisticLike] = useOptimistic(\n    post.likes,\n    (currentLikes, increment) => currentLikes + increment\n  );\n\n  async function handleLike() {\n    addOptimisticLike(1);      // update UI immediately\n    await likePost(post.id);  // actual server call\n    // if error, reverts to post.likes automatically\n  }\n\n  return (\n    <button onClick={handleLike}>\n      ♥ {optimisticLikes}\n    </button>\n  );\n}',
        link: 'https://react.dev/reference/react/useOptimistic',
      },
    ],
  },
]
