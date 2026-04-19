# Design: React Tutorial Video Clips

**Date:** 2026-04-19  
**Status:** Approved  
**Source video:** `React Tutorial for Beginners/React Tutorial for Beginners (1080p_60fps_H264-128kbit_AAC-Englisch).mp4` (1h 20min, Mosh Hamedani)

---

## Overview

Cut short clips (30–60 s) from the React Tutorial for Beginners video and show them in the existing left sticky panel of `SyncExplanation` via an Animation / Video tab toggle. The Video tab appears only when the active step has a clip; it auto-plays when selected and resets back to Animation whenever the active step changes.

---

## Clip List

### `react-components` (8 clips)

| Step | Heading | Start → End | Output file |
|------|---------|-------------|-------------|
| 0 | HTML is static markup | 3:14 → 4:00 | `rc-html-static.mp4` |
| 1 | JSX — HTML in JavaScript | 13:07 → 13:58 | `rc-jsx.mp4` |
| 2 | A component is a function | 11:26 → 12:20 | `rc-component-fn.mp4` |
| 3 | Components compose | 16:47 → 17:37 | `rc-components-compose.mp4` |
| 4 | Props — data flows down | 51:03 → 52:00 | `rc-props.mp4` |
| 5 | Events | 39:16 → 40:05 | `rc-events.mp4` |
| 6 | Conditional Rendering | 45:42 → 46:32 | `rc-conditional.mp4` |
| 7 | Rendering Lists | 32:16 → 33:15 | `rc-lists.mp4` |

### `react-state` (5 clips)

| Step | Heading | Start → End | Output file |
|------|---------|-------------|-------------|
| 0 | State is dynamic data | 47:49 → 48:40 | `rs-state-intro.mp4` |
| 1 | useState | 48:40 → 49:30 | `rs-usestate.mp4` |
| 2 | Calling the setter re-renders | 50:00 → 50:35 | `rs-setter-rerenders.mp4` |
| 3 | State is local to each instance | 50:20 → 51:05 | `rs-state-local.mp4` |
| 7 | Lifting state up | 56:30 → 57:30 | `rs-lifting-state.mp4` |

Steps with no coverage (react-state 4/5/6, all react-useeffect, all react-context): Video tab hidden.

**Output directory:** `public/videos/react/`  
**Format:** H.264 MP4, copy stream (no re-encode), web-optimised with `-movflags +faststart`  
**Expected size:** ~2–4 MB per clip, ~40 MB total

---

## Data Schema

### `src/types/index.ts`

Add one optional field to `ExplanationStep`:

```ts
export interface ExplanationStep {
  animationStep: number
  heading: string
  text: string
  icon?: string
  codeExample?: string
  language?: string
  expandedText?: string
  videoClip?: string   // path relative to public/, e.g. "videos/react/rc-jsx.mp4"
  analogy?: { ... }
}
```

### `src/i18n/locales/en/topics-other.json`

Add `"videoClip": "videos/react/<filename>.mp4"` to the 13 matching steps. DE locale unchanged (paths are not translatable).

---

## Component Changes

### `src/pages/TopicPage/SyncExplanation.tsx`

**Derived value:** `const activeStep = steps[ctrl.step]` — already implicit in the component; make it an explicit `const` so it can be referenced in JSX.

**State:** Add `const [activeTab, setActiveTab] = useState<'anim' | 'video'>('anim')` at the top of `SyncExplanation`.

**Reset on step change:**
```ts
useEffect(() => {
  setActiveTab('anim')
}, [ctrl.step])
```

**Tab bar** — rendered above the animation panel, only when the active step has a `videoClip`:
```tsx
{activeStep?.videoClip && (
  <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', background: '#131520', marginBottom: 12 }}>
    <TabButton label="ANIMATION" icon="⚛" active={activeTab === 'anim'} onClick={() => setActiveTab('anim')} color={topic.color} />
    <TabButton label="VIDEO" icon="▶" active={activeTab === 'video'} onClick={() => setActiveTab('video')} color={topic.color} />
  </div>
)}
```

`TabButton` is a tiny internal component (defined in the same file, not exported):
```tsx
function TabButton({ label, icon, active, onClick, color }: { label: string; icon: string; active: boolean; onClick: () => void; color: string }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '8px 0', border: 'none', cursor: 'pointer', background: active ? 'var(--surface)' : 'transparent',
      borderBottom: `2px solid ${active ? color : 'transparent'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    }}>
      <span>{icon}</span>
      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.04em', color: active ? color : 'var(--text-faint)' }}>{label}</span>
    </button>
  )
}
```

**Panel content** — the existing animation `<div onClick={ctrl.next} ...>` block conditionally renders based on `activeTab` (its internal content is unchanged):
```tsx
{activeTab === 'anim' ? (
  <div onClick={ctrl.next} style={{ /* existing styles unchanged */ }}>
    {/* existing AnimComp / loading spinner / null — unchanged */}
  </div>
) : (
  <video
    key={activeStep.videoClip}   // remounts on clip change
    src={activeStep.videoClip}
    autoPlay
    controls
    style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000', borderRadius: 12 }}
  />
)}
```

The step dots and analogy panel below are unchanged.

---

## Out of Scope

- react-useeffect, react-context, react-router: no clips (tutorial ends before these topics)
- DE locale: no changes needed
- Subtitles/captions on clips: not included
- Mobile layout: existing responsive behaviour handles this (left panel stacks above steps on small screens)
