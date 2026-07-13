from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.schemas.profile_schema import UpdateProfileSchema
from app.services.profile_service import ProfileService

router = APIRouter()

@router.get("")
def get_profile(current_user=Depends(get_current_user)):
    id = current_user["sub"]
    return ProfileService.get_profile(id)

@router.put("")
def update_profile(profile: UpdateProfileSchema, current_user=Depends(get_current_user)):
    id = current_user["sub"]
    return ProfileService.update_profile(id, profile.model_dump())

@router.get("/options")
def get_profile_options():
    return ProfileService.get_profile_options()