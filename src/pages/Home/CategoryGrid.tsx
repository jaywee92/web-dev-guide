import { type ComponentType, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
} from 'lucide-react'
import { CATEGORIES, CATEGORY_GROUPS, getTechKey, TECH_SECTION_META } from '@/data/categories'
import type { Category, CategoryId } from '@/types'
import SpotlightCard from './SpotlightCard'
import CategoryCard from './CategoryCard'
import CategoryTooltip from './CategoryTooltip'

// Lucide icon lookup — keyed by the `icon` field on Category
const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
}

// Derive ordered tech sections from a flat list of category IDs.
// Consecutive categories sharing the same getTechKey() are grouped together.
function deriveTechSections(categoryIds: CategoryId[]): Array<{ techKey: string; categories: Category[] }> {
  const sections: Array<{ techKey: string; categories: Category[] }> = []
  for (const id of categoryIds) {
    const cat = CATEGORIES.find(c => c.id === id)
    if (!cat) continue
    const key = getTechKey(id)
    const last = sections[sections.length - 1]
    if (last && last.techKey === key) {
      last.categories.push(cat)
    } else {
      sections.push({ techKey: key, categories: [cat] })
    }
  }
  return sections
}

interface TooltipState {
  category: Category
  rect: DOMRect
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      letterSpacing: '0.1em',
      color: 'var(--text-faint)',
      padding: '12px 4px 6px',
    }}>
      {label}
    </div>
  )
}

interface TechSectionProps {
  techKey: string
  categories: Category[]
  sectionIndex: number
  onCardHover: (cat: Category, rect: DOMRect) => void
  onCardLeave: () => void
}

function TechSection({ techKey, categories, sectionIndex, onCardHover, onCardLeave }: TechSectionProps) {
  const navigate = useNavigate()
  const meta = TECH_SECTION_META[techKey]
  const primaryCategory = categories[0]
  const Icon = ICONS[primaryCategory.icon] ?? FileCode2
  const color = meta?.color ?? primaryCategory.color

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: sectionIndex * 0.05 }}
    >
      <SpotlightCard
        color={color}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderTop: `3px solid ${color}`,
          borderRadius: 12,
          overflow: 'visible',
        }}
      >
        {/* Section header */}
        <div style={{
          padding: '13px 17px 11px',
          background: 'var(--surface)',
          borderRadius: '10px 10px 0 0',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 11,
        }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            flexShrink: 0,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon size={16} color={color} />
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color, letterSpacing: '-0.02em' }}>
              {meta?.title ?? primaryCategory.title}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 1 }}>
              {meta?.subtitle ?? primaryCategory.description}
            </div>
          </div>
        </div>

        {/* Card row */}
        <div style={{
          padding: '12px 13px 14px',
          background: 'var(--bg)',
          borderRadius: '0 0 10px 10px',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
        }}>
          {categories.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onHoverStart={rect => onCardHover(cat, rect)}
              onHoverEnd={onCardLeave}
              onClick={() => navigate(`/${cat.id}`)}
            />
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function CategoryGrid() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showTooltip(cat: Category, rect: DOMRect) {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setTooltip({ category: cat, rect })
  }

  function scheduleHide() {
    hideTimer.current = setTimeout(() => setTooltip(null), 120)
  }

  function cancelHide() {
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }

  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {CATEGORY_GROUPS.map(group => {
          const techSections = deriveTechSections(group.categoryIds)
          return (
            <div key={group.key}>
              <GroupLabel label={group.label} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 4 }}>
                {techSections.map((ts, i) => (
                  <TechSection
                    key={ts.techKey}
                    techKey={ts.techKey}
                    categories={ts.categories}
                    sectionIndex={i}
                    onCardHover={showTooltip}
                    onCardLeave={scheduleHide}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Single shared tooltip portal */}
      {tooltip && (
        <CategoryTooltip
          category={tooltip.category}
          anchorRect={tooltip.rect}
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
        />
      )}
    </section>
  )
}
