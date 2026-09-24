import { useState } from "react";
import UploadResume from "../upload/UploadResume";

const JobForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    status: "Applied",
    resume_url: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    setForm({
      companyName: "",
      role: "",
      status: "Applied",
      resume_url: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl w-full flex flex-col gap-4 transition-shadow hover:shadow-md"
    >
      <div className="mb-2">
        <h2 className="font-bold text-xl text-gray-900 tracking-tight font-[Outfit]">Add New Job</h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">Track a new application.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          className="border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full text-sm outline-none transition-all"
          placeholder="Company Name"
          value={form.companyName}
          onChange={(e) =>
            setForm({ ...form, companyName: e.target.value })
          }
        />

        <input
          className="border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full text-sm outline-none transition-all"
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <select
          className="border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full text-sm outline-none transition-all cursor-pointer appearance-none"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <div className="w-full">
          <UploadResume
            setUrl={(url) =>
              setForm({ ...form, resume_url: url })
            }
          />
          {form.resume_url && (
            <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Resume uploaded
            </p>
          )}
        </div>
      </div>

      <button className="bg-gray-900 text-white font-medium py-2.5 rounded-xl hover:bg-gray-800 transition-colors shadow-sm mt-2">
        Add Application
      </button>
    </form>
  );
};

export default JobForm;