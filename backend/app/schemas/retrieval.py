from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    query: str = Field(
        min_length=1,
        max_length=1000,
    )

    limit: int = Field(
        default=5,
        ge=1,
        le=20,
    )


class SearchResult(BaseModel):
    document_id: int
    chunk_index: int
    distance: float
    chunk_text: str


class SearchResponse(BaseModel):
    results: list[SearchResult]