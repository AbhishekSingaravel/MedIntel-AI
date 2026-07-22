from sqlalchemy.orm import Session

from app.ai.context_builder import ContextBuilder
from app.ai.prompt_builder import PromptBuilder
from app.ai.retriever import Retriever
from app.ai.llm.manager import LLMManager

from app.exceptions.chat_exceptions import ChatSessionNotFoundException
from app.models.enums import ChatRole
from app.repositories.chat_message import ChatMessageRepository
from app.repositories.chat_session import ChatSessionRepository
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ConversationResponse,
)


class ChatService:

    def __init__(self, db: Session):

        self.retriever = Retriever(db)
        self.context_builder = ContextBuilder()
        self.prompt_builder = PromptBuilder()
        self.llm_manager = LLMManager()

        self.chat_session_repository = ChatSessionRepository(db)
        self.chat_message_repository = ChatMessageRepository(db)

    def chat(
        self,
        request: ChatRequest,
    ) -> ChatResponse:
        print("================================")
        print("Question    :", request.question)
        print("Document ID :", request.document_id)
        print("Session ID  :", request.session_id)
        print("================================")
        if request.session_id is None:

            session = self.chat_session_repository.create(
                title=request.question[:50],
                user_id=1,  # TODO: Replace with authenticated user's ID
            )

        else:

            session = self.chat_session_repository.get_by_id(
                request.session_id,
            )

            if session is None:
                raise ChatSessionNotFoundException(
                    request.session_id,
                )

        self.chat_message_repository.create(
            session_id=session.id,
            role=ChatRole.USER,
            message=request.question,
        )
        print(f"Received document ID: {request.document_id}")
        retrieved_chunks = self.retriever.retrieve(
            query=request.question,
            document_id=request.document_id,
        )

        context = self.context_builder.build(
            retrieved_chunks,
        )

        prompt = self.prompt_builder.build(
            question=request.question,
            context=context,
        )

        answer = self.llm_manager.generate(
            provider=request.provider,
            model=request.model,
            prompt=prompt,
        )

        self.chat_message_repository.create(
            session_id=session.id,
            role=ChatRole.ASSISTANT,
            message=answer,
        )

        return ChatResponse(
            session_id=session.id,
            answer=answer,
        )

    def get_sessions(self):

        return self.chat_session_repository.get_by_user(
            user_id=1,
        )

    def get_conversation(
        self,
        session_id: int,
    ) -> ConversationResponse:

        session = self.chat_session_repository.get_by_id(
            session_id,
        )

        if session is None:
            raise ChatSessionNotFoundException(
                session_id,
            )

        messages = self.chat_message_repository.get_by_session(
            session_id,
        )

        return ConversationResponse(
            session=session,
            messages=messages,
        )

    def delete_session(
        self,
        session_id: int,
    ):

        session = self.chat_session_repository.get_by_id(
            session_id,
        )

        if session is None:
            raise ChatSessionNotFoundException(
                session_id,
            )

        self.chat_session_repository.delete(
            session,
        )