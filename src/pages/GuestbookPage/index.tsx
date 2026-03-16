import { useTranslation } from 'react-i18next'
import { useGuestbook } from '@/hooks/useGuestbook'

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d > 0) return `${d}d ago`
  if (h > 0) return `${h}h ago`
  if (m > 0) return `${m}m ago`
  return 'just now'
}

export default function GuestbookPage() {
  const { t } = useTranslation('guestbook')
  const { entries, loading } = useGuestbook()

  return (
    <div style={{ padding: '48px 24px', maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 6 }}>
        {t('pageTitle')}
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 36, lineHeight: 1.6 }}>
        {t('pageSubtitle')}
      </p>

      <div style={{ display: 'flex', gap: 7, marginBottom: 20, flexWrap: 'wrap' }}>
        {[t('allEntries'), t('newestFirst'), '1 / 24H'].map(label => (
          <span key={label} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 20, letterSpacing: '0.04em', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', color: 'var(--purple)' }}>
            {label}
          </span>
        ))}
      </div>

      {loading && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>Loading...</p>
      )}
      {!loading && entries.length === 0 && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>{t('emptyState')}</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map(entry => (
          <div
            key={entry.id}
            style={{ display: 'flex', gap: 13, alignItems: 'flex-start', padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{entry.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ marginBottom: 3 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--purple)', letterSpacing: '0.02em' }}>
                  {entry.name.toUpperCase()}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)', marginLeft: 8 }}>
                  {timeAgo(entry.created_at)}
                </span>
              </div>
              <div style={{ color: 'var(--text-muted)', lineHeight: 1.55, fontSize: 13 }}>
                {entry.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
