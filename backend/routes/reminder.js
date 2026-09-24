const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const reminderController = require("../controllers/reminderController");

router.post("/", authMiddleware, reminderController.createReminder);
router.get("/", authMiddleware, reminderController.getReminders);

module.exports = router;