import JobCard from "./JobCard";

const JobList = ({ jobs = [], onDelete, onEdit }) => {
  if (!Array.isArray(jobs)) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-5 w-full">
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="w-full max-w-md bg-white rounded-xl shadow-sm p-3"
          >
            <JobCard
              job={job}
              onDelete={onDelete}
              onEdit={onEdit}
            />

            {job?.resume_url ? (
              <div className="text-center mt-2">
                <button
                  onClick={() => window.open(job.resume_url, "_blank")}
                  className="text-blue-500 underline text-sm"
                >
                  View Resume
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-400 text-xs mt-2">
                No Resume Uploaded
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;