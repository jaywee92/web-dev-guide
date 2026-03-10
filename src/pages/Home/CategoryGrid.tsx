import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import type { Category } from '@/types'
import SpotlightCard from './SpotlightCard'
import ClickSpark from './ClickSpark'

const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database,
}

function CategoryRow({ category, index }: { category: Category; index: number }) {
  const navigate = useNavigate()
  const topics = TOPICS.filter(t => t.category === category.id)
  const Icon = ICONS[category.icon] ?? FileCode2

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <SpotlightCard
        color={category.color}
        onClick={() => navigate(`/${category.id}`)}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          borderLeft: `3px solid ${category.color}`,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
      >
        {/* Icon */}
        <div title={category.description} style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: `${category.color}18`,
          border: `1px solid ${category.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color={category.color} />
        </div>

        {/* Category title */}
        <div style={{ width: 150, flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
            {category.title}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 1, lineHeight: 1.3 }}>
            {category.description}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 32, background: 'var(--border)', flexShrink: 0 }} />

        {/* Topic chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
          {topics.map(t => (
            <ClickSpark key={t.id} color={category.color}>
              <motion.span
                onClick={e => { e.stopPropagation(); navigate(`/topic/${t.id}`) }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: 'var(--surface-bright)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = `${category.color}18`
                  el.style.color = category.color
                  el.style.borderColor = `${category.color}44`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'var(--surface-bright)'
                  el.style.color = 'var(--text-muted)'
                  el.style.borderColor = 'var(--border)'
                }}
              >
                {t.title}
              </motion.span>
            </ClickSpark>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function CategoryGrid() {
  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CATEGORIES.map((cat, i) => (
          <CategoryRow key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
