import express from 'express';
import {
  getAllBookings,
  getBookingById,
  getBookingsByClerkId,
} from '../controllers/orderController.js';

const router = express.Router();

// Route for getting all bookings
router.get('/bookings', getAllBookings);

// Route for getting a booking by booking ID
router.get('/booking/:id', getBookingById);

// Route for getting bookings by clerkId
router.get('/booking/user/:clerkId', getBookingsByClerkId);

// // Route for creating a new booking
// router.post('/create', createBooking);

// // Route for updating a booking
// router.put('/update/:id', updateBooking);



export default router;
