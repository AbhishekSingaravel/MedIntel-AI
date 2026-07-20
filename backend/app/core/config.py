from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ==========================
    # Application
    # ==========================
    app_name: str
    app_version: str
    app_env: str
    debug: bool

    # ==========================
    # Server
    # ==========================
    host: str
    port: int

    # ==========================
    # Database
    # ==========================
    db_host: str
    db_port: int
    db_name: str
    db_user: str
    db_password: str

    # ==========================
    # JWT
    # ==========================
    jwt_secret_key: str
    jwt_algorithm: str
    jwt_access_token_expire_minutes: int

    # ==========================
    # Uploads
    # ==========================
    upload_directory: str = "uploads"

    # ==========================
    # OpenAI
    # ==========================
    openai_api_key: str = ""
    openai_model: str = "gpt-4.1-mini"

    # ==========================
    # Azure OpenAI
    # ==========================
    azure_openai_api_key: str = ""
    azure_openai_endpoint: str = ""
    azure_openai_api_version: str = "2025-01-01-preview"
    azure_openai_deployment: str = ""

    # ==========================
    # Ollama
    # ==========================
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.1"

    # ==========================
    # Gemini
    # ==========================
    gemini_api_key: str = ""
    gemini_model: str = "gemini-2.5-flash-native-audio-latest"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
    )

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+psycopg2://"
            f"{self.db_user}:{self.db_password}"
            f"@{self.db_host}:{self.db_port}/{self.db_name}"
        )


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()