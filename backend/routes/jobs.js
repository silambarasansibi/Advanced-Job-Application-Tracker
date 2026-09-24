const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const jobController = require("../controllers/jobController");

router.post("/", authMiddleware, jobController.createJob);
router.get("/", authMiddleware, jobController.getJobs);
router.put("/:id", authMiddleware, jobController.updateJob);
router.delete("/:id", authMiddleware, jobController.deleteJob);

module.exports = router;