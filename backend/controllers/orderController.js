import Booking from '../models/Booking.js'; 
import { sendBookingConfirmationEmail } from './sendEmail.js';

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

export const createBooking = async (req, res) => {
    const {
        clerkId, 
        deliveryDate, 
        amount,
        cylinder, 
        email,
    } = req.body;

    try {
     
        if (!clerkId || !deliveryDate || !amount || !cylinder || !cylinder.brand || !cylinder.size || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }


        const newBooking = new Booking({
            clerkId,
            deliveryDate,
            amount,
            cylinder,
            status: 'confirmed',
            paymentStatus: 'paid', 
        });

        const savedBooking = await newBooking.save();

        await sendBookingConfirmationEmail(email, savedBooking);
      
        res.status(201).json({
            message: 'Booking created successfully',
            booking: savedBooking,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

export const updateBooking = async (req, res) => {
    const  bookingId  = req.params;  
    const { status, deliveryDate } = req.body;  

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (status) {
            // Check if the status is valid
            if (!['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'].includes(status)) {
                return res.status(400).json({ message: 'Invalid status value' });
            }
            booking.status = status;  // Set the new status
        }

        if (deliveryDate) {
         
            const parsedDeliveryDate = new Date(deliveryDate);
            if (isNaN(parsedDeliveryDate.getTime())) {
                return res.status(400).json({ message: 'Invalid delivery date' });
            }
            booking.deliveryDate = parsedDeliveryDate;  
        }

 
        booking.updatedAt = Date.now();

        const updatedBooking = await booking.save();

        res.status(200).json({
            message: 'Booking updated successfully',
            booking: updatedBooking,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error });
    }
};

export const setPaymentStatusToPaid = async (req, res) => {
    const { bookingId } = req.params; 

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { paymentStatus: 'paid', updatedAt: Date.now() },
            { new: true } 
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({
            message: 'Payment status updated to paid',
            booking: updatedBooking,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating payment status', error });
    }
};
