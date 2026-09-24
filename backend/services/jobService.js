const prisma = require("../prismaClient");

const createJob = async (userId, data) => {
  const { companyName, role, status, resume_url } = data;
  
  if (!companyName || !role) {
    throw new Error("Company and role are required");
  }

  const job = await prisma.job.create({
    data: {
      companyName,
      role,
      status: status || "Applied",
      resume_url: resume_url || "",
      userId,
    },
  });

  return job;
};

const getJobs = async (userId, status, search) => {
  const jobs = await prisma.job.findMany({
    where: {
      userId,
      status: status || undefined,
      companyName: search
        ? { contains: search, mode: "insensitive" }
        : undefined,
    },
    orderBy: {
      id: "desc",
    },
  });
  return jobs;
};

const updateJob = async (userId, jobId, data) => {
  const { companyName, role, status, resume_url } = data;

  const job = await prisma.job.updateMany({
    where: {
      id: jobId,
      userId,
    },
    data: {
      companyName,
      role,
      status,
      resume_url,
    },
  });

  if (job.count === 0) {
    throw new Error("Job not found");
  }

  return { message: "Job updated successfully" };
};

const deleteJob = async (userId, jobId) => {
  await prisma.reminder.deleteMany({
    where: {
      jobId: jobId,
    },
  });

  const job = await prisma.job.deleteMany({
    where: {
      id: jobId,
      userId,
    },
  });

  if (job.count === 0) {
    throw new Error("Job not found");
  }

  return { message: "Job deleted successfully" };
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
};
