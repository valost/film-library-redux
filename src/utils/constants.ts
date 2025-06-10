export const BASE_API_URL =
  window.environment?.API_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8001/api/v1';

console.log(window.environment?.API_URL, import.meta.env.VITE_API_URL);

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
