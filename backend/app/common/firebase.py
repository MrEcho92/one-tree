from fastapi import HTTPException, Request, status
from firebase_admin import auth


async def verify_firebase_token(request: Request):
    """Middleware to verify Firebase token in Authorization header."""
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization Token",
        )

    token = token.replace("Bearer ", "")
    try:
        decoded_token = auth.verify_id_token(token)
        user_id = decoded_token.get("uid")
        user_roles = decoded_token.get("roles")

        if user_roles is None and user_id:
            # default user role
            auth.set_custom_user_claims(user_id, {"roles": ["user"]})

        return decoded_token  # Contains user info like 'uid', 'email'
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or Expired Token"
        )
