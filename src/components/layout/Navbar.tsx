import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Sun, Moon, Code2, BookOpen, ChevronDown } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useEffect, useState, useRef } from 'react'

export default function Navbar() {
  const { theme, toggleTheme, setSearchOpen } = useAppStore()
  const [refOpen, setRefOpen] = useState(false)
  const refRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setSearchOpen])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (refRef.current && !refRef.current.contains(e.target as Node)) {
        setRefOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setRefOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Close dropdown on navigation
  useEffect(() => { setRefOpen(false) }, [location.pathname])

  const goRef = (path: string) => { navigate(path); setRefOpen(false) }

  const isHome = location.pathname === '/'

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: theme === 'dark'
        ? 'rgba(10, 12, 20, 0.82)'
        : 'rgba(248, 249, 252, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>

      {/* Logo */}
      <Link
        to="/"
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', color: 'var(--text)',
          fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
          letterSpacing: '-0.01em',
        }}
      >
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'rgba(74,222,128,0.12)',
          border: '1px solid rgba(74,222,128,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Code2 size={15} color="var(--green)" />
        </div>
        <span style={{ color: 'var(--green)' }}>web-dev</span>
        <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>guide</span>
      </Link>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

        {/* Reference dropdown */}
        <div ref={refRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setRefOpen(o => !o)}
            aria-expanded={refOpen}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 10px', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
              background: refOpen ? 'var(--surface-bright)' : 'var(--surface)',
              border: `1px solid ${refOpen ? 'var(--blue)' : 'var(--border)'}`,
              color: refOpen ? 'var(--blue)' : 'var(--text-muted)',
              transition: 'border-color 0.15s, color 0.15s, background 0.15s',
              letterSpacing: '0.04em',
            }}
            onMouseEnter={e => {
              if (!refOpen) {
                e.currentTarget.style.borderColor = 'var(--blue)'
                e.currentTarget.style.color = 'var(--blue)'
              }
            }}
            onMouseLeave={e => {
              if (!refOpen) {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-muted)'
              }
            }}
          >
            <BookOpen size={12} />
            <span>REFERENCE</span>
            <ChevronDown
              size={11}
              style={{ transform: refOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            />
          </button>

          {refOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: 5,
              minWidth: 180,
              boxShadow: theme === 'dark'
                ? '0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)'
                : '0 12px 40px rgba(0,0,0,0.12)',
              zIndex: 60,
            }}>
              {[
                { label: 'HTML Reference', path: '/reference/html', color: '#4ade80' },
                { label: 'CSS Reference',  path: '/reference/css',  color: '#5b9cf5' },
              ].map(item => (
                <button
                  key={item.path}
                  onClick={() => goRef(item.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '8px 10px',
                    background: 'none', border: 'none', borderRadius: 7,
                    color: 'var(--text)', fontFamily: 'var(--font-mono)',
                    fontSize: 12, cursor: 'pointer', textAlign: 'left',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-bright)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                >
                  <div style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: item.color, flexShrink: 0,
                    boxShadow: `0 0 6px ${item.color}80`,
                  }} />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 10px', borderRadius: 8, cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            transition: 'border-color 0.15s, color 0.15s',
            minWidth: isHome ? 44 : 130,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--purple)'
            e.currentTarget.style.color = 'var(--text)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-muted)'
          }}
        >
          <Search size={12} />
          {!isHome && <span style={{ flex: 1, color: 'var(--text-faint)' }}>Search topics…</span>}
          <kbd style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            color: 'var(--text-faint)',
            background: 'var(--surface-bright)',
            border: '1px solid var(--border)',
            borderRadius: 4, padding: '1px 4px',
            lineHeight: 1.5,
          }}>⌘K</kbd>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            width: 34, height: 34, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'border-color 0.15s, color 0.15s, background 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--yellow)'
            e.currentTarget.style.color = 'var(--yellow)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-muted)'
          }}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </nav>
  )
}
