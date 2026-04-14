# Guestbook Widget Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a site-wide floating envelope widget that lets visitors leave a Name + Emoji + Text guestbook entry, backed by Supabase, with a permanent nav link and a full feed page.

**Architecture:** A `GuestbookWidget` component mounts globally in `App.tsx` (like `SearchPalette`) and renders via `createPortal` into `document.body`. A `useGuestbook` hook handles all Supabase reads and writes. Rate-limiting is localStorage-based (1 entry / 24h), with Supabase RLS allowing public insert + public read. First-visit auto-open is tracked in localStorage. A `/guestbook` hash route shows the full entry feed.

**Tech Stack:** React 18, TypeScript, Supabase (`@supabase/supabase-js`), i18next (EN + DE), Framer Motion (panel spring), `createPortal`, localStorage, CSS animations (envelope float/jiggle/flap).

---

## Chunk 1: Data Layer

### Task 1: Supabase migration — `guestbook_entries` table

**Files:**
- Create: `supabase/migrations/20260316_guestbook.sql`

The table stores entries. Rate-limiting is enforced client-side via localStorage; Supabase side allows public insert/read with no IP tracking (appropriate for a low-stakes guestbook).

- [ ] **Step 1: Create the migration file**

```sql
-- supabase/migrations/20260316_guestbook.sql

-- ─── Guestbook Entries ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS guestbook_entries (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 40),
  emoji       TEXT        NOT NULL DEFAULT '✨' CHECK (char_length(emoji) <= 8),
  message     TEXT        NOT NULL CHECK (char_length(message) BETWEEN 1 AND 280),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Newest first index
CREATE INDEX IF NOT EXISTS guestbook_entries_created_at_idx
  ON guestbook_entries (created_at DESC);

-- Row Level Security
ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;

-- Anyone can read
CREATE POLICY "public_read_guestbook"
  ON guestbook_entries FOR SELECT
  TO anon
  USING (true);

-- ─── RPC: insert_guestbook_entry ────────────────────────────────────────────
-- SECURITY DEFINER so anon role can write. Validation done in table constraints.
CREATE OR REPLACE FUNCTION insert_guestbook_entry(
  p_name    TEXT,
  p_emoji   TEXT,
  p_message TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO guestbook_entries (name, emoji, message)
  VALUES (p_name, p_emoji, p_message)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;
```

- [ ] **Step 2: Apply migration to Supabase**

Run in Supabase SQL Editor (Dashboard → SQL Editor → paste file contents → Run).

Verify: In Supabase Table Editor, `guestbook_entries` table exists with columns `id`, `name`, `emoji`, `message`, `created_at`.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260316_guestbook.sql
git commit -m "feat: add guestbook_entries table + insert RPC"
```

---

### Task 2: `useGuestbook` hook

**Files:**
- Create: `src/hooks/useGuestbook.ts`

Pattern mirrors `src/hooks/useResourceVotes.ts`. Rate-limit key `wdvg-gb-last` stores ISO timestamp in localStorage.

- [ ] **Step 1: Create the hook**

```typescript
// src/hooks/useGuestbook.ts
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

const LS_LAST_KEY = 'wdvg-gb-last'
const RATE_LIMIT_MS = 24 * 60 * 60 * 1000 // 24h

export interface GuestbookEntry {
  id: string
  name: string
  emoji: string
  message: string
  created_at: string
}

export interface SubmitPayload {
  name: string
  emoji: string
  message: string
}

export interface UseGuestbookResult {
  entries: GuestbookEntry[]
  loading: boolean
  submitting: boolean
  error: string | null
  canSubmit: boolean          // false if within rate-limit window
  msUntilNextSubmit: number   // 0 when canSubmit is true
  submit: (payload: SubmitPayload) => Promise<boolean>
}

function getLastSubmit(): number {
  try {
    const raw = localStorage.getItem(LS_LAST_KEY)
    return raw ? new Date(raw).getTime() : 0
  } catch {
    return 0
  }
}

function setLastSubmit(): void {
  try { localStorage.setItem(LS_LAST_KEY, new Date().toISOString()) } catch { /* ignore */ }
}

export function useGuestbook(): UseGuestbookResult {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [now, setNow] = useState(() => Date.now())

  // Refresh "now" every 60s so canSubmit updates reactively
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    supabase
      .from('guestbook_entries')
      .select('id, name, emoji, message, created_at')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (data) setEntries(data as GuestbookEntry[])
        if (error) setError(error.message)
        setLoading(false)
      })
  }, [])

  const elapsed = now - getLastSubmit()
  const canSubmit = elapsed >= RATE_LIMIT_MS
  const msUntilNextSubmit = canSubmit ? 0 : RATE_LIMIT_MS - elapsed

  const submit = useCallback(async (payload: SubmitPayload): Promise<boolean> => {
    if (!canSubmit || submitting) return false
    setSubmitting(true)
    setError(null)

    const { data, error } = await supabase.rpc('insert_guestbook_entry', {
      p_name: payload.name.trim(),
      p_emoji: payload.emoji.trim() || '✨',
      p_message: payload.message.trim(),
    })

    if (error) {
      setError(error.message)
      setSubmitting(false)
      return false
    }

    // Optimistic: prepend new entry
    const newEntry: GuestbookEntry = {
      id: data as string,
      name: payload.name.trim(),
      emoji: payload.emoji.trim() || '✨',
      message: payload.message.trim(),
      created_at: new Date().toISOString(),
    }
    setEntries(prev => [newEntry, ...prev])
    setLastSubmit()
    setNow(Date.now())
    setSubmitting(false)
    return true
  }, [canSubmit, submitting])

  return { entries, loading, submitting, error, canSubmit, msUntilNextSubmit, submit }
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /home/jaywee92/web-dev-guide && npx tsc --noEmit --project tsconfig.app.json 2>&1 | grep -i "useGuestbook"
```

Expected: no errors referencing `useGuestbook.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useGuestbook.ts
git commit -m "feat: add useGuestbook hook with rate-limit + optimistic updates"
```

---

## Chunk 2: i18n + UI Components

### Task 3: i18n locale files

**Files:**
- Create: `src/i18n/locales/en/guestbook.json`
- Create: `src/i18n/locales/de/guestbook.json`
- Modify: `src/i18n/index.ts`

- [ ] **Step 1: Create EN locale**

```json
// src/i18n/locales/en/guestbook.json
{
  "navLabel": "GUESTBOOK",
  "panelTitle": "GUESTBOOK",
  "pageTitle": "Guestbook",
  "pageSubtitle": "Leave a note — say hi, share a thought, or just sign in.",
  "namePlaceholder": "name",
  "emojiPlaceholder": "✨",
  "messagePlaceholder": "leave a message...",
  "sendButton": "SEND",
  "rateLimit": "1 / 24h",
  "rateLimitWait": "Available in {{h}}h {{m}}m",
  "emptyState": "No entries yet — be the first!",
  "entriesCount_one": "{{count}} entry",
  "entriesCount_other": "{{count}} entries",
  "errorSubmit": "Could not send — try again.",
  "allEntries": "ALL ENTRIES",
  "newestFirst": "NEWEST FIRST"
}
```

- [ ] **Step 2: Create DE locale**

```json
// src/i18n/locales/de/guestbook.json
{
  "navLabel": "GUESTBOOK",
  "panelTitle": "GUESTBOOK",
  "pageTitle": "Gästebuch",
  "pageSubtitle": "Hinterlasse eine Nachricht — sag Hallo oder teile einen Gedanken.",
  "namePlaceholder": "Name",
  "emojiPlaceholder": "✨",
  "messagePlaceholder": "Hinterlasse eine Nachricht...",
  "sendButton": "SENDEN",
  "rateLimit": "1 / 24h",
  "rateLimitWait": "Verfügbar in {{h}}h {{m}}m",
  "emptyState": "Noch keine Einträge — sei der Erste!",
  "entriesCount_one": "{{count}} Eintrag",
  "entriesCount_other": "{{count}} Einträge",
  "errorSubmit": "Konnte nicht gesendet werden — bitte erneut versuchen.",
  "allEntries": "ALLE EINTRÄGE",
  "newestFirst": "NEUESTE ZUERST"
}
```

- [ ] **Step 3: Register namespace in `src/i18n/index.ts`**

Add these imports after the last `deTopicsOther` import:

```typescript
import enGuestbook from './locales/en/guestbook.json'
import deGuestbook from './locales/de/guestbook.json'
```

Add `guestbook: enGuestbook` to the `en:` resources block and `guestbook: deGuestbook` to the `de:` resources block.

The `en` resources block becomes:
```typescript
en: {
  common: enCommon,
  home: enHome,
  topic: enTopic,
  categories: enCategories,
  resources: enResources,
  reference: enReference,
  'topics-html': enTopicsHtml,
  'topics-css': enTopicsCss,
  'topics-js': enTopicsJs,
  'topics-other': enTopicsOther,
  guestbook: enGuestbook,
},
```

The `de` resources block becomes:
```typescript
de: {
  common: deCommon,
  home: deHome,
  topic: deTopic,
  categories: deCategories,
  resources: deResources,
  reference: deReference,
  'topics-html': deTopicsHtml,
  'topics-css': deTopicsCss,
  'topics-js': deTopicsJs,
  'topics-other': deTopicsOther,
  guestbook: deGuestbook,
},
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit --project tsconfig.app.json 2>&1 | grep -E "guestbook|i18n/index"
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/en/guestbook.json src/i18n/locales/de/guestbook.json src/i18n/index.ts
git commit -m "feat: add guestbook i18n (EN + DE)"
```

---

### Task 4: `GuestbookPanel` component

**Files:**
- Create: `src/components/guestbook/GuestbookPanel.tsx`

The panel renders inside the widget overlay. It receives entries + hook state as props (no data fetching here — parent provides the hook). Framer Motion for the spring-entry animation.

- [ ] **Step 1: Create the component**

```tsx
// src/components/guestbook/GuestbookPanel.tsx
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { GuestbookEntry, SubmitPayload, UseGuestbookResult } from '@/hooks/useGuestbook'

interface Props {
  onClose: () => void
  hook: UseGuestbookResult
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d > 0) return `${d}d ago`
  if (h > 0) return `${h}h ago`
  if (m > 0) return `${m}m ago`
  return 'just now'
}

export default function GuestbookPanel({ onClose, hook }: Props) {
  const { t } = useTranslation('guestbook')
  const { entries, loading, submitting, error, canSubmit, msUntilNextSubmit, submit } = hook

  const nameRef = useRef<HTMLInputElement>(null)
  const emojiRef = useRef<HTMLInputElement>(null)
  const msgRef  = useRef<HTMLTextAreaElement>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  const waitText = (() => {
    if (canSubmit) return null
    const h = Math.floor(msUntilNextSubmit / 3_600_000)
    const m = Math.floor((msUntilNextSubmit % 3_600_000) / 60_000)
    return t('rateLimitWait', { h, m })
  })()

  async function handleSubmit() {
    const name    = nameRef.current?.value.trim() ?? ''
    const emoji   = emojiRef.current?.value.trim() || '✨'
    const message = msgRef.current?.value.trim() ?? ''

    if (!name || !message) { setLocalError('Name and message are required.'); return }
    setLocalError(null)

    const payload: SubmitPayload = { name, emoji, message }
    const ok = await submit(payload)
    if (ok) {
      if (nameRef.current)  nameRef.current.value  = ''
      if (emojiRef.current) emojiRef.current.value = ''
      if (msgRef.current)   msgRef.current.value   = ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.91 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{    opacity: 0, y: 14, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      style={{
        position: 'absolute',
        bottom: 84,
        right: 16,
        width: 308,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 12px 40px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        zIndex: 10,
        transformOrigin: 'bottom right',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '12px 14px 10px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.04em' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          {t('panelTitle')}
          {!loading && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 20, background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', color: 'var(--purple)' }}>
              {entries.length}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--surface-bright)', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.15s, color 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--text)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
        >✕</button>
      </div>

      {/* Entries */}
      <div style={{ maxHeight: 138, overflowY: 'auto', padding: '8px 12px 4px', scrollbarWidth: 'thin', scrollbarColor: 'var(--border) transparent' }}>
        {loading && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', padding: '8px 0' }}>Loading...</p>}
        {!loading && entries.length === 0 && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', padding: '8px 0' }}>{t('emptyState')}</p>
        )}
        {entries.map(e => (
          <div key={e.id} style={{ display: 'flex', gap: 9, padding: '8px 0', borderBottom: '1px solid rgba(46,51,72,0.4)', fontSize: 12 }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.4 }}>{e.emoji}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--purple)', marginBottom: 2, letterSpacing: '0.02em' }}>{e.name.toUpperCase()}</div>
              <div style={{ color: 'var(--text-muted)', lineHeight: 1.45 }}>{e.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ padding: '10px 12px 12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            ref={nameRef}
            placeholder={t('namePlaceholder')}
            maxLength={40}
            style={{ flex: 1, background: 'var(--surface-bright)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', color: 'var(--text)', fontSize: 12, fontFamily: 'var(--font-mono)', outline: 'none' }}
            onFocus={e => (e.target.style.borderColor = 'var(--purple)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
          />
          <input
            ref={emojiRef}
            placeholder={t('emojiPlaceholder')}
            maxLength={4}
            style={{ width: 42, flexShrink: 0, background: 'var(--surface-bright)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 4px', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-mono)', outline: 'none', textAlign: 'center' }}
            onFocus={e => (e.target.style.borderColor = 'var(--purple)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
        <textarea
          ref={msgRef}
          placeholder={t('messagePlaceholder')}
          maxLength={280}
          style={{ background: 'var(--surface-bright)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', color: 'var(--text)', fontSize: 12, fontFamily: 'var(--font-mono)', outline: 'none', resize: 'none', height: 56, lineHeight: 1.45 }}
          onFocus={e => (e.target.style.borderColor = 'var(--purple)')}
          onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
        />
        {(localError || error) && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#f87171' }}>{localError ?? t('errorSubmit')}</p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)', letterSpacing: '0.02em' }}>
            {waitText ?? t('rateLimit')}
          </span>
          <button
            onClick={handleSubmit}
            disabled={submitting || !canSubmit}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 7, background: 'var(--surface-bright)', border: '1px solid var(--border)', color: canSubmit ? 'var(--text-muted)' : 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, cursor: canSubmit ? 'pointer' : 'not-allowed', letterSpacing: '0.04em', transition: 'border-color 0.15s, color 0.15s', opacity: submitting ? 0.6 : 1 }}
            onMouseEnter={e => { if (canSubmit) { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--purple)' } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = canSubmit ? 'var(--text-muted)' : 'var(--text-faint)' }}
          >
            <Send size={11} />
            {submitting ? '...' : t('sendButton')}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit --project tsconfig.app.json 2>&1 | grep "GuestbookPanel"
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/guestbook/GuestbookPanel.tsx
git commit -m "feat: add GuestbookPanel component"
```

---

### Task 5: `GuestbookWidget` component (floating envelope + portal)

**Files:**
- Create: `src/components/guestbook/GuestbookWidget.tsx`

Handles: envelope float/jiggle/flap CSS animation, panel open/close via `AnimatePresence`, first-visit auto-open (localStorage key `wdvg-gb-seen`), `createPortal` into `document.body`.

- [ ] **Step 1: Add CSS keyframes to `src/index.css`**

Append at the end of `src/index.css`:

```css
/* ── Guestbook Widget ─────────────────────────────────────────────── */

@keyframes gb-env-float {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  33%       { transform: translateY(-10px) rotate(1.5deg); }
  66%       { transform: translateY(-5px) rotate(-1deg); }
}

@keyframes gb-env-jiggle {
  0%   { transform: scale(1) rotate(-2deg); }
  15%  { transform: scale(1.12) rotate(9deg); }
  30%  { transform: scale(1.09) rotate(-7deg); }
  45%  { transform: scale(1.06) rotate(5deg); }
  60%  { transform: scale(1.03) rotate(-3deg); }
  80%  { transform: scale(1.01) rotate(1deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.gb-env-svg {
  animation: gb-env-float 4.5s ease-in-out infinite;
  filter: drop-shadow(0 4px 16px rgba(167,139,250,0.35)) drop-shadow(0 2px 6px rgba(0,0,0,0.55));
  transition: filter 0.25s;
}
.gb-env-btn:hover .gb-env-svg {
  filter: drop-shadow(0 6px 24px rgba(167,139,250,0.55)) drop-shadow(0 2px 8px rgba(0,0,0,0.55));
}
.gb-env-jiggling .gb-env-svg {
  animation: gb-env-jiggle 0.5s ease-out forwards;
}
.gb-env-open .gb-env-svg {
  animation: none;
  transform: scale(0.87);
  opacity: 0.5;
  transition: transform 0.3s, opacity 0.3s;
}
.gb-env-flap {
  transform-origin: 29px 16px;
  transition: transform 0.38s cubic-bezier(0.34, 1.15, 0.64, 1);
}
.gb-env-open .gb-env-flap {
  transform: rotateX(175deg);
}
```

- [ ] **Step 2: Create the widget component**

```tsx
// src/components/guestbook/GuestbookWidget.tsx
import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import { useGuestbook } from '@/hooks/useGuestbook'
import GuestbookPanel from './GuestbookPanel'

const LS_SEEN_KEY = 'wdvg-gb-seen'

function hasSeenBefore(): boolean {
  try { return localStorage.getItem(LS_SEEN_KEY) === '1' } catch { return false }
}
function markSeen(): void {
  try { localStorage.setItem(LS_SEEN_KEY, '1') } catch { /* ignore */ }
}

export default function GuestbookWidget() {
  const hook = useGuestbook()
  const [open, setOpen] = useState(false)
  const [jiggling, setJiggling] = useState(false)
  const jiggleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-open on first visit
  useEffect(() => {
    if (!hasSeenBefore()) {
      const id = setTimeout(() => {
        triggerOpen()
        markSeen()
      }, 1500)
      return () => clearTimeout(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const triggerOpen = useCallback(() => {
    setJiggling(true)
    jiggleTimer.current = setTimeout(() => {
      setJiggling(false)
      setOpen(true)
    }, 520)
  }, [])

  const handleEnvClick = useCallback(() => {
    if (open) { setOpen(false); return }
    triggerOpen()
  }, [open, triggerOpen])

  useEffect(() => {
    return () => { if (jiggleTimer.current) clearTimeout(jiggleTimer.current) }
  }, [])

  const widget = (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9000 }}>
      {/* Panel */}
      <AnimatePresence>
        {open && <GuestbookPanel onClose={() => setOpen(false)} hook={hook} />}
      </AnimatePresence>

      {/* Floating envelope button */}
      <button
        className={[
          'gb-env-btn',
          jiggling ? 'gb-env-jiggling' : '',
          open      ? 'gb-env-open'     : '',
        ].join(' ')}
        onClick={handleEnvClick}
        title="Guestbook"
        style={{ width: 58, height: 58, background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative', zIndex: 1, WebkitTapHighlightColor: 'transparent' }}
      >
        <svg
          className="gb-env-svg"
          width="58"
          height="50"
          viewBox="0 0 58 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body */}
          <rect x="2" y="12" width="54" height="36" rx="5"
            fill="var(--surface-bright)" stroke="var(--border)" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* Left fold */}
          <polygon points="2,12 29,32 2,48"
            fill="var(--surface)" stroke="rgba(46,51,72,0.6)" strokeWidth="1" strokeLinejoin="round"/>
          {/* Right fold */}
          <polygon points="56,12 29,32 56,48"
            fill="var(--surface)" stroke="rgba(46,51,72,0.6)" strokeWidth="1" strokeLinejoin="round"/>
          {/* Flap */}
          <polygon
            className="gb-env-flap"
            points="2,12 29,30 56,12"
            fill="#232640" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* Shine */}
          <line x1="11" y1="21" x2="19" y2="26" stroke="rgba(167,139,250,0.15)" strokeWidth="1" strokeLinecap="round"/>
          {/* Seal */}
          <circle cx="29" cy="32" r="3" fill="rgba(167,139,250,0.55)"/>
        </svg>
      </button>
    </div>
  )

  return createPortal(widget, document.body)
}
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit --project tsconfig.app.json 2>&1 | grep -E "GuestbookWidget|GuestbookPanel|useGuestbook"
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/components/guestbook/GuestbookWidget.tsx
git commit -m "feat: add GuestbookWidget with envelope animation + portal"
```

---

## Chunk 3: Pages + Wiring

### Task 6: `GuestbookPage` — full feed via nav link

**Files:**
- Create: `src/pages/GuestbookPage/index.tsx`

- [ ] **Step 1: Create the page**

```tsx
// src/pages/GuestbookPage/index.tsx
import { useTranslation } from 'react-i18next'
import { useGuestbook } from '@/hooks/useGuestbook'

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d > 0) return `${d}d ago`
  if (h > 0) return `${h}h ago`
  if (m > 0) return `${m}m ago`
  return 'just now'
}

export default function GuestbookPage() {
  const { t } = useTranslation('guestbook')
  const { entries, loading } = useGuestbook()

  return (
    <div style={{ padding: '48px 24px', maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 6 }}>
        {t('pageTitle')}
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 36, lineHeight: 1.6 }}>
        {t('pageSubtitle')}
      </p>

      {/* Chips */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 20, flexWrap: 'wrap' }}>
        {[t('allEntries'), t('newestFirst'), '1 / 24H'].map(label => (
          <span key={label} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 20, letterSpacing: '0.04em', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', color: 'var(--purple)' }}>
            {label}
          </span>
        ))}
      </div>

      {/* Feed */}
      {loading && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>Loading...</p>
      )}
      {!loading && entries.length === 0 && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>{t('emptyState')}</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map(entry => (
          <div
            key={entry.id}
            style={{ display: 'flex', gap: 13, alignItems: 'flex-start', padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{entry.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ marginBottom: 3 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--purple)', letterSpacing: '0.02em' }}>
                  {entry.name.toUpperCase()}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)', marginLeft: 8 }}>
                  {timeAgo(entry.created_at)}
                </span>
              </div>
              <div style={{ color: 'var(--text-muted)', lineHeight: 1.55, fontSize: 13 }}>
                {entry.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit --project tsconfig.app.json 2>&1 | grep "GuestbookPage"
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/GuestbookPage/index.tsx
git commit -m "feat: add GuestbookPage full feed"
```

---

### Task 7: Wire `GuestbookWidget` + route into `App.tsx`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add imports and wire**

Add to imports in `src/App.tsx`:
```typescript
import GuestbookWidget from '@/components/guestbook/GuestbookWidget'
import GuestbookPage from '@/pages/GuestbookPage'
```

Add `<GuestbookWidget />` inside the root `<div>`, after `<SearchPalette />`:
```tsx
<SearchPalette />
<GuestbookWidget />
```

Add the route inside `<Routes>`, after the `/search` route:
```tsx
<Route path="/guestbook" element={<GuestbookPage />} />
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit --project tsconfig.app.json 2>&1 | grep -E "App\.tsx|GuestbookWidget|GuestbookPage"
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: mount GuestbookWidget globally + add /guestbook route"
```

---

### Task 8: Add Guestbook button to `Navbar.tsx`

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

The button goes between the Resources link and the Search button. It navigates to `#/guestbook` (HashRouter). Style matches the Resources link (same `nav-btn` inline style pattern, purple hover).

- [ ] **Step 1: Add import**

Add to imports in `Navbar.tsx`:
```typescript
import { Mail } from 'lucide-react'
```

- [ ] **Step 2: Add the button**

In the JSX, between the Resources `<Link>` and the Search `<button>`, insert:

```tsx
{/* Guestbook */}
<Link
  to="/guestbook"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '5px 10px',
    borderRadius: 8,
    textDecoration: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 600,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    color: 'var(--text-muted)',
    transition: 'border-color 0.15s, color 0.15s',
    letterSpacing: '0.04em',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.borderColor = 'var(--purple)'
    e.currentTarget.style.color = 'var(--purple)'
  }}
  onMouseLeave={e => {
    e.currentTarget.style.borderColor = 'var(--border)'
    e.currentTarget.style.color = 'var(--text-muted)'
  }}
>
  <Mail size={12} />
  {t('guestbook')}
</Link>
```

- [ ] **Step 3: Add `guestbook` key to `src/i18n/locales/en/common.json` and `src/i18n/locales/de/common.json`**

In `common.json` (EN), add:
```json
"guestbook": "GUESTBOOK"
```

In `common.json` (DE), add:
```json
"guestbook": "GUESTBOOK"
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit --project tsconfig.app.json 2>&1 | grep "Navbar"
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Navbar.tsx src/i18n/locales/en/common.json src/i18n/locales/de/common.json
git commit -m "feat: add Guestbook nav link to Navbar"
```

---

### Task 9: Final TypeScript check + manual smoke test + push

- [ ] **Step 1: Full TypeScript check**

```bash
npx tsc --noEmit --project tsconfig.app.json 2>&1
```

Expected: 0 errors (or only pre-existing `supabase.ts` env errors if they persist — those don't block runtime).

- [ ] **Step 2: Dev server smoke test**

```bash
npm run dev
```

Open `http://localhost:5173/web-dev-guide/`. Verify:
1. Floating envelope appears bottom-right on every page
2. After 1.5s on first visit (clear `wdvg-gb-seen` from localStorage to reset), panel auto-opens
3. Clicking envelope → jiggle → flap opens → panel springs up
4. Clicking ✕ or envelope again → panel closes smoothly
5. Nav shows "GUESTBOOK" button → navigates to `/guestbook` feed page
6. Submit form: name + emoji + message → entry appears optimistically
7. Second submit within 24h → button disabled, shows wait time
8. Language switch (EN↔DE) → all strings translate

- [ ] **Step 3: Push**

```bash
git push
```

- [ ] **Step 4: Sync to dist (VPS)**

```bash
npm run build 2>&1 | tail -5
# If build succeeds (TS errors are pre-existing supabase.ts env errors, build still completes):
# Copy dist to VPS serve directory as per your deployment process
```

Note: the existing `src/lib/supabase.ts` TS error about `ImportMeta.env` doesn't block the Vite build — Vite handles `import.meta.env` separately from tsc.
