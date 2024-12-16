import React, { useState } from 'react';

const UserManagement = () => {
  const [formData, setFormData] = useState({
    userType: 'new', // Default to 'New User'
    name: '',
    isActive: false,
    isAdmin: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">User Management</h2>

      <form onSubmit={handleSubmit}>
        {/* Radio Buttons for User Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select User Type</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="userType"
                value="new"
                checked={formData.userType === 'new'}
                onChange={handleChange}
                className="text-blue-600"
              />
              <span>New User</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="userType"
                value="existing"
                checked={formData.userType === 'existing'}
                onChange={handleChange}
                className="text-blue-600"
              />
              <span>Existing User</span>
            </label>
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Status Checkboxes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="text-blue-600"
              />
              <span>Active</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="text-blue-600"
              />
              <span>Admin</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <a
            href="/"
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Home
          </a>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </form>

      {/* Footer with Log Out */}
      <footer className="mt-6 text-center">
        <a href="/logout" className="text-blue-500 hover:underline">
          Log Out
        </a>
      </footer>
    </div>
  );
};

export default UserManagement;
