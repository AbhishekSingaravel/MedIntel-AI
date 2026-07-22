from sqlalchemy.orm import Session

from app.ai.models import embedding_generator
from app.models.document_chunk import DocumentChunk
from app.repositories.document_chunk import DocumentChunkRepository


class Retriever:

    def __init__(self, db: Session):
        self.repository = DocumentChunkRepository(db)

    def retrieve(
        self,
        query: str,
        document_id: int | None = None,
        limit: int = 5,
    ):

        embedding = embedding_generator.generate(
            [query]
        )[0]

        return self.repository.search_similar(
            embedding=embedding,
            document_id=document_id,
            limit=limit,
        )