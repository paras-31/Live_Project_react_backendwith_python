/**
 * API base URL for backend.
 * - Local dev: http://localhost:8000 (Vite dev server, backend runs separately).
 * - Production (same host): /api so nginx proxies to backend; no build-arg needed.
 * - Override with VITE_API_URL at build time if backend is on another host.
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) ||
  (import.meta.env.DEV ? "http://appalb-721266216.us-east-1.elb.amazonaws.com" : "/api");
