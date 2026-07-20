from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import DocumentStatus


class DocumentResponse(BaseModel):
    id: int
    filename: str
    mime_type: str
    file_size: int
    status: DocumentStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)