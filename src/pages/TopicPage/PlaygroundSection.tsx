import type { Topic } from '@/types'
import VisualPlayground from '@/playgrounds/VisualPlayground'
import MonacoPlayground from '@/playgrounds/MonacoPlayground'
import { lazy, Suspense } from 'react'

const GradientPlayground = lazy(() => import('@/playgrounds/GradientPlayground'))
const CSSLivePlayground  = lazy(() => import('@/playgrounds/CSSLivePlayground'))

const LOADING = <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading...</div>

interface Props { topic: Topic }

export default function PlaygroundSection({ topic }: Props) {
  if (topic.playgroundType === 'none') return null

  return (
    <section style={{
      maxWidth: 1100, margin: '0 auto',
      padding: '64px 24px 80px',
      borderTop: '1px solid var(--border)',
    }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
        Playground
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
        Experiment directly — changes apply in real time.
      </p>
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
        <MonacoPlayground topicId={topic.id} />
      )}
    </section>
  )
}
