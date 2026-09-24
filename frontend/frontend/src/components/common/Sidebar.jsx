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
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0A0A0A] text-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 border-r border-gray-800`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold tracking-tight text-white font-[Outfit]">
              JobTracker<span className="text-blue-500">.</span>
            </h2>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 space-y-1 mt-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 text-xs text-gray-500 font-medium">
            © 2026 Enterprise Jobs
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;