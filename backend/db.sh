#!/bin/bash

set -e

DB_USER="appuser"
DB_PASSWORD="password"z
DB_NAME="appointments"

echo "[1/6] Updating system and installing PostgreSQL..."
sudo apt update
sudo apt install -y postgresql postgresql-contrib

echo "[2/6] Creating PostgreSQL user and database..."
sudo -u postgres psql <<EOF
DO \$\$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}'
   ) THEN
      CREATE ROLE "${DB_USER}" LOGIN PASSWORD '${DB_PASSWORD}';
   END IF;
END
\$\$;

CREATE DATABASE "${DB_NAME}" OWNER "${DB_USER}";
GRANT ALL PRIVILEGES ON DATABASE "${DB_NAME}" TO "${DB_USER}";
EOF

echo "[3/6] Configuring authentication method to md5..."
PG_HBA_FILE=$(find /etc/postgresql/ -name pg_hba.conf)

sudo sed -i 's/^local\s\+all\s\+all\s\+peer/local all all md5/' "$PG_HBA_FILE"
sudo sed -i 's/^host\s\+all\s\+all\s\+127\.0\.0\.1\/32\s\+.*$/host all all 127.0.0.1\/32 md5/' "$PG_HBA_FILE"
sudo sed -i 's/^host\s\+all\s\+all\s\+::1\/128\s\+.*$/host all all ::1\/128 md5/' "$PG_HBA_FILE"

echo "[4/6] Enabling listening on localhost..."
PG_CONF_FILE=$(find /etc/postgresql/ -name postgresql.conf)
sudo sed -i "s/^#listen_addresses = 'localhost'/listen_addresses = 'localhost'/" "$PG_CONF_FILE"

echo "[5/6] Restarting PostgreSQL..."
sudo systemctl restart postgresql

echo "[6/6] Testing connection..."
PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -d $DB_NAME -h localhost -c '\conninfo' || {
  echo "Failed to connect to PostgreSQL with provided credentials."
  exit 1
}

echo "PostgreSQL is configured and ready at: postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME"
