import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        clerkId: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String },
        profileUrl: { type: String },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            pin: { type: String },
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Booking',
            },
        ],
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Export the User model
export default mongoose.model('User', userSchema);
