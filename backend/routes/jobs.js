const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { companyName, role, status, resume_url } = req.body;

    if (!companyName || !role) {
      return res
        .status(400)
        .json({ error: "Company and role are required" });
    }

    const job = await prisma.job.create({
      data: {
        companyName,
        role,
        status: status || "Applied",
        resume_url: resume_url || "",
        userId: req.user.userId,
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ error: "Error creating job" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { status, search } = req.query;

    const jobs = await prisma.job.findMany({
      where: {
        userId: req.user.userId,
        status: status || undefined,
        companyName: search
          ? { contains: search, mode: "insensitive" }
          : undefined,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(jobs);
  } catch (error) {
    console.error("Fetch jobs error:", error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { companyName, role, status, resume_url } = req.body;
    const jobId = parseInt(req.params.id);

    const job = await prisma.job.updateMany({
      where: {
        id: jobId,
        userId: req.user.userId,
      },
      data: {
        companyName,
        role,
        status,
        resume_url,
      },
    });

    if (job.count === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Update job error:", error);
    res.status(500).json({ error: "Error updating job" });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    await prisma.reminder.deleteMany({
      where: {
        jobId: jobId,
      },
    });

    const job = await prisma.job.deleteMany({
      where: {
        id: jobId,
        userId: req.user.userId,
      },
    });

    if (job.count === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ error: "Error deleting job" });
  }
});

module.exports = router;