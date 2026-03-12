import { useState, useEffect, type ComponentType } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getTopicById } from '@/data/topics'
import { LEVELS } from '@/data/levels'
import PageWrapper from '@/components/layout/PageWrapper'
import LevelBadge from '@/components/ui/LevelBadge'
import IntroAnimation from './IntroAnimation'
import SyncExplanation from './SyncExplanation'
import PlaygroundSection from './PlaygroundSection'
import CheatSheet from '@/components/ui/CheatSheet'
import NextTopicCard from '@/components/ui/NextTopicCard'
import TopicSidebar from '@/components/layout/TopicSidebar'
import { getCategoryForTopic } from '@/data/categories'
import { preloadAnimation, getAnimationComponent } from '@/topics/registry'
import type { CategoryId } from '@/types'

export default function TopicPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const topic = topicId ? getTopicById(topicId) : undefined
  const level = topic ? LEVELS.find(l => l.id === topic.level) : undefined

  const [AnimComp, setAnimComp] = useState<ComponentType<{ step: number; compact?: boolean }> | null>(
    () => topic ? getAnimationComponent(topic.animationComponent) : null
  )

  useEffect(() => {
    if (!topic) return
    preloadAnimation(topic.animationComponent).then(() => {
      setAnimComp(() => getAnimationComponent(topic.animationComponent))
    })
  }, [topic?.animationComponent])

  if (!topic || !level) {
    return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Topic not found.</div>
  }

  const category = getCategoryForTopic(topic.id)
  const hasCheatSheet = !!topic.cheatSheet
  const hasPlayground = topic.playgroundType !== 'none'
  const nextTopic = topic.nextTopicId ? getTopicById(topic.nextTopicId) : undefined

  return (
    <PageWrapper>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        {/* fallback 'html' is safe: getCategoryForTopic only returns undefined if topic.category is missing from categories.ts — prevented by TypeScript */}
        <TopicSidebar
          key={category?.id}
          activeTopicId={topic.id}
          activeCategoryId={(category?.id ?? 'html') as CategoryId}
          hasCheatSheet={hasCheatSheet}
          hasPlayground={hasPlayground}
          topicTitle={topic.title}
        />
        <div style={{ flex: 1, minWidth: 0, padding: '40px 40px 80px', maxWidth: 860 }}>

          {/* Navigation header */}
          <div id="intro">
            <button
              onClick={() => navigate(`/${category?.id ?? ''}`)}
              className="flex items-center gap-2 mb-3"
              style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
            >
              <ArrowLeft size={16} /> {category?.title ?? level.title}
            </button>

            {/* Breadcrumb */}
            <div style={{
              fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)',
              marginBottom: 14,
            }}>
              Docs{category ? ` / ${category.title}` : ''} / <span style={{ color: 'var(--text-muted)' }}>{topic.title}</span>
            </div>

            <LevelBadge level={level.id} color={level.color} title={level.title} size="sm" />
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, marginTop: 12, marginBottom: 8 }}>
              {topic.title}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 24 }}>
              {topic.description}
            </p>
            {(topic.id.startsWith('html') || topic.id.startsWith('css')) && (
              <Link
                to={topic.id.startsWith('html') ? '/reference/html' : '/reference/css'}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 12, color: 'var(--text-faint)', textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-faint)')}
              >
                <ExternalLink size={11} />
                {topic.id.startsWith('html') ? 'HTML Reference' : 'CSS Reference'} →
              </Link>
            )}
          </div>

          {/* Phase 1: Intro */}
          <div id="viz" style={{ marginTop: 32 }}>
            <IntroAnimation AnimComp={AnimComp} />
          </div>

          {/* Phase 2: Explanation */}
          <div id="explanation">
            <SyncExplanation topic={topic} AnimComp={AnimComp} />
          </div>

          {/* Cheat Sheet */}
          {hasCheatSheet && (
            <div id="cheatsheet" style={{ marginTop: 48 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: 'var(--text)' }}>
                Cheat Sheet
              </h2>
              <CheatSheet key={topic.id} data={topic.cheatSheet!} color={topic.color} />
            </div>
          )}

          {/* Phase 3: Playground */}
          {hasPlayground && (
            <div id="playground">
              <PlaygroundSection topic={topic} />
            </div>
          )}
        </div>
      </div>
      {nextTopic && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
          <NextTopicCard topic={nextTopic} />
        </div>
      )}
    </PageWrapper>
  )
}
