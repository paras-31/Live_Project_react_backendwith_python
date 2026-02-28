/**
 * API base URL for backend.
 * - Local dev: http://localhost:8000 (default)
 * - Private EC2: set VITE_API_URL at build time, e.g. http://<backend-ip-or-host>:8000
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:8000";
