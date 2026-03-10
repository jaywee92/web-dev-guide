import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Animated background orbs */}
      {[
        { color: '#4ade80', size: 500, top: '-150px', left: '-100px', delay: 0 },
        { color: '#5b9cf5', size: 400, top: '40%', right: '-150px', delay: -7 },
        { color: '#a78bfa', size: 350, bottom: '-100px', left: '30%', delay: -14 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: orb.size, height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            filter: 'blur(120px)',
            opacity: 0.07,
            top: (orb as { top?: string }).top,
            left: (orb as { left?: string }).left,
            right: (orb as { right?: string }).right,
            bottom: (orb as { bottom?: string }).bottom,
            pointerEvents: 'none',
          }}
          animate={{
            x: [0, 60, -40, 60, 0],
            y: [0, -50, 70, 30, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 20 + i * 4, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 99,
            background: 'rgba(74,222,128,0.1)',
            border: '1px solid rgba(74,222,128,0.3)',
            color: '#4ade80',
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            marginBottom: 24,
          }}
        >
          Learning by Animation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            background: 'linear-gradient(135deg, var(--text) 0%, var(--text-muted) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Web Dev
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #4ade80, #5b9cf5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Visual Guide
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 48px' }}
        >
          Complex concepts. Simple animations.
          From HTML to PostgreSQL — watch it work, then build it yourself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ color: 'var(--text-muted)' }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
