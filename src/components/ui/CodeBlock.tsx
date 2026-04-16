import { useEffect, useState } from 'react'
import { getHighlighter, SUPPORTED_LANGS } from '@/lib/shiki'

interface Props {
  code: string
  language?: string
  label?: string
}

export default function CodeBlock({ code, language = 'code', label }: Props) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)

  useEffect(() => {
    const lang = SUPPORTED_LANGS.has(language) ? language : null
    if (!lang) {
      setHighlightedHtml(null)
      return
    }
    let cancelled = false
    getHighlighter().then(hl => {
      if (cancelled) return
      // Input is static topic data, not user input — safe for dangerouslySetInnerHTML
      setHighlightedHtml(hl.codeToHtml(code, { lang, theme: 'one-dark-pro' }))
    })
    return () => { cancelled = true }
  }, [code, language])

  return (
    <div style={{
      borderRadius: 10,
      overflow: 'hidden',
      border: '1px solid #252838',
      background: '#0d0f17',
      fontFamily: 'var(--font-mono)',
    }}>
      {/* Terminal title bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px',
        background: '#131520',
        borderBottom: '1px solid #252838',
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        </div>

        {/* Label / filename — centred in bar, only when explicitly provided */}
        <span style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          color: '#555a73',
          letterSpacing: '0.02em',
        }}>
          {label ?? ''}
        </span>

        {/* Language badge */}
        <span style={{
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          color: '#3e4260',
          background: '#1c1f2e',
          padding: '2px 7px',
          borderRadius: 4,
          letterSpacing: '0.04em',
          flexShrink: 0,
        }}>
          {language}
        </span>
      </div>

      {/* Code area */}
      {highlightedHtml ? (
        // Shiki output is from our own static topic data — not user input
        // eslint-disable-next-line react/no-danger
        <div
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          style={{ fontSize: 12.5, lineHeight: 1.7, overflowX: 'auto' }}
          className="shiki-block"
        />
      ) : (
        <pre style={{
          background: '#0d0f17',
          padding: '14px 18px',
          fontSize: 12.5,
          lineHeight: 1.7,
          fontFamily: 'var(--font-mono)',
          color: '#abb2bf',
          overflowX: 'auto',
          margin: 0,
        }}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
