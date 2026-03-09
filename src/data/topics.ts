import type { Topic } from '@/types'

export const TOPICS: Topic[] = [
  {
    id: 'html-dom',
    title: 'The DOM Tree',
    description: 'How browsers parse HTML into a living tree of nodes',
    level: 1,
    color: '#4ade80',
    estimatedMinutes: 12,
    animationComponent: 'DomTreeBuilder',
    playgroundType: 'visual-controls',
    sections: [
      {
        id: 'intro',
        type: 'intro',
        steps: [],
      },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'HTML is just text',
            text: 'When your browser receives an HTML file, it sees plain text — tags, attributes, content. The DOM is what the browser builds from that text.',
            codeExample: '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>',
            language: 'html',
          },
          {
            animationStep: 1,
            heading: 'Parsing starts at the top',
            text: 'The browser reads your HTML top to bottom, creating a node for each element. The <html> tag becomes the root.',
          },
          {
            animationStep: 2,
            heading: 'Children branch outward',
            text: 'Nested elements become child nodes. The tree grows as each tag is parsed.',
          },
          {
            animationStep: 3,
            heading: 'Text is a node too',
            text: 'Every piece of text content between tags is its own text node in the tree.',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
  },
  {
    id: 'css-box-model',
    title: 'CSS Box Model',
    description: 'Every element is a box — content, padding, border, margin',
    level: 1,
    color: '#4ade80',
    estimatedMinutes: 10,
    animationComponent: 'BoxModelViz',
    playgroundType: 'visual-controls',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'Content Box',
            text: 'The innermost area. This is where your text and images live. Width and height apply here by default.',
            codeExample: '.box { width: 200px; height: 100px; }',
            language: 'css',
          },
          {
            animationStep: 1,
            heading: 'Padding',
            text: 'Space between the content and the border. Padding is inside the element — it shares the background color.',
            codeExample: '.box { padding: 24px; }',
            language: 'css',
          },
          {
            animationStep: 2,
            heading: 'Border',
            text: 'A line that wraps around padding and content. Can be styled independently.',
            codeExample: '.box { border: 2px solid #4ade80; }',
            language: 'css',
          },
          {
            animationStep: 3,
            heading: 'Margin',
            text: 'Space outside the border. Pushes other elements away. Margins can collapse between siblings.',
            codeExample: '.box { margin: 16px auto; }',
            language: 'css',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
  },
  {
    id: 'css-flexbox',
    title: 'Flexbox',
    description: 'One-dimensional layout — align items in rows or columns effortlessly',
    level: 1,
    color: '#4ade80',
    estimatedMinutes: 15,
    animationComponent: 'FlexboxViz',
    playgroundType: 'visual-controls',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'The flex container',
            text: 'Add display: flex to a parent and it becomes a flex container. Its direct children become flex items.',
            codeExample: '.container { display: flex; }',
            language: 'css',
          },
          {
            animationStep: 1,
            heading: 'flex-direction',
            text: 'Controls the main axis. Row lays items horizontally, column vertically.',
            codeExample: '.container { flex-direction: row; }',
            language: 'css',
          },
          {
            animationStep: 2,
            heading: 'justify-content',
            text: 'Aligns items along the main axis. flex-start, center, space-between, space-around.',
            codeExample: '.container { justify-content: space-between; }',
            language: 'css',
          },
          {
            animationStep: 3,
            heading: 'align-items',
            text: 'Aligns items along the cross axis (perpendicular to main axis).',
            codeExample: '.container { align-items: center; }',
            language: 'css',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
  },
  {
    id: 'css-grid',
    title: 'CSS Grid',
    description: 'Two-dimensional layout — control rows and columns simultaneously',
    level: 1,
    color: '#4ade80',
    estimatedMinutes: 12,
    animationComponent: 'GridViz',
    playgroundType: 'visual-controls',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'Normal flow — no grid',
            text: 'By default, block elements stack vertically. No grid layout is applied.',
            codeExample: '<div class="container">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</div>',
            language: 'html',
          },
          {
            animationStep: 1,
            heading: 'display: grid',
            text: 'Adding display: grid turns the container into a grid context. Children become grid items.',
            codeExample: '.container { display: grid; }',
            language: 'css',
          },
          {
            animationStep: 2,
            heading: 'grid-template-columns',
            text: 'Defines the column structure. repeat(3, 1fr) creates 3 equal-width columns.',
            codeExample: '.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}',
            language: 'css',
          },
          {
            animationStep: 3,
            heading: 'gap',
            text: 'The gap property adds spacing between rows and columns simultaneously.',
            codeExample: '.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}',
            language: 'css',
          },
          {
            animationStep: 4,
            heading: 'Spanning cells',
            text: 'Items can span multiple columns or rows using grid-column and grid-row.',
            codeExample: '.wide {\n  grid-column: span 2;\n}',
            language: 'css',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
  },
  {
    id: 'js-event-loop',
    title: 'The Event Loop',
    description: 'How JavaScript handles async code with a single thread',
    level: 1,
    color: '#4ade80',
    estimatedMinutes: 14,
    animationComponent: 'EventLoopViz',
    playgroundType: 'none',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'JavaScript is single-threaded',
            text: 'JavaScript runs on a single thread — one operation at a time. The Call Stack tracks what is currently executing.',
            codeExample: '// One thread, one call stack\nconsole.log("start")\n// All code runs here',
            language: 'javascript',
          },
          {
            animationStep: 1,
            heading: 'Synchronous code runs immediately',
            text: 'Regular function calls push onto the Call Stack. When they return, they pop off.',
            codeExample: 'function greet() {\n  console.log("Hello")\n}\ngreet() // pushed → executed → popped',
            language: 'javascript',
          },
          {
            animationStep: 2,
            heading: 'Async code goes to Web APIs',
            text: 'setTimeout, fetch, and event listeners are handled by Web APIs — outside the JS engine. The callback waits in the Task Queue.',
            codeExample: 'setTimeout(() => {\n  console.log("later")\n}, 0) // goes to Web APIs',
            language: 'javascript',
          },
          {
            animationStep: 3,
            heading: 'Stack must be empty first',
            text: 'Even with a 0ms timeout, the callback waits. The Call Stack must finish all synchronous work before the Event Loop picks up queued tasks.',
            codeExample: 'console.log("start")\nsetTimeout(() => console.log("async"), 0)\nconsole.log("end")\n// Logs: start → end → async',
            language: 'javascript',
          },
          {
            animationStep: 4,
            heading: 'The Event Loop',
            text: 'The Event Loop continuously checks: is the Call Stack empty? If yes, it moves the next task from the Queue to the Stack.',
            codeExample: '// Event Loop pseudocode:\nwhile (true) {\n  if (callStack.isEmpty()) {\n    if (taskQueue.hasTask()) {\n      callStack.push(taskQueue.pop())\n    }\n  }\n}',
            language: 'javascript',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
  },
  {
    id: 'http-request-cycle',
    title: 'HTTP Request Cycle',
    description: 'What happens between typing a URL and seeing a webpage',
    level: 3,
    color: '#a78bfa',
    estimatedMinutes: 14,
    animationComponent: 'AnimatedFlow',
    playgroundType: 'none',
    sections: [
      { id: 'intro', type: 'intro', steps: [] },
      {
        id: 'explanation',
        type: 'explanation',
        steps: [
          {
            animationStep: 0,
            heading: 'The client sends a request',
            text: 'Your browser (the client) sends an HTTP request to a server. It includes the method (GET, POST), the URL, and headers.',
          },
          {
            animationStep: 1,
            heading: 'DNS resolution',
            text: 'The domain name is resolved to an IP address by a DNS server. Like a phone book lookup.',
          },
          {
            animationStep: 2,
            heading: 'The server processes',
            text: 'The server receives the request, runs your application code (Flask, Node.js), may query a database.',
          },
          {
            animationStep: 3,
            heading: 'Database query',
            text: 'The app queries the database (PostgreSQL, SQLite) and waits for results.',
          },
          {
            animationStep: 4,
            heading: 'Response sent back',
            text: 'The server sends an HTTP response: status code (200 OK, 404 Not Found), headers, and the body (HTML, JSON).',
          },
        ],
      },
      { id: 'playground', type: 'playground', steps: [] },
    ],
  },
]

export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find(t => t.id === id)
}

export function getTopicsByLevel(level: number): Topic[] {
  return TOPICS.filter(t => t.level === level)
}
