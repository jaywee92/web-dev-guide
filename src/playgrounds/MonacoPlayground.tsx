import Editor from '@monaco-editor/react'
import { useAppStore } from '@/store/useAppStore'
import { usePlayground } from '@/hooks/usePlayground'

const defaultCode: Record<string, string> = {
  'http-request-cycle': `# Flask route example
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify({'users': ['Alice', 'Bob']})

if __name__ == '__main__':
    app.run(debug=True)`,
}

interface Props {
  topicId: string
  starterCode?: string   // overrides defaultCode lookup when provided
  language?: string      // Monaco language; defaults to 'javascript'
  storageKey?: string    // usePlayground key; defaults to `monaco-${topicId}`
}

export default function MonacoPlayground({ topicId, starterCode, language = 'javascript', storageKey }: Props) {
  const { theme } = useAppStore()
  const [code, setCode] = usePlayground<string>(
    starterCode ?? defaultCode[topicId] ?? '// Write your code here',
    storageKey ?? `monaco-${topicId}`
  )

  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 16px', background: 'var(--surface-bright)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {(['#f87171', '#f5c542', '#4ade80'] as const).map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginLeft: 8 }}>
          editor
        </span>
      </div>
      <Editor
        height="380px"
        language={language}
        value={code}
        onChange={v => setCode(v ?? '')}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          fontSize: 13,
          fontFamily: 'JetBrains Mono, monospace',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 16 },
        }}
      />
    </div>
  )
}
