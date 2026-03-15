import { useMemo } from 'react'
import { useTopics } from '@/i18n/hooks'
import type { Topic } from '@/types'

export function useSearch(query: string): Topic[] {
  const topics = useTopics()
  return useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return topics.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [query, topics])
}
