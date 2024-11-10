import Booking from '../models/Booking.js'; 

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();  // Retrieve all bookings
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        return res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

// Get booking by booking ID
export const getBookingById = async (req, res) => {
    const { id } = req.params;  // Extract booking ID from URL params
    try {
        const booking = await Booking.findById(id);  // Find booking by ID
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching booking', error });
    }
};

// Get bookings by clerkId
export const getBookingsByClerkId = async (req, res) => {
    const { clerkId } = req.params;  // Extract clerkId from URL params
    try {
        const bookings = await Booking.find({ clerkId });  // Find bookings by clerkId
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this clerkId' });
        }
        return res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching bookings by clerkId', error });
    }
};
