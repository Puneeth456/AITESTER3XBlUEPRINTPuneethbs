import { useState } from 'react'

const FIELDS = [
  {
    key: 'role',
    label: 'R — Role',
    color: '#ff6b6b',
    placeholder: 'Expert QA Automation Engineer with 10 years of enterprise testing experience',
    hint: 'AI persona to adopt',
    rows: 2,
  },
  {
    key: 'instructions',
    label: 'I — Instructions',
    color: '#ffd93d',
    placeholder: '1. Generate test cases for the login flow\n2. Cover happy path, negative, and edge cases\n3. Include API-level and UI-level tests\n4. Mark each test with priority and type',
    hint: 'Step-by-step commands and constraints',
    rows: 4,
  },
  {
    key: 'context',
    label: 'C — Context',
    color: '#6bcb77',
    placeholder: 'Salesforce CRM Login Page. Users authenticate via email/password or SSO. The page has rate limiting (5 failed attempts → 15-min lockout). Backend: Node.js + JWT. DB: PostgreSQL.',
    hint: 'Background info — the why and where',
    rows: 4,
  },
  {
    key: 'example',
    label: 'E — Example',
    color: '#4d96ff',
    placeholder: 'TC-001: Valid Login\nPreconditions: User exists in DB\nSteps: 1. Navigate to /login 2. Enter valid credentials 3. Click Submit\nExpected: Redirect to /dashboard with JWT cookie set',
    hint: 'Sample format to guide output style',
    rows: 4,
  },
  {
    key: 'parameters',
    label: 'P — Parameters',
    color: '#c77dff',
    placeholder: 'Production-level quality. Zero bad practices. Follow ISTQB standards. All test cases must be atomic and independent. No duplicate coverage.',
    hint: 'Quality, accuracy, and style constraints',
    rows: 3,
  },
  {
    key: 'output',
    label: 'O — Output',
    color: '#ff9f1c',
    placeholder: 'A full Test Strategy document + minimum 5 test cases covering: 2 Functional, 1 Negative, 1 Security, 1 Regression. Include test case ID, title, steps, expected result, priority.',
    hint: 'Exact artifacts to produce',
    rows: 3,
  },
  {
    key: 'tone',
    label: 'T — Tone',
    color: '#00b4d8',
    placeholder: 'Technical, precise, enterprise-grade. Use formal QA terminology.',
    hint: 'Communication style',
    rows: 2,
  },
]

const DEFAULT_VALUES = {
  role: 'Expert QA Automation Engineer with 10 years of enterprise testing experience',
  instructions: '1. Generate test cases for the login flow\n2. Cover happy path, negative, and edge cases\n3. Include API-level and UI-level tests\n4. Mark each test with priority and type',
  context: 'Salesforce CRM Login Page. Users authenticate via email/password or SSO. The page has rate limiting (5 failed attempts → 15-min lockout). Backend: Node.js + JWT. DB: PostgreSQL.',
  example: 'TC-001: Valid Login\nPreconditions: User exists in DB\nSteps: 1. Navigate to /login 2. Enter valid credentials 3. Click Submit\nExpected: Redirect to /dashboard with JWT cookie set',
  parameters: 'Production-level quality. Zero bad practices. Follow ISTQB standards. All test cases must be atomic and independent. No duplicate coverage.',
  output: 'A full Test Strategy document + minimum 5 test cases covering: 2 Functional, 1 Negative, 1 Security, 1 Regression. Include test case ID, title, steps, expected result, priority.',
  tone: 'Technical, precise, enterprise-grade. Use formal QA terminology.',
}

export default function RicePotForm({ onGenerate, isLoading }) {
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [errors, setErrors] = useState({})

  const update = (key, val) => {
    setValues(prev => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: false }))
  }

  const validate = () => {
    const newErrors = {}
    FIELDS.forEach(f => {
      if (!values[f.key]?.trim()) newErrors[f.key] = true
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) onGenerate(values)
  }

  const handleReset = () => {
    setValues(DEFAULT_VALUES)
    setErrors({})
  }

  return (
    <form className="rice-pot-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">Configure Your Prompt</h2>
        <p className="form-desc">Fill in all 7 RICE-POT components to generate a tailored test strategy</p>
      </div>

      <div className="fields-grid">
        {FIELDS.map(field => (
          <div
            key={field.key}
            className={`field-card ${errors[field.key] ? 'field-error' : ''}`}
            style={{ '--accent': field.color }}
          >
            <div className="field-label-row">
              <label className="field-label" style={{ color: field.color }}>
                {field.label}
              </label>
              <span className="field-hint">{field.hint}</span>
            </div>
            <textarea
              className="field-input"
              rows={field.rows}
              placeholder={field.placeholder}
              value={values[field.key]}
              onChange={e => update(field.key, e.target.value)}
              disabled={isLoading}
            />
            {errors[field.key] && <span className="field-error-msg">Required field</span>}
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={handleReset} disabled={isLoading}>
          Reset to Demo
        </button>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner" />
              Generating with Groq AI...
            </>
          ) : (
            <>⚡ Generate Test Strategy</>
          )}
        </button>
      </div>
    </form>
  )
}
