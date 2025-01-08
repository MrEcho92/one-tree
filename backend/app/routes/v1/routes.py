from fastapi import APIRouter

from app.routes.v1 import cultural_context as cultural_context_router
from app.routes.v1 import migration_tracking as migration_tracking_router
from app.routes.v1 import tree as tree_router
from app.routes.v1 import users as user_router

api_router = APIRouter()

api_router.include_router(tree_router.router, tags=["tree"])
api_router.include_router(user_router.router, tags=["users"])
api_router.include_router(
    cultural_context_router.router,
    tags=["cultural-context"],
)
api_router.include_router(
    migration_tracking_router.router,
    tags=["migration-tracking"],
)
