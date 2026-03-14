import { motion } from 'framer-motion'
import type { ComponentType, CSSProperties } from 'react'
import type { Topic } from '@/types'

interface Props {
  topic: Topic
  BannerComp: ComponentType<Record<string, never>> | null
}

export default function TopicBanner({ topic, BannerComp }: Props) {
  const wrapperStyle: CSSProperties = {
    borderRadius: 12,
    overflow: 'hidden',
    margin: '8px 0 36px',
    border: `1px solid ${topic.color}20`,
    boxShadow: `0 0 40px ${topic.color}08`,
  }

  if (!BannerComp) {
    return (
      <div style={{
        ...wrapperStyle,
        height: 220,
        background: `linear-gradient(135deg, ${topic.color}14, ${topic.color}04)`,
      }} />
    )
  }

  return (
    <motion.div
      style={wrapperStyle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
    >
      <BannerComp />
    </motion.div>
  )
}
