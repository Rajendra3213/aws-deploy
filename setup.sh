#!/bin/bash

set -e

echo "🚀 Setting up Appointment Booking System..."

# Update system
echo "[1/8] Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js
echo "[2/8] Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python and pip
echo "[3/8] Installing Python..."
sudo apt install -y python3 python3-pip python3-venv

# Install PostgreSQL
echo "[4/8] Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Setup database
echo "[5/8] Setting up database..."
sudo -u postgres createdb appointments || echo "Database already exists"
sudo -u postgres psql -c "CREATE USER bookinguser WITH PASSWORD 'securepassword123';" || echo "User already exists"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE appointments TO bookinguser;"

# Install frontend dependencies
echo "[6/8] Installing frontend dependencies..."
npm install

# Setup backend
echo "[7/8] Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Build frontend
echo "[8/8] Building frontend..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Start backend: cd backend && ./start.sh"
echo "3. Start frontend: npm start"
echo "4. Visit http://localhost:3000"
echo ""
echo "Admin login: username=admin, password=admin123"