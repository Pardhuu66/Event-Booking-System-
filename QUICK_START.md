# Quick Start Guide - Event Booking System

## ✅ Installation Complete!

Both backend and frontend dependencies have been successfully installed.

## 🚀 How to Run the Application

### Step 1: Start MongoDB Server

Make sure MongoDB is running on your system:

**Option A: Local MongoDB**
```bash
# Windows - if MongoDB is installed as a service, it should auto-start
# Or manually start it
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Get your connection string
- Update `MONGODB_URI` in `backend/.env`

### Step 2: Seed the Database (Optional but Recommended)

This will create sample events and user accounts for testing:

```bash
cd backend
powershell -ExecutionPolicy Bypass -Command "node seed.js"
```

This creates:
- **Admin**: admin@eventbooking.com / Admin@123
- **User**: user@test.com / User@123
- **8 Sample Events** across different categories

### Step 3: Start the Backend Server

```bash
cd backend
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

Backend will run on: **http://localhost:5000**

###  Step 4: Start the Frontend (New Terminal)

```bash
cd frontend
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

Frontend will run on: **http://localhost:5173**

### Step 5: Open the Application

Open your browser and navigate to: **http://localhost:5173**

## 🎯 Testing the Application

### As a User:
1. **Register** a new account or login with:
   - Email: user@test.com
   - Password: User@123

2. **Browse Events** from the home page
3. **View Event Details** by clicking on any event
4. **Book Tickets** - select quantity and checkout
5. **View Bookings** in "My Bookings" page
6. **See QR Code** for confirmed bookings

### As an Admin:
1. **Login** with admin credentials:
   - Email: admin@eventbooking.com
   - Password: Admin@123

2. **Access Admin Dashboard** from the navbar
3. **View Statistics** - events, bookings, revenue
4. **Create New Events** with all details
5. **Manage Events** - edit or delete existing events
6. **View All Bookings** from all users

## 📱 Features to Test

### Responsive Design
- Resize your browser window
- Test on mobile (DevTools → Toggle Device Toolbar)
- Check hamburger menu on mobile

### Search & Filters
- Search events by name
- Filter by category (Concert, Conference, Sports, etc.)
- Browse featured events

### Booking Flow
1. Select event → View details → Select tickets
2. Proceed to checkout → Enter details
3. Confirm booking → View QR code
4. Cancel booking (if needed)

### Admin Features
1. Create event with image URL, date, time, price
2. Edit existing events
3. Delete events
4. View booking statistics

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB server or use MongoDB Atlas

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process or change PORT in backend/.env

### CORS Errors
**Solution**: Ensure backend is running on port 5000 and frontend on 5173

### Cannot Load npm.ps1
**Solution**: Use `powershell -ExecutionPolicy Bypass -Command "npm ..."

## 📸 Take Screenshots
Once the application is running, capture screenshots of:
1. Home page
2. Events listing page
3. Event details page
4. Login/Register pages
5. Checkout page
6. User dashboard with bookings
7. Admin dashboard
8. Create event page
9. Manage events page
10. Mobile responsive views

## 🎨 Customization

### Change Colors
Edit `frontend/src/index.css` - modify CSS custom properties:
```css
--primary-600: #4F46E5;  /* Primary color */
--secondary-600: #DB2777; /* Secondary color */
```

### Add More Events
1. Login as admin
2. Go to Admin Dashboard → Create Event
3. Fill in all details and submit

### Customize Email Templates
Edit `backend/utils/emailService.js` to modify email content

## 📝 Notes

- **Payment**: Currently in demo mode (skips actual Stripe payment)
- **Email**: Disabled by default (requires Gmail SMTP configuration)
- **QR Codes**: Generated for all confirmed bookings
- **Reminders**: Cron job runs every hour for event reminders

## 🚀 For Production Deployment

1. Set `NODE_ENV=production` in backend
2. Configure real Stripe API keys
3. Set up email SMTP credentials
4. Use MongoDB Atlas for database
5. Build frontend: `npm run build` in frontend directory
6. Deploy backend and frontend separately or together

## 💡 Tips

- Use Chrome DevTools for responsive testing
- Check browser console for any errors
- Backend logs will show in the terminal
- Toast notifications will appear for user actions

---

**Need Help?** Check the main README.md for detailed documentation!
