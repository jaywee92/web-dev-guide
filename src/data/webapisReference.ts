import type { ReferenceCategory } from '@/types'

export const WEBAPIS_REFERENCE: ReferenceCategory[] = [
  {
    id: 'dom',
    title: 'DOM',
    color: '#4ade80',
    entries: [
      {
        name: 'querySelector / querySelectorAll',
        description: 'Select DOM elements using CSS selector syntax. querySelector returns the first match; querySelectorAll returns a static NodeList of all matches.',
        example: '// Single element:\nconst btn = document.querySelector("#submit")\nconst nav = document.querySelector(".navbar > ul")\n\n// All matching elements:\nconst items = document.querySelectorAll(".list-item")\nitems.forEach(item => item.classList.add("active"))\n\n// Scoped to a parent:\nconst form = document.querySelector("form")\nconst inputs = form.querySelectorAll("input[required]")',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector',
      },
      {
        name: 'createElement / appendChild / insertAdjacentHTML',
        description: 'Create and insert DOM elements. createElement creates a new element; appendChild/append add children; insertAdjacentHTML parses HTML and inserts relative to an element.',
        example: '// Create and append:\nconst li = document.createElement("li")\nli.textContent = "New item"\nli.className = "list-item"\ndocument.querySelector("ul").appendChild(li)\n\n// append() accepts strings and multiple nodes:\nel.append("text", span, anotherEl)\n\n// insertAdjacentHTML — no re-parse of parent:\nel.insertAdjacentHTML("beforeend", "<li>Item</li>")\n// positions: beforebegin | afterbegin | beforeend | afterend\n\n// Remove:\nel.remove()\nparent.removeChild(child)',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement',
      },
      {
        name: 'classList',
        description: 'Manipulate CSS classes on elements. Provides add, remove, toggle, contains, and replace methods.',
        example: 'const el = document.querySelector(".card")\n\nel.classList.add("active")           // add class\nel.classList.remove("hidden")        // remove class\nel.classList.toggle("expanded")      // toggle (returns new state)\nel.classList.toggle("open", isOpen)  // force value\nel.classList.contains("active")      // true/false\nel.classList.replace("old", "new")   // swap\n\n// Multiple at once:\nel.classList.add("fade", "in", "visible")',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList',
      },
      {
        name: 'DOM traversal',
        description: 'Navigate the DOM tree relative to a known element. closest() walks up the tree; children and parentElement navigate the immediate hierarchy.',
        example: 'const el = document.querySelector(".card")\n\n// Walk up the tree:\nel.parentElement              // direct parent\nel.closest(".container")      // nearest ancestor matching selector\nel.closest("[data-id]")       // ancestor with data-id attribute\n\n// Children:\nel.children                   // HTMLCollection (only elements)\nel.childNodes                 // NodeList (includes text nodes)\nel.firstElementChild          // first child element\nel.lastElementChild           // last child element\nel.children.length            // count child elements\n\n// Siblings:\nel.nextElementSibling         // next sibling element\nel.previousElementSibling     // prev sibling element\n\n// Check containment:\nel.contains(otherEl)          // true if otherEl is inside el',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/closest',
      },
      {
        name: 'getBoundingClientRect / dimensions',
        description: 'Get an element\'s size and position relative to the viewport. offsetWidth/Height give the rendered size; scrollIntoView scrolls the element into view.',
        example: 'const el = document.querySelector(".card")\n\n// Position & size relative to viewport:\nconst rect = el.getBoundingClientRect()\nrect.top      // distance from viewport top\nrect.left     // distance from viewport left\nrect.width    // element width\nrect.height   // element height\nrect.bottom   // rect.top + rect.height\n\n// Is element in viewport?\nconst inView = rect.top >= 0 && rect.bottom <= window.innerHeight\n\n// Rendered size (border-box):\nel.offsetWidth   // width including padding + border\nel.offsetHeight\nel.clientWidth   // width including padding (no border)\nel.scrollHeight  // total scrollable height\n\n// Scroll element into view:\nel.scrollIntoView({ behavior: "smooth", block: "nearest" })',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect',
      },
      {
        name: 'dataset',
        description: 'Read and write data-* attributes on elements. Attribute names are camelCased in JS (data-user-id → dataset.userId).',
        example: '// HTML: <div data-user-id="42" data-role="admin">\nconst el = document.querySelector("[data-user-id]")\n\n// Read:\nconsole.log(el.dataset.userId)  // "42"\nconsole.log(el.dataset.role)    // "admin"\n\n// Write:\nel.dataset.status = "active"\n// creates: data-status="active"\n\n// Delete:\ndelete el.dataset.role\n\n// Iterate:\nfor (const [key, value] of Object.entries(el.dataset)) {\n  console.log(key, value)\n}',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset',
      },
    ],
  },
  {
    id: 'events',
    title: 'Events',
    color: '#f97316',
    entries: [
      {
        name: 'addEventListener / removeEventListener',
        description: 'Attach and detach event handlers. The options object supports once, passive, and capture. Always clean up listeners to avoid memory leaks.',
        example: '// Basic:\ndocument.querySelector("button").addEventListener("click", handleClick)\n\n// With options:\nel.addEventListener("scroll", onScroll, { passive: true })\nel.addEventListener("click", handleOnce, { once: true })\n\n// Remove (requires same function reference):\nfunction handleClick(e) { console.log(e.target) }\nel.addEventListener("click", handleClick)\nel.removeEventListener("click", handleClick)\n\n// AbortController (modern cleanup):\nconst ac = new AbortController()\nel.addEventListener("click", fn, { signal: ac.signal })\nac.abort()  // removes all listeners with this signal',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener',
      },
      {
        name: 'Event object / delegation',
        description: 'The event object provides info about what happened. Event delegation attaches one listener to a parent to handle events from many children.',
        example: '// Event properties:\ndocument.addEventListener("click", (e) => {\n  e.target           // element that was clicked\n  e.currentTarget    // element listener is on\n  e.preventDefault() // stop default (links, forms)\n  e.stopPropagation() // stop bubbling\n  e.key              // for keyboard events\n  e.clientX / e.clientY // mouse position\n})\n\n// Delegation — one listener for many buttons:\ndocument.querySelector("#list").addEventListener("click", (e) => {\n  const item = e.target.closest(".list-item")\n  if (!item) return\n  console.log("clicked:", item.dataset.id)\n})',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Event',
      },
      {
        name: 'CustomEvent',
        description: 'Create and dispatch custom events with arbitrary data. Use bubbles: true to allow them to propagate up the DOM.',
        example: '// Dispatch:\nconst event = new CustomEvent("user:login", {\n  bubbles: true,\n  detail: { userId: 42, username: "alice" },\n})\ndocument.dispatchEvent(event)\n\n// Listen:\ndocument.addEventListener("user:login", (e) => {\n  console.log(e.detail.username)  // "alice"\n})\n\n// Component pattern:\nclass MyComponent extends HTMLElement {\n  notify(data) {\n    this.dispatchEvent(new CustomEvent("change", {\n      bubbles: true,\n      detail: data,\n    }))\n  }\n}',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent',
      },
    ],
  },
  {
    id: 'fetch-storage',
    title: 'Fetch & Storage',
    color: '#5b9cf5',
    entries: [
      {
        name: 'fetch',
        description: 'The modern API for making HTTP requests. Returns a Promise that resolves to a Response object. Always check response.ok before parsing the body.',
        example: '// GET:\nconst res = await fetch("/api/users")\nif (!res.ok) throw new Error(`HTTP ${res.status}`)\nconst users = await res.json()\n\n// POST with JSON body:\nconst res = await fetch("/api/users", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "Alice", role: "admin" }),\n})\n\n// With auth:\nconst res = await fetch("/api/protected", {\n  headers: { Authorization: `Bearer ${token}` },\n})\n\n// Abort:\nconst ac = new AbortController()\nfetch(url, { signal: ac.signal })\nac.abort()',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
      },
      {
        name: 'localStorage / sessionStorage',
        description: 'Store key-value string data in the browser. localStorage persists across sessions; sessionStorage clears when the tab closes. Both are synchronous.',
        example: '// Save:\nlocalStorage.setItem("theme", "dark")\nlocalStorage.setItem("user", JSON.stringify({ id: 1, name: "Alice" }))\n\n// Read:\nconst theme = localStorage.getItem("theme")   // "dark"\nconst user = JSON.parse(localStorage.getItem("user") ?? "null")\n\n// Remove:\nlocalStorage.removeItem("theme")\nlocalStorage.clear()  // remove all\n\n// Session storage (same API, tab-scoped):\nsessionStorage.setItem("draft", JSON.stringify(formData))\n\n// List all keys:\nfor (let i = 0; i < localStorage.length; i++) {\n  const key = localStorage.key(i)\n  console.log(key, localStorage.getItem(key))\n}',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage',
      },
      {
        name: 'URLSearchParams',
        description: 'Parse and build query strings. Works with the URL constructor for full URL manipulation.',
        example: '// Parse query string:\nconst params = new URLSearchParams("page=2&sort=name&order=asc")\nparams.get("page")       // "2"\nparams.has("sort")       // true\nparams.getAll("tag")     // [] or ["js", "ts"]\n\n// Build query string:\nconst q = new URLSearchParams({ search: "hello", page: "1" })\nfetch(`/api/search?${q}`)  // /api/search?search=hello&page=1\n\n// From current URL:\nconst params = new URLSearchParams(window.location.search)\n\n// Modify:\nparams.set("page", "3")\nparams.append("tag", "react")\nparams.delete("sort")',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams',
      },
    ],
  },
  {
    id: 'observers',
    title: 'Observers',
    color: '#a78bfa',
    entries: [
      {
        name: 'IntersectionObserver',
        description: 'Efficiently detect when an element enters or exits the viewport. Use for lazy loading, infinite scroll, and scroll-triggered animations.',
        example: 'const observer = new IntersectionObserver(\n  (entries) => {\n    entries.forEach(entry => {\n      if (entry.isIntersecting) {\n        entry.target.classList.add("visible")\n        observer.unobserve(entry.target) // stop after first trigger\n      }\n    })\n  },\n  {\n    threshold: 0.2,   // 20% visible to trigger\n    rootMargin: "0px 0px -50px 0px",  // shrink trigger zone\n  }\n)\n\n// Observe multiple elements:\ndocument.querySelectorAll(".animate-in").forEach(el => {\n  observer.observe(el)\n})\n\n// Stop observing:\nobserver.disconnect()',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API',
      },
      {
        name: 'ResizeObserver',
        description: 'Watch an element for size changes. More reliable than window resize events for component-level responsive behavior.',
        example: 'const observer = new ResizeObserver((entries) => {\n  for (const entry of entries) {\n    const { width, height } = entry.contentRect\n    console.log(`${width}px × ${height}px`)\n\n    // Example: switch layout at breakpoint:\n    entry.target.classList.toggle("compact", width < 400)\n  }\n})\n\nobserver.observe(document.querySelector(".sidebar"))\n\n// Clean up:\nobserver.unobserve(element)\nobserver.disconnect()',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver',
      },
      {
        name: 'MutationObserver',
        description: 'Watch for DOM changes: added/removed nodes, attribute changes, or text changes. Useful for integrating with third-party DOM mutations.',
        example: 'const observer = new MutationObserver((mutations) => {\n  mutations.forEach(mutation => {\n    if (mutation.type === "childList") {\n      mutation.addedNodes.forEach(node => {\n        console.log("added:", node)\n      })\n    }\n    if (mutation.type === "attributes") {\n      console.log("attr changed:", mutation.attributeName)\n    }\n  })\n})\n\nobserver.observe(document.querySelector("#app"), {\n  childList: true,   // watch child additions/removals\n  subtree: true,     // include all descendants\n  attributes: true,  // watch attribute changes\n  characterData: false,\n})\n\nobserver.disconnect()',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver',
      },
    ],
  },
  {
    id: 'browser-apis',
    title: 'Browser APIs',
    color: '#f59e0b',
    entries: [
      {
        name: 'Clipboard API',
        description: 'Read from and write to the system clipboard. Requires user permission and a secure context (HTTPS or localhost).',
        example: '// Write to clipboard:\nawait navigator.clipboard.writeText("Hello!")\n\n// Read from clipboard:\nconst text = await navigator.clipboard.readText()\nconsole.log(text)\n\n// Copy button pattern:\ndocument.querySelector("#copy-btn").addEventListener("click", async () => {\n  try {\n    await navigator.clipboard.writeText(document.querySelector("code").textContent)\n    showToast("Copied!")\n  } catch {\n    // Fallback for older browsers:\n    document.execCommand("copy")\n  }\n})',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API',
      },
      {
        name: 'Web Workers',
        description: 'Run JavaScript in a background thread to avoid blocking the main thread. Workers cannot access the DOM but communicate via postMessage.',
        example: '// worker.js:\nself.addEventListener("message", (e) => {\n  const result = heavyComputation(e.data)\n  self.postMessage(result)\n})\n\n// main.js:\nconst worker = new Worker("/worker.js")\n\nworker.postMessage({ data: largeArray })\n\nworker.addEventListener("message", (e) => {\n  console.log("result:", e.data)\n})\n\nworker.onerror = (e) => console.error(e)\n\n// Terminate when done:\nworker.terminate()',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API',
      },
      {
        name: 'History API',
        description: 'Manipulate the browser history stack without a full page load. The foundation of client-side routing.',
        example: '// Push a new URL (adds to history):\nhistory.pushState({ page: "about" }, "", "/about")\n\n// Replace current entry (no new history entry):\nhistory.replaceState({ page: "home" }, "", "/")\n\n// Navigate:\nhistory.back()\nhistory.forward()\nhistory.go(-2)  // go back 2 steps\n\n// Listen for back/forward navigation:\nwindow.addEventListener("popstate", (e) => {\n  console.log("navigated to:", location.pathname)\n  console.log("state:", e.state)\n})',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/History_API',
      },
    ],
  },
]
