import React, { useState } from 'react';

const AddUpdateMembership = () => {
  const [formData, setFormData] = useState({
    membershipNumber: '',
    startDate: '',
    endDate: '',
    membershipExtn: '',
    membershipRemove: '',
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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (for now, just log the form data)
    console.log(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Update Membership</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Membership Number</label>
          <input
            type="text"
            name="membershipNumber"
            value={formData.membershipNumber}
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
          <label className="block text-sm font-medium text-gray-700">Membership Extension</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="membershipExtn"
                value="sixMonths"
                checked={formData.membershipExtn === 'sixMonths'}
                onChange={handleRadioChange}
                className="text-blue-600"
              />
              <span>Six Months</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="membershipExtn"
                value="oneYear"
                checked={formData.membershipExtn === 'oneYear'}
                onChange={handleRadioChange}
                className="text-blue-600"
              />
              <span>One Year</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="membershipExtn"
                value="twoYears"
                checked={formData.membershipExtn === 'twoYears'}
                onChange={handleRadioChange}
                className="text-blue-600"
              />
              <span>Two Years</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Membership Remove</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="membershipRemove"
                value="remove"
                checked={formData.membershipRemove === 'remove'}
                onChange={handleRadioChange}
                className="text-red-600"
              />
              <span>Remove</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setFormData({
              membershipNumber: '',
              startDate: '',
              endDate: '',
              membershipExtn: '',
              membershipRemove: '',
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

export default AddUpdateMembership;
