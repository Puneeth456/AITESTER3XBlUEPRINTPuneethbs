# utils/assertions.py
from typing import Type
from pydantic import BaseModel, ValidationError


def assert_status(response_tuple: tuple[int, dict | list], expected: int) -> None:
    status, body = response_tuple
    assert status == expected, (
        f"Expected HTTP {expected}, got {status}. Response body: {body}"
    )


def assert_schema(data: dict, model_class: Type[BaseModel]) -> None:
    try:
        model_class.model_validate(data)
    except ValidationError as exc:
        raise AssertionError(
            f"Schema validation failed for {model_class.__name__}:\n{exc}"
        ) from exc
