import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import JobForm from "../../components/jobs/JobForm";
import JobList from "../../components/jobs/JobList";
import JobFilters from "../../components/jobs/JobFilters";
import {
  getJobs,
  createJob,
  deleteJob,
} from "../../services/jobService";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs(filters);
      setJobs(data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleCreate = async (formData) => {
    try {
      await createJob(formData);
      fetchJobs();
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to create job");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  const handleEdit = (job) => {
    navigate(`/jobs/${job.id}`);
  };

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
                jobs={jobs}
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