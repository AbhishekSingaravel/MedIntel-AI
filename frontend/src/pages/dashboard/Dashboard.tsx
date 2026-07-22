import { useEffect, useState } from "react";
import {
  FaComments,
  FaFileMedical,
  FaFilePdf,
  FaSpinner,
  FaUpload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { Document } from "@/types/document";
import DocumentViewerModal from "@/components/documents/DocumentViewerModal";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import RecentItem from "@/components/dashboard/RecentItem";
import SectionTitle from "@/components/dashboard/SectionTitle";

import {
  getDashboardSummary,
  getRecentChats,
  getRecentDocuments,
} from "@/api/dashboardService";

function Dashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    totalDocuments: 0,
    processingDocuments: 0,
    uploadsToday: 0,
    totalChats: 0,
  });

  const [documents, setDocuments] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);


  const [viewerOpen, setViewerOpen] = useState(false);

  const [selectedDocument, setSelectedDocument] =
  useState<Document | null>(null);


  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          summaryData,
          recentDocuments,
          recentChats,
        ] = await Promise.all([
          getDashboardSummary(),
          getRecentDocuments(),
          getRecentChats(),
        ]);

        setSummary(summaryData);
        setDocuments(recentDocuments);
        setSessions(recentChats);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadDashboard();
  }, []);

  const handleViewDocument = (
    document: Document
  ) => {
    setSelectedDocument(document);
    setViewerOpen(true);
  };

  return (
    <div className="w-full pb-10">

      {/* Statistics */}

      <div className="h-5" />

      <section>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            title="Documents"
            value={summary.totalDocuments}
            subtitle={`${summary.totalDocuments} uploaded`}
            icon={<FaFileMedical className="text-3xl text-blue-600" />}
          />

          <DashboardStatCard
            title="AI Chats"
            value={summary.totalChats}
            subtitle={`${summary.totalChats} conversations`}
            icon={<FaComments className="text-3xl text-blue-600" />}
          />

          <DashboardStatCard
            title="Uploads Today"
            value={summary.uploadsToday}
            subtitle="Today's uploads"
            icon={<FaUpload className="text-3xl text-blue-600" />}
          />

          <DashboardStatCard
            title="Processing"
            value={summary.processingDocuments}
            subtitle="Documents processing"
            icon={<FaSpinner className="text-3xl text-blue-600" />}
          />
        </div>
      </section>

      <div className="h-14" />

      {/* Quick Actions */}

      <section>
        <SectionTitle
          title="Quick Actions"
          subtitle="Frequently used actions"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <QuickActionCard
            title="Upload Medical Report"
            description="Upload PDF, DOCX or TXT reports."
            icon={<FaUpload />}
            onClick={() => navigate("/documents")}
          />

          <QuickActionCard
            title="Start AI Chat"
            description="Analyze your uploaded reports using AI."
            icon={<FaComments />}
            onClick={() => navigate("/chat")}
          />
        </div>
      </section>

      <div className="h-14" />

      {/* Recent */}

      <section>
        <div className="mt-10 grid gap-10 xl:grid-cols-2">

          {/* Documents */}

          <section>
            <SectionTitle
              title="Recent Documents"
              subtitle="Recently uploaded reports"
            />

            <div className="mt-10 space-y-4">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <RecentItem
                      key={doc.id}
                      title={doc.filename}
                      subtitle={doc.status}
                      icon={
                        <FaFilePdf className="text-2xl text-red-600" />
                      }
                      onClick={() => handleViewDocument(doc)}
                    />
                ))
              ) : (
                <p className="text-gray-500">
                  No documents uploaded yet.
                </p>
              )}
            </div>
          </section>
          

          {/* Chats */}

          <section>
            <SectionTitle
              title="Recent AI Chats"
              subtitle="Latest conversations"
            />

            <div className="mt-10 space-y-4">
              {sessions.length > 0 ? (
                sessions.map((chat) => (
                  <RecentItem
                      key={chat.id}
                      title={chat.title}
                      subtitle="Continue conversation"
                      icon={
                        <FaComments className="text-2xl text-blue-600" />
                      }
                      onClick={() =>
                        navigate(`/chat?sessionId=${chat.id}`)
                      }
                    />
                ))
              ) : (
                <p className="text-gray-500">
                  No conversations yet.
                </p>
              )}
            </div>
          </section>

        </div>
      </section>
      <DocumentViewerModal
        open={viewerOpen}
        document={selectedDocument}
        onClose={() => setViewerOpen(false)}
      />

    </div>
  );
}

export default Dashboard;