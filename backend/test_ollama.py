from app.ai.llm.ollama_provider import OllamaProvider
from app.core.config import settings

provider = OllamaProvider()

response = provider.generate(
    prompt="Who are you? Reply in one sentence.",
    model=settings.ollama_model,
)

print("\n========== RESPONSE ==========\n")
print(response)