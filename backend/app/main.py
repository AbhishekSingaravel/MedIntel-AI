from fastapi import FastAPI

from app.api.health import router as health_router

from app.api.config import router as config_router

from app.api.database import router as database_router

from app.api.security import router as security_router

from app.api.users import router as users_router

app = FastAPI(
    title="MedIntel AI",
    description="AI-Powered Clinical Document Intelligence Platform",
    version="1.0.0",
)

app.include_router(health_router, prefix="/api/v1")
app.include_router(config_router, prefix="/api/v1")
app.include_router(database_router, prefix="/api/v1")
app.include_router(security_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to MedIntel AI"
    }