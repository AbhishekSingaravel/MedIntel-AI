from sqlalchemy.orm import Session

from app.models.chat_message import ChatMessage


class ChatMessageRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        session_id: int,
        role: str,
        message: str,
    ) -> ChatMessage:

        chat_message = ChatMessage(
            session_id=session_id,
            role=role,
            message=message,
        )

        self.db.add(chat_message)
        self.db.commit()
        self.db.refresh(chat_message)

        return chat_message

    def get_by_session(
        self,
        session_id: int,
    ) -> list[ChatMessage]:

        return (
            self.db.query(ChatMessage)
            .filter(ChatMessage.session_id == session_id)
            .order_by(ChatMessage.created_at.asc())
            .all()
        )