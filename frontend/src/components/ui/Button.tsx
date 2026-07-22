interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
}

function Button({
  children,
  type = "submit",
}: ButtonProps) {
  return (
    <button
      type={type}
      className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}

export default Button;