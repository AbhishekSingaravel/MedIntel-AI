import { useEffect, useMemo, useState } from "react";

import type { Document } from "@/types/document";

import { documentService } from "@/services/documentService";

import DocumentStats from "@/components/documents/DocumentStats";
import DocumentToolbar from "@/components/documents/DocumentToolbar";
import DocumentList from "@/components/documents/DocumentList";
import DocumentViewerModal from "@/components/documents/DocumentViewerModal";

function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);

  const [viewerOpen, setViewerOpen] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [sortBy, setSortBy] =
    useState("NEWEST");

  const loadDocuments = async () => {
    try {
      setLoading(true);

      const data =
        await documentService.getDocuments();

      setDocuments(data);

      if (data.length === 0) {
        setSelectedDocument(null);
        return;
      }

      setSelectedDocument((current) => {
        if (!current) {
          return data[0];
        }

        return (
          data.find(
            (doc) => doc.id === current.id
          ) ?? data[0]
        );
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    if (search.trim()) {
      filtered = filtered.filter((doc) =>
        doc.filename
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
        (doc) => doc.status === statusFilter
      );
    }

    switch (sortBy) {
      case "NAME":
        filtered.sort((a, b) =>
          a.filename.localeCompare(b.filename)
        );
        break;

      case "OLDEST":
        filtered.sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );
        break;

      case "NEWEST":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        break;
    }

    return filtered;
  }, [
    documents,
    search,
    statusFilter,
    sortBy,
  ]);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      await documentService.uploadDocument(
        file
      );

      await loadDocuments();

      alert(
        "Document uploaded successfully."
      );
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Delete this document?"
    );

    if (!confirmed) return;

    try {
      await documentService.deleteDocument(id);

      setDocuments((prev) =>
        prev.filter((doc) => doc.id !== id)
      );

      if (selectedDocument?.id === id) {
        setSelectedDocument(null);
        setViewerOpen(false);
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  const handleDownload = (id: number) => {
    documentService.downloadDocument(id);
  };

  const handleViewDocument = (
    document: Document
  ) => {
    setSelectedDocument(document);
    setViewerOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg font-medium text-gray-600">
          Loading documents...
        </div>
      </div>
    );
  }

  const processedCount = documents.filter(
    (doc) => doc.status === "PROCESSED"
  ).length;

  const processingCount = documents.filter(
    (doc) => doc.status === "PROCESSING"
  ).length;

  return (
    <div className="space-y-10 pb-12">

      <div className="h-5" />

      <DocumentStats
        total={documents.length}
        processed={processedCount}
        processing={processingCount}
      />

      <div className="h-5" />

      <DocumentToolbar
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        sort={sortBy}
        onSortChange={setSortBy}
        uploading={uploading}
        onUpload={handleUpload}
      />

      <div className="h-5" />

      <DocumentList
        documents={filteredDocuments}
        selectedDocument={selectedDocument}
        onSelect={handleViewDocument}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />

      <DocumentViewerModal
        open={viewerOpen}
        document={selectedDocument}
        onClose={() => setViewerOpen(false)}
        onDownload={handleDownload}
      />

    </div>
  );
}

export default Documents;