#!/usr/bin/env python3
"""
Initialize database with all tables
"""
from database import engine
from models import Base

def init_database():
    """Create all tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database initialized successfully!")

if __name__ == "__main__":
    init_database()