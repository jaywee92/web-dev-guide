import { useNavigate, useLocation } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'

export default function NotFound() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <PageWrapper>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '60vh',
        fontFamily: 'var(--font-mono)', textAlign: 'center', gap: 16,
        padding: '0 24px',
      }}>
        <div style={{ fontSize: 56, fontWeight: 800, color: 'var(--text-faint)', lineHeight: 1 }}>
          404
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>
          Page not found
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-faint)', maxWidth: 360, lineHeight: 1.6 }}>
          <code style={{
            background: 'var(--surface)', padding: '2px 6px',
            borderRadius: 4, fontSize: 12, color: 'var(--text-muted)',
          }}>
            {location.pathname}
          </code>
          {' '}doesn't exist.
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '8px 18px', borderRadius: 7, cursor: 'pointer',
              background: 'var(--surface)', border: '1px solid var(--border)',
              color: 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-mono)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-faint)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            ← Go back
          </button>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '8px 18px', borderRadius: 7, cursor: 'pointer',
              background: '#4ade8018', border: '1px solid #4ade8055',
              color: '#4ade80', fontSize: 13, fontFamily: 'var(--font-mono)',
              fontWeight: 600, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#4ade8025' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#4ade8018' }}
          >
            Home
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}
