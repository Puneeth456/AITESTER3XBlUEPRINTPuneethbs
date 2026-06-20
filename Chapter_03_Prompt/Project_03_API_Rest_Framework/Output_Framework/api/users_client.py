# api/users_client.py
from playwright.sync_api import APIRequestContext
from api.base_client import BaseAPIClient


class UsersClient(BaseAPIClient):
    _PATH = "/users"

    def __init__(self, context: APIRequestContext) -> None:
        super().__init__(context)

    def get_all_users(self) -> tuple[int, list]:
        return self.get(self._PATH)

    def get_user(self, user_id: int) -> tuple[int, dict]:
        return self.get(f"{self._PATH}/{user_id}")

    def create_user(self, name: str, username: str, email: str) -> tuple[int, dict]:
        return self.post(self._PATH, {"name": name, "username": username, "email": email})

    def update_user(self, user_id: int, payload: dict) -> tuple[int, dict]:
        return self.put(f"{self._PATH}/{user_id}", payload)

    def patch_user(self, user_id: int, payload: dict) -> tuple[int, dict]:
        return self.patch(f"{self._PATH}/{user_id}", payload)

    def delete_user(self, user_id: int) -> tuple[int, dict]:
        return self.delete(f"{self._PATH}/{user_id}")
