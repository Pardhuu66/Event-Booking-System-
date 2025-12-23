import paypal from '@paypal/checkout-server-sdk';

// Configure PayPal environment
function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('PayPal credentials not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_SECRET in .env file');
    }

    // Use sandbox environment for testing
    if (process.env.PAYPAL_MODE === 'sandbox') {
        return new paypal.core.SandboxEnvironment(clientId, clientSecret);
    }

    // Use live environment for production
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
}

// Create PayPal client
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

export default client;
