# Event Booking System 🎟️

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for booking event tickets with secure payment processing, admin management, and automated notifications.

![Tech Stack](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## 🌟 Features

### User Features
- ✅ **Browse Events**: Explore concerts, conferences, sports events, and more
- ✅ **Advanced Search & Filters**: Search by category, city, date, and keywords
- ✅ **Event Details**: View comprehensive event information with availability
- ✅ **Secure Booking**: Ticket booking with seat availability checking
- ✅ **PayPal Payment**: Integrated PayPal Sandbox payment gateway
- ✅ **Booking Management**: View, manage, and cancel bookings
- ✅ **QR Code Tickets**: Digital tickets with QR codes for entry
- ✅ **Email Notifications**: Booking confirmations and event reminders
- ✅ **Responsive Design**: Fully responsive for mobile, tablet, and desktop

### Admin Features
- ✅ **Admin Dashboard**: Overview of events, bookings, and revenue
- ✅ **Event Management**: Create, edit, and delete events
- ✅ **Pricing Control**: Manage event pricing and availability
- ✅ **Booking Overview**: View all customer bookings
- ✅ **Analytics**: Track bookings and revenue statistics

### Security & Authentication
- ✅ **JWT Authentication**: Secure user authentication with JSON Web Tokens
- ✅ **Password Hashing**: BCrypt password encryption
- ✅ **Role-Based Access**: Separate user and admin roles
- ✅ **Protected Routes**: Route guards for authenticated and admin-only pages

## 📦 Tech Stack Details

### Backend
- **Node.js**: v18.x or higher
- **Express.js**: v4.18.2 - Web application framework
- **MongoDB**: v6.x - NoSQL database
- **Mongoose**: v8.0.3 - MongoDB object modeling
- **JSON Web Token (JWT)**: v9.0.2 - Authentication
- **BCrypt.js**: v2.4.3 - Password hashing
- **PayPal SDK**: v1.0.3 - Payment processing
- **Nodemailer**: v6.9.7 - Email notifications
- **Node-Cron**: v3.0.3 - Scheduled tasks
- **QRCode**: v1.5.3 - QR code generation
- **CORS**: v2.8.5 - Cross-origin resource sharing

### Frontend
- **React**: v18.2.0 - UI library
- **Vite**: v5.0.8 - Build tool and development server
- **React Router DOM**: v6.20.1 - Routing
- **Axios**: v1.6.2 - HTTP client
- **PayPal React**: v2.4.0 - PayPal payment integration
- **React Toastify**: v9.1.3 - Toast notifications
- **React Icons**: v4.12.0 - Icon library
- **Date-fns**: v3.0.6 - Date formatting
- **React Calendar**: v4.7.0 - Calendar component

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18.x or higher)
- MongoDB (v6.x or higher) - Local installation or MongoDB Atlas account
- npm or yarn package manager
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Event Booking System"
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/event-booking-system

# Option 2: MongoDB Atlas (Recommended for deployment)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-booking-system?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# PayPal Payment (Sandbox - See PAYPAL_SETUP.md for detailed instructions)
PAYPAL_CLIENT_ID=your_paypal_client_id_from_developer_dashboard
PAYPAL_SECRET=your_paypal_secret_from_developer_dashboard
PAYPAL_MODE=sandbox

# Email Configuration (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_specific_password
EMAIL_FROM=Event Booking System <your_email@gmail.com>

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Admin Account (Initial Setup)
ADMIN_EMAIL=admin@eventbooking.com
ADMIN_PASSWORD=Admin@123
```

#### Seed Database (Optional)
Populate the database with sample data:

```bash
npm run seed
# or
node seed.js
```

This creates:
- Admin user: `admin@eventbooking.com` / `Admin@123`
- Sample user: `user@test.com` / `User@123`
- 8 sample events across different categories

#### Start Backend Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Environment Configuration (Optional)
Create a `.env` file in the `frontend` directory if you need to override the API URL:

```env
VITE_API_URL=http://localhost:5000/api
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id_from_developer_dashboard
```

> **Note:** For PayPal setup, see [PAYPAL_SETUP.md](./PAYPAL_SETUP.md) for complete instructions.

#### Start Frontend Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

#### Build for Production
```bash
npm run build
```

## 📱 Application Usage

### User Flow
1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Events**: View all upcoming events or filter by category
3. **Event Details**: Click on an event to see full details
4. **Book Tickets**: Select number of tickets and proceed to checkout
5. **Payment**: Complete payment (demo mode in development)
6. **Confirmation**: Receive booking confirmation with QR code
7. **Manage Bookings**: View and manage your bookings from dashboard

### Admin Flow
1. **Admin Login**: Login with admin credentials
2. **Dashboard**: View statistics and analytics
3. **Create Event**: Add new events with all details
4. **Manage Events**: Edit or delete existing events
5. **View Bookings**: See all customer bookings
6. **Monitor Revenue**: Track total revenue and bookings

### Demo Credentials

**Admin Account:**
- Email: `admin@eventbooking.com`
- Password: `Admin@123`

**User Account:**
- Email: `user@test.com`
- Password: `User@123`

## 🗂️ Project Structure

```
Event Booking System/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── eventController.js    # Event CRUD operations
│   │   ├── bookingController.js  # Booking management
│   │   └── paymentController.js  # Payment processing
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Event.js              # Event schema
│   │   └── Booking.js            # Booking schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── eventRoutes.js        # Event routes
│   │   ├── bookingRoutes.js      # Booking routes
│   │   └── paymentRoutes.js      # Payment routes
│   ├── utils/
│   │   ├── emailService.js       # Email utility
│   │   └── scheduler.js          # Cron jobs
│   ├── .env.example              # Environment template
│   ├── server.js                 # Express server
│   ├── seed.js                   # Database seeder
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── Footer.jsx        # Footer component
│   │   │   ├── EventCard.jsx     # Event card component
│   │   │   ├── Loader.jsx        # Loading component
│   │   │   ├── ProtectedRoute.jsx  # Auth guard
│   │   │   └── AdminRoute.jsx    # Admin guard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Auth state management
│   │   │   └── EventContext.jsx  # Event state management
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Events.jsx        # Events listing
│   │   │   ├── EventDetails.jsx  # Event details
│   │   │   ├── Checkout.jsx      # Booking checkout
│   │   │   ├── UserDashboard.jsx # User bookings
│   │   │   ├── Profile.jsx       # User profile
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ManageEvents.jsx
│   │   │       ├── CreateEvent.jsx
│   │   │       ├── EditEvent.jsx
│   │   │       └── ManageBookings.jsx
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # App entry point
│   │   └── index.css             # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔒 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `POST /api/auth/logout` - Logout (Protected)

### Events
- `GET /api/events` - Get all events (Public)
- `GET /api/events/:id` - Get single event (Public)
- `POST /api/events` - Create event (Admin)
- `PUT /api/events/:id` - Update event (Admin)
- `DELETE /api/events/:id` - Delete event (Admin)
- `GET /api/events/categories` - Get categories (Public)

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `POST /api/bookings/:id/confirm` - Confirm booking (Protected)
- `GET /api/bookings/my-bookings` - Get user bookings (Protected)
- `GET /api/bookings/:id` - Get single booking (Protected)
- `GET /api/bookings` - Get all bookings (Admin)
- `PUT /api/bookings/:id/cancel` - Cancel booking (Protected)
- `GET /api/bookings/stats` - Get statistics (Admin)

### Payments
- `POST /api/payments/create-order` - Create PayPal order (Protected)
- `POST /api/payments/capture-order` - Capture payment (Protected)
- `GET /api/payments/verify/:orderId` - Verify payment (Protected)

## 🎨 Screenshots

*(Screenshots will be added after deployment)*

### User Interface

#### Home Page
![Home Page](screenshots/home_hero.png)

#### Featured Events
![Featured Events](screenshots/featured_events.png)

#### Browse by Category
![Category Filter](screenshots/category_filter.png)

#### Discover Events
![Discover Events](screenshots/discover_events.png)

#### Event Details
![Event Details](screenshots/event_details.png)

#### Booking Checkout
![Checkout](screenshots/checkout.png)

#### Secure Payment (PayPal)
![PayPal Payment](screenshots/paypal_payment.png)

#### User Bookings
![My Bookings](screenshots/my_bookings.png)

### Admin Interface

#### Admin Dashboard
![Admin Dashboard](screenshots/admin_dashboard.png)

#### Create New Event
![Create Event](screenshots/admin_create_event.png)

#### Manage Events
![Manage Events](screenshots/admin_manage_events.png)

#### All Bookings
![All Bookings](screenshots/admin_all_bookings.png)

## 🌐 Real-World Relevance

This Event Booking System is inspired by and comparable to popular platforms:

### Eventbrite
- Similar event discovery and filtering
- Comparable booking workflow
- Event management features

### Ticketmaster
- Ticket booking functionality
- Seat availability tracking
- QR code ticket generation

### Key Differentiators
- Simplified booking process
- Modern, responsive UI
- Built with latest MERN stack
- Easy deployment and customization

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# If using MongoDB Atlas, verify connection string in .env
```

### Port Already in Use
```bash
# Find and kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Change PORT in backend/.env if needed
```

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL
- Check CORS configuration in `backend/server.js`

## 📝 Future Enhancements

- [ ] Production PayPal integration with live credentials
- [ ] Email notifications with real SMTP
- [ ] Social media authentication (Google, Facebook)
- [ ] Event recommendations based on user preferences
- [ ] Multi-currency support
- [ ] Seat map visualization
- [ ] Review and rating system
- [ ] Wishlist functionality
- [ ] Mobile app (React Native)

## 📄 License

This project is created for educational purposes as part of an assignment.

## 👨‍💻 Author

Created with ❤️ by Pardha Sai

---

**Note**: This is a demo application. For production use, ensure proper security measures, use real payment gateway configurations, and implement additional error handling.
