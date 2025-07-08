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

- The frontend makes API requests to the backend on `http://localhost:8000/` (configurable).
- CORS is enabled in the backend to allow requests from React dev servers (ports 5173 and 3000).
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
