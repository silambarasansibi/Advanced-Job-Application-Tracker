import { useState } from "react";
import ReminderModal from "../reminders/ReminderModal";

const JobCard = ({ job, onDelete, onEdit }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col hover:border-gray-300 hover:shadow-md transition-all duration-200 group relative">
        
        {/* Company & Role */}
        <div className="mb-3">
          <h2 className="text-[15px] font-semibold text-gray-900 leading-tight">
            {job?.companyName}
          </h2>
          <p className="text-gray-500 text-[13px] font-medium mt-0.5">
            {job?.role}
          </p>
        </div>

        {/* Date/Status Info */}
        <div className="flex items-center justify-between mb-4 mt-auto">
          {job?.resume_url ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(job.resume_url, "_blank");
              }}
              className="text-gray-400 hover:text-gray-700 text-xs font-medium underline underline-offset-2 transition-colors"
            >
              Resume attached
            </button>
          ) : (
            <span className="text-gray-400 text-xs">No resume</span>
          )}
        </div>

        {/* Actions - Subtle footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit(job);
            }}
            className="text-gray-500 hover:text-blue-600 text-xs font-medium transition-colors"
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="text-gray-500 hover:text-green-600 text-xs font-medium transition-colors"
          >
            Remind
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(job.id);
            }}
            className="text-gray-500 hover:text-red-600 text-xs font-medium transition-colors"
          >
            Delete
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