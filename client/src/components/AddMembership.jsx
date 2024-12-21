import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const AddMembership = () => {
	const today = new Date().toISOString().split("T")[0];
	const { addMembership } = useContext(AppContext);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		contactNo: "",
		contactAddress: "",
		aadhar: "",
		membershipDuration: "",
		startDate: `${today}`,
		endDate: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Automatically calculate end date when start date or membership duration changes
		if (name === "startDate" || name === "membershipDuration") {
			updateEndDate(
				name === "startDate" ? value : formData.startDate,
				name === "membershipDuration" ? value : formData.membershipDuration
			);
		}
	};

	const handleRadioChange = (e) => {
		const value = e.target.value;
		setFormData((prevData) => ({
			...prevData,
			membershipDuration: value,
		}));

		// Update end date when membership duration changes
		updateEndDate(formData.startDate, value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!/^\d{10}$/.test(formData.contactNo)) {
			alert("Contact Number must be exactly 10 digits.");
			return;
		}

		if (!/^\d{12}$/.test(formData.aadhar)) {
			alert("Aadhaar Card Number must be exactly 12 digits.");
			return;
		}
		const {
			firstName,
			lastName,
			contactNo,
			contactAddress,
			aadhar,
			membershipDuration,
			startDate,
			endDate,
		} = formData;
		let data = {
			firstName,
			lastName,
			contactNo,
			contactAddress,
			aadhar,
			startDate,
			endDate,
		};
		addMembership(data);
		// console.log("Form Data Submitted:", data);
		alert("Form submitted successfully!");
	};

	const updateEndDate = (startDate, membershipDuration) => {
		if (startDate && membershipDuration) {
			const start = new Date(startDate);
			let monthsToAdd = 0;

			if (membershipDuration === "sixMonths") {
				monthsToAdd = 6;
			} else if (membershipDuration === "oneYear") {
				monthsToAdd = 12;
			} else if (membershipDuration === "twoYears") {
				monthsToAdd = 24;
			}

			// Add months to start date
			const end = new Date(start.setMonth(start.getMonth() + monthsToAdd));
			setFormData((prevData) => ({
				...prevData,
				endDate: end.toISOString().split("T")[0], // Format as YYYY-MM-DD
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				endDate: "",
			}));
		}
	};

	return (
		<div className="max-w mx-auto p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold text-center mb-6">
				Add Membership
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						First Name
					</label>
					<input
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						required
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Last Name
					</label>
					<input
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						required
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Contact Number
					</label>
					<input
						type="tel"
						name="contactNo"
						value={formData.contactNo}
						onChange={handleChange}
						minLength={10}
						maxLength={10}
						required
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Contact Address
					</label>
					<input
						type="text"
						name="contactAddress"
						value={formData.contactAddress}
						onChange={handleChange}
						required
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Aadhaar Card No
					</label>
					<input
						type="text"
						name="aadhar"
						value={formData.aadhar}
						onChange={handleChange}
						minLength={12}
						maxLength={12}
						required
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Membership Duration
					</label>
					<div className="flex items-center space-x-4">
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="membershipDuration"
								value="sixMonths"
								checked={formData.membershipDuration === "sixMonths"}
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
								checked={formData.membershipDuration === "oneYear"}
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
								checked={formData.membershipDuration === "twoYears"}
								onChange={handleRadioChange}
								className="text-blue-600"
							/>
							<span>Two Years</span>
						</label>
					</div>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Start Date
					</label>
					<input
						type="date"
						name="startDate"
						value={formData.startDate}
						onChange={handleChange}
						required
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						End Date
					</label>
					<input
						type="date"
						name="endDate"
						value={formData.endDate}
						onChange={handleChange}
						required
						disabled
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex justify-between mt-6">
					<button
						type="button"
						onClick={() =>
							setFormData({
								firstName: "",
								lastName: "",
								contactName: "",
								contactAddress: "",
								aadhar: "",
								startdate: `${today}`,
								endDate: "",
								membershipDuration: "",
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

export default AddMembership;
