import type { Document } from "@/types/document";

import DocumentCard from "./DocumentCard";
import EmptyDocuments from "./EmptyDocuments";

interface Props {
  documents: Document[];
  selectedDocument: Document | null;
  onSelect: (document: Document) => void;
  onDownload: (id: number) => void;
  onDelete: (id: number) => void;
}

function DocumentList({
  documents,
  selectedDocument,
  onSelect,
  onDownload,
  onDelete,
}: Props) {
  if (documents.length === 0) {
    return <EmptyDocuments />;
  }

  return (
    <div className="space-y-5">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          selected={selectedDocument?.id === document.id}
          onSelect={onSelect}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default DocumentList;