# tests/conftest.py  (test-scoped client fixtures)
import pytest
from playwright.sync_api import APIRequestContext
from api.users_client import UsersClient
from api.posts_client import PostsClient


@pytest.fixture(scope="session")
def users_client(api_context: APIRequestContext) -> UsersClient:
    return UsersClient(api_context)


@pytest.fixture(scope="session")
def posts_client(api_context: APIRequestContext) -> PostsClient:
    return PostsClient(api_context)
