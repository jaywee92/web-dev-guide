# React Tutorial Video Clips Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut 13 short clips from a local React tutorial video and display them in a tab-toggled panel alongside each matching step in `SyncExplanation`.

**Architecture:** ffmpeg cuts clips from the source MP4 into `public/videos/react/`. A `videoClip` path is added to matching steps in the EN locale JSON. `SyncExplanation` gains an Animation/Video tab bar in the left sticky panel; the active tab resets to Animation on every step change and the Video tab is hidden when the active step has no clip.

**Tech Stack:** ffmpeg (CLI), React + TypeScript, i18next locale JSON, Vite (no new dependencies)

---

## File Map

| File | Change |
|------|--------|
| `public/videos/react/*.mp4` | **Create** — 13 clip files output by ffmpeg |
| `src/types/index.ts` | **Modify** — add `videoClip?: string` to `ExplanationStep` |
| `src/i18n/locales/en/topics-other.json` | **Modify** — add `videoClip` field to 13 steps |
| `src/pages/TopicPage/SyncExplanation.tsx` | **Modify** — tab state, reset effect, `TabButton`, conditional video panel |

---

## Task 1: Cut the react-components clips (8 clips)

**Files:**
- Create: `public/videos/react/` (directory + 8 MP4 files)

Source video path (absolute):
```
/home/jaywee92/web-dev-guide/React Tutorial for Beginners/React Tutorial for Beginners (1080p_60fps_H264-128kbit_AAC-Englisch).mp4
```

- [ ] **Step 1: Create output directory**

```bash
mkdir -p /home/jaywee92/web-dev-guide/public/videos/react
```

- [ ] **Step 2: Cut all 8 react-components clips**

Run each command individually (stream-copy, no re-encode, fast-start for web):

```bash
SRC="/home/jaywee92/web-dev-guide/React Tutorial for Beginners/React Tutorial for Beginners (1080p_60fps_H264-128kbit_AAC-Englisch).mp4"
OUT="/home/jaywee92/web-dev-guide/public/videos/react"

# step 0 — HTML is static markup (why React)
ffmpeg -ss 00:03:14 -i "$SRC" -t 00:00:46 -c copy -movflags +faststart "$OUT/rc-html-static.mp4" -y

# step 1 — JSX — HTML in JavaScript
ffmpeg -ss 00:13:07 -i "$SRC" -t 00:00:51 -c copy -movflags +faststart "$OUT/rc-jsx.mp4" -y

# step 2 — A component is a function
ffmpeg -ss 00:11:26 -i "$SRC" -t 00:00:54 -c copy -movflags +faststart "$OUT/rc-component-fn.mp4" -y

# step 3 — Components compose (virtual DOM)
ffmpeg -ss 00:16:47 -i "$SRC" -t 00:00:50 -c copy -movflags +faststart "$OUT/rc-components-compose.mp4" -y

# step 4 — Props — data flows down
ffmpeg -ss 00:51:03 -i "$SRC" -t 00:00:57 -c copy -movflags +faststart "$OUT/rc-props.mp4" -y

# step 5 — Events
ffmpeg -ss 00:39:16 -i "$SRC" -t 00:00:49 -c copy -movflags +faststart "$OUT/rc-events.mp4" -y

# step 6 — Conditional Rendering
ffmpeg -ss 00:45:42 -i "$SRC" -t 00:00:50 -c copy -movflags +faststart "$OUT/rc-conditional.mp4" -y

# step 7 — Rendering Lists
ffmpeg -ss 00:32:16 -i "$SRC" -t 00:00:59 -c copy -movflags +faststart "$OUT/rc-lists.mp4" -y
```

- [ ] **Step 3: Verify 8 files exist and have reasonable size**

```bash
ls -lh /home/jaywee92/web-dev-guide/public/videos/react/
```

Expected: 8 `.mp4` files, each between 1 MB and 10 MB.

---

## Task 2: Cut the react-state clips (5 clips)

**Files:**
- Create: `public/videos/react/` (5 more MP4 files)

- [ ] **Step 1: Cut all 5 react-state clips**

```bash
SRC="/home/jaywee92/web-dev-guide/React Tutorial for Beginners/React Tutorial for Beginners (1080p_60fps_H264-128kbit_AAC-Englisch).mp4"
OUT="/home/jaywee92/web-dev-guide/public/videos/react"

# step 0 — State is dynamic data
ffmpeg -ss 00:47:49 -i "$SRC" -t 00:00:51 -c copy -movflags +faststart "$OUT/rs-state-intro.mp4" -y

# step 1 — useState
ffmpeg -ss 00:48:40 -i "$SRC" -t 00:00:50 -c copy -movflags +faststart "$OUT/rs-usestate.mp4" -y

# step 2 — Calling the setter re-renders
ffmpeg -ss 00:50:00 -i "$SRC" -t 00:00:35 -c copy -movflags +faststart "$OUT/rs-setter-rerenders.mp4" -y

# step 3 — State is local to each instance
ffmpeg -ss 00:50:20 -i "$SRC" -t 00:00:45 -c copy -movflags +faststart "$OUT/rs-state-local.mp4" -y

# step 7 — Lifting state up
ffmpeg -ss 00:56:30 -i "$SRC" -t 00:01:00 -c copy -movflags +faststart "$OUT/rs-lifting-state.mp4" -y
```

- [ ] **Step 2: Verify all 13 clips exist**

```bash
ls -lh /home/jaywee92/web-dev-guide/public/videos/react/
```

Expected: 13 `.mp4` files total.

- [ ] **Step 3: Commit clips**

```bash
cd /home/jaywee92/web-dev-guide
git add public/videos/react/
git commit -m "feat: add React tutorial video clips (13 clips, 30–60s each)"
```

---

## Task 3: Add `videoClip` to the TypeScript type

**Files:**
- Modify: `src/types/index.ts:69-82`

- [ ] **Step 1: Add `videoClip` field to `ExplanationStep`**

Open `src/types/index.ts`. The `ExplanationStep` interface currently looks like:

```ts
export interface ExplanationStep {
  animationStep: number
  heading: string
  text: string
  icon?: string
  codeExample?: string
  language?: string
  expandedText?: string
  analogy?: {
    icon: string
    title: string
    text: string[]
  }
}
```

Add `videoClip?: string` after `expandedText`:

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
  analogy?: {
    icon: string
    title: string
    text: string[]
  }
}
```

- [ ] **Step 2: Type-check**

```bash
cd /home/jaywee92/web-dev-guide
npm run build 2>&1 | tail -20
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add videoClip field to ExplanationStep type"
```

---

## Task 4: Add `videoClip` paths to EN locale JSON

**Files:**
- Modify: `src/i18n/locales/en/topics-other.json`

The JSON has a flat structure: `{ "react-components": { "steps": [...] }, "react-state": { "steps": [...] } }`. Add `"videoClip"` as a new key on the matching step objects.

- [ ] **Step 1: Add videoClip to react-components steps**

In `src/i18n/locales/en/topics-other.json`, find each step by its `"heading"` value and add `"videoClip"` as shown:

**react-components step 0** — heading `"HTML is static markup"`:
Add `"videoClip": "videos/react/rc-html-static.mp4"` to this object.

**react-components step 1** — heading `"JSX — HTML in JavaScript"`:
Add `"videoClip": "videos/react/rc-jsx.mp4"`

**react-components step 2** — heading `"A component is a function"`:
Add `"videoClip": "videos/react/rc-component-fn.mp4"`

**react-components step 3** — heading `"Components compose"`:
Add `"videoClip": "videos/react/rc-components-compose.mp4"`

**react-components step 4** — heading `"Props — data flows down"`:
Add `"videoClip": "videos/react/rc-props.mp4"`

**react-components step 5** — heading `"Events"`:
Add `"videoClip": "videos/react/rc-events.mp4"`

**react-components step 6** — heading `"Conditional Rendering"`:
Add `"videoClip": "videos/react/rc-conditional.mp4"`

**react-components step 7** — heading `"Rendering Lists"`:
Add `"videoClip": "videos/react/rc-lists.mp4"`

- [ ] **Step 2: Add videoClip to react-state steps**

**react-state step 0** — heading `"State is dynamic data"`:
Add `"videoClip": "videos/react/rs-state-intro.mp4"`

**react-state step 1** — heading `"useState"`:
Add `"videoClip": "videos/react/rs-usestate.mp4"`

**react-state step 2** — heading `"Calling the setter re-renders"`:
Add `"videoClip": "videos/react/rs-setter-rerenders.mp4"`

**react-state step 3** — heading `"State is local to each instance"`:
Add `"videoClip": "videos/react/rs-state-local.mp4"`

**react-state step 7** — heading `"Lifting state up"`:
Add `"videoClip": "videos/react/rs-lifting-state.mp4"`

Steps 4, 5, 6 of react-state get **no** `videoClip` field (Video tab will be hidden for them).

- [ ] **Step 3: Validate JSON**

```bash
python3 -c "import json; json.load(open('src/i18n/locales/en/topics-other.json')); print('JSON valid')"
```

Expected: `JSON valid`

- [ ] **Step 4: Spot-check the data**

```bash
python3 -c "
import json
d = json.load(open('src/i18n/locales/en/topics-other.json'))
rc = d['react-components']['steps']
rs = d['react-state']['steps']
print('react-components clips:')
for s in rc:
    print(' ', s['heading'], '->', s.get('videoClip', '(none)'))
print('react-state clips:')
for s in rs:
    print(' ', s['heading'], '->', s.get('videoClip', '(none)'))
"
```

Expected output — 8 clips for react-components, 5 clips for react-state (steps 0,1,2,3,7), steps 4/5/6 show `(none)`.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/en/topics-other.json
git commit -m "feat: add videoClip paths to react-components and react-state steps"
```

---

## Task 5: Update SyncExplanation with tab toggle

**Files:**
- Modify: `src/pages/TopicPage/SyncExplanation.tsx`

- [ ] **Step 1: Add `activeTab` state and reset effect**

At the top of the `SyncExplanation` function (after the existing `useState` / `useEffect` hooks, around line 21), add:

```tsx
const activeStep = steps[ctrl.step]
const [activeTab, setActiveTab] = useState<'anim' | 'video'>('anim')

useEffect(() => {
  setActiveTab('anim')
}, [ctrl.step])
```

- [ ] **Step 2: Add tab bar above the animation panel**

The animation panel starts at line 55 with:
```tsx
{/* Animation panel — click to advance */}
<div
  onClick={ctrl.next}
  ...
>
```

Insert the tab bar **immediately before** this `{/* Animation panel */}` comment:

```tsx
{/* Animation / Video tab bar — only when active step has a clip */}
{activeStep?.videoClip && (
  <div style={{
    display: 'flex',
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid var(--border)',
    background: '#131520',
    marginBottom: 12,
    flexShrink: 0,
  }}>
    <TabButton label="ANIMATION" icon="⚛" active={activeTab === 'anim'} onClick={() => setActiveTab('anim')} color={topic.color} />
    <TabButton label="VIDEO" icon="▶" active={activeTab === 'video'} onClick={() => setActiveTab('video')} color={topic.color} />
  </div>
)}
```

- [ ] **Step 3: Wrap the animation div and add video panel**

Replace the existing animation panel div (lines 55–82, from the comment to the closing `</div>`):

**Before:**
```tsx
{/* Animation panel — click to advance */}
<div
  onClick={ctrl.next}
  style={{
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '24px',
    flex: 1,
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: ctrl.step < steps.length - 1 ? 'pointer' : 'default',
    userSelect: 'none',
    overflow: 'hidden',
  }}
>
  {AnimComp ? (
    <AnimComp step={ctrl.step} />
  ) : animLoading ? (
    <div style={{
      width: 60, height: 60, borderRadius: '50%',
      border: `2px solid ${topic.color}20`,
      borderTopColor: topic.color,
      animation: 'spin 1s linear infinite',
    }} />
  ) : null}
</div>
```

**After:**
```tsx
{/* Animation panel — click to advance (hidden when Video tab active) */}
{activeTab === 'anim' && (
  <div
    onClick={ctrl.next}
    style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      flex: 1,
      minHeight: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: ctrl.step < steps.length - 1 ? 'pointer' : 'default',
      userSelect: 'none',
      overflow: 'hidden',
    }}
  >
    {AnimComp ? (
      <AnimComp step={ctrl.step} />
    ) : animLoading ? (
      <div style={{
        width: 60, height: 60, borderRadius: '50%',
        border: `2px solid ${topic.color}20`,
        borderTopColor: topic.color,
        animation: 'spin 1s linear infinite',
      }} />
    ) : null}
  </div>
)}

{/* Video panel — shown when Video tab active and step has a clip */}
{activeTab === 'video' && activeStep?.videoClip && (
  <div style={{ flex: 1, minHeight: 200, borderRadius: 'var(--radius)', overflow: 'hidden', background: '#000', position: 'relative' }}>
    <video
      key={activeStep.videoClip}
      src={`/${activeStep.videoClip}`}
      autoPlay
      controls
      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
    />
    <div style={{
      position: 'absolute', top: 8, left: 8,
      background: 'rgba(0,0,0,0.65)',
      borderRadius: 4,
      padding: '3px 7px',
      fontSize: 9,
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      letterSpacing: '.06em',
      color: topic.color,
      pointerEvents: 'none',
    }}>
      TUTORIAL CLIP
    </div>
  </div>
)}
```

- [ ] **Step 4: Add `TabButton` component at the bottom of the file**

Add this function **after** the closing brace of `StepBlock` (at the very end of `SyncExplanation.tsx`):

```tsx
function TabButton({ label, icon, active, onClick, color }: {
  label: string
  icon: string
  active: boolean
  onClick: () => void
  color: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '8px 0',
        border: 'none',
        cursor: 'pointer',
        background: active ? 'var(--surface)' : 'transparent',
        borderBottom: `2px solid ${active ? color : 'transparent'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <span style={{ fontSize: 13 }}>{icon}</span>
      <span style={{
        fontSize: 11,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        letterSpacing: '.04em',
        color: active ? color : 'var(--text-faint)',
      }}>
        {label}
      </span>
    </button>
  )
}
```

- [ ] **Step 5: Type-check and lint**

```bash
cd /home/jaywee92/web-dev-guide
npm run build 2>&1 | tail -20
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 6: Start dev server and verify visually**

```bash
npm run dev &
```

Open `http://localhost:5173/#/topic/react-components` in a browser.

Check:
1. Tab bar visible on step 0 (all react-components steps have clips)
2. Animation tab is active by default
3. Clicking VIDEO tab replaces animation with the video player and autoplays
4. Scrolling to next step resets tab back to ANIMATION
5. Navigate to `react-useeffect` — no tab bar should appear on any step

- [ ] **Step 7: Commit**

```bash
git add src/pages/TopicPage/SyncExplanation.tsx
git commit -m "feat: add Animation/Video tab toggle to SyncExplanation left panel"
```

---

## Task 6: Push and verify deployment

- [ ] **Step 1: Push all commits**

```bash
cd /home/jaywee92/web-dev-guide
git push
```

- [ ] **Step 2: Wait for GitHub Actions deploy (~2 min), then verify**

Check `https://jaywee92.de/web-dev-guide/#/topic/react-components` — tab bar visible, VIDEO tab plays the clip.

Check `https://jaywee92.de/web-dev-guide/#/topic/react-useeffect` — no tab bar.
