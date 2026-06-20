# conftest.py  (root — session-scoped APIRequestContext)
import pytest
from playwright.sync_api import sync_playwright, APIRequestContext
from config.settings import BASE_URL, REQUEST_TIMEOUT, DEFAULT_HEADERS


@pytest.fixture(scope="session")
def api_context() -> APIRequestContext:
    with sync_playwright() as pw:
        context = pw.request.new_context(
            base_url=BASE_URL,
            extra_http_headers=DEFAULT_HEADERS,
        )
        yield context
        context.dispose()
