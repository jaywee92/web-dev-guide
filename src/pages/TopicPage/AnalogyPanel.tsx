import type { ExplanationStep } from '@/types'

interface Props {
  analogy: ExplanationStep['analogy'] | undefined
  color: string  // topic color — accepted for API consistency, not used visually (panel always uses amber)
}

export default function AnalogyPanel({ analogy, color: _color }: Props) {
  if (!analogy) return null

  return (
    <div style={{
      marginTop: 12,
      flexShrink: 0,
      overflow: 'hidden',
      background: 'var(--surface)',
      border: '1px solid rgba(251,191,36,0.22)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Left amber accent */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 3, background: '#fbbf24',
      }} />

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px 8px 17px',
        background: 'linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(251,191,36,0.03) 100%)',
        borderBottom: '1px solid rgba(251,191,36,0.12)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 800,
          letterSpacing: '0.1em', padding: '2px 7px', borderRadius: 20,
          background: 'rgba(251,191,36,0.18)', border: '1px solid rgba(251,191,36,0.4)',
          color: '#fbbf24', textTransform: 'uppercase', flexShrink: 0,
        }}>
          Analogie
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
          {analogy.title}
        </span>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', gap: 14, padding: '14px 14px 14px 17px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>
          {analogy.icon}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {analogy.text.map((paragraph, i) => (
            <p key={i} style={{
              fontSize: 12.5, color: i === analogy.text.length - 1
                ? 'rgba(139,144,168,0.55)'
                : 'var(--text-muted)',
              lineHeight: 1.65, margin: 0,
            }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
