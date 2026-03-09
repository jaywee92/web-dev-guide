import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  from?: 'bottom' | 'top' | 'left' | 'right'
  delay?: number
  className?: string
}

const directionMap = {
  bottom: { y: 30, x: 0 },
  top: { y: -30, x: 0 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
}

export default function SlideIn({ children, from = 'bottom', delay = 0, className }: Props) {
  const initial = { opacity: 0, ...directionMap[from] }
  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
