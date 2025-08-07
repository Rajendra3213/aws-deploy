#!/usr/bin/env python3
"""
Database migration script for adding meeting fields
"""
import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def run_migration():
    """Run the migration to add meeting fields"""
    engine = create_engine(DATABASE_URL)
    
    try:
        with engine.connect() as conn:
            # Check if columns already exist
            result = conn.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'appointments' 
                AND column_name IN ('meeting_type', 'meet_link')
            """))
            
            existing_columns = [row[0] for row in result]
            
            if 'meeting_type' not in existing_columns:
                print("Adding meeting_type column...")
                conn.execute(text("ALTER TABLE appointments ADD COLUMN meeting_type VARCHAR DEFAULT 'in-person'"))
                conn.execute(text("UPDATE appointments SET meeting_type = 'in-person' WHERE meeting_type IS NULL"))
                conn.commit()
                print("✅ meeting_type column added")
            else:
                print("⚠️  meeting_type column already exists")
            
            if 'meet_link' not in existing_columns:
                print("Adding meet_link column...")
                conn.execute(text("ALTER TABLE appointments ADD COLUMN meet_link VARCHAR"))
                conn.commit()
                print("✅ meet_link column added")
            else:
                print("⚠️  meet_link column already exists")
                
        print("🎉 Migration completed successfully!")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_migration()