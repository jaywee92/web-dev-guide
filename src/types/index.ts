export type Level = 1 | 2 | 3 | 4
export type PlaygroundType = 'visual-controls' | 'monaco' | 'none'
export type ThemeMode = 'dark' | 'light'
export type CategoryId = 'html' | 'css' | 'javascript' | 'typescript' | 'react' | 'webapis' | 'http' | 'postgresql'

export interface Category {
  id: CategoryId
  title: string
  description: string
  color: string
  icon: string        // Lucide icon name
  topicIds: string[]  // ordered
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

export interface LevelConfig {
  id: Level
  title: string
  subtitle: string
  color: string
  dimColor: string
  topics: Topic[]
}

export interface Topic {
  id: string
  title: string
  description: string
  level: Level
  category: CategoryId
  color: string
  estimatedMinutes: number
  animationComponent: string
  playgroundType: PlaygroundType
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
