import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  valueColor?: string;
}

function StatCard({
  title,
  value,
  icon,
  valueColor = "text-gray-900",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2
            className={`mt-2 text-4xl font-bold ${valueColor}`}
          >
            {value}
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;