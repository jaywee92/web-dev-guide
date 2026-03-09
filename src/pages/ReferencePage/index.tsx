import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { HTML_REFERENCE } from '@/data/htmlReference'
import { CSS_REFERENCE } from '@/data/cssReference'
import PageWrapper from '@/components/layout/PageWrapper'
import CategorySection from './CategorySection'

interface Props {
  type: 'html' | 'css'
}

const META = {
  html: {
    title: 'HTML Reference',
    subtitle: 'Essential elements organized by category',
    siteUrl: 'https://htmlreference.io',
    siteName: 'htmlreference.io',
    color: '#4ade80',
    data: HTML_REFERENCE,
  },
  css: {
    title: 'CSS Reference',
    subtitle: 'Essential properties organized by category',
    siteUrl: 'https://cssreference.io',
    siteName: 'cssreference.io',
    color: '#5b9cf5',
    data: CSS_REFERENCE,
  },
}

export default function ReferencePage({ type }: Props) {
  const meta = META[type]
  const [activeCategory, setActiveCategory] = useState(meta.data[0]?.id ?? '')

  useEffect(() => {
    setActiveCategory(meta.data[0]?.id ?? '')
  }, [type])

  // Update active tab on scroll using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    meta.data.forEach(cat => {
      const el = document.getElementById(`cat-${cat.id}`)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveCategory(cat.id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [meta.data])

  const scrollToCategory = (id: string) => {
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageWrapper>
      {/* Header */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '48px 24px 32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
          <div>
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                color: 'var(--text)',
                marginBottom: 8,
              }}
            >
              {meta.title}
            </h1>
            <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>{meta.subtitle}</p>
          </div>
          <a
            href={meta.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              background: `${meta.color}18`,
              border: `1px solid ${meta.color}44`,
              color: meta.color,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <ExternalLink size={12} />
            {meta.siteName}
          </a>
        </div>
      </div>

      {/* Sticky category tabs */}
      <div
        style={{
          position: 'sticky',
          top: 56,
          zIndex: 40,
          background: 'var(--surface-glass, rgba(15,17,23,0.85))',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          marginBottom: 0,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            gap: 0,
            overflowX: 'auto',
          }}
        >
          {meta.data.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              style={{
                padding: '12px 16px',
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeCategory === cat.id ? cat.color : 'transparent'}`,
                color: activeCategory === cat.id ? cat.color : 'var(--text-muted)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
        {meta.data.map(cat => (
          <CategorySection key={cat.id} id={`cat-${cat.id}`} category={cat} />
        ))}
      </div>
    </PageWrapper>
  )
}
