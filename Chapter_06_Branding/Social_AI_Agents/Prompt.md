# Social Content AI Agent Pipeline — N8n

Automated daily social content generation using 4 chained agents.

---

## Architecture Overview

```
Agent 1 (Topic Scheduler)
        ↓
        ├──────────────────────┐
Agent 2 (Content Creator)   Agent 3 (Image Generator)   ← parallel
        └──────────────────────┘
                    ↓
           Agent 4 (Sheets Logger)
```

---

## Agent 1 — Topic Scheduler

**LLM:** Groq `llama3-70b-8192`

**Task:** Read topic rotation list from Google Sheet. Find today's assigned topic (or next unused one). Output only the topic string — nothing else.

**Topic rotation list:**
```
QA, AI, MCP, RAG, LLM, AI Agents, N8n, Langflow, CrewAI, DeepEval, LangChain, AI Harness, LLM Evaluation
```

**Google Sheet:**
```
https://docs.google.com/spreadsheets/d/1KdaFcGR36BfyFUKoH7JcO4idtT8AEwSmlsCfQkhYiIw/edit?gid=0
```

**Output:** Single topic string (e.g., `RAG`)

---

## Agent 2 — Content Creator

**Runs:** Parallel with Agent 3

**LLM:** Groq `llama3-70b-8192`

**Input:** Today's topic from Agent 1

**Task:** Generate all 5 content pieces in one structured response:

### Content Pieces

| Platform | Format | Length |
|----------|--------|--------|
| LinkedIn | Professional post + hashtags | 150–300 words |
| Medium | Full article with title + subheadings | 800–1200 words |
| Instagram | Caption + hook | under 150 words |
| YouTube | Intro + body + CTA | 300–500 words |
| Dev.to | Technical article + code snippets | 600–1000 words |

### Prompt Template

```
Topic: {{topic}}

Generate the following content pieces for today's topic. Return each section clearly labeled.

---
LINKEDIN POST
[Professional tone. 150-300 words. End with 5-8 relevant hashtags.]

---
MEDIUM ARTICLE
[Title on first line. Use ## for subheadings. 800-1200 words. Engaging intro, deep-dive body, strong conclusion.]

---
INSTAGRAM SCRIPT
[Bold hook in first line. Casual tone. Under 150 words. End with CTA and 3-5 hashtags.]

---
YOUTUBE SCRIPT
[Intro (hook + what viewer will learn), Body (main content with examples), CTA (subscribe + comment prompt). 300-500 words.]

---
DEV.TO ARTICLE
[Technical tone. Include code snippets where relevant. 600-1000 words. Use ## for sections.]
```

---

## Agent 3 — Image Generator

**Runs:** Parallel with Agent 2

**API:** Google Gemini (`gemini-nano` via Banana API endpoint)

**Input:** Today's topic from Agent 1

**Task:** Generate 2 images:

| Image | Dimensions | Style |
|-------|------------|-------|
| Medium article banner | 1200×628px | Professional, thematic, wide |
| Instagram square | 1080×1080px | Bold, visually striking |

**Output:** Image URLs or base64 blobs

### Prompt Templates

```
Medium banner prompt:
"Wide banner image (1200x628) for a tech article about {{topic}}. 
Professional, modern design. Dark background with accent colors. 
Include subtle tech/AI visual elements. No text overlay."

Instagram square prompt:
"Bold square image (1080x1080) for an Instagram post about {{topic}}.
Eye-catching, vibrant colors. Geometric or abstract tech theme.
High contrast. No text overlay."
```

---

## Agent 4 — Google Sheets Logger

**Node:** Google Sheets → Append Row

**Input:** Outputs from Agent 2 (5 content pieces) + Agent 3 (2 image URLs)

**Task:** Append one row daily to the tracking sheet.

### Sheet Schema

| Column | Source |
|--------|--------|
| Date | System date (YYYY-MM-DD) |
| Topic | Agent 1 output |
| LinkedIn Post | Agent 2 |
| Medium Article | Agent 2 |
| Instagram Script | Agent 2 |
| YouTube Script | Agent 2 |
| Dev.to Article | Agent 2 |
| Medium Image URL | Agent 3 |
| Instagram Image URL | Agent 3 |

**Sheet:** Same URL as Agent 1
```
https://docs.google.com/spreadsheets/d/1KdaFcGR36BfyFUKoH7JcO4idtT8AEwSmlsCfQkhYiIw/edit?gid=0
```

---

## N8n Workflow Setup

### Trigger
- **Schedule Trigger** → Daily at preferred time (e.g., 07:00 AM)

### Node Order
1. Schedule Trigger
2. Agent 1 (HTTP Request → Groq + Google Sheets Read)
3. Split → Agent 2 + Agent 3 (parallel branches)
4. Merge node (wait for both)
5. Agent 4 (Google Sheets Append)

### Required Credentials
- Groq API Key
- Google Sheets OAuth2
- Banana API Key (for Gemini image generation)

---

## Environment Variables

```env
GROQ_API_KEY=your_groq_api_key
GOOGLE_SHEETS_ID=1KdaFcGR36BfyFUKoH7JcO4idtT8AEwSmlsCfQkhYiIw
BANANA_API_KEY=your_banana_api_key
GEMINI_MODEL=gemini-nano
```
