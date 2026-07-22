import { FaSearch } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div
      className="
        flex
        h-12
        items-center
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition
        focus-within:border-blue-500
        focus-within:ring-2
        focus-within:ring-blue-100
      "
    >
      {/* Left spacing + icon */}

      <div className="flex w-14 shrink-0 items-center justify-center">
        <FaSearch className="text-sm text-gray-400" />
      </div>

      {/* Input */}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search documents..."
        className="
          flex-1
          border-none
          bg-transparent
          pr-4
          text-sm
          outline-none
          placeholder:text-gray-400
        "
      />
    </div>
  );
}

export default SearchBar;