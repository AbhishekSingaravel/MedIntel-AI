from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.document import Document
from app.repositories.base_repository import BaseRepository


class DocumentRepository(BaseRepository[Document]):

    def __init__(self, db: Session):
        super().__init__(db)

    def create(self, document: Document) -> Document:
        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)
        return document

    def get_by_id(self, document_id: int) -> Optional[Document]:
        return (
            self.db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )

    def get_by_user(self, user_id: int) -> List[Document]:
        return (
            self.db.query(Document)
            .filter(Document.uploaded_by == user_id)
            .order_by(Document.created_at.desc())
            .all()
        )

    def delete(self, document: Document) -> None:
        self.db.delete(document)
        self.db.commit()

    def update(
        self,
        document: Document,
    ) -> Document:
        self.db.commit()
        self.db.refresh(document)
        return document