const JobFilters = ({ setFilters }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl w-full h-full flex flex-col">
      <div className="mb-4">
        <h2 className="font-bold text-xl text-gray-900 tracking-tight font-[Outfit]">Filter Jobs</h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">Quickly find specific roles.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
        <input
          className="border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full text-sm outline-none transition-all"
          placeholder="Search by company or role..."
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
            }))
          }
        />

        <select
          className="border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full sm:w-48 text-sm outline-none transition-all cursor-pointer appearance-none"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
        >
          <option value="">All Statuses</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default JobFilters;