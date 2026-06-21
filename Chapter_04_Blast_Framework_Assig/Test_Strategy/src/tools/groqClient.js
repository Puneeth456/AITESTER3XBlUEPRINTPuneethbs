const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

function buildPrompt(fields) {
  const { role, instructions, context, example, parameters, output, tone } = fields
  return {
    system: `You are ${role}. Communicate in a ${tone || 'technical, precise'} style.
Constraints: ${parameters}
You generate production-quality QA test strategy documents.`,
    user: `## CONTEXT
${context}

## INSTRUCTIONS
${instructions}

## EXAMPLE FORMAT
${example}

## REQUIRED OUTPUT
${output}

Generate a complete test strategy following these specifications.
Return ONLY a valid JSON object (no markdown fences, no commentary outside the JSON) with this exact shape:
{
  "testStrategy": "<full markdown test strategy document with sections: Overview, Scope, Approach, Test Types, Entry/Exit Criteria, Risks, Tools>",
  "testCases": [
    {
      "id": "TC-001",
      "title": "<descriptive title>",
      "preconditions": "<what must be true before test>",
      "steps": ["<step 1>", "<step 2>", "<step 3>"],
      "expected": "<expected result>",
      "priority": "High",
      "type": "Functional"
    }
  ]
}
Generate minimum 5 test cases. Priority values: High|Medium|Low. Type values: Functional|Regression|Security|Performance|Negative|API|UI.`,
  }
}

export async function generateTestStrategy(fields) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  if (!apiKey) throw new Error('Groq API key not configured. Check .env file.')

  const { system, user } = buildPrompt(fields)

  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      temperature: 0.25,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Groq API error ${res.status}`)
  }

  const data = await res.json()
  const raw = (data.choices?.[0]?.message?.content ?? '').trim()

  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0])
    } catch {
      // fall through
    }
  }
  return { testStrategy: raw, testCases: [] }
}
