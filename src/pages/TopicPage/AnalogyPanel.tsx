import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import type { ExplanationStep } from '@/types'

interface Props {
  analogy: ExplanationStep['analogy'] | undefined
  color: string
  AnalogyComp?: ComponentType<{ step: number }> | null
  step?: number
}

export default function AnalogyPanel({ analogy, color, AnalogyComp, step = 0 }: Props) {
  const { t } = useTranslation('topic')
  if (!analogy && !AnalogyComp) return null

  const caption = analogy?.text[analogy.text.length - 1]
  const amber = '#fbbf24'

  return (
    <div style={{
      marginTop: 12,
      flexShrink: 0,
      background: 'var(--surface)',
      border: `1px solid ${amber}55`,
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: `0 2px 16px ${amber}12`,
    }}>
      {/* Left amber accent */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 3, background: amber,
      }} />

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px 8px 17px',
        background: `linear-gradient(135deg, ${amber}22 0%, ${amber}08 100%)`,
        borderBottom: `1px solid ${amber}28`,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 800,
          letterSpacing: '0.1em', padding: '2px 7px', borderRadius: 20,
          background: `${amber}30`,
          border: `1px solid ${amber}70`,
          color: amber, textTransform: 'uppercase', flexShrink: 0,
        }}>
          {t('analogy')}
        </span>
        {analogy && (
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
            {analogy.title}
          </span>
        )}
      </div>

      {/* Body */}
      {AnalogyComp ? (
        <div style={{ padding: '12px 14px 12px 17px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <AnalogyComp step={step} />
          {caption && (
            <p style={{
              fontSize: 11, color: 'var(--text-faint)',
              lineHeight: 1.6, margin: 0, fontStyle: 'italic',
            }}>
              {caption}
            </p>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 14, padding: '14px 14px 14px 17px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>
            {analogy!.icon}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {analogy!.text.map((paragraph, i) => (
              <p key={i} style={{
                fontSize: 12.5,
                color: i === analogy!.text.length - 1 && analogy!.text.length > 2
                  ? 'var(--text-faint)'
                  : 'var(--text-muted)',
                lineHeight: 1.65, margin: 0,
              }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Topic color accent dot */}
      {color !== amber && (
        <div style={{
          position: 'absolute', bottom: 8, right: 10,
          width: 6, height: 6, borderRadius: '50%',
          background: color, opacity: 0.5,
        }} />
      )}
    </div>
  )
}
