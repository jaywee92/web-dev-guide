import { motion } from 'framer-motion'
import type { ReferenceCategory } from '@/types'
import ReferenceCard from './ReferenceCard'

interface Props {
  category: ReferenceCategory
  id: string
}

export default function CategorySection({ category, id }: Props) {
  return (
    <section id={id} style={{ marginBottom: 64 }}>
      {/* Category header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 24,
          paddingBottom: 12,
          borderBottom: `1px solid ${category.color}33`,
        }}
      >
        <div
          style={{
            width: 4,
            height: 20,
            borderRadius: 2,
            background: category.color,
            flexShrink: 0,
          }}
        />
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--text)',
          }}
        >
          {category.title}
        </h2>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-faint)',
            background: 'var(--surface-bright)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: '2px 8px',
          }}
        >
          {category.entries.length}
        </span>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}
      >
        {category.entries.map((entry, i) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <ReferenceCard entry={entry} accentColor={category.color} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
