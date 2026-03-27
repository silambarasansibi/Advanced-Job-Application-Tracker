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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Set Reminder
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Date & Time
            </label>
            <input
              type="datetime-local"
              name="reminderDate"
              value={form.reminderDate}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Optional note"
              value={form.message}
              onChange={handleChange}
              className="w-full border p-2 rounded-md resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Saving..." : "Save Reminder"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderModal;