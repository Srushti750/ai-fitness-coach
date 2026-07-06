# Includes operations of profile module with database

from bson import ObjectId
from app.database.connection import db
from app.schemas.profile_schema import Gender, FitnessLevel, ActivityLevel

class ProfileRepository:

    # Fetches profile details of logged in user
    def get_profile(user_id: str):
        user = db.users.find_one(
            {"_id" : ObjectId(user_id)},
            {"profile" : 1, "_id" : 0}
        )
        if user:
            return user.get("profile")

        return None
    
    # Update user's profile
    def update_profile(user_id: str, profile_data: dict):
        result = db.users.update_one(
            {"_id" : ObjectId(user_id)},
            {
                "$set" : {
                    "profile" : profile_data
                }
            }
        )
        print("Matched:", result.matched_count)
        print("Modified:", result.modified_count)
        return result.modified_count
    
    # Return all dropdown options
    def get_profile_options():
        return {
            "gender" : [gender.value for gender in Gender],
            "fitness_level" : [level.value for level in FitnessLevel],
            "activity_level" : [level.value for level in ActivityLevel]
        }