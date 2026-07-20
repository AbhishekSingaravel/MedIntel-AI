from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

from app.schemas.chat import ChatSessionResponse , ConversationResponse

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    chat_service = ChatService(db)

    return chat_service.chat(request)

@router.get(
    "/sessions",
    response_model=list[ChatSessionResponse],
)
def get_sessions(
    db: Session = Depends(get_db),
):

    chat_service = ChatService(db)

    return chat_service.get_sessions()

@router.get(
    "/{session_id}",
    response_model=ConversationResponse,
)
def get_conversation(
    session_id: int,
    db: Session = Depends(get_db),
):

    chat_service = ChatService(db)

    return chat_service.get_conversation(session_id)

@router.delete("/{session_id}")
def delete_session(
    session_id: int,
    db: Session = Depends(get_db),
):

    chat_service = ChatService(db)

    chat_service.delete_session(session_id)

    return {
        "message": "Conversation deleted successfully."
    }