import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useUser } from '@clerk/clerk-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Services = () => {
  const location = useLocation();
  const { gassName: stateGassName, company: stateCompany, quantity: stateQuantity, currentPrice: statePrice } = location.state || {};
  const { user } = useUser();
  const clerkId = user?.id;
  const email = user?.emailAddresses[0]?.emailAddress;
  const navigate= useNavigate();

  // State to manage the current step and form data
  const [step, setStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    address: '',
    pinCode: ''
  });
  
  // Editable states for the gas details
  const [gassName, setGassName] = useState(stateGassName || '');
  const [company, setCompany] = useState(stateCompany || '');
  const [quantity, setQuantity] = useState(stateQuantity || '');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [price, setPrice] = useState(statePrice || '');

  // Function to handle next step
  const handleNext = () => {
    setStep(step + 1);
  };

  // Function to handle previous step
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // Function to handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      clerkId: clerkId,
      deliveryDate: new Date().toISOString(), 
      amount: price, 
      cylinder: {
        brand: company,
        size: quantity
      },
      email: email
    };
    console.log(email);
    
    try {
      const response = await axiosInstance.post('/api/booking/new', bookingData);
      console.log('Booking created successfully:', response.data);
      toast.success('Payment done successfully');
      setPaymentSuccess(true);
      navigate('/dashboard/myorders');
    } catch (error) {
      console.error('Error creating booking:', error.response?.data || error.message);
      toast.error('Error creating booking');
    }
  };

  const handleMakeMoreBooking = () => {
    // Reset form fields and payment status
    setStep(1);
    setPersonalDetails({ name: '', address: '', pinCode: '' });
    setGassName('');
    setCompany('');
    setQuantity('');
    setPrice('');
    setPaymentSuccess(false);
  };

  return (
    <>
      <Header/>
      <section className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8 p-8 justify-center">
        <div className="lg:w-1/2 bg-transparent">
          <img src="/gass1.png" alt="Gas" className="w-full h-[700px] rounded-md" />
        </div>

        <div className="lg:w-1/2 w-full bg-transparent p-6 rounded-md shadow-md mt-8 lg:mt-0 h-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Gas Details</h2>

          {step === 1 && (
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={gassName}
                  onChange={(e) => setGassName(e.target.value)}
                  placeholder="Enter gas name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter company name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Gas Size (in kg)</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Price (in ₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-4">
              <h2 className="text-2xl font-semibold mb-6 text-center">Personal Details</h2>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={personalDetails.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={personalDetails.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={personalDetails.pinCode}
                  onChange={handleInputChange}
                  placeholder="Enter your pin code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold mb-6 text-center">Order Summary</h2>
              <p><strong>Gas Name:</strong> {gassName}</p>
              <p><strong>Company:</strong> {company}</p>
              <p><strong>Size:</strong> {quantity} kg</p>
              <p><strong>Price:</strong> ₹ {price}</p>
              <p><strong>Name:</strong> {personalDetails.name}</p>
              <p><strong>Address:</strong> {personalDetails.address}</p>
              <p><strong>Pin Code:</strong> {personalDetails.pinCode}</p>

              {paymentSuccess ? (
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none"
                  onClick={handleMakeMoreBooking}
                >
                  Make More Booking
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none"
                  onClick={handleFinalSubmit}
                >
                  Pay Now
                </button>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
      {/* <ToastContainer /> */}
    </>
  );
};

export default Services;
