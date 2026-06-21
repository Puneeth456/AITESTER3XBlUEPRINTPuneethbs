export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-icon">🧪</span>
          <div>
            <h1 className="header-title">AI Test Generator</h1>
            <p className="header-subtitle">Intelligent Test Strategy & Case Generator</p>
          </div>
        </div>
        <div className="header-meta">
          <span className="model-tag">⚡ llama-3.3-70b-versatile</span>
          <span className="blast-tag">🔵 Groq AI</span>
        </div>
      </div>
    </header>
  )
}
