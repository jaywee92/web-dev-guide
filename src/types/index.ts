export type PlaygroundType = 'visual-controls' | 'monaco' | 'none' | 'gradient' | 'css-live'
export type ThemeMode = 'dark' | 'light'
export type CategoryId = 'html-core' | 'html-structure' | 'html-interactive'
  | 'css-basics' | 'css-layout' | 'css-modern' | 'css-frameworks'
  | 'javascript' | 'javascript-oop' | 'javascript-async'
  | 'typescript' | 'typescript-advanced' | 'typescript-react'
  | 'react' | 'react-ecosystem'
  | 'nextjs' | 'nextjs-rendering' | 'nextjs-data'
  | 'webapis' | 'http' | 'postgresql'
  | 'git' | 'git-collab' | 'testing'

export interface Category {
  id: CategoryId
  title: string
  description: string
  color: string
  icon: string        // Lucide icon name
  topicIds: string[]  // ordered
  cardLabel?: string
  cardEmoji?: string
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
  animationComponent?: string
  bannerComponent?: string
  analogyComponent?: string
  playgroundType: PlaygroundType
  defaultCSS?: string      // pre-filled CSS for css-live playground
  previewHTML?: string     // fixed HTML template for css-live preview
  nextTopicId?: string
  sections: Section[]
  cheatSheet?: CheatSheet
  commonErrors?: CommonError[]
  realWorldExamples?: RealWorldExample[]
  playgroundExamples?: PlaygroundExample[]
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
  expandedText?: string  // deeper explanation, shown on demand via "+ Learn more"
  videoClip?: string   // path relative to public/, e.g. "videos/react/rc-jsx.mp4"
  analogy?: {
    icon: string     // emoji, e.g. "🎒"
    title: string    // shown in analogy panel header
    text: string[]   // 2–3 paragraphs of plain text
  }
}

export interface CommonError {
  title: string      // short error description
  why: string        // 1–2 sentences explaining root cause
  fixLabel: string   // e.g. "Fix — use let instead of var"
  fixCode: string    // corrected code snippet
}

export interface RealWorldExample {
  context: string    // e.g. "React Hooks"
  heading: string    // e.g. "useState internals"
  description: string
  code: string
}

export interface PlaygroundExample {
  label: string      // tab label, e.g. "Counter Factory"
  code: string       // pre-filled starter code
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
  previewHtml?: string   // full HTML doc for live preview (CSS entries); HTML entries auto-generate it
}

export interface ReferenceCategory {
  id: string
  title: string
  color: string
  entries: ReferenceEntry[]
}
