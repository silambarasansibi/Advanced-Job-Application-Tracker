import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { getJobs, updateJob } from "../../services/jobService";
import { uploadResume } from "../../services/uploadService";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    companyName: "",
    role: "",
    status: "Applied",
    resume_url: "",
  });

  const [file, setFile] = useState(null);

  // ✅ Fetch job
  const fetchJob = async () => {
    try {
      const jobs = await getJobs();
      const found = jobs.find((j) => j.id === parseInt(id));
      if (found) setJob(found);
    } catch (err) {
      console.error("Error fetching job:", err);
    }
  };

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // ✅ Submit (update job + optional resume upload)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedJob = { ...job };

      // 🔥 Upload new resume if selected
      if (file) {
        const uploadRes = await uploadResume(file);
        updatedJob.resume_url = uploadRes.url;
      }

      await updateJob(parseInt(id), updatedJob);

      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
    }
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
              Edit Job
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Update your job application details
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 w-full max-w-2xl">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Company */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={job.companyName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={job.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Status
                </label>
                <select
                  name="status"
                  value={job.status}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>

              {/* ✅ VIEW EXISTING RESUME */}
              {job?.resume_url && (
                <div>
                  <label className="text-sm text-gray-600 block mb-1">
                    Uploaded Resume
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      window.open(job.resume_url, "_blank")
                    }
                    className="text-blue-500 underline text-sm"
                  >
                    📄 View Resume
                  </button>
                </div>
              )}

              {/* ✅ Upload New Resume */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Upload New Resume
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>

        </main>
      </div>
    </div>
  );
};

export default JobDetails;