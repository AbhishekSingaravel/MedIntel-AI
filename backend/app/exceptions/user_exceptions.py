class UserException(Exception):
    """Base class for user-related exceptions."""


class EmailAlreadyExistsException(UserException):
    """Raised when an email is already registered."""

    def __init__(self, email: str):
        super().__init__(f"Email '{email}' is already registered.")


class UserNotFoundException(UserException):
    """Raised when a user cannot be found."""

    def __init__(self, user_id: int | None = None):
        if user_id is not None:
            super().__init__(f"User with ID {user_id} not found.")
        else:
            super().__init__("User not found.")