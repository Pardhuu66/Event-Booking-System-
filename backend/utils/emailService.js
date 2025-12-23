import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
    // Check if email credentials are provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.log('Email service not configured. Skipping email sending.');
        return null;
    }

    return nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

// Send booking confirmation email
export const sendBookingConfirmation = async (booking, event, user) => {
    try {
        const transporter = createTransporter();

        if (!transporter) {
            console.log('Email not sent - transporter not configured');
            return;
        }

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: booking.attendeeEmail,
            subject: `Booking Confirmation - ${event.title}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Booking Confirmed!</h2>
          <p>Dear ${booking.attendeeName},</p>
          <p>Your booking for <strong>${event.title}</strong> has been confirmed.</p>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Booking Details:</h3>
            <p><strong>Event:</strong> ${event.title}</p>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Venue:</strong> ${event.venue}, ${event.city}</p>
            <p><strong>Number of Tickets:</strong> ${booking.numberOfTickets}</p>
            <p><strong>Total Amount:</strong> ₹${booking.totalPrice}</p>
            <p><strong>Booking ID:</strong> ${booking._id}</p>
          </div>
          
          <p>Please show the QR code at the venue for entry.</p>
          
          <p>Looking forward to seeing you at the event!</p>
          
          <p style="color: #6B7280; font-size: 12px; margin-top: 30px;">
            This is an automated email. Please do not reply.
          </p>
        </div>
      `
        };

        await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
    }
};

// Send event reminder email
export const sendEventReminder = async (booking, event) => {
    try {
        const transporter = createTransporter();

        if (!transporter) {
            console.log('Email not sent - transporter not configured');
            return;
        }

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: booking.attendeeEmail,
            subject: `Reminder: ${event.title} Tomorrow!`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Event Reminder</h2>
          <p>Dear ${booking.attendeeName},</p>
          <p>This is a friendly reminder that you have an upcoming event tomorrow!</p>
          
          <div style="background-color: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Event Details:</h3>
            <p><strong>Event:</strong> ${event.title}</p>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Venue:</strong> ${event.venue}, ${event.city}</p>
            <p><strong>Tickets:</strong> ${booking.numberOfTickets}</p>
          </div>
          
          <p><strong>Important:</strong> Please arrive 30 minutes before the event starts.</p>
          <p>Don't forget to bring your QR code for entry!</p>
          
          <p>See you tomorrow!</p>
          
          <p style="color: #6B7280; font-size: 12px; margin-top: 30px;">
            This is an automated email. Please do not reply.
          </p>
        </div>
      `
        };

        await transporter.sendMail(mailOptions);
        console.log('Event reminder email sent successfully');
    } catch (error) {
        console.error('Error sending event reminder email:', error);
    }
};

// Send cancellation confirmation email
export const sendCancellationConfirmation = async (booking, event) => {
    try {
        const transporter = createTransporter();

        if (!transporter) {
            console.log('Email not sent - transporter not configured');
            return;
        }

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: booking.attendeeEmail,
            subject: `Booking Cancelled - ${event.title}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DC2626;">Booking Cancelled</h2>
          <p>Dear ${booking.attendeeName},</p>
          <p>Your booking for <strong>${event.title}</strong> has been cancelled as per your request.</p>
          
          <div style="background-color: #FEE2E2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Cancelled Booking Details:</h3>
            <p><strong>Event:</strong> ${event.title}</p>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Tickets:</strong> ${booking.numberOfTickets}</p>
            <p><strong>Booking ID:</strong> ${booking._id}</p>
          </div>
          
          <p>Your refund will be processed within 5-7 business days.</p>
          
          <p>We hope to see you at another event soon!</p>
          
          <p style="color: #6B7280; font-size: 12px; margin-top: 30px;">
            This is an automated email. Please do not reply.
          </p>
        </div>
      `
        };

        await transporter.sendMail(mailOptions);
        console.log('Cancellation confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending cancellation email:', error);
    }
};
