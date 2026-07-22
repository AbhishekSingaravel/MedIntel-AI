export const LLM_MODELS: Record<string, string[]> = {
  openai: [
    "gpt-4.1-mini",
    "gpt-4.1",
    "gpt-4o",
    "gpt-4o-mini",
    "o3-mini",
  ],

  azure: [
    "gpt-4.1-mini",
    "gpt-4o",
  ],

  gemini: [
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-2.0-flash",
  ],

  ollama: [
    "llama3.1:latest",
  ],
};