export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-icon">🧪</span>
          <div>
            <h1 className="header-title">RICE-POT</h1>
            <p className="header-subtitle">AI Test Strategy Generator</p>
          </div>
        </div>
        <div className="header-badges">
          {['R', 'I', 'C', 'E', 'P', 'O', 'T'].map((letter, i) => (
            <span key={letter} className="badge" style={{ '--delay': `${i * 0.08}s` }}>
              {letter}
            </span>
          ))}
        </div>
        <div className="header-meta">
          <span className="model-tag">⚡ llama-3.3-70b-versatile</span>
          <span className="blast-tag">🏗 BLAST Framework</span>
        </div>
      </div>
    </header>
  )
}
