import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Jobs", path: "/jobs" },
    { name: "Reminders", path: "/reminders" },
    { name: "Analytics", path: "/analytics" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <>
      <div className="md:hidden h-14 flex items-center justify-between px-4 bg-white shadow">
        <h2 className="font-semibold text-lg">Job Tracker</h2>
        <button
          onClick={() => setOpen(true)}
          className="text-2xl text-gray-700"
        >
          ☰
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-xl font-semibold">Job Tracker</h2>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 rounded-md text-sm transition ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-800 text-xs text-gray-400">
            © 2026 Job App
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;