# Project Constitution — RICE-POT Test Strategy Generator

## Data Schemas

### Input Payload
```json
{
  "role": "string — AI persona (e.g. Senior QA Automation Engineer)",
  "instructions": "string — step-by-step test commands and constraints",
  "context": "string — system/feature background info",
  "example": "string — sample test case or code snippet",
  "parameters": "string — quality/accuracy/style constraints",
  "output": "string — exact artifacts to produce",
  "tone": "string — communication style (e.g. Technical, Formal)"
}
```

### Output Payload
```json
{
  "testStrategy": "string — full markdown test strategy document",
  "testCases": [
    {
      "id": "TC-001",
      "title": "string",
      "preconditions": "string",
      "steps": ["string"],
      "expected": "string",
      "priority": "High|Medium|Low",
      "type": "Functional|Regression|Security|Performance"
    }
  ],
  "jiraTickets": [
    {
      "summary": "string",
      "description": "string",
      "issuetype": "Test",
      "priority": "string"
    }
  ]
}
```

## Behavioral Rules
- Never expose API keys in UI or logs
- Groq model: llama-3.3-70b-versatile
- Max tokens per generation: 4096
- JIRA ticket type: Task (Test)
- All RICE-POT fields are required before generation
- Error messages must be user-friendly, not raw API errors

## Architectural Invariants
- Layer 1 (architecture/): SOPs define logic — update SOP before code
- Layer 2 (components/): Navigation/routing — call tools in order
- Layer 3 (tools/): Deterministic API scripts — no business logic here
- .env holds all secrets — never hardcode
