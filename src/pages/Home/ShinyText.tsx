import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  speed?: number   // animation duration in seconds, default 3
}

export default function ShinyText({ children, speed = 3 }: Props) {
  return (
    <span
      style={{
        display: 'inline-block',
        backgroundImage: 'linear-gradient(120deg, var(--text-muted) 40%, var(--text) 50%, var(--text-muted) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: `shiny-sweep ${speed}s linear infinite`,
      }}
    >
      {children}
    </span>
  )
}
