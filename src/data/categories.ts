import type { Category, CategoryId } from '@/types'

export interface CategoryGroup {
  key: string
  label: string
  categoryIds: CategoryId[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'html',
    title: 'HTML',
    description: 'Structure of the web',
    color: '#4ade80',
    icon: 'FileCode2',
    topicIds: ['html-dom', 'html-semantic', 'html-forms'],
    cardLabel: 'Struktur & Semantik',
    cardEmoji: '🏗',
  },
  {
    id: 'css-grundlagen',
    title: 'CSS Grundlagen',
    description: 'Basics · Selektoren · Box Model · Styling',
    color: '#5b9cf5',
    icon: 'Palette',
    topicIds: [
      'css-basics',
      'css-selectors',
      'css-colors-units',
      'css-box-model',
      'css-typography',
      'css-backgrounds-gradients',
      'css-images',
    ],
    cardLabel: 'Grundlagen',
    cardEmoji: '📖',
  },
  {
    id: 'css-layout',
    title: 'CSS Layout',
    description: 'Flex · Grid · Responsive',
    color: '#38bdf8',
    icon: 'LayoutGrid',
    topicIds: [
      'css-display-positioning',
      'css-flexbox',
      'css-grid',
      'css-responsive',
    ],
    cardLabel: 'Layout',
    cardEmoji: '🧩',
  },
  {
    id: 'css-modern',
    title: 'CSS Modern',
    description: 'Variables · Transforms · Animations',
    color: '#a78bfa',
    icon: 'Sparkles',
    topicIds: [
      'css-custom-properties',
      'css-transforms',
      'css-transitions',
      'css-animations',
    ],
    cardLabel: 'Modern',
    cardEmoji: '✨',
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Language of the browser',
    color: '#fbbf24',
    icon: 'Zap',
    topicIds: ['js-variables', 'js-arrays', 'js-event-loop', 'js-closures'],
    cardLabel: 'Grundlagen',
    cardEmoji: '📖',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScript with types',
    color: '#818cf8',
    icon: 'Shield',
    topicIds: ['ts-basics', 'ts-interfaces', 'ts-generics'],
    cardLabel: 'Grundlagen',
    cardEmoji: '📖',
  },
  {
    id: 'react',
    title: 'React',
    description: 'Component-based UI',
    color: '#f472b6',
    icon: 'Layers',
    topicIds: ['react-components', 'react-state', 'react-useeffect', 'react-router'],
    cardLabel: 'Grundlagen',
    cardEmoji: '📖',
  },
  {
    id: 'webapis',
    title: 'Web APIs',
    description: 'Browser built-ins',
    color: '#34d399',
    icon: 'Globe',
    topicIds: ['webapi-fetch', 'webapi-events', 'webapi-storage'],
    cardLabel: 'Browser APIs',
    cardEmoji: '🌐',
  },
  {
    id: 'http',
    title: 'HTTP',
    description: 'How the web communicates',
    color: '#fb923c',
    icon: 'ArrowLeftRight',
    topicIds: ['http-request-cycle', 'http-rest', 'http-status'],
    cardLabel: 'Grundlagen',
    cardEmoji: '📖',
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: 'Relational databases',
    color: '#60a5fa',
    icon: 'Database',
    topicIds: ['postgres-queries', 'postgres-joins', 'postgres-crud'],
    cardLabel: 'SQL Grundlagen',
    cardEmoji: '📖',
  },
]

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    key: 'markup-style',
    label: 'MARKUP & STIL',
    categoryIds: ['html', 'css-grundlagen', 'css-layout', 'css-modern'],
  },
  {
    key: 'programmierung',
    label: 'PROGRAMMIERUNG',
    categoryIds: ['javascript', 'typescript'],
  },
  {
    key: 'frameworks-web',
    label: 'FRAMEWORKS & WEB',
    categoryIds: ['react', 'webapis', 'http', 'postgresql'],
  },
]

export interface TechSectionMeta {
  title: string
  subtitle: string
  color: string
}

export const TECH_SECTION_META: Record<string, TechSectionMeta> = {
  html:        { title: 'HTML',       subtitle: 'Hypertext Markup Language',   color: '#4ade80' },
  css:         { title: 'CSS',        subtitle: 'Cascading Style Sheets',      color: '#5b9cf5' },
  javascript:  { title: 'JavaScript', subtitle: 'Programmiersprache des Webs', color: '#fbbf24' },
  typescript:  { title: 'TypeScript', subtitle: 'Typisiertes JavaScript',      color: '#818cf8' },
  react:       { title: 'React',      subtitle: 'UI Component Framework',      color: '#f472b6' },
  webapis:     { title: 'Web APIs',   subtitle: 'Browser-Schnittstellen',      color: '#34d399' },
  http:        { title: 'HTTP',       subtitle: 'Hypertext Transfer Protocol', color: '#fb923c' },
  postgresql:  { title: 'PostgreSQL', subtitle: 'Relationale Datenbank',       color: '#60a5fa' },
}

/** Returns the tech grouping key for a category.
 *  All css-* categories belong to the 'css' tech section.
 *  All others map 1:1 to their categoryId. */
export function getTechKey(categoryId: CategoryId): string {
  return categoryId.startsWith('css-') ? 'css' : categoryId
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id)
}

export function getCategoryForTopic(topicId: string): Category | undefined {
  return CATEGORIES.find(c => c.topicIds.includes(topicId))
}
