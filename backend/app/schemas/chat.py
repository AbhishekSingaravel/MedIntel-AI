from pydantic import BaseModel, ConfigDict

from app.ai.llm.models import LLMProvider
from typing import Optional


class ChatRequest(BaseModel):
    session_id: Optional[int] = None
    question: str
    provider: str
    model: str
    document_id: Optional[int] = None


class ChatResponse(BaseModel):
    session_id: int
    answer: str


class ChatSessionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str


class ChatMessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    role: str
    message: str


class ConversationResponse(BaseModel):
    session: ChatSessionResponse
    messages: list[ChatMessageResponse]