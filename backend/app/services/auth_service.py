from sqlalchemy.orm import Session

from app.core.jwt import create_access_token
from app.core.security import verify_password
from app.repositories.user_repository import UserRepository
from app.schemas.user import TokenResponse, UserLogin

from app.exceptions.auth_exceptions import InvalidCredentialsException

import logging

logger = logging.getLogger(__name__)

class AuthenticationService:

    def __init__(self, db: Session):
        self.repository = UserRepository(db)

    def login(
        self,
        login_data: UserLogin,
    ) -> TokenResponse:
        """
        Authenticate a user and generate an access token.
        """
        logger.info(
            "Login attempt for '%s'.",
            login_data.email,
        )
        user = self.repository.get_by_email(login_data.email)

        if user is None:
            logger.warning(
                "Unknown email '%s'.",
                login_data.email,
            )
            raise InvalidCredentialsException()

        if not verify_password(
            login_data.password,
            user.hashed_password,
        ):
            logger.warning(
                "Invalid password for '%s'.",
                login_data.email,
            )
            raise InvalidCredentialsException()

        access_token = create_access_token(
            subject=str(user.id),
        )

        logger.info(
            "User '%s' logged in successfully.",
            user.email,
        )
        
        return TokenResponse(
            access_token=access_token,
        )

        