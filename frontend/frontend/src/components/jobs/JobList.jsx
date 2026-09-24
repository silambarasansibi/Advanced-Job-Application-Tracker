import JobCard from "./JobCard";

const JobList = ({ jobs = [], onDelete, onEdit }) => {
  if (!Array.isArray(jobs)) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {jobs.length === 0 ? (
        <div className="col-span-full py-12 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-500 font-medium">No jobs found matching your criteria.</p>
        </div>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="h-full">
            <JobCard
              job={job}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;