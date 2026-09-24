const jobService = require("../services/jobService");

const createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.user.userId, req.body);
    res.status(201).json(job);
  } catch (error) {
    if (error.message === "Company and role are required") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Create job error:", error);
    res.status(500).json({ error: "Error creating job" });
  }
};

const getJobs = async (req, res) => {
  try {
    const { status, search } = req.query;
    const jobs = await jobService.getJobs(req.user.userId, status, search);
    res.json(jobs);
  } catch (error) {
    console.error("Fetch jobs error:", error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const result = await jobService.updateJob(req.user.userId, jobId, req.body);
    res.json(result);
  } catch (error) {
    if (error.message === "Job not found") {
      return res.status(404).json({ error: error.message });
    }
    console.error("Update job error:", error);
    res.status(500).json({ error: "Error updating job" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const result = await jobService.deleteJob(req.user.userId, jobId);
    res.json(result);
  } catch (error) {
    if (error.message === "Job not found") {
      return res.status(404).json({ error: error.message });
    }
    console.error("Delete job error:", error);
    res.status(500).json({ error: "Error deleting job" });
  }
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
};
