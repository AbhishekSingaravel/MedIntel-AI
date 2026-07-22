import { ReactNode } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

interface DashboardStatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: ReactNode;
  iconBg?: string;
}

function DashboardStatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg = "bg-blue-100",
}: DashboardStatCardProps) {
  return (
    <div
      className="
        relative
        rounded-3xl
        border
        border-gray-200
        bg-white
        px-8
        py-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Icon */}

      <div
        className={`
          absolute
          right-8
          top-1/2
          -translate-y-1/2
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          ${iconBg}
        `}
      >
        <div className="text-[30px] text-blue-600">
          {icon}
        </div>
      </div>

      {/* Content */}

      <div className="flex min-h-[150px] flex-col justify-center pr-24">

        {/* Title */}

        <p className="mb-4 pl-4 text-sm font-semibold tracking-wide text-gray-500">
          {title}
        </p>

        {/* Value */}

        <h2 className="text-5xl font-bold leading-none text-gray-900">
          {value}
        </h2>

        {/* Footer */}

        <div className="mt-6 flex items-center gap-2 pl-4">
          <FaArrowTrendUp className="text-xs text-green-500" />

          <span className="text-sm text-gray-500">
            {subtitle}
          </span>
        </div>

      </div>
    </div>
  );
}

export default DashboardStatCard;