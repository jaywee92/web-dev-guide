import { useRef, useEffect, type ComponentType } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Topic, ExplanationStep } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'
import { useAnimationStep } from '@/hooks/useAnimationStep'

interface Props {
  topic: Topic
  AnimComp: ComponentType<{ step: number; compact?: boolean }> | null
}

export default function SyncExplanation({ topic, AnimComp }: Props) {
  const explanationSection = topic.sections.find(s => s.type === 'explanation')
  const steps = explanationSection?.steps ?? []
  const ctrl = useAnimationStep({ totalSteps: Math.max(steps.length, 1), autoPlay: false })

  if (steps.length === 0) return null

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 40, color: 'var(--text)' }}>
        How it works
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(360px, 55fr) minmax(0, 45fr)', gap: 40, alignItems: 'start' }}>
        {/* Left: Sticky animation */}
        <div style={{ position: 'sticky', top: 80 }}>
          {/* Animation panel — click to advance */}
          <div
            onClick={ctrl.next}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '24px',
              height: 460,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: ctrl.step < steps.length - 1 ? 'pointer' : 'default',
              userSelect: 'none',
              overflow: 'hidden',
            }}
          >
            {AnimComp
              ? <AnimComp step={ctrl.step} />
              : <span style={{ color: 'var(--text-muted)' }}>Animation</span>
            }
          </div>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center', marginTop: 14 }}>
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => ctrl.goTo(i)}
                title={`Step ${i + 1}`}
                style={{
                  width: ctrl.step === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: ctrl.step === i ? topic.color : 'var(--border)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.25s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: Scrollable steps */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((step, i) => (
              <StepBlock
                key={step.heading}
                step={step}
                index={i}
                active={ctrl.step === i}
                onActivate={() => ctrl.goTo(i)}
                color={topic.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepBlock({ step, index, active, onActivate, color }: {
  step: ExplanationStep
  index: number
  active: boolean
  onActivate: () => void
  color: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-35% 0px -35% 0px' })

  useEffect(() => {
    if (inView && !active) onActivate()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  const stepLabel = `STEP ${String(index + 1).padStart(2, '0')}`

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: active ? 1 : 0.45 }}
      transition={{ duration: 0.25 }}
      onClick={!active ? onActivate : undefined}
      style={{
        borderRadius: 12, overflow: 'hidden',
        border: `1px solid ${active ? color + '45' : 'var(--border)'}`,
        cursor: active ? 'default' : 'pointer',
        boxShadow: active ? `0 2px 20px ${color}14` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        display: 'flex',
      }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ background: active ? color : 'var(--border)' }}
        transition={{ duration: 0.3 }}
        style={{ width: 4, flexShrink: 0 }}
      />

      {/* Content */}
      <div style={{ padding: '16px 18px', flex: 1, background: 'var(--surface)' }}>
        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
          fontFamily: 'var(--font-mono)',
          color: active ? color : 'var(--text-muted)',
          marginBottom: 6, transition: 'color 0.3s',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {stepLabel}
          {step.icon && (
            <span style={{ fontSize: 16, lineHeight: 1, filter: active ? 'none' : 'grayscale(0.5)' }}>
              {step.icon}
            </span>
          )}
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.3 }}>
          {step.heading}
        </h3>
        <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0, marginBottom: step.codeExample ? 12 : 0 }}>
          {step.text}
        </p>
        {step.codeExample && (
          <CodeBlock code={step.codeExample} language={step.language} />
        )}
      </div>
    </motion.div>
  )
}
