import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getCategoryById } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import PageWrapper from '@/components/layout/PageWrapper'
import TopicCard from '@/components/ui/TopicCard'
import StaggerChildren, { staggerItem } from '@/components/animations/primitives/StaggerChildren'

export default function CategoryPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const categoryId = location.pathname.slice(1)
  const category = getCategoryById(categoryId)
  const topics = TOPICS.filter(t => t.category === categoryId)

  if (!category) {
    return (
      <PageWrapper>
        <div style={{ padding: 40, color: 'var(--text-muted)' }}>Category not found.</div>
      </PageWrapper>
    )
  }

  const hasReference = categoryId === 'html' || categoryId === 'css'

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
        >
          <ArrowLeft size={16} /> All topics
        </button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 8,
            background: `${category.color}18`, border: `1px solid ${category.color}40`,
            marginBottom: 16,
          }}>
            <span style={{ color: category.color, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700 }}>
              {category.title}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 8, color: 'var(--text)' }}>
            {category.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: hasReference ? 24 : 48 }}>
            {category.description}
          </p>

          {hasReference && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
              <Link
                to={`/reference/${categoryId}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8,
                  background: `${category.color}12`, border: `1px solid ${category.color}33`,
                  color: category.color, fontSize: 12, fontFamily: 'var(--font-mono)',
                  textDecoration: 'none', fontWeight: 600,
                }}
              >
                <ExternalLink size={11} /> {category.title} Reference
              </Link>
            </div>
          )}
        </motion.div>

        <StaggerChildren style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {topics.map(topic => (
            <motion.div key={topic.id} variants={staggerItem}>
              <TopicCard topic={topic} />
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </PageWrapper>
  )
}
