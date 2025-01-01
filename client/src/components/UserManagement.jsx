import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const UserManagement = ({ update }) => {
	const { updateUser, addUser } = useContext(AppContext);
	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState({
		uid: "",
		userType: "new", // Default to 'New User'
		name: "",
		isActive: false,
		isAdmin: false,
		password: "",
	});
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	useEffect(() => {
		if (update) {
			setFormData({
				uid: "",
				userType: "existing",
				name: "",
				isActive: false,
				isAdmin: false,
				password: "",
			});
		}
	}, []);

	useEffect(() => {
		if (formData.userType === "new") {
			setFormData((prev) => ({ ...prev, uid: "" }));
		}
	}, [formData.userType]);
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { uid, userType, name, isActive, isAdmin, password } = formData;
		if (userType === "new") {
			let data = {
				role: isAdmin ? "admin" : "user",
				name: name.trim(),
				password,
			};
			addUser(data);
		} else if (formData.userType === "existing") {
			let data = {
				uid: uid.trim(),
				role: isAdmin ? "admin" : "user",
				name: name.trim(),
				status: isActive ? "active" : "not active",
				password,
			};
			updateUser(data);
		}
	};

	return (
		<div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold text-center mb-6">
				User Management
			</h2>

			<form onSubmit={handleSubmit}>
				{/* Radio Buttons for User Type */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select User Type
					</label>
					<div className="flex items-center space-x-4">
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="userType"
								value="new"
								checked={formData.userType === "new"}
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
								checked={formData.userType === "existing"}
								onChange={handleChange}
								className="text-blue-600"
							/>
							<span>Existing User</span>
						</label>
					</div>
				</div>

				{formData.userType === "existing" && (
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							User ID
						</label>
						<input
							type="text"
							name="uid"
							value={formData.userType === "new" ? "" : formData.uid}
							onChange={handleChange}
							placeholder="Enter User ID"
							className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
				)}

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter Name"
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required={formData.userType === "existing" ? false : true}
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Enter password"
							className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // Add padding-right for the button
							required={formData.userType === "existing" ? false : true}
						/>
						<button
							type="button"
							onClick={togglePasswordVisibility}
							className="absolute  right-0 px-2 mt-1 h-[95%] text-gray-500  hover:text-gray-700 border-l-2 border-gray-200"
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
				</div>

				{/* Status Checkboxes */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Status
					</label>
					<div className="flex items-center space-x-4">
						{formData.userType === "existing" && (
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
						)}
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
				<div className="flex  mt-6">
					<button
						type="submit"
						className="px-4 py-2 mx-auto bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						Confirm
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserManagement;
