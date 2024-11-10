import React from 'react';
import { useLocation } from 'react-router-dom';

const Services = () => {
  const location = useLocation();
  const { gassName, company, quantity } = location.state || {};

  return (
    <section className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8 p-8">
      <div className="lg:w-1/2">
        <img src="/gass1.png" alt="Gas" className="w-full h-auto rounded-md shadow-lg" />
      </div>

      <div className="lg:w-1/2 w-full bg-transparent p-6 rounded-md shadow-md mt-8 lg:mt-0">
        <h2 className="text-2xl font-semibold mb-6 text-center">Gas Details</h2>

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
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Services;
