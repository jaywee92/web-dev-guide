import { useState, useCallback, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { useAppStore } from '@/store/useAppStore'

interface Props {
  defaultCSS: string
  previewHTML: string
  topicId: string
}

const IFRAME_BASE_STYLE = `
  body {
    margin: 0;
    padding: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #e2e8f0;
    background: #0f172a;
    box-sizing: border-box;
  }
  * { box-sizing: inherit; }
`

function buildSrcDoc(html: string, css: string): string {
  return [
    '<!DOCTYPE html><html><head><style>',
    IFRAME_BASE_STYLE,
    css,
    '</style></head><body>',
    html,
    '</body></html>',
  ].join('')
}

export default function CSSLivePlayground({ defaultCSS, previewHTML, topicId }: Props) {
  const { theme } = useAppStore()
  const [css, setCss] = useState(defaultCSS)
  const [showHTML, setShowHTML] = useState(false)
  const editorRef = useRef<{ setValue: (v: string) => void } | null>(null)

  const handleReset = useCallback(() => {
    setCss(defaultCSS)
    editorRef.current?.setValue(defaultCSS)
  }, [defaultCSS])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: 'var(--surface-bright)',
        border: '1px solid var(--border)',
        borderBottom: 'none',
        borderRadius: 'var(--radius) var(--radius) 0 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {(['#f87171', '#f5c542', '#4ade80'] as const).map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
          <span style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            marginLeft: 6,
          }}>
            style.css — {topicId}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setShowHTML(v => !v)}
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: showHTML ? 'var(--text)' : 'var(--text-muted)',
              background: showHTML ? 'var(--border)' : 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '2px 8px',
              cursor: 'pointer',
            }}
          >
            {showHTML ? 'Hide HTML' : 'Show HTML'}
          </button>
          <button
            onClick={handleReset}
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '2px 8px',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        border: '1px solid var(--border)',
        borderRadius: '0 0 var(--radius) var(--radius)',
        overflow: 'hidden',
        minHeight: 380,
      }}>
        {/* Editor pane */}
        <div style={{ borderRight: '1px solid var(--border)' }}>
          {showHTML ? (
            <Editor
              height="380px"
              language="html"
              value={previewHTML}
              options={{
                readOnly: true,
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 12 },
              }}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
            />
          ) : (
            <Editor
              height="380px"
              language="css"
              value={css}
              onChange={v => setCss(v ?? '')}
              onMount={editor => { editorRef.current = editor as { setValue: (v: string) => void } }}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 12 },
                wordWrap: 'on',
              }}
            />
          )}
        </div>

        {/* Preview pane — sandboxed iframe, CSS cannot escape to parent */}
        <iframe
          title="CSS preview"
          srcDoc={buildSrcDoc(previewHTML, css)}
          sandbox="allow-scripts"
          style={{ width: '100%', height: 380, border: 'none', background: '#0f172a' }}
        />
      </div>
    </div>
  )
}
