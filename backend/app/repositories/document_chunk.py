from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk


class DocumentChunkRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        document_id: int,
        chunk_index: int,
        chunk_text: str,
        embedding: list[float],
    ) -> DocumentChunk:

        chunk = DocumentChunk(
            document_id=document_id,
            chunk_index=chunk_index,
            chunk_text=chunk_text,
            embedding=embedding,
        )

        self.db.add(chunk)

        return chunk

    def search_similar(
        self,
        embedding: list[float],
        limit: int = 5,
    ) -> list[tuple[DocumentChunk, float]]:

        distance = (
            DocumentChunk.embedding
            .cosine_distance(embedding)
            .label("distance")
        )

        statement = (
            select(
                DocumentChunk,
                distance,
            )
            .order_by(distance)
            .limit(limit)
        )

        return list(
            self.db.execute(statement).all()
        )