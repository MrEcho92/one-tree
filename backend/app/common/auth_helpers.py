from fastapi import Depends, HTTPException, status

from app.common.firebase import verify_firebase_token


def check_roles(required_roles: list):
    """Dependency to check if user has at least one required role."""

    def role_dependency(user=Depends(verify_firebase_token)):
        if not any(role in user["roles"] for role in required_roles):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions"
            )
        return user

    return role_dependency
