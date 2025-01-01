import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const AddItem = () => {
  const { addItem } = useContext(AppContext);
	const today = new Date().toISOString().split("T")[0];
	const [formData, setFormData] = useState({
		itemType: "Book",
		name: "",
		authorName: "",
		category: "",
		date: `${today}`,
		quantity: "",
		cost: "",
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
		const { itemType, name, authorName, category, date, quantity, cost } =
			formData;
		const data = {
			itemType,
			name,
			authorName,
			dateOfProcurement: date,
			quantity: Number(quantity),
			category,
			cost: Number(cost),
		};
    addItem(data);
		// console.log("Submitted Data:", data);
	};

	return (
		<div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold text-center mb-6">
				{"Add" +
					((formData.itemType === "Book" && " Book") ||
						(formData.itemType === "Movie" && " Movie"))}
			</h2>
			<form onSubmit={handleSubmit}>
				{/* Radio Buttons for Book/Movie */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Item Type
					</label>
					<div className="flex items-center space-x-4">
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="itemType"
								value="Book"
								checked={formData.itemType === "Book"}
								onChange={handleChange}
								className="text-blue-600"
							/>
							<span>Book</span>
						</label>
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="itemType"
								value="Movie"
								checked={formData.itemType === "Movie"}
								onChange={handleChange}
								required
								className="text-blue-600"
							/>
							<span>Movie</span>
						</label>
					</div>
				</div>
				{/* Book/Movie Name */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						{((formData.itemType === "Book" && "Book") ||
							(formData.itemType === "Movie" && "Movie")) + " Name"}
					</label>
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
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						{((formData.itemType === "Book" && "Author") ||
							(formData.itemType === "Movie" && "Director")) + " Name"}
					</label>
					<input
						type="text"
						name="authorName"
						value={formData.authorName}
						onChange={handleChange}
						required
						placeholder="Enter Author Name"
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						{((formData.itemType === "Book" && "Book") ||
							(formData.itemType === "Movie" && "Movie")) + " Category"}
					</label>
					<select
						name="category"
						value={formData.category}
						onChange={handleChange}
						required
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

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Date of Procurement
					</label>
					<input
						type="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focnpus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>
				{/* Quantity/Copies */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Quantity
					</label>
					<input
						type="number"
						name="quantity"
						value={formData.quantity}
						onChange={handleChange}
						min="1"
						required
						placeholder="Enter Quantity"
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Cost
					</label>
					<input
						type="number"
						step="0.50"
						name="cost"
						value={formData.cost}
						onChange={handleChange}
						required
						placeholder="Enter Cost"
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				{/* Buttons */}
				<div className="flex justify-between mt-6">
					<button
						type="button"
						onClick={() =>
							setFormData({
								itemType: "Book",
								name: "",
								authorName: "",
								category: "",
								date: `${today}`,
								quantity: "",
								cost: "",
							})
						}
						className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
					>
						Reset
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						Confirm
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddItem;
