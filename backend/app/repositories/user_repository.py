from sqlalchemy.orm import Session

from app.models.user import User

from app.repositories.base_repository import BaseRepository
class UserRepository(BaseRepository[User]):

    def __init__(self, db: Session):
        """
        Initialize the user repository.
        """
        super().__init__(db)

    def get_by_email(self, email: str) -> User | None:
        """
        Find a user by email.
        """
        return (
            self.db.query(User)
            .filter(User.email == email)
            .first()
        )

    def get_by_id(self, user_id: int) -> User | None:
        """
        Find a user by ID.
        """
        return (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    def create(self, user: User) -> User:
        """
        Save a new user.
        """
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update(self, user: User) -> User:
        """
        Update an existing user.
        """
        self.db.commit()
        self.db.refresh(user)
        return user

    def delete(self, user: User) -> None:
        """
        Delete a user.
        """
        self.db.delete(user)
        self.db.commit()