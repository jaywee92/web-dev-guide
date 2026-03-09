import { Link } from 'react-router-dom'
import { Search, Sun, Moon, Code2 } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useEffect } from 'react'

export default function Navbar() {
  const { theme, toggleTheme, setSearchOpen } = useAppStore()

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
