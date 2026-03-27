import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import UserTable from "../../components/admin/UserTable";

const Admin = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        
        <Navbar />

        <main className="flex-1 w-full p-4 md:p-6 overflow-auto">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Admin Panel
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage users and system data
            </p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 w-full overflow-x-auto">
            <UserTable />
          </div>

        </main>
      </div>
    </div>
  );
};

export default Admin;