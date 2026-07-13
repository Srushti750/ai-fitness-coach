from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional

class GoalCreateSchema(BaseModel):
    title : str = Field(..., min_length=3, max_length=100)
    goal_type : str
    target_value : float
    current_value : float
    target_date : Optional[datetime] = None
    notes : Optional[str] = ""
    is_primary : bool = False

class GoalUpdateSchema(BaseModel):
    title : Optional[str] = None
    goal_type : Optional[str] = None
    target_value : Optional[float] = None
    current_value : Optional[float] = None
    target_date : Optional[datetime] = None
    notes : Optional[str] = None
    is_primary : Optional[bool] = None
    status : Optional[str] = None

# Schema to return goals details to frontend
class GoalResponseSchema(BaseModel):
    id : str
    title : str
    goal_type : str
    target_value : float
    current_value : float
    target_date : Optional[datetime]
    notes : str
    is_primary : bool
    status : str
    created_at : datetime
    updated_at : Optional[datetime]

# Schema to return goal type and statuses for dropdown
class GoalOptionsResponseSchema(BaseModel):
    goal_type : list[str]
    statuses : list[str]