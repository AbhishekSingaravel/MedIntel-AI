interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          {title}
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;