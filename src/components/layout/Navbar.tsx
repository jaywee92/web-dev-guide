import { Link, useNavigate } from 'react-router-dom'
import { Search, Sun, Moon, Code2, BookOpen, ChevronDown } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useEffect, useState, useRef } from 'react'

export default function Navbar() {
  const { theme, toggleTheme, setSearchOpen } = useAppStore()
  const [refOpen, setRefOpen] = useState(false)
  const refRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Cmd+K to open search
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

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (refRef.current && !refRef.current.contains(e.target as Node)) {
        setRefOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const goRef = (path: string) => {
    navigate(path)
    setRefOpen(false)
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b flex items-center justify-between px-6 h-14"
      style={{
        background: 'rgba(15,17,23,0.8)',
        backdropFilter: 'blur(20px)',
        borderColor: 'var(--border)',
      }}
    >
      <Link to="/" className="flex items-center gap-2 font-semibold" style={{ color: 'var(--text)', textDecoration: 'none' }}>
        <Code2 size={20} style={{ color: 'var(--green)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>web-dev-guide</span>
      </Link>

      <div className="flex items-center gap-2">
        {/* Reference dropdown */}
        <div ref={refRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setRefOpen(o => !o)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
            style={{
              background: refOpen ? 'var(--surface-bright)' : 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            <BookOpen size={13} />
            <span>Reference</span>
            <ChevronDown size={12} style={{ transform: refOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          {refOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: 6,
                minWidth: 160,
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                zIndex: 60,
              }}
            >
              {[
                { label: 'HTML Reference', path: '/reference/html', color: '#4ade80' },
                { label: 'CSS Reference', path: '/reference/css', color: '#5b9cf5' },
              ].map(item => (
                <button
                  key={item.path}
                  onClick={() => goRef(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '8px 10px',
                    background: 'none',
                    border: 'none',
                    borderRadius: 6,
                    color: 'var(--text)',
                    fontSize: 13,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-bright)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <Search size={14} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>⌘K</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-all"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  )
}
