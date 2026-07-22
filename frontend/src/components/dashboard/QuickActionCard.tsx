import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
}

function QuickActionCard({
  title,
  description,
  icon,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-8
        text-center
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-200
        hover:shadow-2xl
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-blue-50
          transition-all
          duration-300
          group-hover:scale-125
        "
      />

      {/* Icon */}

      <div
        className="
          relative
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          bg-blue-100
          text-4xl
          text-blue-600
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:bg-blue-600
          group-hover:text-white
        "
      >
        {icon}
      </div>

      {/* Title */}

      <h3 className="relative mt-8 text-2xl font-bold text-gray-900">
        {title}
      </h3>

      {/* Description */}

      <p className="relative mt-3 text-base leading-7 text-gray-500">
        {description}
      </p>

      {/* Divider */}

      <div className="relative my-8 h-px bg-gray-100" />

      {/* CTA */}

      <div
        className="
          relative
          flex
          items-center
          justify-center
          gap-3
          font-semibold
          text-blue-600
          transition-all
          duration-300
          group-hover:gap-5
        "
      >
        Continue

        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </button>
  );
}

export default QuickActionCard;