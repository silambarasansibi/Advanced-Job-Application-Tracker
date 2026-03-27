import API from "./api";

export const createReminder = async (data) => {
  const res = await API.post("/reminders", data);
  return res.data;
};

export const getReminders = async () => {
  const res = await API.get("/reminders");
  return res.data;
};