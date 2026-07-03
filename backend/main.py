from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.dashboard import dashboard_api as dashboard_router
from app.api.dashboard import dashboard_api as db_status
from app.api.auth import auth_api as auth_api

app = FastAPI()

app.include_router(
    dashboard_router,
    prefix="/app/fitness"
)

app.include_router(
    db_status,
    prefix="/app/fitness"
)

app.include_router(
    auth_api,
    prefix="/app/fitness/auth",
    tags="Authentication"
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