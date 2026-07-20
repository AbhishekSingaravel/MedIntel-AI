from abc import ABC
from abc import abstractmethod


class BaseLLMProvider(ABC):

    @abstractmethod
    def generate(
        self,
        prompt: str,
        model: str,
    ) -> str:
        """
        Generate a response from the LLM.
        """
        pass