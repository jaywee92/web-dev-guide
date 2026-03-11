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
      {highlightedHtml ? (
        // Shiki output is from our own static topic data — not user input
        // eslint-disable-next-line react/no-danger
        <div
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          style={{ fontSize: 13, lineHeight: 1.6, overflowX: 'auto' }}
        />
      ) : (
        <pre style={{
          background: 'var(--surface)',
          padding: '16px',
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text)',
          overflowX: 'auto',
          margin: 0,
        }}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
