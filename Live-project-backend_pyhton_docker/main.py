import os

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
from models import User
from schemas import UserCreate, UserLogin
from auth import hash_password, verify_password

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS: allow frontend from env (e.g. private EC2) or fallback to localhost for local dev
# Set CORS_ORIGINS to comma-separated URLs, e.g. "http://10.0.0.5:80,http://10.0.0.5"
_default_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
_cors_env = os.getenv("CORS_ORIGINS", "").strip()
origins = [o.strip() for o in _cors_env.split(",") if o.strip()] or _default_origins

# If CORS_ORIGINS isn't provided, still allow common AWS ALB hostnames so
# deployed frontends can call the backend on :8000 without manual env wiring.
allow_origin_regex = None
if not _cors_env:
    allow_origin_regex = r"^https?://.*\\.amazonaws\\.com(?::\\d+)?$"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],             # Allow all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],             # Allow all headers
    allow_origin_regex=allow_origin_regex,
)

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed_pw = hash_password(user.password)
    new_user = User(username=user.username, email=user.email, password=hashed_pw)
    db.add(new_user)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        # Covers race conditions / DB-level unique constraints.
        raise HTTPException(status_code=400, detail="User already exists")

    db.refresh(new_user)
    return {"message": "User created successfully"}

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful"}
