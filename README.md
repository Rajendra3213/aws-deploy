# Professional Appointment Booking System

**A complete, production-ready appointment booking solution perfect for businesses, consultants, and service providers.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)](https://postgresql.org/)

## Live Demo
- **Booking Page**: [Your Domain](https://yourdomain.com)
- **Admin Login**: [Your Domain/admin/login](https://yourdomain.com/admin/login)
- **Default Admin**: username: `admin`, password: `admin123`

## Login Information

### For Customers
- **No login required** - Direct booking access
- Visit main page and book appointments instantly

### For Business Owners
- **Admin Login**: `/admin/login`
- **Username**: `admin`
- **Password**: `admin123`
- **WARNING: Change credentials in production!**

## Key Features

### Customer Features
- **Smart Booking**: Intuitive date/time selection with availability checking
- **Mobile-First**: Optimized for Instagram bio links and mobile users
- **Form Validation**: Real-time email, phone, and input validation
- **Instant Confirmation**: Immediate booking confirmation with details
- **Professional Design**: Modern UI that builds trust and credibility

### Admin Features
- **Secure Dashboard**: Password-protected admin panel
- **Appointment Management**: View, confirm, cancel, and delete bookings
- **Real-time Updates**: Live status changes and notifications
- **Client Information**: Complete contact details and service history
- **Status Tracking**: Visual indicators for appointment states

### Technical Features
- **Production Ready**: Fully configured for deployment
- **Database Persistence**: PostgreSQL for reliable data storage
- **RESTful API**: FastAPI backend with automatic documentation
- **Docker Support**: Containerized deployment option
- **Systemd Integration**: Linux service management
- **Security**: Input validation, SQL injection protection

## AWS EC2 Deployment Guide

### Prerequisites
- AWS EC2 instance (Ubuntu 20.04 LTS or later)
- Security Group allowing ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 3000 (Frontend), 8001 (Backend)
- Domain name (optional)

### Step 1: Launch EC2 Instance

1. **Launch EC2 Instance**:
   - AMI: Ubuntu Server 20.04 LTS
   - Instance Type: t3.medium (minimum)
   - Storage: 20GB GP3
   - Security Group: Allow SSH (22), HTTP (80), HTTPS (443), Custom TCP (3000, 8001)

2. **Connect to Instance**:
```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### Step 2: System Setup

1. **Update System**:
```bash
sudo apt update && sudo apt upgrade -y
```

2. **Install Required Software**:
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3.9+
sudo apt install -y python3 python3-pip python3-venv

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx (optional, for reverse proxy)
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

### Step 3: Clone and Setup Project

1. **Clone Repository**:
```bash
cd /home/ubuntu
git clone <your-repo-url> appointment-booking
cd appointment-booking
```

2. **Setup PostgreSQL Database**:
```bash
# Run the database setup script
chmod +x db.sh
./db.sh
```

### Step 4: Backend Setup

1. **Navigate to Backend Directory**:
```bash
cd /home/ubuntu/appointment-booking/backend
```

2. **Create Python Virtual Environment**:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. **Install Dependencies**:
```bash
pip install -r requirements.txt
```

4. **Configure Environment**:
```bash
cp .env-example .env
nano .env
```

Update `.env` with your settings:
```env
DATABASE_URL=postgresql://appuser:password@localhost:5432/appointments
SECRET_KEY=your-super-secret-key-change-this-in-production
```

5. **Test Backend**:
```bash
python run.py
```

### Step 5: Frontend Setup

1. **Navigate to Frontend Directory**:
```bash
cd /home/ubuntu/appointment-booking/frontend
```

2. **Install Dependencies**:
```bash
npm install
```

3. **Configure Environment**:
```bash
cp .env.local.example .env.local
nano .env.local
```

Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://your-ec2-public-ip:8001
```

4. **Build Frontend**:
```bash
npm run build
```

5. **Test Frontend**:
```bash
npm start
```

### Step 6: Create Systemd Services

#### Backend Service

1. **Create Backend Service File**:
```bash
sudo nano /etc/systemd/system/appointment-backend.service
```

2. **Add Backend Service Configuration**:
```ini
[Unit]
Description=Appointment Booking Backend API
After=network.target postgresql.service
Requires=postgresql.service

[Service]
Type=simple
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/appointment-booking/backend
Environment=PATH=/home/ubuntu/appointment-booking/backend/venv/bin
ExecStart=/home/ubuntu/appointment-booking/backend/venv/bin/python run.py
Restart=always
RestartSec=10

# Environment variables
Environment=DATABASE_URL=postgresql://appuser:password@localhost:5432/appointments
Environment=SECRET_KEY=your-super-secret-key-change-this-in-production

# Security settings
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ProtectHome=yes
ReadWritePaths=/home/ubuntu/appointment-booking/backend

[Install]
WantedBy=multi-user.target
```

#### Frontend Service

1. **Create Frontend Service File**:
```bash
sudo nano /etc/systemd/system/appointment-frontend.service
```

2. **Add Frontend Service Configuration**:
```ini
[Unit]
Description=Appointment Booking Frontend
After=network.target appointment-backend.service
Requires=appointment-backend.service

[Service]
Type=simple
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/appointment-booking/frontend
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

# Environment variables
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=NEXT_PUBLIC_API_URL=http://localhost:8001

# Security settings
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ProtectHome=yes
ReadWritePaths=/home/ubuntu/appointment-booking/frontend

[Install]
WantedBy=multi-user.target
```

### Step 7: Enable and Start Services

1. **Reload Systemd and Enable Services**:
```bash
sudo systemctl daemon-reload
sudo systemctl enable appointment-backend
sudo systemctl enable appointment-frontend
```

2. **Start Services**:
```bash
sudo systemctl start appointment-backend
sudo systemctl start appointment-frontend
```

3. **Check Service Status**:
```bash
sudo systemctl status appointment-backend
sudo systemctl status appointment-frontend
```

4. **View Logs** (if needed):
```bash
sudo journalctl -u appointment-backend -f
sudo journalctl -u appointment-frontend -f
```

### Step 8: Configure Nginx (Optional)

1. **Create Nginx Configuration**:
```bash
sudo nano /etc/nginx/sites-available/appointment-booking
```

2. **Add Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Enable Site and Restart Nginx**:
```bash
sudo ln -s /etc/nginx/sites-available/appointment-booking /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 9: SSL Certificate (Optional)

1. **Install Certbot**:
```bash
sudo apt install -y certbot python3-certbot-nginx
```

2. **Obtain SSL Certificate**:
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Step 10: Firewall Configuration

1. **Configure UFW**:
```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 3000
sudo ufw allow 8001
sudo ufw --force enable
```

### Step 11: Monitoring and Maintenance

1. **Service Management Commands**:
```bash
# Restart services
sudo systemctl restart appointment-backend
sudo systemctl restart appointment-frontend

# Stop services
sudo systemctl stop appointment-backend
sudo systemctl stop appointment-frontend

# View logs
sudo journalctl -u appointment-backend --since "1 hour ago"
sudo journalctl -u appointment-frontend --since "1 hour ago"

# Check service status
sudo systemctl status appointment-backend appointment-frontend
```

2. **Database Backup Script**:
```bash
#!/bin/bash
# Create backup script
sudo nano /home/ubuntu/backup-db.sh
```

Add to backup script:
```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +"%Y%m%d_%H%M%S")
mkdir -p $BACKUP_DIR

pg_dump -U appuser -h localhost appointments > $BACKUP_DIR/appointments_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "appointments_*.sql" -mtime +7 -delete
```

Make executable and add to crontab:
```bash
chmod +x /home/ubuntu/backup-db.sh
crontab -e
# Add: 0 2 * * * /home/ubuntu/backup-db.sh
```

### Access Your Application

- **Frontend**: `http://your-ec2-public-ip:3000`
- **Backend API**: `http://your-ec2-public-ip:8001`
- **Admin Panel**: `http://your-ec2-public-ip:3000/admin/login`

### Troubleshooting

1. **Check if services are running**:
```bash
sudo systemctl status appointment-backend appointment-frontend
```

2. **Check logs for errors**:
```bash
sudo journalctl -u appointment-backend -n 50
sudo journalctl -u appointment-frontend -n 50
```

3. **Test database connection**:
```bash
psql -U appuser -d appointments -h localhost
```

4. **Check port availability**:
```bash
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :8001
```

## Local Development Setup

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Install PostgreSQL and create database:
```bash
./db.sh
```

2. Setup backend:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env-example .env
# Update .env with your database credentials
python run.py
```

3. Backend API runs on [http://localhost:8001](http://localhost:8001)

### Alternative Deployment Options

#### Docker Deployment
```bash
docker-compose up -d
```

#### Vercel (Frontend Only)
```bash
npm i -g vercel
cd frontend
vercel
```

## Customization Guide

### Branding
```javascript
// tailwind.config.js - Update brand colors
colors: {
  primary: '#8B5CF6',    // Your brand primary
  secondary: '#06B6D4',  // Your brand secondary
}
```

### Services Configuration
```javascript
// app/page.tsx - Update service offerings
const services = [
  'Consultation',
  'Business Meeting', 
  'Personal Session',
  'Follow-up'
]
```

### Time Slots
```javascript
// app/page.tsx - Customize available times
const timeSlots = [
  '09:00', '10:00', '11:00', 
  '14:00', '15:00', '16:00', '17:00'
]
```

### Contact Information
```javascript
// Update in app/page.tsx
<p>Need help? Contact us at your@email.com</p>
```

## Perfect for Business

### Target Users
- **Consultants & Coaches**: Personal sessions and consultations
- **Beauty & Wellness**: Salons, spas, massage therapists
- **Healthcare**: Doctors, dentists, therapists
- **Professional Services**: Lawyers, accountants, real estate
- **Fitness**: Personal trainers, yoga instructors
- **Creative Services**: Photographers, designers

### Instagram Bio Optimization
- Lightning-fast mobile loading
- One-click booking process
- Professional brand appearance
- Direct link sharing capability
- Mobile-first responsive design

## Commercial License

**This software is available for commercial use under the MIT License.**

- Use for client projects
- Sell as a service
- White-label solutions
- Modify and redistribute
- No attribution required

## Security Features

- **Admin Authentication**: Secure login system
- **Input Validation**: Server-side data validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Secure credential management

## Performance

- **Next.js Optimization**: Automatic code splitting and optimization
- **Database Indexing**: Optimized PostgreSQL queries
- **Caching**: Built-in Next.js caching mechanisms
- **CDN Ready**: Static asset optimization
- **Mobile Performance**: <3s load time on mobile networks


## Backend Setup
```
python3 -m venv env
pip install -r requirements.txt
python run.py
```


