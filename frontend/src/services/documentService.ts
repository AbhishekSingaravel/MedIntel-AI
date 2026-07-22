import api from "@/api/axios";
import type { Document } from "@/types/document";

class DocumentService {
  async getDocuments(): Promise<Document[]> {
    const response = await api.get<Document[]>("/documents");
    return response.data;
  }

  async uploadDocument(file: File): Promise<Document> {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post<Document>(
      "/documents/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }

  async deleteDocument(documentId: number): Promise<void> {
    await api.delete(`/documents/${documentId}`);
  }

  async getDocumentBlob(documentId: number): Promise<Blob> {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/documents/${documentId}/download`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to load document.");
    }

    return await response.blob();
  }

  async downloadDocument(documentId: number) {
    const blob = await this.getDocumentBlob(documentId);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  }
}

export const documentService = new DocumentService();