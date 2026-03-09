import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Topic } from '@/types'

interface Props { topic: Topic }

export default function TopicCard({ topic }: Props) {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/topic/${topic.id}`)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2, background: topic.color, transformOrigin: 'left',
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 0%, ${topic.color}12 0%, transparent 70%)`,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
          {topic.title}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
          {topic.description}
        </p>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={12} /> {topic.estimatedMinutes} min
          </span>
          <motion.span
            whileHover={{ x: 4 }}
            style={{ color: topic.color, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
          >
            Explore <ArrowRight size={14} />
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
