from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.schemas.goal_schema import GoalCreateSchema, GoalUpdateSchema
from app.services.goal_service import GoalService
from app.utils.api_response import success_response, error_response

router = APIRouter()

@router.post("")
def create_goal(goal: GoalCreateSchema, current_user=Depends(get_current_user)):
    id = current_user["sub"]
    goal = GoalService.create_goal(id, goal.model_dump())
    if goal is None:
        return error_response(
            "Error in creating the goal"
        )
    return success_response(
        message="Goal created successfully",
        data=str(goal["_id"]) 
    )

@router.get("/options")
def get_goal_options():
    return GoalService.get_goal_options()

@router.get("/{goal_id}")
def get_goal(goal_id:str, current_user=Depends(get_current_user)):
    id = current_user["sub"]
    return GoalService.get_goal(goal_id, id)

@router.get("")
def get_all_goals(current_user=Depends(get_current_user)):
    id = current_user["sub"]
    return GoalService.get_all_goals(id)

@router.put("/{goal_id}")
def update_goal(goal_id:str, goal:GoalUpdateSchema, current_user=Depends(get_current_user)):
    id = current_user["sub"]
    return GoalService.update_goal(goal_id, id, goal.model_dump(exclude_unset=True))

@router.delete("/{goal_id}")
def delete_goal(goal_id:str, current_user=Depends(get_current_user)):
    id = current_user["sub"]
    return GoalService.delete_goal(goal_id, id)