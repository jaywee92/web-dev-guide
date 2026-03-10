import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import type { Category } from '@/types'

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database,
}

function CategoryTile({ category, index }: { category: Category; index: number }) {
  const navigate = useNavigate()
  const topics = TOPICS.filter(t => t.category === category.id)
  const Icon = ICONS[category.icon] ?? FileCode2

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/${category.id}`)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '24px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 20% 20%, ${category.color}0e 0%, transparent 65%)`,
        }}
      />

      {/* Color bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 3, background: category.color, transformOrigin: 'left',
          borderRadius: '16px 16px 0 0',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-3">
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: `${category.color}18`,
            border: `1px solid ${category.color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={20} color={category.color} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{category.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{category.description}</div>
          </div>
        </div>

        {/* Topic count badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '3px 10px', borderRadius: 99,
          background: `${category.color}14`, border: `1px solid ${category.color}30`,
          fontSize: 11, color: category.color, fontFamily: 'var(--font-mono)',
          fontWeight: 600, marginBottom: 12,
        }}>
          {topics.length} topic{topics.length !== 1 ? 's' : ''}
        </div>

        {/* Topic name chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {topics.slice(0, 3).map(t => (
            <span key={t.id} style={{
              fontSize: 10, color: 'var(--text-muted)',
              background: 'var(--surface-bright)',
              border: '1px solid var(--border)',
              borderRadius: 6, padding: '2px 7px',
              fontFamily: 'var(--font-mono)',
            }}>
              {t.title}
            </span>
          ))}
          {topics.length > 3 && (
            <span style={{ fontSize: 10, color: 'var(--text-faint)', padding: '2px 4px' }}>
              +{topics.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function CategoryGrid() {
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {CATEGORIES.map((cat, i) => (
          <CategoryTile key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
