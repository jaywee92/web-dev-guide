interface Props {
  code: string
  language?: string
  label?: string
}

export default function CodeBlock({ code, language = 'code', label }: Props) {
  return (
    <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {label && (
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ background: 'var(--surface-bright)', borderBottom: '1px solid var(--border)' }}
        >
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {label}
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
            {language}
          </span>
        </div>
      )}
      <pre
        style={{
          background: 'var(--surface)',
          padding: '16px',
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text)',
          overflowX: 'auto',
          margin: 0,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
