# Prompt Log — BLAST Test Plan Generator

All prompts used in this project, in order.

---

## Session 1 — Phase 0 + Phase 1 Bootstrap

**User:**
> I want to follow the blast framework phase 0 and phase 1 and start asking me the question which you want to based on objective

**Result:** Protocol 0 initialized (task_plan.md, findings.md, progress.md, gemini.md). Phase 1 discovery questions asked.

---

## Session 2 — App Build

**User:**
> Can you please read the file of B.L.A.S.T.md again and my objective again, and create a lightweight React application which will take the Jira configuration, Jira email ID, Jira token, my Jira base URL. GROQ connection API details in the settings and take the JIRA ID and create the TestPlan automatically. You will be able to create a test plan based on the by fetching the SCRUM-6 automatically.
> GROQ - openai/gpt-oss-120b (FREE). Fetch JIRA → email, token, JIRA

**Groq API Key provided:** gsk_Ivzrb... (stored in .env.local)

**Result:**
- Vite + React app scaffolded
- Dynamic JIRA proxy via http-proxy-middleware (Vite plugin, handles CORS)
- JIRA REST API v3 integration with ADF parser
- Groq completions API integration (model: openai/gpt-oss-120b)
- SettingsPanel: JIRA + Groq config
- TestPlanDisplay: copy/download .md
- App state machine: idle → fetching → generating → done

---

## Session 3 — Ticket Key Cleanup

**User:**
> Pls update only for the jira key SCRUM-6 and delete the VWO-48

**Result:** Removed VWO-48 reference from App.jsx placeholder and task_plan.md.

---

## Session 4 — Auto-Generate on Input + URL Sync

**User:**
> Make this as unique test plan generator whatever the JIRA ID should be text box and as soon as it is entered it should give the test plan and also update the url http://localhost:5173/

**Result:**
- Removed Generate button
- Ticket input auto-generates on 700ms debounce after valid JIRA key typed
- Enter key triggers immediate generation (bypasses debounce)
- URL synced to `?ticket=SCRUM-6` via `window.history.replaceState`
- App reads ticket key from URL on load (shareable links)
- Input formats to UPPERCASE on type
- Validation: only triggers for `PROJECT-NUMBER` format (regex `/^[A-Z]+-\d+$/`)

---

## Session 5 — Submit Button + URL on Submit

**User:**
> Also Once the jira Id is entered give the option to submit (create submit button), update the prompt.md file and also update the url

**Result:**
- Removed auto-debounce (700ms) — replaced with explicit user intent via button
- Submit button slides in (animated) when valid JIRA key format detected
- Button hidden/disabled when input is empty or invalid format
- Enter key still triggers generation
- URL updated via `window.history.pushState` on submit (not on every keystroke)
- URL cleared (`?ticket` param removed) when user hits "← New Ticket"
- Button shows inline spinner while loading
- Arrow `→` animates right on hover

---

## Session 7 — Vercel Production Deploy

**User:**
> pls use the vercel cli and push the project to the Test Plan Buddy

**Changes made:**
- `api/jira.js` — Vercel serverless function: proxies JIRA REST API v3 server-side (solves CORS in production)
- `vercel.json` — build config (`npm run build`, output `dist`, framework `vite`)
- `jiraApi.js` — prod/dev split: `import.meta.env.PROD` → `/api/jira?ticket=` in production, Vite proxy in dev
- All 4 env vars set on Vercel production: `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`, `VITE_GROQ_API_KEY`

**Deployment:**
- Project: `puneeth-bs-projects4/test-plan-buddy`
- Production URL: https://test-plan-buddy.vercel.app
- Inspect: https://vercel.com/puneeth-bs-projects4/test-plan-buddy

---

## Session 6 — Model Change + Syntax Fix + prompt.md Save

**User:**
> Update the prompt.md file and save the changes

**Changes detected in App.jsx (user edit):**
- Default Groq model changed from `openai/gpt-oss-120b` to `llama3-70b-8192`
- Syntax error on line 16 (`groqModel: 'groqModel: 'llama3-70b-8192'`) → fixed to `groqModel: 'llama3-70b-8192'`

**Result:**
- App.jsx line 16 syntax error fixed
- SettingsPanel.jsx: `llama3-70b-8192` added as first/default option in model dropdown
- prompt.md updated and saved

---

## Groq System Prompt (used in groqApi.js)

```
You are a senior QA engineer. Given a JIRA ticket, produce a professional test plan in Markdown.

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
[Minimum 6 rows. Steps as numbered list in one cell. Types: Functional / Negative / Edge Case / Integration]

## ❌ Out of Scope
[Bullet list of what is NOT being tested]

## 🔗 Dependencies & Assumptions
[What must be true / in place before testing begins]

## ✔️ Entry / Exit Criteria
**Entry:** [When testing can start]
**Exit:** [When testing is complete / pass/fail thresholds]

Rules:
- NEVER label test cases as Automated unless ticket explicitly mentions automation
- Priority for happy path = ticket priority; edge cases = one level lower
- Test steps must be concrete and actionable
- Be specific to the actual feature described — no generic boilerplate
```

---

## JIRA User Message Template (sent per ticket)

```
Generate a test plan for this JIRA ticket:

Key: {key}
Type: {issueType}
Priority: {priority}
Status: {status}
Summary: {summary}
Assignee: {assignee}
Labels: {labels}
Components: {components}
Fix Versions: {fixVersions}

Description:
{description}
```
