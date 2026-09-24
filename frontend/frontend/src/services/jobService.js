import API from "./api";

export const getJobs = async (params) => {
  const res = await API.get("/jobs", { params });
  return res.data;
};

export const createJob = async (data) => {
  const res = await API.post("/jobs", data);
  return res.data;
};

export const updateJob = async (id, data) => {
  const res = await API.put(`/jobs/${id}`, data);
  return res.data;
};

export const deleteJob = async (id) => {
  const res = await API.delete(`/jobs/${id}`);
  return res.data;
};