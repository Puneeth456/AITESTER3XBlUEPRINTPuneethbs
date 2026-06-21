import { useState } from 'react'

const TYPE_COLORS = {
  Functional: '#6bcb77',
  Regression: '#4d96ff',
  Security: '#ff6b6b',
  Performance: '#ffd93d',
  Negative: '#c77dff',
  API: '#ff9f1c',
  UI: '#00b4d8',
}

const PRIORITY_COLORS = {
  High: '#ff6b6b',
  Medium: '#ffd93d',
  Low: '#6bcb77',
}

function TestCaseCard({ tc }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="tc-card" style={{ '--type-color': TYPE_COLORS[tc.type] || '#aaa' }}>
      <div className="tc-header" onClick={() => setExpanded(e => !e)}>
        <div className="tc-id-row">
          <span className="tc-id">{tc.id}</span>
          <span className="tc-type-badge" style={{ background: TYPE_COLORS[tc.type] || '#555' }}>
            {tc.type}
          </span>
          <span className="tc-priority" style={{ color: PRIORITY_COLORS[tc.priority] || '#aaa' }}>
            ● {tc.priority}
          </span>
        </div>
        <div className="tc-title-row">
          <span className="tc-title">{tc.title}</span>
          <span className="tc-chevron">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div className="tc-body">
          {tc.preconditions && (
            <div className="tc-section">
              <span className="tc-section-label">Preconditions</span>
              <p>{tc.preconditions}</p>
            </div>
          )}
          {tc.steps?.length > 0 && (
            <div className="tc-section">
              <span className="tc-section-label">Steps</span>
              <ol className="tc-steps">
                {tc.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          )}
          {tc.expected && (
            <div className="tc-section">
              <span className="tc-section-label">Expected Result</span>
              <p className="tc-expected">{tc.expected}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function TestStrategyOutput({ result, onPushToJira }) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('strategy')

  const copyStrategy = () => {
    navigator.clipboard.writeText(result.testStrategy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="output-section">
      <div className="output-header">
        <h2 className="output-title">✅ Test Strategy Generated</h2>
        <div className="output-stats">
          <span className="stat-chip">{result.testCases?.length ?? 0} Test Cases</span>
          <span className="stat-chip">Groq · llama-3.3-70b</span>
        </div>
      </div>

      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'strategy' ? 'active' : ''}`}
          onClick={() => setActiveTab('strategy')}
        >
          📋 Test Strategy
        </button>
        <button
          className={`tab-btn ${activeTab === 'cases' ? 'active' : ''}`}
          onClick={() => setActiveTab('cases')}
        >
          🧪 Test Cases ({result.testCases?.length ?? 0})
        </button>
      </div>

      {activeTab === 'strategy' && (
        <div className="strategy-panel">
          <div className="strategy-toolbar">
            <button className="btn-copy" onClick={copyStrategy}>
              {copied ? '✅ Copied!' : '📋 Copy Markdown'}
            </button>
          </div>
          <pre className="strategy-content">{result.testStrategy}</pre>
        </div>
      )}

      {activeTab === 'cases' && (
        <div className="cases-panel">
          {result.testCases?.length > 0 ? (
            <>
              <div className="cases-legend">
                {Object.entries(TYPE_COLORS).map(([type, color]) => (
                  <span key={type} className="legend-item" style={{ '--color': color }}>
                    <span className="legend-dot" />
                    {type}
                  </span>
                ))}
              </div>
              <div className="tc-list">
                {result.testCases.map(tc => (
                  <TestCaseCard key={tc.id} tc={tc} />
                ))}
              </div>
              <div className="jira-push-row">
                <button className="btn-jira" onClick={onPushToJira}>
                  🔵 Push All to JIRA
                </button>
              </div>
            </>
          ) : (
            <div className="empty-cases">
              <p>No structured test cases parsed. See the Test Strategy tab for full output.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
