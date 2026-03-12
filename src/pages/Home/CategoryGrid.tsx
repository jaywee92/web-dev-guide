// src/pages/Home/CategoryGrid.tsx
import { type ComponentType, type CSSProperties, type RefObject, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
} from 'lucide-react'
import { CATEGORIES, CATEGORY_GROUPS, getTechKey, TECH_SECTION_META } from '@/data/categories'
import type { Category, CategoryId } from '@/types'
import CategoryTooltip from './CategoryTooltip'
import type { GalaxyHandle } from './GalaxyBackground'
import type { TrailHandle } from './CursorTrail'

const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles,
}

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

interface TooltipState { category: Category; rect: DOMRect }

interface CategoryGridProps {
  galaxyRef: RefObject<GalaxyHandle | null>
  trailRef: RefObject<TrailHandle | null>
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div className="group-label">
      <span>{label}</span>
      <span className="group-label-line" />
    </div>
  )
}

interface TechSectionProps {
  techKey: string
  categories: Category[]
  globalIndex: number
  galaxyRef: RefObject<GalaxyHandle | null>
  trailRef: RefObject<TrailHandle | null>
  onCardHover: (cat: Category, rect: DOMRect) => void
  onCardLeave: () => void
}

function TechSection({
  techKey, categories, globalIndex,
  galaxyRef, trailRef,
  onCardHover, onCardLeave,
}: TechSectionProps) {
  const navigate = useNavigate()
  const meta = TECH_SECTION_META[techKey]
  const primaryCategory = categories[0]
  const Icon = ICONS[primaryCategory.icon] ?? FileCode2
  const color = meta?.color ?? primaryCategory.color

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    galaxyRef.current?.setHover(color, rect)
    trailRef.current?.setColor(color)
  }

  function handleMouseLeave() {
    galaxyRef.current?.setHover(null, null)
    trailRef.current?.setColor(null)
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const w = rect.width
    const h = rect.height
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    // 3D tilt
    const rx = -((y / h) - 0.5) * 6
    const ry = ((x / w) - 0.5) * 6
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  function handleMouseLeaveCard(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)'
    handleMouseLeave()
  }

  return (
    <div
      className="tsec"
      style={{
        '--tc': color,
        animationDelay: `${globalIndex * 80}ms`,
      } as CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveCard}
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="tsec-head">
        <div className="tsec-icon">
          <Icon size={17} color={color} />
        </div>
        <div className="tsec-head-text">
          <div className="tsec-name">{meta?.title ?? primaryCategory.title}</div>
          <div className="tsec-sub">{meta?.subtitle ?? primaryCategory.description}</div>
        </div>
        <span className="tsec-badge">
          {categories.reduce((s, c) => s + c.topicIds.length, 0)} Topics
        </span>
      </div>

      {/* Subcategory cards */}
      <div className="tsec-body">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="subcat"
            style={{ '--sc': cat.color } as CSSProperties}
            onClick={() => navigate(`/${cat.id}`)}
            onMouseEnter={e => onCardHover(cat, e.currentTarget.getBoundingClientRect())}
            onMouseLeave={onCardLeave}
          >
            <div className="subcat-top">
              <span className="subcat-emoji">{cat.cardEmoji}</span>
              <span className="subcat-label">{cat.cardLabel}</span>
              <span className="subcat-cnt">{cat.topicIds.length}</span>
            </div>
            <div className="subcat-topics">
              {cat.topicIds.slice(0, 3).map((tid, i, arr) => (
                <span key={tid}>
                  {tid.replace(/^[a-z]+-/, '').replace(/-/g, ' ')}
                  {i < arr.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CategoryGrid({ galaxyRef, trailRef }: CategoryGridProps) {
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

  let globalIdx = 0

  return (
    <section style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px 80px', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {CATEGORY_GROUPS.map(group => {
          const techSections = deriveTechSections(group.categoryIds)
          return (
            <div key={group.key}>
              <GroupLabel label={group.label} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 4 }}>
                {techSections.map(ts => {
                  const idx = globalIdx++
                  return (
                    <TechSection
                      key={ts.techKey}
                      techKey={ts.techKey}
                      categories={ts.categories}
                      globalIndex={idx}
                      galaxyRef={galaxyRef}
                      trailRef={trailRef}
                      onCardHover={showTooltip}
                      onCardLeave={scheduleHide}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

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
