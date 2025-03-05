from fastapi import APIRouter, Depends, HTTPException, status
from firebase_admin import auth
from pydantic import BaseModel

from app.common.auth_helpers import check_roles

router = APIRouter()


class RoleAssignment(BaseModel):
    uid: str
    roles: list[str]


@router.post("/admin/set-user-roles")
async def set_user_roles(data: RoleAssignment, user=Depends(check_roles(["admin"]))):
    """Assign multiple roles to a Firebase user via Custom Claims. Requires Admin role."""
    try:
        auth.set_custom_user_claims(data.uid, {"roles": data.roles})
        return {"message": f"Roles {data.roles} assigned to user {data.uid}"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
