import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import ChartCard from "../../components/analytics/ChartCard";
import { getJobs } from "../../services/jobService";

const Analytics = () => {
  const [jobs, setJobs] = useState([]);

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
              Analytics
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Insights and statistics of your job applications
            </p>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 w-full">
            <ChartCard jobs={jobs} />
          </div>

        </main>
      </div>
    </div>
  );
};

export default Analytics;