---
name: rice-pot-api-framework-builder
description: Build a structured Python REST API testing framework prompt using the RICE-POT framework. Use this when the user wants to create an API test framework with Python, Playwright APIRequestContext, pytest, and Pydantic schema validation.
---

## The RICE-POT Prompt Framework — Project 03: Python API Testing

This project was generated using the **RICE-POT** prompt framework to produce a
production-ready Python API testing framework with zero placeholder code.

### RICE-POT Breakdown

| Letter | Component | Applied Value |
| :--- | :--- | :--- |
| **R** | **Role** | Senior Python API Test Automation Engineer, 15+ years experience with Playwright Python SDK and pytest architecture |
| **I** | **Instructions** | 9-step scaffold spec with exact folder tree, explicit Do-NOT list (no requests lib, no unittest, no TODOs, no hardcoded URLs) |
| **C** | **Context** | JSONPlaceholder REST API, Python 3.11+, playwright 1.44+, pytest 8.x, pydantic 2.x |
| **E** | **Example** | One `UsersClient.get_user()` method + one `test_get_single_user` pytest showing the exact layered pattern |
| **P** | **Parameters** | Anti-hallucination block: deterministic output, no invented endpoints, pydantic v2 syntax only, no mocks |
| **O** | **Output** | Complete file-per-block output ordered by layer: config → api → models → utils → conftest → tests |
| **T** | **Tone** | Code-only; each file starts with `# relative/path` comment; no prose between files |

### Why Python + Playwright API?

| Concern | Choice | Reason |
|---------|--------|--------|
| HTTP client | `playwright.sync_api.APIRequestContext` | Same tool as E2E tests — one SDK, full request/response control |
| Validation | `pydantic` v2 | Type-safe schema contracts, clean error messages |
| Runner | `pytest` 8.x | Fixture injection, parametrize, markers, rich plugins |
| Target API | JSONPlaceholder | Free, stable, fully documented public REST API — ideal for teaching |

### Framework Architecture

```
Output_Framework/
├── requirements.txt          # pinned dependencies
├── pytest.ini                # runner config, markers
├── conftest.py               # session-scoped APIRequestContext fixture
├── config/
│   └── settings.py           # BASE_URL + TIMEOUT from env vars
├── api/
│   ├── base_client.py        # BaseAPIClient: get/post/put/patch/delete
│   ├── users_client.py       # /users endpoint client
│   └── posts_client.py       # /posts endpoint client
├── models/
│   ├── user.py               # Pydantic User model
│   └── post.py               # Pydantic Post model
├── tests/
│   ├── conftest.py           # test-scoped client fixtures
│   ├── test_users.py         # 5 CRUD tests for /users
│   └── test_posts.py         # 5 CRUD tests for /posts
└── utils/
    └── assertions.py         # assert_status, assert_schema helpers
```
