import { useMemo } from 'react'
import { TOPICS } from '@/data/topics'
import type { Topic } from '@/types'

export function useSearch(query: string): Topic[] {
  return useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return TOPICS.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [query])
}
