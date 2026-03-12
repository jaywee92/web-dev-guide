import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { useSearch } from '@/hooks/useSearch'
import LevelBadge from './LevelBadge'
import { LEVELS } from '@/data/levels'

export default function SearchPalette() {
  const { searchOpen, setSearchOpen } = useAppStore()
  const [query, setQuery] = useState('')
  const results = useSearch(query)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [searchOpen])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [setSearchOpen])

  const go = (topicId: string) => {
    navigate(`/topic/${topicId}`)
    setSearchOpen(false)
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, backdropFilter: 'blur(4px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            style={{
              position: 'fixed', top: '15%', left: '50%', transform: 'translateX(-50%)',
              width: '100%', maxWidth: 560, zIndex: 101,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search topics…"
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: 'var(--text)', fontSize: 15,
                }}
              />
              <button onClick={() => setSearchOpen(false)} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 ? (
              <div style={{ padding: 8 }}>
                {results.map(topic => {
                  const level = LEVELS.find(l => l.id === topic.level)!
                  return (
                    <button
                      key={topic.id}
                      onClick={() => go(topic.id)}
                      className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8, width: '100%' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-bright)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
                          {topic.title}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{topic.description}</div>
                      </div>
                      <LevelBadge level={level.id} color={level.color} title={level.title} size="sm" />
                      <ArrowRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    </button>
                  )
                })}
              </div>
            ) : query ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                No topics found for "{query}"
              </div>
            ) : (
              <div style={{ padding: '16px 12px' }}>
                <div style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', padding: '0 8px', marginBottom: 8 }}>
                  SUGGESTIONS
                </div>
                {['CSS Box Model', 'DOM Tree', 'HTTP Request Cycle'].map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13, width: '100%' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-bright)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    <Clock size={12} /> {s}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
