import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutGrid,
  Bookmark,
  ShoppingCart,
  MessageSquare,
  Settings,
  Power,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function SidebarNavigation() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const topNavItems = [
    { icon: Home, path: "/" },
    { icon: LayoutGrid, path: "/pos" },
    { icon: ShoppingCart, path: "/orders" },
    { icon: MessageSquare, path: "/messages" },
  ];

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <aside className="hidden md:flex w-20 lg:w-24 bg-white flex-col items-center py-8 justify-between z-50 rounded-r-3xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] h-full shrink-0">
        <div className="flex flex-col items-center gap-10 w-full">
          {/* Logo */}
          <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-primary-purple font-bold text-3xl">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 lg:w-10 lg:h-10"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            </svg>
          </div>

          {/* Top Navigation */}
          <nav className="flex flex-col gap-2 lg:gap-4 w-full px-2 lg:px-4">
            {topNavItems.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {({ isActive }) => (
                  <div
                    className={`flex items-center justify-center p-3 lg:p-4 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary-purple text-white shadow-lg shadow-primary-purple/30"
                        : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className="w-5 h-5 lg:w-6 lg:h-6"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col gap-2 lg:gap-4 w-full px-2 lg:px-4">
          <NavLink to="/settings">
            {({ isActive }) => (
              <div
                className={`flex items-center justify-center p-3 lg:p-4 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-primary-purple text-white shadow-lg shadow-primary-purple/30"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Settings
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
            )}
          </NavLink>
          <button onClick={handleLogout} className="w-full">
            <div className="flex items-center justify-center p-3 lg:p-4 rounded-2xl transition-all duration-200 text-gray-400 hover:bg-red-50 hover:text-red-500">
              <Power className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2} />
            </div>
          </button>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-4 py-2 flex justify-between items-center pb-safe h-16">
        {topNavItems.slice(0, 4).map((item) => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <div
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-primary-purple"
                    : "text-gray-400 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className="w-6 h-6"
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
            )}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 text-gray-400 hover:text-red-500"
        >
          <Power className="w-6 h-6" strokeWidth={2} />
        </button>
      </aside>
    </>
  );
}
