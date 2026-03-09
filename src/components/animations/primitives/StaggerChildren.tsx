import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

const container = (stagger: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function StaggerChildren({ children, staggerDelay = 0.1, className }: Props) {
  return (
    <motion.div
      variants={container(staggerDelay)}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  )
}
