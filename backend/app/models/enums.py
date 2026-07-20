from enum import Enum


class UserRole(str, Enum):
    USER = "USER"
    ADMIN = "ADMIN"

class DocumentStatus(Enum):
    UPLOADED = "UPLOADED"
    PROCESSING = "PROCESSING"
    PROCESSED = "PROCESSED"
    FAILED = "FAILED"