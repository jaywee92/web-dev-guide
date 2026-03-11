import type { Category } from '@/types'

export const CATEGORIES: Category[] = [
  {
    id: 'html',
    title: 'HTML',
    description: 'Structure of the web',
    color: '#4ade80',
    icon: 'FileCode2',
    topicIds: ['html-dom', 'html-semantic', 'html-forms'],
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Style and layout',
    color: '#5b9cf5',
    icon: 'Palette',
    topicIds: [
      'css-basics',
      'css-box-model',
      'css-flexbox',
      'css-grid',
      'css-selectors',
      'css-colors-units',
      'css-typography',
      'css-backgrounds-gradients',
      'css-display-positioning',
      'css-responsive',
      'css-images',
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Language of the browser',
    color: '#fbbf24',
    icon: 'Zap',
    topicIds: ['js-variables', 'js-arrays', 'js-event-loop', 'js-closures'],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScript with types',
    color: '#a78bfa',
    icon: 'Shield',
    topicIds: ['ts-basics', 'ts-interfaces', 'ts-generics'],
  },
  {
    id: 'react',
    title: 'React',
    description: 'Component-based UI',
    color: '#f472b6',
    icon: 'Layers',
    topicIds: ['react-components', 'react-state', 'react-useeffect', 'react-router'],
  },
  {
    id: 'webapis',
    title: 'Web APIs',
    description: 'Browser built-ins',
    color: '#34d399',
    icon: 'Globe',
    topicIds: ['webapi-fetch', 'webapi-events', 'webapi-storage'],
  },
  {
    id: 'http',
    title: 'HTTP',
    description: 'How the web communicates',
    color: '#fb923c',
    icon: 'ArrowLeftRight',
    topicIds: ['http-request-cycle', 'http-rest', 'http-status'],
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: 'Relational databases',
    color: '#60a5fa',
    icon: 'Database',
    topicIds: ['postgres-queries', 'postgres-joins', 'postgres-crud'],
  },
]

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id)
}

export function getCategoryForTopic(topicId: string): Category | undefined {
  return CATEGORIES.find(c => c.topicIds.includes(topicId))
}
