import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import ShinyText from './ShinyText'

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">

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
          style={{ fontSize: 18, maxWidth: 520, margin: '0 auto 48px' }}
        >
          <ShinyText speed={4}>
            {'Complex concepts. Simple animations. From HTML to PostgreSQL — watch it work, then build it yourself.'}
          </ShinyText>
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
