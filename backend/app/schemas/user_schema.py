# Include to validate the user requests

from pydantic import BaseModel, EmailStr, Field

class RegisterUserSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)


class LoginUserSchema(BaseModel):
    email: EmailStr
    password: str


class UserResponseSchema(BaseModel):
    id: str
    username: str
    email: EmailStr