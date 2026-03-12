import { motion, AnimatePresence } from 'framer-motion'
import Clock from 'lucide-react/dist/esm/icons/clock'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback, type ComponentType } from 'react'
import { preloadAnimation, getAnimationComponent } from '@/topics/registry'
import type { Topic } from '@/types'

interface Props { topic: Topic }

export default function TopicCard({ topic }: Props) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const [AnimComp, setAnimComp] = useState<ComponentType<{ step: number; compact?: boolean }> | null>(null)
  const [previewStep, setPreviewStep] = useState(0)

  const handleMouseEnter = useCallback(async () => {
    setHovered(true)
    setPreviewStep(0)
    await preloadAnimation(topic.animationComponent)
    setAnimComp(() => getAnimationComponent(topic.animationComponent))
  }, [topic.animationComponent])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    setPreviewStep(0)
  }, [])

  // Auto-play steps 0 → 1 → 2 while hovered
  useEffect(() => {
    if (!hovered || !AnimComp) return
    setPreviewStep(0)
    const t1 = setTimeout(() => setPreviewStep(1), 1600)
    const t2 = setTimeout(() => setPreviewStep(2), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [hovered, AnimComp])

  return (
    <motion.div
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
      onClick={() => navigate(`/topic/${topic.id}`)}
      animate={{ scale: hovered ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? topic.color + '55' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: '20px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Top accent line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2, background: topic.color, transformOrigin: 'left',
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 0%, ${topic.color}12 0%, transparent 70%)`,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
          {topic.title}
        </h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
          {topic.description}
        </p>

        {/* Live preview — expands on hover */}
        <AnimatePresence>
          {hovered && AnimComp && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 160, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{
                overflow: 'hidden',
                marginBottom: 14,
                borderRadius: 8,
                background: 'var(--surface-bright)',
                border: `1px solid ${topic.color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
              }}
            >
              <AnimComp step={previewStep} compact />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={12} /> {topic.estimatedMinutes} min
          </span>
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            style={{ color: topic.color, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
          >
            Explore <ArrowRight size={14} />
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
