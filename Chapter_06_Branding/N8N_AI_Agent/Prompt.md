
Prompt for N8n

🤖 Agent 1 — Topic Scheduler

LLM: Groq (e.g. llama3-70b-8192)
Task: Read the topic rotation list from the Google Sheet below. Identify which topic is assigned to today's date (or pick the next unused one). Output only the selected topic string.
Topic list: QA, AI, MCP, RAG, LLM, AI Agents, N8n, Langflow, CrewAI, DeepEval, LangChain, AI Harness, LLM Evaluation
Google Sheet: https://docs.google.com/spreadsheets/d/1KdaFcGR36BfyFUKoH7JcO4idtT8AEwSmlsCfQkhYiIw/edit?gid=0


🤖 Agent 2 — Content Creator (runs in parallel with Agent 3)

LLM: Groq (llama3-70b-8192)
Input: Today's topic (from Agent 1 via the Google Sheet)
Task: For the given topic, generate all five pieces of content in a single structured response:

LinkedIn post — professional, 150–300 words, with hashtags
Medium article — full article, 800–1200 words, with a title and subheadings
Instagram script — short-form caption + hook, under 150 words
YouTube script — intro, body, and CTA, 300–500 words
Dev.to article — technical tone, 600–1000 words, with code snippets if relevant




🤖 Agent 3 — Image Generator (runs in parallel with Agent 2)

API: Google Gemini via Banana API (use the gemini-nano model endpoint)
Input: Today's topic (from Agent 1)
Task: Generate two images:

Medium article banner — wide format (1200×628px), professional and thematic
Instagram crop — square format (1080×1080px), bold and visually striking


Return image URLs or base64 blobs for storage in the sheet.


🤖 Agent 4 — Google Sheets Logger

Node: Google Sheets (Append Row)
Input: All outputs from Agent 2 (5 content pieces) + Agent 3 (2 images)
Task: Append one new row to the sheet daily with these columns:

Date | Topic | LinkedIn Post | Medium Article | Instagram Script | YouTube Script | Dev.to Article | Medium Image URL | Instagram Image URL


Sheet: same spreadsheet URL as above