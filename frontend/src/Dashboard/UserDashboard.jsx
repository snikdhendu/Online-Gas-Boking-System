import React, { useEffect,useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import axiosInstance from '../utils/axiosInstance';

import MainDashBoard from './MainDashboard';
import SideBox from '../components/SideBox';
import MyOrder from './MyOrder';
import ViewOrders from './ViewOrders';

import Header from '../components/Header/Header';
import HelpSupportPage from './Help';

const UserDashboard = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const clerkId= user?.id;
  const [isAdmin, setIsAdmin] = useState(false);

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
  }, [isSignedIn, user, navigate]);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axiosInstance.post('/api/check-admin', { clerkId });
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, [clerkId]);

  return (
    <div className="min-h-screen">
      {/* <Header className=' relative -top-6'/> */}
      <SideBox isAdmin={isAdmin} />

      <Routes>
        <Route path="/" element={<MainDashBoard isAdmin={isAdmin} />} />
        <Route path="/myorders" element={<MyOrder />} />
        <Route path="/vieworders" element={<ViewOrders/>} />
        <Route path="/help" element={<HelpSupportPage/>} />
      </Routes>
    </div>
  );
}

export default UserDashboard;
