# PayPal Sandbox Setup Guide

## Complete Guide to Setting Up PayPal Sandbox for Event Booking System

---

## Table of Contents
1. [Creating PayPal Developer Account](#1-creating-paypal-developer-account)
2. [Setting Up Sandbox App](#2-setting-up-sandbox-app)
3. [Creating Test Accounts](#3-creating-test-accounts)
4. [Configuring Environment Variables](#4-configuring-environment-variables)
5. [Testing Payments](#5-testing-payments)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Creating PayPal Developer Account

### Step 1.1: Register for PayPal Developer
1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Click **"Log In"** (top right)
3. Use your existing PayPal account or create a new one
4. Complete the developer registration

> **Note:** You need a regular PayPal account first. If you don't have one, create it at [paypal.com](https://www.paypal.com)

---

## 2. Setting Up Sandbox App

### Step 2.1: Create a New App
1. Log in to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Navigate to **"Apps & Credentials"** (in the top menu)
3. Make sure you're in the **"Sandbox"** tab (toggle at the top)
4. Click **"Create App"** button

### Step 2.2: Configure App Settings
1. **App Name:** Enter a name (e.g., "Event Booking System")
2. **Sandbox Business Account:** Select a sandbox business account (or create one)
3. Click **"Create App"**

### Step 2.3: Get Your Credentials
After creating the app, you'll see:
- **Client ID** (starts with `A...`)
- **Secret** (click "Show" to reveal, starts with `E...`)

**Copy these values - you'll need them later!**

```
Example Format:
Client ID: AeXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Secret:    EXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXyy
```

---

## 3. Creating Test Accounts

PayPal Sandbox uses fake test accounts for testing payments.

### Step 3.1: View Sandbox Accounts
1. In PayPal Developer Dashboard, go to **"Testing Tools"** → **"Sandbox Accounts"**
2. You should see some default accounts already created

### Step 3.2: Understanding Account Types
- **Personal (Buyer):** Used to make test purchases
- **Business (Merchant):** Receives test payments

### Step 3.3: Create Additional Test Accounts (Optional)
1. Click **"Create Account"**
2. Select account type (Personal or Business)
3. Choose country (e.g., United States)
4. Fill in details
5. Click **"Create"**

### Step 3.4: Get Test Account Credentials
1. Find a **Personal** account in the list
2. Click the **"..."** (three dots) on the right
3. Select **"View/Edit Account"**
4. Note the **Email** and **Password** - you'll use these to login during testing

```
Example Test Account:
Email:    sb-buyer123@personal.example.com
Password: test12345
```

---

## 4. Configuring Environment Variables

### Step 4.1: Backend Configuration

Create or update `backend/.env` file:

```bash
# PayPal Configuration
PAYPAL_CLIENT_ID=your_client_id_from_step_2.3
PAYPAL_SECRET=your_secret_from_step_2.3
PAYPAL_MODE=sandbox

# Other existing variables...
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Step 4.2: Frontend Configuration

Create or update `frontend/.env` file:

```bash
# PayPal Configuration
VITE_PAYPAL_CLIENT_ID=your_client_id_from_step_2.3

# API Base URL
VITE_API_URL=http://localhost:5000/api
```

> **Important:** Use the SAME Client ID in both backend and frontend!

---

## 5. Testing Payments

### Step 5.1: Start the Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 5.2: Make a Test Booking
1. Open browser to `http://localhost:5173`
2. Register/Login to the application
3. Browse events and select one
4. Choose number of tickets
5. Click "Book Now"
6. Fill in attendee information
7. Click "Continue to Payment"

### Step 5.3: Complete PayPal Payment
1. PayPal buttons will appear
2. Click **"PayPal"** button
3. A PayPal login window will open
4. **Login with your Sandbox Personal Account:**
   - Email: (from Step 3.4)
   - Password: (from Step 3.4)
5. Review the payment details
6. Click **"Pay Now"**
7. You'll be redirected back to the app
8. See your booking confirmation!

### Step 5.4: Verify Payment
- Check the booking appears in "My Bookings"
- QR code should be generated
- Payment status should be "completed"

---

## 6. Troubleshooting

### Issue: "PayPal credentials not configured"
**Solution:** 
- Check your `.env` files are in the correct locations
- Verify `PAYPAL_CLIENT_ID` and `PAYPAL_SECRET` are set
- Restart both servers after changing .env files

### Issue: PayPal button not appearing
**Solution:**
- Check browser console for errors
- Verify `VITE_PAYPAL_CLIENT_ID` in frontend/.env
- Make sure Client ID doesn't have extra spaces
- Try clearing browser cache

### Issue: "Payment failed"
**Solution:**
- Ensure you're using a Sandbox PERSONAL account to pay
- Check the account has sufficient test funds
- Verify PAYPAL_MODE=sandbox in backend/.env
- Check backend logs for error messages

### Issue: "Invalid client credentials"
**Solution:**
- Double-check Client ID and Secret are correct
- Make sure you copied the ENTIRE ID/Secret (they're long!)
- Ensure you're using SANDBOX credentials, not live ones
- Try regenerating credentials in PayPal Developer Dashboard

### Issue: Currency not supported
**Solution:**
- The current implementation uses USD for PayPal sandbox
- If you need to change currency, update the payment controller
- Ensure PayPal supports your chosen currency

---

## Testing Checklist

✅ **Before Going Live:**
- [ ] PayPal Sandbox App created
- [ ] Client ID and Secret obtained
- [ ] Environment variables configured (backend & frontend)
- [ ] Test account created
- [ ] Successfully completed a test payment
- [ ] Booking appears in user dashboard
- [ ] QR code generated correctly
- [ ] Admin can view the booking
- [ ] Tested on mobile and desktop
- [ ] Error handling works (cancelled payments, insufficient funds, etc.)

---

## PayPal Sandbox URLs

- **Developer Dashboard:** https://developer.paypal.com/dashboard/
- **Sandbox Accounts:** https://developer.paypal.com/dashboard/accounts
- **Apps & Credentials:** https://developer.paypal.com/dashboard/applications

---

## Going to Production

> **Warning:** Never use sandbox credentials in production!

When ready to accept real payments:

1. Switch to **"Live"** tab in PayPal Developer Dashboard
2. Create a new Live app
3. Get new Live credentials
4. Update environment variables:
   ```bash
   PAYPAL_MODE=live
   PAYPAL_CLIENT_ID=<live_client_id>
   PAYPAL_SECRET=<live_secret>
   ```
5. Complete PayPal business account verification
6. Test thoroughly before launching!

---

## Additional Resources

- [PayPal Developer Docs](https://developer.paypal.com/docs/)
- [PayPal Sandbox Testing Guide](https://developer.paypal.com/docs/api-basics/sandbox/)
- [PayPal Checkout Integration](https://developer.paypal.com/docs/checkout/)

---

## Support

For PayPal-specific issues:
- [PayPal Developer Forums](https://www.paypal-community.com/t5/Integration-Tools/ct-p/integration)
- [PayPal Support](https://www.paypal.com/us/smarthelp/contact-us)

For application issues:
- Check backend logs
- Check browser console
- Review this documentation

---

**Happy Testing! 🎉**
