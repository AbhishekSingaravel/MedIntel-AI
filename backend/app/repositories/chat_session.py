from sqlalchemy.orm import Session

from app.models.chat_session import ChatSession


class ChatSessionRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        title: str,
        user_id: int,
    ) -> ChatSession:

        session = ChatSession(
            title=title,
            user_id=user_id,
        )

        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)

        return session

    def get_by_id(
        self,
        session_id: int,
    ) -> ChatSession | None:

        return (
            self.db.query(ChatSession)
            .filter(ChatSession.id == session_id)
            .first()
        )

    def get_by_user(
        self,
        user_id: int,
    ) -> list[ChatSession]:

        return (
            self.db.query(ChatSession)
            .filter(ChatSession.user_id == user_id)
            .order_by(ChatSession.updated_at.desc())
            .all()
        )

    def delete(
        self,
        session: ChatSession,
    ) -> None:

        self.db.delete(session)
        self.db.commit()