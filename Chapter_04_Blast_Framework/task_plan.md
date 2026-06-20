# Task Plan — JIRA Test Plan Generator

## Objective
React app: enter JIRA config + ticket key → fetch ticket via JIRA API → generate test plan via Groq → display + download

## Phases
- [x] Phase 0: Initialization (Protocol)
- [x] Phase 1: Blueprint — Discovery answered, schema in gemini.md
- [x] Phase 2: App built — Vite + React, JIRA proxy, Groq integration
- [ ] Phase 3: User testing with real credentials
- [ ] Phase 4: Refinement based on test results

## App Structure
```
jira-test-plan/
├── .env.local              ← VITE_GROQ_API_KEY (pre-loaded)
├── vite.config.js          ← Dynamic JIRA proxy plugin
├── src/
│   ├── App.jsx             ← State machine (idle→fetching→generating→done)
│   ├── App.css             ← Professional UI styles
│   ├── components/
│   │   ├── SettingsPanel.jsx   ← JIRA + Groq config form
│   │   └── TestPlanDisplay.jsx ← Output with copy/download
│   └── utils/
│       ├── jiraApi.js      ← JIRA REST API v3 fetch + ADF parse
│       ├── groqApi.js      ← Groq completions API
│       └── adfParser.js    ← Atlassian Document Format → text
```

## Usage
1. Run: `npm run dev` inside jira-test-plan/
2. Open http://localhost:5173
3. Fill: JIRA Base URL, email, API token, Groq key (pre-filled)
4. Enter ticket key (e.g. SCRUM-6)
5. Click Generate Test Plan

## Status
> ✅ RUNNING — http://localhost:5173
