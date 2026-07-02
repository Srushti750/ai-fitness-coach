# Includes to reuse the authentication of logged in user

from app.core.jwt_handler import verify_access_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        return None

    try:
        token = credentials.credentials
        print("Extracted Token = ", token)
    except Exception as e:
        print("Authorization Error:", e)
        return None

    payload = verify_access_token(token)

    if not payload:
        return None

    return payload