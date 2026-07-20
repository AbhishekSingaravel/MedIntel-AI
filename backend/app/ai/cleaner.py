import re


class TextCleaner:
    """
    Cleans extracted document text before chunking.
    """

    def clean(
        self,
        text: str,
    ) -> str:

        if not text:
            return ""

        # Normalize line endings
        text = text.replace("\r\n", "\n")
        text = text.replace("\r", "\n")

        # Collapse multiple spaces/tabs
        text = re.sub(r"[ \t]+", " ", text)

        # Collapse 3+ blank lines into 2
        text = re.sub(r"\n{3,}", "\n\n", text)

        # Remove leading/trailing whitespace
        text = text.strip()

        return text