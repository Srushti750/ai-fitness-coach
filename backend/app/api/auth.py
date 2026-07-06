# Includes API routes

from fastapi import APIRouter
from app.schemas.user_schema import RegisterUserSchema, LoginUserSchema
from app.services.auth_service import AuthService
from fastapi import Depends
from app.core.auth import get_current_user
from app.repositories.user_repository import UserRepository

router = APIRouter()

@router.post("/register")
def register_user(register_data: RegisterUserSchema):
    return AuthService.register_user(register_data)

@router.post("/login")
def login_user(login_data : LoginUserSchema):
    return AuthService.login_user(login_data)

@router.get("/user")
def get_user(current_user=Depends(get_current_user)):
    if not current_user:
        return {
            "message" : "Invalid token"
        }
    id = current_user["sub"]
    print(id)
    user = UserRepository.get_user_by_id(id)

    if not user:
        return {
            "message" : "User not found"
        }
    
    return {
        "success": True,
        "user" : {
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"]
        }
    }

