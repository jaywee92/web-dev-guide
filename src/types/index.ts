import type { ComponentType } from 'react'

export type Level = 1 | 2 | 3 | 4
export type PlaygroundType = 'visual-controls' | 'monaco' | 'none'
export type ThemeMode = 'dark' | 'light'

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
  color: string
  estimatedMinutes: number
  animationComponent: string
  playgroundType: PlaygroundType
  sections: Section[]
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
