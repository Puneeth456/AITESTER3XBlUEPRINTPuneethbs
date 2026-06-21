# AITESTER3XBlUEPRINT

AI-powered test automation blueprint — foundation setup for building, testing, and orchestrating workflows with n8n.

## Getting Started

### Prerequisites
- Node.js
- n8n (local installation)

### Setup
1. Clone this repository.
2. Follow the Chapter 01 Foundation guide to get started.

## Structure

| Chapter | Description |
|---------|-------------|
| Chapter_01_Foundation | Installation and core setup (Node.js + n8n) |
| Chapter_02_LLM | Local LLM setup (Ollama, LM Studio), AI tools comparison, open vs closed source models |
| Chapter_03_Prompt | Prompt engineering, anti-hallucination rules, test case generator, Selenium framework, prompt templates |
| Chapter_04_Blast_Framework_Assig | BLAST Framework — AI Test Strategy & Test Case Generator (React + Groq + JIRA) |

## Chapter 03 — Projects

| Project | Tech Stack | Description |
|---------|-----------|-------------|
| Project_01_Test_Case_Generator | RICE-POT prompt | AI-generated test case prompt template |
| Project_02_Selenium_Framework | Java · Selenium · TestNG · Maven | Page Object Model UI automation framework for Salesforce |
| Project_03_API_Rest_Framework | Python · Playwright API · pytest · Pydantic | REST API testing framework targeting JSONPlaceholder |

## Project 03 — Python API Testing Framework

### Prerequisites
- Python 3.11+
- pip

### Setup & Run

```bash
cd Chapter_03_Prompt/Project_03_API_Rest_Framework/Output_Framework

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers (API-only, no browser needed — but required for the SDK)
playwright install

# Run all tests
pytest

# Run smoke tests only
pytest -m smoke

# Run regression tests only
pytest -m regression

# Run with HTML report
pytest --html=report.html --self-contained-html
```

### Framework Architecture

```
Output_Framework/
├── requirements.txt          # playwright, pytest, pydantic, pytest-html
├── pytest.ini                # testpaths, markers (smoke / regression)
├── conftest.py               # session-scoped APIRequestContext fixture
├── config/
│   └── settings.py           # BASE_URL + TIMEOUT from env vars
├── api/
│   ├── base_client.py        # BaseAPIClient: get/post/put/patch/delete
│   ├── users_client.py       # /users endpoint methods
│   └── posts_client.py       # /posts endpoint methods
├── models/
│   ├── user.py               # Pydantic User model
│   └── post.py               # Pydantic Post model
├── tests/
│   ├── conftest.py           # client fixtures (users_client, posts_client)
│   ├── test_users.py         # 5 CRUD tests: GET all, GET one, POST, PUT, DELETE
│   └── test_posts.py         # 5 CRUD tests: GET all, GET one, POST, PUT, DELETE
└── utils/
    └── assertions.py         # assert_status(), assert_schema()
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `API_BASE_URL` | `https://jsonplaceholder.typicode.com` | Target API base URL |
| `API_TIMEOUT` | `30000` | Request timeout in milliseconds |

### RICE-POT Prompt

The framework was generated using the RICE-POT prompt engineering framework.
See [`Chapter_03_Prompt/Project_03_API_Rest_Framework/RICE_POT.md`](Chapter_03_Prompt/Project_03_API_Rest_Framework/RICE_POT.md) for the full structured prompt.

---

## Chapter 04 — Test Strategy & Test Case Generator

A full-stack AI application built using the **BLAST Framework** (Blueprint → Link → Architect → Stylize → Trigger).

**Live App:** https://rice-pot-test-strategy.vercel.app

### Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Vite + React 18, plain CSS |
| AI | Groq API — `llama-3.3-70b-versatile` |
| Issue Tracker | JIRA REST API v3 |
| Deployment | Vercel |

### Features
- 7-field prompt form (Role, Instructions, Context, Example, Parameters, Output, Tone)
- Groq AI generates a full **Test Strategy document** + structured **Test Cases**
- Expandable test case cards — color-coded by type (Functional, Security, Performance, etc.)
- One-click **Push to JIRA** — fetches your live projects, creates tickets
- Copy markdown export

### Setup & Run Locally

```bash
cd Chapter_04_Blast_Framework_Assig/Test_Strategy

# Install dependencies
npm install

# Add .env file
cp .env.example .env
# Fill in: VITE_GROQ_API_KEY, VITE_JIRA_BASE_URL, VITE_JIRA_EMAIL, VITE_JIRA_API_TOKEN

# Start dev server
npm run dev
# → http://localhost:3000
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GROQ_API_KEY` | Groq API key from console.groq.com |
| `VITE_JIRA_BASE_URL` | e.g. `https://yourorg.atlassian.net` |
| `VITE_JIRA_EMAIL` | JIRA account email |
| `VITE_JIRA_API_TOKEN` | JIRA API token from id.atlassian.com |

### Project Structure

```
Chapter_04_Blast_Framework_Assig/
├── Test_Strategy/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx           # App header
│   │   │   ├── RicePotForm.jsx      # 7-field prompt form
│   │   │   ├── TestStrategyOutput.jsx  # Strategy + test case tabs
│   │   │   └── JiraPanel.jsx        # JIRA push modal
│   │   ├── tools/
│   │   │   ├── groqClient.js        # Groq AI integration
│   │   │   └── jiraClient.js        # JIRA REST API integration
│   │   ├── App.jsx                  # State orchestrator
│   │   ├── index.css                # Dark-tech CSS theme
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── vercel.json
├── architecture/
│   └── sop.md                       # BLAST Layer 1 — SOP
├── gemini.md                        # Project Constitution
├── task_plan.md                     # BLAST phases checklist
├── findings.md                      # Research & decisions
├── progress.md                      # Session log
└── prompt.md                        # Groq prompt templates
```

### BLAST Framework Phases

| Phase | Status | Artifact |
|-------|--------|----------|
| B — Blueprint | ✅ | gemini.md, task_plan.md, findings.md |
| L — Link | ✅ | Groq + JIRA credentials verified |
| A — Architect | ✅ | 3-layer: SOPs → components → tools |
| S — Stylize | ✅ | Dark-tech CSS, neon accents, responsive |
| T — Trigger | ✅ | Vercel production deployment |

### Prompt Reference

See [`Chapter_04_Blast_Framework_Assig/prompt.md`](Chapter_04_Blast_Framework_Assig/prompt.md) for the full Groq prompt templates, field mapping, and JIRA ticket format.
