from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.ai.retriever import Retriever
from app.database.database import get_db
from app.schemas.retrieval import (
    SearchRequest,
    SearchResponse,
    SearchResult,
)

router = APIRouter(
    prefix="/retrieval",
    tags=["Retrieval"],
)


@router.post(
    "/search",
    response_model=SearchResponse,
)
def search(
    request: SearchRequest,
    db: Session = Depends(get_db),
):

    retriever = Retriever(db)

    results = retriever.retrieve(
        query=request.query,
        limit=request.limit,
    )

    return SearchResponse(
        results=[
            SearchResult(
                document_id=chunk.document_id,
                chunk_index=chunk.chunk_index,
                distance=distance,
                chunk_text=chunk.chunk_text,
            )
            for chunk, distance in results
        ]
    )