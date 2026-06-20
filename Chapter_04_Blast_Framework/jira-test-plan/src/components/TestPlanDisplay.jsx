import { useState } from 'react'

export default function TestPlanDisplay({ ticket, testPlan, onReset }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(testPlan)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([testPlan], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `test-plan-${ticket.key}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="result-container">
      <div className="result-header">
        <div className="ticket-badge">
          <span className="badge-type">{ticket.issueType}</span>
          <span className="badge-key">{ticket.key}</span>
          <span className={`badge-priority priority-${ticket.priority.toLowerCase()}`}>
            {ticket.priority}
          </span>
        </div>
        <h2 className="ticket-summary">{ticket.summary}</h2>
        <div className="ticket-meta">
          <span>👤 {ticket.assignee}</span>
          <span>🔖 {ticket.status}</span>
          {ticket.labels.length > 0 && <span>🏷️ {ticket.labels.join(', ')}</span>}
        </div>
      </div>

      <div className="plan-toolbar">
        <h3>Generated Test Plan</h3>
        <div className="toolbar-actions">
          <button className="btn-secondary" onClick={handleCopy}>
            {copied ? '✅ Copied!' : '📋 Copy Markdown'}
          </button>
          <button className="btn-secondary" onClick={handleDownload}>
            ⬇️ Download .md
          </button>
          <button className="btn-outline" onClick={onReset}>
            ← New Ticket
          </button>
        </div>
      </div>

      <div className="plan-content">
        <pre className="plan-pre">{testPlan}</pre>
      </div>
    </div>
  )
}
