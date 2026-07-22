import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="flex gap-4">
        <Link
          to="/documents"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Upload Document
        </Link>

        <Link
          to="/chat"
          className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          Start AI Chat
        </Link>
      </div>
    </div>
  );
}

export default QuickActions;