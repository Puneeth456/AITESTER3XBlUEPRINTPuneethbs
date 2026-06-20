# tests/test_users.py
import pytest
from api.users_client import UsersClient
from models.user import User
from utils.assertions import assert_status, assert_schema


@pytest.mark.smoke
def test_get_all_users(users_client: UsersClient) -> None:
    status, body = users_client.get_all_users()
    assert_status((status, body), 200)
    assert isinstance(body, list), "Expected a list of users"
    assert len(body) == 10, f"Expected 10 users, got {len(body)}"
    for item in body:
        assert_schema(item, User)


@pytest.mark.smoke
def test_get_single_user(users_client: UsersClient) -> None:
    status, body = users_client.get_user(1)
    assert_status((status, body), 200)
    assert_schema(body, User)
    assert body["id"] == 1


@pytest.mark.regression
def test_create_user(users_client: UsersClient) -> None:
    status, body = users_client.create_user(
        name="Jane Doe",
        username="janedoe",
        email="jane.doe@example.com",
    )
    assert_status((status, body), 201)
    assert body.get("id") is not None, "Expected 'id' in response after creation"
    assert body["name"] == "Jane Doe"


@pytest.mark.regression
def test_update_user(users_client: UsersClient) -> None:
    payload = {
        "id": 1,
        "name": "Updated Name",
        "username": "updateduser",
        "email": "updated@example.com",
    }
    status, body = users_client.update_user(1, payload)
    assert_status((status, body), 200)
    assert body["name"] == "Updated Name"


@pytest.mark.regression
def test_delete_user(users_client: UsersClient) -> None:
    status, body = users_client.delete_user(1)
    assert_status((status, body), 200)
