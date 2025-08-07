# 🚀 Deployment Guide

## Quick Deploy Options

### 1. One-Click Deploy (Recommended)

#### Vercel (Frontend + Serverless)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Railway (Full Stack)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

### 2. VPS/Server Deployment

#### Prerequisites
- Ubuntu 20.04+ or similar Linux distribution
- Root or sudo access
- Domain name (optional but recommended)

#### Automated Setup Script
```bash
curl -sSL https://raw.githubusercontent.com/yourusername/appointment-booking/main/deploy.sh | bash
```

#### Manual Setup

1. **Clone and Setup**
```bash
git clone https://github.com/yourusername/appointment-booking.git
cd appointment-booking
chmod +x setup.sh
./setup.sh
```

2. **Configure Environment**
```bash
cp .env.example .env
cp backend/.env.example backend/.env
# Edit both .env files with your settings
```

3. **Start Services**
```bash
# Database
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Backend
sudo cp backend/systemd-backend.service /etc/systemd/system/
sudo systemctl enable systemd-backend
sudo systemctl start systemd-backend

# Frontend
sudo cp appointment-booking.service /etc/systemd/system/
sudo systemctl enable appointment-booking
sudo systemctl start appointment-booking
```

### 3. Docker Deployment

```bash
# Build and run
docker build -t appointment-booking .
docker run -d -p 3000:3000 --name booking-app appointment-booking

# With docker-compose
docker-compose up -d
```

### 4. Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Monitoring & Maintenance

### Health Checks
```bash
# Check services
sudo systemctl status appointment-booking
sudo systemctl status systemd-backend
sudo systemctl status postgresql

# View logs
sudo journalctl -u appointment-booking -f
sudo journalctl -u systemd-backend -f
```

### Database Backup
```bash
# Create backup
pg_dump -U user -h localhost appointments > backup_$(date +%Y%m%d).sql

# Restore backup
psql -U user -h localhost appointments < backup_20240101.sql
```

### Updates
```bash
git pull origin main
npm run build
sudo systemctl restart appointment-booking
sudo systemctl restart systemd-backend
```

## Production Checklist

- [ ] Change default admin credentials
- [ ] Configure proper database credentials
- [ ] Set up SSL certificate
- [ ] Configure firewall (ports 80, 443, 22)
- [ ] Set up automated backups
- [ ] Configure monitoring
- [ ] Test all functionality
- [ ] Set up domain DNS
- [ ] Configure email notifications (optional)