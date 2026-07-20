from ollama import Client

from app.ai.llm.base import BaseLLMProvider
from app.core.config import settings


class OllamaProvider(BaseLLMProvider):

    def __init__(self):
        self.client = Client(host=settings.ollama_base_url)

    def generate(
        self,
        prompt: str,
        model: str,
    ) -> str:

        response = self.client.chat(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        return response["message"]["content"]