import { useRef, useEffect, type ComponentType } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Topic, ExplanationStep } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'
import { useAnimationStep } from '@/hooks/useAnimationStep'

interface Props {
  topic: Topic
  AnimComp: ComponentType<{ step: number; compact?: boolean }> | null
  animLoading?: boolean
}

export default function SyncExplanation({ topic, AnimComp, animLoading }: Props) {
  const explanationSection = topic.sections.find(s => s.type === 'explanation')
  const steps = explanationSection?.steps ?? []
  const ctrl = useAnimationStep({ totalSteps: Math.max(steps.length, 1), autoPlay: false })

  if (steps.length === 0) return null

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 40, color: 'var(--text)' }}>
          How it works
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 44fr) minmax(0, 56fr)', gap: 40, alignItems: 'start' }}>
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
              {AnimComp ? (
                <AnimComp step={ctrl.step} />
              ) : animLoading ? (
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  border: `2px solid ${topic.color}20`,
                  borderTopColor: topic.color,
                  animation: 'spin 1s linear infinite',
                }} />
              ) : null}
            </div>

            {/* Step dots */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center', marginTop: 14 }}>
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => ctrl.goTo(i)}
                  tabIndex={0}
                  aria-label={`Step ${i + 1}${ctrl.step === i ? ', current' : ''}`}
                  aria-current={ctrl.step === i ? 'step' : undefined}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      ctrl.goTo(i)
                    }
                  }}
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
                  active={ctrl.step === i}
                  onActivate={() => ctrl.goTo(i)}
                  color={topic.color}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function StepBlock({ step, active, onActivate, color }: {
  step: ExplanationStep
  active: boolean
  onActivate: () => void
  color: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px' })

  useEffect(() => {
    if (inView && !active) onActivate()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: active ? 1 : 0.38, y: active ? 0 : 5 }}
      transition={{ duration: 0.3 }}
      onClick={!active ? onActivate : undefined}
      style={{
        borderRadius: 12,
        border: `1px solid ${active ? color + '45' : 'var(--border)'}`,
        overflow: 'hidden',
        cursor: active ? 'default' : 'pointer',
        boxShadow: active ? `0 0 24px ${color}10` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Header band */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 18px',
        background: active
          ? `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`
          : `linear-gradient(135deg, ${color}0d 0%, ${color}04 100%)`,
        borderBottom: `1px solid ${active ? color + '20' : 'var(--border)'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        {step.icon && (
          <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0, filter: active ? 'none' : 'grayscale(0.4)', transition: 'filter 0.3s' }}>
            {step.icon}
          </span>
        )}
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.25 }}>
          {step.heading}
        </h3>
      </div>
      {/* Body */}
      <div style={{ padding: '14px 18px', background: 'var(--surface)' }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0, marginBottom: step.codeExample ? 12 : 0 }}>
          {step.text}
        </p>
        {step.codeExample && (
          <CodeBlock code={step.codeExample} language={step.language} />
        )}
      </div>
    </motion.div>
  )
}
