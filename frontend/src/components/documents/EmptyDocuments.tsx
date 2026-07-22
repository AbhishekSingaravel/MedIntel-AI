import { FaFileMedical } from "react-icons/fa";

function EmptyDocuments() {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center shadow-sm">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <FaFileMedical className="text-4xl text-blue-600" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        No Documents Found
      </h2>

      <p className="mx-auto mt-3 max-w-md text-gray-500">
        Upload your first medical report to begin
        AI-powered document analysis.
      </p>

    </div>
  );
}

export default EmptyDocuments;