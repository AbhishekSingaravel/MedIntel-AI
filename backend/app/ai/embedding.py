from sentence_transformers import SentenceTransformer


class EmbeddingGenerator:
    """
    Generates embeddings using a singleton model instance.
    """

    _model = None

    def __init__(self):

        if EmbeddingGenerator._model is None:
            EmbeddingGenerator._model = SentenceTransformer(
                "all-MiniLM-L6-v2"
            )

    def generate(
        self,
        texts: list[str],
    ) -> list[list[float]]:

        embeddings = EmbeddingGenerator._model.encode(
            texts,
            convert_to_numpy=True,
        )

        return embeddings.tolist()