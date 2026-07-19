from fastapi import APIRouter

from app.core.security import hash_password

router = APIRouter(
    prefix="/security",
    tags=["Security"],
)


@router.get("/hash")
def generate_hash(password: str):
    return {
        "hashed_password": hash_password(password)
    }