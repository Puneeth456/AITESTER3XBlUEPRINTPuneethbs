# api/posts_client.py
from playwright.sync_api import APIRequestContext
from api.base_client import BaseAPIClient


class PostsClient(BaseAPIClient):
    _PATH = "/posts"

    def __init__(self, context: APIRequestContext) -> None:
        super().__init__(context)

    def get_all_posts(self) -> tuple[int, list]:
        return self.get(self._PATH)

    def get_post(self, post_id: int) -> tuple[int, dict]:
        return self.get(f"{self._PATH}/{post_id}")

    def create_post(self, user_id: int, title: str, body: str) -> tuple[int, dict]:
        return self.post(self._PATH, {"userId": user_id, "title": title, "body": body})

    def update_post(self, post_id: int, payload: dict) -> tuple[int, dict]:
        return self.put(f"{self._PATH}/{post_id}", payload)

    def patch_post(self, post_id: int, payload: dict) -> tuple[int, dict]:
        return self.patch(f"{self._PATH}/{post_id}", payload)

    def delete_post(self, post_id: int) -> tuple[int, dict]:
        return self.delete(f"{self._PATH}/{post_id}")
