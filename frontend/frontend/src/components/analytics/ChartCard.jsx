import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ChartCard = ({ jobs = [] }) => {
  const dataCount = {
    Applied: jobs.filter((j) => j.status === "Applied").length,
    Interview: jobs.filter((j) => j.status === "Interview").length,
    Offer: jobs.filter((j) => j.status === "Offer").length,
    Rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  const data = {
    labels: Object.keys(dataCount),
    datasets: [
      {
        label: "Job Status",
        data: Object.values(dataCount),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Blue for Applied
          "rgba(168, 85, 247, 0.8)", // Purple for Interview
          "rgba(34, 197, 94, 0.8)",  // Green for Offer
          "rgba(239, 68, 68, 0.8)",  // Red for Rejected
        ],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 w-full max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-6">
        <h2 className="font-bold text-xl text-gray-900 tracking-tight font-[Outfit]">Pipeline Overview</h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">Status distribution of all your tracked jobs.</p>
      </div>
      <div className="flex-1 min-h-[300px] flex items-center justify-center">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartCard;