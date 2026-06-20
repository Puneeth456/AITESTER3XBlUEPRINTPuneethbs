import { parseAdf } from './adfParser'

export async function fetchJiraTicket({ baseUrl, email, token, ticketKey }) {
  if (import.meta.env.PROD) {
    // Production: Vercel serverless function handles CORS + auth server-side
    const res = await fetch(`/api/jira?ticket=${encodeURIComponent(ticketKey)}`)
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(`JIRA ${res.status}: ${err.errorMessages?.join(', ') || err.error || res.statusText}`)
    }
    const data = await res.json()
    return normalizeTicket(data)
  }

  // Development: Vite dev proxy (dynamic CORS bypass)
  const cleanBase = baseUrl.replace(/\/$/, '')
  const auth = btoa(`${email}:${token}`)

  const res = await fetch(`/jira-api/rest/api/3/issue/${ticketKey}`, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
      'x-jira-target': cleanBase,
    },
  })

  if (!res.ok) {
    let msg = `JIRA ${res.status}`
    try {
      const body = await res.json()
      msg = `JIRA ${res.status}: ${body.errorMessages?.join(', ') || body.message || res.statusText}`
    } catch (_) { /* ignore */ }
    throw new Error(msg)
  }

  const data = await res.json()
  return normalizeTicket(data)
}

function normalizeTicket(raw) {
  const f = raw.fields
  return {
    key: raw.key,
    summary: f.summary || 'No summary',
    description: f.description ? parseAdf(f.description) : 'No description provided.',
    priority: f.priority?.name || 'Medium',
    status: f.status?.name || 'Unknown',
    issueType: f.issuetype?.name || 'Story',
    labels: f.labels || [],
    assignee: f.assignee?.displayName || 'Unassigned',
    reporter: f.reporter?.displayName || 'Unknown',
    created: f.created,
    updated: f.updated,
    components: (f.components || []).map(c => c.name),
    fixVersions: (f.fixVersions || []).map(v => v.name),
  }
}
