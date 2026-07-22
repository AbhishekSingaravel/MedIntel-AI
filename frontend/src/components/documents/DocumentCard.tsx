import {
  FaDownload,
  FaFilePdf,
  FaTrash,
} from "react-icons/fa";

import type { Document } from "@/types/document";

import StatusBadge from "./StatusBadge";

import { formatDate } from "@/utils/formatDate";
import { formatFileSize } from "@/utils/formatFileSize";

interface Props {
  document: Document;
  selected?: boolean;
  onSelect: (document: Document) => void;
  onDownload: (id: number) => void;
  onDelete: (id: number) => void;
}

function DocumentCard({
  document,
  selected = false,
  onSelect,
  onDownload,
  onDelete,
}: Props) {
  return (
    <div
      onClick={() => onSelect(document)}
      className={`
        cursor-pointer
        rounded-3xl
        border
        bg-white
        px-8
        py-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        ${
          selected
            ? "border-blue-500 ring-2 ring-blue-100"
            : "border-gray-200 hover:border-blue-200"
        }
      `}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-1 items-center gap-6">

          <div
            className={`
              flex
              h-[70px]
              w-[70px]
              shrink-0
              items-center
              justify-center
              rounded-2xl
              shadow-sm
              transition-all
              duration-300
              ${
                selected
                  ? "bg-blue-600"
                  : "bg-red-50"
              }
            `}
          >
            <FaFilePdf
              className={`text-[40px] ${
                selected
                  ? "text-white"
                  : "text-red-600"
              }`}
            />
          </div>

          <div className="min-w-0 flex-1">

            <h2 className="truncate text-xl font-medium tracking-tight text-gray-900">
              {document.filename}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">

              <span className="rounded-full bg-gray-100 px-3 py-1">
                PDF
              </span>

              <span>•</span>

              <span>
                {formatFileSize(document.file_size)}
              </span>

              <span>•</span>

              <span>
                {formatDate(document.created_at)}
              </span>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-end gap-4 lg:min-w-[220px]">

          <StatusBadge status={document.status} />

          <div className="flex items-center gap-3">

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(document.id);
              }}
              className="
                inline-flex
                h-10
                items-center
                gap-2
                rounded-xl
                border
                border-blue-200
                bg-blue-50
                px-4
                text-sm
                font-medium
                text-blue-700
                transition-all
                hover:bg-blue-100
              "
            >
              <FaDownload />
              Download
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(document.id);
              }}
              className="
                inline-flex
                h-10
                items-center
                gap-2
                rounded-xl
                bg-red-500
                px-4
                text-sm
                font-medium
                text-white
                transition-all
                hover:bg-red-600
              "
            >
              <FaTrash />
              Delete
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default DocumentCard;