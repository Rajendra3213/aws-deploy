# 🗓️ Professional Appointment Booking System

**A complete, production-ready appointment booking solution perfect for businesses, consultants, and service providers.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)](https://postgresql.org/)

## 🚀 Live Demo
- **Booking Page**: [Your Domain](https://yourdomain.com)
- **Admin Login**: [Your Domain/admin/login](https://yourdomain.com/admin/login)
- **Default Admin**: username: `admin`, password: `admin123`

## 🔐 Login Information

### For Customers
- **No login required** - Direct booking access
- Visit main page and book appointments instantly

### For Business Owners
- **Admin Login**: `/admin/login`
- **Username**: `admin`
- **Password**: `admin123`
- **⚠️ Change credentials in production!**

## ✨ Key Features

### 🎯 Customer Features
- **Smart Booking**: Intuitive date/time selection with availability checking
- **Mobile-First**: Optimized for Instagram bio links and mobile users
- **Form Validation**: Real-time email, phone, and input validation
- **Instant Confirmation**: Immediate booking confirmation with details
- **Professional Design**: Modern UI that builds trust and credibility

### 👨‍💼 Admin Features
- **Secure Dashboard**: Password-protected admin panel
- **Appointment Management**: View, confirm, cancel, and delete bookings
- **Real-time Updates**: Live status changes and notifications
- **Client Information**: Complete contact details and service history
- **Status Tracking**: Visual indicators for appointment states

### 🛠️ Technical Features
- **Production Ready**: Fully configured for deployment
- **Database Persistence**: PostgreSQL for reliable data storage
- **RESTful API**: FastAPI backend with automatic documentation
- **Docker Support**: Containerized deployment option
- **Systemd Integration**: Linux service management
- **Security**: Input validation, SQL injection protection

## Getting Started

### Frontend Setup

1. Install dependencies:
```bash
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
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb appointments
```

2. Update database credentials in `backend/.env`

3. Run database migration (for existing databases):
```bash
cd backend
python migrate.py
```

4. Start the backend:
```bash
cd backend
./start.sh
```

5. Backend API runs on [http://localhost:8000](http://localhost:8000)

## Production Build

1. Build for production:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

3. Production server runs on [http://localhost:3000](http://localhost:3000)

## Deployment

### Linux Server with Systemd

1. Build and prepare:
```bash
npm run build
npm start
```

2. Create systemd service file:
```bash
sudo nano /etc/systemd/system/appointment-booking.service
```

3. Add service configuration:
```ini
[Unit]
Description=Appointment Booking App
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/path/to/your/app
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

4. Enable and start service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable appointment-booking
sudo systemctl start appointment-booking
sudo systemctl status appointment-booking
```

### Other Platforms

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Docker
```bash
docker build -t appointment-booking .
docker run -p 3000:3000 appointment-booking
```

## 🎨 Customization Guide

### 🎨 Branding
```javascript
// tailwind.config.js - Update brand colors
colors: {
  primary: '#8B5CF6',    // Your brand primary
  secondary: '#06B6D4',  // Your brand secondary
}
```

### 💼 Services Configuration
```javascript
// app/page.tsx - Update service offerings
const services = [
  'Consultation',
  'Business Meeting', 
  'Personal Session',
  'Follow-up'
]
```

### ⏰ Time Slots
```javascript
// app/page.tsx - Customize available times
const timeSlots = [
  '09:00', '10:00', '11:00', 
  '14:00', '15:00', '16:00', '17:00'
]
```

### 📞 Contact Information
```javascript
// Update in app/page.tsx
<p>Need help? Contact us at your@email.com</p>
```

## 💰 Perfect for Business

### 🎯 Target Users
- **Consultants & Coaches**: Personal sessions and consultations
- **Beauty & Wellness**: Salons, spas, massage therapists
- **Healthcare**: Doctors, dentists, therapists
- **Professional Services**: Lawyers, accountants, real estate
- **Fitness**: Personal trainers, yoga instructors
- **Creative Services**: Photographers, designers

### 📱 Instagram Bio Optimization
- Lightning-fast mobile loading
- One-click booking process
- Professional brand appearance
- Direct link sharing capability
- Mobile-first responsive design

## 💵 Commercial License

**This software is available for commercial use under the MIT License.**

- ✅ Use for client projects
- ✅ Sell as a service
- ✅ White-label solutions
- ✅ Modify and redistribute
- ✅ No attribution required

## 🔒 Security Features

- **Admin Authentication**: Secure login system
- **Input Validation**: Server-side data validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Secure credential management

## 📊 Performance

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


