import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useUser } from "@clerk/clerk-react";

const ViewOrders = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null); // To track which booking is being edited
  const { user } = useUser();
  const clerkId = user?.id;

  useEffect(() => {
    const fetchBookings = async () => {
      if (clerkId) {
        try {
          const response = await axiosInstance.get('/api/bookings');
          const sortedBookings = Array.isArray(response.data)
            ? response.data.sort(
                (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
              )
            : [];
          setBookings(sortedBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          setBookings([]);
        }
      }
    };

    fetchBookings();
  }, [clerkId]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-300 text-yellow-800";
      case "delivered":
        return "bg-green-300 text-green-800";
      case "cancelled":
        return "bg-red-300 text-red-800";
      default:
        return "bg-blue-300 text-blue-800";
    }
  };

  const handleEdit = (bookingId) => {
    // Toggle the edit mode for the selected booking
    if (editingBooking === bookingId) {
      setEditingBooking(null); // If already editing, exit edit mode
    } else {
      setEditingBooking(bookingId); // Enter edit mode for the selected booking
    }
  };

  const handleSave = async (updatedBooking) => {
    try {
      console.log(updatedBooking._id);
      const response = await axiosInstance.put(`/api/bookings/update/${updatedBooking._id}`, 
        {
            status: updatedBooking.status,
            deliveryDate: updatedBooking.deliveryDate,
        });
     
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        )
      );
      setEditingBooking(null); // Exit edit mode
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold">Recent Bookings 👋</h1>
          <p className="mt-2 text-blue-100">
            Here's a summary of gas cylinder orders
          </p>
        </div>

        {Array.isArray(bookings) && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg shadow-md overflow-hidden border border-blue-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6 bg-white bg-opacity-60 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-500">
                      Booking ID: {booking._id.slice(-6)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        booking.status
                      )} shadow-sm`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Booked:</span>{" "}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Delivery:</span>{" "}
                      {new Date(booking.deliveryDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Amount:</span>{" "}
                      {booking.amount}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Payment:</span>{" "}
                      {booking.paymentStatus}
                    </p>
                  </div>
                </div>

                {/* Editable Section */}
                {editingBooking === booking._id ? (
                  <div className="bg-blue-200 shadow-xl bg-opacity-70 px-6 py-4 border-t border-blue-100">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Edit Booking Details
                    </h3>
                    <div className="space-y-2">
                      {/* Editable Status */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Status</label>
                        <select
                          className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
                          value={booking.status}
                          onChange={(e) =>
                            setBookings((prevBookings) =>
                              prevBookings.map((b) =>
                                b._id === booking._id
                                  ? { ...b, status: e.target.value }
                                  : b
                              )
                            )
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="delivered">Confirmed</option>
                          <option value="delivered">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Editable Delivery Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Delivery Date</label>
                        <input
                          type="date"
                          className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
                          value={new Date(booking.deliveryDate).toLocaleDateString("en-CA")}
                          onChange={(e) =>
                            setBookings((prevBookings) =>
                              prevBookings.map((b) =>
                                b._id === booking._id
                                  ? { ...b, deliveryDate: new Date(e.target.value).toISOString() }
                                  : b
                              )
                            )
                          }
                        />
                      </div>

                      <button
                        onClick={() => handleSave(booking)}
                        className="mt-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded shadow-md hover:bg-green-700 transition duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-200 shadow-xl bg-opacity-70 px-6 py-4 border-t border-blue-100">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Booking Details
                    </h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Status:</span>{" "}
                      {booking.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Delivery Date:</span>{" "}
                      {new Date(booking.deliveryDate).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleEdit(booking._id)}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-200"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-blue-200">
            <p className="text-blue-600">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
