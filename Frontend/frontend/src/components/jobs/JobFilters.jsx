const JobFilters = ({ setFilters }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-5">
      <input
        className="border p-2 rounded w-60"
        placeholder="Search company..."
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            search: e.target.value,
          }))
        }
      />

      <select
        className="border p-2 rounded w-40"
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            status: e.target.value,
          }))
        }
      >
        <option value="">All</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
    </div>
  );
};

export default JobFilters;