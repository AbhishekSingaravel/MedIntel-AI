class AuthenticationException(Exception):
    """Base class for authentication-related exceptions."""


class InvalidCredentialsException(AuthenticationException):
    """Raised when login credentials are invalid."""

    def __init__(self):
        super().__init__("Invalid email or password.")


class InvalidTokenException(AuthenticationException):
    """Raised when a JWT token is invalid."""

    def __init__(self):
        super().__init__("Invalid authentication token.")


class TokenExpiredException(AuthenticationException):
    """Raised when a JWT token has expired."""

    def __init__(self):
        super().__init__("Authentication token has expired.")