from google import genai

from app.ai.llm.base import BaseLLMProvider
from app.core.config import settings


class GeminiProvider(BaseLLMProvider):

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.gemini_api_key
        )

    def generate(
        self,
        prompt: str,
        model: str,
    ) -> str:

        response = self.client.models.generate_content(
            model=model,
            contents=prompt,
        )

        return response.text