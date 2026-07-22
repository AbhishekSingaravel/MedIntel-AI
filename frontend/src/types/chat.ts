export interface ChatRequest {
  question: string;
  session_id?: number | null;
   document_id?: number | null;
  provider?: string;
  model?: string;
}

export interface ChatResponse {
  session_id: number;
  answer: string;
}

export interface ChatSession {
  id: number;
  title: string;
}

export interface ChatMessage {
  id?: number;
  role: "USER" | "ASSISTANT";
  message: string;
}

export interface ConversationResponse {
  session: ChatSession;
  messages: ChatMessage[];
}