import { useState } from 'react'
import type { CommonError } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'

interface Props {
  errors: CommonError[]
  color?: string
}

export default function CommonErrorsPanel({ errors, color: _color }: Props) {
  const [openIdx, setOpenIdx] = useState<number>(0)

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: 'var(--text)' }}>
        Häufige Fehler
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {errors.map((err, i) => {
          const isOpen = openIdx === i
          return (
            <div
              key={i}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${isOpen ? 'rgba(240,79,106,0.3)' : 'rgba(240,79,106,0.12)'}`,
                borderRadius: 10,
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '13px 16px', cursor: 'pointer',
                  background: 'none', border: 'none', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 14, flexShrink: 0 }}>⚠</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(240,79,106,0.9)', flex: 1 }}>
                  {err.title}
                </span>
                <span style={{
                  fontSize: 10, color: 'var(--text-faint)',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}>
                  ▼
                </span>
              </button>

              {isOpen && (
                <div style={{ padding: '0 16px 16px 40px' }}>
                  <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 12 }}>
                    {err.why}
                  </p>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'rgba(52,211,153,0.7)', marginBottom: 6,
                  }}>
                    {err.fixLabel}
                  </div>
                  <CodeBlock code={err.fixCode} language="javascript" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
