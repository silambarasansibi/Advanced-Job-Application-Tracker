import { useState } from "react";
import { uploadResume } from "../../services/uploadService";

const UploadResume = ({ setUrl }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const res = await uploadResume(file);
    setUrl(res.url);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-5">
      <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
        {loading ? "Uploading..." : "Upload Resume"}
        <input type="file" hidden onChange={handleUpload} />
      </label>
    </div>
  );
};

export default UploadResume;