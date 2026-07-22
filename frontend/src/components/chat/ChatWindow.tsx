import { useEffect, useRef } from "react";

import ChatEmpty from "./ChatEmpty";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatWindowProps {
  messages: ChatMessageType[];
  loading: boolean;
  onSuggestionClick: (question: string) => void;
}

function ChatWindow({
  messages,
  loading,
  onSuggestionClick,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center overflow-hidden bg-slate-50 px-10 py-10">
        <div className="w-full max-w-6xl">
          <ChatEmpty
            onSuggestionClick={onSuggestionClick}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          gap-10
          px-10
          py-8
        "
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
          />
        ))}

        {loading && <TypingIndicator />}

        <div ref={bottomRef} className="h-2" />
      </div>
    </div>
  );
}

export default ChatWindow;