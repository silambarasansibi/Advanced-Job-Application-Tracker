import { useEffect, useState } from "react";
import API from "../../services/api";

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    const res = await API.get("/reminders");
    setReminders(res.data);
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <h2 className="text-xl font-bold">Reminders</h2>

      {reminders.length === 0 ? (
        <p className="text-gray-500">No reminders</p>
      ) : (
        reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="bg-white shadow-md rounded-xl p-4 w-full max-w-md flex flex-col gap-1"
          >
            <p className="font-semibold text-center">
              {reminder.job?.companyName}
            </p>

            <p className="text-center text-sm text-gray-600">
              {new Date(reminder.reminderDate).toLocaleString()}
            </p>

            {reminder.message && (
              <p className="text-center text-gray-700">
                {reminder.message}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReminderList;