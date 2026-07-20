from openai import AzureOpenAI

from app.ai.llm.base import BaseLLMProvider
from app.core.config import settings


class AzureOpenAIProvider(BaseLLMProvider):

    def __init__(self):
        self.client = AzureOpenAI(
            api_key=settings.azure_openai_api_key,
            azure_endpoint=settings.azure_openai_endpoint,
            api_version=settings.azure_openai_api_version,
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