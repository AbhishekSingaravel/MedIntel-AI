import {
  FaBars,
  FaComments,
  FaFileMedical,
  FaHome,
  FaSignOutAlt,
  FaStethoscope,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "@/store/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const { logout, user } = useAuth();

  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `
      mx-4
      flex
      items-center
      gap-4
      rounded-2xl
      border
      px-4
      py-4
      transition-all
      duration-300
      ${
        collapsed ? "justify-center px-0" : ""
      }
      ${
        isActive
          ? "bg-blue-600 border-blue-600 text-white shadow-lg"
          : "bg-white border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-200 hover:shadow-md"
      }
    `;

  return (
    <aside
  className={`
        sticky
        top-0
        h-screen
        rounded-none
        shrink-0
        flex
        flex-col
        border-r
        border-gray-200
        bg-white
        shadow-xl
        transition-all
        duration-300
        ${collapsed ? "w-24" : "w-64"}
      `}
    >
      {/* Top */}

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-md">
              <FaStethoscope className="text-2xl text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-blue-600">
                MedIntel AI
              </h1>

              <p className="text-sm text-gray-500">
                Clinical Intelligence
              </p>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="flex w-full justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
                <FaStethoscope className="text-3xl text-white"/>
            </div>
        </div>
        )}
      </div>

      {/* Toggle */}

      <div
        className={`flex ${
            collapsed ? "justify-center py-4" : "justify-end px-4 py-4"
        }`}
        >
        <button
            onClick={() => setCollapsed(!collapsed)}
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-md
            transition-all
            duration-300
            hover:bg-gray-100
            hover:scale-105
            hover:shadow-lg
            active:scale-95
            cursor-pointer
            "
        >
          <FaBars className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-3 py-2">
        <NavLink to="/dashboard" className={navClass}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 shrink-0">
            <FaHome className="text-xl text-blue-600" />
          </div>

          {!collapsed && (
            <span className="text-lg font-semibold">
              Dashboard
            </span>
          )}
        </NavLink>

        <NavLink to="/documents" className={navClass}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 shrink-0">
            <FaFileMedical className="text-xl text-blue-600" />
          </div>

          {!collapsed && (
            <span className="text-lg font-semibold">
              Documents
            </span>
          )}
        </NavLink>

        <NavLink to="/chat" className={navClass}>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 shrink-0">
            <FaComments className="text-xl text-blue-600" />
          </div>

          {!collapsed && (
            <span className="text-lg font-semibold">
              AI Chat
            </span>
          )}
        </NavLink>
      </nav>

      {/* Bottom */}

      {/* Bottom */}

      <footer className="mt-auto border-t border-gray-200 p-5">
        {!collapsed && (
            <div className="mb-10 rounded-2xl bg-gray-50 border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 shrink-0">
                    <FaUserCircle className="text-5xl text-blue-600"/>
                </div>
            </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {user?.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Healthcare Professional
                </p>
              </div>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="mb-5 flex justify-center">
            <FaUserCircle className="text-5xl text-blue-600" />
          </div>
        )}

        <div className="mt-4 flex justify-center">
            <button
                onClick={handleLogout}
                className={`
                    flex
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    border
                    border-red-200
                    bg-white
                    text-red-600
                    shadow-sm
                    transition-all
                    duration-300
                    hover:bg-red-50
                    hover:border-red-400
                    hover:shadow-md
                    ${
                    collapsed
                      ? "mx-auto h-12 w-12 bg-gradient-to-b from-red-500 to-red-700 border-0 text-white shadow-lg hover:scale-105"
                      : "h-12 w-full"
                    }
                `}
                >
                    <div
                        className={`
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            ${
                                collapsed
                                    ? "bg-transparent"
                                    : "bg-red-100"
                            }
                        `}
                    >
                        <FaSignOutAlt
                            className={`text-xl ${
                                collapsed ? "text-white" : "text-red-600"
                            }`}
                        />
                    </div>

                    {!collapsed && (
                        <span className="font-semibold text-lg">
                            Logout
                        </span>
                    )}
                </button>
            </div>
      </footer>
    </aside>
  );
}

export default Sidebar;