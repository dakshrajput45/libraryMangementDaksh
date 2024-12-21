import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const UpdateMembership = () => {
	const today = new Date().toISOString().split("T")[0];
	const { updateMembership } = useContext(AppContext);
	const [formData, setFormData] = useState({
		membershipId: "",
		startDate: `${today}`,
		endDate: "",
		membership: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Automatically calculate end date when start date or membership duration changes
		if (name === "startDate" || name === "membership") {
			updateEndDate(
				name === "startDate" ? value : formData.startDate,
				name === "membership" ? value : formData.membership
			);
		}
	};

	const handleRadioChange = (e) => {
		const value = e.target.value;
		setFormData((prevData) => ({
			...prevData,
			membership: value,
		}));

		// Update end date when membership duration changes
		updateEndDate(formData.startDate, value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let { membershipId, startDate, endDate, membership } = formData;
		let data = {
			membershipId: membershipId,
			startDate: startDate,
			endDate: endDate,
			remove: membership === "remove" ? true : false,
		};

		updateMembership(data);
		setFormData({
			membershipId: "",
			startdate: `${today}`,
			endDate: "",
			membership: "",
		});
	};

	const updateEndDate = (startDate, membership) => {
		if (startDate && membership !== "remove") {
			const start = new Date(startDate);
			let monthsToAdd = 0;

			if (membership === "sixMonths") {
				monthsToAdd = 6;
			} else if (membership === "oneYear") {
				monthsToAdd = 12;
			} else if (membership === "twoYears") {
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
				startdate: `${today}`,
				endDate: "",
			}));
		}
	};

	return (
		<div className="max-w mx-auto p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold text-center mb-6">
				Update Membership
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Membership Number
					</label>
					<input
						type="text"
						name="membershipId"
						value={formData.membershipId}
						onChange={handleChange}
						required
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Membership Extension
					</label>
					<div className="flex items-center space-x-4">
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="membership"
								value="sixMonths"
								checked={formData.membership === "sixMonths"}
								onChange={handleRadioChange}
								className="text-blue-600"
							/>
							<span>Six Months</span>
						</label>
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="membership"
								value="oneYear"
								checked={formData.membership === "oneYear"}
								onChange={handleRadioChange}
								className="text-blue-600"
							/>
							<span>One Year</span>
						</label>
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="membership"
								value="twoYears"
								checked={formData.membership === "twoYears"}
								onChange={handleRadioChange}
								className="text-blue-600"
							/>
							<span>Two Years</span>
						</label>

						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="membership"
								value="remove"
								checked={formData.membership === "remove"}
								onChange={handleRadioChange}
								className="text-red-600"
							/>
							<span>Remove</span>
						</label>
					</div>
					{formData.membership !== "remove" && (
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
					)}
					{formData.membership !== "remove" && (
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
					)}
				</div>

				<div className="flex justify-between mt-6">
					<button
						type="button"
						onClick={() =>
							setFormData({
								membershipId: "",
								startdate: `${today}`,
								endDate: "",
								membership: "",
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

export default UpdateMembership;
