from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.dashboard import dashboard_api as dashboard_router
from app.api.auth import router as auth_api
from app.api.profile import router as profile_api
from app.api.goals import router as goal_api

app = FastAPI()

app.include_router(
    dashboard_router,
    prefix="/app/fitness"
)

app.include_router(
    auth_api,
    prefix="/app/fitness/auth",
    tags="Authentication"
)

app.include_router(
    profile_api,
    prefix="/app/fitness/profile",
    tags="Profile"
)

app.include_router(
    goal_api,
    prefix="/app/fitness/goals",
    tags="Goals"
)

@app.get("/")
def home():
    return {
        "message": "AI Fitness Application Running Successfully"
    }


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)