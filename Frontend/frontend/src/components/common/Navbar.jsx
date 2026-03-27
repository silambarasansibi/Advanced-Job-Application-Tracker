import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="w-full px-4 md:px-6 lg:px-8 py-3 flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Job Tracker
        </h1>

        <div className="flex items-center gap-3 md:gap-4">
          <span className="hidden sm:block text-gray-600 text-sm">
            {user?.name || "User"}
          </span>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;