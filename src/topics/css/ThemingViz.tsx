import { motion, AnimatePresence } from 'framer-motion'

interface Props { step: number; compact?: boolean }

const themes = [
  { name: 'Dark', bg: '#0f1117', surface: '#1a1d2e', text: '#e2e8f0', accent: '#5b9cf5', border: '#2a2d3e' },
  { name: 'Light', bg: '#f8fafc', surface: '#ffffff', text: '#1a1d2e', accent: '#2563eb', border: '#e2e8f0' },
  { name: 'Warm', bg: '#1c1410', surface: '#2a1f15', text: '#f5e6d3', accent: '#f59e0b', border: '#3d2f1f' },
]

const variables = ['--color-bg', '--color-surface', '--color-text', '--color-accent']

export default function ThemingViz({ step, compact = false }: Props) {
  const theme = themes[Math.min(step, themes.length - 1)]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Theme switcher tabs */}
      <div style={{ display: 'flex', gap: 6 }}>
        {themes.map((t, i) => (
          <motion.span
            key={t.name}
            animate={{ opacity: step === i ? 1 : 0.4, scale: step === i ? 1 : 0.95 }}
            style={{
              fontSize: 11, fontFamily: 'var(--font-mono)', padding: '2px 8px',
              borderRadius: 4, background: step === i ? t.accent : 'var(--surface-bright)',
              color: step === i ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            {t.name}
          </motion.span>
        ))}
      </div>

      {/* Mini UI preview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          style={{
            width: compact ? 180 : 260, borderRadius: 10,
            background: theme.bg, border: `1px solid ${theme.border}`,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: compact ? '6px 10px' : '8px 14px', background: theme.surface, borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: theme.accent }} />
            <span style={{ fontSize: compact ? 10 : 12, color: theme.text, fontWeight: 600 }}>My App</span>
          </div>
          <div style={{ padding: compact ? 8 : 12 }}>
            <div style={{ fontSize: compact ? 10 : 11, color: theme.text, marginBottom: 8, opacity: 0.9 }}>Welcome back!</div>
            <div style={{ height: compact ? 22 : 28, borderRadius: 4, background: theme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: compact ? 9 : 11, color: '#fff', fontWeight: 600 }}>Sign in</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CSS variable hint */}
      <div style={{ fontSize: 9, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
        {variables.slice(0, compact ? 2 : 4).map(v => (
          <span key={v} style={{ display: 'block' }}>{v}</span>
        ))}
      </div>
    </div>
  )
}
