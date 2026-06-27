# Content Pipeline Dashboard

Local Python + HTML content generation pipeline. One Anthropic API call per day generates LinkedIn, Medium, Instagram, YouTube, and Dev.to content. Dashboard runs at http://localhost:8080.

## Files

| File | Purpose |
|------|---------|
| `agent.py` | Generates content, writes Excel + JSON |
| `server.py` | Serves dashboard + API endpoints |
| `dashboard.html` | Dark-themed single-file UI |
| `content_log.xlsx` | Auto-created Excel history |
| `run_log.json` | Auto-created JSON cache for dashboard |

## Setup

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Set your Anthropic API key
# Windows
set ANTHROPIC_API_KEY=sk-ant-...

# Mac / Linux
export ANTHROPIC_API_KEY=sk-ant-...

# 3. Start the dashboard server
python server.py
```

Open http://localhost:8080 in your browser.

Click **Run Now** in the dashboard, or run the agent directly:

```bash
python agent.py
```

## Topic rotation

13 topics cycle by day-of-year index:

```
QA  AI  MCP  RAG  LLM  AI Agents  N8n  Langflow
CrewAI  DeepEval  LangChain  AI Harness  LLM Evaluation
```

The agent is **idempotent** — running it twice on the same day skips the second run.

## Cron (auto-run daily at 9 AM)

### Mac / Linux

```bash
crontab -e
# Add this line (update the path):
0 9 * * * cd /path/to/UI_Dashboard && python agent.py >> agent.log 2>&1
```

### Windows Task Scheduler

```powershell
$action  = New-ScheduledTaskAction -Execute "python" -Argument "agent.py" -WorkingDirectory "C:\path\to\UI_Dashboard"
$trigger = New-ScheduledTaskTrigger -Daily -At "09:00AM"
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "ContentPipeline" -RunLevel Highest
```

## API endpoints (served by server.py)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Dashboard UI |
| GET | `/api/data` | Returns `run_log.json` |
| GET | `/api/status` | Returns `{"running": bool}` |
| POST | `/api/run` | Triggers `agent.py` in background |
