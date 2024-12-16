import React, { useState } from 'react';

const AddMembership = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactName: '',
    contactAddress: '',
    adadharCardNo: '',
    startDate: '',
    endDate: '',
    membershipDuration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      membershipDuration: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (for now, just log the form data)
    console.log(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Membership</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contact Name</label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contact Address</label>
          <input
            type="text"
            name="contactAddress"
            value={formData.contactAddress}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Aadhaar Card No</label>
          <input
            type="text"
            name="adadharCardNo"
            value={formData.adadharCardNo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Membership</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="membershipDuration"
                value="sixMonths"
                checked={formData.membershipDuration === 'sixMonths'}
                onChange={handleRadioChange}
                className="text-blue-600"
              />
              <span>Six Months</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="membershipDuration"
                value="oneYear"
                checked={formData.membershipDuration === 'oneYear'}
                onChange={handleRadioChange}
                className="text-blue-600"
              />
              <span>One Year</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="membershipDuration"
                value="twoYears"
                checked={formData.membershipDuration === 'twoYears'}
                onChange={handleRadioChange}
                className="text-blue-600"
              />
              <span>Two Years</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setFormData({
              firstName: '',
              lastName: '',
              contactName: '',
              contactAddress: '',
              adadharCardNo: '',
              startDate: '',
              endDate: '',
              membershipDuration: '',
            })}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </form>
      <footer className="mt-4 text-center">
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Log Out</button>
      </footer>
    </div>
  );
};

export default AddMembership;
