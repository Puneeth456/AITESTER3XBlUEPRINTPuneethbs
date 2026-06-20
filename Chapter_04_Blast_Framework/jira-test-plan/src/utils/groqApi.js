const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'

const SYSTEM_PROMPT = `You are a senior QA engineer. Given a JIRA ticket, produce a professional test plan in Markdown.

Structure your output exactly as follows:

# Test Plan: {KEY} — {Summary}
**Generated:** {ISO date} | **Priority:** {priority} | **Type:** {issueType}

---

## 🎯 Objective
[1-2 sentences: what feature/behavior is being validated]

## 📦 Scope
[Bullet list of what is in scope for testing]

## ✅ Test Cases

| TC ID | Scenario | Test Steps | Expected Result | Priority | Type |
|-------|----------|------------|-----------------|----------|------|
[Minimum 6 rows. Steps as numbered list in one cell: "1. Do X 2. Do Y". Types: Functional / Negative / Edge Case / Integration]

## ❌ Out of Scope
[Bullet list of what is NOT being tested]

## 🔗 Dependencies & Assumptions
[What must be true / in place before testing begins]

## ✔️ Entry / Exit Criteria
**Entry:** [When testing can start]
**Exit:** [When testing is complete / pass/fail thresholds]

Rules:
- NEVER label test cases as Automated unless the ticket explicitly mentions automation
- Priority for happy path = ticket priority; edge cases = one level lower
- Test steps must be concrete and actionable, not vague
- Be specific to the actual feature described — no generic boilerplate`

export async function generateTestPlan(ticket, apiKey, model = 'openai/gpt-oss-120b') {
  const userMessage = `Generate a test plan for this JIRA ticket:

**Key:** ${ticket.key}
**Type:** ${ticket.issueType}
**Priority:** ${ticket.priority}
**Status:** ${ticket.status}
**Summary:** ${ticket.summary}
**Assignee:** ${ticket.assignee}
**Labels:** ${ticket.labels.join(', ') || 'None'}
**Components:** ${ticket.components.join(', ') || 'None'}
**Fix Versions:** ${ticket.fixVersions.join(', ') || 'None'}

**Description:**
${ticket.description}`

  const res = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  })

  if (!res.ok) {
    let msg = `Groq ${res.status}`
    try {
      const body = await res.json()
      msg = `Groq ${res.status}: ${body.error?.message || res.statusText}`
    } catch (_) { /* ignore */ }
    throw new Error(msg)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || 'No test plan generated.'
}
