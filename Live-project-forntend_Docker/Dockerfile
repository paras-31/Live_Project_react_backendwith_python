# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder

# On EC2/ALB: pass your backend URL so login/signup work from the browser, e.g.:
#   docker build --build-arg VITE_API_URL=http://appalb-721266216.us-east-1.elb.amazonaws.com:8000 -t live-frontend .
ARG VITE_API_URL=http://appalb-721266216.us-east-1.elb.amazonaws.com:8000
ENV VITE_API_URL=$VITE_API_URL

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
