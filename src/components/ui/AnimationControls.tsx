import Play from 'lucide-react/dist/esm/icons/play'
import Pause from 'lucide-react/dist/esm/icons/pause'
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'

interface Props {
  isPlaying: boolean
  step: number
  totalSteps: number
  onPlay: () => void
  onPause: () => void
  onRestart: () => void
  onPrev: () => void
  onNext: () => void
}

export default function AnimationControls({
  isPlaying, step, totalSteps,
  onPlay, onPause, onRestart, onPrev, onNext,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onRestart} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }} title="Restart (R)">
        <RotateCcw size={16} />
      </button>
      <button onClick={onPrev} disabled={step === 0} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
        style={{ background: 'var(--blue)', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={onNext} disabled={step >= totalSteps - 1} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
        <ChevronRight size={16} />
      </button>
      <span style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
        {step + 1} / {totalSteps}
      </span>
    </div>
  )
}
