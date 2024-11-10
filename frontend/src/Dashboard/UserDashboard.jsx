import React from 'react';
import Routers from '../routes/Routers';
import { Route, Routes, useNavigate } from "react-router-dom";
import MainDashBoard from './MainDashboard';
import SideBox from '../components/SideBox';
const  UserDashboard = () => {
  return (
    <div className=' min-h-screen'>
                  {/* <Navbar /> */}
            <SideBox />

            <Routes>
                <Route path='/' element={<MainDashBoard />} />

            </Routes>
    </div>
  );
}

export default  UserDashboard;
