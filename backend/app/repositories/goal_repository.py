# Includes operations/interaction of goal module with database

from bson import ObjectId
from app.database.connection import db
from app.config.constants import GOAL_TYPES, GOAL_STATUSES

class GoalRepository:
    def create_goal(goal_data: dict):
        result = db.goals.insert_one(goal_data)
        goal_data["_id"] = result.inserted_id
        print("Goal Data = " , goal_data)
        return str(goal_data)
    
    def get_goal_by_id(goal_id: str, user_id:str):
        return db.goals.find_one(
            {
                "_id" : ObjectId(goal_id),
                "user_id" : user_id
            }
        )

    # def get_goal_by_id(goal_id: str, user_id:str):
    #     goal = db.goals.find_one(
    #         {
    #             "_id" : ObjectId(goal_id),
    #             "user_id" : user_id
    #         }
    #     )
    #     print("User id = ", user_id)
    #     print("Goal = " , goal)
    #     return str(goal)

    def get_goals_by_user(user_id: str):
        return db.goals.find(
            {
                "user_id" : user_id
            }
        )

    # def get_goals_by_user(user_id: str):
    #     goals = db.goals.find_one(
    #         {
    #             "user_id" : user_id
    #         }
    #     )
    #     print("Goals = " , goals)
    #     return str(goals)

    def update_goal(goal_id: str, updated_data: dict, user_id):
        return db.goals.update_one(
            {
                "_id": ObjectId(goal_id),
                "user_id": user_id
            },
            {
                "$set": updated_data
            }
        )
    
    # def update_goal(goal_id: str, updated_data: dict, user_id):
    #     result = db.goals.update_one(
    #         {
    #             "_id": ObjectId(goal_id),
    #             "user_id": user_id
    #         },
    #         {
    #             "$set": updated_data
    #         }
    #     )
    #     return result

    def delete_goal(goal_id: str, user_id):
        return db.goals.delete_one(
            {
                "_id": ObjectId(goal_id),
                "user_id": user_id
            }
        )

    # def delete_goal(goal_id: str, user_id):
    #     result = db.goals.delete_one(
    #         {
    #             "_id": ObjectId(goal_id),
    #             "user_id": user_id
    #         }
    #     )
    #     return str(result)

    def get_primary_goal(user_id: str):
        return db.goals.find_one(
            {
                "user_id": user_id,
                "is_primary": True
            }
        )

    # def get_primary_goal(user_id: str):
    #     goal = db.goals.find_one(
    #         {
    #             "user_id": user_id,
    #             "is_primary": True
    #         }
    #     )
    #     return str(goal)

    def clear_primary_goal(user_id: str):
        db.goals.update_many(
            {
                "user_id" : user_id,
                "is_primary" : True
            },
            {
                "$set" : {
                    "is_primary" : False
                }
            }
        )

    def get_goals_options():
        return {
            "goal_type" : GOAL_TYPES,
            "statuses" : GOAL_STATUSES
        }
