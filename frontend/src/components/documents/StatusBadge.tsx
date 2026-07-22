import clsx from "clsx";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCloudUploadAlt,
} from "react-icons/fa";

interface Props {
  status: string;
}

function StatusBadge({ status }: Props) {
  const config = {
    PROCESSED: {
      label: "Processed",
      className:
        "bg-green-100 text-green-700 border border-green-200",
      icon: <FaCheckCircle />,
    },

    PROCESSING: {
      label: "Processing",
      className:
        "bg-yellow-100 text-yellow-700 border border-yellow-200",
      icon: <FaClock className="animate-pulse" />,
    },

    FAILED: {
      label: "Failed",
      className:
        "bg-red-100 text-red-700 border border-red-200",
      icon: <FaTimesCircle />,
    },

    UPLOADED: {
      label: "Uploaded",
      className:
        "bg-blue-100 text-blue-700 border border-blue-200",
      icon: <FaCloudUploadAlt />,
    },
  };

  const current =
    config[status as keyof typeof config] ??
    {
      label: status,
      className:
        "bg-gray-100 text-gray-700 border border-gray-200",
      icon: null,
    };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
        current.className
      )}
    >
      {current.icon}

      {current.label}
    </span>
  );
}

export default StatusBadge;