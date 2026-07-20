from sqlalchemy import ForeignKey, String, Text, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel

from app.models.enums import ChatRole


class ChatMessage(BaseModel):
    __tablename__ = "chat_messages"

    session_id: Mapped[int] = mapped_column(
        ForeignKey("chat_sessions.id"),
        nullable=False,
        index=True,
    )

    role: Mapped[ChatRole] = mapped_column(
        Enum(ChatRole),
        nullable=False,
    )

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    session = relationship(
        "ChatSession",
        back_populates="messages",
    )