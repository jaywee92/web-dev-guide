import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left'
import ExternalLink from 'lucide-react/dist/esm/icons/external-link'
import { motion } from 'framer-motion'
import { LEVELS } from '@/data/levels'
import { TOPICS } from '@/data/topics'
import PageWrapper from '@/components/layout/PageWrapper'
import TopicCard from '@/components/ui/TopicCard'
import LevelBadge from '@/components/ui/LevelBadge'
import StaggerChildren, { staggerItem } from '@/components/animations/primitives/StaggerChildren'

export default function LevelOverview() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const level = LEVELS.find(l => l.id === Number(levelId))
  const topics = TOPICS.filter(t => t.level === Number(levelId))

  if (!level) return <div style={{ padding: 40, color: 'var(--text-muted)' }}>Level not found.</div>

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
        >
          <ArrowLeft size={16} /> Back to overview
        </button>

        <LevelBadge level={level.id} color={level.color} title={level.title} />
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
          marginTop: 16, marginBottom: 8, color: 'var(--text)',
        }}>
          {level.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 48 }}>{level.subtitle}</p>

        {level.id === 1 && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
            {[
              { label: 'HTML Reference', path: '/reference/html', color: '#4ade80' },
              { label: 'CSS Reference', path: '/reference/css', color: '#5b9cf5' },
            ].map(ref => (
              <Link
                key={ref.path}
                to={ref.path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 8,
                  background: `${ref.color}12`,
                  border: `1px solid ${ref.color}33`,
                  color: ref.color,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                <ExternalLink size={11} />
                {ref.label}
              </Link>
            ))}
          </div>
        )}

        <StaggerChildren>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {topics.map(topic => (
              <motion.div key={topic.id} variants={staggerItem}>
                <TopicCard topic={topic} />
              </motion.div>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </PageWrapper>
  )
}
