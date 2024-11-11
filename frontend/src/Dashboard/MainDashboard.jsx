// import React from 'react';
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
const MainDashBoard = () => {
  const { user } = useUser();
  if (!user) {
    return null; // Or handle the case when user is null
  }
  console.log(user);

  return (
    <div className="  bg-white text-black   items-center pt-28 min-h-screen lg:ml-64 flex flex-col gap-4 justify-between p-8 -mt-14" style={{ height: '500px', width: "83%" }} >


      <div className="min-h-screen bg-transparent w-full">
        {/* Header */}
        {/* <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gas Booking Dashboard</h1>
          <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="sr-only">Notifications</span>
          </button>
        </header> */}

        {/* Welcome Card */}
        <div className="mb-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user.fullName}!</h2>
          <p className="text-blue-100">Your last booking was on 15th October 2024</p>
          <p className="mt-4">Current gas cylinder status: 75% full</p>
        </div>

        {/* Quick Actions */}
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Quick Actions</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { title: "Book Cylinder", icon: "M13 10V3L4 14h7v7l9-11h-7z", primary: true },
            { title: "Booking History", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Schedule Delivery", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
            { title: "My Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }
          ].map((action, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{action.title}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                </svg>
              </div>
              <button className={`w-full py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                  bg-blue-500 text-white hover:bg-blue-600
                  
                `}>
                {action.primary ? "Book Now" : "View"}
              </button>
            </div>
          ))}
        </div>

        {/* User Profile Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="flex items-center space-x-4">
            <Avatar src={user.imageUrl} alt={user.fullName} sx={{ width: 100, height: 100 }} />
            <div>
              <h3 className="text-lg font-semibold">{user.fullName}</h3>
              <p className="text-sm text-gray-500">Customer ID: GAS{user.id}</p>
              <p className="text-sm text-gray-500">{user.primaryEmailAddress.emailAddress}</p>
              <p className="text-sm text-gray-500">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {[
              { date: '2024-10-15', status: 'Delivered', id: 'ORD-001' },
              { date: '2024-09-01', status: 'Cancelled', id: 'ORD-002' },
              { date: '2024-07-22', status: 'Delivered', id: 'ORD-003' },
            ].map((booking) => (
              <div key={booking.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                <div>
                  <p className="font-medium">{booking.date}</p>
                  <p className="text-sm text-gray-500">Order ID: {booking.id}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${booking.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div> */}
      </div>

    </div>
  );
}

export default MainDashBoard;
