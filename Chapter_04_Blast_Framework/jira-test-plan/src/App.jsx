import { useState, useEffect, useRef, useCallback } from 'react'
import SettingsPanel from './components/SettingsPanel'
import TestPlanDisplay from './components/TestPlanDisplay'
import { fetchJiraTicket } from './utils/jiraApi'
import { generateTestPlan } from './utils/groqApi'
import './App.css'

const STAGE = { IDLE: 'idle', FETCHING: 'fetching', GENERATING: 'generating', DONE: 'done', ERROR: 'error' }
const JIRA_RE = /^[A-Z]+-\d+$/

const DEFAULT_SETTINGS = {
  jiraBaseUrl: import.meta.env.VITE_JIRA_BASE_URL || '',
  jiraEmail: import.meta.env.VITE_JIRA_EMAIL || '',
  jiraToken: import.meta.env.VITE_JIRA_API_TOKEN || '',
  groqApiKey: import.meta.env.VITE_GROQ_API_KEY || '',
  groqModel: 'llama-3.3-70b-versatile',
}

function readTicketFromUrl() {
  return new URLSearchParams(window.location.search).get('ticket') || 'SCRUM-6'
}

export default function App() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [ticketKey, setTicketKey] = useState(readTicketFromUrl)
  const [stage, setStage] = useState(STAGE.IDLE)
  const [ticket, setTicket] = useState(null)
  const [testPlan, setTestPlan] = useState('')
  const [error, setError] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(true)

  const settingsRef = useRef(settings)
  const runningRef = useRef(false)
  useEffect(() => { settingsRef.current = settings }, [settings])

  const isLoading = stage === STAGE.FETCHING || stage === STAGE.GENERATING
  const isValidKey = JIRA_RE.test(ticketKey.trim().toUpperCase())
  const canSubmit = isValidKey && !isLoading

  const run = useCallback(async (key) => {
    if (runningRef.current) return
    const s = settingsRef.current
    if (!s.jiraBaseUrl || !s.jiraEmail || !s.jiraToken || !s.groqApiKey) return

    runningRef.current = true
    setError('')
    setTestPlan('')
    setTicket(null)
    setSettingsOpen(false)

    // Update URL
    const url = new URL(window.location.href)
    url.searchParams.set('ticket', key)
    window.history.pushState(null, '', url.toString())

    try {
      setStage(STAGE.FETCHING)
      const jiraTicket = await fetchJiraTicket({
        baseUrl: s.jiraBaseUrl,
        email: s.jiraEmail,
        token: s.jiraToken,
        ticketKey: key,
      })
      setTicket(jiraTicket)

      setStage(STAGE.GENERATING)
      const plan = await generateTestPlan(jiraTicket, s.groqApiKey, s.groqModel)
      setTestPlan(plan)
      setStage(STAGE.DONE)
    } catch (err) {
      setError(err.message)
      setStage(STAGE.ERROR)
    } finally {
      runningRef.current = false
    }
  }, [])

  const handleSubmit = () => {
    const key = ticketKey.trim().toUpperCase()
    if (JIRA_RE.test(key)) run(key)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canSubmit) handleSubmit()
  }

  const handleReset = () => {
    setStage(STAGE.IDLE)
    setTicket(null)
    setTestPlan('')
    setError('')
    const url = new URL(window.location.href)
    url.searchParams.delete('ticket')
    window.history.pushState(null, '', url.toString())
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🧪</span>
            <div>
              <span className="logo-title">BLAST Test Plan Generator</span>
              <span className="logo-sub">JIRA + Groq AI → Professional Test Plans</span>
            </div>
          </div>
          <button
            type="button"
            className="settings-toggle"
            onClick={() => setSettingsOpen(p => !p)}
          >
            {settingsOpen ? '▲ Hide Config' : '▼ Show Config'}
          </button>
        </div>
      </header>

      <main className="app-main">
        {settingsOpen && (
          <SettingsPanel settings={settings} onChange={setSettings} />
        )}

        <div className="ticket-section">
          <label className="ticket-label" htmlFor="ticket-input">
            JIRA Ticket ID
          </label>

          <div className="ticket-row">
            <input
              id="ticket-input"
              className={`ticket-input${isLoading ? ' ticket-input--loading' : ''}`}
              type="text"
              value={ticketKey}
              onChange={e => setTicketKey(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              placeholder="SCRUM-6"
              spellCheck={false}
              autoFocus
              autoComplete="off"
              disabled={isLoading}
            />

            <button
              type="button"
              className={`btn-submit${isValidKey && !isLoading ? ' btn-submit--visible' : ''}`}
              onClick={handleSubmit}
              disabled={!canSubmit}
              aria-label="Generate test plan"
            >
              {isLoading ? (
                <span className="btn-spinner" />
              ) : (
                <>Generate Test Plan <span className="btn-arrow">→</span></>
              )}
            </button>
          </div>

          <p className="ticket-hint">
            {isLoading
              ? stage === STAGE.FETCHING
                ? `Fetching ${ticketKey} from JIRA...`
                : `Generating with ${settings.groqModel}...`
              : isValidKey
                ? 'Press Enter or click Generate'
                : 'Format: PROJECT-NUMBER  (e.g. SCRUM-6)'}
          </p>
        </div>

        {isLoading && (
          <div className="loading-card">
            <div className="spinner" />
            <div>
              <p className="loading-title">
                {stage === STAGE.FETCHING
                  ? `Fetching ${ticketKey} from JIRA...`
                  : 'Generating test plan with Groq AI...'}
              </p>
              <p className="loading-sub">
                {stage === STAGE.FETCHING
                  ? `Connecting to ${settings.jiraBaseUrl}`
                  : `Model: ${settings.groqModel}`}
              </p>
            </div>
          </div>
        )}

        {stage === STAGE.ERROR && (
          <div className="error-box">
            <strong>⚠️ Error:</strong> {error}
          </div>
        )}

        {stage === STAGE.DONE && ticket && testPlan && (
          <TestPlanDisplay ticket={ticket} testPlan={testPlan} onReset={handleReset} />
        )}
      </main>
    </div>
  )
}
