# Includes the business logic layer for profile module

from app.repositories.profile_repository import ProfileRepository
from app.utils.api_response import success_response, error_response

class ProfileService:
    def get_profile(user_id: str):
        profile = ProfileRepository.get_profile(user_id)
        if profile is None:
            return error_response(
                "Profile not found"
                )
        
        return success_response(
            message="Profile fetched successfully",
            data = profile
        )
    
    def update_profile(user_id:str, profile_data: dict):
        print("user_id = " , user_id)
        updated = ProfileRepository.update_profile(user_id, profile_data)
        print("updated = " , updated)
        if updated == 0:
            return error_response(
                "Profile could not be updated"
                )
        updated_profile = ProfileRepository.get_profile(user_id)
        print("updated profile = ", updated_profile)
        return success_response(
            message="Profile updated successfully",
            data=updated_profile
        )

    def get_profile_options():
        options = ProfileRepository.get_profile_options()
        if options is None:
            return error_response(
                "Profile are not fetched"
            )
        
        return success_response(
            message="Profile options fetched successfully",
            data = options
        )