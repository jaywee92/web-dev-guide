import type { Category, CategoryId } from '@/types'

export interface CategoryGroup {
  key: string
  label: string
  categoryIds: CategoryId[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'html-core',
    title: 'HTML Basics',
    description: 'Elements · Attributes · Text · Links · Lists',
    color: '#4ade80',
    icon: 'FileCode2',
    topicIds: ['html-basics', 'html-text', 'html-links-images', 'html-lists'],
    cardLabel: 'Basics',
    cardEmoji: '📖',
  },
  {
    id: 'html-structure',
    title: 'HTML Structure',
    description: 'Semantic Elements · DOM Tree',
    color: '#34d399',
    icon: 'Layout',
    topicIds: ['html-semantic', 'html-dom'],
    cardLabel: 'Structure',
    cardEmoji: '🏗',
  },
  {
    id: 'html-interactive',
    title: 'Forms & Media',
    description: 'Forms · Inputs · Video · Audio · Embeds',
    color: '#6ee7b7',
    icon: 'MousePointer2',
    topicIds: ['html-forms', 'html-media'],
    cardLabel: 'Interactive',
    cardEmoji: '🎮',
  },
  {
    id: 'css-basics',
    title: 'CSS Basics',
    description: 'Basics · Selectors · Box Model · Styling',
    color: '#5b9cf5',
    icon: 'Palette',
    topicIds: [
      'css-basics',
      'css-selectors',
      'css-colors-units',
      'css-box-model',
      'css-typography',
      'css-backgrounds-gradients',
      'css-shadows',
      'css-images',
    ],
    cardLabel: 'Basics',
    cardEmoji: '📖',
  },
  {
    id: 'css-layout',
    title: 'CSS Layout',
    description: 'Flex · Grid · Overflow · Responsive',
    color: '#38bdf8',
    icon: 'LayoutGrid',
    topicIds: [
      'css-display-positioning',
      'css-flexbox',
      'css-grid',
      'css-responsive',
      'css-overflow',
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
    cardLabel: 'Basics',
    cardEmoji: '📖',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScript with types',
    color: '#818cf8',
    icon: 'Shield',
    topicIds: ['ts-basics', 'ts-interfaces', 'ts-generics'],
    cardLabel: 'Basics',
    cardEmoji: '📖',
  },
  {
    id: 'react',
    title: 'React',
    description: 'Component-based UI',
    color: '#f472b6',
    icon: 'Layers',
    topicIds: ['react-components', 'react-state', 'react-useeffect', 'react-router'],
    cardLabel: 'Basics',
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
    cardLabel: 'Basics',
    cardEmoji: '📖',
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: 'Relational databases',
    color: '#60a5fa',
    icon: 'Database',
    topicIds: ['postgres-queries', 'postgres-joins', 'postgres-crud'],
    cardLabel: 'SQL Basics',
    cardEmoji: '📖',
  },
]

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    key: 'markup-style',
    label: 'MARKUP & STYLE',
    categoryIds: ['html-core', 'html-structure', 'html-interactive', 'css-basics', 'css-layout', 'css-modern'],
  },
  {
    key: 'programmierung',
    label: 'PROGRAMMING',
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
  html:        { title: 'HTML',       subtitle: 'Hypertext Markup Language',  color: '#4ade80' },
  css:         { title: 'CSS',        subtitle: 'Cascading Style Sheets',     color: '#5b9cf5' },
  javascript:  { title: 'JavaScript', subtitle: 'Language of the Web',        color: '#fbbf24' },
  typescript:  { title: 'TypeScript', subtitle: 'Typed JavaScript',           color: '#818cf8' },
  react:       { title: 'React',      subtitle: 'UI Component Framework',     color: '#f472b6' },
  webapis:     { title: 'Web APIs',   subtitle: 'Browser Interfaces',         color: '#34d399' },
  http:        { title: 'HTTP',       subtitle: 'Hypertext Transfer Protocol',color: '#fb923c' },
  postgresql:  { title: 'PostgreSQL', subtitle: 'Relational Database',        color: '#60a5fa' },
}

/** Returns the tech grouping key for a category.
 *  All css-* categories belong to the 'css' tech section.
 *  All others map 1:1 to their categoryId. */
export function getTechKey(categoryId: CategoryId): string {
  if (categoryId.startsWith('html-')) return 'html'
  if (categoryId.startsWith('css-')) return 'css'
  return categoryId
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id)
}

export function getCategoryForTopic(topicId: string): Category | undefined {
  return CATEGORIES.find(c => c.topicIds.includes(topicId))
}

/** English display labels for topic IDs (used on homepage subcategory cards) */
export const TOPIC_LABELS: Record<string, string> = {
  'html-basics':        'Elements & Attributes',
  'html-text':          'Text & Headings',
  'html-links-images':  'Links & Images',
  'html-lists':         'Lists & Structure',
  'html-media':         'Media & Embeds',
  'html-dom':                    'DOM',
  'html-semantic':               'Semantics',
  'html-forms':                  'Forms',
  'css-basics':                  'Basics',
  'css-selectors':               'Selectors',
  'css-colors-units':            'Colors & Units',
  'css-box-model':               'Box Model',
  'css-typography':              'Typography',
  'css-backgrounds-gradients':   'Backgrounds',
  'css-shadows':                 'Shadows',
  'css-images':                  'Images',
  'css-overflow':                'Overflow',
  'css-display-positioning':     'Display & Position',
  'css-flexbox':                 'Flexbox',
  'css-grid':                    'Grid',
  'css-responsive':              'Responsive',
  'css-custom-properties':       'Custom Properties',
  'css-transforms':              'Transforms',
  'css-transitions':             'Transitions',
  'css-animations':              'Animations',
  'js-variables':                'Variables',
  'js-arrays':                   'Arrays',
  'js-event-loop':               'Event Loop',
  'js-closures':                 'Closures',
  'ts-basics':                   'Basics',
  'ts-interfaces':               'Interfaces',
  'ts-generics':                 'Generics',
  'react-components':            'Components',
  'react-state':                 'State',
  'react-useeffect':             'useEffect',
  'react-router':                'Router',
  'webapi-fetch':                'Fetch API',
  'webapi-events':               'Events',
  'webapi-storage':              'Storage',
  'http-request-cycle':          'Request Cycle',
  'http-rest':                   'REST',
  'http-status':                 'Status Codes',
  'postgres-queries':            'Queries',
  'postgres-joins':              'Joins',
  'postgres-crud':               'CRUD',
}
