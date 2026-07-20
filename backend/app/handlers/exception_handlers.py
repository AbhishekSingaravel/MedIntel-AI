from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.exceptions.auth_exceptions import (
    InvalidCredentialsException,
    InvalidTokenException,
    TokenExpiredException,
)

from app.exceptions.user_exceptions import (
    EmailAlreadyExistsException,
    UserNotFoundException,
)

from app.exceptions.chat_exceptions import (
    ChatSessionNotFoundException,
)

def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(EmailAlreadyExistsException)
    async def email_exists_handler(
        request: Request,
        exc: EmailAlreadyExistsException,
    ):
        return JSONResponse(
            status_code=409,
            content={
                "detail": str(exc),
            },
        )
    
    @app.exception_handler(InvalidCredentialsException)
    async def invalid_credentials_handler(
        request: Request,
        exc: InvalidCredentialsException,
    ):
        return JSONResponse(
            status_code=401,
            content={
                "detail": str(exc),
            },
        )
    
    @app.exception_handler(UserNotFoundException)
    async def user_not_found_handler(
        request: Request,
        exc: UserNotFoundException,
    ):
        return JSONResponse(
            status_code=404,
            content={
                "detail": str(exc),
            },
        )

    @app.exception_handler(InvalidTokenException)
    async def invalid_token_handler(
        request: Request,
        exc: InvalidTokenException,
    ):
        return JSONResponse(
            status_code=401,
            content={
                "detail": str(exc),
            },
        )

    @app.exception_handler(TokenExpiredException)
    async def token_expired_handler(
        request: Request,
        exc: TokenExpiredException,
    ):
        return JSONResponse(
            status_code=401,
            content={
                "detail": str(exc),
            },
        )

    @app.exception_handler(ChatSessionNotFoundException)
    async def chat_session_not_found_handler(
        request: Request,
        exc: ChatSessionNotFoundException,
    ):
        return JSONResponse(
            status_code=404,
            content={
                "detail": str(exc),
            },
        )
