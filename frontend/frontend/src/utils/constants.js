export const STATUS_OPTIONS = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

export const API_BASE_URL = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL.endsWith('/api') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/api`)
  : "http://localhost:5000/api";