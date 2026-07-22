import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

function TextInput({
  label,
  type = "text",
  placeholder,
  registration,
  error,
}: TextInputProps) {
  return (
    <div className="mb-5">
      <label className="block mb-2 font-medium">
        {label}
      </label>

      <input
        {...registration}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-3 focus:outline-none ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:border-blue-500"
        }`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default TextInput;