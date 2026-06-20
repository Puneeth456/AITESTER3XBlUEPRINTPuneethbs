# Objective — BLAST Test Plan Generator

## Goal
Lightweight React application that fetches any JIRA ticket and generates a professional AI-powered test plan.

## App URL
http://localhost:5173

## Configuration Required
| Field | Description |
|-------|-------------|
| JIRA Base URL | `https://yourorg.atlassian.net` |
| JIRA Email | Your Atlassian account email |
| JIRA API Token | Account Settings → Security → API tokens |
| Groq API Key | console.groq.com → API Keys (pre-loaded in .env.local) |
| Groq Model | `llama3-70b-8192` (default, FREE) |

## How It Works
1. Open http://localhost:5173
2. Fill JIRA + Groq config in Settings panel
3. Type any JIRA ticket ID (e.g. `SCRUM-6`) in the input box
4. Click **Generate Test Plan** or press **Enter**
5. URL updates to `http://localhost:5173/?ticket=SCRUM-6`
6. Test plan generated via Groq AI and displayed
7. Copy as Markdown or download as `.md` file

## Tech Stack
- **Frontend:** Vite + React (lightweight, no framework)
- **AI:** Groq API — model `llama3-70b-8192` (FREE tier)
- **JIRA:** REST API v3 — ADF format parsed to plain text
- **Proxy:** Vite dev server plugin (dynamic CORS proxy for JIRA)

## BLAST Framework Phases Completed
- [x] Protocol 0 — Memory initialized (task_plan.md, findings.md, progress.md, gemini.md)
- [x] Phase 1 — Blueprint: discovery answered, JSON schema defined
- [x] Phase 2 — Build: app running at http://localhost:5173
- [ ] Phase 3 — Test with real JIRA credentials
