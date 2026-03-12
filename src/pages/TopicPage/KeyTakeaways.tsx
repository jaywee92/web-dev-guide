// src/pages/TopicPage/KeyTakeaways.tsx
import { CheckCircle2 } from 'lucide-react'
import type { Topic } from '@/types'

interface Props {
  topic: Topic
}

export default function KeyTakeaways({ topic }: Props) {
  const steps = topic.sections.find(s => s.type === 'explanation')?.steps ?? []
  if (steps.length < 2) return null

  return (
    <div style={{
      margin: '48px 0 0',
      padding: '20px 24px',
      borderRadius: 12,
      background: `${topic.color}08`,
      border: `1px solid ${topic.color}25`,
    }}>
      <div style={{
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        letterSpacing: '0.08em',
        color: topic.color,
        textTransform: 'uppercase',
        marginBottom: 14,
      }}>
        Key Takeaways
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {steps.map((step, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <CheckCircle2
              size={15}
              color={topic.color}
              style={{ flexShrink: 0, marginTop: 1, opacity: 0.8 }}
            />
            <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>{step.heading}</strong>
              {step.text ? ` — ${step.text.split('.')[0]}.` : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
