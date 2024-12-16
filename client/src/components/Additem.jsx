import React, { useState } from 'react';

const AddItem = () => {
  const [formData, setFormData] = useState({
    itemType: 'book', // Default to 'book'
    name: '',
    author: '',
    category: '',
    date: '',
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Book/Movie</h2>
      <form onSubmit={handleSubmit}>
        {/* Radio Buttons for Book/Movie */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Item Type</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="itemType"
                value="book"
                checked={formData.itemType === 'book'}
                onChange={handleChange}
                className="text-blue-600"
              />
              <span>Book</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="itemType"
                value="movie"
                checked={formData.itemType === 'movie'}
                onChange={handleChange}
                className="text-blue-600"
              />
              <span>Movie</span>
            </label>
          </div>
        </div>

        {/* Book/Movie Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Book/Movie Name</label>
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

        {/* Author Name - Conditional */}
        {formData.itemType === 'book' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Author Name</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter Author Name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Book Category - Conditional */}
        {formData.itemType === 'book' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Book Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="science">Science</option>
              <option value="economics">Economics</option>
              <option value="fiction">Fiction</option>
              <option value="children">Children</option>
              <option value="personal development">Personal Development</option>
            </select>
          </div>
        )}

        {/* Date of Procurement */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date of Procurement</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Quantity/Copies */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Quantity/Copies</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            placeholder="Enter Quantity"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() =>
              setFormData({
                itemType: 'book',
                name: '',
                author: '',
                category: '',
                date: '',
                quantity: 1,
              })
            }
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

      {/* Footer with Home and Log Out */}
      <footer className="mt-6 flex justify-between">
        <a href="/" className="text-blue-500 hover:underline">
          Home
        </a>
        <a href="/logout" className="text-blue-500 hover:underline">
          Log Out
        </a>
      </footer>
    </div>
  );
};

export default AddItem;
