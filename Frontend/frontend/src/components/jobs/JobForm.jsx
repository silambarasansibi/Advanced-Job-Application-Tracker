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
      className="bg-white shadow-md p-5 rounded-xl w-full max-w-md mx-auto flex flex-col gap-3"
    >
      <h2 className="text-center font-bold text-lg">Add Job</h2>

      <input
        className="border p-2 rounded"
        placeholder="Company Name"
        value={form.companyName}
        onChange={(e) =>
          setForm({ ...form, companyName: e.target.value })
        }
      />

      <input
        className="border p-2 rounded"
        placeholder="Role"
        value={form.role}
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      />

      <select
        className="border p-2 rounded"
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

      <UploadResume
        setUrl={(url) =>
          setForm({ ...form, resume_url: url })
        }
      />

      {form.resume_url && (
        <p className="text-sm text-green-600 text-center">
          Resume uploaded
        </p>
      )}

      <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default JobForm;