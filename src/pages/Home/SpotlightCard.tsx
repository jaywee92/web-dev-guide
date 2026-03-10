import { useRef, type ReactNode, type CSSProperties } from 'react'

interface Props {
  children: ReactNode
  color?: string
  style?: CSSProperties
  onClick?: () => void
}

export default function SpotlightCard({ children, color = '#ffffff', style, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--x', `${x}px`)
    card.style.setProperty('--y', `${y}px`)
    card.style.setProperty('--opacity', '1')
  }

  const handleMouseLeave = () => {
    const card = ref.current
    if (!card) return
    card.style.setProperty('--opacity', '0')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        '--x': '50%',
        '--y': '50%',
        '--opacity': '0',
        ...style,
      } as CSSProperties}
    >
      {/* Spotlight overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(300px circle at var(--x) var(--y), ${color}22, transparent 70%)`,
          opacity: 'var(--opacity)' as unknown as number,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
