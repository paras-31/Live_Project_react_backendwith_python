from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


DATABASE_URL = "mysql+mysqlconnector://admin:Admin12345@database-1.cdmua2gu2dpq.ap-south-1.rds.amazonaws.com:3306/database1"


engine = create_engine(DATABASE_URL)
SessionLocal  = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()