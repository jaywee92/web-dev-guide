import type { LevelConfig } from '@/types'

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'Fundamentals',
    subtitle: 'HTML · CSS · JavaScript',
    color: '#4ade80',
    dimColor: 'rgba(74,222,128,0.12)',
    topics: [],
  },
  {
    id: 2,
    title: 'Modern Frontend',
    subtitle: 'TypeScript · React · Tailwind',
    color: '#5b9cf5',
    dimColor: 'rgba(91,156,245,0.12)',
    topics: [],
  },
  {
    id: 3,
    title: 'Backend & Databases',
    subtitle: 'Flask · PostgreSQL',
    color: '#a78bfa',
    dimColor: 'rgba(167,139,250,0.12)',
    topics: [],
  },
  {
    id: 4,
    title: 'Tooling & Deployment',
    subtitle: 'Git · GitHub Pages · Vercel',
    color: '#f5c542',
    dimColor: 'rgba(245,197,66,0.15)',
    topics: [],
  },
]
