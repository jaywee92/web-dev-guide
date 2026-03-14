export type PlaygroundType = 'visual-controls' | 'monaco' | 'none' | 'gradient' | 'css-live'
export type ThemeMode = 'dark' | 'light'
export type CategoryId = 'html-core' | 'html-structure' | 'html-interactive'
  | 'css-basics' | 'css-layout' | 'css-modern'
  | 'javascript' | 'typescript' | 'react' | 'webapis' | 'http' | 'postgresql'
  | 'git' | 'git-collab'

export interface Category {
  id: CategoryId
  title: string
  description: string
  color: string
  icon: string        // Lucide icon name
  topicIds: string[]  // ordered
  cardLabel?: string   // short label shown on the homepage card, e.g. "Grundlagen" (falls back to title)
  cardEmoji?: string   // emoji shown next to cardLabel, e.g. "📖" (falls back to '📖')
}

export interface CheatSheetSyntax {
  label: string
  code: string
  note?: string
}

export interface CheatSheetPattern {
  title: string
  code: string
  language?: string
}

export interface CheatSheet {
  syntax?: CheatSheetSyntax[]
  patterns?: CheatSheetPattern[]
  whenToUse?: string
  commonMistakes?: string[]
}

export interface Topic {
  id: string
  title: string
  description: string
  category: CategoryId
  color: string
  estimatedMinutes: number
  animationComponent: string
  bannerComponent?: string
  playgroundType: PlaygroundType
  defaultCSS?: string      // pre-filled CSS for css-live playground
  previewHTML?: string     // fixed HTML template for css-live preview
  nextTopicId?: string
  sections: Section[]
  cheatSheet?: CheatSheet
}

export interface Section {
  id: string
  type: 'intro' | 'explanation' | 'playground'
  steps: ExplanationStep[]
}

export interface ExplanationStep {
  animationStep: number
  heading: string
  text: string
  icon?: string        // emoji shown in the story card visual header
  codeExample?: string
  language?: string
}

export interface SearchResult {
  topic: Topic
  matchedIn: 'title' | 'description' | 'content'
}

export interface ReferenceEntry {
  name: string
  description: string
  example: string
  link: string
  tags?: string[]
}

export interface ReferenceCategory {
  id: string
  title: string
  color: string
  entries: ReferenceEntry[]
}
