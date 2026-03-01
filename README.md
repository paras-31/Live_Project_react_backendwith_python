# Live_Project_react_backendwith_python

This repository is a full-stack project featuring a **React frontend** and a **Python FastAPI backend**. The backend handles user authentication and is connected to a MySQL database, while the frontend communicates with the backend for signup and login functionalities.

---

## Table of Contents

- [Backend (Python/FastAPI)](#backend-pythonfastapi)
  - [Backend Architecture](#backend-architecture)
  - [How to Run the Backend](#how-to-run-the-backend)
  - [Backend Endpoints](#backend-endpoints)
  - [Database Details](#database-details)
  - [Backend Dependencies](#backend-dependencies)
- [Frontend (React)](#frontend-react)
  - [Connecting Frontend to Backend](#connecting-frontend-to-backend)
  - [How to Run the Frontend](#how-to-run-the-frontend)
- [Docker Support](#docker-support)
- [Deploying in Private Subnets (Cross-VPC RDS)](#deploying-in-private-subnets-cross-vpc-rds)
- [Project Structure](#project-structure)

---

## Backend (Python/FastAPI)

### Backend Architecture

- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) for building RESTful APIs.
- **Database:** MySQL, accessed via SQLAlchemy ORM.
- **Authentication:** Passwords are hashed using `passlib` with bcrypt.
- **CORS:** Configured to allow requests from React development servers (ports 5173 and 3000).
- **Main components:**
  - `main.py`: FastAPI app initialization, endpoint definitions.
  - `models.py`: SQLAlchemy models (User table).
  - `schemas.py`: Pydantic models for request validation.
  - `database.py`: SQLAlchemy connection setup.
  - `auth.py`: Password hashing and verification logic.

### How to Run the Backend

#### Using Docker

1. Navigate to the backend directory:
   ```sh
   cd Live-project-backend_pyhton_docker
   ```
2. Build the Docker image:
   ```sh
   docker build -t live-backend .
   ```
3. Run the backend container:
   ```sh
   docker run -p 8000:8000 live-backend
   ```

#### Using Python (Locally)

1. Install dependencies:
   ```sh
   pip install -r Live-project-backend_pyhton_docker/requirements.txt
   ```
2. Run the FastAPI app (from backend directory):
   ```sh
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Backend Endpoints

| Method | Endpoint     | Description            | Request Body     |
|--------|--------------|-----------------------|------------------|
| POST   | `/signup`    | Register new user     | `{username, email, password}` |
| POST   | `/login`     | User login            | `{email, password}`           |

**Signup Example:**
```json
POST http://localhost:8000/signup
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Example:**
```json
POST http://localhost:8000/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Database Details

- **Engine:** MySQL (see `database.py` for connection string)
- **User Table Columns:** `id`, `username`, `email`, `password` (hashed)
- **Connection String Example:**
  ```
  mysql+mysqlconnector://admin:Admin12345@database-1.cdmua2gu2dpq.ap-south-1.rds.amazonaws.com:3306/database1
  ```

### Backend Dependencies

See `Live-project-backend_pyhton_docker/requirements.txt` for all Python dependencies.
Key packages:
- `fastapi`
- `uvicorn`
- `sqlalchemy`
- `mysql-connector-python`
- `passlib`
- `bcrypt`
- `python-dotenv`

---

## Frontend (React)

### Connecting Frontend to Backend

- The frontend makes API requests to the backend (e.g. `http://localhost:8000/` when running locally).
- CORS is configured in the backend via `CORS_ORIGINS` env var (defaults to localhost:5173 and 3000). When the frontend is served from another host (e.g. an ALB), set `CORS_ORIGINS` to that origin so the backend allows requests.
- Example usage in frontend code:
  ```js
  axios.post("http://localhost:8000/signup", formData);
  axios.post("http://localhost:8000/login", formData);
  ```

### How to Run the Frontend

#### Using Docker

1. Navigate to the frontend directory:
   ```sh
   cd Live-project-forntend_Docker
   ```
2. Build the frontend image:
   ```sh
   docker build -t live-frontend .
   ```
3. Run the frontend container:
   ```sh
   docker run -p 80:80 live-frontend
   ```

#### Using Node.js (Locally)

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
   (Typically runs on [http://localhost:5173](http://localhost:5173) or [http://localhost:3000](http://localhost:3000))

---

## Docker Support

- **Backend**: Dockerfile in `Live-project-backend_pyhton_docker/`
- **Frontend**: Dockerfile in `Live-project-forntend_Docker/`
- Run both containers and access the frontend via `http://localhost` and backend via `http://localhost:8000`

---

## Running the backend when frontend is on an ALB

When the frontend runs on a **private EC2** (or any non-localhost host), update both sides so the browser can reach the backend and CORS allows the frontend origin.

### 1. Backend (CORS)

Set **`CORS_ORIGINS`** to the URL(s) where the frontend is served (what the user’s browser sees):

```bash
# Example: frontend on same EC2 on port 80
export CORS_ORIGINS="http://10.0.0.5:80,http://10.0.0.5"

# Or use the EC2 private DNS / IP users actually use
export CORS_ORIGINS="http://ip-10-0-0-5.region.compute.internal:80"
```

Run the backend with the env set, or in Docker:

```sh
docker run -p 8000:8000 -e CORS_ORIGINS="http://<frontend-host>:80" live-backend
```

### 2. Frontend (API URL)

**Recommended for ALB deployments:** keep `VITE_API_URL` **unset** so production uses `API_BASE_URL = "/api"`.

That makes the browser call the same origin it loaded the page from:

- `http(s)://<your-alb-dns>/api/signup`
- `http(s)://<your-alb-dns>/api/login`

Then forward `/api/*` to the backend inside AWS (either via nginx proxy in the frontend container, or via ALB listener rules).

Only set `VITE_API_URL` at build time if the backend is directly reachable from the user’s browser (public host/port), which is usually *not* the case for private subnets.

Example (only if backend is publicly reachable):

```sh
cd Live-project-forntend_Docker
docker build --build-arg VITE_API_URL=http://<public-backend-host>:8000 -t live-frontend .
```

---

## Deploying in Private Subnets (Cross-VPC RDS)

This section describes a common AWS production setup:

- The app (frontend nginx + backend FastAPI) runs in **VPC-A**, **private subnets** (EC2/ECS/EKS).
- The database (RDS MySQL) runs in **VPC-B**, **private subnets**.
- Users access the app via an **internet-facing ALB**.

### High-level traffic flow

If the frontend uses `API_BASE_URL = "/api"`, the ALB DNS appears in API calls because the browser sends requests back to the same host it loaded the page from.

```mermaid
sequenceDiagram
   participant U as User Browser
   participant ALB as ALB DNS
   participant FE as Nginx Frontend (private)
   participant BE as FastAPI Backend :8000 (private)
   participant DB as RDS MySQL (VPC-B private)

   U->>ALB: GET /
   ALB->>FE: Forward to frontend target
   FE-->>U: index.html + JS/CSS

   U->>ALB: POST /api/signup
   ALB->>FE: Forward to frontend target
   FE->>BE: Proxy /api/signup -> /signup
   BE->>DB: INSERT user (MySQL 3306)
   DB-->>BE: OK
   BE-->>U: 200/400 JSON
```

### Routing choices

**Option A (common):** ALB forwards to frontend (nginx), nginx proxies `/api/*` to backend

- Pros: simple; backend can keep routes as `/signup` and `/login`
- Requirement: nginx config must include a `/api` proxy to the backend upstream

**Option B:** ALB path-based routing

- Listener rules route:
   - `/` and static assets → frontend target group
   - `/api/*` → backend target group
- If you choose this, ensure the backend’s routes match what ALB forwards (for example mount backend under `/api`, or proxy/rewrite paths).

### Cross-VPC connectivity (VPC-A ↔ VPC-B)

To connect to a private RDS in another VPC, you need private network connectivity:

- Use **VPC Peering** (simple) or **Transit Gateway** (scales to many VPCs).
- Add **route table entries** in both VPCs:
   - VPC-A private subnets route table: destination = VPC-B CIDR → target = peering connection / TGW
   - VPC-B DB subnets route table: destination = VPC-A CIDR → target = peering connection / TGW
- Enable DNS resolution across VPCs:
   - For VPC peering, ensure **DNS resolution** is enabled on the peering connection so the RDS endpoint name resolves from VPC-A.

### Security groups (minimum rules)

1) Backend security group (VPC-A)

- Inbound: allow `8000` from frontend/nginx security group (or from ALB security group if ALB routes directly to backend)
- Outbound: allow `3306` to the RDS security group

2) RDS security group (VPC-B)

- Inbound: allow `3306` from the backend security group (preferred) or from VPC-A CIDR

### Subnets and egress

- ALB must be in **public subnets** (internet-facing)
- Frontend + backend should be in **private subnets**
- RDS should be in **private subnets**

If instances in private subnets need outbound internet (package installs, pulling images), add a **NAT Gateway** or use **VPC endpoints** (for ECR/S3/CloudWatch).

### App configuration (what to set)

Backend container needs the RDS endpoint in `DATABASE_URL`:

```bash
export DATABASE_URL='mysql+mysqlconnector://<user>:<pass>@<rds-endpoint>:3306/<db_name>'
```

Frontend container:

- Keep `VITE_API_URL` unset in production so it uses `/api`.
- Ensure nginx (or ALB rules) forwards `/api/*` to the backend.

### Common failure modes

- Browser tries `http://<alb-dns>:8000/signup` and shows `Network Error`:
   - Cause: production build set `VITE_API_URL` to `:8000`.
   - Fix: rebuild frontend without `VITE_API_URL` (use `/api`) and proxy `/api` to backend.
- Backend can’t reach RDS:
   - Check peering/TGW routes in both directions
   - Check RDS SG inbound `3306`
   - Check backend SG outbound
   - Confirm RDS is private (not publicly accessible)

## Project Structure

```
Live_Project_react_backendwith_python/
├── Live-project-backend_pyhton_docker/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── auth.py
│   ├── requirements.txt
│   └── Dockerfile
├── Live-project-forntend_Docker/
│   ├── src/
│   │   ├── components/
│   │   └── App.tsx
│   ├── package.json
│   └── Dockerfile
└── README.md
```

---

## Contributors

- [@paras-31](https://github.com/paras-31)

---

## License

MIT (or specify your license)
