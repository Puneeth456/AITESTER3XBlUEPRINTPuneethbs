# Task Plan — RICE-POT Test Strategy Generator

## North Star
Build a React UI where QA engineers fill in RICE-POT fields → Groq AI generates a professional test strategy + test cases → optionally push to JIRA.

## Phases

### Phase 1: Blueprint ✅
- [x] gemini.md (Project Constitution) defined
- [x] Data schemas confirmed
- [x] Behavioral rules set

### Phase 2: Link ✅
- [x] Groq API key present in .env
- [x] JIRA credentials present in .env
- [x] Vercel token provided by user

### Phase 3: Architect (In Progress)
- [ ] Scaffold Vite React app
- [ ] Layer 1: architecture/sop.md
- [ ] Layer 3: src/tools/groqClient.js
- [ ] Layer 3: src/tools/jiraClient.js
- [ ] Layer 2: src/components/Header.jsx
- [ ] Layer 2: src/components/RicePotForm.jsx
- [ ] Layer 2: src/components/TestStrategyOutput.jsx
- [ ] Layer 2: src/components/JiraPanel.jsx
- [ ] src/App.jsx (orchestrator)

### Phase 4: Stylize
- [ ] Dark-tech CSS theme
- [ ] RICE-POT color-coded badges
- [ ] Responsive layout

### Phase 5: Trigger
- [ ] npm install
- [ ] npm run build
- [ ] vercel deploy --prod
