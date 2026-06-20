export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { ticket } = req.query
  if (!ticket) return res.status(400).json({ error: 'ticket param required' })

  const baseUrl = (process.env.JIRA_BASE_URL || '').replace(/\/$/, '')
  const email = process.env.JIRA_EMAIL
  const token = process.env.JIRA_API_TOKEN

  if (!baseUrl || !email || !token) {
    return res.status(500).json({ error: 'JIRA server env vars not configured (JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN)' })
  }

  const auth = Buffer.from(`${email}:${token}`).toString('base64')

  try {
    const response = await fetch(`${baseUrl}/rest/api/3/issue/${ticket}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json',
      },
    })

    const data = await response.json()
    if (!response.ok) return res.status(response.status).json(data)
    res.status(200).json(data)
  } catch (err) {
    res.status(502).json({ error: err.message })
  }
}
