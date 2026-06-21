const BASE_URL = import.meta.env.VITE_JIRA_BASE_URL
const EMAIL = import.meta.env.VITE_JIRA_EMAIL
const TOKEN = import.meta.env.VITE_JIRA_API_TOKEN

function authHeader() {
  return 'Basic ' + btoa(`${EMAIL}:${TOKEN}`)
}

export async function getJiraProjects() {
  const res = await fetch(`${BASE_URL}/rest/api/3/project/search?maxResults=50`, {
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error(`JIRA projects fetch failed (${res.status}). Check JIRA credentials in .env.`)
  const data = await res.json()
  return data.values ?? []
}

export async function createJiraTicket(projectKey, summary, description, priority = 'Medium') {
  const body = {
    fields: {
      project: { key: projectKey },
      summary,
      description: {
        type: 'doc',
        version: 1,
        content: [{ type: 'paragraph', content: [{ type: 'text', text: description }] }],
      },
      issuetype: { name: 'Task' },
      priority: { name: priority },
    },
  }

  const res = await fetch(`${BASE_URL}/rest/api/3/issue`, {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg = err?.errors ? Object.values(err.errors).join(', ') : `JIRA error ${res.status}`
    throw new Error(msg)
  }
  return res.json()
}

export async function pushTestCasesToJira(projectKey, testCases) {
  const results = []
  for (const tc of testCases) {
    const desc = `Preconditions: ${tc.preconditions}\n\nSteps:\n${tc.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nExpected Result: ${tc.expected}\n\nPriority: ${tc.priority} | Type: ${tc.type}`
    const created = await createJiraTicket(projectKey, `[${tc.id}] ${tc.title}`, desc, tc.priority)
    results.push({ id: tc.id, key: created.key, url: `${BASE_URL}/browse/${created.key}` })
  }
  return results
}
