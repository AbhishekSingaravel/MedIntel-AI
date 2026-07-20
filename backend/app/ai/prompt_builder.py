class PromptBuilder:

    @staticmethod
    def build(
        question: str,
        context: str,
    ) -> str:

        return f"""
You are an AI assistant specialized in analyzing clinical and medical documents.

Instructions:
- Answer ONLY using the provided context.
- Do not make up information.
- If the answer is not available in the context, reply:
  "I could not find the answer in the provided documents."

Context:
{context}

Question:
{question}

Answer:
"""