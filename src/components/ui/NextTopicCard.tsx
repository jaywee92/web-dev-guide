import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Topic } from '@/types'

interface Props { topic: Topic }

export default function NextTopicCard({ topic }: Props) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      style={{
        marginTop: 64,
        padding: '28px 32px',
        borderRadius: 'var(--radius)',
        border: `1px solid ${topic.color}33`,
        background: `linear-gradient(135deg, ${topic.color}08 0%, transparent 60%)`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}
      whileHover={{ borderColor: topic.color + '66', scale: 1.01 }}
      onClick={() => navigate(`/topic/${topic.id}`)}
    >
      <div>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginBottom: 6 }}>
          Up next
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          {topic.title}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock size={12} /> {topic.estimatedMinutes} min
        </div>
      </div>
      <motion.div
        whileHover={{ x: 4 }}
        style={{ color: topic.color, flexShrink: 0 }}
      >
        <ArrowRight size={24} />
      </motion.div>
    </motion.div>
  )
}
