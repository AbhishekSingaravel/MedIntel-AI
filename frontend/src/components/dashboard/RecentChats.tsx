function RecentChats() {
  const chats = [
    "Summarize Blood Report",
    "Analyze Prescription",
    "Explain Lab Results",
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Recent AI Chats
      </h2>

      <ul className="space-y-3">
        {chats.map((chat) => (
          <li
            key={chat}
            className="rounded-lg border p-3 hover:bg-slate-50"
          >
            {chat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentChats;