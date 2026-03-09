interface Props {
  level: number
  color: string
  title: string
  size?: 'sm' | 'md'
}

export default function LevelBadge({ level, color, title, size = 'md' }: Props) {
  const padding = size === 'sm' ? '2px 8px' : '4px 12px'
  const fontSize = size === 'sm' ? 10 : 11
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding,
        fontSize,
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        borderRadius: 6,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        color,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      Level {level} · {title}
    </span>
  )
}
