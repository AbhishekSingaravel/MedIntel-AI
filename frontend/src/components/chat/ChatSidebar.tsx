import {
  FiMessageSquare,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

import type { ChatSession } from "@/types/chat";

interface ChatSidebarProps {
  sessions: ChatSession[];
  selectedSessionId: number | null;
  loading: boolean;
  onNewChat: () => void;
  onSelectSession: (sessionId: number) => void;
  onDeleteSession: (sessionId: number) => void;
}

function ChatSidebar({
  sessions,
  selectedSessionId,
  loading,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}: ChatSidebarProps) {
  return (
    <aside className="flex w-80 flex-col border-r border-slate-200 bg-white">
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-900">
          Conversations
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your recent AI chats
        </p>
      </div>

      {/* Conversation List */}

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {loading ? (
          <div className="py-10 text-center text-sm text-slate-500">
            Loading conversations...
          </div>
        ) : sessions.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-500">
            No conversations yet
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => {
              const active =
                selectedSessionId === session.id;

              return (
                <div
                  key={session.id}
                  className={`
                    group
                    flex
                    cursor-pointer
                    items-start
                    justify-between
                    rounded-2xl
                    border
                    p-4
                    transition-all
                    duration-200
                    ${
                      active
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }
                  `}
                  onClick={() =>
                    onSelectSession(session.id)
                  }
                >
                  <div className="flex min-w-0 flex-1 gap-3">
                    <FiMessageSquare
                      className={`mt-1 shrink-0 ${
                        active
                          ? "text-blue-600"
                          : "text-slate-500"
                      }`}
                      size={18}
                    />

                    <div className="min-w-0 flex-1">
                      <p
                        className={`
                          break-words
                          text-[15px]
                          font-semibold
                          leading-6
                          ${
                            active
                              ? "text-blue-700"
                              : "text-slate-800"
                          }
                        `}
                      >
                        {session.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Conversation #{session.id}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="
                      ml-2
                      rounded-lg
                      p-2
                      text-slate-400
                      opacity-0
                      transition-all
                      hover:bg-red-50
                      hover:text-red-600
                      group-hover:opacity-100
                    "
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 p-4">
        <button
          onClick={onNewChat}
          className="
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-blue-600
            text-base
            font-semibold
            text-white
            shadow-md
            transition-all
            duration-200
            hover:bg-blue-700
            hover:shadow-lg
            active:scale-[0.98]
          "
        >
          <FiPlus size={22} />

          New Chat
        </button>
      </div>
    </aside>
  );
}

export default ChatSidebar;