# Test Plan Buddy

AI-powered test plan generator — fetch any JIRA ticket and generate a professional test plan in seconds using Groq AI.

**Live:** https://test-plan-buddy.vercel.app

---

## What It Does

1. Enter your JIRA ticket ID (e.g. `SCRUM-6`)
2. Click **Generate Test Plan** or press **Enter**
3. Groq AI generates a structured test plan with objective, scope, test cases table, and exit criteria
4. Copy as Markdown or download as `.md` file

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Vite + React 19 |
| AI | Groq API — `llama-3.3-70b-versatile` |
| JIRA | REST API v3 (ADF format parsed) |
| Dev proxy | Vite custom plugin (`http-proxy-middleware`) |
| Prod proxy | Vercel Serverless Function (`api/jira.js`) |
| Deploy | Vercel |

---

## Local Setup

### 1. Install

```bash
cd jira-test-plan
npm install
```

### 2. Configure `.env.local`

```env
VITE_GROQ_API_KEY=gsk_...
VITE_JIRA_BASE_URL=https://yourorg.atlassian.net
VITE_JIRA_EMAIL=you@company.com
VITE_JIRA_API_TOKEN=ATATT3...
```

Get your JIRA token: **Account Settings → Security → API tokens**
Get your Groq key: **console.groq.com → API Keys**

### 3. Run

```bash
npm run dev
# → http://localhost:5173
```

---

## Project Structure

```
jira-test-plan/
├── api/
│   └── jira.js              # Vercel serverless function (JIRA proxy)
├── src/
│   ├── App.jsx              # State machine: idle → fetching → generating → done
│   ├── App.css              # Styles
│   ├── components/
│   │   ├── SettingsPanel.jsx    # JIRA + Groq config form
│   │   └── TestPlanDisplay.jsx  # Output: copy/download
│   └── utils/
│       ├── jiraApi.js       # JIRA REST API v3 (dev proxy / prod serverless)
│       ├── groqApi.js       # Groq completions API
│       └── adfParser.js     # Atlassian Document Format → plain text
├── .env.local               # Local secrets (git-ignored)
├── vercel.json              # Vercel build config
└── vite.config.js           # Dev server + dynamic JIRA CORS proxy
```

---

## BLAST Framework

Built following the **B.L.A.S.T** protocol from Chapter 04:

| Phase | Status | Artifact |
|-------|--------|----------|
| Protocol 0 — Initialize | Done | `task_plan.md`, `findings.md`, `progress.md`, `gemini.md` |
| Phase 1 — Blueprint | Done | Discovery answered, schema in `gemini.md` |
| Phase 2 — Link & Architect | Done | App running, JIRA + Groq connected |
| Phase 4 — Stylize | Done | Professional UI, copy/download |
| Phase 5 — Trigger (Deploy) | Done | https://test-plan-buddy.vercel.app |

---

## Environment Variables

### Local (`.env.local` — git-ignored)

| Variable | Description |
|----------|-------------|
| `VITE_GROQ_API_KEY` | Groq API key |
| `VITE_JIRA_BASE_URL` | JIRA base URL (pre-fills form) |
| `VITE_JIRA_EMAIL` | JIRA email (pre-fills form) |
| `VITE_JIRA_API_TOKEN` | JIRA token (pre-fills form) |

### Vercel Production (server-side, never in client bundle)

| Variable | Description |
|----------|-------------|
| `JIRA_BASE_URL` | JIRA base URL for serverless proxy |
| `JIRA_EMAIL` | JIRA email for serverless proxy |
| `JIRA_API_TOKEN` | JIRA API token for serverless proxy |
| `VITE_GROQ_API_KEY` | Groq API key (build-time inject) |
