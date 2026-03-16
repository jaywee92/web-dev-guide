import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SubmitPayload, UseGuestbookResult } from '@/hooks/useGuestbook'

interface Props {
  onClose: () => void
  hook: UseGuestbookResult
}

export default function GuestbookPanel({ onClose, hook }: Props) {
  const { t } = useTranslation('guestbook')
  const { entries, loading, submitting, error, canSubmit, msUntilNextSubmit, submit } = hook

  const nameRef = useRef<HTMLInputElement>(null)
  const emojiRef = useRef<HTMLInputElement>(null)
  const msgRef  = useRef<HTMLTextAreaElement>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  const waitText = (() => {
    if (canSubmit) return null
    const h = Math.floor(msUntilNextSubmit / 3_600_000)
    const m = Math.floor((msUntilNextSubmit % 3_600_000) / 60_000)
    return t('rateLimitWait', { h, m })
  })()

  async function handleSubmit() {
    const name    = nameRef.current?.value.trim() ?? ''
    const emoji   = emojiRef.current?.value.trim() || '✨'
    const message = msgRef.current?.value.trim() ?? ''

    if (!name || !message) { setLocalError('Name and message are required.'); return }
    setLocalError(null)

    const payload: SubmitPayload = { name, emoji, message }
    const ok = await submit(payload)
    if (ok) {
      if (nameRef.current)  nameRef.current.value  = ''
      if (emojiRef.current) emojiRef.current.value = ''
      if (msgRef.current)   msgRef.current.value   = ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.91 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{    opacity: 0, y: 14, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      style={{
        position: 'absolute',
        bottom: 84,
        right: 16,
        width: 308,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 12px 40px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        zIndex: 10,
        transformOrigin: 'bottom right',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '12px 14px 10px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.04em' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          {t('panelTitle')}
          {!loading && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 20, background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', color: 'var(--purple)' }}>
              {entries.length}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--surface-bright)', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.15s, color 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--text)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
        >✕</button>
      </div>

      {/* Entries */}
      <div style={{ maxHeight: 138, overflowY: 'auto', padding: '8px 12px 4px', scrollbarWidth: 'thin', scrollbarColor: 'var(--border) transparent' }}>
        {loading && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', padding: '8px 0' }}>Loading...</p>}
        {!loading && entries.length === 0 && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', padding: '8px 0' }}>{t('emptyState')}</p>
        )}
        {entries.map(e => (
          <div key={e.id} style={{ display: 'flex', gap: 9, padding: '8px 0', borderBottom: '1px solid rgba(46,51,72,0.4)', fontSize: 12 }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.4 }}>{e.emoji}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--purple)', marginBottom: 2, letterSpacing: '0.02em' }}>{e.name.toUpperCase()}</div>
              <div style={{ color: 'var(--text-muted)', lineHeight: 1.45 }}>{e.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ padding: '10px 12px 12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            ref={nameRef}
            placeholder={t('namePlaceholder')}
            maxLength={40}
            style={{ flex: 1, background: 'var(--surface-bright)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', color: 'var(--text)', fontSize: 12, fontFamily: 'var(--font-mono)', outline: 'none' }}
            onFocus={e => (e.target.style.borderColor = 'var(--purple)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
          />
          <input
            ref={emojiRef}
            placeholder={t('emojiPlaceholder')}
            maxLength={4}
            style={{ width: 42, flexShrink: 0, background: 'var(--surface-bright)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 4px', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-mono)', outline: 'none', textAlign: 'center' }}
            onFocus={e => (e.target.style.borderColor = 'var(--purple)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
        <textarea
          ref={msgRef}
          placeholder={t('messagePlaceholder')}
          maxLength={280}
          style={{ background: 'var(--surface-bright)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', color: 'var(--text)', fontSize: 12, fontFamily: 'var(--font-mono)', outline: 'none', resize: 'none', height: 56, lineHeight: 1.45 }}
          onFocus={e => (e.target.style.borderColor = 'var(--purple)')}
          onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
        />
        {(localError || error) && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#f87171' }}>{localError ?? t('errorSubmit')}</p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)', letterSpacing: '0.02em' }}>
            {waitText ?? t('rateLimit')}
          </span>
          <button
            onClick={handleSubmit}
            disabled={submitting || !canSubmit}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 7, background: 'var(--surface-bright)', border: '1px solid var(--border)', color: canSubmit ? 'var(--text-muted)' : 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, cursor: canSubmit ? 'pointer' : 'not-allowed', letterSpacing: '0.04em', transition: 'border-color 0.15s, color 0.15s', opacity: submitting ? 0.6 : 1 }}
            onMouseEnter={e => { if (canSubmit) { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--purple)' } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = canSubmit ? 'var(--text-muted)' : 'var(--text-faint)' }}
          >
            <Send size={11} />
            {submitting ? '...' : t('sendButton')}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
