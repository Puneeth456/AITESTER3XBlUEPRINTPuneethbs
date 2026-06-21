# SOP: RICE-POT Test Strategy Generator

## Goal
Transform RICE-POT prompt components into a structured test strategy via Groq AI,
with optional JIRA ticket creation.

## Input
Seven RICE-POT fields from user.

## Tool Execution Order (Layer 2 → Layer 3)
1. Validate all 7 RICE-POT fields are non-empty
2. Call `groqClient.generateTestStrategy(fields)` → receive `{testStrategy, testCases}`
3. Render output in `TestStrategyOutput` component
4. If user clicks "Push to JIRA":
   a. Call `jiraClient.getJiraProjects()` → populate project selector
   b. User selects project key
   c. Call `jiraClient.pushTestCasesToJira(projectKey, testCases)`
   d. Display created ticket links

## Edge Cases
- Groq returns non-JSON → display raw as test strategy, testCases = []
- JIRA auth failure → show error with link to check .env
- Network error → retry once, then show user-friendly message

## Golden Rule
Update this SOP before updating any tool or component logic.
