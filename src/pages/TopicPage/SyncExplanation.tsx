import { useRef, useState, useEffect, type ComponentType } from 'react'
import { motion, useInView } from 'framer-motion'
import { MousePointerClick } from 'lucide-react'
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

      <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: 40, alignItems: 'start' }}>
        {/* Left: Sticky animation */}
        <div style={{ position: 'sticky', top: 80 }}>
          {/* Animation panel — click to advance */}
          <div
            onClick={ctrl.next}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '28px 24px',
              minHeight: 420,
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
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (inView && !active) onActivate()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: active ? 1 : 0.45, x: active ? 0 : 6 }}
      transition={{ duration: 0.3 }}
      style={{ cursor: active ? 'default' : 'pointer' }}
      onClick={!active ? onActivate : undefined}
      onMouseEnter={() => !active && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 16,
        borderLeft: `3px solid ${active ? color : hovered ? color + '55' : 'transparent'}`,
        paddingLeft: 12,
        paddingTop: 10, paddingBottom: 10, paddingRight: 10,
        borderRadius: 8,
        background: active ? 'transparent' : hovered ? color + '08' : 'transparent',
        transition: 'border-color 0.2s, background 0.2s',
      }}>
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          background: active ? color : hovered ? color + '22' : 'var(--surface-bright)',
          border: `2px solid ${active ? color : hovered ? color + '55' : 'var(--border)'}`,
          color: active ? '#fff' : hovered ? color : 'var(--text-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, flexShrink: 0, transition: 'all 0.2s',
        }}>
          {index + 1}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0 }}>
              {step.heading}
            </h3>
            {!active && hovered && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontSize: 10, fontFamily: 'var(--font-mono)',
                color, opacity: 0.8,
              }}>
                <MousePointerClick size={10} /> activate
              </span>
            )}
          </div>
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
