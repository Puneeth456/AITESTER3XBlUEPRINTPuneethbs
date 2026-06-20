import { useState } from 'react'

export default function SettingsPanel({ settings, onChange }) {
  const [showToken, setShowToken] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const set = (field, value) => onChange({ ...settings, [field]: value })

  return (
    <div className="settings-panel">
      <h2 className="settings-title">
        <span>⚙️</span> Configuration
      </h2>

      <div className="settings-grid">
        <fieldset className="settings-group">
          <legend>JIRA Connection</legend>

          <label>
            Base URL
            <input
              type="url"
              value={settings.jiraBaseUrl}
              onChange={e => set('jiraBaseUrl', e.target.value)}
              placeholder="https://yourorg.atlassian.net"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={settings.jiraEmail}
              onChange={e => set('jiraEmail', e.target.value)}
              placeholder="you@company.com"
              required
            />
          </label>

          <label>
            API Token
            <div className="input-row">
              <input
                type={showToken ? 'text' : 'password'}
                value={settings.jiraToken}
                onChange={e => set('jiraToken', e.target.value)}
                placeholder="ATATT3xFfGF0..."
                required
              />
              <button type="button" className="eye-btn" onClick={() => setShowToken(p => !p)}>
                {showToken ? '🙈' : '👁️'}
              </button>
            </div>
            <span className="hint">
              Account Settings → Security → API tokens
            </span>
          </label>
        </fieldset>

        <fieldset className="settings-group">
          <legend>Groq AI</legend>

          <label>
            API Key
            <div className="input-row">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={settings.groqApiKey}
                onChange={e => set('groqApiKey', e.target.value)}
                placeholder="gsk_..."
                required
              />
              <button type="button" className="eye-btn" onClick={() => setShowApiKey(p => !p)}>
                {showApiKey ? '🙈' : '👁️'}
              </button>
            </div>
            <span className="hint">
              console.groq.com → API Keys
            </span>
          </label>

          <label>
            Model
            <select
              value={settings.groqModel}
              onChange={e => set('groqModel', e.target.value)}
            >
              <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Default)</option>
              <option value="llama3-70b-8192">llama3-70b-8192</option>
              <option value="openai/gpt-oss-120b">openai/gpt-oss-120b (FREE)</option>
              <option value="llama-3.1-8b-instant">llama-3.1-8b-instant (Fast)</option>
              <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
            </select>
          </label>
        </fieldset>
      </div>
    </div>
  )
}
