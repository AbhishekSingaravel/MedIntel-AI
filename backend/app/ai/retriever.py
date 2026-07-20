from sqlalchemy.orm import Session

from app.ai.models import embedding_generator
from app.models.document_chunk import DocumentChunk
from app.repositories.document_chunk import DocumentChunkRepository

# from pydantic import BaseModel, Field


class Retriever:

    def __init__(self, db: Session):
        self.repository = DocumentChunkRepository(db)

    def retrieve(
        self,
        query: str,
        limit: int = 5,
    ) -> list[tuple[DocumentChunk, float]]:

        embedding = embedding_generator.generate(
            [query]
        )[0]

        return self.repository.search_similar(
            embedding=embedding,
            limit=limit,
        )
    
# class SearchRequest(BaseModel):
#     query: str = Field(
#         min_length=1,
#         max_length=1000,
#     )

#     limit: int = Field(
#         default=5,
#         ge=1,
#         le=20,
#     )

# class SearchResult(BaseModel):
#     document_id: int
#     chunk_index: int
#     chunk_text: str


# class SearchResponse(BaseModel):
#     results: list[SearchResult]