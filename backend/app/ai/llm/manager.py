from app.ai.llm.models import LLMProvider
from app.ai.llm.openai_provider import OpenAIProvider
from app.ai.llm.azure_openai_provider import AzureOpenAIProvider
from app.ai.llm.gemini_provider import GeminiProvider
from app.ai.llm.ollama_provider import OllamaProvider

class LLMManager:

    def generate(
        self,
        provider: LLMProvider,
        prompt: str,
        model: str,
    ) -> str:

        if provider == LLMProvider.OPENAI:
            provider_instance = OpenAIProvider()

        elif provider == LLMProvider.AZURE:
            provider_instance = AzureOpenAIProvider()

        elif provider == LLMProvider.OLLAMA:
            provider_instance = OllamaProvider()

        elif provider == LLMProvider.GEMINI:
            provider_instance = GeminiProvider()
            
        else:
            raise ValueError(f"Unsupported provider: {provider}")

        return provider_instance.generate(
            prompt=prompt,
            model=model,
        )