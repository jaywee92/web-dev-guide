import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import type { CategoryId } from '@/types'

interface Props {
  activeTopicId: string
  activeCategoryId: CategoryId
}

export default function TopicSidebar({ activeTopicId, activeCategoryId }: Props) {
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
    }}>
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
    </aside>
  )
}
