import {
  FiActivity,
  FiFileText,
  FiSearch,
  FiClipboard,
} from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

interface ChatEmptyProps {
  onSuggestionClick: (question: string) => void;
}

const suggestions = [
  {
    icon: <FiClipboard className="text-blue-600" size={22} />,
    title: "Summarize my report",
    prompt: "Summarize my uploaded medical report.",
  },
  {
    icon: <FiActivity className="text-green-600" size={22} />,
    title: "Explain my lab values",
    prompt: "Explain all my laboratory values.",
  },
  {
    icon: <FiSearch className="text-purple-600" size={22} />,
    title: "Find abnormal values",
    prompt: "Are there any abnormal values in my report?",
  },
  {
    icon: <FiFileText className="text-orange-600" size={22} />,
    title: "Medication overview",
    prompt: "Explain the medications in my prescription.",
  },
];

function ChatEmpty({
  onSuggestionClick,
}: ChatEmptyProps) {
  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div className="mx-auto w-full max-w-4xl text-center">
        {/* Logo */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <RiRobot2Line
            size={40}
            className="text-blue-600"
          />
        </div>

        {/* Title */}

        <h1 className="mt-8 text-4xl font-bold text-slate-900">
          MedIntel AI Assistant
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          Ask questions about your uploaded medical
          reports, prescriptions and lab results.
        </p>

        {/* Suggestions */}

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {suggestions.map((item) => (
            <button
              key={item.title}
              onClick={() =>
                onSuggestionClick(item.prompt)
              }
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                text-left
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-blue-300
                hover:shadow-lg
              "
            >
              <div>{item.icon}</div>

              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {item.prompt}
              </p>
            </button>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-400">
          Your uploaded documents are used to provide
          context-aware AI responses.
        </p>
      </div>
    </div>
  );
}

export default ChatEmpty;