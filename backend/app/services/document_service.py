import shutil
import uuid
from pathlib import Path

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.document import Document
from app.models.enums import DocumentStatus
from app.repositories.document_repository import DocumentRepository

from fastapi import HTTPException, status
from pathlib import Path

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

ALLOWED_CONTENT_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
}

class FileStorageService:

    def __init__(self):
        self.upload_dir = Path("uploads")
        self.upload_dir.mkdir(exist_ok=True)

    def save_file(self, file: UploadFile) -> tuple[str, str]:
        extension = Path(file.filename).suffix

        stored_filename = f"{uuid.uuid4()}{extension}"

        file_path = self.upload_dir / stored_filename

        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return stored_filename, str(file_path)

    def delete_file(self, file_path: str):
        path = Path(file_path)

        if path.exists():
            path.unlink()


class DocumentService:

    def __init__(self, db: Session):
        self.repository = DocumentRepository(db)
        self.storage = FileStorageService()

    def upload_document(
        self,
        file: UploadFile,
        user_id: int,
    ) -> Document:

        file_size = self.validate_file(file)

        stored_filename, file_path = self.storage.save_file(file)

        document = Document(
            filename=file.filename,
            stored_filename=stored_filename,
            file_path=file_path,
            mime_type=file.content_type,
            file_size=file_size,
            status=DocumentStatus.UPLOADED,
            uploaded_by=user_id,
        )

        return self.repository.create(document)
        
    def get_user_documents(
        self,
        user_id: int,
    ) -> list[Document]:
        return self.repository.get_by_user(user_id)
    
    def get_document(
        self,
        document_id: int,
        user_id: int,
    ) -> Document:

        document = self.repository.get_by_id(document_id)

        if document is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found.",
            )

        if document.uploaded_by != user_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found.",
            )

        return document
    
    def get_document_file(
        self,
        document_id: int,
        user_id: int,
    ) -> Document:

        document = self.get_document(
            document_id=document_id,
            user_id=user_id,
        )

        if not Path(document.file_path).exists():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found.",
            )

        return document
    
    def delete_document(
        self,
        document_id: int,
        user_id: int,
    ) -> None:

        document = self.get_document(
            document_id=document_id,
            user_id=user_id,
        )

        self.storage.delete_file(
            document.file_path
        )

        self.repository.delete(document)

    def validate_file(
        self,
        file: UploadFile,
    ) -> int:
        """
        Validate uploaded file and return its size.
        """

        if not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No file selected.",
            )

        if file.content_type not in ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported file type.",
            )

        file.file.seek(0, 2)
        file_size = file.file.tell()
        file.file.seek(0)

        if file_size == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File is empty.",
            )

        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File exceeds 10 MB limit.",
            )

        return file_size