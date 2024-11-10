import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        ref: 'User',  // This references the User model's clerkId
    },
    bookingDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'],
        default: 'pending',
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'pending'],
        default: 'pending',
    },
    cylinder: {
        brand: {
            type: String,
            enum: ['HP', 'Indian'],
            required: true,
        },
        size: {
            type: Number,
            enum: [5, 14, 19], // Size in kg
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the `updatedAt` field whenever the document is updated
bookingSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

// Export the Booking model
export default mongoose.model('Booking', bookingSchema);
