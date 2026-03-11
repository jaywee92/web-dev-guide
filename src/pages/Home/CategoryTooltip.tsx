import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { TOPICS } from '@/data/topics'
import type { Category } from '@/types'

interface Props {
  category: Category
  anchorRect: DOMRect
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function CategoryTooltip({ category, anchorRect, onMouseEnter, onMouseLeave }: Props) {
  const navigate = useNavigate()
  const topics = TOPICS.filter(t => t.category === category.id)
  const ref = useRef<HTMLDivElement>(null)

  // Position: below the anchor card, aligned to its left edge.
  // Run on every render (anchorRect may change on scroll/resize).
  // visibility:hidden on the element prevents the flash at 0,0 before the first effect fires.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const W = window.innerWidth
    const left = Math.min(anchorRect.left, W - el.offsetWidth - 12)
    el.style.left = `${Math.max(8, left)}px`
    el.style.top  = `${anchorRect.bottom + 6}px`
    el.style.visibility = 'visible'
  })

  const c = category.color

  return createPortal(
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        zIndex: 9999,
        minWidth: 210,
        background: '#0f172a',
        border: `1px solid ${c}50`,
        borderRadius: 10,
        boxShadow: '0 12px 40px #00000090',
        padding: 0,
        visibility: 'hidden', // set to visible by useEffect after positioning
      }}
    >
      {/* Header */}
      <div style={{
        padding: '9px 12px 6px',
        fontSize: 9,
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        color: c,
        borderBottom: '1px solid #1e293b',
      }}>
        {category.title}
      </div>

      {/* Topic rows */}
      <div style={{ padding: '4px 6px 8px' }}>
        {topics.map(topic => (
          <div
            key={topic.id}
            onClick={() => navigate(`/topic/${topic.id}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '7px 8px',
              borderRadius: 6,
              cursor: 'pointer',
              color: 'var(--text-muted)',
              fontSize: 11,
              transition: 'background 0.12s, color 0.12s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.background = '#1e293b'
              el.style.color = 'var(--text)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.background = 'transparent'
              el.style.color = 'var(--text-muted)'
            }}
          >
            {/* Color dot */}
            <div style={{
              width: 24,
              height: 24,
              borderRadius: 5,
              flexShrink: 0,
              background: `${c}18`,
              border: `1px solid ${c}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
            </div>

            <span style={{ flex: 1 }}>{topic.title}</span>

            <span style={{
              opacity: 0,
              fontSize: 10,
              color: c,
              transition: 'opacity 0.1s',
            }}>→</span>
          </div>
        ))}
      </div>
    </div>,
    document.body
  )
}
