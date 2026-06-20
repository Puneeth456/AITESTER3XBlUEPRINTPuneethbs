# models/post.py
from pydantic import BaseModel
from typing import Optional


class Post(BaseModel):
    id: Optional[int] = None
    userId: int
    title: str
    body: str
