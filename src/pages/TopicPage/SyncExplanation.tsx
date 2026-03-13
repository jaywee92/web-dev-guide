import { useRef, type ComponentType } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        {/* Left: Sticky animation */}
        <div style={{ position: 'sticky', top: 80 }}>
          {/* Animation panel — click to advance */}
          <div
            onClick={ctrl.next}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 32,
              minHeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: ctrl.step < steps.length - 1 ? 'pointer' : 'default',
              userSelect: 'none',
            }}
          >
            {AnimComp
              ? <AnimComp step={ctrl.step} compact />
              : <span style={{ color: 'var(--text-muted)' }}>Animation</span>
            }
          </div>

          {/* Step navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
            gap: 8,
          }}>
            <button
              onClick={ctrl.prev}
              disabled={ctrl.step === 0}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '6px 12px', borderRadius: 8, cursor: ctrl.step === 0 ? 'not-allowed' : 'pointer',
                background: 'var(--surface)', border: '1px solid var(--border)',
                color: ctrl.step === 0 ? 'var(--text-faint)' : 'var(--text-muted)',
                fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
              }}
            >
              <ChevronLeft size={14} /> Prev
            </button>

            {/* Step dots */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => ctrl.goTo(i)}
                  style={{
                    width: ctrl.step === i ? 20 : 8,
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

            <button
              onClick={ctrl.next}
              disabled={ctrl.step === steps.length - 1}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '6px 12px', borderRadius: 8,
                cursor: ctrl.step === steps.length - 1 ? 'not-allowed' : 'pointer',
                background: ctrl.step === steps.length - 1 ? 'var(--surface)' : topic.color,
                border: `1px solid ${ctrl.step === steps.length - 1 ? 'var(--border)' : topic.color}`,
                color: ctrl.step === steps.length - 1 ? 'var(--text-faint)' : '#fff',
                fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
              }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Right: Scrollable steps */}
        <div>
          {/* Step pill navigator */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28,
            position: 'sticky', top: 80, zIndex: 10,
            background: 'linear-gradient(to bottom, var(--bg) 80%, transparent)',
            paddingBottom: 12,
          }}>
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => ctrl.goTo(i)}
                title={step.heading}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 10px 4px 4px',
                  borderRadius: 999,
                  border: `1px solid ${ctrl.step === i ? topic.color + '80' : 'var(--border)'}`,
                  background: ctrl.step === i ? topic.color + '18' : 'var(--surface)',
                  cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font-mono)',
                  color: ctrl.step === i ? topic.color : 'var(--text-muted)',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis',
                }}
              >
                <span style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  background: ctrl.step === i ? topic.color : 'var(--surface-bright)',
                  color: ctrl.step === i ? '#fff' : 'var(--text-muted)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 700, transition: 'all 0.2s',
                }}>
                  {i + 1}
                </span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {step.heading.length > 16 ? step.heading.slice(0, 14) + '…' : step.heading}
                </span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
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
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 16,
        borderLeft: `3px solid ${active ? color : 'transparent'}`,
        paddingLeft: 12, transition: 'border-color 0.3s', borderRadius: 4,
      }}>
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          background: active ? color : 'var(--surface-bright)',
          border: `2px solid ${active ? color : 'var(--border)'}`,
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
