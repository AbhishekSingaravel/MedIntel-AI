import { ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa";

interface Props {
  title: string;
  subtitle: string;
  icon: ReactNode;
  onClick?: () => void;
}

function RecentItem({
  title,
  subtitle,
  icon,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-5
        text-left
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
      "
    >
      {/* Left */}

      <div className="flex items-center gap-5">
        <div
          className="
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-2xl
            transition-all
            duration-300
            group-hover:bg-blue-600
            group-hover:text-white
          "
        >
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
            {title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right */}

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-gray-100
          text-gray-400
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:bg-blue-600
          group-hover:text-white
        "
      >
        <FaChevronRight />
      </div>
    </button>
  );
}

export default RecentItem;