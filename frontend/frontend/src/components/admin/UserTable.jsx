import { useEffect, useState } from "react";
import API from "../../services/api";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Users fetch failed", err.response?.data || err.message);
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full flex flex-col h-full">
      <div className="mb-6">
        <h2 className="font-bold text-xl text-gray-900 tracking-tight font-[Outfit]">Registered Users</h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">Manage and view all platform members.</p>
      </div>

      <div className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="2" className="px-6 py-12 text-center text-gray-500 animate-pulse font-medium">
                  Loading users...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="2" className="px-6 py-12 text-center text-red-500 font-medium">
                  {error}
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-6 py-12 text-center text-gray-500 font-medium">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;