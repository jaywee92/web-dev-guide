import { motion } from 'framer-motion'

interface Props {
  x1: number; y1: number
  x2: number; y2: number
  color?: string
  delay?: number
  width?: number
  height?: number
}

export default function AnimatedArrow({
  x1, y1, x2, y2,
  color = '#5b9cf5',
  delay = 0,
  width = 200,
  height = 60,
}: Props) {
  const pathD = `M ${x1} ${y1} L ${x2} ${y2}`
  const arrowId = `arrow-${x1}-${y1}-${x2}-${y2}`

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <marker id={arrowId} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={color} />
        </marker>
      </defs>
      <motion.path
        d={pathD}
        stroke={color}
        strokeWidth={2}
        fill="none"
        markerEnd={`url(#${arrowId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: 'easeInOut' }}
      />
    </svg>
  )
}
