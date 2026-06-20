# api/base_client.py
from playwright.sync_api import APIRequestContext
from config.settings import BASE_URL, REQUEST_TIMEOUT, DEFAULT_HEADERS


class BaseAPIClient:
    def __init__(self, context: APIRequestContext) -> None:
        self._context = context
        self._base_url = BASE_URL
        self._timeout = REQUEST_TIMEOUT

    def _url(self, path: str) -> str:
        return f"{self._base_url}{path}"

    def _parse(self, response) -> tuple[int, dict | list]:
        status = response.status
        if status >= 500:
            raise RuntimeError(
                f"Server error {status} on {response.url}: {response.text()}"
            )
        try:
            body = response.json()
        except Exception:
            body = {}
        return status, body

    def get(self, path: str, params: dict | None = None) -> tuple[int, dict | list]:
        response = self._context.get(
            self._url(path),
            params=params,
            headers=DEFAULT_HEADERS,
            timeout=self._timeout,
        )
        return self._parse(response)

    def post(self, path: str, payload: dict) -> tuple[int, dict]:
        response = self._context.post(
            self._url(path),
            data=payload,
            headers=DEFAULT_HEADERS,
            timeout=self._timeout,
        )
        return self._parse(response)

    def put(self, path: str, payload: dict) -> tuple[int, dict]:
        response = self._context.put(
            self._url(path),
            data=payload,
            headers=DEFAULT_HEADERS,
            timeout=self._timeout,
        )
        return self._parse(response)

    def patch(self, path: str, payload: dict) -> tuple[int, dict]:
        response = self._context.patch(
            self._url(path),
            data=payload,
            headers=DEFAULT_HEADERS,
            timeout=self._timeout,
        )
        return self._parse(response)

    def delete(self, path: str) -> tuple[int, dict]:
        response = self._context.delete(
            self._url(path),
            headers=DEFAULT_HEADERS,
            timeout=self._timeout,
        )
        return self._parse(response)
