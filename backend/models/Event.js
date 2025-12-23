import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide an event title'],
        trim: true,
        maxLength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        maxLength: [2000, 'Description cannot be more than 2000 characters']
    },
    category: {
        type: String,
        required: [true, 'Please specify event category'],
        enum: ['concert', 'conference', 'sports', 'theater', 'workshop', 'festival', 'tech-meetup', 'cultural', 'other']
    },
    venue: {
        type: String,
        required: [true, 'Please provide venue information']
    },
    city: {
        type: String,
        required: [true, 'Please provide city']
    },
    date: {
        type: Date,
        required: [true, 'Please provide event date']
    },
    time: {
        type: String,
        required: [true, 'Please provide event time']
    },
    price: {
        type: Number,
        required: [true, 'Please provide ticket price'],
        min: [0, 'Price cannot be negative']
    },
    totalSeats: {
        type: Number,
        required: [true, 'Please provide total seats'],
        min: [1, 'Must have at least 1 seat']
    },
    availableSeats: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/800x400?text=Event+Image'
    },
    organizer: {
        type: String,
        default: 'Event Booking System'
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    featured: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String
    }]
}, {
    timestamps: true
});

// Set available seats to total seats before saving if not set
eventSchema.pre('save', function (next) {
    if (this.isNew && !this.availableSeats) {
        this.availableSeats = this.totalSeats;
    }
    next();
});

// Virtual for checking if event is sold out
eventSchema.virtual('isSoldOut').get(function () {
    return this.availableSeats === 0;
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
