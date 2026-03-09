import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Topic, ExplanationStep } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'
import { getAnimationComponent } from '@/topics/registry'
import { useAnimationStep } from '@/hooks/useAnimationStep'

interface Props { topic: Topic }

export default function SyncExplanation({ topic }: Props) {
  const explanationSection = topic.sections.find(s => s.type === 'explanation')
  const steps = explanationSection?.steps ?? []
  const AnimComp = getAnimationComponent(topic.animationComponent)
  const ctrl = useAnimationStep({ totalSteps: Math.max(steps.length, 1), autoPlay: false })

  if (steps.length === 0) return null

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 40, color: 'var(--text)' }}>
        How it works
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        {/* Left: Sticky animation */}
        <div style={{ position: 'sticky', top: 80 }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: 32,
            minHeight: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {AnimComp
              ? <AnimComp step={ctrl.step} compact />
              : <span style={{ color: 'var(--text-muted)' }}>Animation</span>
            }
          </div>
        </div>

        {/* Right: Scrollable steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {steps.map((step, i) => (
            <StepBlock
              key={step.heading}
              step={step}
              index={i}
              active={ctrl.step === i}
              onActivate={() => ctrl.goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepBlock({ step, index, active, onActivate }: {
  step: ExplanationStep
  index: number
  active: boolean
  onActivate: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px' })

  if (inView && !active) onActivate()

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: active ? 1 : 0.4, x: active ? 0 : 8 }}
      transition={{ duration: 0.3 }}
      style={{ cursor: 'pointer' }}
      onClick={onActivate}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          background: active ? 'var(--blue)' : 'var(--surface-bright)',
          border: `2px solid ${active ? 'var(--blue)' : 'var(--border)'}`,
          color: active ? '#fff' : 'var(--text-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, flexShrink: 0, transition: 'all 0.3s',
        }}>
          {index + 1}
        </span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
            {step.heading}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: step.codeExample ? 12 : 0 }}>
            {step.text}
          </p>
          {step.codeExample && (
            <CodeBlock code={step.codeExample} language={step.language} />
          )}
        </div>
      </div>
    </motion.div>
  )
}
