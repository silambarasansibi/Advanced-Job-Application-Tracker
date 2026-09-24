import { useContext, useState } from "react";
import Navbar from "../../components/common/Navbar";
import KanbanBoard from "../../components/jobs/KanbanBoard";
import { JobContext } from "../../context/JobContext";

const Dashboard = () => {
  const { jobs, updateJob } = useContext(JobContext);

  // ✅ NEW STATES
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleStatusChange = async (id, status) => {
    // 🚀 Optimistically update UI instantly for enterprise-level feel
    if (!id || !status) return;
    try {
      await updateJob(id, { status });
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
    <div className="flex min-h-screen w-full bg-[#fafafa]">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        
        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10 overflow-auto">
          
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-[Outfit]">
                Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-1.5 font-medium">
                Track and manage your job applications across all stages.
              </p>
            </div>
          </div>

          {/* ✅ SEARCH + FILTER UI */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            
            {/* Search */}
            <input
              type="text"
              placeholder="Search by company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 bg-white shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full sm:w-1/3 text-sm outline-none transition-all"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 bg-white shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full sm:w-48 text-sm outline-none transition-all cursor-pointer appearance-none"
            >
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Clear Button */}
            {(search || statusFilter) && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("");
                }}
                className="text-gray-500 hover:text-gray-900 text-sm font-medium px-4 py-2.5 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Kanban Section */}
          <div className="w-full overflow-x-auto pb-4">
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