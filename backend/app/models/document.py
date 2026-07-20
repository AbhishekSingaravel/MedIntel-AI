from sqlalchemy import (
    BigInteger,
    Column,
    Enum,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship, Mapped

from app.models.base import BaseModel
from app.models.enums import DocumentStatus




class Document(BaseModel):
    __tablename__ = "documents"

    filename = Column(String(255), nullable=False)

    stored_filename = Column(
        String(255),
        nullable=False,
        unique=True,
    )

    file_path = Column(
        String(500),
        nullable=False,
    )

    mime_type = Column(
        String(100),
        nullable=False,
    )

    file_size = Column(
        BigInteger,
        nullable=False,
    )

    status = Column(
        Enum(DocumentStatus),
        nullable=False,
        default=DocumentStatus.UPLOADED,
    )

    uploaded_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="documents",
    )