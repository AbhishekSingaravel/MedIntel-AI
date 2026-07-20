from app.models.document_chunk import DocumentChunk


class ContextBuilder:

    @staticmethod
    def build(
        chunks: list[tuple[DocumentChunk, float]],
    ) -> str:
        """
        Combine retrieved chunks into a single context string.
        """

        context_parts = []

        for chunk, distance in chunks:
            context_parts.append(
                f"[Similarity Score: {1 - distance:.3f}]\n"
                f"{chunk.chunk_text}"
            )

        return "\n\n" + ("-" * 80) + "\n\n".join(context_parts)