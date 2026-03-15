import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

const LS_KEY = 'rv_voted'

function getVoted(): string[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') } catch { return [] }
}

function setVoted(ids: string[]): void {
  try { localStorage.setItem(LS_KEY, JSON.stringify(ids)) } catch { /* ignore */ }
}

export interface UseResourceVotesResult {
  votes: Record<string, number>
  hasVoted: Record<string, boolean>
  submitting: Set<string>
  upvote: (resourceId: string) => Promise<void>
  loading: boolean
}

export function useResourceVotes(): UseResourceVotesResult {
  const [votes, setVotes] = useState<Record<string, number>>({})
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(getVoted().map(id => [id, true]))
  )
  const [submitting, setSubmitting] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('resource_votes')
      .select('resource_id, vote_count')
      .then(({ data }) => {
        if (data) {
          const votesMap = Object.fromEntries(data.map(row => [row.resource_id, row.vote_count]))
          setVotes(votesMap)
          // Reconcile localStorage: drop any IDs that no longer exist in the DB
          const validVoted = getVoted().filter(id => (votesMap[id] ?? 0) > 0)
          setVoted(validVoted)
          setHasVoted(Object.fromEntries(validVoted.map(id => [id, true])))
        }
        setLoading(false)
      })
  }, [])

  const upvote = useCallback(async (id: string) => {
    if (hasVoted[id] || submitting.has(id)) return

    const previousCount = votes[id] ?? 0

    // Optimistic update
    setVotes(v => ({ ...v, [id]: (v[id] ?? 0) + 1 }))
    setHasVoted(h => ({ ...h, [id]: true }))
    setSubmitting(s => { const n = new Set(s); n.add(id); return n })
    const voted = getVoted()
    setVoted([...voted, id])

    const { error } = await supabase.rpc('increment_vote', { rid: id })

    if (error) {
      // Rollback
      setVotes(v => ({ ...v, [id]: previousCount }))
      setHasVoted(h => ({ ...h, [id]: false }))
      setVoted(getVoted().filter(v => v !== id))
    }

    setSubmitting(s => { const n = new Set(s); n.delete(id); return n })
  }, [votes, hasVoted, submitting])

  return { votes, hasVoted, submitting, upvote, loading }
}
