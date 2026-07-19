class EmailAlreadyExistsException(Exception):
    """Raised when a user tries to register with an existing email."""

    def __init__(self, email: str):
        self.email = email
        super().__init__(f"Email '{email}' is already registered.")