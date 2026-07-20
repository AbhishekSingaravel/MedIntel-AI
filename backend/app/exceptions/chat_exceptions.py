class ChatException(Exception):
    """Base class for chat-related exceptions."""


class ChatSessionNotFoundException(ChatException):
    """Raised when a chat session cannot be found."""

    def __init__(self, session_id: int):
        super().__init__(
            f"Chat session with ID {session_id} not found."
        )