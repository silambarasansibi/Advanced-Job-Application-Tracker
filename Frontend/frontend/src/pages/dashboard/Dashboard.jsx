import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import KanbanBoard from "../../components/jobs/KanbanBoard";
import { getJobs, updateJob } from "../../services/jobService";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  // ✅ NEW STATES
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      if (id && status) {
        await updateJob(id, { status });
      }
      fetchJobs();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // ✅ FILTER LOGIC
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      job.role?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter
      ? job.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

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
              Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Track and manage your job applications
            </p>
          </div>

          {/* ✅ SEARCH + FILTER UI */}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            
            {/* Search */}
            <input
              type="text"
              placeholder="Search by company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full md:w-1/3"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg w-full md:w-1/4"
            >
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Clear Button */}
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("");
              }}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Clear
            </button>
          </div>

          {/* Kanban Section */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 w-full overflow-x-auto">
            <KanbanBoard
              jobs={filteredJobs} // ✅ USE FILTERED DATA
              onStatusChange={handleStatusChange}
            />
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;