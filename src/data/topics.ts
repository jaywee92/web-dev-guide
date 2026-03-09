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
