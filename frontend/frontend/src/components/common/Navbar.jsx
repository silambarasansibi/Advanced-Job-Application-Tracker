import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Jobs", path: "/jobs" },
    { name: "Analytics", path: "/analytics" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 font-[Outfit]">
              JobTracker<span className="text-blue-600">.</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-gray-900 text-sm font-medium leading-none">
              {user?.name || "User"}
            </span>
            <span className="text-gray-500 text-xs mt-1">Admin</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-2 ring-white">
            <span className="text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <button
            onClick={logout}
            className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;