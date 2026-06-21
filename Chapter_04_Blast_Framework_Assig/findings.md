# Findings — RICE-POT Test Strategy Generator

## Stack Decision
- Vite + React 18 (lightweight, fast HMR)
- Plain CSS (no Tailwind — per user: lightweight)
- Groq API (llama-3.3-70b-versatile) for AI generation
- JIRA REST API v3 for ticket creation
- Vercel for deployment

## Env Variables Available
- VITE_GROQ_API_KEY ✅
- VITE_JIRA_BASE_URL ✅ (https://gowdapuneeth1991.atlassian.net)
- VITE_JIRA_EMAIL ✅
- VITE_JIRA_API_TOKEN ✅

## RICE-POT Field Mapping → Groq Prompt
R = Role → system prompt persona
I = Instructions → task commands
C = Context → background context block
E = Example → few-shot example
P = Parameters → constraints injected as rules
O = Output → output format specification
T = Tone → style modifier

## JIRA Constraint
- JIRA Cloud REST API v3
- Auth: Basic (email:token base64)
- Issue type: "Task" (default project type)
- Project key: must be in user's JIRA — defaulting to "QA"
