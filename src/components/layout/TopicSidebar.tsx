import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { CATEGORIES, CATEGORY_GROUPS, getTechKey, TECH_SECTION_META } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import type { Category, CategoryId } from '@/types'

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

/** Build ordered tech sections from all category groups */
function buildTechSections(): Array<{ techKey: string; categories: Category[] }> {
  const sections: Array<{ techKey: string; categories: Category[] }> = []
  for (const group of CATEGORY_GROUPS) {
    for (const catId of group.categoryIds) {
      const cat = CATEGORIES.find(c => c.id === catId)
      if (!cat) continue
      const key = getTechKey(catId)
      const last = sections[sections.length - 1]
      if (last && last.techKey === key) {
        last.categories.push(cat)
      } else {
        sections.push({ techKey: key, categories: [cat] })
      }
    }
  }
  return sections
}

const TECH_SECTIONS = buildTechSections()

export default function TopicSidebar({
  activeTopicId,
  activeCategoryId,
  hasCheatSheet,
  hasPlayground,
  topicTitle,
}: Props) {
  const navigate = useNavigate()
  const activeTechKey = getTechKey(activeCategoryId)

  const [openTech, setOpenTech] = useState<Set<string>>(() => new Set([activeTechKey]))
  const [openCats, setOpenCats] = useState<Set<string>>(() => new Set([activeCategoryId]))

  const toggleTech = (key: string) => setOpenTech(prev => {
    const next = new Set(prev)
    if (next.has(key)) next.delete(key); else next.add(key)
    return next
  })

  const toggleCat = (id: string) => setOpenCats(prev => {
    const next = new Set(prev)
    if (next.has(id)) next.delete(id); else next.add(id)
    return next
  })

  const anchorLinks: Array<{ id: string; label: string }> = [
    { id: 'intro', label: `What is ${topicTitle}?` },
    { id: 'explanation', label: 'How it works' },
    ...(hasCheatSheet ? [{ id: 'cheatsheet', label: 'Cheat Sheet' }] : []),
    ...(hasPlayground ? [{ id: 'playground', label: 'Playground' }] : []),
  ]

  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      position: 'sticky',
      top: 52,
      height: 'calc(100vh - 52px)',
      overflowY: 'auto',
      borderRight: '1px solid var(--border)',
      padding: '20px 0',
      scrollbarWidth: 'none',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ flex: 1 }}>
        {TECH_SECTIONS.map(({ techKey, categories }) => {
          const meta = TECH_SECTION_META[techKey]
          const isTechOpen = openTech.has(techKey)
          const isActiveTech = techKey === activeTechKey
          const techColor = meta?.color ?? categories[0].color

          return (
            <div key={techKey} style={{ marginBottom: 2 }}>
              {/* Tech group header */}
              <button
                onClick={() => toggleTech(techKey)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 14px 6px 12px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  borderLeft: isActiveTech ? `2px solid ${techColor}` : '2px solid transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: isActiveTech ? techColor : 'var(--text-faint)',
                    flexShrink: 0,
                    transition: 'background 0.2s',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: isActiveTech ? techColor : 'var(--text-faint)',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}>
                    {meta?.title ?? techKey}
                  </span>
                </div>
                {isTechOpen
                  ? <ChevronDown size={11} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
                  : <ChevronRight size={11} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
                }
              </button>

              {/* Categories within tech group */}
              {isTechOpen && (
                <div style={{ paddingBottom: 4 }}>
                  {categories.map(cat => {
                    const isCatOpen = openCats.has(cat.id)
                    const isActivecat = cat.id === activeCategoryId
                    const catTopics = TOPICS.filter(t => t.category === cat.id)

                    return (
                      <div key={cat.id}>
                        {/* Category row */}
                        <button
                          onClick={() => toggleCat(cat.id)}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '5px 14px 5px 22px',
                            background: isActivecat ? `${cat.color}10` : 'none',
                            border: 'none', cursor: 'pointer',
                            borderLeft: isActivecat ? `2px solid ${cat.color}` : '2px solid transparent',
                            color: isActivecat ? cat.color : 'var(--text-muted)',
                            fontSize: 12,
                            fontWeight: isActivecat ? 700 : 500,
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '0.01em',
                            transition: 'color 0.15s, background 0.15s',
                          }}
                          onMouseEnter={e => {
                            if (!isActivecat) e.currentTarget.style.color = 'var(--text)'
                          }}
                          onMouseLeave={e => {
                            if (!isActivecat) e.currentTarget.style.color = 'var(--text-muted)'
                          }}
                        >
                          <span>{cat.title}</span>
                          {isCatOpen
                            ? <ChevronDown size={11} style={{ flexShrink: 0, opacity: 0.5 }} />
                            : <ChevronRight size={11} style={{ flexShrink: 0, opacity: 0.5 }} />
                          }
                        </button>

                        {/* Topics within category */}
                        {isCatOpen && (
                          <div>
                            {catTopics.map(topic => {
                              const isActive = topic.id === activeTopicId
                              return (
                                <button
                                  key={topic.id}
                                  onClick={() => navigate(`/topic/${topic.id}`)}
                                  aria-current={isActive ? 'page' : undefined}
                                  style={{
                                    width: '100%', textAlign: 'left',
                                    padding: '4px 14px 4px 32px',
                                    background: isActive ? `${cat.color}14` : 'none',
                                    border: 'none', cursor: 'pointer',
                                    color: isActive ? cat.color : 'var(--text-muted)',
                                    fontSize: 12,
                                    fontWeight: isActive ? 600 : 400,
                                    borderLeft: isActive
                                      ? `2px solid ${cat.color}`
                                      : '2px solid transparent',
                                    transition: 'color 0.12s, background 0.12s',
                                  }}
                                  onMouseEnter={e => {
                                    if (!isActive) e.currentTarget.style.color = 'var(--text)'
                                  }}
                                  onMouseLeave={e => {
                                    if (!isActive) e.currentTarget.style.color = 'var(--text-muted)'
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
          ON THIS PAGE
        </div>
        {anchorLinks.map(link => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            style={{
              width: '100%', textAlign: 'left',
              padding: '4px 16px 4px 20px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-faint)', fontSize: 11,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
          >
            {link.label}
          </button>
        ))}
      </div>
    </aside>
  )
}
