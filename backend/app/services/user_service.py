from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate

from app.exceptions.user_exceptions import EmailAlreadyExistsException
from app.models.enums import UserRole

import logging

logger = logging.getLogger(__name__)

class UserService:

    def __init__(self, db: Session):
        self.repository = UserRepository(db)

    def create_user(self, user_data: UserCreate) -> User:
        """
        Create a new user.
        """
        logger.info(
            "Attempting to register user '%s'.",
            user_data.email,
        )
        existing_user = self.repository.get_by_email(user_data.email)

        if existing_user:
            logger.warning(
                "Registration failed. Email '%s' already exists.",
                user_data.email,
            )
            raise EmailAlreadyExistsException(user_data.email)

        user = User(
            name=user_data.name,
            email=user_data.email,
            hashed_password=hash_password(user_data.password),
            is_active=True,
            role=UserRole.USER,
        )

        created_user = self.repository.create(user)

        logger.info(
            "User '%s' registered successfully.",
            created_user.email,
        )

        return created_user