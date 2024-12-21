import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const UpdateItem = () => {
	const { updateItem } = useContext(AppContext);

	const [formData, setFormData] = useState({
		bid: "",
		itemType: "",
		name: "",
		authorName: "",
		dateOfProcurement: "",
		quantity: "",
		category: "",
		availability: "",
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
		const {
			bid,
			itemType,
			name,
			authorName,
			dateOfProcurement,
			quantity,
			category,
			availability,
			cost,
		} = formData;

		const data = { bid: bid };
		if (itemType !== "") data.itemType = itemType;
		if (name !== "") data.name = name;
		if (authorName !== "") data.authorName = authorName;
		if (dateOfProcurement !== "") data.dateOfProcurement = dateOfProcurement;
		if (quantity !== "") data.quantity = Number(quantity);
		if (category !== "") data.category = category;
		if (availability !== "") data.availability = availability === "true";
		if (cost !== "") data.cost = Number(cost);

		updateItem(data);
		// console.log("Updated Data:", data);
	};

	return (
		<div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold text-center mb-6">Update Item</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Item ID
					</label>
					<input
						type="text"
						name="bid"
						value={formData.bid}
						onChange={handleChange}
						placeholder="Enter Item ID"
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
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
								className="text-blue-600"
							/>
							<span>Movie</span>
						</label>
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Item Name
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter Name"
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Author/Director Name
					</label>
					<input
						type="text"
						name="authorName"
						value={formData.authorName}
						onChange={handleChange}
						placeholder="Enter Author/Director Name"
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Date of Procurement
					</label>
					<input
						type="date"
						name="dateOfProcurement"
						value={formData.dateOfProcurement}
						onChange={handleChange}
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
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
						placeholder="Enter Quantity"
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Category
					</label>
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
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Availability
					</label>
					<select
						name="availability"
						value={formData.availability}
						onChange={handleChange}
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="true">Available</option>
						<option value="false">Not Available</option>
					</select>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Cost
					</label>
					<input
						type="number"
						name="cost"
						value={formData.cost}
						onChange={handleChange}
						step="0.50"
						placeholder="Enter Cost"
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="flex justify-between mt-6">
					<button
						type="button"
						onClick={() =>
							setFormData({
								bid: "",
								itemType: "",
								name: "",
								authorName: "",
								dateOfProcurement: "",
								quantity: "",
								category: "",
								availability: "",
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

export default UpdateItem;
