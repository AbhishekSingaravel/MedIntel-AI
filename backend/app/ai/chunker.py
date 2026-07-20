class TextChunker:
    """
    Splits cleaned text into overlapping chunks.
    """

    def chunk(
        self,
        text: str,
        chunk_size: int = 1000,
        overlap: int = 200,
    ) -> list[str]:

        if not text:
            return []

        chunks = []

        start = 0

        while start < len(text):

            end = start + chunk_size

            chunks.append(
                text[start:end]
            )

            start += chunk_size - overlap

        return chunks