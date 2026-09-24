const prisma = require("../prismaClient");

const createReminder = async (jobId, reminderDate, message) => {
  if (!jobId || !reminderDate) {
    throw new Error("jobId and reminderDate required");
  }

  const reminder = await prisma.reminder.create({
    data: {
      jobId,
      reminderDate: new Date(reminderDate),
      message: message || "",
    },
  });

  return reminder;
};

const getReminders = async (userId) => {
  const reminders = await prisma.reminder.findMany({
    where: {
      job: {
        userId: userId,
      },
    },
    include: {
      job: true,
    },
    orderBy: {
      reminderDate: "asc",
    },
  });

  return reminders;
};

module.exports = {
  createReminder,
  getReminders,
};
