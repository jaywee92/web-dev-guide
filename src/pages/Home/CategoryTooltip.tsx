// src/pages/Home/CategoryTooltip.tsx
import { useEffect, useRef, useState, type ComponentType } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import {
  FileCode2, Tag, Type, Link2, List, Film, GitBranch, Landmark, ClipboardList, Eye,
  Paintbrush, Target, Droplets, Square, Image, SunDim, ImageIcon, ScrollText, Layers,
  StretchHorizontal, LayoutGrid, Smartphone, Variable, SunMoon, RotateCcw, Zap, Play,
  Braces, Lock, FileCode, Shuffle, Component, RefreshCw, Cpu, Route,
  Globe, HardDrive, ArrowLeftRight, Server, Activity, Search, Merge, Database,
  type LucideProps,
} from 'lucide-react'
import { TOPICS } from '@/data/topics'
import { TOPIC_ICONS } from '@/data/categories'
import type { Category, Topic } from '@/types'
import { preloadAnimation, getAnimationComponent } from '@/topics/registry'

type IconComp = ComponentType<LucideProps>
const ICON_MAP: Record<string, IconComp> = {
  FileCode2, Tag, Type, Link2, List, Film, GitBranch, Landmark, ClipboardList, Eye,
  Paintbrush, Target, Droplets, Square, Image, SunDim, ImageIcon, ScrollText, Layers,
  StretchHorizontal, LayoutGrid, Smartphone, Variable, SunMoon, RotateCcw, Zap, Play,
  Braces, Lock, FileCode, Shuffle, Component, RefreshCw, Cpu, Route,
  Globe, HardDrive, ArrowLeftRight, Server, Activity, Search, Merge, Database,
}

interface Props {
  category: Category
  anchorRect: DOMRect
  onMouseEnter: () => void
  onMouseLeave: () => void
}

type AnimComp = ComponentType<{ step: number; compact?: boolean }>

const PREVIEW_W = 360

function TopicAnimPreview({ topic, tooltipEl }: { topic: Topic; tooltipEl: HTMLDivElement | null }) {
  const [Comp, setComp] = useState<AnimComp | null>(() => getAnimationComponent(topic.animationComponent))
  const [step, setStep] = useState(0)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  useEffect(() => {
    setStep(0)
    let cancelled = false
    preloadAnimation(topic.animationComponent).then(() => {
      if (!cancelled) setComp(() => getAnimationComponent(topic.animationComponent))
    })
    const iv = setInterval(() => setStep(s => s + 1), 1800)
    return () => { cancelled = true; clearInterval(iv) }
  }, [topic.id, topic.animationComponent])

  useEffect(() => {
    if (!tooltipEl) return
    const r = tooltipEl.getBoundingClientRect()
    const vw = window.innerWidth
    const isRightSide = r.left + r.width / 2 > vw / 2
    const left = isRightSide
      ? Math.max(8, r.left - PREVIEW_W - 10)
      : Math.min(vw - PREVIEW_W - 8, r.right + 10)
    setPos({ top: r.top, left })
  }, [tooltipEl, topic.id])

  if (!Comp || !pos) return null

  return createPortal(
    <div style={{
      position: 'fixed',
      top: pos.top,
      left: pos.left,
      width: PREVIEW_W,
      height: 320,
      background: '#0c1525',
      border: `1px solid ${topic.color}40`,
      borderRadius: 12,
      boxShadow: `0 16px 48px #00000099, 0 0 0 1px ${topic.color}20`,
      overflow: 'hidden',
      zIndex: 10000,
      pointerEvents: 'none',
    }}>
      <div style={{
        padding: '5px 10px',
        fontSize: 9,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color: topic.color,
        borderBottom: `1px solid ${topic.color}20`,
        background: `${topic.color}10`,
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {topic.title}
      </div>
      <div style={{ width: '100%', height: 296, overflow: 'hidden' }}>
        <div style={{ transform: 'scale(0.85)', transformOrigin: 'top left', width: `${PREVIEW_W / 0.85}px` }}>
          <Comp step={step} compact={true} />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function CategoryTooltip({ category, anchorRect, onMouseEnter, onMouseLeave }: Props) {
  const navigate = useNavigate()
  const topics = TOPICS.filter(t => t.category === category.id)
  const ref = useRef<HTMLDivElement>(null)
  const [hoveredTopic, setHoveredTopic] = useState<Topic | null>(null)

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
    <>
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => { onMouseLeave(); setHoveredTopic(null) }}
        style={{
          position: 'fixed',
          zIndex: 9999,
          minWidth: 220,
          background: '#0f172a',
          border: `1px solid ${c}50`,
          borderRadius: 10,
          boxShadow: '0 12px 40px #00000090',
          padding: 0,
          visibility: 'hidden',
        }}
      >
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
        <div style={{ padding: '4px 6px 8px' }}>
          {topics.map(topic => (
            <div
              key={topic.id}
              onClick={() => navigate(`/topic/${topic.id}`)}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = '#1e293b'
                el.style.color = 'var(--text)'
                const arrow = el.querySelector('.tip-arrow') as HTMLElement | null
                if (arrow) arrow.style.opacity = '1'
                setHoveredTopic(topic)
                preloadAnimation(topic.animationComponent)
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'transparent'
                el.style.color = 'var(--text-muted)'
                const arrow = el.querySelector('.tip-arrow') as HTMLElement | null
                if (arrow) arrow.style.opacity = '0'
              }}
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
            >
              <div style={{
                width: 24, height: 24, borderRadius: 5, flexShrink: 0,
                background: `${c}18`, border: `1px solid ${c}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {(() => { const I = ICON_MAP[TOPIC_ICONS[topic.id]] ?? FileCode2; return <I size={12} color={c} /> })()}
              </div>
              <span style={{ flex: 1 }}>{topic.title}</span>
              <span className="tip-arrow" style={{ opacity: 0, fontSize: 10, color: c, transition: 'opacity 0.1s' }}>→</span>
            </div>
          ))}
        </div>
      </div>

      {hoveredTopic && (
        <TopicAnimPreview
          topic={hoveredTopic}
          tooltipEl={ref.current}
        />
      )}
    </>,
    document.body
  )
}
