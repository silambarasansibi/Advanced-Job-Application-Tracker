import { createContext, useState, useEffect, useContext } from "react";
import { getJobs, updateJob as updateJobApi, deleteJob as deleteJobApi, createJob as createJobApi } from "../services/jobService";
import { AuthContext } from "./AuthContext";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getJobs();
      setJobs(data || []);
    } catch (err) {
      console.error("Failed to fetch jobs globally:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const addJob = async (jobData) => {
    const newJob = await createJobApi(jobData);
    setJobs((prev) => [newJob, ...prev]);
    return newJob;
  };

  const updateJob = async (id, updates) => {
    // Optimistic update
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...updates } : j)));
    try {
      await updateJobApi(id, updates);
    } catch (err) {
      console.error("Update failed, rolling back.");
      fetchJobs();
      throw err;
    }
  };

  const deleteJob = async (id) => {
    // Optimistic update
    setJobs((prev) => prev.filter((j) => j.id !== id));
    try {
      await deleteJobApi(id);
    } catch (err) {
      console.error("Delete failed, rolling back.");
      fetchJobs();
      throw err;
    }
  };

  return (
    <JobContext.Provider value={{ jobs, loading, addJob, updateJob, deleteJob, refreshJobs: fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};
