import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";

import { chatService } from "@/services/chatService";

import type {
  ChatMessage,
  ChatSession,
} from "@/types/chat";

function Chat() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const [provider, setProvider] =
    useState("ollama");

  const [model, setModel] =
    useState("llama3.1:latest");

  const [sessions, setSessions] =
    useState<ChatSession[]>([]);

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [
    selectedDocumentId,
    setSelectedDocumentId,
  ] = useState<number | null>(null);

  const [
    selectedDocumentName,
    setSelectedDocumentName,
  ] = useState("");

  const [
    selectedSessionId,
    setSelectedSessionId,
  ] = useState<number | null>(null);

  const [searchParams] = useSearchParams();

  /* -----------------------------
      Load chat history once
  ------------------------------*/

  useEffect(() => {
    loadSessions();
  }, []);

  /* -----------------------------
      Read URL parameters
  ------------------------------*/

  useEffect(() => {
    const sessionId =
      searchParams.get("sessionId");

    if (sessionId) {
      const id = Number(sessionId);

      if (!Number.isNaN(id)) {
        handleSelectSession(id);
      }
    }

    const documentId =
      searchParams.get("documentId");

    const documentName =
      searchParams.get("documentName");

    if (documentId) {
      const id = Number(documentId);

      if (!Number.isNaN(id)) {
        console.log(
          "Selected Document:",
          id
        );

        setSelectedDocumentId(id);

        if (documentName) {
          setSelectedDocumentName(
            decodeURIComponent(
              documentName
            )
          );
        } else {
          setSelectedDocumentName("");
        }

        // Fresh conversation for every document
        setSelectedSessionId(null);
        setMessages([]);
        setInput("");
      }
    } else {
      setSelectedDocumentId(null);
      setSelectedDocumentName("");
    }
  }, [searchParams]);

  /* -----------------------------
      Load Sessions
  ------------------------------*/

  async function loadSessions() {
    try {
      const response =
        await chatService.getSessions();

      setSessions(response);
    } catch (error) {
      console.error(error);
    }
  }

  /* -----------------------------
      New Chat
  ------------------------------*/

  function handleNewChat() {
    setSelectedSessionId(null);
    setMessages([]);
    setInput("");
  }

  function handleSuggestionClick(
    question: string
  ) {
    setInput(question);
  }

  /* -----------------------------
      Select Conversation
  ------------------------------*/

  async function handleSelectSession(
    sessionId: number
  ) {
    try {
      setLoading(true);

      setSelectedSessionId(sessionId);

      const conversation =
        await chatService.getConversation(
          sessionId
        );

      setMessages(
        conversation.messages
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  /* -----------------------------
      Delete Conversation
  ------------------------------*/

  async function handleDeleteConversation(
    sessionId: number
  ) {
    try {
      await chatService.deleteConversation(
        sessionId
      );

      if (
        selectedSessionId ===
        sessionId
      ) {
        handleNewChat();
      }

      await loadSessions();
    } catch (error) {
      console.error(error);
    }
  }

  /* -----------------------------
      Send Message
  ------------------------------*/

  async function handleSend() {
    if (!input.trim()) return;

    const question = input;

    const userMessage: ChatMessage = {
      role: "USER",
      message: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");

    setLoading(true);

    try {
      const response =
        await chatService.sendMessage({
          question,
          session_id:
            selectedSessionId,
          document_id:
            selectedDocumentId,
          provider,
          model,
        });

      if (
        selectedSessionId === null
      ) {
        setSelectedSessionId(
          response.session_id
        );

        await loadSessions();
      }

      const aiMessage: ChatMessage = {
        role: "ASSISTANT",
        message: response.answer,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) =>
        prev.slice(
          0,
          prev.length - 1
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-90px)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      <ChatSidebar
        sessions={sessions}
        selectedSessionId={
          selectedSessionId
        }
        loading={
          loading &&
          sessions.length === 0
        }
        onNewChat={handleNewChat}
        onSelectSession={
          handleSelectSession
        }
        onDeleteSession={
          handleDeleteConversation
        }
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-slate-50">

        <ChatHeader
          provider={provider}
          model={model}
          onProviderChange={
            setProvider
          }
          onModelChange={
            setModel
          }
        />

        <div className="flex min-h-0 flex-1 flex-col">

          {selectedDocumentId && (
            <div className="flex items-center justify-between border-b border-green-200 bg-green-50 px-6 py-3">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                  Current Document
                </p>

                <p className="text-sm font-semibold text-green-900">
                  📄{" "}
                  {selectedDocumentName ||
                    `Document #${selectedDocumentId}`}
                </p>

                <p className="text-xs text-green-700">
                  Questions will be
                  answered only from
                  this document.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(
                    "/documents"
                  )
                }
                className="rounded-lg border border-green-300 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
              >
                Change
              </button>

            </div>
          )}

          <ChatWindow
            messages={messages}
            loading={loading}
            onSuggestionClick={
              handleSuggestionClick
            }
          />

          <ChatInput
            value={input}
            loading={loading}
            onChange={setInput}
            onSend={handleSend}
          />

        </div>
      </div>
    </div>
  );
}

export default Chat;