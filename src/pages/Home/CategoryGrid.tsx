// src/pages/Home/CategoryGrid.tsx
import React, { type ComponentType, type CSSProperties, type RefObject, useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileCode2, Palette, Zap, Shield, Layers, Globe, ArrowLeftRight, Database, LayoutGrid, Sparkles, Layout, MousePointer2,
  Tag, Type, Link2, List, Film, GitBranch, Landmark, ClipboardList, Eye,
  Paintbrush, Target, Droplets, Square, Image, SunDim, ImageIcon, ScrollText,
  StretchHorizontal, Smartphone, Variable, SunMoon, RotateCcw, Play,
  Braces, Lock, FileCode, Shuffle, Component, RefreshCw, Cpu, Route,
  HardDrive, Server, Activity, Search, Merge, Github, GitCommit,
  Users, FileX, GitMerge,
} from 'lucide-react'
import { getTechKey, TOPIC_ICONS } from '@/data/categories'
import type { TechSectionMeta } from '@/data/categories'
import { useCategories, useCategoryGroups, useTechMeta, useTopicLabels } from '@/i18n/hooks'
import { RESOURCE_GROUPS } from '@/data/resources'
import type { Category, CategoryId } from '@/types'
import CategoryTooltip from './CategoryTooltip'
import type { GalaxyHandle } from './GalaxyBackground'
import type { TrailHandle } from './CursorTrail'
import { useResourceVotes } from '@/hooks/useResourceVotes'
import { getHost } from '@/lib/getHost'

const ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  FileCode2, Palette, Zap, Shield, Layers, Globe,
  ArrowLeftRight, Database, LayoutGrid, Sparkles, Layout, MousePointer2,
  Tag, Type, Link2, List, Film, GitBranch, Landmark, ClipboardList, Eye,
  Paintbrush, Target, Droplets, Square, Image, SunDim, ImageIcon, ScrollText,
  StretchHorizontal, Smartphone, Variable, SunMoon, RotateCcw, Play,
  Braces, Lock, FileCode, Shuffle, Component, RefreshCw, Cpu, Route,
  HardDrive, Server, Activity, Search, Merge, Github, GitCommit,
  Users, FileX, GitMerge,
}

function deriveTechSections(categoryIds: CategoryId[], categories: Category[]): Array<{ techKey: string; categories: Category[] }> {
  const sections: Array<{ techKey: string; categories: Category[] }> = []
  for (const id of categoryIds) {
    const cat = categories.find(c => c.id === id)
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
  meta: TechSectionMeta | undefined
  categories: Category[]
  topicLabels: Record<string, string>
  globalIndex: number
  galaxyRef: RefObject<GalaxyHandle | null>
  trailRef: RefObject<TrailHandle | null>
  onCardHover: (cat: Category, rect: DOMRect) => void
  onCardLeave: () => void
}

const TechSection = React.memo(function TechSection({
  techKey: _techKey, meta, categories, topicLabels, globalIndex,
  galaxyRef, trailRef,
  onCardHover, onCardLeave,
}: TechSectionProps) {
  const navigate = useNavigate()
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
        '--idx': globalIndex,
      } as CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveCard}
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="tsec-head">
        <div className="tsec-icon">
          <Icon size={22} color={color} />
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
              {(() => { const I = ICONS[cat.icon] ?? FileCode2; return <I size={16} color={cat.color} /> })()}
              <span className="subcat-label">{cat.cardLabel}</span>
              <span className="subcat-cnt">{cat.topicIds.length}</span>
            </div>
            <div className="subcat-topics">
              {cat.topicIds.slice(0, 3).map((tid, i, arr) => {
                const TI = ICONS[TOPIC_ICONS[tid]] ?? null
                return (
                  <span key={tid} style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    {TI && <span style={{ opacity: 0.6, lineHeight: 0, flexShrink: 0 }}><TI size={11} color="currentColor" /></span>}
                    {topicLabels[tid] ?? tid.replace(/^[a-z]+-/, '').replace(/-/g, ' ')}
                    {i < arr.length - 1 ? <span style={{ opacity: 0.4, margin: '0 3px' }}>·</span> : ''}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

function ResourcesSection({ globalIndex, galaxyRef, trailRef }: {
  globalIndex: number
  galaxyRef: RefObject<GalaxyHandle | null>
  trailRef: RefObject<TrailHandle | null>
}) {
  const navigate = useNavigate()
  const color = '#a78bfa'
  const { votes, loading } = useResourceVotes()

  const allResources = RESOURCE_GROUPS.flatMap(g => g.resources.map(r => ({ ...r, groupLabel: g.label, groupColor: g.color })))
  const top5 = [...allResources]
    .sort((a, b) => (votes[b.id] ?? 0) - (votes[a.id] ?? 0))
    .slice(0, 5)
  const totalLinks = allResources.length
  const totalVotes = Object.values(votes).reduce((s, n) => s + n, 0)

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    galaxyRef.current?.setHover(color, rect)
    trailRef.current?.setColor(color)
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)'
    galaxyRef.current?.setHover(null, null)
    trailRef.current?.setColor(null)
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = -((y / rect.height) - 0.5) * 6
    const ry = ((x / rect.width) - 0.5) * 6
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  return (
    <div
      className="tsec"
      style={{ '--tc': color, '--idx': globalIndex, cursor: 'pointer' } as CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={() => navigate('/resources')}
    >
      <div className="tsec-head">
        <div className="tsec-icon">
          <Globe size={22} color={color} />
        </div>
        <div className="tsec-head-text">
          <div className="tsec-name">Resources</div>
          <div className="tsec-sub">Curated external tools, libraries &amp; references</div>
        </div>
        <span className="tsec-badge">
          {loading ? `${totalLinks} Links` : `${totalLinks} Links · ▲ ${totalVotes}`}
        </span>
      </div>
      <div className="tsec-body">
        {top5.map(r => (
          <div
            key={r.id}
            className="subcat"
            style={{ '--sc': r.color, display: 'flex', flexDirection: 'column' } as CSSProperties}
          >
            <div className="subcat-top">
              <Globe size={16} color={r.color} />
              <span className="subcat-label">{r.name}</span>
              <span className="subcat-cnt">▲ {votes[r.id] ?? 0}</span>
            </div>
            <div className="subcat-topics" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: r.groupColor, letterSpacing: '0.06em' }}>
                {r.groupLabel}
              </span>
              <span style={{ lineHeight: 1.45, fontSize: 11, color: '#8ab4d4' }}>
                {r.description}
              </span>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#4a7090' }}>
                {getHost(r.url)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CategoryGrid({ galaxyRef, trailRef }: CategoryGridProps) {
  const categories = useCategories()
  const categoryGroups = useCategoryGroups()
  const techMeta = useTechMeta()
  const topicLabels = useTopicLabels()

  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showTooltip = useCallback((cat: Category, rect: DOMRect) => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setTooltip({ category: cat, rect })
  }, [])

  const scheduleHide = useCallback(() => {
    hideTimer.current = setTimeout(() => setTooltip(null), 120)
  }, [])

  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }, [])

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  const allTechSections = useMemo(() =>
    categoryGroups.map(group => ({
      group,
      techSections: deriveTechSections(group.categoryIds as CategoryId[], categories),
    })),
    [categoryGroups, categories]
  )

  let globalIdx = 0

  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px 80px', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {allTechSections.map(({ group, techSections }) => (
          <div key={group.key}>
            <GroupLabel label={group.label} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 4 }}>
              {techSections.map(ts => {
                const idx = globalIdx++
                return (
                  <TechSection
                    key={ts.techKey}
                    techKey={ts.techKey}
                    meta={techMeta[ts.techKey]}
                    categories={ts.categories}
                    topicLabels={topicLabels}
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
        ))}
      </div>

      <div>
        <GroupLabel label="Resources" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 4 }}>
          <ResourcesSection
            globalIndex={globalIdx}
            galaxyRef={galaxyRef}
            trailRef={trailRef}
          />
        </div>
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
