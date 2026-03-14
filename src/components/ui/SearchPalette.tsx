import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { useSearch } from '@/hooks/useSearch'
import { CATEGORIES } from '@/data/categories'

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'none', color: 'inherit', fontWeight: 700 }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function SearchPalette() {
  const { searchOpen, setSearchOpen } = useAppStore()
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(-1)
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
    setActiveIdx(-1)
  }, [query])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [setSearchOpen])

  const go = useCallback((topicId: string) => {
    navigate(`/topic/${topicId}`)
    setSearchOpen(false)
  }, [navigate, setSearchOpen])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!searchOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx(i => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx(i => (i <= 0 ? -1 : i - 1))
      } else if (e.key === 'Enter' && activeIdx >= 0 && activeIdx < results.length) {
        e.preventDefault()
        go(results[activeIdx].id)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [searchOpen, results, activeIdx, go])

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
                {results.map((topic, i) => {
                  const cat = CATEGORIES.find(c => c.id === topic.category)
                  return (
                    <button
                      key={topic.id}
                      onClick={() => go(topic.id)}
                      className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg"
                      style={{
                        background: activeIdx === i ? 'var(--surface-bright)' : 'none',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: 8,
                        width: '100%',
                        transition: 'background 150ms ease',
                      }}
                      onMouseEnter={() => setActiveIdx(i)}
                    >
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        {cat && (
                          <div
                            style={{
                              fontSize: 10,
                              fontFamily: 'var(--font-mono)',
                              color: cat.color,
                              marginBottom: 3,
                              opacity: 0.8,
                            }}
                          >
                            {cat.title}
                          </div>
                        )}
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
                          {highlight(topic.title, query)}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{topic.description}</div>
                      </div>
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
