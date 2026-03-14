import { useState, useEffect, type ComponentType } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Clock } from 'lucide-react'
import { getTopicById } from '@/data/topics'
import PageWrapper from '@/components/layout/PageWrapper'
import SyncExplanation from './SyncExplanation'
import PlaygroundSection from './PlaygroundSection'
import CheatSheet from '@/components/ui/CheatSheet'
import NextTopicCard from '@/components/ui/NextTopicCard'
import TopicSidebar from '@/components/layout/TopicSidebar'
import KeyTakeaways from './KeyTakeaways'
import ContentTabs from './ContentTabs'
import SliderPlayground, { hasSliderConfig } from '@/playgrounds/SliderPlayground'
import { getCategoryForTopic } from '@/data/categories'
import { preloadAnimation, getAnimationComponent, preloadBanner, getBannerComponent } from '@/topics/registry'
import type { CategoryId } from '@/types'
import TopicBanner from './TopicBanner'

export default function TopicPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const topic = topicId ? getTopicById(topicId) : undefined
  const [AnimComp, setAnimComp] = useState<ComponentType<{ step: number; compact?: boolean }> | null>(
    () => topic ? getAnimationComponent(topic.animationComponent) : null
  )

  const [animLoading, setAnimLoading] = useState<boolean>(() => {
    // True when component is NOT yet in cache (null = not loaded yet)
    return topic ? getAnimationComponent(topic.animationComponent) === null : false
  })

  useEffect(() => {
    if (!topic) return
    setAnimLoading(getAnimationComponent(topic.animationComponent) === null)
    preloadAnimation(topic.animationComponent).then(() => {
      setAnimComp(() => getAnimationComponent(topic.animationComponent))
      setAnimLoading(false)
    })
  }, [topic?.animationComponent])

  const [BannerComp, setBannerComp] = useState<ComponentType<Record<string, never>> | null>(
    () => topic ? getBannerComponent(topic.bannerComponent ?? '') : null
  )

  useEffect(() => {
    if (!topic?.bannerComponent) return
    preloadBanner(topic.bannerComponent).then(() => {
      setBannerComp(() => getBannerComponent(topic.bannerComponent!))
    })
  }, [topic?.bannerComponent])

  if (!topic) {
    return (
      <PageWrapper>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: 'calc(100vh - 60px)', gap: 16, textAlign: 'center', padding: 40,
        }}>
          <div style={{ fontSize: 72, fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', lineHeight: 1 }}>
            404
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            Topic not found
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
            We couldn't find the topic you're looking for.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: 8, padding: '9px 20px',
              borderRadius: 8, border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text)',
              fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-mono)',
            }}
          >
            ← Back to Overview
          </button>
        </div>
      </PageWrapper>
    )
  }

  const category = getCategoryForTopic(topic.id)
  const hasCheatSheet = !!topic.cheatSheet
  const cheatSheetLang = (() => {
    const cat = topic.category
    if (cat.startsWith('css')) return 'css'
    if (cat.startsWith('html')) return 'html'
    if (cat === 'javascript') return 'javascript'
    if (cat === 'typescript' || cat === 'react') return 'typescript'
    if (cat === 'postgresql') return 'sql'
    return 'javascript'
  })()
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
              <ArrowLeft size={16} /> {category?.title ?? 'Topics'}
            </button>

            {/* Breadcrumb */}
            <div style={{
              fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)',
              marginBottom: 14,
            }}>
              Docs{category ? ` / ${category.title}` : ''} / <span style={{ color: 'var(--text-muted)' }}>{topic.title}</span>
            </div>

            {category && (() => {
              const pos = category.topicIds.indexOf(topic.id) + 1
              const total = category.topicIds.length
              const pct = (pos / total) * 100
              return (
                <div style={{ marginBottom: 16 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 6,
                  }}>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
                      Topic {pos} of {total} in {category.title}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={11} /> {topic.estimatedMinutes} min
                    </span>
                  </div>
                  <div style={{
                    height: 3, borderRadius: 2,
                    background: 'var(--surface-bright)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      borderRadius: 2,
                      background: `linear-gradient(to right, ${topic.color}99, ${topic.color})`,
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              )
            })()}
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

          <TopicBanner topic={topic} BannerComp={BannerComp} />

          {/* Phase 2: Explanation */}
          <div id="explanation" style={{ marginTop: 0 }}>
            <SyncExplanation topic={topic} AnimComp={AnimComp} animLoading={animLoading} />
          </div>

          {/* Key Takeaways */}
          <KeyTakeaways topic={topic} />

          {/* CheatSheet + Sliders + Playground as tabs */}
          {(hasCheatSheet || hasSliderConfig(topic.id) || hasPlayground) && (
            <ContentTabs
              color={topic.color}
              tabs={[
                ...(hasCheatSheet ? [{
                  id: 'cheatsheet',
                  label: 'Cheat Sheet',
                  content: <CheatSheet key={topic.id} data={topic.cheatSheet!} color={topic.color} language={cheatSheetLang} />,
                }] : []),
                ...(hasSliderConfig(topic.id) ? [{
                  id: 'sliders',
                  label: '⚡ Live Controls',
                  content: <SliderPlayground topicId={topic.id} color={topic.color} />,
                }] : []),
                ...(hasPlayground ? [{
                  id: 'playground',
                  label: 'Playground',
                  content: <PlaygroundSection topic={topic} />,
                }] : []),
              ]}
            />
          )}
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <NextTopicCard topic={nextTopic} currentTopic={topic} />
      </div>
    </PageWrapper>
  )
}
