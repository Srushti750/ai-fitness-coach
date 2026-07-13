from datetime import datetime
from app.models.goal_model import GoalModel
from app.utils.api_response import success_response, error_response
from app.repositories.goal_repository import GoalRepository
from app.repositories.user_repository import UserRepository

class GoalService:
    def create_goal(user_id: str, goal_data: dict):
        if goal_data.get("is_primary"):
            GoalRepository.clear_primary_goal(user_id)
        goal = GoalModel(user_id=user_id, **goal_data)
        result = GoalRepository.create_goal(goal.to_dict())
        return result

    def get_goal(goal_id: str, user_id:str):
        result = GoalRepository.get_goal_by_id(goal_id, user_id)
        if result is None:
            return error_response(
                "Goal Does not exist"
            )
        result["_id"] = str(result["_id"])
        return success_response(
            message="Goal fetched successfully",
            data=result
        )

    def get_all_goals(user_id: str):
        result = GoalRepository.get_goals_by_user(user_id)
        if result is None:
            return error_response(
                "Goals does not exist"
            )   
        return success_response(
            message="All goals fetched successfully",
            data=[{**goal, "_id": str(goal["_id"])} for goal in result]
        )
    def update_goal(goal_id, user_id, updated_data):
        if updated_data.get("is_primary"):
            GoalRepository.clear_primary_goal(user_id)

        updated_data["updated_at"] = datetime.now()
        
        updated = GoalRepository.update_goal(goal_id, updated_data, user_id)
        print("Updated goal = " , updated)

        if updated.matched_count == 0:
            return error_response(
                "Goal not found"
            )
        if updated.modified_count == 0:
            return success_response(
                message="Goal is already updated"
            )
        
        updated_goal = GoalRepository.get_goal_by_id(goal_id, user_id)
        print("Updated goal = ", updated_goal)

        updated_goal["_id"] = str(updated_goal["_id"])
        
        return success_response(
            message="Goal is updated successfully",
            data=updated_goal
        )
    
    def delete_goal(goal_id: str, user_id):
        id = GoalRepository.get_goal_by_id(goal_id, user_id)
        if id is None:
            error_response(
                "Goal not found"
            )
        else:
            print("Goal id = ", id)

        deleted = GoalRepository.delete_goal(goal_id, user_id)
        # deleted["_id"] = str(deleted["_id"])
        print("Deleted goal = " , deleted)

        return success_response(
            message="Goal deleted successfully",
            data=str(deleted)
        )
    
    def get_goal_options():
        options = GoalRepository.get_goals_options()
        if options is None:
            return error_response(
                "Goals are not fetched"
            )
        
        return success_response(
            message="Goal options fetched successfully",
            data = options
        )