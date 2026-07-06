# Includes user documents

from datetime import datetime, timezone


class UserModel:

    def __init__(
        self,
        username: str,
        email: str,
        password: str
    ):
        self.username = username
        self.email = email
        self.password = password

        self.profile = {
            "full_name": None,
            "age": None,
            "gender": None,
            "height_cm": None,
            "weight_kg": None,
            "fitness_level": None,
            "activity_level": None
        }
        current_time = datetime.now(timezone.utc)

        self.created_at = current_time
        self.updated_at = current_time
        

    def to_dict(self):
        """
        Convert the UserModel object into a dictionary
        for insertion into MongoDB.
        """

        return {
            "username": self.username,
            "email": self.email,
            "password": self.password,
            "profile": self.profile,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

# from datetime import datetime

# class UserModel:
#     def __init__(
#             self,
#             username: str,
#             email: str,
#             password: str,
#             full_name: str = None,
#             age: int = None,
#             gender: str = None,
#             height: float = None,
#             current_weight: float = None,
#             fitness_level: str = None
#         ):
#         self.username = username
#         self.email = email
#         self.password = password
#         self.full_name = full_name
#         self.age = age
#         self.gender = gender
#         self.height = height
#         self.current_weight = current_weight
#         self.fitness_level = fitness_level
#         self.created_at = datetime.now()
#         self.updated_at = None

#     def to_dict(self):
#         return {
#             "username" : self.username,
#             "email" : self.email,
#             "password" : self.password,
#             "full_name" : self.full_name,
#             "age" : self.age,
#             "gender" : self.gender,
#             "height" : self.height,
#             "current_weight" : self.current_weight,
#             "fitness_level" : self.fitness_level,
#             "created_at" : self.created_at,
#             "updated_at" : self.updated_at
#         }

