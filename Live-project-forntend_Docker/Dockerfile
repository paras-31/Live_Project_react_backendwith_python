# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder

# Optional: if your backend is on a different public host, pass it at build time:
#   docker build --build-arg VITE_API_URL=https://api.example.com -t live-frontend .
# If not provided, the app defaults to same-origin `/api` in production.
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional but recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
