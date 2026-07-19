from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Application
    app_name: str
    app_version: str
    app_env: str
    debug: bool

    # Server
    host: str
    port: int

    # Database
    db_host: str
    db_port: int
    db_name: str
    db_user: str
    db_password: str

    #JWT
    jwt_secret_key: str
    jwt_algorithm: str
    jwt_access_token_expire_minutes: int

    # OpenAI
    openai_api_key: str = ""
    openai_model: str

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