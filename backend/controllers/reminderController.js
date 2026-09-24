const reminderService = require("../services/reminderService");

const createReminder = async (req, res) => {
  try {
    const { jobId, reminderDate, message } = req.body;
    const reminder = await reminderService.createReminder(jobId, reminderDate, message);
    res.json(reminder);
  } catch (error) {
    if (error.message === "jobId and reminderDate required") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Create reminder error:", error);
    res.status(500).json({ error: "Error creating reminder" });
  }
};

const getReminders = async (req, res) => {
  try {
    const reminders = await reminderService.getReminders(req.user.userId);
    res.json(reminders);
  } catch (error) {
    console.error("Fetch reminders error:", error);
    res.status(500).json({ error: "Error fetching reminders" });
  }
};

module.exports = {
  createReminder,
  getReminders,
};
