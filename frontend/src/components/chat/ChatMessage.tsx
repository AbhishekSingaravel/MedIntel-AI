import { FiCopy, FiUser } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser =
    message.role.toUpperCase() === "USER";

  async function copyMessage() {
    await navigator.clipboard.writeText(
      message.message
    );
  }

  return (
    <div
      className={`flex w-full ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`flex items-start gap-4 ${
          isUser
            ? "max-w-[65%] flex-row-reverse"
            : "max-w-[78%]"
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-sm ${
            isUser
              ? "bg-blue-600 text-white"
              : "border border-slate-200 bg-white text-slate-700"
          }`}
        >
          {isUser ? (
            <FiUser size={20} />
          ) : (
            <RiRobot2Line size={22} />
          )}
        </div>

        {/* Message */}

        <div className="group">
          <div
            className={`rounded-3xl px-6 py-5 shadow-sm transition-all ${
              isUser
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-800"
            }`}
          >
            {isUser ? (
              <p className="whitespace-pre-wrap break-words text-[15px] leading-7">
                {message.message}
              </p>
            ) : (
              <div className="prose prose-slate max-w-none text-[15px] leading-7">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {message.message}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {!isUser && (
            <div className="mt-2 flex opacity-0 transition-all duration-200 group-hover:opacity-100">
              <button
                onClick={copyMessage}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FiCopy size={15} />
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;