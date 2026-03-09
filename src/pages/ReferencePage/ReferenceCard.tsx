import { ExternalLink } from 'lucide-react'
import type { ReferenceEntry } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'

interface Props {
  entry: ReferenceEntry
  accentColor: string
}

export default function ReferenceCard({ entry, accentColor }: Props) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 8,
          padding: '14px 16px 10px',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              fontWeight: 700,
              color: accentColor,
              marginBottom: 4,
            }}
          >
            {entry.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {entry.description}
          </div>
        </div>
        <a
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--text-faint)',
            flexShrink: 0,
            padding: '2px 4px',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = accentColor)}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-faint)')}
          title={`Open on ${entry.link.includes('htmlreference') ? 'htmlreference.io' : 'cssreference.io'}`}
        >
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Code example */}
      <div style={{ padding: '0 0 0 0', borderTop: '1px solid var(--border)' }}>
        <CodeBlock code={entry.example} />
      </div>
    </div>
  )
}
