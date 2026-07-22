import { FaUpload } from "react-icons/fa";

interface Props {
  uploading: boolean;
  onUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function DocumentHeader({
  uploading,
  onUpload,
}: Props) {
  return (
    <div className="flex justify-end">

      <label
        className="
          inline-flex
          cursor-pointer
          items-center
          gap-3
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-medium
          text-white
          shadow-sm
          transition-all
          duration-200
          hover:bg-blue-700
          hover:shadow-lg
        "
      >
        <FaUpload />

        {uploading
          ? "Uploading..."
          : "Upload Document"}

        <input
          hidden
          type="file"
          accept=".pdf"
          onChange={onUpload}
        />
      </label>

    </div>
  );
}

export default DocumentHeader;