# RICE-POT Prompt — Python Playwright API Testing Framework

## Objective

Generate a **production-ready Python REST API testing framework** using **Playwright's `APIRequestContext`** and **pytest**, targeting the [JSONPlaceholder](https://jsonplaceholder.typicode.com) public API. The framework must be structured for real enterprise use: layered architecture, reusable API clients, Pydantic schema validation, fixture-driven setup, and full pytest reporting.

---

## The RICE-POT Prompt

```markdown
### R — Role
You are a Senior Python Test Automation Engineer with 15+ years of experience designing
enterprise-grade API testing frameworks. You specialise in Playwright's Python SDK,
pytest fixture architecture, Pydantic schema validation, and REST API contract testing.
You write clean, production-ready code with zero placeholder logic.

### I — Instructions
1. Scaffold a Python API testing framework using the following exact folder structure:
   Output_Framework/
   ├── requirements.txt
   ├── pytest.ini
   ├── conftest.py          ← root conftest: browser/api_request_context fixtures
   ├── config/
   │   ├── __init__.py
   │   └── settings.py      ← BaseURL, timeouts, env config via environment variables
   ├── api/
   │   ├── __init__.py
   │   ├── base_client.py   ← BaseAPIClient: wraps APIRequestContext, shared headers, error handling
   │   ├── users_client.py  ← UsersClient extends BaseAPIClient
   │   └── posts_client.py  ← PostsClient extends BaseAPIClient
   ├── models/
   │   ├── __init__.py
   │   ├── user.py          ← Pydantic User model
   │   └── post.py          ← Pydantic Post model
   ├── tests/
   │   ├── __init__.py
   │   ├── conftest.py      ← test-scoped fixtures: users_client, posts_client
   │   ├── test_users.py    ← CRUD tests for /users endpoint
   │   └── test_posts.py    ← CRUD tests for /posts endpoint
   └── utils/
       ├── __init__.py
       └── assertions.py    ← custom assertion helpers: assert_status, assert_schema

2. In base_client.py: implement get(), post(), put(), patch(), delete() — each returns a
   tuple (status_code: int, body: dict). Raise a clear RuntimeError if status >= 500.

3. In settings.py: read BASE_URL from environment variable API_BASE_URL,
   defaulting to "https://jsonplaceholder.typicode.com". Read REQUEST_TIMEOUT from
   environment variable API_TIMEOUT, defaulting to 30000 (milliseconds).

4. In conftest.py (root): use playwright sync fixture to create an APIRequestContext.
   Scope it at session level. Tear it down with dispose() in a finally block.

5. In models/user.py: define User(BaseModel) with fields: id (int, optional), name (str),
   username (str), email (str). In models/post.py: define Post(BaseModel) with fields:
   id (int, optional), userId (int), title (str), body (str).

6. In utils/assertions.py: implement assert_status(response_tuple, expected_status) and
   assert_schema(data: dict, model_class: BaseModel) using Pydantic model_validate.

7. In test_users.py write five tests:
   - test_get_all_users → GET /users → 200, list has 10 items, each validates User model
   - test_get_single_user → GET /users/1 → 200, id == 1
   - test_create_user → POST /users with {name, username, email} → 201, id returned
   - test_update_user → PUT /users/1 → 200, name updated
   - test_delete_user → DELETE /users/1 → 200

8. In test_posts.py write five tests mirroring the same CRUD pattern for /posts.

9. In pytest.ini: set testpaths = tests, addopts = -v --tb=short, markers for "smoke"
   and "regression".

Do NOT:
- Use requests, httpx, or any HTTP library other than Playwright's APIRequestContext.
- Use unittest.TestCase style; use pytest functions only.
- Generate placeholder comments like "# TODO" or "# add your logic here".
- Hardcode the base URL anywhere other than settings.py.
- Generate mock or stub responses; all tests hit the real JSONPlaceholder API.
- Add any code that is not runnable as-is after pip install -r requirements.txt.

### C — Context
- Framework targets the public JSONPlaceholder REST API (https://jsonplaceholder.typicode.com).
- Runner: pytest 8.x
- HTTP client: playwright 1.44+ (sync_api), specifically APIRequestContext.
- Schema validation: pydantic 2.x (model_validate, not parse_obj).
- Python: 3.11+
- CI target: runs headlessly in GitHub Actions / any CI with pip + playwright install.
- This is Chapter 03 / Project 03 of an AI Tester Blueprint course — it must be a clean,
  teachable example of layered API test architecture.

### E — Example (one test + one client method)

# api/users_client.py
class UsersClient(BaseAPIClient):
    def get_user(self, user_id: int) -> tuple[int, dict]:
        return self.get(f"/users/{user_id}")

# tests/test_users.py
@pytest.mark.smoke
def test_get_single_user(users_client):
    status, body = users_client.get_user(1)
    assert_status((status, body), 200)
    assert_schema(body, User)
    assert body["id"] == 1

### P — Parameters
- Output must be deterministic: same prompt → same file structure and logic.
- Every assertion must trace to a real JSONPlaceholder API contract.
- If a field or behaviour is uncertain, do NOT invent it — use only documented endpoints.
- Inference (low confidence) label required if any field shape is assumed.
- Pydantic v2 syntax only (model_validate, not parse_obj; Field not Schema).
- All fixtures use pytest's native fixture system — no custom class-based setup.
- requirements.txt must pin exact major versions: playwright==1.*, pytest==8.*, pydantic==2.*.

### O — Output
- Format: complete Python project files, each in its own fenced code block labelled with the file path.
- Structure: exactly the folder layout in Instructions step 1 — no extra files.
- Order: requirements.txt → pytest.ini → config/ → api/ → models/ → utils/ → conftest.py (root) → tests/conftest.py → tests/test_*.py

### T — Tone
Technical, code-only. No explanatory prose between files. Each file starts with a comment
line: `# <relative/path/to/file>`. No inline comments unless they explain a non-obvious
constraint. No markdown headings between files — just the labelled code blocks.
```

---

## RICE-POT Component Summary

| Component | Value |
|-----------|-------|
| **R** Role | Senior Python API Test Automation Engineer, 15+ yrs |
| **I** Instructions | 9-step scaffold with explicit folder tree, Do-NOT list |
| **C** Context | JSONPlaceholder API, pytest 8, playwright 1.44+, pydantic 2, Python 3.11+ |
| **E** Example | One client method + one pytest test showing the exact pattern |
| **P** Parameters | Anti-hallucination block, pydantic v2 only, no mocks, no TODOs |
| **O** Output | File-per-block, ordered, labelled with path |
| **T** Tone | Code-only, no prose, path comment header on every file |
