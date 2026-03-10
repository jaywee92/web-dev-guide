import { useState, useCallback, type ReactNode, type MouseEvent } from 'react'

let _nextId = 0

interface Spark {
  id: number
  x: number
  y: number
  angle: number
}

interface Props {
  children: ReactNode
  color?: string
}

export default function ClickSpark({ children, color = '#ffffff' }: Props) {
  const [sparks, setSparks] = useState<Spark[]>([])

  const handleClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = _nextId
    _nextId += 8
    const newSparks = Array.from({ length: 8 }, (_, i) => ({
      id: id + i,
      x,
      y,
      angle: (i * 360) / 8,
    }))
    setSparks(prev => [...prev, ...newSparks])
    setTimeout(() => setSparks(prev => prev.filter(s => s.id < id || s.id >= id + 8)), 500)
  }, [])

  return (
    <span style={{ position: 'relative', display: 'inline-block' }} onClick={handleClick}>
      {children}
      <svg
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
        width="100%"
        height="100%"
      >
        {sparks.map(spark => {
          const rad = (spark.angle * Math.PI) / 180
          const x2 = spark.x + Math.cos(rad) * 20
          const y2 = spark.y + Math.sin(rad) * 20
          return (
            <line
              key={spark.id}
              x1={spark.x}
              y1={spark.y}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
              style={{
                animation: 'spark-fade 0.4s ease-out forwards',
              }}
            />
          )
        })}
      </svg>
    </span>
  )
}
