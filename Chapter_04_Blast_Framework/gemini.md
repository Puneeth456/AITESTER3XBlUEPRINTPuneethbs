# Project Constitution — JIRA Test Plan Generator

## Discovery Answers (Phase 1)

| Question | Answer |
|----------|--------|
| North Star | React app: input JIRA credentials → fetch SCRUM-6 → display structured test plan |
| Integrations | JIRA Cloud REST API v3 (user provides base URL, email, token via UI) |
| Source of Truth | JIRA ticket fields: summary, description, priority, labels, acceptance criteria |
| Delivery Payload | React UI renders test plan; user can copy as Markdown or download .md file |
| Behavioral Rules | Test plan format: objective, scope, test cases table, out-of-scope. No fake "automated" labels. Neutral tone. |

---

## Data Schemas

### INPUT — JiraConfig
```json
{
  "baseUrl": "https://yourorg.atlassian.net",
  "email": "user@example.com",
  "token": "ATATT3...",
  "ticketKey": "SCRUM-6"
}
```

### INPUT — JiraIssue (from JIRA REST API v3)
```json
{
  "key": "SCRUM-6",
  "fields": {
    "summary": "string",
    "description": { "type": "doc", "content": [] },
    "priority": { "name": "High" },
    "labels": ["string"],
    "status": { "name": "In Progress" },
    "assignee": { "displayName": "string" },
    "issuetype": { "name": "Story" }
  }
}
```

### OUTPUT — TestPlan
```json
{
  "ticketKey": "SCRUM-6",
  "title": "string",
  "objective": "string",
  "scope": ["string"],
  "testCases": [
    {
      "id": "TC-01",
      "scenario": "string",
      "steps": ["string"],
      "expectedResult": "string",
      "priority": "High | Medium | Low",
      "type": "Functional | Negative | Edge Case"
    }
  ],
  "outOfScope": ["string"],
  "generatedAt": "ISO8601"
}
```

---

## Behavioral Rules
- NEVER label test cases as "Automated" unless explicitly stated
- ALWAYS generate minimum 3 test cases per ticket
- Priority of test cases inherits from JIRA ticket priority
- Description parsing: handle both plain text and ADF (Atlassian Document Format)
- Acceptance Criteria lines (prefixed with AC, Given/When/Then, or numbered) → direct test cases

## Architectural Invariants
- All JIRA calls use `Authorization: Basic base64(email:token)`
- No secrets stored in localStorage or code — only in-memory React state
- ADF parser is pure function, no side effects
- Test plan generator is deterministic given same JIRA input
