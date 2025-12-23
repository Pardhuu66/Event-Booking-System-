import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PayPalCheckout.css';

const PayPalCheckout = ({ bookingData, onSuccess, onError }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const [processing, setProcessing] = useState(false);

    const createOrder = async () => {
        try {
            setProcessing(true);
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:5000/api/payments/create-order',
                bookingData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                return response.data.orderId;
            } else {
                throw new Error(response.data.message || 'Failed to create order');
            }
        } catch (error) {
            console.error('Create order error:', error);
            toast.error(error.response?.data?.message || 'Failed to create PayPal order');
            throw error;
        } finally {
            setProcessing(false);
        }
    };

    const onApprove = async (data) => {
        try {
            setProcessing(true);
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:5000/api/payments/capture-order',
                {
                    orderId: data.orderID,
                    bookingId: bookingData.bookingId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                toast.success('Payment successful! Booking confirmed.');
                if (onSuccess) {
                    onSuccess(response.data.booking);
                }
            } else {
                throw new Error(response.data.message || 'Payment capture failed');
            }
        } catch (error) {
            console.error('Capture order error:', error);
            toast.error(error.response?.data?.message || 'Payment failed');
            if (onError) {
                onError(error);
            }
        } finally {
            setProcessing(false);
        }
    };

    const onErrorHandler = (err) => {
        console.error('PayPal error:', err);
        toast.error('An error occurred with PayPal. Please try again.');
        if (onError) {
            onError(err);
        }
    };

    const onCancel = () => {
        toast.info('Payment cancelled');
        setProcessing(false);
    };

    if (isPending) {
        return (
            <div className="paypal-loading">
                <div className="spinner"></div>
                <p>Loading PayPal...</p>
            </div>
        );
    }

    return (
        <div className="paypal-checkout-wrapper">
            {processing && (
                <div className="payment-processing-overlay">
                    <div className="spinner"></div>
                    <p>Processing payment...</p>
                </div>
            )}
            <PayPalButtons
                style={{
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal'
                }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onErrorHandler}
                onCancel={onCancel}
                disabled={processing}
            />
        </div>
    );
};

export default PayPalCheckout;
