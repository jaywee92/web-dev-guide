import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left'
import ExternalLink from 'lucide-react/dist/esm/icons/external-link'
import { Link } from 'react-router-dom'
import { getCategoryById } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import { LEVELS } from '@/data/levels'
import PageWrapper from '@/components/layout/PageWrapper'
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

  const hasReference = categoryId.startsWith('html-') || categoryId.startsWith('css-')

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-4"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
        >
          <ArrowLeft size={16} /> All topics
        </button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', marginBottom: 14 }}>
            Docs / <span style={{ color: category.color }}>{category.title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, margin: 0, color: 'var(--text)' }}>
              {category.title}
            </h1>
            <span style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 4,
              background: `${category.color}14`, border: `1px solid ${category.color}30`,
              color: category.color, fontFamily: 'var(--font-mono)',
            }}>
              {topics.length} Topics
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', marginBottom: hasReference ? 20 : 36, fontSize: 14 }}>
            {category.description}
          </p>

          {hasReference && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 36 }}>
              <Link
                to={categoryId.startsWith('html-') ? '/reference/html' : '/reference/css'}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8,
                  background: `${category.color}12`, border: `1px solid ${category.color}33`,
                  color: category.color, fontSize: 12, fontFamily: 'var(--font-mono)',
                  textDecoration: 'none', fontWeight: 600,
                }}
              >
                <ExternalLink size={11} /> {categoryId.startsWith('html-') ? 'HTML' : 'CSS'} Reference
              </Link>
            </div>
          )}
        </motion.div>

        {/* Numbered reference cards */}
        <StaggerChildren style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {topics.map((topic, i) => {
            const level = LEVELS.find(l => l.id === topic.level)
            const hasPlayground = topic.playgroundType !== 'none'
            const hasCheatSheet = !!topic.cheatSheet

            return (
              <motion.div
                key={topic.id}
                variants={staggerItem}
                onClick={() => navigate(`/topic/${topic.id}`)}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '14px 18px',
                  display: 'flex',
                  gap: 16,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                whileHover={{ borderColor: `${category.color}60` } as never}
              >
                {/* Number badge */}
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: `${category.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: category.color,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                      {topic.title}
                    </span>
                    {level && (
                      <span style={{
                        fontSize: 9, padding: '1px 6px', borderRadius: 3,
                        background: 'var(--surface-bright)', border: '1px solid var(--border)',
                        color: 'var(--text-faint)', fontFamily: 'var(--font-mono)',
                      }}>
                        Level {level.id}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 8px', lineHeight: 1.5 }}>
                    {topic.description}
                  </p>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <span style={{
                      fontSize: 9, padding: '1px 7px', borderRadius: 3,
                      background: 'var(--surface-bright)', border: '1px solid var(--border)',
                      color: 'var(--text-faint)', fontFamily: 'var(--font-mono)',
                    }}>Viz</span>
                    {hasPlayground && (
                      <span style={{
                        fontSize: 9, padding: '1px 7px', borderRadius: 3,
                        background: 'var(--surface-bright)', border: '1px solid var(--border)',
                        color: 'var(--text-faint)', fontFamily: 'var(--font-mono)',
                      }}>Playground</span>
                    )}
                    {hasCheatSheet && (
                      <span style={{
                        fontSize: 9, padding: '1px 7px', borderRadius: 3,
                        background: 'var(--surface-bright)', border: '1px solid var(--border)',
                        color: 'var(--text-faint)', fontFamily: 'var(--font-mono)',
                      }}>Cheat Sheet</span>
                    )}
                  </div>
                </div>

                <div style={{ alignSelf: 'center', color: 'var(--text-faint)', fontSize: 16 }}>→</div>
              </motion.div>
            )
          })}
        </StaggerChildren>
      </div>
    </PageWrapper>
  )
}
