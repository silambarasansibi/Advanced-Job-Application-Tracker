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
        borderWidth: 1,
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
    <div className="bg-white shadow-md rounded-xl p-5 w-full max-w-xl mx-auto mt-6">
      <h2 className="text-center font-bold text-lg mb-4">
        Job Analytics
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartCard;