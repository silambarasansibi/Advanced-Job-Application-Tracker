import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";

const useJobs = (filters) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const data = await getJobs(filters);
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return { jobs, fetchJobs };
};

export default useJobs;