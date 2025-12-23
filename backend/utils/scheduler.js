import cron from 'node-cron';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { sendEventReminder } from './emailService.js';

// Run every hour to check for events happening in 24 hours
export const scheduleEventReminders = () => {
    // Run at the top of every hour
    cron.schedule('0 * * * *', async () => {
        try {
            console.log('Running event reminder scheduler...');

            const now = new Date();
            const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const dayAfterTomorrow = new Date(now.getTime() + 25 * 60 * 60 * 1000);

            // Find events happening in approximately 24 hours
            const upcomingEvents = await Event.find({
                date: {
                    $gte: tomorrow,
                    $lt: dayAfterTomorrow
                },
                status: 'upcoming'
            });

            if (upcomingEvents.length === 0) {
                console.log('No upcoming events in the next 24 hours');
                return;
            }

            // Find confirmed bookings for these events
            for (const event of upcomingEvents) {
                const bookings = await Booking.find({
                    event: event._id,
                    status: 'confirmed'
                });

                for (const booking of bookings) {
                    // Send reminder email
                    await sendEventReminder(booking, event);
                }

                console.log(`Sent ${bookings.length} reminder emails for event: ${event.title}`);
            }
        } catch (error) {
            console.error('Error in event reminder scheduler:', error);
        }
    });

    console.log('Event reminder scheduler initialized');
};

// Update event status based on date
export const updateEventStatus = () => {
    // Run every day at midnight
    cron.schedule('0 0 * * *', async () => {
        try {
            console.log('Running event status update scheduler...');

            const now = new Date();

            // Mark past events as completed
            await Event.updateMany(
                {
                    date: { $lt: now },
                    status: 'upcoming'
                },
                {
                    $set: { status: 'completed' }
                }
            );

            console.log('Event statuses updated successfully');
        } catch (error) {
            console.error('Error updating event statuses:', error);
        }
    });

    console.log('Event status update scheduler initialized');
};
