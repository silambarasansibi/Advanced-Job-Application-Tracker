import { useState } from "react";
import ReminderModal from "../reminders/ReminderModal";

const JobCard = ({ job, onDelete, onEdit }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white shadow-sm rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition">
        <h2 className="text-lg font-semibold text-blue-600 text-center">
          {job?.companyName}
        </h2>

        <p className="text-center text-gray-700 text-sm">
          {job?.role}
        </p>

        <span className="text-center text-xs bg-gray-200 px-2 py-1 rounded w-fit mx-auto">
          {job?.status}
        </span>

        {job?.resume_url && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(job.resume_url, "_blank");
            }}
            className="text-blue-500 underline text-xs text-center mt-1"
          >
            View Resume
          </button>
        )}

        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit(job);
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(job.id);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
          >
            Delete
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition"
          >
            Reminder
          </button>
        </div>
      </div>

      {showModal && (
        <ReminderModal
          jobId={job.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default JobCard;