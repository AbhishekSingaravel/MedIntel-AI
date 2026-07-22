import api from "./axios";

export interface DashboardSummary {
  totalDocuments: number;
  processingDocuments: number;
  uploadsToday: number;
  totalChats: number;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [documents, sessions] = await Promise.all([
    api.get("/documents"),
    api.get("/chat/sessions"),
  ]);

  const docs = documents.data;
  const chats = sessions.data;

  const today = new Date().toDateString();

  return {
    totalDocuments: docs.length,

    processingDocuments: docs.filter(
      (d: any) => d.status === "PROCESSING"
    ).length,

    uploadsToday: docs.filter(
      (d: any) =>
        new Date(d.created_at).toDateString() === today
    ).length,

    totalChats: chats.length,
  };
}

export async function getRecentDocuments() {
    const response = await api.get("/documents");

    return response.data
        .sort(
            (a: any, b: any) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        )
        .slice(0, 3);
}

export async function getRecentChats() {
    const response = await api.get("/chat/sessions");

    return response.data
        .sort(
            (a: any, b: any) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
        )
        .slice(0, 3);
}