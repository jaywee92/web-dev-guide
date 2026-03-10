import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getTopicById } from '@/data/topics'
import { LEVELS } from '@/data/levels'
import PageWrapper from '@/components/layout/PageWrapper'
import LevelBadge from '@/components/ui/LevelBadge'
import IntroAnimation from './IntroAnimation'
import SyncExplanation from './SyncExplanation'
import PlaygroundSection from './PlaygroundSection'
import CheatSheet from '@/components/ui/CheatSheet'
import TopicSidebar from '@/components/layout/TopicSidebar'
import { getCategoryForTopic } from '@/data/categories'
import type { CategoryId } from '@/types'

export default function TopicPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const topic = topicId ? getTopicById(topicId) : undefined
  const level = topic ? LEVELS.find(l => l.id === topic.level) : undefined

  if (!topic || !level) {
    return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Topic not found.</div>
  }

  const category = getCategoryForTopic(topic.id)

  return (
    <PageWrapper>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        {/* fallback 'html' is safe: getCategoryForTopic only returns undefined if topic.category is missing from categories.ts — prevented by TypeScript */}
        <TopicSidebar
          key={category?.id}
          activeTopicId={topic.id}
          activeCategoryId={(category?.id ?? 'html') as CategoryId}
        />
        <div style={{ flex: 1, minWidth: 0, padding: '40px 40px 80px', maxWidth: 860 }}>
          {/* Header */}
          <button
            onClick={() => navigate(`/${category?.id ?? ''}`)}
            className="flex items-center gap-2 mb-6"
            style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
          >
            <ArrowLeft size={16} /> {category?.title ?? level.title}
          </button>
          <LevelBadge level={level.id} color={level.color} title={level.title} size="sm" />
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, marginTop: 12, marginBottom: 8 }}>
            {topic.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 40 }}>
            {topic.description}
          </p>
          {(topic.id.startsWith('html') || topic.id.startsWith('css')) && (
            <Link
              to={topic.id.startsWith('html') ? '/reference/html' : '/reference/css'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 12,
                color: 'var(--text-faint)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-faint)')}
            >
              <ExternalLink size={11} />
              {topic.id.startsWith('html') ? 'HTML Reference' : 'CSS Reference'} →
            </Link>
          )}

          {/* Phase 1: Intro */}
          <IntroAnimation topic={topic} />

          {/* Phase 2: Explanation */}
          <SyncExplanation topic={topic} />

          {topic.cheatSheet && (
            <div style={{ marginTop: 48 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: 'var(--text)' }}>
                Cheat Sheet
              </h2>
              <CheatSheet key={topic.id} data={topic.cheatSheet} color={topic.color} />
            </div>
          )}

          {/* Phase 3: Playground */}
          <PlaygroundSection topic={topic} />
        </div>
      </div>
    </PageWrapper>
  )
}
