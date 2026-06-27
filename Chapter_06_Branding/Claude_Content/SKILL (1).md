# Tech Content Generation Skill

## Purpose
Generate five platform-specific content pieces for a given tech topic in a single prompt run. No agents, no automation — just one structured prompt that produces ready-to-publish content across LinkedIn, Medium, Instagram, YouTube, and Dev.to.

## When to use
Trigger this skill when the user asks to:
- Generate content for a tech topic
- Create social media posts, articles, or scripts about a technical subject
- Produce multi-platform content from a single topic
- Write for any of: LinkedIn, Medium, Instagram, YouTube, Dev.to

Supported topics (but not limited to): QA, AI, MCP, RAG, LLM, AI Agents, N8n, Langflow, CrewAI, DeepEval, LangChain, AI Harness, LLM Evaluation

---

## Prompt Template

Use the following prompt, replacing `{TOPIC}` with the user's chosen topic:

```
You are an expert tech content creator. Generate all five pieces of content below for the topic: "{TOPIC}".

---

## 1. LinkedIn Post
Write a professional LinkedIn post (150–300 words). Use an engaging hook, share practical insights about {TOPIC}, and end with a call to action. Include 5–8 relevant hashtags at the end.

---

## 2. Medium Article
Write a full Medium article (800–1200 words) about {TOPIC}.
- Include a compelling title
- Use subheadings to structure the content
- Cover: what it is, why it matters, how it works, real-world use cases, and key takeaways

---

## 3. Instagram Script
Write a short Instagram caption (under 150 words) about {TOPIC}.
- Start with a bold hook (first line must stop the scroll)
- Follow with 3–5 punchy insight lines
- End with a question or CTA to drive comments
- Add 10 relevant hashtags

---

## 4. YouTube Script
Write a YouTube video script (300–500 words) about {TOPIC}.
Structure:
- Hook (0–15 sec): grab attention immediately
- Intro (15–45 sec): set up the problem or context
- Body: explain {TOPIC} clearly with examples
- CTA: ask viewers to like, comment, and subscribe

---

## 5. Dev.to Article
Write a technical Dev.to article (600–1000 words) about {TOPIC}.
- Use a developer-friendly tone
- Include practical explanations, architecture notes, or comparisons
- Add code snippets or pseudocode where relevant
- Structure with clear headings and a TL;DR at the top
```

---

## Output Format

The model will return five clearly separated sections, each headed with a platform label:

| Section | Platform | Length |
|---|---|---|
| 1 | LinkedIn Post | 150–300 words + hashtags |
| 2 | Medium Article | 800–1200 words + title + subheadings |
| 3 | Instagram Script | Under 150 words + 10 hashtags |
| 4 | YouTube Script | 300–500 words with Hook / Intro / Body / CTA |
| 5 | Dev.to Article | 600–1000 words + code snippets + TL;DR |

---

## Usage Notes

- Run the full prompt in a single call — all five outputs are generated together.
- The prompt is model-agnostic and works with any capable LLM (Claude, GPT-4, Llama 3, Groq, etc.).
- To use with an LLM API, pass the filled prompt as the `user` message with no system prompt, or pair it with a brief system prompt like: `"You are an expert tech content creator. Follow the format exactly."`
- For batch use (multiple topics), run one call per topic and collect outputs.
- Outputs can be piped directly into a Google Sheets logger, CMS, or scheduling tool as post-processing.

---

## Example

**Input topic:** `RAG`

**Expected outputs:**
1. A LinkedIn post explaining Retrieval-Augmented Generation with practical tips and hashtags like `#RAG #LLM #AI`
2. A Medium article titled something like *"RAG Explained: How to Ground Your LLM in Real Data"*
3. An Instagram caption opening with a hook like *"Your AI is hallucinating. Here's the fix 👇"*
4. A YouTube script with a hook about LLM hallucinations leading into a RAG explainer
5. A Dev.to article with a TL;DR, architecture diagram description, and Python pseudocode for a RAG pipeline
