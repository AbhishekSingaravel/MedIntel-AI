import { FaBell, FaUserCircle } from "react-icons/fa";

import { useAuth } from "@/store/AuthContext";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header>
      <div className="flex w-full items-center justify-between">
        {/* Left */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 text-lg text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-gray-200
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:bg-gray-50
              hover:shadow-md
            "
          >
            <FaBell className="text-lg text-gray-600" />
          </button>

          {/* User */}
          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-4
              py-2
              shadow-sm
            "
          >
            <FaUserCircle className="text-5xl text-blue-600" />

            <div>
              <h3 className="font-semibold text-gray-800">
                {user?.name}
              </h3>

              <p className="text-sm text-gray-500">
                Healthcare Professional
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;