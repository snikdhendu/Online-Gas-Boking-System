import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useUser } from "@clerk/clerk-react";

const MyOrder = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useUser();
  const clerkId = user?.id;

  useEffect(() => {
    const fetchBookings = async () => {
      if (clerkId) {  // Only proceed if clerkId is defined
        try {
          const response = await axiosInstance.get(`/api/booking/user/${clerkId}`);
          setBookings(response.data);  // Assuming response data is an array of bookings
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      }
    };

    fetchBookings();
  }, [clerkId]);  // Add clerkId as a dependency

  return (
    <div className="bg-white text-black items-center pt-28 min-h-screen lg:ml-64 flex flex-col gap-4 justify-between p-8 -mt-14" style={{ height: '500px', width: "83%" }}>
      <div className="bg-gradient-to-r from-textmain to-yellow-300 text-white font-bold text-3xl w-full rounded-md bg-teal-600 h-36 flex justify-left p-8 items-center flex-col gap-3">
        <h1>Hello, 👋</h1>
        <p className="text-base font-royal4">
          Welcome to your Dashboard! Check your latest progress and insights on your career journey today.
        </p>
      </div>

      {/* Displaying each booking */}
      <div className="w-full mt-6">
        <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-md">
                <p><strong>Booking ID:</strong> {booking._id}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Delivery Date:</strong> {new Date(booking.deliveryDate).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> ${booking.amount}</p>
                <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
                <p><strong>Status:</strong> {booking.status}</p>

                {/* Cylinder Details */}
                <p><strong>Cylinder Brand:</strong> {booking.cylinder?.brand}</p>
                <p><strong>Cylinder Size:</strong> {booking.cylinder?.size} kg</p>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
