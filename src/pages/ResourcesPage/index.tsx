import { useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import { RESOURCE_GROUPS } from '@/data/resources'
import type { Resource, ResourceGroup } from '@/data/resources'
import { useResourceVotes } from '@/hooks/useResourceVotes'
import { getHost } from '@/lib/getHost'

// ─── Top 5 Section ────────────────────────────────────────────────────────────

const ALL_RESOURCES: Resource[] = RESOURCE_GROUPS.flatMap(g => g.resources)

function TopCard({
  r, rank, votes, previewEnabled, soundEnabled,
}: { r: Resource; rank: number; votes: number; previewEnabled: boolean; soundEnabled: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [previewPos, setPreviewPos] = useState<{ top: number; left: number } | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showPreview() {
    if (!previewEnabled || !r.youtubeShortId || !cardRef.current) return
    if (hideTimer.current) clearTimeout(hideTimer.current)
    const rect = cardRef.current.getBoundingClientRect()
    const previewW = 270, previewH = 480
    const leftRight = rect.right + 10
    const leftLeft = rect.left - previewW - 10
    const left = Math.max(8, Math.min(
      rect.right + 10 + previewW < window.innerWidth ? leftRight : leftLeft,
      window.innerWidth - previewW - 8
    ))
    const top = Math.max(8, Math.min(rect.top + rect.height / 2 - previewH / 2, window.innerHeight - previewH - 8))
    setPreviewPos({ top, left })
  }
  function scheduleHide() { hideTimer.current = setTimeout(() => setPreviewPos(null), 120) }
  function cancelHide() { if (hideTimer.current) clearTimeout(hideTimer.current) }

  const rankColor = rank === 0 ? '#fbbf24' : rank === 1 ? '#94a3b8' : rank === 2 ? '#cd7f32' : 'var(--text-faint)'
  const short = r.isShort !== false
  const iframeW = short ? 270 : Math.round(480 * 16 / 9)
  const offsetX = short ? 0 : -Math.round((iframeW - 270) / 2)

  return (
    <>
      <a
        ref={cardRef}
        href={r.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          background: 'var(--surface)',
          border: `1px solid ${r.color}40`,
          borderRadius: 10, padding: '10px 14px',
          textDecoration: 'none', flex: '1 1 0', minWidth: 0,
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = r.color + '99'; showPreview() }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = r.color + '40'; scheduleHide() }}
      >
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 800, color: rankColor, minWidth: 20, paddingTop: 2 }}>
          #{rank + 1}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={r.color} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }}>
          {r.icon}
        </svg>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {r.name}
            </span>
            {r.isAI && (
              <span style={{
                fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700, flexShrink: 0,
                color: '#a78bfa', background: 'rgba(167,139,250,0.12)',
                border: '1px solid rgba(167,139,250,0.3)',
                borderRadius: 4, padding: '1px 4px',
              }}>AI</span>
            )}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.45, marginTop: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {r.description}
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            ▲ {votes} votes{r.youtubeShortId && previewEnabled ? ' · hover to preview' : ''}
          </div>
        </div>
      </a>
      {previewPos && r.youtubeShortId && createPortal(
        <div
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
          style={{
            position: 'fixed', top: previewPos.top, left: previewPos.left,
            width: 270, height: 480, borderRadius: 16,
            overflow: 'hidden', zIndex: 9999,
            boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#000',
          }}
        >
          <div style={{ width: 270, height: 480, overflow: 'hidden', position: 'relative' }}>
            <iframe
              src={`https://www.youtube.com/embed/${r.youtubeShortId}?autoplay=1&mute=${soundEnabled ? 0 : 1}&loop=1&playlist=${r.youtubeShortId}&controls=1&rel=0`}
              allow="autoplay; encrypted-media"
              style={{ position: 'absolute', top: 0, left: offsetX, width: iframeW, height: 480, border: 'none', pointerEvents: 'auto' }}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

function TopResourcesBar({
  votes, loading, hideAI, previewEnabled, soundEnabled,
}: {
  votes: Record<string, number>
  loading: boolean
  hideAI: boolean
  previewEnabled: boolean
  soundEnabled: boolean
}) {
  const top5 = useMemo(() => {
    return ALL_RESOURCES
      .filter(r => (votes[r.id] ?? 0) > 0 && (!hideAI || !r.isAI))
      .sort((a, b) => (votes[b.id] ?? 0) - (votes[a.id] ?? 0))
      .slice(0, 5)
  }, [votes, hideAI])

  if (loading || top5.length === 0) return null

  return (
    <div style={{
      marginBottom: 40,
      background: 'linear-gradient(135deg, rgba(255,215,0,0.04) 0%, rgba(255,165,0,0.02) 100%)',
      border: '1px solid rgba(255,215,0,0.15)',
      borderRadius: 14,
      padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 16 }}>🏆</span>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#fbbf24', letterSpacing: '0.1em', fontWeight: 700 }}>
          TOP RESOURCES
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,215,0,0.12)' }} />
        <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>community picks</span>
      </div>
      <div style={{ display: 'flex', gap: 10, overflow: 'hidden' }}>
        {top5.map((r, i) => (
          <TopCard key={r.id} r={r} rank={i} votes={votes[r.id] ?? 0} previewEnabled={previewEnabled} soundEnabled={soundEnabled} />
        ))}
      </div>
    </div>
  )
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({ on, onChange, label, icon, hint, hintOff }: { on: boolean; onChange: (v: boolean) => void; label: string; icon: string; hint?: string; hintOff?: string }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: on ? 'rgba(255,255,255,0.05)' : 'transparent',
        border: `1px solid ${on ? 'rgba(255,255,255,0.15)' : 'var(--border)'}`,
        borderRadius: 10, padding: '8px 14px', cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: on ? 'var(--text)' : 'var(--text-faint)', fontWeight: 600, transition: 'color 0.2s', lineHeight: 1.2 }}>
          {label}
        </span>
        {hint && (
          <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', lineHeight: 1.2 }}>
            {on ? hint : (hintOff ?? 'hidden')}
          </span>
        )}
      </div>
      {/* pill */}
      <div style={{
        width: 36, height: 20, borderRadius: 10,
        background: on ? '#22c55e' : 'var(--border)',
        position: 'relative', transition: 'background 0.2s ease', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 3, left: on ? 19 : 3,
          width: 14, height: 14, borderRadius: '50%',
          background: '#fff', transition: 'left 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
        }} />
      </div>
    </button>
  )
}

// ─── Resource Card ────────────────────────────────────────────────────────────

interface ResourceCardProps {
  r: Resource
  votes: number
  hasVoted: boolean
  submitting: boolean
  onUpvote: () => void
  loading: boolean
  previewEnabled: boolean
  soundEnabled: boolean
}

function ResourceCard({ r, votes, hasVoted, submitting, onUpvote, loading, previewEnabled, soundEnabled }: ResourceCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [previewPos, setPreviewPos] = useState<{ top: number; left: number } | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showPreview() {
    if (!previewEnabled || !r.youtubeShortId || !cardRef.current) return
    if (hideTimer.current) clearTimeout(hideTimer.current)
    const rect = cardRef.current.getBoundingClientRect()
    const previewW = 270
    const previewH = 480
    const leftRight = rect.right + 10
    const leftLeft = rect.left - previewW - 10
    const left = Math.max(8, Math.min(
      rect.right + 10 + previewW < window.innerWidth ? leftRight : leftLeft,
      window.innerWidth - previewW - 8
    ))
    const top = Math.max(8, Math.min(rect.top + rect.height / 2 - previewH / 2, window.innerHeight - previewH - 8))
    setPreviewPos({ top, left })
  }

  function scheduleHide() {
    hideTimer.current = setTimeout(() => setPreviewPos(null), 120)
  }

  function cancelHide() {
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }

  return (
    <>
    <a
      ref={cardRef}
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
      onMouseEnter={e => { e.currentTarget.style.borderColor = r.color + '80'; showPreview() }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; scheduleHide() }}
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
        {r.isAI && (
          <span style={{
            position: 'absolute', top: 8, left: 8,
            fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700,
            color: '#a78bfa', background: 'rgba(167,139,250,0.12)',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: 4, padding: '2px 5px', letterSpacing: '0.05em',
          }}>
            AI
          </span>
        )}
        {r.youtubeShortId && (
          <span style={{
            position: 'absolute', bottom: 6, right: 8,
            fontSize: 9, fontFamily: 'var(--font-mono)',
            color: previewEnabled ? r.color + 'aa' : 'var(--text-faint)',
            transition: 'color 0.2s',
          }}>
            ▶ preview
          </span>
        )}
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
    {previewPos && r.youtubeShortId && createPortal(
      <div style={{
        position: 'fixed',
        top: previewPos.top,
        left: previewPos.left,
        width: 270,
        height: 480,
        borderRadius: 14,
        overflow: 'hidden',
        border: `1px solid ${r.color}55`,
        boxShadow: `0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px ${r.color}22`,
        zIndex: 9999,
        animation: 'fadeInScale 0.15s ease',
      }}
      onMouseEnter={cancelHide}
      onMouseLeave={() => setPreviewPos(null)}
      >
        <style>{`@keyframes fadeInScale{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:scale(1)}}`}</style>
        {(() => {
          const short = r.isShort !== false
          // For 16:9 videos: scale iframe to fill 480px height, then center-crop to 270px wide
          const iframeW = short ? 270 : Math.round(480 * 16 / 9)  // 853px for 16:9
          const offsetX = short ? 0 : -Math.round((iframeW - 270) / 2)
          return (
            <div style={{ width: 270, height: 480, overflow: 'hidden', position: 'relative' }}>
              <iframe
                src={`https://www.youtube.com/embed/${r.youtubeShortId}?autoplay=1&mute=${soundEnabled ? 0 : 1}&loop=1&playlist=${r.youtubeShortId}&controls=0&rel=0&modestbranding=1`}
                width={iframeW}
                height={480}
                allow="autoplay; encrypted-media"
                style={{ border: 'none', display: 'block', transform: `translateX(${offsetX}px)` }}
              />
            </div>
          )
        })()}
      </div>,
      document.body
    )}
    </>
  )
}

// ─── Resource Group Section ───────────────────────────────────────────────────

interface ResourceGroupSectionProps {
  group: ResourceGroup
  votes: Record<string, number>
  hasVoted: Record<string, boolean>
  submitting: Set<string>
  onUpvote: (id: string) => void
  loading: boolean
  previewEnabled: boolean
  soundEnabled: boolean
}

function ResourceGroupSection({ group, votes, hasVoted, submitting, onUpvote, loading, previewEnabled, soundEnabled }: ResourceGroupSectionProps) {
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
            previewEnabled={previewEnabled}
            soundEnabled={soundEnabled}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const { votes, hasVoted, submitting, upvote, loading } = useResourceVotes()
  const [previewEnabled, setPreviewEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [hideAI, setHideAI] = useState(false)

  const filteredGroups = useMemo(() =>
    RESOURCE_GROUPS
      .map(g => ({
        ...g,
        resources: g.resources.filter(r => !hideAI || !(g.isAI || r.isAI)),
      }))
      .filter(g => g.resources.length > 0),
    [hideAI]
  )

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', letterSpacing: '0.08em', marginBottom: 8 }}>
            RESOURCES
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 10px' }}>
                Useful Resources
              </h1>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0, maxWidth: 520 }}>
                A curated collection of tools, libraries, and references to help you build better web projects.
              </p>
            </div>
            {/* Toggles */}
            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <Toggle on={previewEnabled} onChange={setPreviewEnabled} label="Short Preview" icon="📱" hint="hover to preview" />
              <Toggle on={soundEnabled} onChange={setSoundEnabled} label="Sound" icon="🎵" hint="autoplay with audio" />
              <Toggle on={hideAI} onChange={setHideAI} label="Fu*k AI" icon="🖕" hint="AI hidden" hintOff="AI visible" />
            </div>
          </div>
        </div>

        <TopResourcesBar votes={votes} loading={loading} hideAI={hideAI} previewEnabled={previewEnabled} soundEnabled={soundEnabled} />

        {filteredGroups.map(group => (
          <ResourceGroupSection
            key={group.id}
            group={group}
            votes={votes}
            hasVoted={hasVoted}
            submitting={submitting}
            onUpvote={upvote}
            loading={loading}
            previewEnabled={previewEnabled}
            soundEnabled={soundEnabled}
          />
        ))}
      </div>
    </PageWrapper>
  )
}
