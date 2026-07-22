function RecentDocuments() {
  const documents = [
    "Blood_Report.pdf",
    "Prescription.pdf",
    "Lab_Report.pdf",
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Documents
      </h2>

      <ul className="space-y-3">
        {documents.map((doc) => (
          <li
            key={doc}
            className="rounded-lg border p-3 hover:bg-slate-50"
          >
            {doc}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentDocuments;