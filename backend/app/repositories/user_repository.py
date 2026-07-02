# Includes database operations

from bson import ObjectId

from app.database.connection import db


class UserRepository:
    def create_user(user_data:dict):
        result = db.users.insert_one(user_data)
        return result.inserted_id
    
    def get_user_by_email(email:str):
        return db.users.find_one({"email":email})
    
    def get_user_by_id(user_id: str):
        return db.users.find_one(
            {
                "_id": ObjectId(user_id)
             }
        )