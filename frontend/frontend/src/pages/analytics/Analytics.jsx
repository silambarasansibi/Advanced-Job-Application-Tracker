import { useContext } from "react";
import Navbar from "../../components/common/Navbar";
import ChartCard from "../../components/analytics/ChartCard";
import { JobContext } from "../../context/JobContext";

const Analytics = () => {
  const { jobs } = useContext(JobContext);

  return (
    <div className="flex min-h-screen w-full bg-[#fafafa]">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full relative">
        
        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 overflow-auto">
          
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