/**
 * API base URL for backend.
 * - Local dev: http://localhost:8000 (frontend dev server, backend runs separately).
 * - Production: /api so nginx can proxy to backend on the same origin (avoids exposing :8000 to browsers).
 * - Override with VITE_API_URL at build time only if backend is on another public host.
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) ||
  (import.meta.env.DEV ? "http://localhost:8000" : "/api");
