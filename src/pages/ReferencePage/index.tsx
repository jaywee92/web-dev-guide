import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { HTML_REFERENCE } from '@/data/htmlReference'
import { CSS_REFERENCE } from '@/data/cssReference'
import { JS_REFERENCE } from '@/data/jsReference'
import { TS_REFERENCE } from '@/data/tsReference'
import { REACT_REFERENCE } from '@/data/reactReference'
import { TAILWIND_REFERENCE } from '@/data/tailwindReference'
import { NEXTJS_REFERENCE } from '@/data/nextjsReference'
import { WEBAPIS_REFERENCE } from '@/data/webapisReference'
import { POSTGRES_REFERENCE } from '@/data/postgresReference'
import { GIT_REFERENCE } from '@/data/gitReference'
import { TESTING_REFERENCE } from '@/data/testingReference'
import type { ReferenceCategory, ReferenceEntry } from '@/types'
import PageWrapper from '@/components/layout/PageWrapper'
import CategorySection from './CategorySection'
import ReferenceDetail from './ReferenceDetail'

export type RefType = 'html' | 'css' | 'javascript' | 'typescript' | 'react' | 'tailwind' | 'nextjs' | 'webapis' | 'postgresql' | 'git' | 'testing'

export interface SelectedEntry {
  entry: ReferenceEntry
  color: string
  categoryTitle: string
}

interface Props {
  type: RefType
}

const META: Record<RefType, { title: string; color: string; icon: string; data: ReferenceCategory[] }> = {
  html:       { title: 'HTML',       color: '#f97316', icon: '🏷️',  data: HTML_REFERENCE },
  css:        { title: 'CSS',        color: '#5b9cf5', icon: '🎨',  data: CSS_REFERENCE },
  javascript: { title: 'JavaScript', color: '#fbbf24', icon: '⚡',  data: JS_REFERENCE },
  typescript: { title: 'TypeScript', color: '#3b82f6', icon: '🔷',  data: TS_REFERENCE },
  react:      { title: 'React',      color: '#61dafb', icon: '⚛️',  data: REACT_REFERENCE },
  tailwind:   { title: 'Tailwind',   color: '#38bdf8', icon: '🌊',  data: TAILWIND_REFERENCE },
  nextjs:     { title: 'Next.js',    color: '#e2e8f0', icon: '▲',   data: NEXTJS_REFERENCE },
  webapis:    { title: 'Web APIs',   color: '#a78bfa', icon: '🌐',  data: WEBAPIS_REFERENCE },
  postgresql: { title: 'PostgreSQL', color: '#06b6d4', icon: '🐘',  data: POSTGRES_REFERENCE },
  git:        { title: 'Git',        color: '#fb923c', icon: '🌿',  data: GIT_REFERENCE },
  testing:    { title: 'Testing',    color: '#4ade80', icon: '✅',  data: TESTING_REFERENCE },
}

const REF_ORDER: RefType[] = ['html', 'css', 'tailwind', 'javascript', 'typescript', 'react', 'nextjs', 'webapis', 'postgresql', 'git', 'testing']

export default function ReferencePage({ type }: Props) {
  const navigate = useNavigate()
  const meta = META[type]
  const [activeCategory, setActiveCategory] = useState(meta.data[0]?.id ?? '')
  const [selectedEntry, setSelectedEntry] = useState<SelectedEntry | null>(null)
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set())

  useEffect(() => {
    setActiveCategory(meta.data[0]?.id ?? '')
    setSelectedEntry(null)
  }, [type])

  // IntersectionObserver for tab scroll tracking
  useEffect(() => {
    if (selectedEntry) return
    const observers: IntersectionObserver[] = []
    meta.data.forEach(cat => {
      const el = document.getElementById(`cat-${cat.id}`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveCategory(cat.id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [meta.data, selectedEntry])

  const scrollToCategory = (id: string) => {
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleCat = (catId: string) => {
    setExpandedCats(prev => {
      const next = new Set(prev)
      next.has(catId) ? next.delete(catId) : next.add(catId)
      return next
    })
  }

  const handleSelectEntry = (entry: ReferenceEntry, color: string, categoryTitle: string) => {
    setSelectedEntry({ entry, color, categoryTitle })
  }

  return (
    <PageWrapper>
      <div style={{ display: 'flex', height: 'calc(100dvh - 56px)', overflow: 'hidden' }}>

        {/* ── Left sidebar ── */}
        <div style={{
          width: 272, flexShrink: 0,
          borderRight: '1px solid var(--border)',
          overflowY: 'auto',
          padding: '16px 0',
          background: 'var(--surface)',
        }}>
          {REF_ORDER.map(refType => {
            const m = META[refType]
            const isActive = refType === type
            return (
              <div key={refType}>
                {/* Type row */}
                <button
                  onClick={() => {
                    navigate(`/reference/${refType}`)
                    setExpandedCats(new Set())
                  }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer',
                    borderLeft: `3px solid ${isActive ? m.color : 'transparent'}`,
                    backgroundColor: isActive ? `${m.color}0f` : 'transparent',
                  }}
                >
                  <span style={{ fontSize: 14 }}>{m.icon}</span>
                  <span style={{
                    fontSize: 13, fontWeight: isActive ? 700 : 500,
                    color: isActive ? m.color : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}>{m.title}</span>
                </button>

                {/* Categories for active type */}
                {isActive && m.data.map(cat => (
                  <div key={cat.id}>
                    <button
                      onClick={() => { toggleCat(cat.id); scrollToCategory(cat.id) }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '6px 16px 6px 32px', background: 'none', border: 'none', cursor: 'pointer',
                        backgroundColor: activeCategory === cat.id ? `${cat.color}0a` : 'transparent',
                      }}
                    >
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        color: activeCategory === cat.id ? cat.color : 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase',
                      }}>{cat.title}</span>
                      <ChevronDown size={10} style={{
                        color: 'var(--text-faint)',
                        transform: expandedCats.has(cat.id) ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                      }} />
                    </button>

                    {/* Entry rows */}
                    {expandedCats.has(cat.id) && cat.entries.map(entry => (
                      <button
                        key={entry.name}
                        onClick={() => handleSelectEntry(entry, cat.color, cat.title)}
                        style={{
                          width: '100%', textAlign: 'left', padding: '4px 16px 4px 44px',
                          background: 'none', border: 'none', cursor: 'pointer',
                          backgroundColor: selectedEntry?.entry === entry ? `${cat.color}14` : 'transparent',
                          color: selectedEntry?.entry === entry ? cat.color : 'var(--text-muted)',
                          fontSize: 12, fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {entry.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* ── Right panel ── */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {selectedEntry ? (
            <div style={{ padding: 24 }}>
              <button
                onClick={() => setSelectedEntry(null)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)',
                  marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4,
                }}
              >
                ← Back to {meta.title}
              </button>
              {(() => {
                const allEntries = meta.data.flatMap(c => c.entries)
                const idx = allEntries.indexOf(selectedEntry.entry)
                const relatedEntries = selectedEntry.entry.tags
                  ? allEntries
                      .filter(e => e !== selectedEntry.entry && e.tags?.some(t => selectedEntry.entry.tags!.includes(t)))
                      .slice(0, 4)
                      .map(e => {
                        const cat = meta.data.find(c => c.entries.includes(e))
                        return { entry: e, color: cat?.color ?? selectedEntry.color, categoryTitle: cat?.title ?? '' }
                      })
                  : []
                return (
                  <ReferenceDetail
                    entry={selectedEntry.entry}
                    color={selectedEntry.color}
                    categoryTitle={selectedEntry.categoryTitle}
                    type={type}
                    siteUrl=""
                    siteName=""
                    hasPrev={idx > 0}
                    hasNext={idx < allEntries.length - 1}
                    onPrev={() => {
                      const e = allEntries[idx - 1]
                      const cat = meta.data.find(c => c.entries.includes(e))
                      setSelectedEntry({ entry: e, color: cat?.color ?? selectedEntry.color, categoryTitle: cat?.title ?? '' })
                    }}
                    onNext={() => {
                      const e = allEntries[idx + 1]
                      const cat = meta.data.find(c => c.entries.includes(e))
                      setSelectedEntry({ entry: e, color: cat?.color ?? selectedEntry.color, categoryTitle: cat?.title ?? '' })
                    }}
                    relatedEntries={relatedEntries}
                    onSelectRelated={(e, c, ct) => setSelectedEntry({ entry: e, color: c, categoryTitle: ct })}
                  />
                )
              })()}
            </div>
          ) : (
            <>
              {/* Category tabs */}
              <div style={{
                position: 'sticky', top: 0, zIndex: 40,
                background: 'var(--surface-glass, rgba(15,17,23,0.85))',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{
                  padding: '0 24px', display: 'flex', gap: 0, overflowX: 'auto',
                }}>
                  {meta.data.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => scrollToCategory(cat.id)}
                      style={{
                        padding: '12px 14px', fontSize: 11, fontWeight: 600,
                        fontFamily: 'var(--font-mono)', background: 'none', border: 'none',
                        borderBottom: `2px solid ${activeCategory === cat.id ? cat.color : 'transparent'}`,
                        color: activeCategory === cat.id ? cat.color : 'var(--text-muted)',
                        cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s, border-color 0.2s',
                      }}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '32px 24px 80px' }}>
                {meta.data.map(cat => (
                  <CategorySection
                    key={cat.id}
                    id={`cat-${cat.id}`}
                    category={cat}
                    type={type}
                    onSelectEntry={(entry) => handleSelectEntry(entry, cat.color, cat.title)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
