import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Checkout from './pages/Checkout';
import BookingSuccess from './pages/BookingSuccess';
import UserDashboard from './pages/UserDashboard';
import Profile from './pages/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageEvents from './pages/admin/ManageEvents';
import CreateEvent from './pages/admin/CreateEvent';
import EditEvent from './pages/admin/EditEvent';
import ManageBookings from './pages/admin/ManageBookings';

function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetails />} />

                    {/* Protected Routes */}
                    <Route path="/checkout" element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    } />
                    <Route path="/booking-success" element={
                        <ProtectedRoute>
                            <BookingSuccess />
                        </ProtectedRoute>
                    } />
                    <Route path="/my-bookings" element={
                        <ProtectedRoute>
                            <UserDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />

                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    } />
                    <Route path="/admin/events" element={
                        <AdminRoute>
                            <ManageEvents />
                        </AdminRoute>
                    } />
                    <Route path="/admin/events/create" element={
                        <AdminRoute>
                            <CreateEvent />
                        </AdminRoute>
                    } />
                    <Route path="/admin/events/edit/:id" element={
                        <AdminRoute>
                            <EditEvent />
                        </AdminRoute>
                    } />
                    <Route path="/admin/bookings" element={
                        <AdminRoute>
                            <ManageBookings />
                        </AdminRoute>
                    } />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
