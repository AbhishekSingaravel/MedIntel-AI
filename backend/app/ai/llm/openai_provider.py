from openai import OpenAI

from app.ai.llm.base import BaseLLMProvider
from app.core.config import settings


class OpenAIProvider(BaseLLMProvider):

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.openai_api_key
        )

    def generate(
        self,
        prompt: str,
        model: str,
    ) -> str:

        response = self.client.responses.create(
            model=model,
            input=prompt,
        )

        return response.output_text