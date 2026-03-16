import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

const LS_LAST_KEY = 'wdvg-gb-last'
const RATE_LIMIT_MS = 24 * 60 * 60 * 1000 // 24h

export interface GuestbookEntry {
  id: string
  name: string
  emoji: string
  message: string
  created_at: string
}

export interface SubmitPayload {
  name: string
  emoji: string
  message: string
}

export interface UseGuestbookResult {
  entries: GuestbookEntry[]
  loading: boolean
  submitting: boolean
  error: string | null
  canSubmit: boolean
  msUntilNextSubmit: number
  submit: (payload: SubmitPayload) => Promise<boolean>
}

function getLastSubmit(): number {
  try {
    const raw = localStorage.getItem(LS_LAST_KEY)
    return raw ? new Date(raw).getTime() : 0
  } catch {
    return 0
  }
}

function setLastSubmit(): void {
  try { localStorage.setItem(LS_LAST_KEY, new Date().toISOString()) } catch { /* ignore */ }
}

export function useGuestbook(): UseGuestbookResult {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    supabase
      .from('guestbook_entries')
      .select('id, name, emoji, message, created_at')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (data) setEntries(data as GuestbookEntry[])
        if (error) setError(error.message)
        setLoading(false)
      })
  }, [])

  const elapsed = now - getLastSubmit()
  const canSubmit = elapsed >= RATE_LIMIT_MS
  const msUntilNextSubmit = canSubmit ? 0 : RATE_LIMIT_MS - elapsed

  const submit = useCallback(async (payload: SubmitPayload): Promise<boolean> => {
    if (!canSubmit || submitting) return false
    setSubmitting(true)
    setError(null)

    const { data, error } = await supabase.rpc('insert_guestbook_entry', {
      p_name: payload.name.trim(),
      p_emoji: payload.emoji.trim() || '✨',
      p_message: payload.message.trim(),
    })

    if (error) {
      setError(error.message)
      setSubmitting(false)
      return false
    }

    const newEntry: GuestbookEntry = {
      id: data as string,
      name: payload.name.trim(),
      emoji: payload.emoji.trim() || '✨',
      message: payload.message.trim(),
      created_at: new Date().toISOString(),
    }
    setEntries(prev => [newEntry, ...prev])
    setLastSubmit()
    setNow(Date.now())
    setSubmitting(false)
    return true
  }, [canSubmit, submitting])

  return { entries, loading, submitting, error, canSubmit, msUntilNextSubmit, submit }
}
