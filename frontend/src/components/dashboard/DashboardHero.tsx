import { FaCloudUploadAlt } from "react-icons/fa";

interface Props {
  onUpload?: () => void;
}

function DashboardHero({ onUpload }: Props) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-3xl
        bg-gradient-to-r
        from-blue-600
        via-blue-500
        to-indigo-600
        px-10 py-10
        text-white
        shadow-xl
      "
    >
      <div>
        <h1 className="text-4xl font-bold leading-tight">
          Welcome back 👋
        </h1>

        <p className="mt-2 max-w-xl text-base text-blue-100 leading-7">
          Monitor your medical documents, AI conversations and
          healthcare insights from one place.
        </p>
      </div>

      <button
        onClick={onUpload}
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          bg-white
          px-6
          py-4
          font-semibold
          text-blue-600
          shadow-lg
          transition
          hover:scale-105
        "
      >
        <FaCloudUploadAlt className="text-xl" />

        Upload Report
      </button>
    </div>
  );
}

export default DashboardHero;