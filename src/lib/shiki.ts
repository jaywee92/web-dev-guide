import { createHighlighter, type Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['one-dark-pro'],
      langs: ['css', 'html', 'javascript', 'typescript', 'python', 'sql', 'bash'],
    })
  }
  return highlighterPromise
}

export const SUPPORTED_LANGS = new Set(['css', 'html', 'javascript', 'typescript', 'python', 'sql', 'bash'])
