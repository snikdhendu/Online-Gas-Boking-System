import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
const Services = () => {
  const location = useLocation();
  const { gassName, company, quantity } = location.state || {};

  // State to manage the current step and form data
  const [step, setStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    address: '',
    pinCode: ''
  });

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

  // Function to handle the final submit and log all data to console
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log('Gas Details:', { gassName, company, quantity });
    console.log('Personal Details:', personalDetails);
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
                value={gassName || ''}
                placeholder="Enter gas name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Company Name</label>
              <input
                type="text"
                value={company || ''}
                placeholder="Enter company name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Gas Quantity</label>
              <input
                type="text"
                value={quantity || ''}
                placeholder="Enter quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                readOnly
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
            <p><strong>Quantity:</strong> {quantity}</p>
            <p><strong>Name:</strong> {personalDetails.name}</p>
            <p><strong>Address:</strong> {personalDetails.address}</p>
            <p><strong>Pin Code:</strong> {personalDetails.pinCode}</p>

            <button
              type="button"
              className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none"
              onClick={handleFinalSubmit}
            >
              Make Payment
            </button>
          </div>
        )}
      </div>
    </section>
    <Footer/>
    </>

  );
};

export default Services;
