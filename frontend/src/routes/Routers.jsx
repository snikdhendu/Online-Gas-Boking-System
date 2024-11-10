import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
// import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Doctors from "../pages/Doctors/Gasses";
import { Routes, Route } from "react-router-dom";
import MyAccount from "../Dashboard/UserAccount/MyAccount";
import Dashboard from "../Dashboard/DoctorAccount/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Signin from "../sign-in/[[...index]]";
import Signup from "../sign-up/[[...index]]";
import UserDashboard from "../Dashboard/UserDashboard.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/service" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gasses" element={<Doctors />} />
      <Route path='/dashboard/*' element={< UserDashboard/>}></Route>
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/doctors/:id" element={<DoctorDetails />} /> */}
    </Routes>
  );
};

export default Routers;