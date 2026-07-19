from sqlalchemy.orm import Session

from app.core.jwt import create_access_token
from app.core.security import verify_password
from app.repositories.user_repository import UserRepository
from app.schemas.user import TokenResponse, UserLogin


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

        user = self.repository.get_by_email(login_data.email)

        if user is None:
            raise ValueError("Invalid email or password.")

        if not verify_password(
            login_data.password,
            user.hashed_password,
        ):
            raise ValueError("Invalid email or password.")

        access_token = create_access_token(
            subject=str(user.id),
        )

        return TokenResponse(
            access_token=access_token,
        )