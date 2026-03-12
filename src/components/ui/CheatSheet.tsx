import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Copy from 'lucide-react/dist/esm/icons/copy'
import Check from 'lucide-react/dist/esm/icons/check'
import type { CheatSheet as CheatSheetType } from '@/types'

interface Props {
  data: CheatSheetType
  color: string
}

type Tab = 'syntax' | 'patterns' | 'gotchas'

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button
      onClick={copy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: copied ? '#4ade80' : 'var(--text-faint)',
        padding: '2px 4px', borderRadius: 4, transition: 'color 0.15s',
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )
}

function CodeSnippet({ code, language = 'code' }: { code: string; language?: string }) {
  return (
    <div style={{
      position: 'relative',
      background: '#0d1117',
      borderRadius: 8,
      padding: '12px 40px 12px 16px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      lineHeight: 1.7,
      color: '#e2e8f0',
      overflowX: 'auto',
    }}>
      <div style={{ position: 'absolute', top: 8, right: 8 }}>
        <CopyButton code={code} />
      </div>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{code}</pre>
      <div style={{ fontSize: 10, color: '#475569', marginTop: 4, fontFamily: 'sans-serif' }}>
        {language}
      </div>
    </div>
  )
}

export default function CheatSheet({ data, color }: Props) {
  const hasSyntax = (data.syntax?.length ?? 0) > 0
  const hasPatterns = (data.patterns?.length ?? 0) > 0
  const hasGotchas = (data.commonMistakes?.length ?? 0) > 0 || !!data.whenToUse

  const availableTabs: Tab[] = [
    ...(hasSyntax ? ['syntax' as Tab] : []),
    ...(hasPatterns ? ['patterns' as Tab] : []),
    ...(hasGotchas ? ['gotchas' as Tab] : []),
  ]

  const [activeTab, setActiveTab] = useState<Tab>(availableTabs[0] ?? 'syntax')

  if (availableTabs.length === 0) return null

  return (
    <div style={{ borderRadius: 16, border: `1px solid ${color}33`, overflow: 'hidden', marginBottom: 40 }}>
      {/* Header + tabs */}
      <div style={{ padding: '16px 24px 0', background: `${color}0a`, borderBottom: '1px solid var(--border)' }}>
        <div style={{
          fontSize: 11, color, fontFamily: 'var(--font-mono)',
          fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 12,
        }}>
          Cheat Sheet
        </div>
        <div role="tablist" style={{ display: 'flex', gap: 4 }}>
          {availableTabs.map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px', borderRadius: '8px 8px 0 0',
                border: 'none', cursor: 'pointer',
                background: activeTab === tab ? 'var(--surface)' : 'transparent',
                color: activeTab === tab ? 'var(--text)' : 'var(--text-muted)',
                fontSize: 12, fontWeight: activeTab === tab ? 600 : 400,
                borderBottom: activeTab === tab ? `2px solid ${color}` : '2px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              {tab === 'syntax' ? 'Syntax' : tab === 'patterns' ? 'Patterns' : 'Gotchas'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding: '20px 24px', background: 'var(--surface)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'syntax' && data.syntax && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {data.syntax.map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, alignItems: 'start' }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                        {item.label}
                      </div>
                      {item.note && (
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>
                          {item.note}
                        </div>
                      )}
                    </div>
                    <CodeSnippet code={item.code} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'patterns' && data.patterns && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {data.patterns.map((p, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{p.title}</div>
                    <CodeSnippet code={p.code} language={p.language} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'gotchas' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {data.whenToUse && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: 'var(--font-mono)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      When to use
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                      {data.whenToUse}
                    </p>
                  </div>
                )}
                {data.commonMistakes && data.commonMistakes.length > 0 && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#f87171', fontFamily: 'var(--font-mono)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      Common mistakes
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {data.commonMistakes.map((m, i) => (
                        <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                          <span style={{ color: '#f87171', fontWeight: 700, flexShrink: 0 }}>✕</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
