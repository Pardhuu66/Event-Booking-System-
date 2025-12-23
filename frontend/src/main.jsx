import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <EventProvider>
                    <App />
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={true}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        className="custom-toast-container"
                        toastClassName="custom-toast"
                        bodyClassName="custom-toast-body"
                    />
                </EventProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
