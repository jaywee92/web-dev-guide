import type { ComponentType } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
} from 'lucide-react'
import { CATEGORIES, CATEGORY_GROUPS } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import type { Category } from '@/types'
import SpotlightCard from './SpotlightCard'
import ClickSpark from './ClickSpark'

const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
}

function TopicChip({ topic, color, onNavigate }: {
  topic: { id: string; title: string }
  color: string
  onNavigate: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <ClickSpark color={color}>
      <motion.span
        onClick={e => { e.stopPropagation(); onNavigate(topic.id) }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.96 }}
        animate={{ scale: hovered ? 1.04 : 1 }}
        style={{
          display: 'inline-block',
          fontSize: 11,
          padding: '3px 10px',
          borderRadius: 20,
          background: hovered ? `${color}18` : 'var(--surface-bright)',
          border: `1px solid ${hovered ? `${color}44` : 'var(--border)'}`,
          color: hovered ? color : 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer',
          transition: 'background 0.15s, color 0.15s, border-color 0.15s',
        }}
      >
        {topic.title}
      </motion.span>
    </ClickSpark>
  )
}

function CategoryRow({ category, index }: { category: Category; index: number }) {
  const navigate = useNavigate()
  const topics = TOPICS.filter(t => t.category === category.id)
  const Icon = ICONS[category.icon] ?? FileCode2
  const isCompact = topics.length <= 4

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <SpotlightCard
        color={category.color}
        onClick={() => navigate(`/${category.id}`)}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          borderLeft: `3px solid ${category.color}`,
          padding: isCompact ? '10px 16px' : '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
      >
        {/* Icon */}
        <div title={category.description} style={{
          width: isCompact ? 30 : 36,
          height: isCompact ? 30 : 36,
          borderRadius: 8,
          flexShrink: 0,
          background: `${category.color}18`,
          border: `1px solid ${category.color}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={isCompact ? 15 : 18} color={category.color} />
        </div>

        {/* Category title */}
        <div style={{ width: isCompact ? 120 : 150, flexShrink: 0 }}>
          <div style={{ fontSize: isCompact ? 13 : 14, fontWeight: 700, color: 'var(--text)' }}>
            {category.title}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 1, lineHeight: 1.3 }}>
            {isCompact ? `${topics.length} topics` : category.description}
          </div>
        </div>

        {!isCompact && (
          <>
            {/* Divider */}
            <div style={{ width: 1, height: 32, background: 'var(--border)', flexShrink: 0 }} />

            {/* Topic chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
              {topics.map(t => (
                <TopicChip
                  key={t.id}
                  topic={t}
                  color={category.color}
                  onNavigate={id => navigate(`/topic/${id}`)}
                />
              ))}
            </div>
          </>
        )}
      </SpotlightCard>
    </motion.div>
  )
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      letterSpacing: '0.1em',
      color: 'var(--text-faint)',
      padding: '8px 4px 4px',
    }}>
      {label}
    </div>
  )
}

export default function CategoryGrid() {
  let rowIndex = 0

  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {CATEGORY_GROUPS.map(group => {
          const groupCategories = group.categoryIds
            .map(id => CATEGORIES.find(c => c.id === id))
            .filter((c): c is Category => c !== undefined)

          return (
            <div key={group.key}>
              <GroupLabel label={group.label} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
                {groupCategories.map(cat => (
                  <CategoryRow key={cat.id} category={cat} index={rowIndex++} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
