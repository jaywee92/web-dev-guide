import type { ReactNode } from 'react'

export interface Resource {
  id: string
  name: string
  url: string
  description: string
  color: string
  icon: ReactNode
}

export interface ResourceGroup {
  id: string
  label: string
  color: string
  resources: Resource[]
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    id: 'ui-components',
    label: 'UI COMPONENT LIBRARIES',
    color: '#5b9cf5',
    resources: [
      {
        id: 'heroui',
        name: 'HeroUI',
        url: 'https://www.heroui.com',
        description: 'Beautiful, accessible React component library with dark mode, Tailwind integration, and 50+ ready-to-use components.',
        color: '#f472b6',
        icon: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></>,
      },
      {
        id: 'daisyui',
        name: 'DaisyUI',
        url: 'https://daisyui.com',
        description: 'The most popular Tailwind CSS component library. Adds semantic class names so you write less CSS and focus on structure.',
        color: '#4ade80',
        icon: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
      },
      {
        id: 'uiverse',
        name: 'UIverse.io',
        url: 'https://uiverse.io',
        description: 'Open-source community of CSS & Tailwind UI elements. Browse thousands of free buttons, cards, loaders, and more.',
        color: '#a78bfa',
        icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
      },
    ],
  },
  {
    id: 'animated-components',
    label: 'ANIMATED COMPONENTS',
    color: '#f472b6',
    resources: [
      {
        id: 'aceternity',
        name: 'Aceternity UI',
        url: 'https://ui.aceternity.com',
        description: 'Stunning animated React & Tailwind components. Parallax cards, text effects, gradients, and scroll-based animations.',
        color: '#5b9cf5',
        icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
      },
      {
        id: 'magicui',
        name: 'Magic UI',
        url: 'https://magicui.design',
        description: '150+ free animated React components. Border beams, shimmer effects, and attention-grabbing micro-interactions.',
        color: '#38bdf8',
        icon: <path d="M12 2l2 7h7l-6 4 2 7-5-4-5 4 2-7-6-4h7z" />,
      },
      {
        id: 'hover-dev',
        name: 'Hover.dev',
        url: 'https://www.hover.dev',
        description: 'Interactive hover animations and motion effects for React. Ready-to-paste components with spring physics.',
        color: '#fbbf24',
        icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
      },
    ],
  },
  {
    id: 'animation',
    label: 'ANIMATION & MOTION',
    color: '#fb923c',
    resources: [
      {
        id: 'animejs',
        name: 'Anime.js',
        url: 'https://animejs.com',
        description: 'Lightweight JavaScript animation library. Animate CSS properties, SVGs, DOM attributes, and JS objects with a clean API.',
        color: '#fb923c',
        icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
      },
    ],
  },
  {
    id: 'react',
    label: 'REACT RESOURCES',
    color: '#e879f9',
    resources: [
      {
        id: 'reactbits',
        name: 'ReactBits',
        url: 'https://reactbits.dev',
        description: 'Animated React component library with creative UI patterns — backgrounds, text effects, and interactive components.',
        color: '#e879f9',
        icon: <><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="2" fill="#e879f9" stroke="none" /></>,
      },
    ],
  },
  {
    id: 'tools',
    label: 'TOOLS & AI',
    color: '#34d399',
    resources: [
      {
        id: 'v0',
        name: 'v0 by Vercel',
        url: 'https://v0.dev',
        description: 'AI-powered UI generator by Vercel. Describe a component in plain English and get production-ready React + Tailwind code instantly.',
        color: '#34d399',
        icon: <><path d="M12 2a10 10 0 0 1 10 10c0 4-2.5 7.5-6 9.2M12 2a10 10 0 0 0-10 10c0 4 2.5 7.5 6 9.2" /><path d="M12 8v4l3 3" /></>,
      },
      {
        id: 'webcode-tools',
        name: 'WebCode.tools',
        url: 'https://webcode.tools',
        description: 'Collection of handy web code generators. Quickly create CSS gradients, shadows, flexbox layouts, meta tags, and more.',
        color: '#2dd4bf',
        icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
      },
    ],
  },
]
