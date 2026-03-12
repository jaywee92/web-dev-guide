export default function Footer() {
  return (
    <footer
      className="text-center py-8 text-sm border-t"
      style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
    >
      <p>
        Web Dev Visual Guide · Learning by Animation
        {' · '}
        <a
          href="https://github.com/jaywee92"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          @jaywee92
        </a>
      </p>
    </footer>
  )
}
