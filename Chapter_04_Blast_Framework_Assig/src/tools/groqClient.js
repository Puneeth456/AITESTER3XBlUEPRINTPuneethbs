const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

function buildPrompt(fields) {
  const { role, instructions, context, example, parameters, output, tone } = fields
  return {
    system: `You are ${role}. ${tone ? `Communicate in a ${tone} style.` : ''}
Your task is to generate a comprehensive test strategy document.
Constraints: ${parameters}`,
    user: `## CONTEXT
${context}

## INSTRUCTIONS
${instructions}

## EXAMPLE FORMAT
${example}

## REQUIRED OUTPUT
${output}

Generate a complete test strategy following these specifications. Structure your response as valid JSON with this shape:
{
  "testStrategy": "<full markdown test strategy document>",
  "testCases": [
    {
      "id": "TC-001",
      "title": "<title>",
      "preconditions": "<preconditions>",
      "steps": ["<step 1>", "<step 2>"],
      "expected": "<expected result>",
      "priority": "High|Medium|Low",
      "type": "Functional|Regression|Security|Performance|Negative"
    }
  ]
}
Output ONLY the JSON object. No markdown fences. No explanation outside JSON.`,
  }
}

export async function generateTestStrategy(fields) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  if (!apiKey) throw new Error('Groq API key not configured in .env')

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
      temperature: 0.3,
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
  const raw = data.choices?.[0]?.message?.content ?? ''

  try {
    return JSON.parse(raw)
  } catch {
    return { testStrategy: raw, testCases: [] }
  }
}
