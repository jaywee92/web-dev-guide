import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  color?: string
  active?: boolean
  className?: string
}

export default function GlowPulse({ children, color = '#4ade80', active = true, className }: Props) {
  return (
    <motion.div
      animate={active ? {
        boxShadow: [
          `0 0 0px ${color}00`,
          `0 0 20px ${color}66`,
          `0 0 40px ${color}33`,
          `0 0 20px ${color}66`,
          `0 0 0px ${color}00`,
        ],
      } : { boxShadow: 'none' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
