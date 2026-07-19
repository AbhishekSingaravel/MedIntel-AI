from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(prefix="/config", tags=["Configuration"])


@router.get("")
def get_configuration():
    return {
        "app_name": settings.app_name,
        "version": settings.app_version,
        "environment": settings.app_env,
        "database": settings.db_name,
    }