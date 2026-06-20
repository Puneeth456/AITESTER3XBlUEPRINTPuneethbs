# models/user.py
from pydantic import BaseModel, EmailStr
from typing import Optional


class User(BaseModel):
    id: Optional[int] = None
    name: str
    username: str
    email: str
