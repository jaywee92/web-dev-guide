import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import type { CategoryId } from '@/types'

interface Props {
  activeTopicId: string
  activeCategoryId: CategoryId
  hasCheatSheet: boolean
  hasPlayground: boolean
  topicTitle: string
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function TopicSidebar({
  activeTopicId,
  activeCategoryId,
  hasCheatSheet,
  hasPlayground,
  topicTitle,
}: Props) {
  const navigate = useNavigate()
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set([activeCategoryId])
  )

  const toggle = (id: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const anchorLinks: Array<{ id: string; label: string }> = [
    { id: 'intro', label: `Was ist ${topicTitle}?` },
    { id: 'viz', label: 'Visualisierung' },
    { id: 'explanation', label: 'Erklärung' },
    ...(hasCheatSheet ? [{ id: 'cheatsheet', label: 'Cheat Sheet' }] : []),
    ...(hasPlayground ? [{ id: 'playground', label: 'Playground' }] : []),
  ]

  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      position: 'sticky',
      top: 72,
      height: 'calc(100vh - 72px)',
      overflowY: 'auto',
      borderRight: '1px solid var(--border)',
      padding: '24px 0',
      scrollbarWidth: 'none',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Category + topic list */}
      <div style={{ flex: 1 }}>
        {CATEGORIES.map(cat => {
          const isOpen = openCategories.has(cat.id)
          const catTopics = TOPICS.filter(t => t.category === cat.id)

          return (
            <div key={cat.id} style={{ marginBottom: 2 }}>
              <button
                onClick={() => toggle(cat.id)}
                aria-expanded={isOpen}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 16px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: cat.id === activeCategoryId ? cat.color : 'var(--text-muted)',
                  fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.3px',
                  borderLeft: cat.id === activeCategoryId
                    ? `2px solid ${cat.color}`
                    : '2px solid transparent',
                }}
              >
                {cat.title}
                {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              </button>

              {isOpen && (
                <div style={{ paddingBottom: 4 }}>
                  {catTopics.map(topic => {
                    const isActive = topic.id === activeTopicId
                    return (
                      <button
                        key={topic.id}
                        onClick={() => navigate(`/topic/${topic.id}`)}
                        aria-current={isActive ? 'page' : undefined}
                        style={{
                          width: '100%', textAlign: 'left',
                          padding: '5px 16px 5px 24px',
                          background: isActive ? `${cat.color}14` : 'none',
                          border: 'none', cursor: 'pointer',
                          color: isActive ? cat.color : 'var(--text-muted)',
                          fontSize: 12,
                          fontWeight: isActive ? 600 : 400,
                          borderLeft: isActive
                            ? `2px solid ${cat.color}`
                            : '2px solid transparent',
                          transition: 'all 0.15s',
                        }}
                      >
                        {topic.title}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* On-page anchor navigation */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '14px 0 0',
        marginTop: 8,
      }}>
        <div style={{
          fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
          letterSpacing: '0.1em', color: 'var(--text-faint)',
          padding: '0 16px', marginBottom: 6,
        }}>
          AUF DIESER SEITE
        </div>
        {anchorLinks.map(link => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            style={{
              width: '100%', textAlign: 'left',
              padding: '4px 16px 4px 20px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-faint)',
              fontSize: 11,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-faint)')}
          >
            {link.label}
          </button>
        ))}
      </div>
    </aside>
  )
}
