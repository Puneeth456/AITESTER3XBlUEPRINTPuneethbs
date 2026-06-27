# AITESTER3XBlUEPRINT

AI-powered test automation blueprint â€” foundation setup for building, testing, and orchestrating workflows with n8n.

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
| Chapter_04_Blast_Framework_Assig | BLAST Framework â€” AI Test Strategy & Test Case Generator (React + Groq + JIRA) |
| Chapter_05_AI_AgentsN8N | AI-powered n8n agents â€” QA Buddy, JIRA Agent, PRD Test Case Generator (Groq + Qwen + JIRA + Google Sheets) |
| Project_Job_Tracker | Job Application Kanban Tracker - React + Vite + IndexedDB drag-and-drop Kanban board |
| Chapter_06_Branding | Content pipeline - n8n AI agents for social scheduling, LinkedIn branding prompts, and Python content dashboard |

## Chapter 03 â€” Projects

| Project | Tech Stack | Description |
|---------|-----------|-------------|
| Project_01_Test_Case_Generator | RICE-POT prompt | AI-generated test case prompt template |
| Project_02_Selenium_Framework | Java Â· Selenium Â· TestNG Â· Maven | Page Object Model UI automation framework for Salesforce |
| Project_03_API_Rest_Framework | Python Â· Playwright API Â· pytest Â· Pydantic | REST API testing framework targeting JSONPlaceholder |

## Project 03 â€” Python API Testing Framework

### Prerequisites
- Python 3.11+
- pip

### Setup & Run

```bash
cd Chapter_03_Prompt/Project_03_API_Rest_Framework/Output_Framework

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers (API-only, no browser needed â€” but required for the SDK)
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
â”œâ”€â”€ requirements.txt          # playwright, pytest, pydantic, pytest-html
â”œâ”€â”€ pytest.ini                # testpaths, markers (smoke / regression)
â”œâ”€â”€ conftest.py               # session-scoped APIRequestContext fixture
â”œâ”€â”€ config/
â”‚   â””â”€â”€ settings.py           # BASE_URL + TIMEOUT from env vars
â”œâ”€â”€ api/
â”‚   â”œâ”€â”€ base_client.py        # BaseAPIClient: get/post/put/patch/delete
â”‚   â”œâ”€â”€ users_client.py       # /users endpoint methods
â”‚   â””â”€â”€ posts_client.py       # /posts endpoint methods
â”œâ”€â”€ models/
â”‚   â”œâ”€â”€ user.py               # Pydantic User model
â”‚   â””â”€â”€ post.py               # Pydantic Post model
â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ conftest.py           # client fixtures (users_client, posts_client)
â”‚   â”œâ”€â”€ test_users.py         # 5 CRUD tests: GET all, GET one, POST, PUT, DELETE
â”‚   â””â”€â”€ test_posts.py         # 5 CRUD tests: GET all, GET one, POST, PUT, DELETE
â””â”€â”€ utils/
    â””â”€â”€ assertions.py         # assert_status(), assert_schema()
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

## Chapter 04 â€” Test Strategy & Test Case Generator

A full-stack AI application built using the **BLAST Framework** (Blueprint â†’ Link â†’ Architect â†’ Stylize â†’ Trigger).

**Live App:** https://test-strategy-puneeth-bs-projects4.vercel.app

### Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Vite + React 18, plain CSS |
| AI | Groq API â€” `llama-3.3-70b-versatile` |
| Issue Tracker | JIRA REST API v3 |
| Deployment | Vercel |

### Features
- 7-field prompt form (Role, Instructions, Context, Example, Parameters, Output, Tone)
- Groq AI generates a full **Test Strategy document** + structured **Test Cases**
- Expandable test case cards â€” color-coded by type (Functional, Security, Performance, etc.)
- One-click **Push to JIRA** â€” fetches your live projects, creates tickets
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
# â†’ http://localhost:3000
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
â”œâ”€â”€ Test_Strategy/
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”‚   â”œâ”€â”€ Header.jsx           # App header
â”‚   â”‚   â”‚   â”œâ”€â”€ RicePotForm.jsx      # 7-field prompt form
â”‚   â”‚   â”‚   â”œâ”€â”€ TestStrategyOutput.jsx  # Strategy + test case tabs
â”‚   â”‚   â”‚   â””â”€â”€ JiraPanel.jsx        # JIRA push modal
â”‚   â”‚   â”œâ”€â”€ tools/
â”‚   â”‚   â”‚   â”œâ”€â”€ groqClient.js        # Groq AI integration
â”‚   â”‚   â”‚   â””â”€â”€ jiraClient.js        # JIRA REST API integration
â”‚   â”‚   â”œâ”€â”€ App.jsx                  # State orchestrator
â”‚   â”‚   â”œâ”€â”€ index.css                # Dark-tech CSS theme
â”‚   â”‚   â””â”€â”€ main.jsx
â”‚   â”œâ”€â”€ index.html
â”‚   â”œâ”€â”€ vite.config.js
â”‚   â””â”€â”€ vercel.json
â”œâ”€â”€ architecture/
â”‚   â””â”€â”€ sop.md                       # BLAST Layer 1 â€” SOP
â”œâ”€â”€ gemini.md                        # Project Constitution
â”œâ”€â”€ task_plan.md                     # BLAST phases checklist
â”œâ”€â”€ findings.md                      # Research & decisions
â”œâ”€â”€ progress.md                      # Session log
â””â”€â”€ prompt.md                        # Groq prompt templates
```

---

## Chapter 05 â€” AI Agents (n8n)

n8n AI agent workflows powered by **Groq (Qwen)** â€” each agent automates a distinct QA workflow.

| Agent | Nodes | Description |
|-------|-------|-------------|
| `AI_3X_01_QA_BUDDY` | Chat Trigger â†’ AI Agent (Qwen) | General QA Q&A assistant â€” answers any QA query with technical responses |
| `AI_3X_02_JIRA_Agent` | Chat Trigger â†’ AI Agent â†’ Qwen â†’ JIRA Tool | Creates JIRA tickets from chat â€” reads project/issue type, generates structured tickets with steps |
| `AI_3X_03_Read_PRD_Test_Cases` | Chat Trigger â†’ AI Agent â†’ Qwen â†’ JIRA Tool â†’ Google Sheets | Reads PRD from JIRA, auto-generates test cases, appends them to Google Sheets |

### Stack
| Layer | Technology |
|-------|-----------|
| AI Model | Groq â€” `qwen/qwen3-32b` / `qwen/qwen3.6-27b` |
| LLM Memory | Buffer Window (Simple Memory) |
| JIRA | n8n JIRA Tool â€” REST API v3 |
| Sheets | Google Sheets OAuth2 API |

### How to Import
1. Open **n8n** â†’ **Workflows** â†’ **Import from File**
2. Select any `.json` file from `Chapter_05_AI_AgentsN8N/`
3. Configure your **Groq API** + **JIRA** + **Google Sheets** credentials
4. Activate the workflow

### BLAST Framework Phases

| Phase | Status | Artifact |
|-------|--------|----------|
| B â€” Blueprint | âœ… | gemini.md, task_plan.md, findings.md |
| L â€” Link | âœ… | Groq + JIRA credentials verified |
| A â€” Architect | âœ… | 3-layer: SOPs â†’ components â†’ tools |
| S â€” Stylize | âœ… | Dark-tech CSS, neon accents, responsive |
| T â€” Trigger | âœ… | Vercel production deployment |

### Prompt Reference

See [`Chapter_04_Blast_Framework_Assig/prompt.md`](Chapter_04_Blast_Framework_Assig/prompt.md) for the full Groq prompt templates, field mapping, and JIRA ticket format.

---

## Project_Job_Tracker â€” Job Application Kanban Board

A drag-and-drop Kanban board for tracking job applications, built with **React + Vite + IndexedDB**.

### Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Vite + React 18, Tailwind CSS |
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable |
| Database | IndexedDB via idb |
| Linting | oxlint |

### Features
- **4-column Kanban flow**: Applied -> Interview -> Offer -> Rejected
- **Drag-and-drop** cards between columns
- **Add/Edit/Delete** job entries via modal forms
- **Persistent storage** in IndexedDB (survives page reloads)
- **Color-coded badges** for job type and status

### Setup & Run Locally

```bash
cd Project_Job_Tracker/job-tracker

# Install dependencies
npm install

# Start dev server
npm run dev
# -> http://localhost:5173
```

### Project Structure

```
Project_Job_Tracker/job-tracker/
+-- src/
|   +-- components/
|   |   +-- Header.jsx             # App header with title
|   |   +-- KanbanBoard.jsx        # Main Kanban layout with columns
|   |   +-- Column.jsx             # Draggable column container
|   |   +-- JobCard.jsx            # Individual job card
|   |   +-- JobFormModal.jsx       # Add/Edit job modal
|   |   +-- DeleteConfirmModal.jsx # Delete confirmation dialog
|   +-- services/
|   |   +-- db.js                  # IndexedDB operations
|   |   +-- constants.js           # Column definitions & statuses
|   +-- App.jsx                    # Root component
|   +-- main.jsx                   # Entry point
|   +-- index.css                  # Tailwind CSS styles
+-- index.html
+-- vite.config.js
+-- package.json
+-- README.md
```

---

## Chapter 06 â€” Branding & Content Pipeline

AI-powered content generation pipeline for social media branding â€” from n8n agent workflows to a local Python dashboard.

| Directory | Description |
|-----------|-------------|
| `N8N_AI_Agent/` | n8n agent pipeline: 4-chained AI agents (Topic Scheduler -> Content Creator + Image Generator -> Sheets Logger) using Groq + Gemini |
| `Social_AI_Agents/` | Social content generation specs â€” parallel agents for multi-platform content (LinkedIn, Medium, Instagram, YouTube, Dev.to) |
| `Social_AI_Agents/UI_Dashboard/` | Local Python dashboard (Flask + Anthropic API) for daily content generation â€” one-click run, Excel log, dark-themed UI |
| `LinkedInBranding_Prompt/` | Resume-driven branding prompts for LinkedIn headline, summary, experience entries, and backdrop image |

### How to Use

**n8n AI Agent Pipeline:**
1. Open `N8N_AI_Agent/Prompt.md` for the full agent workflow spec
2. Import into n8n with Groq + Google Sheets + Gemini credentials

**Python Dashboard:**
```bash
cd Chapter_06_Branding/Social_AI_Agents/UI_Dashboard
pip install -r requirements.txt
set ANTHROPIC_API_KEY=sk-ant-...
python server.py
# -> http://localhost:8080
```

**LinkedIn Branding:**
1. Open any `.md` file in `LinkedInBranding_Prompt/`
2. Paste the prompt into ChatGPT, Claude, or Gemini
3. Attach your resume for context
4. Update your LinkedIn profile with the generated content

### Directory Structure

```
Chapter_06_Branding/
+-- LinkedInBranding_Prompt/
|   +-- Headline.md                     # LinkedIn headline prompt
|   +-- Summary.md                      # About section prompt
|   +-- Experience.md                   # Experience entries prompt
|   +-- Backdroppicture.md              # Banner image generation prompt
+-- N8N_AI_Agent/
|   +-- Prompt.md                       # n8n 4-agent pipeline spec
+-- Social_AI_Agents/
    +-- Prompt.md                       # Social content agent architecture
    +-- UI_Dashboard/
        +-- agent.py                    # Content generation engine
        +-- server.py                   # Flask web server
        +-- dashboard.html              # Dark-themed dashboard UI
        +-- content_log.xlsx            # Auto-created Excel log
        +-- run_log.json                # JSON cache for dashboard
        +-- requirements.txt            # Python dependencies
        +-- README.md                   # Dashboard setup guide
```

