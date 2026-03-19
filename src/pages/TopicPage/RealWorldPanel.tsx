import type { RealWorldExample } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'

interface Props {
  examples: RealWorldExample[]
  color: string
}

export default function RealWorldPanel({ examples, color }: Props) {
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: 'var(--text)' }}>
        In the Wild
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 16,
      }}>
        {examples.map((ex, i) => (
          <div
            key={i}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 18,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', color,
            }}>
              {ex.context}
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: 0 }}>
              {ex.heading}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {ex.description}
            </p>
            <CodeBlock code={ex.code} language="javascript" />
          </div>
        ))}
      </div>
    </section>
  )
}
