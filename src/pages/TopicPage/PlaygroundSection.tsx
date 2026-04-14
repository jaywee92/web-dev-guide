// src/pages/TopicPage/PlaygroundSection.tsx
import { useState, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import type { Topic } from '@/types'
import VisualPlayground from '@/playgrounds/VisualPlayground'
import MonacoPlayground from '@/playgrounds/MonacoPlayground'

const GradientPlayground = lazy(() => import('@/playgrounds/GradientPlayground'))
const CSSLivePlayground  = lazy(() => import('@/playgrounds/CSSLivePlayground'))

interface Props { topic: Topic }

export default function PlaygroundSection({ topic }: Props) {
  const { t } = useTranslation('topic')
  const examples = topic.playgroundExamples ?? []
  const [activeIdx, setActiveIdx] = useState(0)
  const LOADING = <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>{t('loading', { defaultValue: 'Loading…', ns: 'common' })}</div>

  if (topic.playgroundType === 'none') return null

  const selectedCode = examples.length > 0 ? examples[activeIdx]?.code : undefined

  return (
    <section style={{
      maxWidth: 1100, margin: '0 auto',
      padding: '64px 24px 80px',
      borderTop: '1px solid var(--border)',
    }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
        {t('playground')}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: examples.length > 0 ? 16 : 32 }}>
        {t('playgroundSubtitle')}
      </p>

      {/* Example tabs — only rendered when playgroundExamples provided */}
      {examples.length > 0 && (
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: activeIdx === i ? 700 : 400,
                padding: '5px 14px', borderRadius: 6, cursor: 'pointer',
                border: '1px solid',
                borderColor: activeIdx === i ? `${topic.color}66` : 'var(--border)',
                background: activeIdx === i ? `${topic.color}18` : 'var(--surface)',
                color: activeIdx === i ? topic.color : 'var(--text-muted)',
                transition: 'all 0.15s',
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>
      )}

      {topic.playgroundType === 'gradient' ? (
        <Suspense fallback={LOADING}><GradientPlayground /></Suspense>
      ) : topic.playgroundType === 'css-live' ? (
        <Suspense fallback={LOADING}>
          <CSSLivePlayground
            topicId={topic.id}
            defaultCSS={topic.defaultCSS ?? '/* Write your CSS here */'}
            previewHTML={topic.previewHTML ?? '<div class="box">Hello</div>'}
          />
        </Suspense>
      ) : topic.playgroundType === 'visual-controls' ? (
        <VisualPlayground topicId={topic.id} />
      ) : (
        /* key forces Monaco to remount when tab changes; storageKey is per-tab to prevent state collision */
        <MonacoPlayground
          key={`${topic.id}-${activeIdx}`}
          topicId={topic.id}
          starterCode={selectedCode}
          language="javascript"
          storageKey={examples.length > 0 ? `monaco-${topic.id}-${activeIdx}` : undefined}
        />
      )}
    </section>
  )
}
