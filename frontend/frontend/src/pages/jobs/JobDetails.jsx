import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../components/common/Navbar";
import { JobContext } from "../../context/JobContext";
import { uploadResume } from "../../services/uploadService";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJob } = useContext(JobContext);

  const [job, setJob] = useState({
    companyName: "",
    role: "",
    status: "Applied",
    resume_url: "",
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (id && jobs.length > 0) {
      const found = jobs.find((j) => j.id === parseInt(id));
      if (found) setJob(found);
    }
  }, [id, jobs]);

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
    <div className="flex min-h-screen w-full bg-[#fafafa]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full relative">
        
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
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 w-full max-w-2xl mt-4">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Company */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={job.companyName}
                  onChange={handleChange}
                  className="border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full text-sm outline-none transition-all"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={job.role}
                  onChange={handleChange}
                  className="border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full text-sm outline-none transition-all"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Status
                </label>
                <select
                  name="status"
                  value={job.status}
                  onChange={handleChange}
                  className="border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full text-sm outline-none transition-all cursor-pointer appearance-none"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>

              {/* ✅ VIEW EXISTING RESUME */}
              {job?.resume_url && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-blue-900">
                      Current Resume
                    </label>
                    <span className="text-xs text-blue-600 mt-0.5">Active file attached to application</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      window.open(job.resume_url, "_blank")
                    }
                    className="text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                  >
                    View File
                  </button>
                </div>
              )}

              {/* ✅ Upload New Resume */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Upload New Resume (Optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 transition-all cursor-pointer"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-white border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-gray-900 text-white font-medium py-2.5 rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
                >
                  Save Changes
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