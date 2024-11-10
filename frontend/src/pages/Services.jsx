import React from 'react';

const Services = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8 p-8">
      {/* Image Section */}
      <div className="lg:w-1/2">
        <img src="/gass1.png" alt="Gas" className="w-full h-auto rounded-md shadow-lg" />
      </div>

      {/* Form Section */}
      <div className="lg:w-1/2 w-full bg-transparent p-6 rounded-md shadow-md mt-8 lg:mt-0">
        <h2 className="text-2xl font-semibold mb-6 text-center">Gas Details</h2>

        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter gas name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Company Name Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Company Name</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option>Select company</option>
              <option>HP</option>
              <option>Indian</option>
              <option>Bharat</option>
              <option>Reliance</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Quantity Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gas Quantity</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option>Select quantity</option>
              <option>14L</option>
              <option>5L</option>
              <option>20L</option>
              <option>50L</option>
              {/* Add more quantity options as needed */}
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Services;
