import { useRef, useEffect, type ComponentType } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Topic, ExplanationStep } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'
import { useAnimationStep } from '@/hooks/useAnimationStep'

interface Props {
  topic: Topic
  AnimComp: ComponentType<{ step: number; compact?: boolean }> | null
  animLoading?: boolean
}

export default function SyncExplanation({ topic, AnimComp, animLoading }: Props) {
  const { t } = useTranslation('topic')
  const explanationSection = topic.sections.find(s => s.type === 'explanation')
  const steps = explanationSection?.steps ?? []
  const ctrl = useAnimationStep({ totalSteps: Math.max(steps.length, 1), autoPlay: false })

  if (steps.length === 0) return null

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 40, color: 'var(--text)' }}>
          {t('howItWorks')}
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
    </>
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

  useEffect(() => {
    if (inView && !active) onActivate()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 5 }}
      transition={{ duration: 0.3 }}
      onClick={!active ? onActivate : undefined}
      style={{
        borderRadius: 13,
        border: `1px solid ${active ? color + '4d' : 'var(--border)'}`,
        overflow: 'hidden',
        cursor: active ? 'default' : 'pointer',
        boxShadow: active ? `0 4px 28px ${color}12` : 'none',
        background: active
          ? `linear-gradient(90deg, ${color}0a 0%, var(--surface) 100px)`
          : 'var(--surface)',
        position: 'relative',
        transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
      }}
    >
      {/* Left accent line */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: active ? color : color + '30',
        transition: 'background 0.3s',
      }} />

      {/* Banner header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 13,
        padding: '14px 18px 12px 21px',
        background: active
          ? `linear-gradient(135deg, ${color}1e 0%, ${color}08 100%)`
          : `linear-gradient(135deg, ${color}0f 0%, ${color}04 100%)`,
        borderBottom: `1px solid ${active ? color + '26' : color + '0f'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        {/* Icon box */}
        {step.icon && (
          <div style={{
            width: 38, height: 38, flexShrink: 0, borderRadius: 9,
            background: active ? color + '33' : color + '1a',
            border: `1px solid ${active ? color + '73' : color + '33'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, lineHeight: 1,
            boxShadow: active ? `0 0 14px ${color}2e` : 'none',
            transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
          }}>
            {step.icon}
          </div>
        )}

        {/* Pill + heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{
            display: 'inline-flex', alignSelf: 'flex-start',
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, letterSpacing: '0.1em',
            padding: '2px 7px', borderRadius: 20,
            background: active ? color + '2e' : color + '1a',
            border: `1px solid ${active ? color + '66' : color + '2e'}`,
            color: active ? color : color + '8c',
            textTransform: 'uppercase',
            transition: 'background 0.3s, color 0.3s, border-color 0.3s',
          }}>
            INFO {String(index + 1).padStart(2, '0')}
          </span>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.25 }}>
            {step.heading}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '13px 18px 15px 21px' }}>
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
