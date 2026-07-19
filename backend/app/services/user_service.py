from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate

from app.core.exceptions import EmailAlreadyExistsException

class UserService:

    def __init__(self, db: Session):
        self.repository = UserRepository(db)

    def create_user(self, user_data: UserCreate) -> User:
        """
        Create a new user.
        """

        existing_user = self.repository.get_by_email(user_data.email)

        if existing_user:
            raise EmailAlreadyExistsException(user_data.email)

        user = User(
            name=user_data.name,
            email=user_data.email,
            hashed_password=hash_password(user_data.password),
            is_active=True,
        )

        return self.repository.create(user)