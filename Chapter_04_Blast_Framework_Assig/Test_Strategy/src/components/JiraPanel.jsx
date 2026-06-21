import { useState, useEffect } from 'react'
import { getJiraProjects, pushTestCasesToJira } from '../tools/jiraClient'

export default function JiraPanel({ testCases, onClose }) {
  const [projects, setProjects] = useState([])
  const [selectedKey, setSelectedKey] = useState('')
  const [loading, setLoading] = useState(true)
  const [pushing, setPushing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getJiraProjects()
      .then(p => {
        setProjects(p)
        if (p.length > 0) setSelectedKey(p[0].key)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handlePush = async () => {
    if (!selectedKey) return
    setPushing(true)
    setError(null)
    try {
      const created = await pushTestCasesToJira(selectedKey, testCases)
      setResults(created)
    } catch (e) {
      setError(e.message)
    } finally {
      setPushing(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>🔵 Push to JIRA</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {loading && <p className="modal-loading">Loading JIRA projects...</p>}

        {!loading && error && !results && (
          <div className="modal-error">
            <p>⚠️ {error}</p>
            <p className="error-hint">Check your JIRA credentials in .env file.</p>
          </div>
        )}

        {!loading && !error && !results && (
          <>
            <p className="modal-desc">
              Creating <strong>{testCases.length}</strong> tickets in project:
            </p>
            <select
              className="project-select"
              value={selectedKey}
              onChange={e => setSelectedKey(e.target.value)}
              disabled={pushing}
            >
              {projects.map(p => (
                <option key={p.id} value={p.key}>
                  [{p.key}] {p.name}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={onClose} disabled={pushing}>
                Cancel
              </button>
              <button className="btn-jira" onClick={handlePush} disabled={pushing || !selectedKey}>
                {pushing ? (
                  <><span className="spinner" /> Creating tickets...</>
                ) : (
                  `Push ${testCases.length} Tickets`
                )}
              </button>
            </div>
          </>
        )}

        {results && (
          <div className="jira-results">
            <p className="results-title">✅ {results.length} tickets created!</p>
            <ul className="ticket-list">
              {results.map(r => (
                <li key={r.key}>
                  <span className="ticket-id-badge">{r.id}</span>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="ticket-link">
                    {r.key} ↗
                  </a>
                </li>
              ))}
            </ul>
            <button className="btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
