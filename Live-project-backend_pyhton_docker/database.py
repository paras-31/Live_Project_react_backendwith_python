import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Use DATABASE_URL env var on EC2/RDS (e.g. docker run -e DATABASE_URL=...); fallback for local/dev
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+mysqlconnector://admin:Admin12345@database.ci9c2cyqq75l.us-east-1.rds.amazonaws.com:3306/database",
)


engine = create_engine(DATABASE_URL)
SessionLocal  = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()