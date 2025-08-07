# 🔐 BookEase Pro - Login Guide

## 🎯 Quick Access

### For Customers
- **Booking Page**: Visit your main website URL
- **No login required** - customers can book appointments directly

### For Business Owners
- **Admin Login**: Visit `/admin/login` or click "Business Owner? Login Here →"
- **Default Credentials**:
  - **Username**: `admin`
  - **Password**: `admin123`

## 📱 How to Access

### 1. Customer Booking (No Login Required)
```
https://yourdomain.com
```
- Customers can book appointments instantly
- No registration needed
- Mobile-optimized for Instagram bio links

### 2. Business Owner Dashboard
```
https://yourdomain.com/admin/login
```
- Secure admin panel
- Manage all appointments
- View customer details
- Update appointment status

## 🔑 Default Admin Credentials

**⚠️ IMPORTANT: Change these in production!**

```
Username: admin
Password: admin123
```

## 🛠️ Changing Admin Credentials

### Method 1: Update in Code
Edit `app/admin/login/page.tsx`:
```javascript
if (credentials.username === 'YOUR_USERNAME' && credentials.password === 'YOUR_PASSWORD') {
```

### Method 2: Environment Variables (Recommended)
1. Create `.env.local`:
```
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

2. Update login logic to use environment variables

## 🎨 Brand Customization

### Company Name: **BookEase Pro**
- Professional appointment booking system
- Trusted by 1000+ businesses worldwide
- Perfect for service-based businesses

### Logo Colors:
- **Primary**: Purple (#8B5CF6)
- **Secondary**: Cyan (#06B6D4)
- **Gradient**: Purple to Cyan

## 📊 Admin Dashboard Features

Once logged in, you can:
- ✅ View all appointments
- ✅ Confirm/cancel bookings
- ✅ Delete appointments
- ✅ See customer contact details
- ✅ Track appointment status
- ✅ Real-time updates

## 🔒 Security Features

- **Protected Routes**: Admin pages require authentication
- **Session Management**: Automatic logout on browser close
- **Input Validation**: All forms are validated
- **SQL Injection Protection**: Database queries are secure

## 📞 Support

Need help? Contact us at:
- **Email**: support@bookeasepro.com
- **Documentation**: Check README.md for setup
- **Issues**: Report bugs in the project repository

## 🚀 Quick Start

1. **For Customers**: Just visit the main page and book
2. **For Business Owners**: 
   - Go to `/admin/login`
   - Use default credentials (admin/admin123)
   - Start managing appointments immediately

---

**Remember**: Always change default credentials in production environments!