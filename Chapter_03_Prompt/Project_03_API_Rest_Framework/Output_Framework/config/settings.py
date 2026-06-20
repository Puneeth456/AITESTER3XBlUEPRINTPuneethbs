# config/settings.py
import os

BASE_URL: str = os.environ.get("API_BASE_URL", "https://jsonplaceholder.typicode.com")
REQUEST_TIMEOUT: int = int(os.environ.get("API_TIMEOUT", "30000"))

DEFAULT_HEADERS: dict = {
    "Content-Type": "application/json; charset=UTF-8",
    "Accept": "application/json",
}
