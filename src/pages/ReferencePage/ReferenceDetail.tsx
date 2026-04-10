import { useState, useEffect, useRef } from 'react'
import { ExternalLink, ChevronLeft, ChevronRight, Check, Copy } from 'lucide-react'
import type { ReferenceEntry } from '@/types'
import CodeBlock from '@/components/ui/CodeBlock'
import type { SelectedEntry } from '.'
import type { RefType } from '.'

const LANG_MAP: Record<RefType, string> = {
  html: 'html',
  css: 'css',
  javascript: 'javascript',
  typescript: 'typescript',
  tailwind: 'html',
  react: 'typescript',
  nextjs: 'typescript',
  webapis: 'javascript',
  postgresql: 'sql',
  git: 'bash',
  testing: 'typescript',
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function buildHtmlPreview(example: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0}
body{padding:14px;background:#0f1117;color:#e2e8f0;font-family:system-ui,-apple-system,sans-serif;font-size:13px;line-height:1.6}
a{color:#5b9cf5}
h1,h2,h3,h4,h5,h6{margin-bottom:6px;font-weight:700;line-height:1.3}
p{margin-bottom:6px}
ul,ol{padding-left:18px;margin-bottom:6px}
table{border-collapse:collapse;width:100%;margin-bottom:6px}
th,td{border:1px solid #2d3154;padding:5px 9px;text-align:left}
th{background:#1e2030;font-size:11px;color:#94a3b8}
input,select,textarea{background:#1e2030;border:1px solid #2d3154;color:#e2e8f0;padding:5px 9px;border-radius:4px;font-family:inherit;font-size:inherit}
button{background:#2d3154;border:1px solid #4a4e6a;color:#e2e8f0;padding:5px 13px;border-radius:4px;cursor:pointer;font-size:inherit}
form{display:flex;flex-direction:column;gap:6px}
label{font-size:11px;color:#94a3b8}
img{max-width:100%;border-radius:4px}
code{background:#1e2030;padding:2px 5px;border-radius:3px;font-family:monospace;font-size:11px}
pre{background:#1e2030;padding:10px;border-radius:5px;overflow:auto;font-size:11px}
blockquote{border-left:3px solid #4a4e6a;padding-left:10px;color:#94a3b8;margin:6px 0}
details>summary{cursor:pointer;font-weight:600}
</style></head><body>${example}</body></html>`
}

function buildCssPreview(example: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0}
body{padding:14px;background:#0f1117;color:#e2e8f0;font-family:system-ui,sans-serif;font-size:13px;line-height:1.5}
a{color:#5b9cf5}
input{background:#1e2030;border:1px solid #2d3154;color:#e2e8f0;padding:5px 9px;border-radius:4px;font-size:13px}
button{background:#2d3154;border:1px solid #4a4e6a;color:#e2e8f0;padding:5px 12px;border-radius:4px;cursor:pointer}
/* — demo — */
${example}
</style></head><body>
<p>Paragraph text with <a href="#">a link</a> and <strong>bold</strong>.</p>
<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>
<div class="demo container wrapper box card flex-container grid-container label" style="margin-top:8px">
  <div class="item child">Item A</div>
  <div class="item child">Item B</div>
  <div class="item child">Item C</div>
</div>
<ul style="margin-top:8px"><li>First item</li><li>Second item</li></ul>
<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
  <input type="text" value="Input">
  <button>Button</button>
</div>
</body></html>`
}

function buildTailwindPreview(example: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<script src="https://cdn.tailwindcss.com"></script>
<style>body{background:#0f1117;padding:16px;font-size:14px}</style>
</head><body>${example}</body></html>`
}

function buildConsolePreview(example: string, color: string): string {
  const lines = example.split('\n')
  const outputs: Array<{ val: string; isError: boolean }> = []
  for (const line of lines) {
    const m = line.match(/\/\/\s*(.+)/)
    if (!m) continue
    const val = m[1].trim()
    if (val.startsWith('—') || val.startsWith('-')) continue
    const isError = val.startsWith('✗') || val.toLowerCase().startsWith('error') || val.startsWith('TypeError')
    if (!isError && val.length < 80) outputs.push({ val, isError })
  }
  const rows = outputs.slice(0, 8).map(({ val, isError }) =>
    `<div class="${isError ? 'err' : 'out'}">${esc(val)}</div>`
  ).join('')
  return `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0d1117;padding:14px;font-family:'Fira Code',monospace;font-size:12px;color:#e2e8f0;line-height:1.9}
.label{color:#4a4e6a;font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;display:flex;align-items:center;gap:6px}
.dot{width:7px;height:7px;border-radius:50%;background:${color};box-shadow:0 0 6px ${color}99}
.out{color:#4ade80;padding:1px 0}
.err{color:#f87171;padding:1px 0}
</style></head><body>
<div class="label"><span class="dot"></span>Console output</div>
${rows || `<div style="color:#4a4e6a">// no output</div>`}
</body></html>`
}

function buildReactPreview(example: string, name: string, color: string): string {
  const tagMatches = [...example.matchAll(/<([A-Za-z][A-Za-z0-9.]*)[^/]*?>/g)]
  const seen = new Set<string>()
  const tags = tagMatches
    .map(m => m[1])
    .filter(t => !['style', 'script', 'meta', 'head', 'html', 'body'].includes(t.toLowerCase()))
    .filter(t => { if (seen.has(t)) return false; seen.add(t); return true })
    .slice(0, 7)
  const tree = tags.map((tag, i) => {
    const indent = i === 0 ? 0 : Math.min(i, 3) * 14
    const isCustom = /^[A-Z]/.test(tag)
    const c = isCustom ? color : '#94a3b8'
    return `<div style="padding-left:${indent}px;margin:2px 0;display:flex;align-items:center;gap:5px">
      <span style="color:#4a4e6a;font-size:10px">${i === 0 ? '▶' : '└'}</span>
      <span style="color:${c};font-weight:${isCustom ? 700 : 400}">&lt;${esc(tag)}&gt;</span>
    </div>`
  }).join('')
  const outputs: string[] = []
  for (const line of example.split('\n')) {
    const m = line.match(/\/\/\s*(.+)/)
    if (m && !m[1].includes('✗') && m[1].length < 60) outputs.push(m[1])
  }
  const outputHtml = outputs.slice(0, 3).map(o =>
    `<div style="color:#4ade80;font-size:11px">${esc(o)}</div>`
  ).join('')
  return `<!DOCTYPE html><html><head><style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0d1117;padding:14px;font-family:'Fira Code',ui-monospace,monospace;font-size:12px;color:#e2e8f0;line-height:1.6}
.section{margin-bottom:12px}
.label{color:#4a4e6a;font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;display:flex;align-items:center;gap:6px}
.dot{width:7px;height:7px;border-radius:50%;background:${color};box-shadow:0 0 6px ${color}99}
</style></head><body>
<div class="section">
  <div class="label"><span class="dot"></span>Component tree</div>
  ${tree || `<div style="color:#4a4e6a">&lt;${esc(name.split(' ')[0])}&gt;</div>`}
</div>
${outputHtml ? `<div class="section"><div class="label" style="margin-top:4px">Output</div>${outputHtml}</div>` : ''}
</body></html>`
}

function generatePreview(type: RefType, entry: ReferenceEntry, accentColor: string): string {
  if (entry.previewHtml) return entry.previewHtml
  switch (type) {
    case 'html':       return buildHtmlPreview(entry.example)
    case 'css':        return buildCssPreview(entry.example)
    case 'tailwind':   return buildTailwindPreview(entry.example)
    case 'javascript': return buildConsolePreview(entry.example, accentColor)
    case 'typescript': return buildConsolePreview(entry.example, accentColor)
    case 'react':      return buildReactPreview(entry.example, entry.name, accentColor)
    case 'nextjs':     return buildConsolePreview(entry.example, accentColor)
    case 'webapis':    return buildConsolePreview(entry.example, accentColor)
    case 'postgresql': return buildConsolePreview(entry.example, accentColor)
    case 'git':        return buildConsolePreview(entry.example, accentColor)
    case 'testing':    return buildConsolePreview(entry.example, accentColor)
    default:           return ''
  }
}

interface Props {
  entry: ReferenceEntry
  color: string
  type: RefType
  siteUrl: string
  siteName: string
  categoryTitle: string
  hasPrev: boolean
  hasNext: boolean
  onPrev: () => void
  onNext: () => void
  relatedEntries: SelectedEntry[]
  onSelectRelated: (entry: ReferenceEntry, color: string, categoryTitle: string) => void
}

export default function ReferenceDetail({
  entry, color, type, siteUrl, siteName,
  categoryTitle, hasPrev, hasNext, onPrev, onNext,
  relatedEntries, onSelectRelated,
}: Props) {
  const previewDoc = generatePreview(type, entry, color)
  const [panelHeight, setPanelHeight] = useState(220)
  const [copied, setCopied] = useState(false)
  const isDragging = useRef(false)
  const dragStartY = useRef(0)
  const dragStartH = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const delta = e.clientY - dragStartY.current
      setPanelHeight(Math.max(120, Math.min(500, dragStartH.current + delta)))
    }
    const onUp = () => { isDragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.example).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  const panelHeaderH = 36

  return (
    <div style={{ padding: '28px 36px 60px' }}>

      {/* Breadcrumb + Prev/Next */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <div style={{
          fontSize: 11, fontFamily: 'var(--font-mono)',
          color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ color }}>{categoryTitle}</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: 'var(--text-muted)' }}>{entry.name}</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            title="Previous (↑)"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: 6,
              border: '1px solid var(--border)', background: 'transparent',
              color: hasPrev ? 'var(--text-muted)' : 'var(--text-faint)',
              cursor: hasPrev ? 'pointer' : 'default',
              opacity: hasPrev ? 1 : 0.3,
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            title="Next (↓)"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: 6,
              border: '1px solid var(--border)', background: 'transparent',
              color: hasNext ? 'var(--text-muted)' : 'var(--text-faint)',
              cursor: hasNext ? 'pointer' : 'default',
              opacity: hasNext ? 1 : 0.3,
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Entry title + description */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(20px, 2.5vw, 30px)',
        fontWeight: 800, color,
        marginBottom: 8, lineHeight: 1.2,
      }}>
        {entry.name}
      </div>
      <p style={{
        fontSize: 15, color: 'var(--text-muted)',
        marginBottom: 24, lineHeight: 1.6, maxWidth: 680,
      }}>
        {entry.description}
      </p>

      {/* Preview + Code */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0,
      }}>
        {/* Live Preview */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            height: panelHeaderH, padding: '0 12px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
            <span style={{
              fontSize: 10, fontFamily: 'var(--font-mono)',
              color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              LIVE PREVIEW
            </span>
          </div>
          <iframe
            key={entry.name}
            srcDoc={previewDoc}
            title={`Preview of ${entry.name}`}
            sandbox="allow-scripts"
            style={{
              width: '100%', height: panelHeight,
              border: 'none', display: 'block', background: '#0d1117',
            }}
          />
        </div>

        {/* Code + Copy */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            height: panelHeaderH, padding: '0 12px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-faint)' }} />
              <span style={{
                fontSize: 10, fontFamily: 'var(--font-mono)',
                color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                CODE
              </span>
            </div>
            <button
              onClick={handleCopy}
              title="Copy code"
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '3px 8px', borderRadius: 4,
                border: `1px solid ${copied ? color + '66' : 'var(--border)'}`,
                background: copied ? color + '15' : 'transparent',
                color: copied ? color : 'var(--text-faint)',
                fontSize: 11, fontFamily: 'var(--font-mono)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{ height: panelHeight, overflow: 'auto' }}>
            <CodeBlock code={entry.example} language={LANG_MAP[type]} />
          </div>
        </div>
      </div>

      {/* Resize handle */}
      <div
        onMouseDown={e => {
          isDragging.current = true
          dragStartY.current = e.clientY
          dragStartH.current = panelHeight
          e.preventDefault()
        }}
        style={{
          height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'ns-resize', marginBottom: 20, userSelect: 'none',
        }}
      >
        <div style={{
          width: 36, height: 4, borderRadius: 2,
          background: 'var(--border)',
          transition: 'background 0.15s',
        }} />
      </div>

      {/* External links */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
        <a
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '6px 12px', borderRadius: 6,
            border: `1px solid ${color}44`, background: `${color}10`,
            color, fontSize: 12, fontFamily: 'var(--font-mono)', textDecoration: 'none',
          }}
        >
          <ExternalLink size={11} />
          MDN Docs
        </a>
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '6px 12px', borderRadius: 6,
            border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)', textDecoration: 'none',
          }}
        >
          <ExternalLink size={11} />
          {siteName}
        </a>
      </div>

      {/* Related entries */}
      {relatedEntries.length > 0 && (
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)',
            color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: 10,
          }}>
            Related
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {relatedEntries.map(rel => (
              <button
                key={rel.entry.name}
                onClick={() => onSelectRelated(rel.entry, rel.color, rel.categoryTitle)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  padding: '8px 12px', borderRadius: 8,
                  border: `1px solid ${rel.color}33`,
                  background: `${rel.color}08`,
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = rel.color + '66'
                  ;(e.currentTarget as HTMLButtonElement).style.background = rel.color + '15'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = rel.color + '33'
                  ;(e.currentTarget as HTMLButtonElement).style.background = rel.color + '08'
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  fontWeight: 700, color: rel.color,
                }}>
                  {rel.entry.name}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>
                  {rel.categoryTitle}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
