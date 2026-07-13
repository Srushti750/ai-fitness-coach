# Includes goal documents

from datetime import datetime, timezone

class GoalModel:
    def __init__(
        self,
        user_id: str,
        title: str,
        goal_type: str,
        target_value: float,
        current_value: float,
        target_date=None,
        notes: str = "",
        is_primary: bool = False,
        status: str = "Active"
    ):

        self.user_id = user_id
        self.title = title
        self.goal_type = goal_type
        self.target_value = target_value
        self.current_value = current_value
        self.target_date = target_date
        self.notes = notes
        self.is_primary = is_primary
        self.status = status
        self.created_at = datetime.now(timezone.utc)
        self.updated_at = None
    
    def to_dict(self):
        return{
            "user_id" : self.user_id,
            "title" : self.title,
            "goal_type" : self.goal_type,
            "target_value" : self.target_value,
            "current_value" : self.current_value,
            "target_date" : self.target_date,
            "notes" : self.notes,
            "is_primary" : self.is_primary,
            "status" : self.status,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at
        }
    