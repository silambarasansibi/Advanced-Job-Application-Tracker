import { useState, useContext } from "react";
import Navbar from "../../components/common/Navbar";
import JobForm from "../../components/jobs/JobForm";
import JobList from "../../components/jobs/JobList";
import JobFilters from "../../components/jobs/JobFilters";
import { JobContext } from "../../context/JobContext";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const { jobs, loading, addJob, deleteJob } = useContext(JobContext);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await addJob(formData);
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  // ✅ Client-side fast filtering
  const filteredJobs = jobs.filter((job) => {
    let matches = true;
    if (filters.status && job.status !== filters.status) matches = false;
    if (filters.search && !job.companyName?.toLowerCase().includes(filters.search.toLowerCase())) matches = false;
    return matches;
  });

  return (
    <div className="flex min-h-screen w-full bg-[#fafafa]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full relative">
        
        <Navbar />

        <main className="flex-1 w-full p-4 md:p-6 overflow-auto">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Jobs
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your job applications efficiently
            </p>
          </div>

          {/* Form + Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 w-full">
            
            <div className="bg-white rounded-xl shadow-sm p-4 w-full">
              <JobForm onSubmit={handleCreate} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 w-full">
              <JobFilters setFilters={setFilters} />
            </div>

          </div>

          {/* Job List */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 w-full">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <JobList
                jobs={filteredJobs}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Jobs;