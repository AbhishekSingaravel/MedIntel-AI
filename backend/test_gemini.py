from app.ai.llm.gemini_provider import GeminiProvider
from app.core.config import settings

provider = GeminiProvider()

response = provider.generate(
    prompt="Who are you? Reply in one sentence.",
    model=settings.gemini_model,
)

print("\n========== RESPONSE ==========\n")
print(response)