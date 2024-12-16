import React, { useState } from 'react';

const UpdateItem = () => {
  const [itemType, setItemType] = useState('Book'); // Default selection
  const [itemName, setItemName] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [status, setStatus] = useState('Pending');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ itemType, itemName, serialNo, status, date });
    alert('Item updated successfully!');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Book/Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Radio Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Book"
              checked={itemType === 'Book'}
              onChange={() => setItemType('Book')}
              className="form-radio text-blue-500"
            />
            <span>Book</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Movie"
              checked={itemType === 'Movie'}
              onChange={() => setItemType('Movie')}
              className="form-radio text-blue-500"
            />
            <span>Movie</span>
          </label>
        </div>

        {/* Book/Movie Name */}
        <div>
          <label className="block text-gray-700 font-medium">Book/Movie Name:</label>
          <input
            type="text"
            placeholder="Enter name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Serial Number */}
        <div>
          <label className="block text-gray-700 font-medium">Serial No:</label>
          <input
            type="text"
            placeholder="Enter serial number"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-gray-700 font-medium">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
        </div>
      </form>
      {/* Log Out Button */}
      <button
        onClick={() => alert('Logged Out!')}
        className="w-full mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
};

export default UpdateItem;
