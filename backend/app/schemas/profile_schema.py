# Includes profile schema

from enum import Enum
from pydantic import BaseModel, Field

class Gender(str, Enum):
    male = "Male"
    female = "Female"
    other = "Other"

class FitnessLevel(str, Enum):
    begineer = "Begineer"
    intermediate = "Intermidate"
    advanced = "Advanced"

class ActivityLevel(str, Enum):
    sedentary = "Sedentary"
    lightly_active = "Lightly Active"
    moderately_active = "Moderately Active"
    very_active = "Very Active"
    extremely_active = "Extremely Active"

class ProfileSchema(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    age: int = Field(..., ge=13, le=100)
    gender: Gender
    height_cm: float = Field(..., ge=50, len=300)
    weight_kg: float = Field(..., ge=20, le=500)
    fitness_level: FitnessLevel
    activity_level: ActivityLevel

class UpdateProfileSchema(ProfileSchema):
    pass