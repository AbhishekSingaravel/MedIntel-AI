import { FaDownload, FaTrash } from "react-icons/fa";

import type { Document } from "@/types/document";

import StatusBadge from "./StatusBadge";

import { formatDate } from "@/utils/formatDate";
import { formatFileSize } from "@/utils/formatFileSize";

interface Props {
  documents: Document[];

  onDownload: (id: number) => void;

  onDelete: (id: number) => void;
}

function DocumentTable({
  documents,
  onDownload,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">
              File Name
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Size
            </th>

            <th className="p-4 text-left">
              Uploaded
            </th>

            <th className="p-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="border-t"
            >
              <td className="p-4">
                {doc.filename}
              </td>

              <td className="p-4">
                <StatusBadge
                  status={doc.status}
                />
              </td>

              <td className="p-4">
                {formatFileSize(doc.file_size)}
              </td>

              <td className="p-4">
                {formatDate(doc.created_at)}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() =>
                      onDownload(doc.id)
                    }
                  >
                    <FaDownload />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(doc.id)
                    }
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentTable;