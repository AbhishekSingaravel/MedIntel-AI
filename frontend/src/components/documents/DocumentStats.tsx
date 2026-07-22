import {
  FaCheckCircle,
  FaFileMedical,
  FaSpinner,
} from "react-icons/fa";

import DashboardStatCard from "@/components/dashboard/DashboardStatCard";

interface Props {
  total: number;
  processed: number;
  processing: number;
}

function DocumentStats({
  total,
  processed,
  processing,
}: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-3 mb-3">

      <DashboardStatCard
        title="Total Documents"
        value={total}
        subtitle="Uploaded reports"
        icon={<FaFileMedical />}
      />

      <DashboardStatCard
        title="Processed"
        value={processed}
        subtitle="Ready for AI Chat"
        icon={<FaCheckCircle />}
        iconBg="bg-green-100"
      />

      <DashboardStatCard
        title="Processing"
        value={processing}
        subtitle="AI is analyzing"
        icon={<FaSpinner className="animate-spin" />}
        iconBg="bg-yellow-100"
      />

    </div>
  );
}

export default DocumentStats;