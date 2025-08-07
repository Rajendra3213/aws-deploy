# 🔄 Database Migration Guide

## Quick Migration (Recommended)

### For Existing Databases
```bash
cd backend
python migrate.py
```

### For New Installations
```bash
cd backend
python init_db.py
```

## Migration Details

### What's Being Added
- `meeting_type` column (VARCHAR, default: 'in-person')
- `meet_link` column (VARCHAR, nullable)

### Migration Script Features
- ✅ **Safe**: Checks if columns already exist
- ✅ **Backward Compatible**: Sets defaults for existing records
- ✅ **Rollback Safe**: Can be reversed if needed
- ✅ **Production Ready**: Handles errors gracefully

## Manual Migration (Alternative)

### SQL Commands
```sql
-- Add meeting_type column
ALTER TABLE appointments ADD COLUMN meeting_type VARCHAR DEFAULT 'in-person';

-- Add meet_link column  
ALTER TABLE appointments ADD COLUMN meet_link VARCHAR;

-- Update existing records
UPDATE appointments SET meeting_type = 'in-person' WHERE meeting_type IS NULL;
```

## Using Alembic (Advanced)

### Initialize Alembic
```bash
cd backend
alembic init alembic
```

### Generate Migration
```bash
alembic revision --autogenerate -m "Add meeting fields"
```

### Run Migration
```bash
alembic upgrade head
```

### Rollback Migration
```bash
alembic downgrade -1
```

## Verification

### Check Migration Success
```bash
cd backend
python -c "
from database import engine
from sqlalchemy import text
with engine.connect() as conn:
    result = conn.execute(text('SELECT column_name FROM information_schema.columns WHERE table_name = \\'appointments\\''))
    columns = [row[0] for row in result]
    print('Columns:', columns)
    if 'meeting_type' in columns and 'meet_link' in columns:
        print('✅ Migration successful!')
    else:
        print('❌ Migration incomplete')
"
```

## Troubleshooting

### Permission Denied
```bash
chmod +x migrate.py
chmod +x init_db.py
```

### Database Connection Error
1. Check database is running: `sudo systemctl status postgresql`
2. Verify credentials in `backend/.env`
3. Test connection: `psql -U user -d appointments -h localhost`

### Column Already Exists Error
- The migration script handles this automatically
- Safe to run multiple times

## Production Deployment

### Before Migration
1. **Backup database**: `pg_dump appointments > backup.sql`
2. **Test on staging**: Run migration on test environment first
3. **Schedule downtime**: Brief maintenance window recommended

### Run Migration
```bash
cd backend
python migrate.py
```

### Verify Success
```bash
# Check application starts
python run.py

# Test booking with meeting types
curl -X POST http://localhost:8000/appointments/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"123","service":"Test","appointment_date":"2024-01-01","appointment_time":"10:00","meeting_type":"online","meet_link":"https://meet.google.com/new"}'
```

## Rollback (If Needed)

### Remove New Columns
```sql
ALTER TABLE appointments DROP COLUMN meet_link;
ALTER TABLE appointments DROP COLUMN meeting_type;
```

### Using Alembic
```bash
alembic downgrade -1
```