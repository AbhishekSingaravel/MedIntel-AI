from fastapi import FastAPI

from app.api.health import router as health_router

from app.api.config import router as config_router

from app.api.database import router as database_router

from app.api.security import router as security_router

from app.api.users import router as users_router

from app.handlers.exception_handlers import register_exception_handlers

from app.core.logging_config import configure_logging

from app.api.document import router as document_router

from app.api.routes import retrieval

from app.api import chat
from fastapi.middleware.cors import CORSMiddleware

configure_logging()

app = FastAPI(
    title="MedIntel AI",
    description="AI-Powered Clinical Document Intelligence Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register exception handlers
register_exception_handlers(app)

# Register routers
app.include_router(health_router, prefix="/api/v1")
app.include_router(config_router, prefix="/api/v1")
app.include_router(database_router, prefix="/api/v1")
app.include_router(security_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")
app.include_router(document_router, prefix="/api/v1")
app.include_router(retrieval.router,prefix="/api/v1")
app.include_router(chat.router, prefix="/api/v1")

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to MedIntel AI"
    }