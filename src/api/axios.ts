import axios from 'axios';

// Simple axios instance that uses the raw VITE_API_BASE_URL as-is.
// Example: VITE_API_BASE_URL=http://localhost:8000/api
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
