import { useState, type ComponentType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import X from 'lucide-react/dist/esm/icons/x'
import AnimationControls from '@/components/ui/AnimationControls'
import { useAnimationStep } from '@/hooks/useAnimationStep'

interface Props {
  AnimComp: ComponentType<{ step: number; compact?: boolean }> | null
}

export default function IntroAnimation({ AnimComp }: Props) {
  const [skipped, setSkipped] = useState(false)
  const ctrl = useAnimationStep({ totalSteps: 5, autoPlay: true, stepDuration: 1800 })

  if (skipped) return null

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          marginBottom: 64,
          overflow: 'hidden',
        }}
      >
        {/* Skip button */}
        <button
          onClick={() => setSkipped(true)}
          style={{
            position: 'absolute', top: 16, right: 16,
            color: 'var(--text-muted)', background: 'none',
            border: '1px solid var(--border)', borderRadius: 8,
            padding: '6px 12px', fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
          }}
        >
          <X size={12} /> Skip intro
        </button>

        {/* Animation component */}
        <div style={{ width: '100%', maxWidth: 800 }}>
          {AnimComp ? <AnimComp step={ctrl.step} /> : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
              Animation coming soon…
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={{ marginTop: 32 }}>
          <AnimationControls
            isPlaying={ctrl.isPlaying}
            step={ctrl.step}
            totalSteps={5}
            onPlay={ctrl.play}
            onPause={ctrl.pause}
            onRestart={ctrl.restart}
            onPrev={ctrl.prev}
            onNext={ctrl.next}
          />
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
