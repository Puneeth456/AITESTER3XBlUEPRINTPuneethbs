# tests/test_posts.py
import pytest
from api.posts_client import PostsClient
from models.post import Post
from utils.assertions import assert_status, assert_schema


@pytest.mark.smoke
def test_get_all_posts(posts_client: PostsClient) -> None:
    status, body = posts_client.get_all_posts()
    assert_status((status, body), 200)
    assert isinstance(body, list), "Expected a list of posts"
    assert len(body) == 100, f"Expected 100 posts, got {len(body)}"
    for item in body:
        assert_schema(item, Post)


@pytest.mark.smoke
def test_get_single_post(posts_client: PostsClient) -> None:
    status, body = posts_client.get_post(1)
    assert_status((status, body), 200)
    assert_schema(body, Post)
    assert body["id"] == 1


@pytest.mark.regression
def test_create_post(posts_client: PostsClient) -> None:
    status, body = posts_client.create_post(
        user_id=1,
        title="Test Post Title",
        body="This is the body of the test post.",
    )
    assert_status((status, body), 201)
    assert body.get("id") is not None, "Expected 'id' in response after creation"
    assert body["title"] == "Test Post Title"


@pytest.mark.regression
def test_update_post(posts_client: PostsClient) -> None:
    payload = {
        "id": 1,
        "userId": 1,
        "title": "Updated Post Title",
        "body": "Updated body content.",
    }
    status, body = posts_client.update_post(1, payload)
    assert_status((status, body), 200)
    assert body["title"] == "Updated Post Title"


@pytest.mark.regression
def test_delete_post(posts_client: PostsClient) -> None:
    status, body = posts_client.delete_post(1)
    assert_status((status, body), 200)
