import { FaUpload } from "react-icons/fa";
import SearchBar from "@/components/common/SearchBar";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;

  uploading: boolean;
  onUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function DocumentToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  uploading,
  onUpload,
}: Props) {
  return (
    <div className="rounded-2xl grid-cols-1 gap-4 lg:grid-cols-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

        {/* Search */}

        <SearchBar
          value={search}
          onChange={onSearchChange}
        />

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm shadow-sm outline-none focus:border-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="UPLOADED">Uploaded</option>
          <option value="PROCESSING">Processing</option>
          <option value="PROCESSED">Processed</option>
          <option value="FAILED">Failed</option>
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) =>
            onSortChange(e.target.value)
          }
          className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm shadow-sm outline-none focus:border-blue-500"
        >
          <option value="NEWEST">Newest First</option>
          <option value="OLDEST">Oldest First</option>
          <option value="NAME">File Name</option>
        </select>

        {/* Upload */}

        <label
          className="
            flex
            h-12
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-blue-700
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
    </div>
  );
}

export default DocumentToolbar;