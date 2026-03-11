import { useRef } from 'react'
import { TOPICS } from '@/data/topics'
import type { Category } from '@/types'

interface Props {
  category: Category
  onHoverStart: (rect: DOMRect) => void
  onHoverEnd: () => void
  onClick: () => void
}

export default function CategoryCard({ category, onHoverStart, onHoverEnd, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const c = category.color
  const emoji = category.cardEmoji ?? '📖'
  const label = category.cardLabel ?? category.title

  // Build topic keywords for subtitle (last word of first 3 topic titles)
  const topics = TOPICS.filter(t => t.category === category.id)
  const topicCount = topics.length
  const keywords = topics.slice(0, 3).map(t => t.title.split(' ').slice(-1)[0]).join(' · ')
  const subtitle = `${keywords} · ${topicCount} Topics`

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        background: 'var(--surface)',
        border: `1px solid var(--border)`,
        borderRadius: 9,
        padding: '12px 15px',
        cursor: 'pointer',
        minWidth: 155,
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        position: 'relative',
      }}
      onMouseEnter={e => {
        if (ref.current) onHoverStart(ref.current.getBoundingClientRect())
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = `${c}70`
        el.style.background = 'var(--surface-bright)'
        el.style.boxShadow = `0 0 16px ${c}25`
      }}
      onMouseLeave={e => {
        onHoverEnd()
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--border)'
        el.style.background = 'var(--surface)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Emoji + label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
        <span style={{ fontSize: 13, lineHeight: 1 }}>{emoji}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
          {label}
        </span>
      </div>
      {/* Subtitle */}
      <div style={{ fontSize: 10, color: 'var(--text-faint)', lineHeight: 1.4 }}>
        {subtitle}
      </div>
    </div>
  )
}
