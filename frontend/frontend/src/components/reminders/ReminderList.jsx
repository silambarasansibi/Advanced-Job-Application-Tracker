import { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import API from "../../services/api";

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReminders = async () => {
    try {
      const res = await API.get("/reminders");
      setReminders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-[#fafafa]">
      <div className="flex-1 flex flex-col w-full relative">
        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10 overflow-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-[Outfit]">
              Reminders
            </h1>
            <p className="text-gray-500 text-sm mt-1.5 font-medium">
              Upcoming interviews and follow-ups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading ? (
              <p className="text-gray-500 animate-pulse">Loading reminders...</p>
            ) : reminders.length === 0 ? (
              <p className="text-gray-500">No reminders found.</p>
            ) : (
              reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex flex-col hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold text-gray-900 text-lg mb-1">
                    {reminder.job?.companyName}
                  </p>
                  
                  <div className="inline-flex items-center w-fit bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    {new Date(reminder.reminderDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>

                  {reminder.message && (
                    <p className="text-gray-600 text-sm mt-auto">
                      {reminder.message}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReminderList;