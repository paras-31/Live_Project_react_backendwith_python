import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

# Use DATABASE_URL env var on EC2/RDS (e.g. docker run -e DATABASE_URL=...); fallback for local/dev
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+mysqlconnector://admin:Admin12345@database.ci9c2cyqq75l.us-east-1.rds.amazonaws.com:3306/database",
)


def _ensure_database_exists(url: str) -> None:
    """Create the database if it does not exist (avoids 'Unknown database' on first run)."""
    # e.g. mysql+mysqlconnector://user:pass@host:3306/dbname -> connect without db, then CREATE DATABASE
    if "/" not in url.rstrip("/") or "mysql" not in url:
        return
    try:
        # Base URL without path (no database name)
        if url.endswith("/"):
            base_url = url.rstrip("/")
        else:
            base_url = url.rsplit("/", 1)[0]
        # Connect to server without selecting a database (use mysql system DB so connection succeeds)
        base_url_with_mysql = base_url + "/mysql" if not base_url.endswith("/mysql") else base_url
        temp_engine = create_engine(base_url_with_mysql)
        with temp_engine.connect() as conn:
            db_name = url.rstrip("/").split("/")[-1].split("?")[0]
            if not db_name or db_name == "mysql":
                return
            safe_name = db_name.replace("`", "``")
            conn.execute(text(f"CREATE DATABASE IF NOT EXISTS `{safe_name}`"))
            conn.commit()
        temp_engine.dispose()
    except Exception:
        pass  # If we can't create (e.g. no permission), let create_engine below fail with the real error


_ensure_database_exists(DATABASE_URL)
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()