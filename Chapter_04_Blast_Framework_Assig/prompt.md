# Prompt Log — Test Strategy & Test Case Generator

All prompts used in this project, in order.

---

## Groq System Prompt

Used in `Test_Strategy/src/tools/groqClient.js` — injected as the `system` message.

```
You are {role}. Communicate in a {tone} style.
Constraints: {parameters}
You generate production-quality QA test strategy documents.
```

**Model:** `llama-3.3-70b-versatile`
**Max tokens:** 4096
**Temperature:** 0.25

---

## Groq User Prompt Template

The full prompt built from the 7 form fields and sent as the `user` message:

```
## CONTEXT
{context}

## INSTRUCTIONS
{instructions}

## EXAMPLE FORMAT
{example}

## REQUIRED OUTPUT
{output}

Generate a complete test strategy following these specifications.
Return ONLY a valid JSON object (no markdown fences, no commentary outside the JSON) with this exact shape:
{
  "testStrategy": "<full markdown test strategy document with sections: Overview, Scope, Approach, Test Types, Entry/Exit Criteria, Risks, Tools>",
  "testCases": [
    {
      "id": "TC-001",
      "title": "<descriptive title>",
      "preconditions": "<what must be true before test>",
      "steps": ["<step 1>", "<step 2>", "<step 3>"],
      "expected": "<expected result>",
      "priority": "High",
      "type": "Functional"
    }
  ]
}
Generate minimum 5 test cases. Priority values: High|Medium|Low. Type values: Functional|Regression|Security|Performance|Negative|API|UI.
```

---

## Field Mapping (7 Form Fields → Prompt)

| Field | Role in Prompt | Example Value |
|-------|---------------|---------------|
| **Role** | `system` message persona | `Expert QA Automation Engineer with 10 years of enterprise testing experience` |
| **Instructions** | Core task commands in `user` message | `1. Generate test cases for the login flow 2. Cover happy path, negative, and edge cases` |
| **Context** | Background info block in `user` message | `Salesforce CRM Login Page. Users authenticate via email/password or SSO. Rate limiting: 5 failed attempts → 15-min lockout.` |
| **Example** | Few-shot format guide in `user` message | `TC-001: Valid Login\nPreconditions: User exists in DB\nSteps: ...` |
| **Parameters** | Quality constraints appended to `system` | `Production-level quality. Follow ISTQB standards. All test cases must be atomic and independent.` |
| **Output** | Exact artifacts specification in `user` | `Full Test Strategy doc + min 5 test cases: 2 Functional, 1 Negative, 1 Security, 1 Regression` |
| **Tone** | Style modifier in `system` message | `Technical, precise, enterprise-grade. Use formal QA terminology.` |

---

## JIRA Push Flow

After generation, test cases can be pushed to JIRA via `Test_Strategy/src/tools/jiraClient.js`.

Each test case is mapped to a JIRA Task ticket:

```
Summary:  [TC-001] Valid Login with Correct Credentials
Priority: High
Type:     Task

Description (ADF format):
  Preconditions: User exists in DB
  
  Steps:
  1. Navigate to /login
  2. Enter valid credentials
  3. Click Submit
  
  Expected Result: Redirect to /dashboard with JWT cookie set
  
  Priority: High | Type: Functional
```

**JIRA API:** REST v3 (`/rest/api/3/issue`)
**Auth:** Basic (email:token base64)
**Project:** User-selected from live JIRA project list

---

## Demo Configuration (Pre-filled in UI)

**Role:**
```
Expert QA Automation Engineer with 10 years of enterprise testing experience
```

**Instructions:**
```
1. Generate test cases for the login flow
2. Cover happy path, negative, and edge cases
3. Include API-level and UI-level tests
4. Mark each test with priority and type
```

**Context:**
```
Salesforce CRM Login Page. Users authenticate via email/password or SSO.
The page has rate limiting (5 failed attempts → 15-min lockout).
Backend: Node.js + JWT. DB: PostgreSQL.
```

**Example:**
```
TC-001: Valid Login
Preconditions: User exists in DB
Steps: 1. Navigate to /login 2. Enter valid credentials 3. Click Submit
Expected: Redirect to /dashboard with JWT cookie set
```

**Parameters:**
```
Production-level quality. Zero bad practices. Follow ISTQB standards.
All test cases must be atomic and independent. No duplicate coverage.
```

**Output:**
```
A full Test Strategy document + minimum 5 test cases covering:
2 Functional, 1 Negative, 1 Security, 1 Regression.
Include test case ID, title, steps, expected result, priority.
```

**Tone:**
```
Technical, precise, enterprise-grade. Use formal QA terminology.
```

---

## Session History

### Session 1 — Initial Build
Built complete Vite + React app following BLAST framework (5 phases).

### Session 2 — UI Rebranding
Removed RICE-POT and BLAST Framework branding from UI. Rebranded as "Test Strategy & Test Case Generator".

### Session 3 — Deployment
Deployed to Vercel: https://test-strategy-puneeth-bs-projects4.vercel.app
Project name on Vercel: `test-strategy`
