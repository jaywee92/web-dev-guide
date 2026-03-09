import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LEVELS } from '@/data/levels'
import { TOPICS } from '@/data/topics'
import TopicCard from '@/components/ui/TopicCard'
import LevelBadge from '@/components/ui/LevelBadge'

export default function LevelGrid() {
  const navigate = useNavigate()

  return (
    <section className="px-6 pb-24 max-w-6xl mx-auto">
      {LEVELS.map((level, li) => {
        const topics = TOPICS.filter(t => t.level === level.id)
        return (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: li * 0.1 }}
            style={{ marginBottom: 64 }}
          >
            {/* Level header */}
            <div
              className="flex items-center justify-between mb-6 pb-4"
              style={{ borderBottom: `1px solid ${level.color}33` }}
            >
              <div>
                <LevelBadge level={level.id} color={level.color} title={level.title} />
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 6 }}>
                  {level.subtitle}
                </p>
              </div>
              <button
                onClick={() => navigate(`/level/${level.id}`)}
                style={{
                  fontSize: 12, color: level.color,
                  fontFamily: 'var(--font-mono)',
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                View all →
              </button>
            </div>

            {/* Topic cards grid */}
            {topics.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {topics.map(topic => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-faint)', fontSize: 13, fontStyle: 'italic' }}>
                Topics coming soon…
              </p>
            )}
          </motion.div>
        )
      })}
    </section>
  )
}
