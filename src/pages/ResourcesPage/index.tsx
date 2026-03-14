import PageWrapper from '@/components/layout/PageWrapper'
import { RESOURCE_GROUPS } from '@/data/resources'
import type { Resource, ResourceGroup } from '@/data/resources'
import { useResourceVotes } from '@/hooks/useResourceVotes'

function getHost(url: string): string {
  try { return new URL(url).host } catch { return url }
}

interface ResourceCardProps {
  r: Resource
  votes: number
  hasVoted: boolean
  submitting: boolean
  onUpvote: () => void
  loading: boolean
}

function ResourceCard({ r, votes, hasVoted, submitting, onUpvote, loading }: ResourceCardProps) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 0.2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = r.color + '80')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {/* Header */}
      <div style={{
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
        background: `linear-gradient(135deg, ${r.color}1a 0%, ${r.color}0d 100%)`,
        flexShrink: 0,
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={r.color} strokeWidth={1.5} opacity={0.85}>
          {r.icon}
        </svg>
        <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 10, color: 'var(--text-faint)' }}>↗</span>
      </div>

      {/* Body */}
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>{r.name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.55, flex: 1 }}>
          {r.description}
        </div>
        <div style={{
          fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)',
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 5, padding: '4px 8px', display: 'inline-block', width: 'fit-content',
        }}>
          {getHost(r.url)} ↗
        </div>
        <button
          onClick={e => { e.preventDefault(); if (!hasVoted && !submitting) onUpvote() }}
          disabled={hasVoted || submitting}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'none', cursor: hasVoted ? 'default' : 'pointer',
            border: `1px solid ${hasVoted ? r.color + '99' : 'var(--border)'}`,
            borderRadius: 5, padding: '3px 8px', marginTop: 4,
            fontSize: 10, fontFamily: 'var(--font-mono)',
            color: hasVoted ? r.color + '99' : 'var(--text-faint)',
            transition: 'border-color 0.15s, color 0.15s',
            width: 'fit-content',
          }}
        >
          ▲ {loading ? '—' : votes}
        </button>
      </div>
    </a>
  )
}

interface ResourceGroupSectionProps {
  group: ResourceGroup
  votes: Record<string, number>
  hasVoted: Record<string, boolean>
  submitting: Set<string>
  onUpvote: (id: string) => void
  loading: boolean
}

function ResourceGroupSection({ group, votes, hasVoted, submitting, onUpvote, loading }: ResourceGroupSectionProps) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ width: 3, height: 18, background: group.color, borderRadius: 2, flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: group.color, letterSpacing: '0.1em', fontWeight: 700 }}>
          {group.label}
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>
          {group.resources.length} {group.resources.length === 1 ? 'resource' : 'resources'}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
        {group.resources.map(r => (
          <ResourceCard
            key={r.id}
            r={r}
            votes={votes[r.id] ?? 0}
            hasVoted={hasVoted[r.id] ?? false}
            submitting={submitting.has(r.id)}
            onUpvote={() => onUpvote(r.id)}
            loading={loading}
          />
        ))}
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  const { votes, hasVoted, submitting, upvote, loading } = useResourceVotes()

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', letterSpacing: '0.08em', marginBottom: 8 }}>
            RESOURCES
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 10px' }}>
            Useful Resources
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, maxWidth: 520 }}>
            A curated collection of tools, libraries, and references to help you build better web projects.
          </p>
        </div>
        {RESOURCE_GROUPS.map(group => (
          <ResourceGroupSection
            key={group.id}
            group={group}
            votes={votes}
            hasVoted={hasVoted}
            submitting={submitting}
            onUpvote={upvote}
            loading={loading}
          />
        ))}
      </div>
    </PageWrapper>
  )
}
