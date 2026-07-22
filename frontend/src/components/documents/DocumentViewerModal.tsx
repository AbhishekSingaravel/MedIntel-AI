import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rnd } from "react-rnd";

import {
  FaTimes,
  FaRobot,
} from "react-icons/fa";

import type { Document } from "@/types/document";
import { documentService } from "@/services/documentService";

interface Props {
  open: boolean;
  document: Document | null;
  onClose: () => void;
}

function DocumentViewerModal({
  open,
  document,
  onClose,
}: Props) {
  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");
    const navigate = useNavigate();
  useEffect(() => {
    if (!open || !document) return;

    let objectUrl: string |null = null;

    const loadPreview = async () => {
      try {
        setLoading(true);
        setError("");

        const blob =
          await documentService.getDocumentBlob(
            document.id
          );

        objectUrl =
          URL.createObjectURL(blob);

        setPreviewUrl(objectUrl);
      } catch (err) {
        console.error(err);
        setError("Unable to preview document.");
      } finally {
        setLoading(false);
      }
    };

    loadPreview();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [document, open]);

  if (!open || !document) {
    return null;
  }

  return (
    <Rnd
      default={{
        x: 180,
        y: 70,
        width: 950,
        height: 720,
      }}
      minWidth={700}
      minHeight={500}
      bounds="window"
      dragHandleClassName="viewer-header"
      enableResizing
    >
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

        {/* Header */}

        <div
            className="viewer-header flex cursor-move select-none items-center justify-between border-b bg-gray-50 px-6 py-4"
            >

          <div>

            <h2 className="text-lg font-semibold">
              {document.filename}
            </h2>

            <p className="text-sm text-gray-500">
              Document Preview
            </p>

          </div>

          <div className="flex items-center">

            <button
                onClick={onClose}
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                text-xl
                text-gray-500
                transition-all
                duration-200
                hover:bg-red-100
                hover:text-red-600
                "
                title="Close"
            >
                <FaTimes size={20} />
            </button>

            </div>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-hidden bg-gray-200">

          {loading && (

            <div className="flex h-full items-center justify-center">

              <div className="text-lg font-medium">
                Loading preview...
              </div>

            </div>

          )}

          {!loading &&
            error && (

              <div className="flex h-full items-center justify-center">

                <div className="text-red-600">
                  {error}
                </div>

              </div>

            )}

          {!loading &&
            !error &&
            previewUrl && (

              <iframe
                title={document.filename}
                src={previewUrl}
                className="h-full w-full border-0"
              />

            )}

        </div>

        {/* Footer */}

        <div className="border-t bg-white p-5">

          <button
                onClick={() => {
                    onClose();

                        navigate(
                            `/chat?documentId=${document.id}&documentName=${encodeURIComponent(
                                document.filename
                            )}`
                            );
                }}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition hover:bg-green-700"
                >
                <FaRobot />

                Ask AI About This Document
            </button>

        </div>

      </div>

    </Rnd>
  );
}

export default DocumentViewerModal;