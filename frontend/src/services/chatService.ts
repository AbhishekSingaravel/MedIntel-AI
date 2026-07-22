import api from "@/api/axios";

import type {
  ChatRequest,
  ChatResponse,
  ChatSession,
  ConversationResponse,
} from "@/types/chat";

class ChatService {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await api.post<ChatResponse>("/chat", request);

    return response.data;
  }

  async getSessions(): Promise<ChatSession[]> {
    const response = await api.get<ChatSession[]>("/chat/sessions");

    return response.data;
  }

  async getConversation(
    sessionId: number
  ): Promise<ConversationResponse> {
    const response = await api.get<ConversationResponse>(
      `/chat/${sessionId}`
    );

    return response.data;
  }

  async deleteConversation(sessionId: number): Promise<void> {
    await api.delete(`/chat/${sessionId}`);
  }
}

export const chatService = new ChatService();