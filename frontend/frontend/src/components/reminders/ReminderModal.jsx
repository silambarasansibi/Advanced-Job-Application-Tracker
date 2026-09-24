import { useState } from "react";
import { createReminder } from "../../services/reminderService";

const ReminderModal = ({ jobId, onClose }) => {
  const [form, setForm] = useState({
    reminderDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.reminderDate) {
      alert("Please select date and time");
      return;
    }

    try {
      setLoading(true);

      await createReminder({
        jobId,
        reminderDate: form.reminderDate,
        message: form.message,
      });

      onClose();
    } catch (err) {
      console.error("Reminder error:", err);
      alert("Failed to create reminder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-[400px] rounded-3xl shadow-2xl p-8 relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <span className="text-xl leading-none">&times;</span>
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-blue-600 text-xl">⏰</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-[Outfit]">
            Set Reminder
          </h2>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">Never miss an interview or follow-up.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Date & Time
            </label>
            <input
              type="datetime-local"
              name="reminderDate"
              value={form.reminderDate}
              onChange={handleChange}
              className="border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Message (Optional)
            </label>
            <textarea
              name="message"
              placeholder="e.g. Follow up on interview..."
              value={form.message}
              onChange={handleChange}
              className="border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full text-sm outline-none transition-all resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-900 text-white font-medium py-2.5 rounded-xl hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderModal;