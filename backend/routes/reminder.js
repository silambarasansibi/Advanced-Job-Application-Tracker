const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { jobId, reminderDate, message } = req.body;

    if (!jobId || !reminderDate) {
      return res.status(400).json({ error: "jobId and reminderDate required" });
    }

    const reminder = await prisma.reminder.create({
      data: {
        jobId,
        reminderDate: new Date(reminderDate),
        message: message || "",
      },
    });

    res.json(reminder);
  } catch (error) {
    res.status(500).json({ error: "Error creating reminder" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const reminders = await prisma.reminder.findMany({
      where: {
        job: {
          userId: req.user.userId,
        },
      },
      include: {
        job: true,
      },
      orderBy: {
        reminderDate: "asc",
      },
    });

    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reminders" });
  }
});

module.exports = router;