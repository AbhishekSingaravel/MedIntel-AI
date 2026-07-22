import { useRef } from "react";
import { FiSend } from "react-icons/fi";

interface ChatInputProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

function ChatInput({
  value,
  loading,
  onChange,
  onSend,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);

    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      180
    )}px`;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!loading && value.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white px-8 py-6">
      <div
        className="
          mx-auto
          flex
          max-w-5xl
          items-end
          gap-4
          rounded-3xl
          border
          border-slate-300
          bg-white
          p-4
          shadow-sm
          transition
          focus-within:border-blue-500
          focus-within:ring-2
          focus-within:ring-blue-100
        "
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          disabled={loading}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your uploaded medical documents..."
          className="
            max-h-[190px]
            min-h-[37px]
            flex-1
            resize-none
            overflow-y-auto
            bg-transparent
            text-base
            leading-7
            text-slate-800
            placeholder:text-slate-400
            focus:outline-none
          "
        />

        <button
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-600
            text-white
            shadow-sm
            transition-all
            hover:bg-blue-700
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:bg-slate-300
            disabled:text-slate-500
          "
        >
          <FiSend size={20} />
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        AI responses may contain mistakes. Always verify important medical information.
      </p>
    </div>
  );
}

export default ChatInput;