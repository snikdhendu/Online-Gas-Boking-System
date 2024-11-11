import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import axiosInstance from '../utils/axiosInstance';

import MainDashBoard from './MainDashboard';
import SideBox from '../components/SideBox';
import MyOrder from './MyOrder';

import Header from '../components/Header/Header';

const UserDashboard = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const storeUserData = async () => {
      if (isSignedIn && user) {
        try {
          console.log('User data:', user);

          const userData = {
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            profileUrl: user.imageUrl,
          };

          // Attempt to save user data
          await axiosInstance.post('/api/auth/register', userData);
          console.log('User data saved to the database.');
        } catch (error) {
          console.error('Error saving user data:', error?.response?.data || error.message);
        }
      } else if (!isSignedIn) {
        // Redirect to sign-in if not authenticated
        // navigate('/sign-in');
      }
    };

    storeUserData();
  }, [isSignedIn, user, navigate]); // Add dependencies

  return (
    <div className="min-h-screen">
      {/* <Header className=' relative -top-6'/> */}
      <SideBox />

      <Routes>
        <Route path="/" element={<MainDashBoard />} />
        <Route path="/myorders" element={<MyOrder />} />
      </Routes>
    </div>
  );
}

export default UserDashboard;
